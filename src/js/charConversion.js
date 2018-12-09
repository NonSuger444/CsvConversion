'use strict';

const widthKana = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ヰ', 'ユ', 'ヱ', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヲ', 'ン',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
  'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
  'ャ', 'ュ', 'ョ', 'ッ',
  '゛', '°', '、', '。', '「', '」', 'ー', '・',
];

const halfKana = [
  'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ',
  'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ',
  'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ',
  'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ',
  'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ',
  'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ',
  'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ',
  'ﾔ', 'ｲ', 'ﾕ', 'ｴ', 'ﾖ',
  'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ',
  'ﾜ', 'ｦ', 'ﾝ',
  'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ',
  'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ',
  'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ',
  'ﾊﾞ', 'ﾋﾞ', 'ﾌﾞ', 'ﾍﾞ', 'ﾎﾞ',
  'ﾊﾟ', 'ﾋﾟ', 'ﾌﾟ', 'ﾍﾟ', 'ﾎﾟ',
  'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ',
  'ｬ', 'ｭ', 'ｮ', 'ｯ',
  'ﾞ', 'ﾟ', '､', '｡', '｢', '｣', 'ｰ', '･',
];

const conversion = {};

/**
 * To Harf Width
 * @param {String} str Width
 * @return {String} Half
 */
conversion.toHalfWidth = function(str) {
  str = symbol(str);
  str = kana(str);
  return str;
};

/**
 * To Harf Width SYMBOL
 * @param {String} str Width
 * @return {String} Half
 */
conversion.toHalfWidthSymbol = function(str) {
  return symbol(str);
};

/**
 * To Harf Width KANA
 * @param {String} str Width
 * @return {String} Harf
 */
conversion.toHalfWidthKana = function(str) {
  return kana(str);
};

/**
 * To Harf Width SYMBOL
 * @param {String} str Width
 * @return {String} Half
 */
const symbol = function(str) {
  const half = str.replace(/[！-～]/g, (tmp) => {
    return String.fromCharCode(tmp.charCodeAt(0) - 0xFEE0);
  });
  return half.replace(/”/g, '"')
      .replace(/’/g, '\'')
      .replace(/‘/g, '`')
      .replace(/￥/g, '\\')
      .replace(/　/g, ' ')
      .replace(/〜/g, '~');
};

/**
 * To Harf Width KANA
 * @param {String} str Width
 * @return {String} Harf
 */
const kana = function(str) {
  let half = '';
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    const widthIndex = widthKana.indexOf(char);
    if (widthIndex >= 0) char = halfKana[widthIndex];
    half += char;
  }
  return half;
};

module.exports = conversion;
