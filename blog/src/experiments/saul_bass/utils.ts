export function generateBoxPoints(
    rows: number,
    cols: number,
    p: number,
    heightMean: number,
    heightStdDev: number,
    widthMean: number,
    widthStdDev: number,
    height: number,
    width: number,
): number[][][] {
    const points: number[][][] = [];

    // Assume we're drawing on a [0,0] [1,1] canvas

    for (let i = 0; i < rows; i++) {
        points[i] = [];
        let currentX = 0;

        // TODO: make cols variable as well
        for (let j = 0; j < cols; j++) {

            let width;
            if (currentX + widthMean >= width) {
                width = width - currentX;
            } else {
                width = Math.round(positiveGaussian(widthMean, widthStdDev));
            }

            let height = Math.round(positiveGaussian(heightMean, heightStdDev));

            points[i][j] = [currentX, height];
            currentX += width;
        }
    }

    return points;
}

function positiveGaussian(mean: number, stdDev: number): number {
    return Math.abs(gaussianRandom(mean, stdDev));
}

export function gaussianRandom(mean: number, stdDev: number): number {
    let u = 0,
        v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();

    const gaussian =
        Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + stdDev * gaussian;
}

export function generateBoxPoints3(
    rows: number,
    cols: number,
    width: number,
    height: number,
    p: number,
    heightMean: number,
    heightStdDev: number,
    widthMean: number,
    widthStdDev: number,
) {
    const points: number[][][] = [];
    let totalHeight: number[] = new Array(cols).fill(0);
}

export function generateBoxPoints2(
    rows: number,
    cols: number,
    width: number,
    height: number,
    p: number,
    heightMean: number,
    heightStdDev: number,
    widthMean: number,
    widthStdDev: number,
): number[][][] {
    const points: number[][][] = [];
    let totalHeight: number[] = new Array(cols).fill(0);

    // First establish the total height of each column.
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            const rowHeight = Math.max(
                0,
                Math.round(gaussianRandom(heightMean, heightStdDev)),
            );
            if (i === 0 || Math.random() < p) {
                totalHeight[j] += rowHeight;
            }
        }
    }

    // Normalize heights so the total matches the desired height
    const heightSum = totalHeight.reduce((a, b) => a + b, 0);
    totalHeight = totalHeight.map(h => (h / heightSum) * height);

    for (let i = 0; i < rows; i++) {
        points[i] = [];
        let currentX = 0;

        for (let j = 0; j < cols; j++) {
            const width = Math.max(
                0,
                Math.round(gaussianRandom(widthMean, widthStdDev)),
            );
            const colHeight = totalHeight[j];

            points[i][j] = [currentX, colHeight];
            currentX += width;

            // Stretch the last rectangle's width to fill the row
            if (j === cols - 1) {
                points[i][j][0] = width - currentX;
            }
        }

        // Normalize widths so the total matches the desired width
        const rowWidthSum = points[i].reduce((a, b) => a + b[0], 0);
        points[i] = points[i].map(([w, h]) => [(w / rowWidthSum) * width, h]);
    }

    return points;
}
