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
    console.log('name : ' + name);
    this.name = name;
  }

  /**
   * 科目コード
   * @param {Number} code
   * Set 'SubjectCode'
   */
  set setCode(code) {
    console.log('code : ' + code);
    this.code = code;
  }

  /**
   * 科目
   */
  get output() {
    return {name: this.name, code: this.code};
  }
};
