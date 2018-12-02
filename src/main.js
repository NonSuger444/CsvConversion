'use strict';

// Electron
const ELECTRON = require('electron');
const {app, BrowserWindow, ipcMain} = ELECTRON;

let mainWindow;
let setSubSubjectWindow;

app.on('ready', () => {
  // Create Window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false});
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Show DevTools
  mainWindow.webContents.openDevTools();

  // Close Window
  mainWindow.on('closed', () => app.quit());
});

ipcMain.on('set_subject', (event) => {
  mainWindow.loadURL(`file://${__dirname}/setSubject.html`);
});

ipcMain.on('open_sub_subject', (event, subjectInfo) => {
  // Create Window
  setSubSubjectWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    center: true,
    show: false});
  setSubSubjectWindow.once('ready-to-show', () => {
    setSubSubjectWindow.show();
  });
  setSubSubjectWindow.loadURL(`file://${__dirname}/setSubSubject.html`);
  // Send Data
  setSubSubjectWindow.webContents.on('did-finish-load', () => {
    setSubSubjectWindow.send('get_subject_info', subjectInfo);
  });
  // Show DevTools
  setSubSubjectWindow.webContents.openDevTools();
  // Close
  setSubSubjectWindow.on('close', () => {
    setSubSubjectWindow = null;
  });
});

ipcMain.on('close_sub_subject', (event) => {
  setSubSubjectWindow.close();
});
