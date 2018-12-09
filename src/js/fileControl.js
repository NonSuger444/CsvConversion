'use strict';

const FS = require('fs');
const ICONV = require('iconv-lite');

const ENCODE = {
  shiftJIS: 'Shift_JIS',
};

module.exports = class FileControl {
  /**
   * Constructor
   * @param {String} path File Path
   * @param {String} data Data
   */
  constructor(
      path = null,
      data = null
  ) {
    this.path = path;
    this.data = data;
  }

  /**
   * Path
   * @param {String} path
   * Set 'File Path'
   */
  set path(path) {
    this._path = path;
  }

  /**
   * Path
   * Get 'File Path'
   */
  get paht() {
    return this._path;
  }

  /**
   * Data
   * @param {String} data
   * Set 'Data'
   */
  set data(data) {
    this._data = data;
  }

  /**
   * Data
   * Get 'Data'
   */
  get data() {
    return this._data;
  }

  /**
   * Encode : Shift-JIS
   * @return {String} Shift-JIS
   */
  static shiftJIS() {
    return ENCODE.shiftJIS;
  }

  /**
   * File Write
   * @param {String} encode Encode Type
   */
  write(encode = null) {
    let write;
    encode ?
      write = this.encode(encode) :
      write = this._data;
    FS.writeFile(this._path, write, (error) => {
      if (error) console.error(error);
    });
  }

  /**
   * Encode
   * @param {String} encode  Encode Type
   * @return {String} Encode Data
   */
  encode(encode) {
    return ICONV.encode(this._data, encode);
  }
};
