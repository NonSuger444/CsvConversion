'use strict';

/**
 * Create CSV Data
 */
module.exports = class CsvData {
  /**
   * Constructor
   */
  constructor() {
    this.data = {
      monthType: {name: '月種別', value: null},
      type: {name: '種類', value: null},
      format: {name: '形式', value: null},
      make: {name: '作成方法', value: null},
      tag: {name: '付箋', value: null},
      slipDate: {name: '伝票日付', value: null},
      slipNumber: {name: '伝票番号', value: null},
      slipSummary: {name: '伝票摘要', value: null},
      branchNumber: {name: '枝番', value: null},
      drDepartmentNumber: {name: '借方部門', value: null},
      drDepartmentName: {name: '借方部門名', value: null},
      drNumber: {name: '借方科目', value: null},
      drSubject: {name: '借方科目名', value: null},
      subDrNumber: {name: '借方補助', value: null},
      subDrSubject: {name: '借方補助科目名', value: null},
      drMoney: {name: '借方金額', value: null},
      drConsumptionTaxCode: {name: '借方消費税コード', value: null},
      drConsumptionTaxType: {name: '借方消費税業種', value: null},
      drConsumptionTaxRate: {name: '借方消費税税率', value: null},
      drFundType: {name: '借方資金区分', value: null},
      drAnyItem1: {name: '借方任意項目１', value: null},
      drAnyItem2: {name: '借方任意項目２', value: null},
      crDepartmentNumber: {name: '貸方部門', value: null},
      crDepartmentName: {name: '貸方部門名', value: null},
      crNumber: {name: '貸方科目', value: null},
      crSubject: {name: '貸方科目名', value: null},
      subCrNumber: {name: '貸方補助', value: null},
      subCrSubject: {name: '貸方補助科目名', value: null},
      crMoney: {name: '貸方金額', value: null},
      crConsumptionTaxCode: {name: '貸方消費税コード', value: null},
      crConsumptionTaxType: {name: '貸方消費税業種', value: null},
      crConsumptionTaxRate: {name: '貸方消費税税率', value: null},
      crFundType: {name: '貸方資金区分', value: null},
      crAnyItem1: {name: '貸方任意項目１', value: null},
      crAnyItem2: {name: '貸方任意項目２', value: null},
      summary: {name: '摘要', value: null},
      deadline: {name: '期日', value: null},
      proofNumber: {name: '証番号', value: null},
      inputMachine: {name: '入力マシン', value: null},
      inputUser: {name: '入力ユーザ', value: null},
      inputApplication: {name: '入力アプリ', value: null},
      inputCompany: {name: '入力会社', value: null},
      inputDate: {name: '入力日付', value: null},
    };
  }

  /**
   * 月種別
   * @param {Number} value
   * 0[第1四半期]
   * 1[第2四半期]
   * 2[第3四半期]
   * 4[期末]
   */
  set monthType(value) {
    this.data.monthType.value = value;
  }

  /**
   * 種類
   * @param {Number} value
   * 0[通常]
   * S[先行]
   */
  set type(value) {
    this.data.type.value = value;
  }

  /**
   * 形式
   * @param {Number} value
   * 1[入金]
   * 2[出金]
   * 3[振替]
   * 4[単一]
   * 5[帳簿]
   */
  set format(value) {
    this.data.format.value = value;
  }

  /**
   * 作成方法
   * @param {Number} value
   * 0[手入力]
   * 1[自動作成]
   * 2[残高合併]
   * 3[伝票合併]
   */
  set make(value) {
    this.data.make.value = value;
  }

  /**
   * 付箋
   * @param {Number} value
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
  set tag(value) {
    this.data.tag.value = value;
  }

  /**
   * 伝票日付
   * @param {Number} value
   * yyyymmdd
   */
  set slipDate(value) {
    this.data.slipDate.value = value;
  }

  /**
   * 伝票番号
   * @param {Number} value
   * 1~999999
   */
  set slipNumber(value) {
    this.data.slipNumber.value = value;
  }

  /**
   * 伝票摘要
   * @param {String} value
   * Max:40Length
   */
  set slipSummary(value) {
    this.data.slipSummary.value = value;
  }

  /**
   * 枝番
   * @param {Number} value
   * 1~999
   */
  set branchNumber(value) {
    this.data.branchNumber.value = value;
  }

  /**
   * 借方部門
   * @param {Number} value
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set drDepartmentNumber(value) {
    this.data.drDepartmentNumber.value = value;
  }

  /**
   * 借方部門名
   * @param {String} value
   * 財務応援R4で設定されている部門名を指定
   * (借方部門から自動指定可能)
   * (Max:30Length)
   */
  set drDepartmentName(value) {
    this.data.drDepartmentName.value = value;
  }

  /**
   * 借方科目
   * @param {Number} value
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set drNumber(value) {
    this.data.drNumber.value = value;
  }

  /**
   * 借方科目名
   * @param {String} value
   * 財務応援R4で設定されている科目名を指定
   * (借方科目から自動指定可能)
   * (Max:24Length)
   */
  set drSubject(value) {
    this.data.drSubject.value = value;
  }

  /**
   * 借方補助
   * @param {Number} value
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set subDrNumber(value) {
    this.data.subDrNumber.value = value;
  }

  /**
   * 借方補助科目名
   * @param {String} value
   * 財務応援R4で設定されている科目名を指定
   * (借方補助から自動指定可能)
   * (Max:24Length)
   */
  set subDrSubject(value) {
    this.data.subDrSubject.value = value;
  }

  /**
   * 借方金額
   * @param {Number} value
   * 0~999999999999
   */
  set drMoney(value) {
    this.data.drMoney.value = value;
  }

  /**
   * 借方消費税コード
   * @param {Number} value
   * 「消費税区分コード」の「応援用コード」を入力
   */
  set drConsumptionTaxCode(value) {
    this.data.drConsumptionTaxCode.value = value;
  }

  /**
   * 借方消費税業種
   * @param {Number} value
   * 「消費税業種」の「業種」を入力
   */
  set drConsumptionTaxType(value) {
    this.data.drConsumptionTaxType.value = value;
  }

  /**
   * 借方消費税税率
   * @param {Number} value
   * 「消費税率」の「税率」を入力
   */
  set drConsumptionTaxRate(value) {
    this.data.drConsumptionTaxRate.value = value;
  }

  /**
   * 借方資金区分
   * @param {Number} value
   * 不明(Max:2Length)
   */
  set drFundType(value) {
    this.data.drFundType.value = value;
  }

  /**
   * 借方任意項目1
   * @param {String} value
   * 不明(Max:10Length)
   */
  set drAnyItem1(value) {
    this.data.drAnyItem1.value = value;
  }

  /**
   * 借方任意項目2
   * @param {String} value
   * 不明(Max:10Length)
   */
  set drAnyItem2(value) {
    this.data.drAnyItem2.value = value;
  }

  /**
   * 貸方部門
   * @param {Number} value
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set crDepartmentNumber(value) {
    this.data.crDepartmentNumber.value = value;
  }

  /**
   * 貸方部門名
   * @param {String} value
   * 財務応援R4で設定されている部門名を指定
   * (貸方部門から自動指定可能)
   * (Max:30Length)
   */
  set crDepartmentName(value) {
    this.data.crDepartmentName.value = value;
  }

  /**
   * 貸方科目
   * @param {Number} value
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set crNumber(value) {
    this.data.crNumber.value = value;
  }

  /**
   * 貸方科目名
   * @param {String} value
   * 財務応援R4で設定されている科目名を指定
   * (貸方科目から自動指定可能)
   * (Max:24Length)
   */
  set crSubject(value) {
    this.data.crSubject.value = value;
  }

  /**
   * 貸方補助
   * @param {Number} value
   * 財務応援R4で設定されている番号を指定(0~999999)
   */
  set subCrNumber(value) {
    this.data.subCrNumber.value = value;
  }

  /**
   * 貸方補助科目名
   * @param {String} value
   * 財務応援R4で設定されている科目名を指定
   * (貸方補助から自動指定可能)
   * (Max:24Length)
   */
  set subCrSubject(value) {
    this.data.subCrSubject.value = value;
  }

  /**
   * 貸方金額
   * @param {Number} value
   * 0~999999999999
   */
  set crMoney(value) {
    this.data.crMoney.value = value;
  }

  /**
   * 貸方消費税コード
   * @param {Number} value
   * 「消費税区分コード」の「応援用コード」を入力
   */
  set crConsumptionTaxCode(value) {
    this.data.crConsumptionTaxCode.value = value;
  }

  /**
   * 貸方消費税業種
   * @param {Number} value
   * 「消費税業種」の「業種」を入力
   */
  set crConsumptionTaxType(value) {
    this.data.crConsumptionTaxType.value = value;
  }

  /**
   * 貸方消費税税率
   * @param {Number} value
   * 「消費税率」の「税率」を入力
   */
  set crConsumptionTaxRate(value) {
    this.data.crConsumptionTaxRate.value = value;
  }

  /**
   * 貸方資金区分
   * @param {Number} value
   * 不明(Max:2Length)
   */
  set crFundType(value) {
    this.data.crFundType.value = value;
  }

  /**
   * 貸方任意項目1
   * @param {String} value
   * 不明(Max:10Length)
   */
  set crAnyItem1(value) {
    this.data.crAnyItem1.value = value;
  }

  /**
   * 貸方任意項目2
   * @param {String} value
   * 不明(Max:10Length)
   */
  set crAnyItem2(value) {
    this.data.crAnyItem2.value = value;
  }

  /**
   * 摘要
   * @param {String} value
   * 摘要に表記する内容(Max:96Length)
   */
  set summary(value) {
    this.data.summary.value = value;
  }

  /**
   * 期日
   * @param {Number} value
   * yyyymmdd
   */
  set deadline(value) {
    this.data.deadline.value = value;
  }

  /**
   * 証番号
   * @param {Number} value
   * 1~9999999999
   */
  set proofNumber(value) {
    this.data.proofNumber.value = value;
  }

  /**
   * 入力マシン
   * @param {String} value
   * Max:20Length
   */
  set inputMachine(value) {
    this.data.inputMachine.value = value;
  }

  /**
   * 入力ユーザ
   * @param {String} value
   * Max:40Length
   */
  set inputUser(value) {
    this.data.inputUser.value = value;
  }

  /**
   * 入力アプリ
   * @param {String} value
   * Max:30Length
   */
  set inputApplication(value) {
    this.data.inputApplication.value = value;
  }

  /**
   * 入力会社
   * @param {String} value
   * Max:40Length
   */
  set inputCompany(value) {
    this.data.inputCompany.value = value;
  }

  /**
   * 入力日付
   * @param {Number} value
   * yyyymmdd
   */
  set inputDate(value) {
    this.data.inputDate.value = value;
  }

  /**
   * CSVデータ出力
   */
  get outputCsvData() {
    return this.data;
  }
};
