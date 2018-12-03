'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;
const REMOTE = require('electron').remote;
const DIALOG = REMOTE.dialog;

// Excel
const XLSX = require('xlsx');
let book;

// CSV
const CsvData = require('./js/createCsv');

// FileSelect Button Event
document.getElementById('fileSelect').addEventListener('click', () => {
  DIALOG.showOpenDialog(null, {
    properties: ['openFile'],
    title: 'ファイル(単独選択)',
    defaultPath: '.',
    filters: [
      {name: 'エクセルファイル', extensions: ['xlsx']},
    ],
  }, (filePath) => {
    // 選択したファイルパスを表示
    document.getElementById('filePath').innerHTML = filePath;
    // シート名を選択
    book = XLSX.readFile(filePath[0]);
    const df = document.createDocumentFragment();
    const p1 = document.createElement('p');
    const select = document.createElement('select');
    select.id = 'sheet';
    book.SheetNames.forEach((sheetName) => {
      const option = document.createElement('option');
      option.value = sheetName;
      option.innerHTML = sheetName;
      select.appendChild(option);
    });
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'sheetSelect';
    button.name = 'sheetSelect';
    button.innerHTML = 'Sheet Select';
    p1.appendChild(select);
    p1.appendChild(button);
    df.appendChild(p1);
    document.getElementById('inputForm').appendChild(df);
    // Event Add
    button.addEventListener('click', getExcelInfo);
  });
});

/**
 * Getting Excel Info!!
 */
function getExcelInfo() {
  const sheet = document.forms.inputForm.sheet.value;
  const worksheet = book.Sheets[sheet];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  jsonData.forEach((row) => {
    for (const key in row) {
      if (!row.hasOwnProperty(key)) continue;
      const data = new CsvData();
      // Check Double Flag
      // let doubleFlag = false;
      // if (row['入金'] && row['支払']) doubleFlag = true;
      // Check Payment
      if (row['入金']) {
        data.monthType = 0;
        data.type = 0;
        data.format = 4;
        data.make = 0;
        data.tag = 0;
        data.slipDate = formatDateYMD(new Date(0, 0, row['日付']-1));
        data.slipNumber = 1;
        data.branchNumber = 1;
        data.drNumber = 100;
        data.drMoney = row['入金'];
        data.crSubject = row['科目'];
        data.crMoney = row['入金'];
        data.summary = row['内容'];
        data.inputDate = formatDateYMD();
      }
      // Check Withdrawal
      if (row['支払']) {
      }
      console.log(data.outputCsvData);
    }
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

// Push SetSubject Event
document.getElementById('setSubject').addEventListener('click', () => {
  IPC_RENDERER.send('open_subject');
});

// Push Settings Event
document.getElementById('settings').addEventListener('click', () => {
  IPC_RENDERER.send('open_settings');
});
