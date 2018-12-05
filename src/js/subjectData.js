'use strict';

const COLUMN = {
  id: '_id',
  code: 'code',
  name: 'name',
};

/**
 * Subject Data
 */
module.exports = class SubjectData {
  /**
   * Constructor
   */
  constructor() {
    this.name = null;
    this.code = null;
  }

  /**
   * 科目名
   * @param {String} name
   * Set 'SubjectName'
   */
  set name(name) {
    this._name = name;
  }

  /**
   * 科目名
   * Get 'SubjectName'
   */
  get name() {
    return this._name;
  }

  /**
   * 科目コード
   * @param {Number} code
   * Set 'SubjectCode'
   */
  set code(code) {
    this._code = code;
  }

  /**
   * 科目コード
   * Get 'SubjectCode'
   */
  get code() {
    return this._code;
  }

  /**
   * Subject DB - Column Infomation
   * @return {Object} Column Infomation
   */
  static columnInfo() {
    return COLUMN;
  }

  /**
   * Subject DB - Column CODE
   * @return {String} Column CODE
   */
  static columnCode() {
    return COLUMN.code;
  }

  /**
   * Subject DB - Column NAME
   * @return {String} Column NAME
   */
  static columnName() {
    return COLUMN.name;
  }

  /**
   * Database 科目情報 - 検索:Code
   * @return {Object} query
   */
  findCode() {
    return {code: this._code};
  }

  /**
   * Database 科目情報 - 正規表現:Code
   * @return {Object} Find Info
   */
  findRegCode() {
    return {
      code: new RegExp('^' + this._code),
    };
  }

  /**
   * Database 科目情報 - 正規表現:Name
   * @return {Object} Find Info
   */
  findRegName() {
    return {
      code: new RegExp(this._name),
    };
  }

  /**
   * Sort ASC Code
   * @return {Object} Sort Info
   */
  sortAscCode() {
    return {code: 1};
  }

  /**
   * Database 科目情報 - EMPTY
   * @return {Object} Database Info - EMPTY
   */
  static emptyData() {
    return {
      _id: null,
      code: null,
      name: null};
  }

  /**
   * Database 科目情報
   * @return {Object} Database Info
   */
  dbData() {
    return {
      code: this._code,
      name: this._name};
  }
};
