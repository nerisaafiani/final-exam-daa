let maze = [];
let size = 10;

function generateMaze() {

    size = parseInt(
        document.getElementById("size").value
    );

    maze = [];

    const mazeDiv =
        document.getElementById("maze");

    mazeDiv.innerHTML = "";

    const cellSize =
        Math.max(
            6,
            Math.floor(500 / size)
        );

    mazeDiv.style.gridTemplateColumns =
        `repeat(${size}, ${cellSize}px)`;

    for (let i = 0; i < size; i++) {

        let row = [];

        for (let j = 0; j < size; j++) {

            let value;

            if (i === 0 && j === 0) {
                value = "S";
            }
            else if (
                i === size - 1 &&
                j === size - 1
            ) {
                value = "E";
            }
            else {
                value =
                    Math.random() < 0.3
                    ? "#"
                    : ".";
            }

            row.push(value);

            const cell =
                document.createElement("div");

            cell.classList.add("cell");

            cell.style.width =
                cellSize + "px";

            cell.style.height =
                cellSize + "px";

            if (value === "#")
                cell.classList.add("wall");

            else if (value === "S")
                cell.classList.add("start");

            else if (value === "E")
                cell.classList.add("end");

            else
                cell.classList.add("path");

            cell.id =
                `cell-${i}-${j}`;

            mazeDiv.appendChild(cell);
        }

        maze.push(row);
    }

    document.getElementById("status")
        .innerText = "";
}

function clearColors() {

    document
        .querySelectorAll(".visited")
        .forEach(cell =>
            cell.classList.remove(
                "visited"
            )
        );

    document
        .querySelectorAll(".shortest")
        .forEach(cell =>
            cell.classList.remove(
                "shortest"
            )
        );
}

function solveMaze() {

    clearColors();

    const algorithm =
        document.getElementById(
            "algorithm"
        ).value;

    let result;

    if (algorithm === "bfs") {
        result = bfs();
    }
    else {
        result = astar();
    }

    document.getElementById("status")
        .innerText =
        result.found
            ? "Path Found!"
            : "No Path Found!";
}

function drawPath(parent, x, y) {

    while (parent[x][y] !== null) {

        const cell =
            document.getElementById(
                `cell-${x}-${y}`
            );

        if (
            maze[x][y] !== "E"
        ) {
            cell.classList.add(
                "shortest"
            );
        }

        [x, y] = parent[x][y];
    }
}

function bfs() {

    const n = maze.length;

    const queue = [[0, 0]];

    const visited = Array.from(
        { length: n },
        () => Array(n).fill(false)
    );

    const parent = Array.from(
        { length: n },
        () => Array(n).fill(null)
    );

    visited[0][0] = true;

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    while (queue.length > 0) {

        const [x, y] =
            queue.shift();

        if (
            x === n - 1 &&
            y === n - 1
        ) {

            drawPath(
                parent,
                x,
                y
            );

            return {
                found: true
            };
        }

        for (const [dx, dy]
            of directions) {

            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 &&
                ny >= 0 &&
                nx < n &&
                ny < n &&
                maze[nx][ny] !== "#" &&
                !visited[nx][ny]
            ) {

                visited[nx][ny] = true;

                parent[nx][ny] =
                    [x, y];

                queue.push([
                    nx,
                    ny
                ]);

                if (
                    maze[nx][ny] !== "E"
                ) {

                    document
                        .getElementById(
                            `cell-${nx}-${ny}`
                        )
                        .classList.add(
                            "visited"
                        );
                }
            }
        }
    }

    return {
        found: false
    };
}

class PriorityQueue {

    constructor() {
        this.heap = [];
    }

    enqueue(item, priority) {

        const node = {
            item,
            priority
        };

        this.heap.push(node);

        this.bubbleUp();
    }

    bubbleUp() {

        let index =
            this.heap.length - 1;

        while (index > 0) {

            const parent =
                Math.floor(
                    (index - 1) / 2
                );

            if (
                this.heap[parent]
                    .priority <=
                this.heap[index]
                    .priority
            ) {
                break;
            }

            [
                this.heap[parent],
                this.heap[index]
            ] =
            [
                this.heap[index],
                this.heap[parent]
            ];

            index = parent;
        }
    }

    dequeue() {

        if (
            this.heap.length === 0
        ) {
            return null;
        }

        if (
            this.heap.length === 1
        ) {
            return this.heap.pop();
        }

        const min =
            this.heap[0];

        this.heap[0] =
            this.heap.pop();

        this.bubbleDown();

        return min;
    }

    bubbleDown() {

        let index = 0;

        while (true) {

            let left =
                2 * index + 1;

            let right =
                2 * index + 2;

            let smallest =
                index;

            if (
                left <
                this.heap.length &&
                this.heap[left]
                    .priority <
                this.heap[smallest]
                    .priority
            ) {
                smallest = left;
            }

            if (
                right <
                this.heap.length &&
                this.heap[right]
                    .priority <
                this.heap[smallest]
                    .priority
            ) {
                smallest = right;
            }

            if (
                smallest === index
            ) {
                break;
            }

            [
                this.heap[index],
                this.heap[smallest]
            ] =
            [
                this.heap[smallest],
                this.heap[index]
            ];

            index = smallest;
        }
    }

    isEmpty() {
        return (
            this.heap.length === 0
        );
    }
}

function heuristic(
    x,
    y,
    goal
) {

    return (
        Math.abs(x - goal) +
        Math.abs(y - goal)
    );
}

function astar() {

    const n = maze.length;

    const pq =
        new PriorityQueue();

    const visited = Array.from(
        { length: n },
        () => Array(n).fill(false)
    );

    const parent = Array.from(
        { length: n },
        () => Array(n).fill(null)
    );

    pq.enqueue(
        [0, 0, 0],
        0
    );

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    while (!pq.isEmpty()) {

        const {
            item: [x, y, g]
        } = pq.dequeue();

        if (
            visited[x][y]
        ) {
            continue;
        }

        visited[x][y] = true;

        if (
            x === n - 1 &&
            y === n - 1
        ) {

            drawPath(
                parent,
                x,
                y
            );

            return {
                found: true
            };
        }

        for (const [dx, dy]
            of directions) {

            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 &&
                ny >= 0 &&
                nx < n &&
                ny < n &&
                maze[nx][ny] !== "#" &&
                !visited[nx][ny]
            ) {

                parent[nx][ny] =
                    [x, y];

                const newG =
                    g + 1;

                const h =
                    heuristic(
                        nx,
                        ny,
                        n - 1
                    );

                pq.enqueue(
                    [nx, ny, newG],
                    newG + h
                );

                if (
                    maze[nx][ny] !== "E"
                ) {

                    document
                        .getElementById(
                            `cell-${nx}-${ny}`
                        )
                        .classList.add(
                            "visited"
                        );
                }
            }
        }
    }

    return {
        found: false
    };
}

generateMaze();