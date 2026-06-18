const PriorityQueue =
    require("./priorityQueue");

function heuristic(x, y, goal) {

    return (
        Math.abs(x - goal) +
        Math.abs(y - goal)
    );
}

function astar(maze) {

    const n = maze.length;

    const pq = new PriorityQueue();

    pq.enqueue([0, 0, 0], 0);

    const visited = Array.from(
        { length: n },
        () => Array(n).fill(false)
    );

    let visitedCount = 0;

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

        if (visited[x][y]) {
            continue;
        }

        visited[x][y] = true;

        visitedCount++;

        if (
            x === n - 1 &&
            y === n - 1
        ) {

            return {
                found: true,
                pathLength: g,
                visitedNodes: visitedCount
            };
        }

        for (const [dx, dy] of directions) {

            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 &&
                ny >= 0 &&
                nx < n &&
                ny < n &&
                maze[nx][ny] === 0 &&
                !visited[nx][ny]
            ) {

                const newG = g + 1;

                const h = heuristic(
                    nx,
                    ny,
                    n - 1
                );

                const f = newG + h;

                pq.enqueue(
                    [nx, ny, newG],
                    f
                );
            }
        }
    }

    return {
        found: false,
        pathLength: -1,
        visitedNodes: visitedCount
    };
}

module.exports = astar;