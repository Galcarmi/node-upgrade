"use strict";
/**
 * Copyright 2021 Google LLC.
 * Copyright (c) Microsoft Corporation.
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const chai_1 = require("chai");
const sinon = __importStar(require("sinon"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const transportStub_spec_js_1 = require("../utils/transportStub.spec.js");
const cdpConnection_js_1 = require("./cdpConnection.js");
chai.use(chai_as_promised_1.default);
const SOME_SESSION_ID = 'ABCD';
const ANOTHER_SESSION_ID = 'EFGH';
describe('CdpConnection', () => {
    it('can send a command message for a CdpClient', () => {
        const mockCdpServer = new transportStub_spec_js_1.StubTransport();
        const cdpConnection = new cdpConnection_js_1.CdpConnection(mockCdpServer);
        const browserMessage = JSON.stringify({
            id: 0,
            method: 'Browser.getVersion',
        });
        void cdpConnection.browserClient().sendCommand('Browser.getVersion');
        sinon.assert.calledOnceWithExactly(mockCdpServer.sendMessage, browserMessage);
    });
    it('creates a CdpClient for a session when the Target.attachedToTarget event is received', async () => {
        const mockCdpServer = new transportStub_spec_js_1.StubTransport();
        const cdpConnection = new cdpConnection_js_1.CdpConnection(mockCdpServer);
        (0, chai_1.expect)(() => cdpConnection.getCdpClient(SOME_SESSION_ID)).to.throw('Unknown CDP session ID');
        await mockCdpServer.emulateIncomingMessage({
            method: 'Target.attachedToTarget',
            params: { sessionId: SOME_SESSION_ID },
        });
        const cdpClient = cdpConnection.getCdpClient(SOME_SESSION_ID);
        (0, chai_1.expect)(cdpClient).to.not.be.null;
    });
    it('removes the CdpClient for a session when the Target.detachedFromTarget event is received', async () => {
        const mockCdpServer = new transportStub_spec_js_1.StubTransport();
        const cdpConnection = new cdpConnection_js_1.CdpConnection(mockCdpServer);
        await mockCdpServer.emulateIncomingMessage({
            method: 'Target.attachedToTarget',
            params: { sessionId: SOME_SESSION_ID },
        });
        const cdpClient = cdpConnection.getCdpClient(SOME_SESSION_ID);
        (0, chai_1.expect)(cdpClient).to.not.be.null;
        await mockCdpServer.emulateIncomingMessage({
            method: 'Target.detachedFromTarget',
            params: { sessionId: SOME_SESSION_ID },
        });
        (0, chai_1.expect)(() => cdpConnection.getCdpClient(SOME_SESSION_ID)).to.throw('Unknown CDP session ID');
    });
    it('routes event messages to the correct handler based on sessionId', async () => {
        const mockCdpServer = new transportStub_spec_js_1.StubTransport();
        const cdpConnection = new cdpConnection_js_1.CdpConnection(mockCdpServer);
        const browserMessage = { method: 'Browser.downloadWillBegin' };
        const sessionMessage = {
            sessionId: SOME_SESSION_ID,
            method: 'Page.frameNavigated',
        };
        const othersessionMessage = {
            sessionId: ANOTHER_SESSION_ID,
            method: 'Page.loadEventFired',
        };
        const browserCallback = sinon.fake();
        const sessionCallback = sinon.fake();
        const otherSessionCallback = sinon.fake();
        // Register for browser message callbacks.
        const browserClient = cdpConnection.browserClient();
        browserClient.on('Browser.downloadWillBegin', browserCallback);
        // Verify that the browser callback receives the message.
        await mockCdpServer.emulateIncomingMessage(browserMessage);
        sinon.assert.calledOnceWithExactly(browserCallback, {});
        browserCallback.resetHistory();
        // Attach session A.
        await mockCdpServer.emulateIncomingMessage({
            method: 'Target.attachedToTarget',
            params: { sessionId: SOME_SESSION_ID },
        });
        const sessionClient = cdpConnection.getCdpClient(SOME_SESSION_ID);
        (0, chai_1.expect)(sessionClient).to.not.be.null;
        sessionClient.on('Page.frameNavigated', sessionCallback);
        // Send another message for the browser and verify that only the browser callback receives it.
        // Verifies that adding another client doesn't affect routing for existing clients.
        await mockCdpServer.emulateIncomingMessage(browserMessage);
        sinon.assert.notCalled(sessionCallback);
        sinon.assert.calledOnceWithExactly(browserCallback, {});
        browserCallback.resetHistory();
        // Send a message for session A and verify that it is received.
        await mockCdpServer.emulateIncomingMessage(sessionMessage);
        sinon.assert.notCalled(browserCallback);
        sinon.assert.calledOnceWithExactly(sessionCallback, {});
        sessionCallback.resetHistory();
        // Attach session B.
        await mockCdpServer.emulateIncomingMessage({
            method: 'Target.attachedToTarget',
            params: { sessionId: ANOTHER_SESSION_ID },
        });
        const otherSessionClient = cdpConnection.getCdpClient(ANOTHER_SESSION_ID);
        (0, chai_1.expect)(otherSessionClient).to.not.be.null;
        otherSessionClient.on('Page.loadEventFired', otherSessionCallback);
        // Send a message for session B and verify that only the session B callback receives it.
        // Verifies that a message is sent only to the session client it is intended for.
        await mockCdpServer.emulateIncomingMessage(othersessionMessage);
        sinon.assert.notCalled(browserCallback);
        sinon.assert.notCalled(sessionCallback);
        sinon.assert.calledOnceWithExactly(otherSessionCallback, {});
        otherSessionCallback.resetHistory();
    });
    it('closes the transport connection when closed', () => {
        const mockCdpServer = new transportStub_spec_js_1.StubTransport();
        const cdpConnection = new cdpConnection_js_1.CdpConnection(mockCdpServer);
        cdpConnection.close();
        sinon.assert.calledOnce(mockCdpServer.close);
    });
});
//# sourceMappingURL=cdpConnection.spec.js.map