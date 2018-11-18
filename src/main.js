'use strict';

// Electron
const ELECTRON = require('electron');
const {app, BrowserWindow, ipcMain} = ELECTRON;

let mainWindow;

app.on('ready', () => {
  // Create Window
  mainWindow = new BrowserWindow({width: 1200, height: 800});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Show DevTools
  mainWindow.webContents.openDevTools();

  // Close Window
  mainWindow.on('closed', () => app.quit());
});

ipcMain.on('set_subject', (event) => {
  mainWindow.loadURL(`file://${__dirname}/setSubject.html`);
});
