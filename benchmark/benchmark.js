const { performance } = require('perf_hooks');
const fs =
    require("fs");

const generateMaze =
    require("./mazeGenerator");

const bfs =
    require("./bfs");

const astar =
    require("./astar");

const sizes = [
    50,
    100,
    200,
    500,
    1000
];

const seed = 42;

let csv =
"Size,Algorithm,Time(ms),Visited,PathLength\n";

for (const size of sizes) {

    console.log(
        `Maze ${size}x${size}`
    );

    const maze =
        generateMaze(
            size,
            seed
        );

    let start =
        performance.now();

    let bfsResult =
        bfs(maze);

    let end =
        performance.now();

    csv +=
`${size},BFS,${
(end-start).toFixed(3)
},${
bfsResult.visitedNodes
},${
bfsResult.pathLength
}\n`;

    start =
        performance.now();

    let astarResult =
        astar(maze);

    end =
        performance.now();

    csv +=
`${size},A*,${
(end-start).toFixed(3)
},${
astarResult.visitedNodes
},${
astarResult.pathLength
}\n`;
}

fs.writeFileSync(
    "results.csv",
    csv
);

console.log(
    "Benchmark selesai"
);
