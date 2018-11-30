'use strict';
// Database
const DATABASE = require('./js/operationDb');
const subjectDB = new DATABASE('./db/subject.db');
subjectDB.ensureIndex({fieldName: 'code', unique: true})
    .then(() => {
      return subjectDB.load();
    })
    .then(() => {
      return subjectDB.sort({}, {code: 1});
    })
    .then((docs) => {
      createTableBody(docs);
    })
    .catch((error) => {
      console.error(error);
    });

// Table
const T_BODY = document.getElementById('subjectListItem');
const T_STATE = {
  new: {text: '新規', button: '削除', color: 'mistyrose', readOnly: false, disabled: false, required: true},
  change: {text: '変更', button: '削除', color: 'lightskyblue', readOnly: false, disabled: false, required: true},
  delete: {text: '削除', button: '取消', color: 'lightgray', readOnly: true, disabled: true, required: false},
  error: {text: '異常', button: '削除', color: 'lightyellow', readOnly: false, disabled: false, required: true},
  nothing: {text: '', button: '削除', color: null, readOnly: false, disabled: false, required: true},
};

/**
 * Create Table Body
 * @param {Object} docs Subject Data
 */
function createTableBody(docs) {
  docs.forEach((doc) => {
    setTableRowInfo(doc, T_STATE.nothing);
  });
}

/**
 * Set Table Row Info
 * @param {Object} doc Document
 * @param {Object} tState State
 */
function setTableRowInfo(doc, tState) {
  const row = createTableEmptyRow();
  const id = row.getElementsByClassName('subjectID').item(0);
  const state = row.getElementsByClassName('subjectState').item(0);
  const code = row.getElementsByClassName('subjectCode').item(0);
  const name = row.getElementsByClassName('subjectName').item(0);
  const change = row.getElementsByClassName('changeState').item(0);
  setState(row, tState);
  id.value = doc['_id'];
  state.value = tState.text;
  state.placeholder = tState.text;
  code.value = doc['code'];
  name.value = doc['name'];
  change.value = tState.button;
  // Add Event
  code.addEventListener('DOMFocusOut', () => {
    if (checkDuplication(code.value, 'subjectCode')) {
      changeErrorRowState(row, 'subjectCode', state);
      code.focus();
      return;
    }
    // Check Error Row
    if (state.value === T_STATE.error.text) changeErrorRowState(row, 'subjectCode', state);
    // Check New Row
    if (state.value === T_STATE.new.text) return;
    // Change State
    (code.value !== doc['code'] || name.value !== doc['name']) ?
      setState(row, T_STATE.change) :
      setState(row, tState);
  });
  name.addEventListener('DOMFocusOut', () => {
    // Check New Row
    if (state.value === T_STATE.new.text) return;
    // Change State
    (code.value !== doc['code'] || name.value !== doc['name']) ?
      setState(row, T_STATE.change) :
      setState(row, tState);
  });
  change.addEventListener('click', (event) => {
    // Chenge Delete / Cancel State
    changeDeleteRowState(row);
  });
}

/**
 * Duplication Check
 * @param {any} checkValue Target Value
 * @param {String} checkColumnName Check Column
 * @return {Boolean} Duplication Flag
 */
function checkDuplication(checkValue, checkColumnName) {
  const columnInfo = document.getElementsByName(checkColumnName);
  for (let i = 0, count = 0; i < columnInfo.length; i++) {
    if (!columnInfo[i].value) continue;
    if (checkValue === columnInfo[i].value) ++count;
    if (count === 2) return true;
  }
  return false;
}

/**
 * Change Delete State
 * @param {Object} row Row Info
 */
function changeDeleteRowState(row) {
  const beforeState = row.getElementsByClassName('subjectState').item(0).value;
  const afterState = row.getElementsByClassName('changeState').item(0).value;
  row.getElementsByClassName('changeState').item(0).value = beforeState;
  switch (afterState) {
    case T_STATE.nothing.text:
      setState(row, T_STATE.nothing);
      break;
    case T_STATE.new.text:
      setState(row, T_STATE.new);
      break;
    case T_STATE.change.text:
      setState(row, T_STATE.change);
      break;
    case T_STATE.delete.text:
      setState(row, T_STATE.delete);
      break;
  }
}

/**
 *
 */
function changeErrorRowState(row, name, state) {
  if (state.value !== T_STATE.error.text) {
    const column = row.getElementsByClassName(name).item(0);
    const p = document.createElement('p');
    p.id = 'codeDouplicationError';
    p.innerHTML = 'test';
    column.parentNode.insertBefore(p, column.nextSibling);
    setState(row, T_STATE.error);
  } else {
    const deleteElement = document.getElementById('codeDouplicationError');
    deleteElement.parentNode.removeChild(deleteElement);
  }
}

/**
 * Set State
 * @param {Object} row Row Info
 * @param {Object} state State Info
 */
function setState(row, state) {
  row.style.backgroundColor = state.color;
  // ID
  row.getElementsByClassName('subjectID').item(0).style.backgroundColor = state.color;
  // State
  row.getElementsByClassName('subjectState').item(0).value = state.text;
  row.getElementsByClassName('subjectState').item(0).style.backgroundColor = state.color;
  // Code
  row.getElementsByClassName('subjectCode').item(0).readOnly = state.readOnly;
  row.getElementsByClassName('subjectCode').item(0).required = state.required;
  row.getElementsByClassName('subjectCode').item(0).style.backgroundColor = state.color;
  // Name
  row.getElementsByClassName('subjectName').item(0).readOnly = state.readOnly;
  row.getElementsByClassName('subjectName').item(0).required = state.required;
  row.getElementsByClassName('subjectName').item(0).style.backgroundColor = state.color;
  // Sub Subject Button
  row.getElementsByClassName('setSubSubject').item(0).disabled = state.disabled;
  // Delete / Chancel Button
  row.getElementsByClassName('changeState').item(0).innerHTML = state.button;
}

/**
 * Create Table Row (Empty)
 * @return {Element} Add <tr> Info
 */
function createTableEmptyRow() {
  const row = T_BODY.insertRow(-1);
  // Set 'ID' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createInput('text', 'subjectID', 'subjectID', null, true));
  // Set 'State' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createInput('text', 'subjectState', 'subjectState', null, true));
  // Set 'SubjectCode' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createInput('number', 'subjectCode', 'subjectCode'));
  // Set 'SubjectName' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createInput('text', 'subjectName', 'subjectName'));
  // Set 'SetSubSubjectButton' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createButton(null, 'button', 'setSubSubject', 'setSubSubject', null, '補助科目'));
  // Set 'ChangeStateButton' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createButton(null, 'button', 'changeState', 'changeState', null, T_STATE.nothing.button));
  return row;
}

document.getElementById('addSubject').addEventListener('click', () => {
  const doc = {_id: null, code: null, name: null};
  setTableRowInfo(doc, T_STATE.new);
});

const SUBJECT_DATA = require('./js/subjectData');
const FORM = document.forms.subjectForm;
document.getElementById('signUp').addEventListener('click', () => {
  // Check Validate
  if (!FORM.checkValidity()) return;
  // Sign Up
  for (let row = 1; row < T_BODY.children.length; row++) {
    const data = new SUBJECT_DATA();
    data.subjectCode = FORM.subjectCode[row].value;
    data.subjectName = FORM.subjectName[row].value;
    switch (FORM.subjectState[row].value) {
      case T_STATE.new.text:
        subjectDB.insert(data.subjectDbData())
            .catch((error) => console.error(error));
        break;
      case T_STATE.change.text:
        subjectDB.update({_id: FORM.subjectID[row].value}, {$set: data.subjectDbData()})
            .catch((error) => console.error(error));
        break;
      case T_STATE.delete.text:
        subjectDB.destroy({_id: FORM.subjectID[row].value})
            .catch((error) => console.error(error));
    }
  }
  alert('STOP');
});

/**
 * Create Input Element
 * @param {String} type Input Type
 * @param {String} name Input Name
 * @param {String} className Input Class Name
 * @param {String} value Input Value
 * @param {Boolean} readonly Input Readonly Flag
 * @return {Any} Input Element
 */
function createInput(type='text', name=null, className=null, value=null, readonly=false) {
  const input = document.createElement('input');
  input.type = type;
  if (name) input.name = name;
  if (className) input.className = className;
  if (value) input.value = value;
  if (readonly) input.readOnly = readonly;
  return input;
}

/**
 * Create Button Element
 * @param {String} id Button ID
 * @param {String} type Button Type
 * @param {String} name Button Name
 * @param {String} className Button Class Name
 * @param {String} value Button Value
 * @param {String} text Button Text
 * @return {Any} Button Element
 */
function createButton(id=null, type='button', name=null, className=null, value=null, text=null) {
  const button = document.createElement('button');
  if (id) button.id = id;
  button.type = type;
  if (name) button.name = name;
  if (className) button.className = className;
  if (value) button.value = value;
  if (text) button.innerHTML = text;
  return button;
}
