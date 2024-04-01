<script lang="ts">
    import { onMount } from "svelte";
    import { generateBoxPoints2 } from "./utils";

    // TODO: have the random things encode a seed which we then can recreate

    let width = 800;
    let height = 600;
    let rows = 10;
    let cols = 10;
    let p = 0.7;
    let heightMean = 50;
    let heightStdDev = 20;
    let widthMean = 50;
    let widthStdDev = 20;

    let points: number[][][] = [];

    function generateRandomColor(): string {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    onMount(() => {
        points = generateBoxPoints2(
            rows,
            cols,
            800,
            600,
            p,
            heightMean,
            heightStdDev,
            widthMean,
            widthStdDev,
        );
    });
</script>

<svg {width} {height}>
    {#each points as row, i}
        {#each row as [x, y], j}
            <rect
                {x}
                y={height - y}
                width={j < row.length - 1 ? row[j + 1][0] - x : width - x}
                height={y}
                fill={generateRandomColor()}
            />
        {/each}
    {/each}
</svg>
