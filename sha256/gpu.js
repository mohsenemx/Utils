// GPU Hashing Function
const gpu = new GPU();

function runGpuBenchmark(duration) {

    const hashKernel = gpu.createKernel(function(input, inputLength, iterations) {
        let hash = input[this.thread.x % inputLength];
        for (let i = 0; i < iterations; i++) {
            hash = (hash * 2654435761) % 4294967296;
        }
        return hash;
    })
    .setOutput([5000])
    .setPipeline(true);

    const input = new Array(5000).fill(12345678);
    let count = 0;
    const startTime = performance.now();
    while (performance.now() - startTime < duration) {
        hashKernel(input, input.length, 1000);
        count += 5000;
    }
    return count;
}
