function bfs(maze) {

    const n = maze.length;

    const queue = [[0, 0, 0]];

    const visited = Array.from(
        { length: n },
        () => Array(n).fill(false)
    );

    visited[0][0] = true;

    let visitedCount = 1;

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    while (queue.length > 0) {

        const [x, y, dist] =
            queue.shift();

        if (
            x === n - 1 &&
            y === n - 1
        ) {

            return {
                found: true,
                pathLength: dist,
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

                visited[nx][ny] = true;

                visitedCount++;

                queue.push([
                    nx,
                    ny,
                    dist + 1
                ]);
            }
        }
    }

    return {
        found: false,
        pathLength: -1,
        visitedNodes: visitedCount
    };
}

module.exports = bfs;