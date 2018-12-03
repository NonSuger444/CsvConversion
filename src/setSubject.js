'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

// Database
const DATABASE = require('./js/operationDb');
const SUBJECT_DB = new DATABASE('./db/subject.db');
const SUBJECT_DATA = require('./js/subjectData');

// Table
const TABLE = require('./js/subjectTable');
const SUBJECT_TABLE = new TABLE(
    document.getElementById('subjectListItem'),
    SUBJECT_DATA.columnInfo(),
    true);

// Initialize
SUBJECT_DB.ensureIndex({fieldName: 'code', unique: true})
    .then(() => {
      return SUBJECT_DB.load();
    })
    .then(() => {
      return SUBJECT_DB.sort({}, {code: 1});
    })
    .then((docs) => {
      docs.forEach((doc) => {
        SUBJECT_TABLE.setRow(doc);
      });
    })
    .catch((error) => {
      console.error(error);
    });

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
    const DATA = new SUBJECT_DATA();
    DATA.code = SUBJECT_TABLE.getCode(row);
    DATA.name = SUBJECT_TABLE.getName(row);
    switch (SUBJECT_TABLE.getState(row)) {
      case TABLE.getNewStateText():
        SUBJECT_DB.insert(DATA.dbData())
            .catch((error) => console.error(error));
        break;
      case TABLE.getChangeStateText():
        SUBJECT_DB.update({_id: SUBJECT_TABLE.getID(row)},
            {$set: DATA.dbData()})
            .catch((error) => console.error(error));
        break;
      case TABLE.getDeleteStateText():
        SUBJECT_DB.destroy({_id: SUBJECT_TABLE.getID(row)})
            .catch((error) => console.error(error));
        break;
    }
  }
  return true;
};

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_subject');
});
