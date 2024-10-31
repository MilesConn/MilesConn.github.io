declare global {
    interface CanvasRenderingContext2D {
        __applyFilter: (filterString: string) => void;
        __applyBlur: (radius: number) => void;
        // apple :(
        filter: string;
    }
}

export function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || !('filter' in CanvasRenderingContext2D.prototype);
}

export const appleYUdothis = function () {
    // Singleton WebGL canvas
    let glCanvas = null;
    let gl = null;
    let isApplyingFilter = false;

    function getWebGLContext() {
        if (!glCanvas) {
            glCanvas = document.createElement('canvas');
            gl = glCanvas.getContext('webgl') || glCanvas.getContext('experimental-webgl');
            if (!gl) {
                console.warn('WebGL not supported. Falling back to CPU blur.');
                return null;
            }
        }
        console.log("GL?:", gl);
        return gl;
    }

    if (isSafari()) {
        // I'm kind of lazy ... this code is technically wrong 
        // but it works for my use case and maybe I'll fix it later...
        // Filters are supposed to apply to future render passes
        // but we call blur on whatever is in the current canvas's buffer
        // ie it affects previous render passes. To get around this we should
        // actually store the filter and then intercept draw methods 
        // ie 'drawImage', 'fillRect', 'strokeRect', 'fillText' etc 
        // and then do our offline render strategy on those 
        // and then copy them into our main canvas buffer
        // something to think about ...
        Object.defineProperty(CanvasRenderingContext2D.prototype, 'filter', {
            get: function () {
                return this._filter || 'none';
            },
            set: function (value) {
                this._filter = value;
                if (value !== 'none' && !isApplyingFilter) {
                    // Prevents render cycles
                    isApplyingFilter = true;
                    this.__applyFilter(value);
                    isApplyingFilter = false;
                }
            }
        });

        CanvasRenderingContext2D.prototype.__applyFilter = function (filterString) {
            const filters = filterString.split(' ');
            filters.forEach(filter => {
                const [name, value] = filter.split('(');
                if (name === 'blur') {
                    const radius = parseInt(value);
                    this.__applyBlur(radius);
                }
                // TODO: Add other filter implementations here
            });
        };

        CanvasRenderingContext2D.prototype.__applyBlur = function (radius) {
            const canvas = this.canvas;
            const w = canvas.width;
            const h = canvas.height;

            const gl = getWebGLContext();
            if (gl) {
                glCanvas.width = w;
                glCanvas.height = h;
                applyWebGLBlur(this, gl, radius, w, h);
            } else {
                applyCPUBlur(this, radius);
            }
        };

        const originalDrawImage = CanvasRenderingContext2D.prototype.drawImage;
        CanvasRenderingContext2D.prototype.drawImage = function (...args) {
            originalDrawImage.apply(this, args);
            if (this.filter !== 'none' && !isApplyingFilter) {
                isApplyingFilter = true;
                this.__applyFilter(this.filter);
                isApplyingFilter = false;
            }
        };
    }

    function applyWebGLBlur(ctx, gl, radius, w, h) {
        // WebGL setup
        gl.viewport(0, 0, w, h);

        // Vertex shader
        const vsSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;
            void main() {
                gl_Position = vec4(a_position, 0, 1);
                v_texCoord = a_texCoord;
            }
        `;

        // Fragment shader
        const fsSource = `
            precision mediump float;
            uniform sampler2D u_image;
            uniform vec2 u_textureSize;
            uniform float u_radius;
            varying vec2 v_texCoord;
            
            void main() {
                vec4 color = vec4(0.0);
                float total = 0.0;
                // arbitrary value just trying to get it closer
                // to chrome's appearance 
                // could read the specification but lets be honest... lol
                float sigma = u_radius * 2.0;
                int radius = int(ceil(u_radius));
            
                for (int x = -8; x <= 8; x++) {
                    for (int y = -8; y <= 8; y++) {
                        float weight = exp(-(float(x*x + y*y)) / (2.0 * sigma * sigma));
                        color += texture2D(u_image, v_texCoord + vec2(float(x), float(y)) / u_textureSize) * weight;
                        total += weight;
                    }
                }
                gl_FragColor = color / total;
            } 
        `;

        // Create shader program
        const program = createProgram(gl, vsSource, fsSource);
        gl.useProgram(program);

        // Set up buffers
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);

        // Set up attributes and uniforms
        const positionLocation = gl.getAttribLocation(program, 'a_position');
        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(texCoordLocation);

        const imageLocation = gl.getUniformLocation(program, 'u_image');
        const textureSizeLocation = gl.getUniformLocation(program, 'u_textureSize');
        const radiusLocation = gl.getUniformLocation(program, 'u_radius');

        // Create and set up texture
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ctx.canvas);

        // Set uniforms
        gl.uniform1i(imageLocation, 0);
        gl.uniform2f(textureSizeLocation, w, h);
        gl.uniform1f(radiusLocation, radius);

        // Draw
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Copy result back to original canvas
        ctx.drawImage(glCanvas, 0, 0);
    }

    function applyCPUBlur(ctx, radius) {
        // TODO: Implement a fallback CPU-based blur here
        console.log('Fallback to CPU blur');
    }

    function createProgram(gl, vsSource, fsSource) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program));
            return null;
        }
        return program;
    }

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
};