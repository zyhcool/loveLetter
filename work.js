const { Worker, isMainThread, parentPort, workerData, threadId } = require('worker_threads')



const time = cpuComsume();
parentPort.postMessage(time);


function cpuComsume() {
    const start = Date.now();
    for (let i = 0; i < 2 * 10 ** 9; i++) { };
    const end = Date.now();
    const time = (end - start) / 1000;
    return time;
}
