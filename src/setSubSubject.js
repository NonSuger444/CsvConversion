'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

// Subject Info
let SUBJECT_CODE;
IPC_RENDERER.on('get_subject_info', (event, subjectInfo) => {
  SUBJECT_CODE = subjectInfo.code;
  document.getElementById('subjectCode').value = subjectInfo.code;
  document.getElementById('subjectName').value = subjectInfo.name;
});

// Database
const DATABASE = require('./js/operationDb');
const SUB_SUBJECT_DB = new DATABASE('./db/subSubject.db');
const SUB_SUBJECT_DATA = require('./js/subSubjectData');

// Table
const TABLE = require('./js/subjectTable');
const SUBJECT_TABLE = new TABLE(
    document.getElementById('subjectListItem'),
    SUB_SUBJECT_DATA.columnInfo());

// Initialize
SUB_SUBJECT_DB.ensureIndex({fieldName: 'uniqueCode', unique: true})
    .then(() => {
      return SUB_SUBJECT_DB.load();
    })
    .then(() => {
      return SUB_SUBJECT_DB.sort({subjectCode: SUBJECT_CODE}, {code: 1});
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
  SUBJECT_TABLE.newRow(SUB_SUBJECT_DATA.emptyData());
});

document.getElementById('signUp').addEventListener('click', () => {
  // Check Validate
  if (!document.forms.settingsForm.checkValidity()) return;
  // Sign Up
  for (let row = 1; row < SUBJECT_TABLE.countChildlen(); row++) {
    const DATA = new SUB_SUBJECT_DATA();
    DATA.subjectCode = SUBJECT_CODE;
    DATA.subSubjectCode = SUBJECT_TABLE.getCode(row);
    DATA.subSubjectName = SUBJECT_TABLE.getName(row);
    switch (SUBJECT_TABLE.getState(row)) {
      case TABLE.getNewStateText():
        SUB_SUBJECT_DB.insert(DATA.dbData())
            .catch((error) => console.error(error));
        break;
      case TABLE.getChangeStateText():
        SUB_SUBJECT_DB.update({_id: SUBJECT_TABLE.getID(row)},
            {$set: DATA.dbData()})
            .catch((error) => console.error(error));
        break;
      case TABLE.getDeleteStateText():
        SUB_SUBJECT_DB.destroy({_id: SUBJECT_TABLE.getID(row)})
            .catch((error) => console.error(error));
        break;
    }
  }
});

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_sub_subject');
});
