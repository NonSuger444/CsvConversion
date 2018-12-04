'use strict';

const SELECT_ID = {
  subject: 'selectSubject',
  subSubject: 'selectSubSubject',
};

const NAME = {
  id: 'id',
  code: 'code',
  name: 'name',
};

module.exports = class SearchSubjectTable {
  /**
   * Constructor
   * @param {Element} tbody Table Body Element
   * @param {Object} dbColumn DB Column Info
   * @param {Boolean} main Subject / Sub Subject
   */
  constructor(
      tbody,
      dbColumn,
      main
  ) {
    this.tbody = tbody;
    this.dbColumn = dbColumn;
    this.main = main;
  }

  /**
   * Set Row
   * @param {Object} doc Document
   */
  setRow(doc) {
    const row = this.emptyRow();
    const id = row.getElementsByClassName(NAME.id).item(0);
    const code = row.getElementsByClassName(NAME.code).item(0);
    const name = row.getElementsByClassName(NAME.name).item(0);
    id.value = doc[this.dbColumn.id];
    code.value = doc[this.dbColumn.code];
    name.value = doc[this.dbColumn.name];
    // Add Event
    row.addEventListener('click', () => {
      if (this.main) {
        const selected = document.getElementById(SELECT_ID.subject);
        if (selected) selected.removeAttribute('id');
        row.id = SELECT_ID.subject;
      } else {
        const selected = document.getElementById(SELECT_ID.subSubject);
        if (selected) selected.removeAttribute('id');
        row.id = SELECT_ID.subSubject;
      }
    });
  }

  /**
   * Create Empty Row
   * @return {Element} Add <tr> Info
   */
  emptyRow() {
    const row = this.tbody.insertRow(-1);
    // Set 'ID' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        this.createInput('text', NAME.id, NAME.id, null, true));
    // Set 'Code' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        this.createInput('number', NAME.code, NAME.code, null, true));
    // Set 'Name' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        this.createInput('text', NAME.name, NAME.name, null, true));
    // Result
    return row;
  }

  /**
   * Delete All Row
   */
  deleteAllRow() {
    while (this.tbody.firstChild) {
      this.tbody.removeChild(this.tbody.firstChild);
    }
  }

  /**
   * Delete Row
   * @param {Number} index Table Row Number
   */
  deleteRow(index) {
    this.tbody.deleteRow(index);
  }

  /**
   * Get Select SubjectID
   * @return {String} SubjetID
   */
  getSelectSubjectId() {
    return this.getSelectId(SELECT_ID.subject);
  }

  /**
   * Get Select SubSubjectID
   * @return {String} SubSubjetID
   */
  getSelectSubSubjectId() {
    return this.getSelectId(SELECT_ID.subSubject);
  }

  /**
   * Get Selected ID
   * @param {String} id Search ID
   * @return {String} Selected ID
   */
  getSelectId(id) {
    return document.getElementById(id)
        .getElementsByClassName(NAME.id).item(0).value;
  }

  /**
   * Create Input Element
   * @param {String} type Input Type
   * @param {String} name Input Name
   * @param {String} className Input Class Name
   * @param {String} value Input Value
   * @param {Boolean} readonly Input Readonly Flag
   * @return {Element} Input Element
   */
  createInput(
      type = 'text',
      name = null,
      className = null,
      value = null,
      readonly = false) {
    const input = document.createElement('input');
    input.type = type;
    if (name) input.name = name;
    if (className) input.className = className;
    if (value) input.value = value;
    if (readonly) input.readOnly = readonly;
    return input;
  }
};
