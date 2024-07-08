<script lang="ts">
    import type { CanvasRenderingContext2D } from "canvas";
    import { onMount } from "svelte";
    import { getLocalFonts, printJustifiedText } from "./utils";

    const original = "#8ace03";
    const deluxe = "#ffffff";

    let text = "brat";
    let backgroundColor = "#8ace03";
    let textColor = "#000000";
    let textAlign = "Center";
    let fontSize = 74;
    let blurAmount = 1.8;
    let letterSpacing = 0;
    let xPosition = 250;
    let yPosition = 250;
    let boxWidth = 200;
    let boxHeight = 100;

    let canvas;
    let ctx: CanvasRenderingContext2D;
    let isDragging = false;
    let isResizing = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let resizeStartX = 0;
    let resizeStartY = 0;

    let localFonts: string[] = [];

    onMount(() => {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        updateCanvas();
    });

    function updateCanvas(withLines = true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px Arial Narrow`;
        ctx.letterSpacing = `${letterSpacing}px`;
        ctx.textAlign = textAlign;

        // Apply blur
        ctx.filter = `blur(${blurAmount}px)`;

        // Draw text box
        if (withLines) {
            ctx.strokeStyle = "white";
            ctx.strokeRect(xPosition, yPosition, boxWidth, boxHeight);
        }

        // Draw wrapped text
        printJustifiedText(
            ctx,
            text,
            xPosition,
            yPosition + fontSize,
            fontSize + 5,
            boxWidth,
        );
        // const words = text.split(" ");
        // let line = "";
        // let y = yPosition + fontSize;

        // for (let n = 0; n < words.length; n++) {
        //     let testLine = line + words[n] + " ";
        //     let metrics = ctx.measureText(testLine);
        //     let testWidth = metrics.width;

        //     if (testWidth > boxWidth && n > 0) {
        //         ctx.fillText(line, xPosition, y);
        //         line = words[n] + " ";
        //         y += fontSize + 5;
        //     } else {
        //         line = testLine;
        //     }
        // }
        // ctx.fillText(line, xPosition, y);

        // Reset filter
        ctx.filter = "none";
    }

    function downloadImage() {
        updateCanvas(false);
        const link = document.createElement("a");
        link.download = "generated-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    function handleMouseDown(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (
            x >= xPosition + boxWidth - 10 &&
            x <= xPosition + boxWidth + 10 &&
            y >= yPosition + boxHeight - 10 &&
            y <= yPosition + boxHeight + 10
        ) {
            isResizing = true;
            resizeStartX = x;
            resizeStartY = y;
        } else if (
            x >= xPosition &&
            x <= xPosition + boxWidth &&
            y >= yPosition &&
            y <= yPosition + boxHeight
        ) {
            isDragging = true;
            dragOffsetX = x - xPosition;
            dragOffsetY = y - yPosition;
        }
    }

    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (isResizing) {
            boxWidth = Math.max(50, boxWidth + (x - resizeStartX));
            boxHeight = Math.max(50, boxHeight + (y - resizeStartY));
            resizeStartX = x;
            resizeStartY = y;
            updateCanvas();
        } else if (isDragging) {
            xPosition = x - dragOffsetX;
            yPosition = y - dragOffsetY;
            updateCanvas();
        }
    }

    function handleMouseUp() {
        isDragging = false;
        isResizing = false;
    }

    $: {
        if (ctx) {
            updateCanvas();
        }
    }
</script>

<div class="container mx-auto p-4">
    <canvas
        id="canvas"
        width="500"
        height="500"
        class="border border-gray-300 mb-4 cursor-move"
        on:mousedown={handleMouseDown}
        on:mousemove={handleMouseMove}
        on:mouseup={handleMouseUp}
        on:mouseleave={handleMouseUp}
    ></canvas>

    <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-2">
            <!-- <label class="block mb-2">Text:</label> -->
            <textarea
                bind:value={text}
                class="w-full p-2 border rounded"
                rows="4"
                on:input={updateCanvas}
            ></textarea>
        </div>

        <!-- <div>
            <label class="block mb-2">Background Color:</label>
            <input
                type="color"
                bind:value={backgroundColor}
                class="w-full p-2 border rounded"
                on:input={updateCanvas}
            />
        </div> -->

        <div>
            <label class="block mb-2">Background Color:</label>
            <select
                bind:value={backgroundColor}
                class="w-full p-2 border rounded"
                on:input={updateCanvas}
            >
                <option value={original}>Original</option>
                <option value={deluxe}>Deluxe</option>
            </select>
        </div>

        <div>
            <label class="block mb-2">Font Size:</label>
            <input
                type="range"
                bind:value={fontSize}
                min="10"
                max="172"
                class="w-full"
                on:input={updateCanvas}
            />
        </div>

        <div>
            <label class="block mb-2">Blur:</label>
            <input
                type="range"
                bind:value={blurAmount}
                min="0"
                max="10"
                step="0.1"
                class="w-full"
                on:input={updateCanvas}
            />
        </div>

        <div>
            <label class="block mb-2">Letter Spacing:</label>
            <input
                type="range"
                bind:value={letterSpacing}
                min="-5"
                max="10"
                class="w-full"
                on:input={updateCanvas}
            />
        </div>

        <!-- <div>
            <label class="block mb-2">Text Alignment:</label>
            <select
                bind:value={textAlign}
                class="w-full p-2 border rounded"
                on:change={updateCanvas}
            >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justified</option>
            </select>
        </div> -->
    </div>

    <button
        on:click={downloadImage}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
        Download Image
    </button>
</div>
