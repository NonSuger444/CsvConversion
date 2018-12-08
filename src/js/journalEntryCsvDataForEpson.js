'use strict';

const TITLE = {
  monthType: '月種別',
  type: '種類',
  format: '形式',
  make: '作成方法',
  tag: '付箋',
  slipDate: '伝票日付',
  slipNumber: '伝票番号',
  slipSummary: '伝票摘要',
  branchNumber: '枝番',
  drDepartmentNumber: '借方部門',
  drDepartmentName: '借方部門名',
  drNumber: '借方科目',
  drSubject: '借方科目名',
  subDrNumber: '借方補助',
  subDrSubject: '借方補助科目名',
  drMoney: '借方金額',
  drConsumptionTaxCode: '借方消費税コード',
  drConsumptionTaxType: '借方消費税業種',
  drConsumptionTaxRate: '借方消費税税率',
  drFundType: '借方資金区分',
  drAnyItem1: '借方任意項目１',
  drAnyItem2: '借方任意項目２',
  crDepartmentNumber: '貸方部門',
  crDepartmentName: '貸方部門名',
  crNumber: '貸方科目',
  crSubject: '貸方科目名',
  subCrNumber: '貸方補助',
  subCrSubject: '貸方補助科目名',
  crMoney: '貸方金額',
  crConsumptionTaxCode: '貸方消費税コード',
  crConsumptionTaxType: '貸方消費税業種',
  crConsumptionTaxRate: '貸方消費税税率',
  crFundType: '貸方資金区分',
  crAnyItem1: '貸方任意項目１',
  crAnyItem2: '貸方任意項目２',
  summary: '摘要',
  deadline: '期日',
  proofNumber: '証番号',
  inputMachine: '入力マシン',
  inputUser: '入力ユーザ',
  inputApplication: '入力アプリ',
  inputCompany: '入力会社',
  inputDate: '入力日付',
};


/**
 * Journal Entry CSV DATA for Eposon
 */
module.exports = class JournalEntryCsvDataForEpson {
  /**
   * Constructor
   * @param {*} monthType 月種別
   * @param {*} type 種類
   * @param {*} format 形式
   * @param {*} make 作成方法
   * @param {*} tag 付箋
   * @param {*} slipDate 伝票日付
   * @param {*} slipNumber 伝票番号
   * @param {*} slipSummary 伝票摘要
   * @param {*} branchNumber 枝番
   * @param {*} drDepartmentNumber 借方部門
   * @param {*} drDepartmentName 借方部門名
   * @param {*} drNumber 借方科目
   * @param {*} drSubject 借方科目名
   * @param {*} subDrNumber 借方補助
   * @param {*} subDrSubject 借方補助科目名
   * @param {*} drMoney 借方金額
   * @param {*} drConsumptionTaxCode 借方消費税コード
   * @param {*} drConsumptionTaxType 借方消費税業種
   * @param {*} drConsumptionTaxRate 借方消費税税率
   * @param {*} drFundType 借方資金区分
   * @param {*} drAnyItem1 借方任意項目1
   * @param {*} drAnyItem2 借方任意項目2
   * @param {*} crDepartmentNumber 貸方部門
   * @param {*} crDepartmentName 貸方部門名
   * @param {*} crNumber 貸方科目
   * @param {*} crSubject 貸方科目名
   * @param {*} subCrNumber 貸方補助
   * @param {*} subCrSubject 貸方補助科目名
   * @param {*} crMoney 貸方金額
   * @param {*} crConsumptionTaxCode 貸方消費税コード
   * @param {*} crConsumptionTaxType 貸方消費税業種
   * @param {*} crConsumptionTaxRate 貸方消費税税率
   * @param {*} crFundType 貸方資金区分
   * @param {*} crAnyItem1 貸方任意項目1
   * @param {*} crAnyItem2 貸方任意項目2
   * @param {*} summary 摘要
   * @param {*} deadline 期日
   * @param {*} proofNumber 証番号
   * @param {*} inputMachine 入力マシン
   * @param {*} inputUser 入力ユーザ
   * @param {*} inputApplication 入力アプリ
   * @param {*} inputCompany 入力会社
   * @param {*} inputDate 入力日付
   */
  constructor(
      monthType = null,
      type = null,
      format = null,
      make = null,
      tag = null,
      slipDate = null,
      slipNumber = null,
      slipSummary = null,
      branchNumber = null,
      drDepartmentNumber = null,
      drDepartmentName = null,
      drNumber = null,
      drSubject = null,
      subDrNumber = null,
      subDrSubject = null,
      drMoney = null,
      drConsumptionTaxCode = null,
      drConsumptionTaxType = null,
      drConsumptionTaxRate = null,
      drFundType = null,
      drAnyItem1 = null,
      drAnyItem2 = null,
      crDepartmentNumber = null,
      crDepartmentName = null,
      crNumber = null,
      crSubject = null,
      subCrNumber = null,
      subCrSubject = null,
      crMoney = null,
      crConsumptionTaxCode = null,
      crConsumptionTaxType = null,
      crConsumptionTaxRate = null,
      crFundType = null,
      crAnyItem1 = null,
      crAnyItem2 = null,
      summary = null,
      deadline = null,
      proofNumber = null,
      inputMachine = null,
      inputUser = null,
      inputApplication = null,
      inputCompany = null,
      inputDate = null
  ) {
    this.monthType = monthType;
    this.type = type;
    this.format = format;
    this.make = make;
    this.tag = tag;
    this.slipDate = slipDate;
    this.slipNumber = slipNumber;
    this.slipSummary = slipSummary;
    this.branchNumber = branchNumber;
    this.drDepartmentNumber = drDepartmentNumber;
    this.drDepartmentName = drDepartmentName;
    this.drNumber = drNumber;
    this.drSubject = drSubject;
    this.subDrNumber = subDrNumber;
    this.subDrSubject = subDrSubject;
    this.drMoney = drMoney;
    this.drConsumptionTaxCode = drConsumptionTaxCode;
    this.drConsumptionTaxType = drConsumptionTaxType;
    this.drConsumptionTaxRate = drConsumptionTaxRate;
    this.drFundType = drFundType;
    this.drAnyItem1 = drAnyItem1;
    this.drAnyItem2 = drAnyItem2;
    this.crDepartmentNumber = crDepartmentNumber;
    this.crDepartmentName = crDepartmentName;
    this.crNumber = crNumber;
    this.crSubject = crSubject;
    this.subCrNumber = subCrNumber;
    this.subCrSubject = subCrSubject;
    this.crMoney = crMoney;
    this.crConsumptionTaxCode = crConsumptionTaxCode;
    this.crConsumptionTaxType = crConsumptionTaxType;
    this.crConsumptionTaxRate = crConsumptionTaxRate;
    this.crFundType = crFundType;
    this.crAnyItem1 = crAnyItem1;
    this.crAnyItem2 = crAnyItem2;
    this.summary = summary;
    this.deadline = deadline;
    this.proofNumber = proofNumber;
    this.inputMachine = inputMachine;
    this.inputUser = inputUser;
    this.inputApplication = inputApplication;
    this.inputCompany = inputCompany;
    this.inputDate = inputDate;
  }

  /**
   * 月種別
   * @param {Number} monthType
   * 0[第1四半期]
   * 1[第2四半期]
   * 2[第3四半期]
   * 4[期末]
   */
  set monthType(monthType) {
    this._monthType = monthType;
  }

  /**
   * 月種別
   */
  get monthType() {
    return this._monthType;
  }

  /**
   * 種類
   * @param {Number} type
   * 0[通常]
   * S[先行]
   */
  set type(type) {
    this._type = type;
  }

  /**
   * 種類
   */
  get type() {
    return this._type;
  }

  /**
   * 形式
   * @param {Number} format
   * 1[入金]
   * 2[出金]
   * 3[振替]
   * 4[単一]
   * 5[帳簿]
   */
  set format(format) {
    this._format = format;
  }

  /**
   * 形式
   */
  get format() {
    return this._format;
  }

  /**
   * 作成方法
   * @param {Number} make
   * 0[手入力]
   * 1[自動作成]
   * 2[残高合併]
   * 3[伝票合併]
   */
  set make(make) {
    this._make = make;
  }

  /**
   * 作成方法
   */
  get make() {
    return this._make;
  }

  /**
   * 付箋
   * @param {String} tag
   * 0[無]
   * 1[行付箋-赤]
   * 2[行付箋-青]
   * 3[行付箋-緑]
   * 4[行付箋-黄]
   * 5[行付箋-桃]
   * A[伝票付箋-赤]
   * B[伝票付箋-青]
   * C[伝票付箋-緑]
   * D[伝票付箋-黄]
   * E[伝票付箋-桃]
   */
  set tag(tag) {
    this._tag = tag;
  }

  /**
   * 付箋
   */
  get tag() {
    return this._tag;
  }

  /**
   * 伝票日付
   * @param {Number} slipDate
   * yyyymmdd
   */
  set slipDate(slipDate) {
    this._slipDate = slipDate;
  }

  /**
   * 伝票日付
   */
  get slipDate() {
    return this._slipDate;
  }

  /**
   * 伝票番号
   * @param {Number} slipNumber
   * 1~999999
   */
  set slipNumber(slipNumber) {
    this._slipNumber = slipNumber;
  }

  /**
   * 伝票番号
   */
  get slipNumber() {
    return this._slipNumber;
  }

  /**
   * 伝票摘要
   * @param {String} slipSummary
   * Max:40Length
   */
  set slipSummary(slipSummary) {
    this._slipSummary = slipSummary;
  }

  /**
   * 伝票摘要
   */
  get slipSummary() {
    return this._slipSummary;
  }

  /**
   * 枝番
   * @param {Number} branchNumber
   * 1~999
   */
  set branchNumber(branchNumber) {
    this._branchNumber = branchNumber;
  }

  /**
   * 枝番
   */
  get branchNumber() {
    return this._branchNumber;
  }

  /**
   * 借方部門
   * @param {Number} drDepartmentNumber
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set drDepartmentNumber(drDepartmentNumber) {
    this._drDepartmentNumber = drDepartmentNumber;
  }

  /**
   * 借方部門
   */
  get drDepartmentNumber() {
    return this._drDepartmentNumber;
  }

  /**
   * 借方部門名
   * @param {String} drDepartmentName
   * 財務応援R4で設定されている部門名を指定
   * (借方部門から自動指定可能)
   * (Max:30Length)
   */
  set drDepartmentName(drDepartmentName) {
    this._drDepartmentName = drDepartmentName;
  }

  /**
   * 借方部門名
   */
  get drDepartmentName() {
    return this._drDepartmentName;
  }

  /**
   * 借方科目
   * @param {Number} drNumber
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set drNumber(drNumber) {
    this._drNumber = drNumber;
  }

  /**
   * 借方科目
   */
  get drNumber() {
    return this._drNumber;
  }

  /**
   * 借方科目名
   * @param {String} drSubject
   * 財務応援R4で設定されている科目名を指定
   * (借方科目から自動指定可能)
   * (Max:24Length)
   */
  set drSubject(drSubject) {
    this._drSubject = drSubject;
  }

  /**
   * 借方科目名
   */
  get drSubject() {
    return this._drSubject;
  }

  /**
   * 借方補助
   * @param {Number} subDrNumber
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set subDrNumber(subDrNumber) {
    this._subDrNumber = subDrNumber;
  }

  /**
   * 借方補助
   */
  get subDrNumber() {
    return this._subDrNumber;
  }

  /**
   * 借方補助科目名
   * @param {String} subDrSubject
   * 財務応援R4で設定されている科目名を指定
   * (借方補助から自動指定可能)
   * (Max:24Length)
   */
  set subDrSubject(subDrSubject) {
    this._subDrSubject = subDrSubject;
  }

  /**
   * 借方補助科目名
   */
  get subDrSubject() {
    return this._subDrSubject;
  }

  /**
   * 借方金額
   * @param {Number} drMoney
   * 0~999999999999
   */
  set drMoney(drMoney) {
    this._drMoney = drMoney;
  }

  /**
   * 借方金額
   */
  get drMoney() {
    return this._drMoney;
  }

  /**
   * 借方消費税コード
   * @param {Number} drConsumptionTaxCode
   * 「消費税区分コード」の「応援用コード」を入力
   */
  set drConsumptionTaxCode(drConsumptionTaxCode) {
    this._drConsumptionTaxCode = drConsumptionTaxCode;
  }

  /**
   * 借方消費税コード
   */
  get drConsumptionTaxCode() {
    return this._drConsumptionTaxCode;
  }

  /**
   * 借方消費税業種
   * @param {Number} drConsumptionTaxType
   * 「消費税業種」の「業種」を入力
   */
  set drConsumptionTaxType(drConsumptionTaxType) {
    this._drConsumptionTaxType = drConsumptionTaxType;
  }

  /**
   * 借方消費税業種
   */
  get drConsumptionTaxType() {
    return this._drConsumptionTaxType;
  }

  /**
   * 借方消費税税率
   * @param {Number} drConsumptionTaxRate
   * 「消費税率」の「税率」を入力
   */
  set drConsumptionTaxRate(drConsumptionTaxRate) {
    this._drConsumptionTaxRate = drConsumptionTaxRate;
  }

  /**
   * 借方消費税税率
   */
  get drConsumptionTaxRate() {
    return this._drConsumptionTaxRate;
  }

  /**
   * 借方資金区分
   * @param {Number} drFundType
   * 不明(Max:2Length)
   */
  set drFundType(drFundType) {
    this._drFundType = drFundType;
  }

  /**
   * 借方資金区分
   */
  get drFundType() {
    return this._drFundType;
  }

  /**
   * 借方任意項目1
   * @param {String} drAnyItem1
   * 不明(Max:10Length)
   */
  set drAnyItem1(drAnyItem1) {
    this._drAnyItem1 = drAnyItem1;
  }

  /**
   * 借方任意項目1
   */
  get drAnyItem1() {
    return this._drAnyItem1;
  }

  /**
   * 借方任意項目2
   * @param {String} drAnyItem2
   * 不明(Max:10Length)
   */
  set drAnyItem2(drAnyItem2) {
    this._drAnyItem2 = drAnyItem2;
  }

  /**
   * 借方任意項目2
   */
  get drAnyItem2() {
    return this._drAnyItem2;
  }

  /**
   * 貸方部門
   * @param {Number} crDepartmentNumber
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set crDepartmentNumber(crDepartmentNumber) {
    this._crDepartmentNumber = crDepartmentNumber;
  }

  /**
   * 貸方部門
   */
  get crDepartmentNumber() {
    return this._crDepartmentNumber;
  }

  /**
   * 貸方部門名
   * @param {String} crDepartmentName
   * 財務応援R4で設定されている部門名を指定
   * (貸方部門から自動指定可能)
   * (Max:30Length)
   */
  set crDepartmentName(crDepartmentName) {
    this._crDepartmentName = crDepartmentName;
  }

  /**
   * 貸方部門名
   */
  get crDepartmentName() {
    return this._crDepartmentName;
  }

  /**
   * 貸方科目
   * @param {Number} crNumber
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set crNumber(crNumber) {
    this._crNumber = crNumber;
  }

  /**
   * 貸方科目
   */
  get crNumber() {
    return this._crNumber;
  }

  /**
   * 貸方科目名
   * @param {String} crSubject
   * 財務応援R4で設定されている科目名を指定
   * (貸方科目から自動指定可能)
   * (Max:24Length)
   */
  set crSubject(crSubject) {
    this._crSubject = crSubject;
  }

  /**
   * 貸方科目名
   */
  get crSubject() {
    return this._crSubject;
  }

  /**
   * 貸方補助
   * @param {Number} subCrNumber
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set subCrNumber(subCrNumber) {
    this._subCrNumber = subCrNumber;
  }

  /**
   * 貸方補助
   */
  get subCrNumber() {
    return this._subCrNumber;
  }

  /**
   * 貸方補助科目名
   * @param {String} subCrSubject
   * 財務応援R4で設定されている科目名を指定
   * (貸方補助から自動指定可能)
   * (Max:24Length)
   */
  set subCrSubject(subCrSubject) {
    this._subCrSubject = subCrSubject;
  }

  /**
   * 貸方補助科目名
   */
  get subCrSubject() {
    return this._subCrSubject;
  }

  /**
   * 貸方金額
   * @param {Number} crMoney
   * 0~999999999999
   */
  set crMoney(crMoney) {
    this._crMoney = crMoney;
  }

  /**
   * 貸方金額
   */
  get crMoney() {
    return this._crMoney;
  }

  /**
   * 貸方消費税コード
   * @param {Number} crConsumptionTaxCode
   * 「消費税区分コード」の「応援用コード」を入力
   */
  set crConsumptionTaxCode(crConsumptionTaxCode) {
    this._crConsumptionTaxCode = crConsumptionTaxCode;
  }

  /**
   * 貸方消費税コード
   */
  get crConsumptionTaxCode() {
    return this._crConsumptionTaxCode;
  }

  /**
   * 貸方消費税業種
   * @param {Number} crConsumptionTaxType
   * 「消費税業種」の「業種」を入力
   */
  set crConsumptionTaxType(crConsumptionTaxType) {
    this._crConsumptionTaxType = crConsumptionTaxType;
  }

  /**
   * 貸方消費税業種
   */
  get crConsumptionTaxType() {
    return this._crConsumptionTaxType;
  }

  /**
   * 貸方消費税税率
   * @param {Number} crConsumptionTaxRate
   * 「消費税率」の「税率」を入力
   */
  set crConsumptionTaxRate(crConsumptionTaxRate) {
    this._crConsumptionTaxRate = crConsumptionTaxRate;
  }

  /**
   * 貸方消費税税率
   */
  get crConsumptionTaxRate() {
    return this._crConsumptionTaxRate;
  }

  /**
   * 貸方資金区分
   * @param {Number} crFundType
   * 不明(Max:2Length)
   */
  set crFundType(crFundType) {
    this._crFundType = crFundType;
  }

  /**
   * 貸方資金区分
   */
  get crFundType() {
    return this._crFundType;
  }

  /**
   * 貸方任意項目1
   * @param {String} crAnyItem1
   * 不明(Max:10Length)
   */
  set crAnyItem1(crAnyItem1) {
    this._crAnyItem1 = crAnyItem1;
  }

  /**
   * 貸方任意項目1
   */
  get crAnyItem1() {
    return this._crAnyItem1;
  }

  /**
   * 貸方任意項目2
   * @param {String} crAnyItem2
   * 不明(Max:10Length)
   */
  set crAnyItem2(crAnyItem2) {
    this._crAnyItem2 = crAnyItem2;
  }

  /**
   * 貸方任意項目2
   */
  get crAnyItem2() {
    return this._crAnyItem2;
  }

  /**
   * 摘要
   * @param {String} summary
   * 摘要に表記する内容(Max:96Length)
   */
  set summary(summary) {
    this._summary = summary;
  }

  /**
   * 摘要
   */
  get summary() {
    return this._summary;
  }

  /**
   * 期日
   * @param {Number} deadline
   * yyyymmdd
   */
  set deadline(deadline) {
    this._deadline = deadline;
  }

  /**
   * 期日
   */
  get deadline() {
    return this._deadline;
  }

  /**
   * 証番号
   * @param {Number} proofNumber
   * 1~9999999999
   */
  set proofNumber(proofNumber) {
    this._proofNumber = proofNumber;
  }

  /**
   * 証番号
   */
  get proofNumber() {
    return this._proofNumber;
  }

  /**
   * 入力マシン
   * @param {String} inputMachine
   * Max:20Length
   */
  set inputMachine(inputMachine) {
    this._inputMachine = inputMachine;
  }

  /**
   * 入力マシン
   */
  get inputMachine() {
    return this._inputMachine;
  }

  /**
   * 入力ユーザ
   * @param {String} inputUser
   * Max:40Length
   */
  set inputUser(inputUser) {
    this._inputUser = inputUser;
  }

  /**
   * 入力ユーザ
   */
  get inputUser() {
    return this._inputUser;
  }

  /**
   * 入力アプリ
   * @param {String} inputApplication
   * Max:30Length
   */
  set inputApplication(inputApplication) {
    this._inputApplication = inputApplication;
  }

  /**
   * 入力アプリ
   */
  get inputApplication() {
    return this._inputApplication;
  }

  /**
   * 入力会社
   * @param {String} inputCompany
   * Max:40Length
   */
  set inputCompany(inputCompany) {
    this._inputCompany = inputCompany;
  }

  /**
   * 入力会社
   */
  get inputCompany() {
    return this._inputCompany;
  }

  /**
   * 入力日付
   * @param {Number} inputDate
   * yyyymmdd
   */
  set inputDate(inputDate) {
    this._inputDate = inputDate;
  }

  /**
   * 入力日付
   */
  get inputDate() {
    return this._inputDate;
  }

  /**
   * Output Title
   * @return {String} Title Data
   */
  static outputTitle() {
    let data = '';
    const lastKey = Object.keys(TITLE).pop();
    for (const key in TITLE) {
      if (!TITLE.hasOwnProperty(key)) continue;
      data += TITLE[key];
      data += (key === lastKey ? '' : ',');
    }
    return data;
  }

  /**
   * Output Data
   * @return {String} CSV Data
   */
  outputData() {
    return (this._monthType ? this._monthType : 0) + ',' +
           (this._type ? this._type : 0) + ',' +
           (this._format ? this._format : 4) + ',' +
           (this._make ? this._make : 0) + ',' +
           (this._tag ? this._tag : 0) + ',' +
           (this._slipDate ? this._slipDate : '') + ',' +
           (this._slipNumber ? this._slipNumber : 1) + ',' +
           (this._slipSummary ? '"' + this._slipSummary + '"' : '""') + ',' +
           (this._branchNumber ? this._branchNumber : 1) + ',' +
           (this._drDepartmentNumber ? this._drDepartmentNumber : '') + ',' +
           (this._drDepartmentName ? '"' + this._drDepartmentName + '"' : '""') + ',' +
           (this._drNumber ? this._drNumber : '') + ',' +
           (this._drSubject ? '"' + this._drSubject + '"' : '""') + ',' +
           (this._subDrNumber ? this._subDrNumber : '') + ',' +
           (this._subDrSubject ? '"' + this._subDrSubject + '"' : '""') + ',' +
           (this._drMoney ? this._drMoney : '') + ',' +
           (this._drConsumptionTaxCode ? this._drConsumptionTaxCode : '') + ',' +
           (this._drConsumptionTaxType ? this._drConsumptionTaxType : '') + ',' +
           (this._drConsumptionTaxRate ? this._drConsumptionTaxRate : '') + ',' +
           (this._drFundType ? this._drFundType : '') + ',' +
           (this._drAnyItem1 ? '"' + this._drAnyItem1 + '"' : '""') + ',' +
           (this._drAnyItem2 ? '"' + this._drAnyItem2 + '"' : '""') + ',' +
           (this._crDepartmentNumber ? this._crDepartmentNumber : '') + ',' +
           (this._crDepartmentName ? '"' + this._crDepartmentName + '"' : '""') + ',' +
           (this._crNumber ? this._crNumber : '') + ',' +
           (this._crSubject ? '"' + this._crSubject + '"' : '""') + ',' +
           (this._subCrNumber ? this._subCrNumber : '') + ',' +
           (this._subCrSubject ? '"' + this._subCrSubject + '"' : '""') + ',' +
           (this._crMoney ? this._crMoney : '') + ',' +
           (this._crConsumptionTaxCode ? this._crConsumptionTaxCode : '') + ',' +
           (this._crConsumptionTaxType ? this._crConsumptionTaxType : '') + ',' +
           (this._crConsumptionTaxRate ? this._crConsumptionTaxRate : '') + ',' +
           (this._crFundType ? this._crFundType : '') + ',' +
           (this._crAnyItem1 ? '"' + this._crAnyItem1 + '"' : '""') + ',' +
           (this._crAnyItem2 ? '"' + this._crAnyItem2 + '"' : '""') + ',' +
           (this._summary ? '"' + this._summary + '"' : '""') + ',' +
           (this._deadline ? this._deadline : '') + ',' +
           (this._proofNumber ? '"' + this._proofNumber + '"' : '""') + ',' +
           (this._inputMachine ? '"' + this._inputMachine + '"' : '""') + ',' +
           (this._inputUser ? '"' + this._inputUser + '"' : '""') + ',' +
           (this._inputApplication ? '"' + this._inputApplication + '"' : '""') + ',' +
           (this._inputCompany ? '"' + this._inputCompany + '"' : '""') + ',' +
           (this._inputDate ? this._inputDate : '');
  }
};
