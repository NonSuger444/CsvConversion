'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

// Database
const DATABASE = require('./js/operationDb');
const SUB_SUBJECT_DB = new DATABASE('./db/subSubject.db');
const SUB_SUBJECT_DATA = require('./js/subSubjectData');
const DATA = new SUB_SUBJECT_DATA();

// Subject Info
IPC_RENDERER.on('get_subject_info', (event, subjectInfo) => {
  DATA.subjectId = subjectInfo.id;
  DATA.subjectCode = subjectInfo.code;
  DATA.subjectName = subjectInfo.name;
  document.getElementById('subjectCode').innerHTML = DATA.subjectCode;
  document.getElementById('subjectName').innerHTML = DATA.subjectName;
});

// Table
const TABLE = require('./js/subjectTable');
const SUBJECT_TABLE = new TABLE(
    document.getElementById('subjectListItem'),
    SUB_SUBJECT_DATA.columnInfo(),
    false);

// Initialize
SUB_SUBJECT_DB.load().then(() => {
  return SUB_SUBJECT_DB.ensureIndex({
    fieldName: SUB_SUBJECT_DATA.columnCode(),
  });
}).then(() => {
  return SUB_SUBJECT_DB.ensureIndex({
    fieldName: SUB_SUBJECT_DATA.columnName(),
  });
}).then(() => {
  return SUB_SUBJECT_DB.ensureIndex({
    fieldName: SUB_SUBJECT_DATA.columnParentId(),
  });
}).then(() => {
  return SUB_SUBJECT_DB.ensureIndex({
    fieldName: SUB_SUBJECT_DATA.columnUniqueCode(),
    unique: true});
}).then(() => {
  return SUB_SUBJECT_DB.ensureIndex({
    fieldName: SUB_SUBJECT_DATA.columnUniqueName(),
    unique: true});
}).then(() => {
  return SUB_SUBJECT_DB.sort(
      DATA.findParentCode(),
      SUB_SUBJECT_DATA.sortAscCode());
}).then((docs) => {
  docs.forEach((doc) => SUBJECT_TABLE.setRow(doc));
}).catch((error) => console.error(error));

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
    DATA.id = SUBJECT_TABLE.getID(row);
    DATA.subSubjectCode = SUBJECT_TABLE.getCode(row);
    DATA.subSubjectName = SUBJECT_TABLE.getName(row);
    switch (SUBJECT_TABLE.getState(row)) {
      case TABLE.getNewStateText():
        SUB_SUBJECT_DB.insert(DATA.dbData())
            .catch((error) => console.error(error));
        break;
      case TABLE.getChangeStateText():
        SUB_SUBJECT_DB.update(DATA.findId(), DATA.updateAll())
            .catch((error) => console.error(error));
        break;
      case TABLE.getDeleteStateText():
        SUB_SUBJECT_DB.destroy(DATA.findId())
            .catch((error) => console.error(error));
        break;
    }
  }
  return true;
};

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_sub_subject');
});
