'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

// Database
const DATABASE = require('./js/operationDb');
const SUBJECT_DB = new DATABASE('./db/subject.db');
const SUB_SUBJECT_DB = new DATABASE('./db/subSubject.db');
const SUBJECT_DATA = require('./js/subjectData');
const DATA = new SUBJECT_DATA();
const SUB_SUBJECT_DATA = require('./js/subSubjectData');
const SUB_DATA = new SUB_SUBJECT_DATA();

// Table
const TABLE = require('./js/searchSubjectTable');
const SUBJECT_TABLE = new TABLE(
    document.getElementById('subjectListItem'),
    SUBJECT_DATA.columnInfo(),
    true);
const SUB_SUBJECT_TABLE = new TABLE(
    document.getElementById('subSubjectListItem'),
    SUBJECT_DATA.columnInfo(),
    false);

// Initialize
SUBJECT_DB.load()
    .then(() => {
      return SUBJECT_DB.sort({}, {code: 1});
    })
    .then((docs) => {
      docs.forEach((doc) => {
        SUBJECT_TABLE.setRow(doc);
      });
    })
    .catch((error) => console.error(error));
SUB_SUBJECT_DB.load()
    .catch((error) => console.error(error));

document.getElementById('searchSubject').addEventListener('input', () => {
  // Delete SubSubject Table
  SUBJECT_TABLE.deleteAllRow();
  // Search
  const searchValue = document.getElementById('searchSubject').value;
  SUBJECT_DB.sort({code: new RegExp('^' + searchValue)}, {code: 1})
      .then((docs) => {
        docs.forEach((doc) => {
          SUBJECT_TABLE.setRow(doc);
        });
      })
      .catch((error) => console.error(error));
});

document.getElementById('subjectListItem').addEventListener('click', () => {
  // Delete SubSubject Table
  SUB_SUBJECT_TABLE.deleteAllRow();
  // Set SubSubject Table
  SUB_DATA.subjectId = SUBJECT_TABLE.getSelectSubjectId();
  SUB_SUBJECT_DB.sort(SUB_DATA.searchParentData(), {code: 1})
      .then((docs) => {
        docs.forEach((doc) => {
          SUB_SUBJECT_TABLE.setRow(doc);
        });
      })
      .catch((error) => console.error(error));
});

document.getElementById('close').addEventListener('click', () => {
  IPC_RENDERER.send('close_search_subject');
});
