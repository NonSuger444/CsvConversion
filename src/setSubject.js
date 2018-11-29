'use strict';
// Database
const DATABASE = require('./js/operationDb');
const subjectDB = new DATABASE('./db/subject.db');
subjectDB.load()
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
  nothing: {text: '', button: '削除', color: null, readOnly: false, disabled: false, required: true},
};

/**
 * Create Table Body
 * @param {Object} docs Subject Data
 */
function createTableBody(docs) {
  docs.forEach((doc) => {
    const row = createTableEmptyRow();
    setState(row, T_STATE.nothing);
    // Input Info
    row.getElementsByClassName('subjectID').item(0).value = doc['_id'];
    row.getElementsByClassName('subjectState').item(0).value = T_STATE.nothing.text;
    row.getElementsByClassName('subjectCode').item(0).value = doc['code'];
    row.getElementsByClassName('subjectName').item(0).value = doc['name'];
    row.getElementsByClassName('changeState').item(0).value = T_STATE.nothing.button;
    // Add Event
    row.getElementsByClassName('subjectCode').item(0).addEventListener('DOMFocusOut', function() {
      // Check Double
      let check = 0;
      document.getElementsByName('subjectCode').forEach((value, index) => {
        if (this.value === value.value) ++check;
      });
      if (check >= 2) this.focus();
      // Change State
    });
    row.getElementsByClassName('changeState').item(0).addEventListener('click', (event) => {
      changeRowState(row);
    });
  });
}

/**
 * Change State
 * @param {Object} row Row Info
 */
function changeRowState(row) {
  const beforeState = row.getElementsByClassName('subjectState').item(0).value;
  const afterState = row.getElementsByClassName('changeState').item(0).value;
  row.getElementsByClassName('changeState').item(0).value = beforeState;
  row.getElementsByClassName('subjectState').item(0).value = afterState;
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
 * Set State
 * @param {Object} row Row Info
 * @param {Object} state State Info
 */
function setState(row, state) {
  row.style.backgroundColor = state.color;
  // ID
  row.getElementsByClassName('subjectID').item(0).style.backgroundColor = state.color;
  // State
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
  const row = createTableEmptyRow();
  row.getElementsByClassName('subjectState').item(0).value = T_STATE.new.text;
  row.getElementsByClassName('changeState').item(0).value = T_STATE.new.button;
  setState(row, T_STATE.new);
  row.getElementsByClassName('changeState').item(0).addEventListener('click', (event) => {
    changeRowState(row);
  });
});

const SUBJECT_DATA = require('./js/subjectData');
const FORM = document.forms.subjectForm;
document.getElementById('signUp').addEventListener('click', () => {
  // Check Validate
  if (!FORM.checkValidity()) return;

  for (let row = 1; row < T_BODY.children.length; row++) {
    console.log(FORM.subjectState[row].value);
    // const data = new SUBJECT_DATA();
    // data.subjectCode = FORM.subjectCode[row].value;
    // data.subjectName = FORM.subjectName[row].value;
    // subjectDB.insert(data.subjectDbData())
    //     .then((docs) => console.log(docs))
    //     .catch((error) => console.error(error));
  }

  alert('STOP');

  // if (data.getCode) {
  //   // DB Update
  //   subjectDB.update({_id: data.getCode}, {$set: data})
  //       .then((numOfDocs) => console.log(numOfDocs))
  //       .catch((error) => console.error(error));
  // } else {
  //   // DB Insert
  //   subjectDB.insert(data)
  //       .then((docs) => console.log(docs))
  //       .catch((error) => console.error(error));
  // }
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
