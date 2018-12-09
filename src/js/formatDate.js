'use strict';

const moment = require('moment');

const formatDate = {};

/**
 * Create Date format 'yyyymmdd'
 * @param {Date} dt date
 * @return {String} yyyymmdd is number
 */
formatDate.ymd = function(dt = new Date()) {
  return moment(dt).format('YYYYMMDD');
};

/**
 * Create Date format 'yyyy/mm/dd'
 * @param {Date} dt date
 * @return {String} yyyy/mm/dd
 */
formatDate.yPmPd = function(dt = new Date()) {
  return moment(dt).format('YYYY/MM/DD');
};

/**
 * String to Date
 * @param {String} str date string
 * @return {Date} Date
 */
formatDate.strToDate = function(str = null) {
  let date;
  str ?
    date = moment(str).toDate() :
    date = null;
  return date;
};

module.exports = formatDate;
