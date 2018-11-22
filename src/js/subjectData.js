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
  set setName(name) {
    this.name = name;
  }

  /**
   * 科目名
   * Get 'SubjectName'
   */
  get getName() {
    return this.name;
  }

  /**
   * 科目コード
   * @param {Number} code
   * Set 'SubjectCode'
   */
  set setCode(code) {
    this.code = code;
  }

  /**
   * 科目コード
   * Get 'SubjectCode'
   */
  get getCode() {
    return this.code;
  }

  /**
   * 科目
   */
  get dbData() {
    return {_id: this.code, name: this.name};
  }
};
