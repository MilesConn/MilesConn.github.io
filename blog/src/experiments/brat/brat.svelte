<script lang="ts">
    import type { CanvasRenderingContext2D } from "canvas";
    import { onMount } from "svelte";
    import { calculateTextDimensions, printJustifiedText } from "./utils";

    const original = "#8ace03";
    const deluxe = "#ffffff";

    let text = "brat";
    let backgroundColor = original;
    let textColor = "#000000";
    let fontSize = 94;
    let blurAmount = 1.8;
    let letterSpacing = 0;
    let xPosition = 250;
    let yPosition = 250;
    let heightPadding = 5;

    let canvas;
    let ctx: CanvasRenderingContext2D;
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    let isInitialized = false;

    onMount(() => {
        canvas = document.getElementById("canvas") as HTMLCanvasElement;
        ctx = canvas.getContext("2d");

        // I think that calculate dimensions relies on the canvas for some reason?
        updateCanvas();

        // Center the text box initially
        const { width, height } = calculateTextDimensions(text, fontSize, ctx);
        xPosition = (canvas.width - width) / 2;
        yPosition = (canvas.height - height) / 2;

        isInitialized = true;
        updateCanvas();
    });

    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px Arial Narrow`;
        ctx.letterSpacing = `${letterSpacing}px`;

        // Calculate text dimensions
        const { width, height } = calculateTextDimensions(text, fontSize, ctx);

        // Apply blur
        ctx.filter = `blur(${blurAmount}px)`;

        // Draw text box
        // if (withLines) {
        //     ctx.strokeStyle = "white";
        //     ctx.strokeRect(xPosition, yPosition, width, height);
        // }

        // Draw wrapped text
        printJustifiedText(
            ctx,
            text,
            xPosition, // Add left padding
            yPosition, // Start from the top with font size offset
            heightPadding,
            width, // Subtract padding from width
        );

        // Reset filter
        ctx.filter = "none";
    }

    function downloadImage() {
        updateCanvas();
        const link = document.createElement("a");
        link.download = "generated-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    function handleMouseDown(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const { width, height } = calculateTextDimensions(text, fontSize, ctx);

        if (
            x >= xPosition &&
            x <= xPosition + width &&
            y >= yPosition &&
            y <= yPosition + height
        ) {
            isDragging = true;
            dragOffsetX = x - xPosition;
            dragOffsetY = y - yPosition;
        }
    }

    function handleMouseMove(event) {
        if (!isDragging) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        xPosition = x - dragOffsetX;
        yPosition = y - dragOffsetY;
        updateCanvas();
    }

    function handleMouseUp() {
        isDragging = false;
    }

    $: {
        if (ctx) {
            updateCanvas();
        }
    }
</script>

<div class="container mx-auto p-4">
    <div class="flex justify-center mb-4">
        <canvas
            id="canvas"
            width="500"
            height="500"
            class="border border-gray-300 cursor-move"
            on:mousedown={handleMouseDown}
            on:mousemove={handleMouseMove}
            on:mouseup={handleMouseUp}
            on:mouseleave={handleMouseUp}
        ></canvas>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-2">
            <textarea
                bind:value={text}
                class="w-full p-2 border rounded"
                rows="4"
                on:input={updateCanvas}
            ></textarea>
        </div>

        <div>
            <label class="block mb-2">Background Color:</label>
            <select
                bind:value={backgroundColor}
                class="w-full p-2 border rounded"
                on:change={updateCanvas}
            >
                <option value={original} selected>Original</option>
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
                class={`w-full accent-[#8ace03]`}
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
                class={`w-full accent-[#8ace03]`}
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
                class={`w-full accent-[#8ace03]`}
                on:input={updateCanvas}
            />
        </div>
    </div>

    <!-- Actually don't need this because you can just save the image directly -->
    <!-- <button
        on:click={downloadImage}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
        Download Image
    </button> -->
</div>
