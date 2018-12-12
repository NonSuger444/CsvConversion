'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;
const REMOTE = require('electron').remote;
const DIALOG = REMOTE.dialog;

// Database
const DATABASE = require('./js/operationDb');
const SUBJECT_DB = new DATABASE('./db/subject.db');
const SUBJECT_DATA = require('./js/subjectData');
const DATA = new SUBJECT_DATA();
const SUB_SUBJECT_DB = new DATABASE('./db/subSubject.db');
const SUB_SUBJECT_DATA = require('./js/subSubjectData');
const SUB_DATA = new SUB_SUBJECT_DATA();
const CASH_DB = new DATABASE('./db/cashInfo.db');
const CASH_DATA = require('./js/cashInfoData');
const CASH = new CASH_DATA();
const NOTHING_DB = new DATABASE('./db/noSubjectInfo.db');
const NOTHING_DATA = require('./js/nothingInfoData');
const NOTHING = new NOTHING_DATA();
const CASHBOOK_DB = new DATABASE('./db/cashbookInfo.db');
const CASHBOOK_DATA = require('./js/cashbookInfoData');
let CASHBOOK;

// DOM
const PARTS = require('./js/createDomParts');

// Excel
const XLSX = require('xlsx');
let BOOK;

// CSV
const CSV = require('./js/journalEntryCsvDataForEpson');

// Date
const DATE = require('./js/formatDate');

// File
let SAVE_PTHA;
const FILE = require('./js/fileControl');
const CONVERSION = require('./js/charConversion');

// Error
const READ_ERROR = {
  cash: {
    id: 'cash',
    error: 'There is no "cash" setting.',
    title: '「現金科目」の設定がありません。',
    message: '「現金科目」の設定がありません。' + '\n' +
             '設定画面から「現金科目」の設定を行ってください。',
  },
  nothing: {
    id: 'nothing',
    error: 'There is no "nothing" setting.',
    title: '「科目記載無し」の設定がありません。',
    message: '「科目記載無し」の設定がありません。' + '\n' +
             '設定画面から「科目記載無し」の設定を行ってください。',
  },
  cashbook: {
    id: 'cashbook',
    error: 'There is no "cashbook" setting.',
    title: '「出納帳」の設定がありません。',
    message: '「出納帳」の設定がありません。' + '\n' +
             '設定画面から「出納帳」の設定を行ってください。',
  },
};

// Initialize
SUBJECT_DB.load().then(() => {
  return SUB_SUBJECT_DB.load();
}).then(() => {
  return CASH_DB.load();
}).then(() => {
  return CASH_DB.find();
}).then((docs) => {
  console.log(docs);
  // Check Data
  if (!docs.length) throw new Error(READ_ERROR.cash.id);
  console.log('bbb');
  if (!docs[0][CASH_DATA.columnCode()]) throw new Error(READ_ERROR.cash.id);
  console.log('ccc');
  // Set Data
  CASH.id = docs[0][CASH_DATA.columnID()];
  CASH.code = docs[0][CASH_DATA.columnCode()];
  CASH.name = docs[0][CASH_DATA.columnName()];
  CASH.subCode = docs[0][CASH_DATA.columnSubCode()];
  CASH.subName = docs[0][CASH_DATA.columnSubName()];
  // Next
  return true;
}).then(() => {
  return NOTHING_DB.load();
}).then(() => {
  return NOTHING_DB.find();
}).then((docs) => {
  // Check Data
  if (!docs.length) throw new Error(READ_ERROR.nothing.id);
  if (!docs[0][NOTHING_DATA.columnCode()]) throw new Error(READ_ERROR.nothing.id);
  // Set Data
  NOTHING.id = docs[0][NOTHING_DATA.columnID()];
  NOTHING.code = docs[0][NOTHING_DATA.columnCode()];
  NOTHING.name = docs[0][NOTHING_DATA.columnName()];
  NOTHING.subCode = docs[0][NOTHING_DATA.columnSubCode()];
  NOTHING.subName = docs[0][NOTHING_DATA.columnSubName()];
  NOTHING.tag = docs[0][NOTHING_DATA.columnTag()];
  // Next
  return true;
}).then(() => {
  return CASHBOOK_DB.load();
}).then(() => {
  return CASHBOOK_DB.find();
}).then((docs) => {
  // Check Data
  if (!docs.length) throw new Error(READ_ERROR.cashbook.id);
  if (!docs[0][NOTHING_DATA.columnCode()]) throw new Error(READ_ERROR.cashbook.id);
  // Set Data
  CASHBOOK = new CASHBOOK_DATA(
      docs[0][CASHBOOK_DATA.columnID()],
      docs[0][CASHBOOK_DATA.columnDate()],
      docs[0][CASHBOOK_DATA.columnSubject()],
      docs[0][CASHBOOK_DATA.columnPayment()],
      docs[0][CASHBOOK_DATA.columnWithdrawal()],
      docs[0][CASHBOOK_DATA.columnSummary()]);
}).catch((error) => {
  console.log(error);
  console.log('aaa');
  switch (error) {
    case READ_ERROR.cash.id:
      DIALOG.showErrorBox(READ_ERROR.cash.title, READ_ERROR.cash.message);
      console.error(READ_ERROR.cash.error);
      break;
    case READ_ERROR.nothing.id:
      DIALOG.showErrorBox(READ_ERROR.nothing.title, READ_ERROR.nothing.message);
      console.error(READ_ERROR.nothing.error);
      break;
    case READ_ERROR.cashbook.id:
      DIALOG.showErrorBox(READ_ERROR.cashbook.title, READ_ERROR.cashbook.message);
      console.error(READ_ERROR.cashbook.error);
      break;
  }
});

document.getElementById('fileSelect').addEventListener('click', () => {
  // Open Dialog
  const win = REMOTE.getCurrentWindow();
  const options = {
    title: 'Excel選択',
    defaultPath: '.',
    filters: [
      {name: 'Excelブック (*.xlsx)', extensions: ['xlsx']},
    ],
    properties: ['openFile'],
  };
  DIALOG.showOpenDialog(win, options, (filePath) => {
    // Set File Path
    document.getElementById('filePath').value = filePath[0];
    // Set Book Information
    BOOK = XLSX.readFile(filePath[0]);
    // Create Select Sheet Options
    const select = document.getElementById('selectSheet');
    BOOK.SheetNames.forEach((sheetName) => {
      select.appendChild(PARTS.option(sheetName, null, sheetName));
    });
    select.disabled = false;
  });
});

document.getElementById('setSaveFilePath').addEventListener('click', () => {
  const win = REMOTE.getCurrentWindow();
  const options = {
    title: '保存場所指定',
    filters: [
      {name: 'CSVファイル (*.csv)', extensions: ['csv']},
      {name: 'テキストファイル (*.txt)', extensions: ['txt']},
    ],
  };
  DIALOG.showSaveDialog(win, options, (saveFilePath) => {
    SAVE_PTHA = saveFilePath;
    document.getElementById('saveFilePath').value = saveFilePath;
  });
});

document.getElementById('convert').addEventListener('click', () => {
  if (checkSetInfo()) return;
  const result = checkCashbookData();
  result.error.length ?
    showErrorMessage(result.error) :
    outputCsvFile(result.success);
});

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_convert_cashbook');
});

/**
 * Check Set Infomation
 * @return {Boolean} Information Set Error
 */
const checkSetInfo = () => {
  console.log('create message');
  let message = '';
  if (!document.getElementById('filePath').value) {
    message += '* 「EXCELファイル」の指定が有りません。';
    message += '\n';
  }
  if (!document.getElementById('selectSheet').value) {
    message += '* 「対象シート」の指定が有りません。';
    message += '\n';
  }
  if (!document.getElementById('saveFilePath').value) {
    message += '* 「ファイル保存先」の指定が有りません。';
    message += '\n';
  }
  console.log('message : ' + message);
  if (!message) return false;

  const win = REMOTE.getCurrentWindow();
  const options = {
    type: 'warning',
    buttons: ['OK'],
    title: 'ファイル指定エラー',
    message: '以下の情報が指定されていない為、ファイル出力ができません。',
    detail: message,
  };
  DIALOG.showMessageBox(win, options);

  return true;
};

/**
 * Check Cashbook Data (EXCEL)
 * @return {Object} Success Information AND Error Information
 */
const checkCashbookData = () => {
  const term = document.getElementById('term').checked;
  const startDate = DATE.strToDate(document.getElementById('start').value);
  const endDate = DATE.strToDate(document.getElementById('end').value);
  const sheet = document.getElementById('selectSheet').value;
  const worksheet = BOOK.Sheets[sheet];
  const row = XLSX.utils.sheet_to_json(worksheet);
  const success = [];
  const error = [];
  // Check Excel Data (Cashbook Data)
  for (let i = 0; i < row.length; i++) {
    // Check Empty Row
    if (
      !row[i][CASHBOOK.date] &&
      !row[i][CASHBOOK.subject] &&
      !row[i][CASHBOOK.payment] &&
      !row[i][CASHBOOK.withdrawal] &&
      !row[i][CASHBOOK.summary]) {
      continue;
    }
    // Check Date Range
    if (term) {
      const writeDate = new Date(0, 0, row[i][CASHBOOK.date] - 1);
      if (startDate) {
        if (writeDate < startDate) continue;
      }
      if (endDate) {
        if (writeDate > endDate) continue;
      }
    }
    // Check Required
    if (!row[i][CASHBOOK.date]) {
      error.push(row[i]);
      continue;
    }
    if (!row[i][CASHBOOK.payment] && !row[i][CASHBOOK.withdrawal]) {
      error.push(row[i]);
      continue;
    }
    if (row[i][CASHBOOK.payment] && row[i][CASHBOOK.withdrawal]) {
      error.push(row[i]);
      continue;
    }
    // OK
    success.push(searchSubjectCode(row[i]));
  }
  return {success: success, error: error};
};

/**
 * Show Error Message
 * @param {Array} error
 */
const showErrorMessage = (error) => {
  const win = REMOTE.getCurrentWindow();
  let message = '';
  error.forEach((value, index) => {
    // Row
    message += '[行数] ' + value['__rowNum__'] + ' ';
    // Date
    message += '[' + CASHBOOK.date + '] ';
    message += (value[CASHBOOK.date] ?
                 DATE.yPmPd(new Date(0, 0, value[CASHBOOK.date] - 1)) : '');
    message += ' ';
    // Subject
    message += '[' + CASHBOOK.subject + '] ';
    message += (value[CASHBOOK.subject] ? value[CASHBOOK.subject] : '');
    message += ' ';
    // Payment
    message += '[' + CASHBOOK.payment + '] ';
    message += (value[CASHBOOK.payment] ? value[CASHBOOK.payment] : '');
    message += ' ';
    // Withdrawal
    message += '[' + CASHBOOK.withdrawal + '] ';
    message += (value[CASHBOOK.withdrawal] ? value[CASHBOOK.withdrawal] : '');
    message += ' ';
    // Summary
    message += '[' + CASHBOOK.summary + '] ';
    message += (value[CASHBOOK.summary] ? value[CASHBOOK.summary] : '');
    message += ' ';
    // End
    message += '\n';
  });
  const options = {
    type: 'warning',
    buttons: ['OK'],
    title: '出納帳記載エラー',
    message: '出納帳の記載に誤りがあります。',
    detail: message,
  };
  DIALOG.showMessageBox(win, options);
};

/**
 * Output CSV FILE
 * @param {Object} success
 */
const outputCsvFile = (success) => {
  Promise.all(success).then((cashbookInfo) => {
    let writeData = CSV.outputTitle() + '\n';
    cashbookInfo.forEach((row, index) => {
      const csvData = new CSV();
      // No.
      csvData.slipNumber = index + 1;
      // Tag
      csvData.tag = row[CASHBOOK.tag];
      // Date
      csvData.slipDate
            = DATE.ymd(new Date(0, 0, row[CASHBOOK.date] - 1));
      // Check 'Payment' or 'Withdrawal'
      if (row[CASHBOOK.payment]) {
        // Payment
        csvData.drNumber = CASH.code;
        csvData.subDrNumber = CASH.subCode;
        csvData.drMoney = row[CASHBOOK.payment];
        csvData.crNumber = row[CASHBOOK.code];
        csvData.subCrNumber = row[CASHBOOK.subCode];
        csvData.crMoney = row[CASHBOOK.payment];
      } else {
        // Withdrawal
        csvData.drNumber = row[CASHBOOK.code];
        csvData.subDrNumber = row[CASHBOOK.subCode];
        csvData.drMoney = row[CASHBOOK.withdrawal];
        csvData.crNumber = CASH.code;
        csvData.subCrNumber = CASH.subCode;
        csvData.crMoney = row[CASHBOOK.withdrawal];
      }
      // Summary
      csvData.summary = row[CASHBOOK.summary];
      // Input Date
      csvData.inputDate = DATE.ymd();
      // Push Write Data
      writeData += CONVERSION.toHalfWidth(csvData.outputData()) + '\n';
    });
    // Write
    const csvFile = new FILE(SAVE_PTHA, writeData);
    csvFile.write(FILE.shiftJIS());
  });
};

/**
 * Search Subject Code
 * @param {Object} data Cashbook Infomation
 * @return {Object} Add Subject Code
 */
const searchSubjectCode = (data) => {
  DATA.name = data[CASHBOOK.subject];
  return SUBJECT_DB.find(DATA.findName()).then((docs) => {
    if (docs.length) {
      data[CASHBOOK.code] = docs[0][SUBJECT_DATA.columnCode()];
    } else {
      data[CASHBOOK.code] = NOTHING.code;
      data[CASHBOOK.tag] = NOTHING.tag;
    }
    return data;
  }).catch((error) => console.error(error));
};
