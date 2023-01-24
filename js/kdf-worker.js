'use strict';

var calcHashArg;

self.onmessage = function (e) {
    self.postMessage('calc:' + e.data.calc);
    calcHashArg = e.data.arg;
    switch (e.data.calc) {
        case 'wasm':
            argon2WebAssembly('native-wasm');
            break;
        case 'simd':
            argon2WebAssembly('native-wasm', { simd: true });
            break;
    }
};

function log(msg) {
    self.postMessage({ msg: msg });
}

function connectSerial(hash) {
    self.postMessage({ hash: hash });
}

function loadScript(script, callback, errorCallback) {
    try {
        importScripts(script);
    } catch (e) {
        console.error('Error loading script', script, e);
        errorCallback(e);
        return;
    }
    callback();
}

function getArg() {
    return calcHashArg;
}

importScripts('kdf.js');

self.postMessage({ msg: 'Worker started' });
