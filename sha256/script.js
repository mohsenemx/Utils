// script.js

// This script initializes the correct benchmark based on the user's choice
async function runBenchmark() {
  const isCpuMode = document.getElementById("cpu-toggle").checked;
  const outputHashes = document.getElementById("hashes");
  const outputTime = document.getElementById("time");
  const outputRate = document.getElementById("rate");
  const slider = document.getElementById("duration-slider");
  const duration = parseInt(slider.value);

  // Clear previous results
  outputHashes.textContent = "Calculating...";
  outputTime.textContent = "Calculating...";
  outputRate.textContent = "Calculating...";

  const startTime = performance.now();
  let count = 0;

  if (isCpuMode) {
    // Run CPU Benchmark with multi-threading
    count = await runCpuBenchmark(duration);
  } else {
    count = runGpuBenchmark(duration);
    // Run GPU Benchmark
  }

  const totalTime = performance.now() - startTime;
  const hashRate = Math.floor((count / totalTime) * 1000);

  // Display results with formatted numbers
  outputHashes.textContent = count.toLocaleString();
  outputTime.textContent = totalTime.toFixed(2).toLocaleString();
  outputRate.textContent = hashRate.toLocaleString();
}

// Event listeners
document.getElementById("start-btn").addEventListener("click", runBenchmark);

// Update the slider value
const slider = document.getElementById("duration-slider");
const durationValue = document.getElementById("duration-value");
slider.addEventListener("input", () => {
  durationValue.textContent = slider.value;
});
