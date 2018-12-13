'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

// DOM
const PARTS = require('./createDomParts');

const STATE = {
  new: {
    text: '新規',
    button: '削除',
    className: 'stateNew',
    readOnly: false,
    disabled: true,
    required: true,
  },
  change: {
    text: '変更',
    button: '削除',
    className: 'stateChange',
    readOnly: false,
    disabled: true,
    required: true,
  },
  delete: {
    text: '削除',
    button: '取消',
    className: 'stateDelete',
    readOnly: true,
    disabled: true,
    required: false,
  },
  error: {
    text: '異常',
    button: '削除',
    className: 'stateError',
    readOnly: false,
    disabled: true,
    required: true,
  },
  nothing: {
    text: '',
    button: '削除',
    className: 'stateNothing',
    readOnly: false,
    disabled: false,
    required: true,
  },
};

const NAME = {
  id: 'id',
  state: 'state',
  code: 'code',
  name: 'name',
  delete: 'delete',
  set: 'set',
};

const ERROR = {
  className: 'errorWord',
  duplicationCodeError: '※ 入力したコードは既に使用されています。',
  duplicationNameError: '※ 入力した名称は既に使用されています。',
  checkError: '状態が「異常」であるものがあります。\n「異常」を解決した後に実施してください。',
};

const HIDE = 'cellHide';

/**
 * Subject Table
 */
module.exports = class SubjectTable {
  /**
   * Constructor
   * @param {Element} tbody Table Body Element
   * @param {Object} dbColumn DB Column Info
   * @param {Boolean} main Subject Flag
   */
  constructor(
      tbody,
      dbColumn,
      main) {
    this.tbody = tbody;
    this.dbColumn = dbColumn;
    this.main = main;
  }

  /**
   * Set New Row
   * @param {Object} doc Document
   */
  newRow(doc) {
    this.setRow(doc, STATE.new);
  }

  /**
   * Set Row
   * @param {Object} doc Document
   * @param {Object} tState State
   */
  setRow(
      doc,
      tState = STATE.nothing) {
    const row = this.emptyRow();
    const id = row.getElementsByClassName(NAME.id).item(0);
    const state = row.getElementsByClassName(NAME.state).item(0);
    const code = row.getElementsByClassName(NAME.code).item(0);
    const name = row.getElementsByClassName(NAME.name).item(0);
    const del = row.getElementsByClassName(NAME.delete).item(0);
    this.setState(row, tState);
    id.value = doc[this.dbColumn.id];
    state.value = tState.text;
    state.placeholder = tState.text;
    code.value = doc[this.dbColumn.code];
    name.value = doc[this.dbColumn.name];
    del.value = tState.button;
    // Add Event
    code.addEventListener('DOMFocusOut', () => {
      // Check Duplication
      if (this.duplicationError(row, state, code, NAME.code)) return;
      // Change State
      if (state.value === STATE.new.text) return;
      (code.value !== doc[NAME.code] || name.value !== doc[NAME.name]) ?
        this.setState(row, STATE.change) :
        this.setState(row, tState);
    });
    name.addEventListener('DOMFocusOut', () => {
      // Check Duplication
      if (this.duplicationError(row, state, name, NAME.name)) return;
      // Change State
      if (state.value === STATE.new.text) return;
      (code.value !== doc[NAME.code] || name.value !== doc[NAME.name]) ?
        this.setState(row, STATE.change) :
        this.setState(row, tState);
    });
    if (this.main) {
      row.getElementsByClassName(NAME.set).item(0)
          .addEventListener('click', (event) => {
            if (SUBJECT_TABLE.checkError()) return;
            IPC_RENDERER.send(
                'open_sub_subject',
                {id: id.value, code: code.value, name: name.value});
          });
    }
    del.addEventListener('click', (event) => {
      // Chenge Delete / Cancel State
      if (SUBJECT_TABLE.checkError()) return;
      this.changeDeleteRowState(row, state, del);
    });
  }

  /**
   * Change Delete State
   * @param {Object} row Row Info
   * @param {Object} state Subject State
   * @param {Object} del Delete State Button
   */
  changeDeleteRowState(row, state, del) {
    const beforeState = state.value;
    const afterState = del.value;
    del.value = beforeState;
    switch (afterState) {
      case STATE.nothing.text:
        this.setState(row, STATE.nothing);
        break;
      case STATE.new.text:
        this.setState(row, STATE.new);
        break;
      case STATE.change.text:
        this.setState(row, STATE.change);
        break;
      case STATE.delete.text:
        this.setState(row, STATE.delete);
        break;
    }
  }

  /**
   * Set State
   * @param {Object} row Row Info
   * @param {Object} state State Info
   */
  setState(row, state) {
    // Background
    this.removeStateClass(row.classList);
    row.classList.add(state.className);
    // State
    const stateCol = row.getElementsByClassName(NAME.state).item(0);
    this.removeStateClass(stateCol.classList);
    stateCol.value = state.text;
    stateCol.classList.add(state.className);
    // Code
    const codeCol = row.getElementsByClassName(NAME.code).item(0);
    this.removeStateClass(codeCol.classList);
    codeCol.readOnly = state.readOnly;
    codeCol.required = state.required;
    codeCol.classList.add(state.className);
    // Name
    const nameCol = row.getElementsByClassName(NAME.name).item(0);
    this.removeStateClass(nameCol.classList);
    nameCol.readOnly = state.readOnly;
    nameCol.required = state.required;
    nameCol.classList.add(state.className);
    // Sub Subject Button
    const setCol = row.getElementsByClassName(NAME.set).item(0);
    if (this.main) setCol.disabled = state.disabled;
    // Delete / Chancel Button
    const deleteCol = row.getElementsByClassName(NAME.delete).item(0);
    deleteCol.innerHTML = state.button;
  }

  /**
   * Remove State Class
   * @param {DOMTokenList} classList
   */
  removeStateClass(classList) {
    if (classList.contains(STATE.new.className)) {
      classList.remove(STATE.new.className);
    }
    if (classList.contains(STATE.change.className)) {
      classList.remove(STATE.change.className);
    }
    if (classList.contains(STATE.delete.className)) {
      classList.remove(STATE.delete.className);
    }
    if (classList.contains(STATE.error.className)) {
      classList.remove(STATE.error.className);
    }
    if (classList.contains(STATE.nothing.className)) {
      classList.remove(STATE.nothing.className);
    }
  }

  /**
   * Create Empty Row
   * @return {Element} Add <tr> Info
   */
  emptyRow() {
    const row = this.tbody.insertRow(-1);
    // Set 'ID' Area
    row.insertCell(-1);
    row.lastElementChild.className = HIDE;
    row.lastElementChild.appendChild(
        PARTS.input('text', NAME.id, NAME.id, null, true));
    // Set 'State' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        PARTS.input('text', NAME.state, NAME.state, null, true));
    // Set 'SubjectCode' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        PARTS.input('number', NAME.code, NAME.code));
    // Set 'SubjectName' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        PARTS.input('text', NAME.name, NAME.name));
    // Set 'SetSubSubjectButton' Area
    if (this.main) {
      row.insertCell(-1);
      row.lastElementChild.appendChild(
          PARTS.button(
              null,
              'button',
              NAME.set,
              NAME.set,
              null,
              '補助科目'));
    }
    // Set 'ChangeStateButton' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        PARTS.button(
            null,
            'button',
            NAME.delete,
            NAME.delete,
            null,
            STATE.nothing.button));
    // Result
    return row;
  }

  /**
   * Get New State Text
   * @return {String} Table New State
   */
  static getNewStateText() {
    return STATE.new.text;
  }

  /**
   * Get Change State Text
   * @return {String} Table Change State
   */
  static getChangeStateText() {
    return STATE.change.text;
  }

  /**
   * Get Delete State Text
   * @return {String} Table Delete State
   */
  static getDeleteStateText() {
    return STATE.delete.text;
  }

  /**
   * Get Error State Text
   * @return {String} Table Error State
   */
  static getErrorStateText() {
    return STATE.error.text;
  }

  /**
   * Get Nothing State Text
   * @return {String} Table Nothing State
   */
  static getNothingStateText() {
    return STATE.nothing.text;
  }

  /**
   * Count Childlen
   * @return {Number} Count
   */
  countChildlen() {
    return this.tbody.childElementCount;
  }

  /**
   * Get ID Value
   * @param {Number} row Row Number
   * @return {String} ID Value
   */
  getID(row) {
    return this.tbody.children[row]
        .getElementsByClassName(NAME.id).item(0).value;
  }

  /**
   * Get State Value
   * @param {Number} row Row Number
   * @return {String} State Value
   */
  getState(row) {
    return this.tbody.children[row]
        .getElementsByClassName(NAME.state).item(0).value;
  }

  /**
   * Get Code Value
   * @param {Number} row Row Number
   * @return {String} Code Value
   */
  getCode(row) {
    return this.tbody.children[row]
        .getElementsByClassName(NAME.code).item(0).value;
  }

  /**
   * Get Name Value
   * @param {Number} row Row Number
   * @return {String} Name Value
   */
  getName(row) {
    return this.tbody.children[row]
        .getElementsByClassName(NAME.name).item(0).value;
  }

  /**
   * Duplication Error
   * @param {Object} row Row Info
   * @param {Object} state Subject State
   * @param {Object} targetCell Target Cell
   * @param {String} checkName Check Name
   * @return {Boolean} Result
   */
  duplicationError(row, state, targetCell, checkName) {
    // Check Douplication Error
    if (this.checkDuplication(targetCell.value, checkName)) {
      if (state.value !== STATE.error.text) {
        const div = document.createElement('div');
        switch (checkName) {
          case NAME.code:
            div.className = ERROR.className;
            div.innerHTML = ERROR.duplicationCodeError;
            break;
          case NAME.name:
            div.className = ERROR.className;
            div.innerHTML = ERROR.duplicationNameError;
            break;
        }
        targetCell.parentNode.insertBefore(div, targetCell.nextSibling);
        this.setState(row, STATE.error);
      }
      targetCell.focus();
      return true;
    } else {
      if (state.value === STATE.error.text) {
        const error = row
            .getElementsByClassName(ERROR.className).item(0);
        error.parentNode.removeChild(error);
        switch (state.placeholder) {
          case STATE.nothing.text:
            this.setState(row, STATE.nothing);
            break;
          case STATE.new.text:
            this.setState(row, STATE.new);
            break;
        }
      }
      return false;
    }
  }

  /**
   * Duplication Check
   * @param {any} checkValue Target Value
   * @param {String} checkColumnName Check Column
   * @return {Boolean} Duplication Flag
   */
  checkDuplication(checkValue, checkColumnName) {
    const columnInfo = this.tbody.getElementsByClassName(checkColumnName);
    for (let i = 0, count = 0; i < columnInfo.length; i++) {
      if (!columnInfo[i].value) continue;
      if (checkValue === columnInfo[i].value) ++count;
      if (count === 2) return true;
    }
    return false;
  }

  /**
   * Check Error
   * @return {Boolean} Error Flag
   */
  checkError() {
    for (let row = 0; row < this.countChildlen(); row++) {
      if (this.getState(row) === STATE.error.text) {
        alert(ERROR.checkError);
        return true;
      }
    }
    return false;
  }
};
