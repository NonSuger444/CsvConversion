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

// Search Select Method
const SEARCH = {
  code: 'code',
  name: 'name',
};

// Search Method
let subjectSearch = SEARCH.code;
let subSubjectSearch = SEARCH.code;

// Settings Kind
let KIND;
IPC_RENDERER.on('get_settings_kind', (event, settingsKind) => {
  KIND = settingsKind;
});

// Initialize
SUBJECT_DB.load().then(() => {
  return SUBJECT_DB.sort({}, DATA.sortAscCode());
}).then((docs) => {
  docs.forEach((doc) => SUBJECT_TABLE.setRow(doc));
  subSubjectSearchDisabled(true);
  return true;
}).then(() => {
  return SUB_SUBJECT_DB.load();
}).catch((error) => console.error(error));

document.getElementById('searchMethod').addEventListener('change', () => {
  // Set Search Method
  const form = document.getElementById('searchMethod');
  for (let i = 0; i < form.length; i++) {
    if (form[i].checked) {
      subjectSearch = form[i].value;
      break;
    }
  }
  // Initialize
  document.getElementById('search').value = null;
  createSubjectTable();
});

document.getElementById('search').addEventListener('input', () => {
  createSubjectTable();
});

document.getElementById('subjectListItem').addEventListener('click', () => {
  // Delete SubSubject Table
  SUB_SUBJECT_TABLE.deleteAllRow();
  // Set SubSubject Table
  SUB_DATA.subjectId = SUBJECT_TABLE.getSelectSubjectId();
  SUB_SUBJECT_DB.sort(SUB_DATA.findParent(), SUB_DATA.sortAscCode())
      .then((docs) => {
        docs.forEach((doc) => {
          SUB_SUBJECT_TABLE.setRow(doc);
        });
        SUB_SUBJECT_TABLE.countChildlen() ?
          subSubjectSearchDisabled(false) :
          subSubjectSearchDisabled(true);
      })
      .catch((error) => console.error(error));
});

document.getElementById('searchSubMethod').addEventListener('change', () => {
  // Set Search Method
  const form = document.getElementById('searchSubMethod');
  for (let i = 0; i < form.length; i++) {
    if (form[i].checked) {
      subSubjectSearch = form[i].value;
      break;
    }
  }
  // Initialize
  document.getElementById('searchSub').value = null;
  createSubSubjectTable();
});

document.getElementById('searchSub').addEventListener('input', () => {
  createSubSubjectTable();
});

document.getElementById('choice').addEventListener('click', () => {
  IPC_RENDERER.send(
      'send_settings_info',
      {
        code: SUBJECT_TABLE.getSelectSubjectCode(),
        name: SUBJECT_TABLE.getSelectSubjectName(),
        subCode: SUB_SUBJECT_TABLE.getSelectSubSubjectCode(),
        subName: SUB_SUBJECT_TABLE.getSelectSubSubjectName(),
        kind: KIND,
      });
});

document.getElementById('close').addEventListener('click', () => {
  IPC_RENDERER.send('close_search_subject');
});

/**
 * Create Subject Table
 */
function createSubjectTable() {
  const value = document.getElementById('search').value;
  // Delete SubSubject Table
  SUBJECT_TABLE.deleteAllRow();
  // Find Query
  let query;
  switch (subjectSearch) {
    case SEARCH.code:
      DATA.code = value;
      value ?
        query = DATA.findRegCode() :
        query = {};
      break;
    case SEARCH.name:
      DATA.name = value;
      value ?
        query = DATA.findRegName() :
        query = {};
      break;
  }
  // Search
  SUBJECT_DB.sort(query, DATA.sortAscCode())
      .then((docs) => {
        docs.forEach((doc) => {
          SUBJECT_TABLE.setRow(doc);
        });
      })
      .catch((error) => console.error(error));
}

/**
 * Create Sub Subject Table
 */
function createSubSubjectTable() {
  const value = document.getElementById('searchSub').value;
  SUB_DATA.subjectId = SUBJECT_TABLE.getSelectSubjectId();
  // Delete SubSubject Table
  SUB_SUBJECT_TABLE.deleteAllRow();
  // Find Query
  let query;
  switch (subSubjectSearch) {
    case SEARCH.code:
      SUB_DATA.subSubjectCode = value;
      value ?
        query = SUB_DATA.findParentRegCode() :
        query = SUB_DATA.findParent();
      break;
    case SEARCH.name:
      SUB_DATA.subSubjectName = value;
      value ?
        query = SUB_DATA.findParentRegName() :
        query = SUB_DATA.findParent();
      break;
  }
  // Search
  SUB_SUBJECT_DB.sort(query, SUB_DATA.sortAscCode())
      .then((docs) => {
        docs.forEach((doc) => {
          SUB_SUBJECT_TABLE.setRow(doc);
        });
      })
      .catch((error) => console.error(error));
}

/**
 * SubSubject Search Disabled
 * @param {Boolean} disabled
 */
function subSubjectSearchDisabled(disabled) {
  document.getElementById('subCode').disabled = disabled;
  document.getElementById('subName').disabled = disabled;
  document.getElementById('searchSub').disabled = disabled;
}
