'use strict';

const PARTS = require('./createDomParts');

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
        PARTS.input('text', NAME.id, NAME.id, null, true));
    // Set 'Code' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        PARTS.input('number', NAME.code, NAME.code, null, true));
    // Set 'Name' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        PARTS.input('text', NAME.name, NAME.name, null, true));
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
   * Count Childlen
   * @return {Number} Count
   */
  countChildlen() {
    return this.tbody.childElementCount;
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
    const row = document.getElementById(id);
    if (row) {
      return row.getElementsByClassName(NAME.id).item(0).value;
    } else {
      return null;
    }
  }

  /**
   * Get Select SubjectCode
   * @return {String} SubjetCode
   */
  getSelectSubjectCode() {
    return this.getSelectCode(SELECT_ID.subject);
  }

  /**
   * Get Select SubSubjectCode
   * @return {String} SubSubjetCode
   */
  getSelectSubSubjectCode() {
    return this.getSelectCode(SELECT_ID.subSubject);
  }

  /**
   * Get Selected Code
   * @param {String} id Search ID
   * @return {String} Selected Code
   */
  getSelectCode(id) {
    const row = document.getElementById(id);
    if (row) {
      return row.getElementsByClassName(NAME.code).item(0).value;
    } else {
      return null;
    }
  }

  /**
   * Get Select SubjectName
   * @return {String} SubjetName
   */
  getSelectSubjectName() {
    return this.getSelectName(SELECT_ID.subject);
  }

  /**
   * Get Select SubSubjectName
   * @return {String} SubSubjetName
   */
  getSelectSubSubjectName() {
    return this.getSelectName(SELECT_ID.subSubject);
  }

  /**
   * Get Selected Name
   * @param {String} id Search ID
   * @return {String} Selected Name
   */
  getSelectName(id) {
    const row = document.getElementById(id);
    if (row) {
      return row.getElementsByClassName(NAME.name).item(0).value;
    } else {
      return null;
    }
  }

  /**
   * Get Select ID By Subject
   * @return {String} Select ID
   */
  static getSelectIdBySubject() {
    return SELECT_ID.subject;
  }

  /**
   * Get Select ID By SubSubject
   * @return {String} Select ID
   */
  static getSelectIdBySubSubject() {
    return SELECT_ID.subSubject;
  }
};
