function mulberry32(seed) {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function generateMaze(size, seed) {

    const random = mulberry32(seed);

    let maze = Array.from(
        { length: size },
        () => Array(size).fill(0)
    );

    for (let i = 0; i < size; i++) {

        for (let j = 0; j < size; j++) {

            if (
                !(i === 0 && j === 0) &&
                !(i === size - 1 && j === size - 1)
            ) {

                maze[i][j] =
                    random() < 0.3 ? 1 : 0;
            }
        }
    }

    return maze;
}

module.exports = generateMaze;