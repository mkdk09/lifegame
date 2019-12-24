const fieldSize = 800;
const numberOfCellsInRow = 50;
const framesPerSecond = 5;

const getRandomGrid = () => {
    const grid = new Array(numberOfCellsInRow);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(numberOfCellsInRow);
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2); // 0か1が入る
        };
    };
    return grid
};

const cellSize = fieldSize / numberOfCellsInRow;
const cellStrokeColor = '#aaa';
const drawGrid = (ctx, grid) => {
    ctx.strokeStyle = cellStrokeColor;
    // ctx.fillStyle = '#71f009';
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            const value = grid[i][j];
            if (value) {
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize); // 四角形描画
            };
            ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize); // 矩形　中身のない四角形描画
        };
    };
};

const getNextGeneration = (grid) => {
    const nextGrid = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
        nextGrid[i] = new Array(grid.length);
        for (let j = 0; j < grid.length; j++) {
            const value = grid[i][j];
            const neighbors = countNeighbors(grid, i, j);
            if (!value && neighbors === 3) {
                nextGrid[i][j] = 1;
            } else if ((value === 1) && (neighbors < 2 || neighbors > 3)) {
                nextGrid[i][j] = 0;
            } else {
                nextGrid[i][j] = value;
            }
        };
    };
    return nextGrid;
};

const countNeighbors = (grid, x, y) => {
    let sum = 0;
    const numberOfRows = grid.length;
    const numberOfCols = grid[0].length;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const row = (x + i + numberOfRows) % numberOfRows;
            const col = (y + j + numberOfCols) % numberOfCols;
            sum += grid[row][col];
        };
    };
    sum -= grid[x][y];
    return sum;
};

const generation = (ctx, grid) => {
    ctx.clearRect(0, 0, fieldSize, fieldSize);
    drawGrid(ctx, grid);
    const gridOfNextGeneration = getNextGeneration(grid);
    setTimeout(() => {
        requestAnimationFrame(() => generation(ctx, gridOfNextGeneration));
    }, 1000 / framesPerSecond);
};

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const grid = getRandomGrid();
    generation(ctx, grid);
};