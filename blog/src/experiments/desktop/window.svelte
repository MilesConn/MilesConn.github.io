<script context="module" lang="ts">
    export interface WindowI {
        id: number;
        title: string;
        content: string;
        x: number;
        y: number;
        width: number;
        height: number;
        isMinimized: false;
    }
</script>

<script lang="ts">
    export let window: WindowI;

    function startDrag() {}
    function toggleMinimize() {}
    function closeWindow() {}
</script>

<div
    class="window absolute bg-white border border-gray-300 shadow-md flex flex-col"
    style="left: {window.x}px; top: {window.y}px; width: {window.width}px; height: {window.isMinimized
        ? '30px'
        : window.height + 'px'};"
>
    <div
        class="title-bar bg-gray-200 p-1 cursor-move flex justify-between items-center"
        on:mousedown={(e) => startDrag(e, window)}
    >
        <div class="title text-sm">{window.title}</div>
        <div class="controls">
            <button
                class="px-1 ml-1 bg-gray-300 hover:bg-gray-400 rounded"
                on:click={() => toggleMinimize(window.id)}>-</button
            >
            <button
                class="px-1 ml-1 bg-gray-300 hover:bg-gray-400 rounded"
                on:click={() => closeWindow(window.id)}>×</button
            >
        </div>
    </div>
    {#if !window.isMinimized}
        <div class="content flex-grow p-2 overflow-auto">
            <iframe src={window.content} title="description"></iframe>
        </div>
    {/if}
</div>
