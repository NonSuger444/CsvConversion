'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

const STATE = {
  new: {
    text: '新規',
    button: '削除',
    color: 'mistyrose',
    readOnly: false,
    disabled: false,
    required: true,
  },
  change: {
    text: '変更',
    button: '削除',
    color: 'lightskyblue',
    readOnly: false,
    disabled: false,
    required: true,
  },
  delete: {
    text: '削除',
    button: '取消',
    color: 'lightgray',
    readOnly: true,
    disabled: true,
    required: false,
  },
  error: {
    text: '異常',
    button: '削除',
    color: 'lightyellow',
    readOnly: false,
    disabled: false,
    required: true,
  },
  nothing: {
    text: '',
    button: '削除',
    color: null,
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

const DUPLICATION_CODE_ERROR = {
  className: 'codeDouplicationError',
  text: '※ 入力したコードは既に使用されています。',
};

const ERROR_MESSAGE = {
  checkError: '状態が「異常」であるものがあります。\n「異常」を解決した後に実施してください。',
};

/**
 * Subject Table
 */
module.exports = class SubjectTable {
  /**
   * Constructor
   * @param {Element} tbody Table Body Element
   * @param {Object} dbColumn DB Colum Info
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
      if (this.duplicationError(row, state, code)) return;
      // Change State
      if (state.value === STATE.new.text) return;
      (code.value !== doc[NAME.code] || name.value !== doc[NAME.name]) ?
        this.setState(row, STATE.change) :
        this.setState(row, tState);
    });
    name.addEventListener('DOMFocusOut', () => {
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
                {code: code.value, name: name.value});
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
        this, setState(row, STATE.change);
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
    row.style.backgroundColor = state.color;
    // ID
    row.getElementsByClassName(NAME.id)
        .item(0).style.backgroundColor = state.color;
    // State
    row.getElementsByClassName(NAME.state)
        .item(0).value = state.text;
    row.getElementsByClassName(NAME.state)
        .item(0).style.backgroundColor = state.color;
    // Code
    row.getElementsByClassName(NAME.code)
        .item(0).readOnly = state.readOnly;
    row.getElementsByClassName(NAME.code)
        .item(0).required = state.required;
    row.getElementsByClassName(NAME.code)
        .item(0).style.backgroundColor = state.color;
    // Name
    row.getElementsByClassName(NAME.name)
        .item(0).readOnly = state.readOnly;
    row.getElementsByClassName(NAME.name)
        .item(0).required = state.required;
    row.getElementsByClassName(NAME.name)
        .item(0).style.backgroundColor = state.color;
    // Sub Subject Button
    if (this.main) {
      row.getElementsByClassName(NAME.set)
          .item(0).disabled = state.disabled;
    }
    // Delete / Chancel Button
    row.getElementsByClassName(NAME.delete)
        .item(0).innerHTML = state.button;
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
    // Set 'State' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        this.createInput('text', NAME.state, NAME.state, null, true));
    // Set 'SubjectCode' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        this.createInput('number', NAME.code, NAME.code));
    // Set 'SubjectName' Area
    row.insertCell(-1);
    row.lastElementChild.appendChild(
        this.createInput('text', NAME.name, NAME.name));
    // Set 'SetSubSubjectButton' Area
    if (this.main) {
      row.insertCell(-1);
      row.lastElementChild.appendChild(
          this.createButton(
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
        this.createButton(
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
   * @param {Object} code Subject Code
   * @return {Boolean} Result
   */
  duplicationError(row, state, code) {
    // Check Douplication Error
    if (this.checkDuplication(code.value, NAME.code)) {
      if (state.value !== STATE.error.text) {
        const p = document.createElement('p');
        p.className = DUPLICATION_CODE_ERROR.className;
        p.innerHTML = DUPLICATION_CODE_ERROR.text;
        code.parentNode.insertBefore(p, code.nextSibling);
        this.setState(row, STATE.error);
      }
      code.focus();
      return true;
    } else {
      if (state.value === STATE.error.text) {
        const error = row
            .getElementsByClassName(DUPLICATION_CODE_ERROR.className).item(0);
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
        alert(ERROR_MESSAGE.checkError);
        return true;
      }
    }
    return false;
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
  createButton(
      id = null,
      type = 'button',
      name = null,
      className = null,
      value = null,
      text = null) {
    const button = document.createElement('button');
    if (id) button.id = id;
    button.type = type;
    if (name) button.name = name;
    if (className) button.className = className;
    if (value) button.value = value;
    if (text) button.innerHTML = text;
    return button;
  }
};
