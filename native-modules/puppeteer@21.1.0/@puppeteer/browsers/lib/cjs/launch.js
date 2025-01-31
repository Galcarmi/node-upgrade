"use strict";
/**
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = exports.isErrnoException = exports.isErrorLike = exports.Process = exports.WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX = exports.CDP_WEBSOCKET_ENDPOINT_REGEX = exports.launch = exports.computeSystemExecutablePath = exports.computeExecutablePath = void 0;
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = require("fs");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const browser_data_js_1 = require("./browser-data/browser-data.js");
const Cache_js_1 = require("./Cache.js");
const debug_js_1 = require("./debug.js");
const detectPlatform_js_1 = require("./detectPlatform.js");
const debugLaunch = (0, debug_js_1.debug)('puppeteer:browsers:launcher');
/**
 * @public
 */
function computeExecutablePath(options) {
    options.platform ??= (0, detectPlatform_js_1.detectBrowserPlatform)();
    if (!options.platform) {
        throw new Error(`Cannot download a binary for the provided platform: ${os_1.default.platform()} (${os_1.default.arch()})`);
    }
    const installationDir = new Cache_js_1.Cache(options.cacheDir).installationDir(options.browser, options.platform, options.buildId);
    return path_1.default.join(installationDir, browser_data_js_1.executablePathByBrowser[options.browser](options.platform, options.buildId));
}
exports.computeExecutablePath = computeExecutablePath;
/**
 * @public
 */
function computeSystemExecutablePath(options) {
    options.platform ??= (0, detectPlatform_js_1.detectBrowserPlatform)();
    if (!options.platform) {
        throw new Error(`Cannot download a binary for the provided platform: ${os_1.default.platform()} (${os_1.default.arch()})`);
    }
    const path = (0, browser_data_js_1.resolveSystemExecutablePath)(options.browser, options.platform, options.channel);
    try {
        (0, fs_1.accessSync)(path);
    }
    catch (error) {
        throw new Error(`Could not find Google Chrome executable for channel '${options.channel}' at '${path}'.`);
    }
    return path;
}
exports.computeSystemExecutablePath = computeSystemExecutablePath;
/**
 * @public
 */
function launch(opts) {
    return new Process(opts);
}
exports.launch = launch;
/**
 * @public
 */
exports.CDP_WEBSOCKET_ENDPOINT_REGEX = /^DevTools listening on (ws:\/\/.*)$/;
/**
 * @public
 */
exports.WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX = /^WebDriver BiDi listening on (ws:\/\/.*)$/;
/**
 * @public
 */
class Process {
    #executablePath;
    #args;
    #browserProcess;
    #exited = false;
    // The browser process can be closed externally or from the driver process. We
    // need to invoke the hooks only once though but we don't know how many times
    // we will be invoked.
    #hooksRan = false;
    #onExitHook = async () => { };
    #browserProcessExiting;
    constructor(opts) {
        this.#executablePath = opts.executablePath;
        this.#args = opts.args ?? [];
        opts.pipe ??= false;
        opts.dumpio ??= false;
        opts.handleSIGINT ??= true;
        opts.handleSIGTERM ??= true;
        opts.handleSIGHUP ??= true;
        // On non-windows platforms, `detached: true` makes child process a
        // leader of a new process group, making it possible to kill child
        // process tree with `.kill(-pid)` command. @see
        // https://nodejs.org/api/child_process.html#child_process_options_detached
        opts.detached ??= process.platform !== 'win32';
        const stdio = this.#configureStdio({
            pipe: opts.pipe,
            dumpio: opts.dumpio,
        });
        debugLaunch(`Launching ${this.#executablePath} ${this.#args.join(' ')}`, {
            detached: opts.detached,
            env: opts.env,
            stdio,
        });
        this.#browserProcess = child_process_1.default.spawn(this.#executablePath, this.#args, {
            detached: opts.detached,
            env: opts.env,
            stdio,
        });
        debugLaunch(`Launched ${this.#browserProcess.pid}`);
        if (opts.dumpio) {
            this.#browserProcess.stderr?.pipe(process.stderr);
            this.#browserProcess.stdout?.pipe(process.stdout);
        }
        process.on('exit', this.#onDriverProcessExit);
        if (opts.handleSIGINT) {
            process.on('SIGINT', this.#onDriverProcessSignal);
        }
        if (opts.handleSIGTERM) {
            process.on('SIGTERM', this.#onDriverProcessSignal);
        }
        if (opts.handleSIGHUP) {
            process.on('SIGHUP', this.#onDriverProcessSignal);
        }
        if (opts.onExit) {
            this.#onExitHook = opts.onExit;
        }
        this.#browserProcessExiting = new Promise((resolve, reject) => {
            this.#browserProcess.once('exit', async () => {
                debugLaunch(`Browser process ${this.#browserProcess.pid} onExit`);
                this.#clearListeners();
                this.#exited = true;
                try {
                    await this.#runHooks();
                }
                catch (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
    async #runHooks() {
        if (this.#hooksRan) {
            return;
        }
        this.#hooksRan = true;
        await this.#onExitHook();
    }
    get nodeProcess() {
        return this.#browserProcess;
    }
    #configureStdio(opts) {
        if (opts.pipe) {
            if (opts.dumpio) {
                return ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'];
            }
            else {
                return ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'];
            }
        }
        else {
            if (opts.dumpio) {
                return ['pipe', 'pipe', 'pipe'];
            }
            else {
                return ['pipe', 'ignore', 'pipe'];
            }
        }
    }
    #clearListeners() {
        process.off('exit', this.#onDriverProcessExit);
        process.off('SIGINT', this.#onDriverProcessSignal);
        process.off('SIGTERM', this.#onDriverProcessSignal);
        process.off('SIGHUP', this.#onDriverProcessSignal);
    }
    #onDriverProcessExit = (_code) => {
        this.kill();
    };
    #onDriverProcessSignal = (signal) => {
        switch (signal) {
            case 'SIGINT':
                this.kill();
                process.exit(130);
            case 'SIGTERM':
            case 'SIGHUP':
                void this.close();
                break;
        }
    };
    async close() {
        await this.#runHooks();
        if (!this.#exited) {
            this.kill();
        }
        return this.#browserProcessExiting;
    }
    hasClosed() {
        return this.#browserProcessExiting;
    }
    kill() {
        debugLaunch(`Trying to kill ${this.#browserProcess.pid}`);
        // If the process failed to launch (for example if the browser executable path
        // is invalid), then the process does not get a pid assigned. A call to
        // `proc.kill` would error, as the `pid` to-be-killed can not be found.
        if (this.#browserProcess &&
            this.#browserProcess.pid &&
            pidExists(this.#browserProcess.pid)) {
            try {
                debugLaunch(`Browser process ${this.#browserProcess.pid} exists`);
                if (process.platform === 'win32') {
                    try {
                        child_process_1.default.execSync(`taskkill /pid ${this.#browserProcess.pid} /T /F`);
                    }
                    catch (error) {
                        debugLaunch(`Killing ${this.#browserProcess.pid} using taskkill failed`, error);
                        // taskkill can fail to kill the process e.g. due to missing permissions.
                        // Let's kill the process via Node API. This delays killing of all child
                        // processes of `this.proc` until the main Node.js process dies.
                        this.#browserProcess.kill();
                    }
                }
                else {
                    // on linux the process group can be killed with the group id prefixed with
                    // a minus sign. The process group id is the group leader's pid.
                    const processGroupId = -this.#browserProcess.pid;
                    try {
                        process.kill(processGroupId, 'SIGKILL');
                    }
                    catch (error) {
                        debugLaunch(`Killing ${this.#browserProcess.pid} using process.kill failed`, error);
                        // Killing the process group can fail due e.g. to missing permissions.
                        // Let's kill the process via Node API. This delays killing of all child
                        // processes of `this.proc` until the main Node.js process dies.
                        this.#browserProcess.kill('SIGKILL');
                    }
                }
            }
            catch (error) {
                throw new Error(`${PROCESS_ERROR_EXPLANATION}\nError cause: ${isErrorLike(error) ? error.stack : error}`);
            }
        }
        this.#clearListeners();
    }
    waitForLineOutput(regex, timeout = 0) {
        if (!this.#browserProcess.stderr) {
            throw new Error('`browserProcess` does not have stderr.');
        }
        const rl = readline_1.default.createInterface(this.#browserProcess.stderr);
        let stderr = '';
        return new Promise((resolve, reject) => {
            rl.on('line', onLine);
            rl.on('close', onClose);
            this.#browserProcess.on('exit', onClose);
            this.#browserProcess.on('error', onClose);
            const timeoutId = timeout > 0 ? setTimeout(onTimeout, timeout) : undefined;
            const cleanup = () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                rl.off('line', onLine);
                rl.off('close', onClose);
                this.#browserProcess.off('exit', onClose);
                this.#browserProcess.off('error', onClose);
            };
            function onClose(error) {
                cleanup();
                reject(new Error([
                    `Failed to launch the browser process!${error ? ' ' + error.message : ''}`,
                    stderr,
                    '',
                    'TROUBLESHOOTING: https://pptr.dev/troubleshooting',
                    '',
                ].join('\n')));
            }
            function onTimeout() {
                cleanup();
                reject(new TimeoutError(`Timed out after ${timeout} ms while waiting for the WS endpoint URL to appear in stdout!`));
            }
            function onLine(line) {
                stderr += line + '\n';
                const match = line.match(regex);
                if (!match) {
                    return;
                }
                cleanup();
                // The RegExp matches, so this will obviously exist.
                resolve(match[1]);
            }
        });
    }
}
exports.Process = Process;
const PROCESS_ERROR_EXPLANATION = `Puppeteer was unable to kill the process which ran the browser binary.
This means that, on future Puppeteer launches, Puppeteer might not be able to launch the browser.
Please check your open processes and ensure that the browser processes that Puppeteer launched have been killed.
If you think this is a bug, please report it on the Puppeteer issue tracker.`;
/**
 * @internal
 */
function pidExists(pid) {
    try {
        return process.kill(pid, 0);
    }
    catch (error) {
        if (isErrnoException(error)) {
            if (error.code && error.code === 'ESRCH') {
                return false;
            }
        }
        throw error;
    }
}
/**
 * @internal
 */
function isErrorLike(obj) {
    return (typeof obj === 'object' && obj !== null && 'name' in obj && 'message' in obj);
}
exports.isErrorLike = isErrorLike;
/**
 * @internal
 */
function isErrnoException(obj) {
    return (isErrorLike(obj) &&
        ('errno' in obj || 'code' in obj || 'path' in obj || 'syscall' in obj));
}
exports.isErrnoException = isErrnoException;
/**
 * @public
 */
class TimeoutError extends Error {
    /**
     * @internal
     */
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=launch.js.map