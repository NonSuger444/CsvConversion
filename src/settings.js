'use strict';

// Electron
const IPC_RENDERER = require('electron').ipcRenderer;

// Tag Info
const TAG = {
  tag0: {text: '無', value: null, className: 'tagNothing'},
  tag1: {text: '縦:1', value: 1, className: 'tagRed'},
  tag2: {text: '縦:2', value: 2, className: 'tagBlue'},
  tag3: {text: '縦:3', value: 3, className: 'tagYellow'},
  tag4: {text: '縦:4', value: 4, className: 'tagGreen'},
  tag5: {text: '縦:5', value: 5, className: 'tagPink'},
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

document.getElementById('close').addEventListener('click', (event) => {
  IPC_RENDERER.send('close_settings');
});

selection();
/**
 * Create Select
 * @param {String} selectID Select ID
 * @param {Object} optionInfo Option Info
 * @return {Element} Select Element
 */
function createSelect(selectID = null, optionInfo) {
  const df = document.createDocumentFragment();
  const select = document.createElement('select');
  if (selectID) select.id = selectID;
  for (const key in optionInfo) {
    if (!optionInfo.hasOwnProperty(key)) continue;
    const option = document.createElement('option');
    if (optionInfo[key].value) option.value = optionInfo[key].value;
    if (optionInfo[key].className) option.className = optionInfo[key].className;
    if (optionInfo[key].text) option.innerHTML = optionInfo[key].text;
    select.appendChild(option);
  }
  df.appendChild(select);
  return df;
}
