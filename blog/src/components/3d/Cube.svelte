<script lang="ts">
  import { Mesh, useFrame } from "@threlte/core";
  import { BoxGeometry, Color, ShaderMaterial } from "three";

  const vertex = document.querySelector("#vert").textContent.trim();
  const fragment = document.querySelector("#frag").textContent.trim();

  const color1 = new Color(0x351600);
  const color2 = new Color(0x102c54);

  const ColorShiftMaterial = new ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: color1.clone() },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  let rotation = 0;
  const orError = (msg: string) => {
    throw new Error(msg);
  };

  function* range(start = 0, end = 1, step = 0.01) {
    const steps = Math.abs((end - start) / step);
    Number.isInteger(steps) || orError("Only finite steps supported");

    const dir = end > start;

    for (let i = 0; i < steps; i++) {
      yield start;
      if (dir) {
        start += step;
      } else {
        start -= step;
      }
    }
  }

  function* pingpong(start = 0, end = 1, step = 0.01) {
    while (true) {
      yield* range(start, end, step);
      yield* range(end, start, step);
    }
  }

  const lerpGen = pingpong();

  useFrame(() => {
    ColorShiftMaterial.uniforms.color.value.lerpColors(
      color1,
      color2,
      lerpGen.next().value
    );
    rotation += 0.01;
  });
</script>

<Mesh
  rotation={{ x: rotation, y: rotation, z: rotation }}
  geometry={new BoxGeometry(1, 1, 1)}
  material={ColorShiftMaterial}
/>
