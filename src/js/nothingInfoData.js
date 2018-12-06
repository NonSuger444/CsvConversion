'use strict';

const COLUMN = {
  id: '_id',
  code: 'code',
  name: 'name',
  subCode: 'subCode',
  subName: 'subName',
  tag: 'tag',
};

/**
 * Nothing Infomation Data
 */
module.exports = class NothingInfoData {
  /**
   * Constructor
   */
  constructor() {
    this.id = null;
    this.code = null;
    this.name = null;
    this.subCode = null;
    this.subName = null;
    this.tag = null;
  }

  /**
   * ID
   * @param {String} id
   * Set 'ID'
   */
  set id(id) {
    this._id = id;
  }

  /**
   * ID
   * Get 'ID'
   */
  get id() {
    return this._id;
  }

  /**
   * 科目コード
   * @param {String} code
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
   * 補助科目コード
   * @param {String} subCode
   * Set 'SubSubjectCode'
   */
  set subCode(subCode) {
    this._subCode = subCode;
  }

  /**
   * 補助科目コード
   * Get 'SubSubjectCode'
   */
  get subCode() {
    return this._subCode;
  }

  /**
   * 補助科目名
   * @param {String} subName
   * Set 'SubSubjectName'
   */
  set subName(subName) {
    this._subName = subName;
  }

  /**
   * 補助科目名
   * Get 'SubSubjectName'
   */
  get subName() {
    return this._subName;
  }

  /**
   * 付箋
   * @param {String} tag
   * Set 'Tag'
   */
  set tag(tag) {
    this._tag = tag;
  }

  /**
   * 付箋
   * Get 'Tag'
   */
  get tag() {
    return this._tag;
  }

  /**
   * CashInfo DB - Column ID
   * @return {String} Column ID
   */
  static columnID() {
    return COLUMN.id;
  }

  /**
   * CashInfo DB - Column CODE
   * @return {String} Column CODE
   */
  static columnCode() {
    return COLUMN.code;
  }

  /**
   * CashInfo DB - Column NAME
   * @return {String} Column NAME
   */
  static columnName() {
    return COLUMN.name;
  }

  /**
   * CashInfo DB - Column SUB CODE
   * @return {String} Column SUB CODE
   */
  static columnSubCode() {
    return COLUMN.subCode;
  }

  /**
   * CashInfo DB - Column SUB NAME
   * @return {String} Column SUB NAME
   */
  static columnSubName() {
    return COLUMN.subName;
  }

  /**
   * CashInfo DB - Column TAG
   * @return {String} Column TAG
   */
  static columnTag() {
    return COLUMN.tag;
  }

  /**
   * Find ID
   * @return {Object} Find Info
   */
  findId() {
    return {_id: this._id};
  }

  /**
   * Update ALL
   * @return {Object} Update Info
   */
  updateAll() {
    return {$set: this.dbData()};
  }

  /**
   * Database 科目無し情報
   * @return {Object} Database Info
   */
  dbData() {
    return {
      code: this._code,
      name: this._name,
      subCode: this._subCode,
      subName: this._subName,
      tag: this._tag};
  }
};
