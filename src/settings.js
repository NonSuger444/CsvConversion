'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

document.getElementById('cashSearch').addEventListener('click', (event) => {
  IPC_RENDERER.send('open_search_subject');
});

// // Database
// const DATABASE = require('./js/operationDb');
// const SUBJECT = new DATABASE('./db/subject.db');
// const SUB_SUBJECT = new DATABASE('./db/subSubject.db');
// const SUBJECT_DATA = require('./js/subjectData');
// SUBJECT.load()
//     .catch((error) => console.error(error));
// SUB_SUBJECT.load()
//     .catch((error) => console.error(error));

// document.getElementById('cashCode').addEventListener('input', function() {
//   const code = document.getElementById('cashCode').value;
//   const name = document.getElementById('cashName').value;

//   console.log(code);
//   if (code) {
//     SUBJECT.find({code: code})
//         .then((docs) => console.log(docs[0].name))
//         .catch((error) => console.error(error));
//   } else {
//     name = null;
//   }
// });

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_settings');
});
