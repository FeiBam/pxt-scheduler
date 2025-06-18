namespace MyScheduler {
    export enum LoopMode {
        ONCE,
        PERMANENT
        }
    export class Task { 
        fn: () => void
        time: number
        mode: LoopMode
        id: number
        constructor(fn: () => void, time: number, mode: LoopMode, id: number) {
            this.fn = fn
            this.time = time
            this.mode = mode
            this.id = id
        }
    }
    export class TaskScheduler { 
        private taskQueue: Task[]

        constructor() {
            this.taskQueue = []
        }

        public createTask(fn: () => void, time: number, mode: LoopMode, id: number) {
            for (let i = 0; i < this.taskQueue.length; i++) {
                if (this.taskQueue[i].id === id) {
                    this.taskQueue[i].time = 0
                }
            }
            this.taskQueue.push(new Task(fn, time, mode, id))
        }

        public run() {
            for (let j = 0; j < this.taskQueue.length; j++) {
                let start = input.runningTime()
                this.taskQueue[j].fn()
                let elapsed = input.runningTime() - start
                let remaining = this.taskQueue[j].time - elapsed
                if (remaining > 0) basic.pause(remaining)

                if (this.taskQueue[j].mode === LoopMode.ONCE) {
                    this.taskQueue.removeAt(j)
                    j--
                }
            }
        }
     }
}