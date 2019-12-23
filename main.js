const fieldSize = 800;
const numberOfCellsInRow = 50;

const getRandomGrid = () => {
    const grid = new Array(numberOfCellsInRow);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(numberOfCellsInRow);
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2); // 0か1が入る
        };
    };
    return grid;
};

const cellSize = fieldSize / numberOfCellsInRow;
const cellStrokeColor = '#aaa';
const drawGrid = (ctx, grid) => {
    ctx.strokeStyle = cellStrokeColor;
    // ctx.fillStyle = '#555';
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
    
};

const generation = (ctx, grid) => {
    ctx.clearRect(0, 0, fieldSize, fieldSize);
    drawGrid(ctx, grid);
    const gridOfNextGeneration = getNextGeneration(grid);
};

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const grid = getRandomGrid();
    drawGrid(ctx, grid);
};