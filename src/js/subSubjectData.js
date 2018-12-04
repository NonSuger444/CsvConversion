'use strict';

const COLUMN = {
  id: '_id',
  parentId: 'parentId',
  subjectCode: 'subjectCode',
  subjectName: 'subjectName',
  code: 'code',
  name: 'name',
  uniqueCode: 'uniqueCode',
  uniqueName: 'uniqueName',
};

/**
 * Sub Subject Data
 */
module.exports = class SubSubjectData {
  /**
   * Constructor
   */
  constructor() {
    this.subjectId = null;
    this.subjectCode = null;
    this.subjectName = null;
    this.subSubjectName = null;
    this.subSubjectCode = null;
  }

  /**
   * 主科目 ID
   * @param {Number} subjectId
   * Set 'SubjectID'
   */
  set subjectId(subjectId) {
    this._subjectId = subjectId;
  }

  /**
   * 主科目 ID
   * @return {Number}
   * Get 'SubjectID'
   */
  get subjectId() {
    return this._subjectId;
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
   * 主科目名称
   * @param {String} subjectName
   * Set 'SubjectName'
   */
  set subjectName(subjectName) {
    this._subjectName = subjectName;
  }

  /**
   * 主科目名称
   * @return {String}
   * Get 'SubjectName'
   */
  get subjectName() {
    return this._subjectName;
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
   * Sub Subject DB - Column ID
   * @return {Number} Column ID
   */
  static columnId() {
    return COLUMN.id;
  }

  /**
   * Sub Subject DB - Column CODE
   * @return {Number} Column CODE
   */
  static columnCode() {
    return COLUMN.code;
  }

  /**
   * Sub Subject DB - Column NAME
   * @return {String} Column NAME
   */
  static columnName() {
    return COLUMN.name;
  }

  /**
   * Sub Subject DB - Column PARENT ID
   * @return {String} Column PARENT ID
   */
  static columnParentId() {
    return COLUMN.parentId;
  }

  /**
   * Sub Subject DB - Column UNIQUE CODE
   * @return {String} Column UNIQUE CODE
   */
  static columnUniqueCode() {
    return COLUMN.uniqueCode;
  }

  /**
   * Sub Subject DB - Column UNIQUE NAME
   * @return {String} Column UNIQUE NAME
   */
  static columnUniqueName() {
    return COLUMN.uniqueName;
  }

  /**
   * Database 補助科目情報 - EMPTY
   * @return {Object} Database Info - EMPTY
   */
  static emptyData() {
    return {
      _id: null,
      parentId: null,
      subjectCode: null,
      subjectName: null,
      code: null,
      name: null,
      uniqueCode: null,
      uniqueName: null};
  }

  /**
   * Database 補助科目情報 - 一括削除
   * @return {Object} Database Info
   */
  bulkDeleteData() {
    return {parentId: this._subjectId};
  }

  /**
   * Database 補助科目情報
   * @return {Object} Database Info
   */
  dbData() {
    return {
      parentId: this._subjectId,
      subjectCode: this._subjectCode,
      subjectName: this._subjectName,
      code: this._subSubjectCode,
      name: this._subSubjectName,
      uniqueCode: this._subjectCode + '-' + this._subSubjectCode,
      uniqueName: this._subjectName + '-' + this._subSubjectName};
  }
};
