import type { CanvasRenderingContext2D } from "canvas";

export function printAtWordWrap(context: CanvasRenderingContext2D, text, x, y, lineHeight, fitWidth) {
    fitWidth = fitWidth || 0;
    lineHeight = lineHeight || 20;

    var currentLine = 0;

    var lines = text.split(/\r\n|\r|\n/);
    for (var line = 0; line < lines.length; line++) {


        if (fitWidth <= 0) {
            context.fillText(lines[line], x, y + (lineHeight * currentLine));
        } else {
            var words = lines[line].split(' ');
            var idx = 1;
            while (words.length > 0 && idx <= words.length) {
                var str = words.slice(0, idx).join(' ');
                var w = context.measureText(str).width;
                if (w > fitWidth) {
                    if (idx == 1) {
                        idx = 2;
                    }
                    context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
                    currentLine++;
                    words = words.splice(idx - 1);
                    idx = 1;
                }
                else { idx++; }
            }
            if (idx > 0)
                context.fillText(words.join(' '), x, y + (lineHeight * currentLine));
        }
        currentLine++;
    }
}

export function printJustifiedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, heightPadding: number, fitWidth: number) {
    const lines = text.split(/\r\n|\r|\n/);

    const lineHeight = fontHeight(context);
    let currentY = y + lineHeight; // Start with the baseline of the first line
    for (let line of lines) {
        const words = line.split(' ');

        const totalLength = context.measureText(line.trim());
        const baseGap = context.measureText(' ').width;
        const extraX = words.length > 1 ? (fitWidth - totalLength.width) / (words.length - 1) : 0;
        let currentX = x;
        for (let i = 0; i < words.length; i++) {
            context.fillText(words[i], currentX, currentY);
            currentX += (context.measureText(words[i]).width + extraX + baseGap);
        }

        currentY += lineHeight + heightPadding;
    }
}

function fontHeight(ctx: CanvasRenderingContext2D) {
    const metrics = ctx.measureText('M'); // Use 'M' as a reference for text height
    const fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return fontHeight;
}

export function calculateTextDimensions(
    text: string,
    fontSize: number,
    ctx: CanvasRenderingContext2D,
) {
    const lines = text.split(/\r\n|\r|\n/);
    const lineHeight = fontHeight(ctx);
    let maxWidth = 0;

    for (let line of lines) {
        const metrics = ctx.measureText(line);
        maxWidth = Math.max(maxWidth, metrics.width);
    }

    return {
        width: maxWidth,
        height: lines.length * lineHeight
    };
}

// Not sure why this isn't being picked up 
interface FontData {
    readonly family: string;
    readonly fullName: string;
    readonly postscriptName: string;
    readonly style: string;
}

declare global {
    interface Window { queryLocalFonts: () => Promise<FontData>; }
}

export async function getLocalFonts(): Promise<FontData | null> {
    if (window.queryLocalFonts) {
        return await window.queryLocalFonts();
    }
    return Promise.resolve(null);
}