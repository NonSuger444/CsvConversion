'use strict';
// Database
const DATABASE = require('./js/operationDb');
const subjectDB = new DATABASE('./db/subject.db');
subjectDB.load()
    .then((msg) => {
      console.log(msg);
      subjectDB.sort({}, {code: 1});
    })
    .then((docs) => {
      console.log(docs);
    })
    .catch((error) => {
      console.error(error);
    });

// Table
// const T_HEAD = document.getElementById('subjectListTitle');
const T_BODY = document.getElementById('subjectListItem');

document.getElementById('addSubject').addEventListener('click', () => {
  const row = T_BODY.insertRow(-1);
  // Set 'ID' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createInput('hidden', 'id'));
  // Set 'State' Area
  row.insertCell(-1);
  row.lastElementChild.innerHTML = '新規';
  // Set 'SubjectName' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createInput('text', 'subjectName'));
  // Set 'SubjectCode' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createInput('number', 'subjectCode'));
  // Set 'SetSubSubjectButton' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createButton(null, 'button', 'setSubSubject', null, '補助科目'));
  // Set 'DeleteButton' Area
  row.insertCell(-1);
  row.lastElementChild.appendChild(createButton(null, 'button', 'delete', null, '削除'));
});

/**
 * Create Input Element
 * @param {String} type Input Type
 * @param {String} name Input Name
 * @param {String} value Input Value
 * @return {Any} Input Element
 */
function createInput(type='text', name=null, value=null) {
  const input = document.createElement('input');
  input.type = type;
  if (name) input.name = name;
  if (value) input.value = value;
  return input;
}

/**
 * Create Button Element
 * @param {String} id Button ID
 * @param {String} type Button Type
 * @param {String} name Button Name
 * @param {String} value Button Value
 * @param {String} text Button Text
 * @return {Any} Button Element
 */
function createButton(id=null, type='button', name=null, value=null, text=null) {
  const button = document.createElement('button');
  if (id) button.id = id;
  button.type = type;
  if (name) button.name = name;
  if (value) button.value = value;
  if (text) button.innerHTML = text;
  return button;
}
