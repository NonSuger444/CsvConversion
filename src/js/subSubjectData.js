'use strict';

const COLUMN = {
  id: '_id',
  subjectCode: 'subjectCode',
  code: 'code',
  name: 'name',
  uniqueCode: 'uniqueCode',
};

/**
 * Sub Subject Data
 */
module.exports = class SubSubjectData {
  /**
   * Constructor
   */
  constructor() {
    this.subjectCode = null;
    this.subSubjectName = null;
    this.subSubjectCode = null;
  }

  /**
   * 主科目コード
   * @param {Number} subjectCode
   * Set 'SubjectCode'
   */
  set subjectCode(subjectCode) {
    this._subjectCode = subjectCode;
  }

  /**
   * 主科目コード
   * @return {Number}
   * Get 'SubjectCode'
   */
  get subjectCode() {
    return this._subjectCode;
  }

  /**
   * 補助科目名
   * @param {String} subSubjectName
   * Set 'SubSubjectName'
   */
  set subSubjectName(subSubjectName) {
    this._subSubjectName = subSubjectName;
  }

  /**
   * 補助科目名
   * @return {String}
   * Get 'SubSubjectName'
   */
  get subSubjectName() {
    return this._subSubjectName;
  }

  /**
   * 補助科目コード
   * @param {Number} subSubjectCode
   * Set 'SubSubjectCode'
   */
  set subSubjectCode(subSubjectCode) {
    this._subSubjectCode = subSubjectCode;
  }

  /**
   * 補助科目コード
   * @return {Number}
   * Get 'SubSubjectCode'
   */
  get subSubjectCode() {
    return this._subSubjectCode;
  }

  /**
   * Sub Subject DB - Column Infomation
   * @return {Object} Column Infomation
   */
  static columnInfo() {
    return COLUMN;
  }

  /**
   * Database 補助科目情報 - EMPTY
   * @return {Object} Database Info - EMPTY
   */
  static emptyData() {
    return {
      _id: null,
      subjectCode: null,
      code: null,
      name: null,
      uniqueCode: null};
  }

  /**
   * Database 補助科目情報
   * @return {Object} Database Info
   */
  dbData() {
    return {
      subjectCode: this._subjectCode,
      code: this._subSubjectCode,
      name: this._subSubjectName,
      uniqueCode: this._subjectCode + '-' + this._subSubjectCode};
  }
};
