export function generateBoxPoints(
    rows: number,
    cols: number,
    p: number,
    heightMean: number,
    heightStdDev: number,
    widthMean: number,
    widthStdDev: number,
): number[][][] {
    const points: number[][][] = [];

    for (let i = 0; i < rows; i++) {
        points[i] = [];
        let currentX = 0;

        for (let j = 0; j < cols; j++) {
            const width = Math.max(
                0,
                Math.round(gaussianRandom(widthMean, widthStdDev)),
            );
            let height: number;

            if (j === 0 || Math.random() < p) {
                height =
                    i > 0
                        ? points[i - 1][j][1]
                        : Math.max(
                            0,
                            Math.round(
                                gaussianRandom(heightMean, heightStdDev),
                            ),
                        );
            } else {
                height = Math.max(
                    0,
                    Math.round(gaussianRandom(heightMean, heightStdDev)),
                );
            }

            points[i][j] = [currentX, height];
            currentX += width;
        }
    }

    return points;
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
