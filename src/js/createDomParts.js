'use strict';

const dom = {};

/**
 * Create Input Element
 * @param {String} type Input Type
 * @param {String} name Input Name
 * @param {String} className Input Class Name
 * @param {String} value Input Value
 * @param {Boolean} readonly Input Readonly Flag
 * @return {Element} Input Element
 */
dom.input = function(
    type = 'text',
    name = null,
    className = null,
    value = null,
    readonly = false) {
  const input = document.createElement('input');
  input.type = type;
  if (name) input.name = name;
  if (className) input.className = className;
  if (value) input.value = value;
  if (readonly) input.readOnly = readonly;
  return input;
};

/**
 * Create Button Element
 * @param {String} id Button ID
 * @param {String} type Button Type
 * @param {String} name Button Name
 * @param {String} className Button Class Name
 * @param {String} value Button Value
 * @param {String} text Button Text
 * @return {Any} Button Element
 */
dom.button = function(
    id = null,
    type = 'button',
    name = null,
    className = null,
    value = null,
    text = null) {
  const button = document.createElement('button');
  if (id) button.id = id;
  button.type = type;
  if (name) button.name = name;
  if (className) button.className = className;
  if (value) button.value = value;
  if (text) button.innerHTML = text;
  return button;
};

/**
 * Create Select
 * @param {String} id Select ID
 * @return {Element} Select Element
 */
dom.select = function(id = null) {
  const select = document.createElement('select');
  if (id) select.id = id;
  return select;
};

/**
 * Create Option
 * @param {String} value Option Value
 * @param {String} className Option Class Name
 * @param {String} text Option Text
 * @return {Element} Option Element
 */
dom.option = function(
    value = null,
    className = null,
    text = null) {
  const option = document.createElement('option');
  if (value) option.value = value;
  if (className) option.className = className;
  if (text) option.innerHTML = text;
  return option;
};

module.exports = dom;
