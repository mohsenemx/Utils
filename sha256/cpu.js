// cpu.js
async function runCpuBenchmark(duration) {
    const numThreads = navigator.hardwareConcurrency || 4; // Default to 4 threads if not available
    const chunkSize = 100000; // Number of hashes per worker
    let totalHashes = 0;

    const workers = [];
    let workersCompleted = 0;

    // Create Web Workers and distribute work
    for (let i = 0; i < numThreads; i++) {
        const worker = new Worker('cpu-worker.js');
        workers.push(worker);

        // Send worker the task to run hashing
        worker.postMessage({ chunkSize, duration });

        worker.onmessage = function (e) {
            totalHashes += e.data.hashes;
            workersCompleted++;

            // If all workers have completed, resolve the promise
            if (workersCompleted === numThreads) {
                // Resolve the promise with total hashes
                resolve(totalHashes);
            }
        };
    }
    
    // Return a promise that resolves after all workers are done
    return new Promise((resolve) => {
        setTimeout(() => {
            workers.forEach(worker => worker.terminate());
            resolve(totalHashes); // Return the final hash count after the timeout
        }, duration);
    });
}
