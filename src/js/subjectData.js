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
   * @param {String} id Subject ID
   * @param {Number} code Subject Code
   * @param {String} name Subject Name
   */
  constructor(
      id = null,
      code = null,
      name = null
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
  }

  /**
   * 科目ID
   * @param {String} id
   * Set 'SubjectID'
   */
  set id(id) {
    this._id = id;
  }

  /**
   * 科目ID
   * Get 'SubjectID'
   */
  get id() {
    return this._id;
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
   * Database 科目情報 - 検索:ID
   * @return {Object} query
   */
  findId() {
    return {_id: this._id};
  }

  /**
   * Database 科目情報 - 検索:Code
   * @return {Object} query
   */
  findCode() {
    return {code: this._code};
  }

  /**
   * Database 科目情報 - 検索:Name
   * @return {Object} query
   */
  findName() {
    return {name: this._name};
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
      name: new RegExp(this._name),
    };
  }

  /**
   * Sort ASC Code
   * @return {Object} Sort Info
   */
  static sortAscCode() {
    return {code: 1};
  }

  /**
   * Update ALL
   * @return {Object} Update Info
   */
  updateAll() {
    return {$set: this.dbData()};
  }

  /**
   * Database 科目情報 - EMPTY
   * @return {Object} Database Info - EMPTY
   */
  static emptyData() {
    return {
      _id: null,
      code: null,
      name: null,
    };
  }

  /**
   * Database 科目情報
   * @return {Object} Database Info
   */
  dbData() {
    return {
      code: this._code,
      name: this._name,
    };
  }
};
