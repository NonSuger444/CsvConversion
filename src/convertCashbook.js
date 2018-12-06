
'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;
const REMOTE = require('electron').remote;
const DIALOG = REMOTE.dialog;

// Database
const DATABASE = require('./js/operationDb');
const CASHBOOK_DB = new DATABASE('./db/cashbookInfo.db');
const CASHBOOK_DATA = require('./js/cashbookInfoData');
let CASHBOOK;

// DOM
const PARTS = require('./js/createDomParts');

// Excel
const XLSX = require('xlsx');
let BOOK;

// CSV
const CsvData = require('./js/createCsv');

// Dialog
const EXCEL = {
  properties: ['openFile'],
  title: 'Excel選択',
  defaultPath: '.',
  filters: [{name: 'Excel ブック (*.xlsx)', extensions: ['xlsx']}],
};

// Initialize
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
  DIALOG.showOpenDialog(null, EXCEL, (filePath) => {
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
  for (let i = 0; i < row.length; i++) {
    // Check Required
    if (!row[i][CASHBOOK.date]) {
      console.log(row[i]);
      continue;
    }
    if (!row[i][CASHBOOK.payment] && !row[i][CASHBOOK.withdrawal]) {
      console.log(row[i]);
      continue;
    }
    if (row[i][CASHBOOK.payment] && row[i][CASHBOOK.withdrawal]) {
      console.log(row[i]);
      continue;
    }
  }
}

// /**
//  * Getting Excel Info!!
//  */
// function getExcelInfo() {
//   const sheet = document.forms.inputForm.sheet.value;
//   const worksheet = BOOK.Sheets[sheet];
//   const jsonData = XLSX.utils.sheet_to_json(worksheet);
//   jsonData.forEach((row) => {
//     for (const key in row) {
//       if (!row.hasOwnProperty(key)) continue;
//       const data = new CsvData();
//       // Check Double Flag
//       // let doubleFlag = false;
//       // if (row['入金'] && row['支払']) doubleFlag = true;
//       // Check Payment
//       if (row['入金']) {
//         data.monthType = 0;
//         data.type = 0;
//         data.format = 4;
//         data.make = 0;
//         data.tag = 0;
//         data.slipDate = formatDateYMD(new Date(0, 0, row['日付']-1));
//         data.slipNumber = 1;
//         data.branchNumber = 1;
//         data.drNumber = 100;
//         data.drMoney = row['入金'];
//         data.crSubject = row['科目'];
//         data.crMoney = row['入金'];
//         data.summary = row['内容'];
//         data.inputDate = formatDateYMD();
//       }
//       // Check Withdrawal
//       if (row['支払']) {
//       }
//       console.log(data.outputCsvData);
//     }
//   });
// }

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

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_convert_cashbook');
});
