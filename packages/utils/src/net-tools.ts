/**
 * 创建一个带有超时功能的fetch函数
 * @param timeout 超时时间，单位为毫秒
 * @returns 返回一个增强的fetch函数，该函数会在指定时间后自动中止请求
 */
function createFetch(timeout: number) {
    return (url: string, options: RequestInit) => {
        const abortController = new AbortController();
        options = options || {};
        options.signal = abortController.signal;
        setTimeout(() => {
            abortController.abort();
        }, timeout);
        return fetch(url, options);
    };
}

/**
 * 依次执行任务数组中的所有任务，利用requestIdleCallback在浏览器空闲时期执行任务
 * @param tasks 一个包含多个任务函数的数组
 */
function performTasks(tasks: (() => void)[]) {
    if (tasks.length === 0) {
        return;
    }
    let i = 0;
    function _execute() {
        requestIdleCallback((deadline) => {
            while (i < tasks.length && deadline.timeRemaining() > 0) {
                tasks[i++]();
                _execute();
            }
        });
    }
    _execute();
}

type chunkTaskType = (goOn: () => boolean) => void;
type schedulerType = (chunkTask: chunkTaskType) => void;

/**
 * 根据给定的任务调度器执行任务数组中的所有任务
 * @param tasks 一个包含多个任务函数的数组
 * @param scheduler 任务调度器，用于决定何时执行任务
 */
function performTasksByScheduler(
    tasks: (() => void)[],
    scheduler: schedulerType
) {
    if (tasks.length === 0) {
        return;
    }
    let i = 0;
    function _execute() {
        scheduler((goOn) => {
            while (i < tasks.length && goOn()) {
                tasks[i++]();
                _execute();
            }
        });
    }
    _execute();
}

/**
 * 使用requestIdleCallback作为调度器来执行任务数组中的所有任务
 * @param tasks 一个包含多个任务函数的数组
 */
function idleCallbackPerformTasks(tasks: (() => void)[]) {
    const idleCallbackScheduler = (chunkTask: chunkTaskType) => {
        requestIdleCallback((deadline) => {
            chunkTask(() => deadline.timeRemaining() > 0);
        });
    };
    performTasksByScheduler(tasks, idleCallbackScheduler);
}

/**
 * 使用setTimeout作为调度器来执行任务数组中的所有任务，每个任务执行不超过1毫秒
 * @param tasks 一个包含多个任务函数的数组
 */
function timeoutPerformTasks(tasks: (() => void)[]) {
    const timeoutScheduler = (chunkTask: chunkTaskType) => {
        setTimeout(() => {
            const now = performance.now();
            chunkTask(() => performance.now() - now < 1);
        }, 1000);
    };
    performTasksByScheduler(tasks, timeoutScheduler);
}

type requestOptions = {
    url: string;
    method: "GET" | "POST";
    progress: (percent: number) => void;
    data?: any;
};

function xhrRequest(options: requestOptions): Promise<Blob> {
    const { url, method, progress, data = null } = options;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                progress(percentComplete);
            }
        });
        xhr.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                progress(percentComplete);
            }
        });
        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error("请求出错：${xhr.status}"));
            }
        });
        xhr.open(method, url);
        xhr.send(data);
    });
}

/*eslint no-async-promise-executor: "off"*/
/*eslint no-constant-condition: "off"*/
function fetchRequest(
    options: requestOptions & { abortController: AbortController }
): Promise<Blob> {
    const { url, method, progress, data = null, abortController } = options;
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url, {
            method,
            body: data,
            signal: abortController.signal,
        });
        if (!response.ok) {
            reject(new Error("请求出错"));
        }
        const contentLength = response.headers.get("Content-Length");
        let total = -1;
        if (contentLength) {
            total = parseInt(contentLength);
        }
        if (response.body) {
            const reader = response.body.getReader();
            let loaded = 0;
            const chunks: Uint8Array[] = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                loaded += value.length;
                chunks.push(value);
                progress((loaded / total) * 100);
            }
            resolve(new Blob(chunks));
        }
        reject(new Error("请求出错"));
    });
}

export {
    createFetch,
    idleCallbackPerformTasks,
    performTasks,
    performTasksByScheduler,
    timeoutPerformTasks,
};

export type { chunkTaskType, schedulerType };
