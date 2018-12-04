'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

// Subject Info
let SUBJECT_ID;
let SUBJECT_CODE;
let SUBJECT_NAME;
IPC_RENDERER.on('get_subject_info', (event, subjectInfo) => {
  SUBJECT_ID = subjectInfo.id;
  SUBJECT_CODE = subjectInfo.code;
  SUBJECT_NAME = subjectInfo.name;
  document.getElementById('subjectCode').value = SUBJECT_CODE;
  document.getElementById('subjectName').value = SUBJECT_NAME;
});

// Database
const DATABASE = require('./js/operationDb');
const SUB_SUBJECT_DB = new DATABASE('./db/subSubject.db');
const SUB_SUBJECT_DATA = require('./js/subSubjectData');

// Table
const TABLE = require('./js/subjectTable');
const SUBJECT_TABLE = new TABLE(
    document.getElementById('subjectListItem'),
    SUB_SUBJECT_DATA.columnInfo(),
    false);

// Initialize
SUB_SUBJECT_DB.ensureIndex(
    {fieldName: SUB_SUBJECT_DATA.columnCode()})
    .then(() => {
      return SUB_SUBJECT_DB.ensureIndex(
          {fieldName: SUB_SUBJECT_DATA.columnName()});
    })
    .then(() => {
      return SUB_SUBJECT_DB.ensureIndex(
          {fieldName: SUB_SUBJECT_DATA.columnParentId()});
    })
    .then(() => {
      return SUB_SUBJECT_DB.ensureIndex({
        fieldName: SUB_SUBJECT_DATA.columnUniqueCode(),
        unique: true});
    })
    .then(() => {
      return SUB_SUBJECT_DB.ensureIndex({
        fieldName: SUB_SUBJECT_DATA.columnUniqueName(),
        unique: true});
    })
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
  if (SUBJECT_TABLE.checkError()) return;
  SUBJECT_TABLE.newRow(SUB_SUBJECT_DATA.emptyData());
});

document.getElementById('settingsForm').onsubmit = () => {
  // Check Validate
  if (SUBJECT_TABLE.checkError()) return false;
  if (!document.forms.settingsForm.checkValidity()) return false;
  // Sign Up
  for (let row = 1; row < SUBJECT_TABLE.countChildlen(); row++) {
    const DATA = new SUB_SUBJECT_DATA();
    DATA.subjectId = SUBJECT_ID;
    DATA.subjectCode = SUBJECT_CODE;
    DATA.subjectName = SUBJECT_NAME;
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
  return true;
};

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_sub_subject');
});
