import { Worker, WorkerOptions } from "worker_threads"
import events from 'events'

export class WorkerThreadsManager {
    static workers: number = 0;

    static createWorker(filename: string, data?: WorkerOptions) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(filename, data);
            this.workers++;
            worker.on('message', (msg) => {
                console.log(`main ${worker.threadId} receive: ${msg}`);
                resolve(msg);
            })
            worker.on('error', reject)
            worker.on('exit', (code) => {
                console.log(`worker ${worker.threadId} exit, code: ${code}`)
                this.workers--;
            })

        })
    }

    static inc() {

    }
}