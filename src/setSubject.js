'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

// Database
const DATABASE = require('./js/operationDb');
const SUBJECT_DB = new DATABASE('./db/subject.db');
const SUB_SUBJECT_DB = new DATABASE('./db/subSubject.db');
const SUBJECT_DATA = require('./js/subjectData');
const SUB_SUBJECT_DATA = require('./js/subSubjectData');

// Table
const TABLE = require('./js/subjectTable');
const SUBJECT_TABLE = new TABLE(
    document.getElementById('subjectListItem'),
    SUBJECT_DATA.columnInfo(),
    true);

// Initialize
SUBJECT_DB.load().then(() => {
  return SUB_SUBJECT_DB.load();
}).then(() => {
  return SUBJECT_DB.ensureIndex({
    fieldName: SUBJECT_DATA.columnCode(),
    unique: true,
  });
}).then(() => {
  return SUBJECT_DB.ensureIndex({
    fieldName: SUBJECT_DATA.columnName(),
    unique: true,
  });
}).then(() => {
  return SUBJECT_DB.sort({}, SUBJECT_DATA.sortAscCode());
}).then((docs) => {
  docs.forEach((doc) => SUBJECT_TABLE.setRow(doc));
}).catch((error) => console.error(error));

document.getElementById('add').addEventListener('click', () => {
  if (SUBJECT_TABLE.checkError()) return;
  SUBJECT_TABLE.newRow(SUBJECT_DATA.emptyData());
});

document.getElementById('settingsForm').onsubmit = () => {
  // Check Validate
  if (SUBJECT_TABLE.checkError()) return false;
  if (!document.forms.settingsForm.checkValidity()) return false;
  // Sign Up
  for (let row = 1; row < SUBJECT_TABLE.countChildlen(); row++) {
    const DATA = new SUBJECT_DATA(
        SUBJECT_TABLE.getID(row),
        SUBJECT_TABLE.getCode(row),
        SUBJECT_TABLE.getName(row));
    switch (SUBJECT_TABLE.getState(row)) {
      case TABLE.getNewStateText():
        SUBJECT_DB.insert(DATA.dbData())
            .catch((error) => console.error(error));
        break;
      case TABLE.getChangeStateText():
        const SUB = new SUB_SUBJECT_DATA(null, SUBJECT_TABLE.getID(row));
        SUBJECT_DB.update(DATA.findId(), DATA.updateAll()).then(() => {
          return SUB_SUBJECT_DB.find(SUB.findParent());
        }).then((docs) => {
          docs.forEach((subInfo, index) => {
            // Set Data
            SUB.id = subInfo[SUB_SUBJECT_DATA.columnId()];
            SUB.subjectCode = DATA.code;
            SUB.subjectName = DATA.name;
            SUB.subSubjectCode = subInfo[SUB_SUBJECT_DATA.columnCode()];
            SUB.subSubjectName = subInfo[SUB_SUBJECT_DATA.columnName()];
            // Update
            SUB_SUBJECT_DB.update(SUB.findId(), SUB.updateAll())
                .catch((error) => console.error(error));
          });
        }).catch((error) => console.error(error));
        break;
      case TABLE.getDeleteStateText():
        SUBJECT_DB.destroy(DATA.findId()).then(() => {
          const SUB = new SUB_SUBJECT_DATA(null, SUBJECT_TABLE.getID(row));
          return SUB_SUBJECT_DB.destroy(
              SUB.findParent(),
              SUB_SUBJECT_DATA.multiFlag());
        }).catch((error) => console.error(error));
        break;
    }
  }
  return true;
};

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_subject');
});
