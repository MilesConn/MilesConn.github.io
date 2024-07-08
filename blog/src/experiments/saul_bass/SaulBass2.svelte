<script lang="ts">
    import { onMount } from "svelte";
    import { generateBoxPoints } from "./utils";

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

    // function scaleRowWidths(row: number[][]): number[][] {
    //     const totalWidth = row[row.length - 1][0];
    //     const scaleFactor = width / totalWidth;
    //     return row.map(([x, y], j) => [x * scaleFactor, y]);
    // }

    // function scalePoints(row: number[][]): number[][] {
    //     return row.map(([x, y], j) => [x * width, y * height]);
    // }

    onMount(() => {
        points = generateBoxPoints(
            rows,
            cols,
            p,
            heightMean,
            heightStdDev,
            widthMean,
            widthStdDev,
            height,
            width,
        );
        console.log("points: ", points);
        // points = points.map(scalePoints);
    });
</script>

<svg {width} {height}>
    {#each points as row, i}
        {#each row as [x, y], j}
            <rect
                {x}
                y={height - y * i}
                width={j < row.length - 1 ? row[j + 1][0] - x : width - x}
                height={y}
                fill={generateRandomColor()}
            />
        {/each}
    {/each}
</svg>
