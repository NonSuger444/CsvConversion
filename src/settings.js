'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

const PARTS = require('./js/createDomParts');

// Database
const DATABASE = require('./js/operationDb');
const CASH_DB = new DATABASE('./db/cashInfo.db');
const CASH_DATA = require('./js/cashInfoData');
const CASH = new CASH_DATA();
const NOTHING_DB = new DATABASE('./db/noSubjectInfo.db');
const NOTHING_DATA = require('./js/nothingInfoData');
const NOTHING = new NOTHING_DATA();
const CASHBOOK_DB = new DATABASE('./db/cashbookInfo.db');
const CASHBOOK_DATA = require('./js/cashbookInfoData');
const CASHBOOK = new CASHBOOK_DATA();

// Tag Info
const TAG = {
  tag0: {text: '無し', value: '0', className: 'tagNothing'},
  tag1: {text: '縦:1', value: '1', className: 'tagRed'},
  tag2: {text: '縦:2', value: '2', className: 'tagBlue'},
  tag3: {text: '縦:3', value: '3', className: 'tagYellow'},
  tag4: {text: '縦:4', value: '4', className: 'tagGreen'},
  tag5: {text: '縦:5', value: '5', className: 'tagPink'},
  tagA: {text: '横:1', value: 'A', className: 'tagRed'},
  tagB: {text: '横:2', value: 'B', className: 'tagBlue'},
  tagC: {text: '横:3', value: 'C', className: 'tagYellow'},
  tagD: {text: '横:4', value: 'D', className: 'tagGreen'},
  tagE: {text: '横:5', value: 'E', className: 'tagPink'},
};

// Settings Kind
const KIND = {
  cash: 'setCashSubject',
  nothing: 'setNothingSubject',
};

// Initialize
CASH_DB.load()
    .then(() => {
      return CASH_DB.find();
    })
    .then((docs) => {
      // Set Data
      if (docs.length) {
        CASH.id = docs[0][CASH_DATA.columnID()];
        document.getElementById('cashCode').value
                = docs[0][CASH_DATA.columnCode()];
        document.getElementById('cashName').value
                = docs[0][CASH_DATA.columnName()];
        document.getElementById('cashSubCode').value
                = docs[0][CASH_DATA.columnSubCode()];
        document.getElementById('cashSubName').value
                = docs[0][CASH_DATA.columnSubName()];
      }
    })
    .catch((error) => console.error(error));
NOTHING_DB.load()
    .then(() => {
      return NOTHING_DB.find();
    })
    .then((docs) => {
      // Set Tag Select
      for (const property in TAG) {
        if (!TAG.hasOwnProperty(property)) continue;
        document.getElementById('nothingTagInfo').appendChild(
            PARTS.option(
                TAG[property].value,
                TAG[property].className,
                TAG[property].text));
      }
      // Set Data
      if (docs.length) {
        NOTHING.id = docs[0][NOTHING_DATA.columnID()];
        document.getElementById('nothingCode').value
                   = docs[0][NOTHING_DATA.columnCode()];
        document.getElementById('nothingName').value
                   = docs[0][NOTHING_DATA.columnName()];
        document.getElementById('nothingSubCode').value
                   = docs[0][NOTHING_DATA.columnSubCode()];
        document.getElementById('nothingSubName').value
                   = docs[0][NOTHING_DATA.columnSubName()];
        // Select Tag Info
        const tagInfo = document.getElementById('nothingTagInfo').options;
        for (let i = 0; i < tagInfo.length; i++) {
          if (tagInfo[i].value === docs[0][NOTHING_DATA.columnTag()]) {
            tagInfo[i].selected = true;
            break;
          }
        }
        changeTagSelectBC();
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
        CASHBOOK.id = docs[0][CASHBOOK_DATA.columnID()];
        document.getElementById('cashbookDate').value
                    = docs[0][CASHBOOK_DATA.columnDate()];
        document.getElementById('cashbookSubject').value
                    = docs[0][CASHBOOK_DATA.columnSubject()];
        document.getElementById('cashbookPayment').value
                    = docs[0][CASHBOOK_DATA.columnPayment()];
        document.getElementById('cashbookWithdrawal').value
                    = docs[0][CASHBOOK_DATA.columnWithdrawal()];
        document.getElementById('cashbookSummary').value
                    = docs[0][CASHBOOK_DATA.columnSummary()];
      }
    })
    .catch((error) => console.error(error));


// IPC RENDERER
IPC_RENDERER.on('get_settings_info', (event, settingsInfo) => {
  switch (settingsInfo.kind) {
    case KIND.cash:
      document.getElementById('cashCode').value = settingsInfo.code;
      document.getElementById('cashName').value = settingsInfo.name;
      document.getElementById('cashSubCode').value = settingsInfo.subCode;
      document.getElementById('cashSubName').value = settingsInfo.subName;
      break;
    case KIND.nothing:
      document.getElementById('nothingCode').value = settingsInfo.code;
      document.getElementById('nothingName').value = settingsInfo.name;
      document.getElementById('nothingSubCode').value = settingsInfo.subCode;
      document.getElementById('nothingSubName').value = settingsInfo.subName;
      break;
  }
});

document.getElementById('cashSearch').addEventListener('click', (event) => {
  IPC_RENDERER.send('open_search_subject', KIND.cash);
});

document.getElementById('nothingSearch').addEventListener('click', (event) => {
  IPC_RENDERER.send('open_search_subject', KIND.nothing);
});

document.getElementById('cashbookInfo').onsubmit = () => {
  if (!document.forms.cashbookInfo.checkValidity()) return false;
  // Cash Info
  CASH.code = document.getElementById('cashCode').value;
  CASH.name = document.getElementById('cashName').value;
  CASH.subCode = document.getElementById('cashSubCode').value;
  CASH.subName = document.getElementById('cashSubName').value;
  if (CASH.id) {
    CASH_DB.update(CASH.findId(), CASH.updateAll())
        .catch((error) => console.error(error));
  } else {
    CASH_DB.insert(CASH.dbData())
        .catch((error) => console.error(error));
  }
  // Nothing Subject Info
  NOTHING.code = document.getElementById('nothingCode').value;
  NOTHING.name = document.getElementById('nothingName').value;
  NOTHING.subCode = document.getElementById('nothingSubCode').value;
  NOTHING.subName = document.getElementById('nothingSubName').value;
  NOTHING.tag = document.getElementById('nothingTagInfo').value;
  if (NOTHING.id) {
    NOTHING_DB.update(NOTHING.findId(), NOTHING.updateAll())
        .catch((error) => console.error(error));
  } else {
    NOTHING_DB.insert(NOTHING.dbData())
        .catch((error) => console.error(error));
  }
  // Cashbook Info
  CASHBOOK.date = document.getElementById('cashbookDate').value;
  CASHBOOK.subject = document.getElementById('cashbookSubject').value;
  CASHBOOK.payment = document.getElementById('cashbookPayment').value;
  CASHBOOK.withdrawal = document.getElementById('cashbookWithdrawal').value;
  CASHBOOK.summary = document.getElementById('cashbookSummary').value;
  if (CASHBOOK.id) {
    CASHBOOK_DB.update(CASHBOOK.findId(), CASHBOOK.updateAll())
        .catch((error) => console.error(error));
  } else {
    CASHBOOK_DB.insert(CASHBOOK.dbData())
        .catch((error) => console.error(error));
  }
  return true;
};

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_settings');
});

document.getElementById('nothingTagInfo').addEventListener('change', () => {
  changeTagSelectBC();
});

/**
 * Change TagSelect Background Color
 */
function changeTagSelectBC() {
  const tagInfo = document.getElementById('nothingTagInfo');
  switch (tagInfo.value) {
    case TAG.tag0.value:
      tagInfo.className = TAG.tag0.className;
      break;
    case TAG.tag1.value:
      tagInfo.className = TAG.tag1.className;
      break;
    case TAG.tag2.value:
      tagInfo.className = TAG.tag2.className;
      break;
    case TAG.tag3.value:
      tagInfo.className = TAG.tag3.className;
      break;
    case TAG.tag4.value:
      tagInfo.className = TAG.tag4.className;
      break;
    case TAG.tag5.value:
      tagInfo.className = TAG.tag5.className;
      break;
    case TAG.tagA.value:
      tagInfo.className = TAG.tagA.className;
      break;
    case TAG.tagB.value:
      tagInfo.className = TAG.tagB.className;
      break;
    case TAG.tagC.value:
      tagInfo.className = TAG.tagC.className;
      break;
    case TAG.tagD.value:
      tagInfo.className = TAG.tagD.className;
      break;
    case TAG.tagE.value:
      tagInfo.className = TAG.tagE.className;
      break;
  }
}
