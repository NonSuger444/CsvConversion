'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

document.getElementById('convertCashbook').addEventListener('click', () => {
  IPC_RENDERER.send('open_convert_cashbook');
});

document.getElementById('setSubject').addEventListener('click', () => {
  IPC_RENDERER.send('open_subject');
});

document.getElementById('settings').addEventListener('click', () => {
  IPC_RENDERER.send('open_settings');
});
