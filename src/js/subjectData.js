'use strict';

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
  set subjectName(name) {
    this.name = name;
  }

  /**
   * 科目名
   * Get 'SubjectName'
   */
  get subjectName() {
    return this.name;
  }

  /**
   * 科目コード
   * @param {Number} code
   * Set 'SubjectCode'
   */
  set subjectCode(code) {
    this.code = code;
  }

  /**
   * 科目コード
   * Get 'SubjectCode'
   */
  get subjectCode() {
    return this.code;
  }

  /**
   * Database 科目情報
   * @return {Object} Database Info
   */
  subjectDbData() {
    return {code: this.code, name: this.name};
  }
};
