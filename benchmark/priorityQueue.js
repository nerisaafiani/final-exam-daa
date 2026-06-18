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

            const parentIndex =
                Math.floor(
                    (index - 1) / 2
                );

            if (
                this.heap[parentIndex].priority <=
                this.heap[index].priority
            ) {
                break;
            }

            [
                this.heap[parentIndex],
                this.heap[index]
            ] = [
                this.heap[index],
                this.heap[parentIndex]
            ];

            index = parentIndex;
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

        const length =
            this.heap.length;

        while (true) {

            let left =
                2 * index + 1;

            let right =
                2 * index + 2;

            let smallest =
                index;

            if (
                left < length &&
                this.heap[left]
                    .priority <
                this.heap[smallest]
                    .priority
            ) {

                smallest = left;
            }

            if (
                right < length &&
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
            ] = [
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

module.exports = PriorityQueue;