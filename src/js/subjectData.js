'use strict';

/**
 * Subject Data
 */
module.exports = class SubjectData {
  /**
   * Constructor
   */
  constructor() {
    this.data = {
      name: null,
      code: null,
      sub: [
        {name: null, code: null},
        {name: null, code: null},
      ],
    };
  }

  /**
   * 科目名
   * @param {String} value
   * Set 'SubjectName'
   */
  set name(value) {
    this.data.name.value = value;
  }

  /**
   * 科目コード
   * @param {Number} value
   * Set 'SubjectCode'
   */
  set code(value) {
    this.data.code.value = value;
  }

  /**
   * 科目データ
   */
  get outputData() {
    return this.data;
  }
};
