<script lang="ts">
    import { onMount } from "svelte";
    import Window from "./window.svelte";
    import type { WindowI } from "./window.svelte";

    let windows: WindowI[] = [
        {
            id: 1,
            title: "A Mathematician's Apology",
            content:
                "https://stackoverflow.com/questions/64064506/export-typescript-type-in-svelte-file",
            x: 50,
            y: 50,
            width: 300,
            height: 200,
            isMinimized: false,
        },
    ];
    let nextId = 2;
    let isFullScreen = false;

    function createWindow(title, content) {
        windows = [
            ...windows,
            {
                id: nextId++,
                title,
                content,
                x: 100,
                y: 100,
                width: 300,
                height: 200,
                isMinimized: false,
            },
        ];
    }

    function closeWindow(id) {
        windows = windows.filter((w) => w.id !== id);
    }

    function toggleMinimize(id) {
        windows = windows.map((w) =>
            w.id === id ? { ...w, isMinimized: !w.isMinimized } : w,
        );
    }

    function startDrag(event, window) {
        if (isFullScreen) return;
        const startX = event.clientX - window.x;
        const startY = event.clientY - window.y;

        function onMouseMove(event) {
            window.x = event.clientX - startX;
            window.y = event.clientY - startY;
            windows = windows;
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    function toggleFullScreen() {
        isFullScreen = !isFullScreen;
        if (isFullScreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    onMount(() => {
        // You can add more initial windows here
    });
</script>

<div
    class="desktop w-full h-screen bg-gray-100 relative overflow-hidden"
    class:fullscreen={isFullScreen}
>
    {#each windows as window (window.id)}
        <Window {window} />
    {/each}
    <div class="fixed bottom-4 left-4 space-x-2">
        <button
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            on:click={() => createWindow("New Window", "New content")}
            >New Window</button
        >
        <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            on:click={toggleFullScreen}
        >
            {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
    </div>
</div>

<style global>
    .fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
    }
</style>
