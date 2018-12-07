
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

// File
const FS = require('fs');
const ICONV = require('iconv-lite');

// Initialize
SUBJECT_DB.load()
    .catch((error) => console.error(error));
SUB_SUBJECT_DB.load()
    .catch((error) => console.error(error));
CASH_DB.load()
    .then(() => {
      return CASH_DB.find();
    })
    .then((docs) => {
      // Set Data
      if (docs.length) {
        CASH.id = docs[0][CASH_DATA.columnID()];
        CASH.code = docs[0][CASH_DATA.columnCode()];
        CASH.name = docs[0][CASH_DATA.columnName()];
        CASH.subCode = docs[0][CASH_DATA.columnSubCode()];
        CASH.subName = docs[0][CASH_DATA.columnSubName()];
      }
    })
    .catch((error) => console.error(error));
NOTHING_DB.load()
    .then(() => {
      return NOTHING_DB.find();
    })
    .then((docs) => {
      // Set Data
      if (docs.length) {
        NOTHING.id = docs[0][NOTHING_DATA.columnID()];
        NOTHING.code = docs[0][NOTHING_DATA.columnCode()];
        NOTHING.name = docs[0][NOTHING_DATA.columnName()];
        NOTHING.subCode = docs[0][NOTHING_DATA.columnSubCode()];
        NOTHING.subName = docs[0][NOTHING_DATA.columnSubName()];
        NOTHING.tag = docs[0][NOTHING_DATA.columnTag()];
      }
    })
    .catch((error) => console.error(error));
CASHBOOK_DB.load()
    .then(() => {
      return CASHBOOK_DB.find();
    })
    .then((docs) => {
      // Set Data
      if (docs.length) {
        CASHBOOK = new CASHBOOK_DATA(
            docs[0][CASHBOOK_DATA.columnID()],
            docs[0][CASHBOOK_DATA.columnDate()],
            docs[0][CASHBOOK_DATA.columnSubject()],
            docs[0][CASHBOOK_DATA.columnPayment()],
            docs[0][CASHBOOK_DATA.columnWithdrawal()],
            docs[0][CASHBOOK_DATA.columnSummary()]);
      }
    })
    .catch((error) => console.error(error));

// FileSelect Button Event
document.getElementById('fileSelect').addEventListener('click', () => {
  // Open Dialog
  const win = REMOTE.getCurrentWindow();
  const options = {
    title: 'Excel選択',
    defaultPath: '.',
    filters: [
      {name: 'Excel ブック (*.xlsx)', extensions: ['xlsx']},
    ],
    properties: ['openFile'],
  };
  DIALOG.showOpenDialog(win, options, (filePath) => {
    // Show File Path
    document.getElementById('filePath').innerHTML = filePath;
    // Create Select Sheet
    BOOK = XLSX.readFile(filePath[0]);
    document.getElementById('selectSheetArea')
        .appendChild(PARTS.select('selectSheet'));
    BOOK.SheetNames.forEach((sheetName) => {
      document.getElementById('selectSheet')
          .appendChild(PARTS.option(sheetName, null, sheetName));
    });
    // CSV Convert Button
    document.getElementById('convertArea')
        .appendChild(PARTS.button(
            'convert', 'button', 'convert', null, null, 'convert'));
    // CSV Convert Event
    document.getElementById('convert')
        .addEventListener('click', () => getExcel());
  });
});

/**
 * Get Excel !!
 */
function getExcel() {
  const sheet = document.forms.inputForm.selectSheet.value;
  const worksheet = BOOK.Sheets[sheet];
  const row = XLSX.utils.sheet_to_json(worksheet);
  const success = [];
  const error = [];
  const task = [];
  // Check Excel Data
  for (let i = 0; i < row.length; i++) {
    // Required
    if (
      !row[i][CASHBOOK.date] &&
      !row[i][CASHBOOK.subject] &&
      !row[i][CASHBOOK.payment] &&
      !row[i][CASHBOOK.withdrawal] &&
      !row[i][CASHBOOK.summary]) {
      continue;
    } else if (
      !row[i][CASHBOOK.date]) {
      error.push(row[i]);
      continue;
    } else if (
      !row[i][CASHBOOK.payment] &&
      !row[i][CASHBOOK.withdrawal]) {
      error.push(row[i]);
      continue;
    } else if (
      row[i][CASHBOOK.payment] &&
      row[i][CASHBOOK.withdrawal]) {
      error.push(row[i]);
      continue;
    }
    // OK
    task.push(searchSubjectCode(row[i]));
    success.push(row[i]);
  }
  Promise.all(task)
      .then((values) => {
        console.log(values);
        console.log('aaa');
      });
  if (error.length) {
    let info = '';
    error.forEach((value, index) => {
      // Row
      info += '[行数] ' + value['__rowNum__'] + ' ';
      // Date
      info += '[' + CASHBOOK.date + '] ';
      info += (value[CASHBOOK.date] ?
                 formatDate(new Date(0, 0, value[CASHBOOK.date] - 1)) : '');
      info += ' ';
      // Subject
      info += '[' + CASHBOOK.subject + '] ';
      info += (value[CASHBOOK.subject] ? value[CASHBOOK.subject] : '');
      info += ' ';
      // Payment
      info += '[' + CASHBOOK.payment + '] ';
      info += (value[CASHBOOK.payment] ? value[CASHBOOK.payment] : '');
      info += ' ';
      // Withdrawal
      info += '[' + CASHBOOK.withdrawal + '] ';
      info += (value[CASHBOOK.withdrawal] ? value[CASHBOOK.withdrawal] : '');
      info += ' ';
      // Summary
      info += '[' + CASHBOOK.summary + '] ';
      info += (value[CASHBOOK.summary] ? value[CASHBOOK.summary] : '');
      info += ' ';
      // End
      info += '\n';
    });
    const win = REMOTE.getCurrentWindow();
    const options = {
      type: 'warning',
      buttons: ['OK'],
      title: '出納帳記載エラー',
      message: '出納帳の記載に誤りがあります。',
      detail: info,
    };
    DIALOG.showMessageBox(win, options);
  } else {
    const writeData = CSV.outputTitle() + '\n';
    console.log(writeData);
    // success.forEach((value, index) => {
    //   console.log(index + '回目');
    //   if (value[CASHBOOK.subject]) {
    //     console.log('科目有 : ' + value[CASHBOOK.subject]);
    //     DATA.name = value[CASHBOOK.subject];
    //     console.log(DATA.findName());
    //     SUBJECT_DB.find(DATA.findName())
    //         .then((docs) => {
    //           if (docs.length) {
    //             writeData += index + ' : ' + docs[0][SUBJECT_DATA.columnCode()] + '\n';
    //             console.log('科目コード:' + docs[0][SUBJECT_DATA.columnCode()]);
    //           } else {
    //             writeData += index + ' : 対象科目無し' + '\n';
    //             console.log('対象名称無し');
    //           }
    //         })
    //         .catch((error) => console.error(error));
    //   } else {
    //     console.log('科目無');
    //   }
    //   // const csvData = new CSV();
    //   // // No.
    //   // csvData.slipNumber = index + 1;
    //   // // Date
    //   // csvData.slipDate
    //   //   = formatDateYMD(new Date(0, 0, value[CASHBOOK.date] - 1));
    //   // // Check 'Payment' or 'Withdrawal'
    //   // if (value[CASHBOOK.payment]) {
    //   //   // Payment - Subject
    //   // } else {
    //   //   // Withdrawal
    //   // }
    //   // console.log(index);
    //   // console.log(csvData.outputData());
    // });
    // console.log(writeData);
    // FS.writeFileSync('C:/Users/fujimoto04/Desktop/output.txt', '');
    // const fd = FS.openSync('C:/Users/fujimoto04/Desktop/output.txt', 'w');
    // const sample = 'ファイル内容が更新される？';
    // const buf = ICONV.encode(sample, 'Shift_JIS');
    // FS.write(fd, buf, 0, buf.length, function(err, written, buffer) {
    //   if (err) console.error(err);
    // });
  }
}

/**
 * Search Subject Code
 */
function searchSubjectCode(cashbook) {
  DATA.name = cashbook[CASHBOOK.subject];
  return SUBJECT_DB.find(DATA.findName())
      .then((docs) => {
        cashbook['code'] = docs[0][SUBJECT_DATA.columnCode()];
        return cashbook;
      });
}

/**
 * Create Date format 'yyyymmdd'
 * @param {Date} dt date
 * @return {Number} yyyymmdd is number
 */
function formatDateYMD(dt = new Date()) {
  const y = dt.getFullYear();
  const m = ('00' + (dt.getMonth() + 1)).slice(-2);
  const d = ('00' + dt.getDate()).slice(-2);
  return Number(y + m + d);
}

/**
 * Create Date format 'yyyy/mm/dd'
 * @param {Date} dt date
 * @return {String} yyyy/mm/dd
 */
function formatDate(dt = new Date()) {
  const y = dt.getFullYear();
  const m = ('00' + (dt.getMonth() + 1)).slice(-2);
  const d = ('00' + dt.getDate()).slice(-2);
  return y + '/' + m + '/' + d;
}

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_convert_cashbook');
});
