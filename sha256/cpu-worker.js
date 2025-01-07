// cpu-worker.js

onmessage = function(e) {
    const { chunkSize, duration } = e.data;

    let startTime = performance.now();
    let hashes = 0;

    // Perform hashing until duration is met
    while (performance.now() - startTime < duration) {
        for (let i = 0; i < chunkSize; i++) {
            // Perform a dummy SHA256 computation (replace with actual SHA256 logic)
            const hash = crypto.subtle.digest('SHA-256', new TextEncoder().encode(i.toString()));
            hashes++;
        }
    }

    // Send the number of hashes back to the main thread
    postMessage({ hashes });
};
