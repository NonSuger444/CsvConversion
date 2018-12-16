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
   * @param {String} id ID
   * @param {String} subjectId SubjectID
   * @param {Number} subjectCode Subject Code
   * @param {String} subjectName Subject Name
   * @param {Number} subSubjectCode Sub Subject Code
   * @param {String} subSubjectName Sub Subject Name
   */
  constructor(
      id = null,
      subjectId = null,
      subjectCode = null,
      subjectName = null,
      subSubjectCode = null,
      subSubjectName = null) {
    this.id = id;
    this.subjectId = subjectId;
    this.subjectCode = subjectCode;
    this.subjectName = subjectName;
    this.subSubjectCode = subSubjectCode;
    this.subSubjectName = subSubjectName;
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
   * @return {String}
   * Get 'ID'
   */
  get id() {
    return this._id;
  }

  /**
   * 主科目 ID
   * @param {String} subjectId
   * Set 'SubjectID'
   */
  set subjectId(subjectId) {
    this._subjectId = subjectId;
  }

  /**
   * 主科目 ID
   * @return {String}
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
   * Database 補助科目情報 - ID検索
   * @return {Object} Find Info
   */
  findId() {
    return {_id: this._id};
  }

  /**
   * Database 補助科目情報 - 親ID検索
   * @return {Object} Find Info
   */
  findParent() {
    return {parentId: this._subjectId};
  }

  /**
   * Database 補助科目情報 - 親Code検索
   * @return {Object} Find Info
   */
  findParentCode() {
    return {subjectCode: this._subjectCode};
  }

  /**
   * Database 補助科目情報 - 検索:親ID/正規表現:Code
   * @return {Object} Find Info
   */
  findParentRegCode() {
    return {
      parentId: this._subjectId,
      code: new RegExp('^' + this._subSubjectCode),
    };
  }

  /**
   * Database 補助科目情報 - 検索:親ID/正規表現:名称
   * @return {Object} Find Info
   */
  findParentRegName() {
    return {
      parentId: this._subjectId,
      name: new RegExp(this._subSubjectName),
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
   * Multi Flag
   * @return {Object} Multi flag
   */
  static multiFlag() {
    return {multi: true};
  }

  /**
   * Update ALL
   * @return {Object} Update Info
   */
  updateAll() {
    return {$set: this.dbData()};
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
