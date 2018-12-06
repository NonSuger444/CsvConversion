'use strict';

const COLUMN = {
  id: '_id',
  date: 'date',
  subject: 'subject',
  payment: 'payment',
  withdrawal: 'withdrawal',
  summary: 'summary',
};

/**
 * Nothing Infomation Data
 */
module.exports = class CashbookInfoData {
  /**
   * Constructor
   * @param {String} id ID
   * @param {String} date Date
   * @param {String} subject Subject
   * @param {String} payment Payment
   * @param {String} withdrawal Withdrawal
   * @param {String} summary Summary
   */
  constructor(
      id = null,
      date = null,
      subject = null,
      payment = null,
      withdrawal = null,
      summary = null) {
    this.id = id;
    this.date = date;
    this.subject = subject;
    this.payment = payment;
    this.withdrawal = withdrawal;
    this.summary = summary;
  }

  /**
   * ID
   * @param {String} id
   * Set 'ID'
   */
  set id(id) {
    this._id = id;
  }

  /**
   * ID
   * Get 'ID'
   */
  get id() {
    return this._id;
  }

  /**
   * Date
   * @param {String} date
   * Set 'Date'
   */
  set date(date) {
    this._date = date;
  }

  /**
   * Date
   * Get 'Date'
   */
  get date() {
    return this._date;
  }

  /**
   * Subject
   * @param {String} subject
   * Set 'Subject'
   */
  set subject(subject) {
    this._subject = subject;
  }

  /**
   * Subject
   * Get 'Subject'
   */
  get subject() {
    return this._subject;
  }

  /**
   * Payment
   * @param {String} payment
   * Set 'Payment'
   */
  set payment(payment) {
    this._payment = payment;
  }

  /**
   * Payment
   * Get 'Payment'
   */
  get payment() {
    return this._payment;
  }

  /**
   * Withdrawal
   * @param {String} withdrawal
   * Set 'Withdrawal'
   */
  set withdrawal(withdrawal) {
    this._withdrawal = withdrawal;
  }

  /**
   * Withdrawal
   * Get 'Withdrawal'
   */
  get withdrawal() {
    return this._withdrawal;
  }

  /**
   * Summary
   * @param {String} summary
   * Set 'Summary'
   */
  set summary(summary) {
    this._summary = summary;
  }

  /**
   * Summary
   * Get 'Summary'
   */
  get summary() {
    return this._summary;
  }

  /**
   * CashInfo DB - Column ID
   * @return {String} Column ID
   */
  static columnID() {
    return COLUMN.id;
  }

  /**
   * CashInfo DB - Column DATE
   * @return {String} Column DATE
   */
  static columnDate() {
    return COLUMN.date;
  }

  /**
   * CashInfo DB - Column SUBJECT
   * @return {String} Column SUBJECT
   */
  static columnSubject() {
    return COLUMN.subject;
  }

  /**
   * CashInfo DB - Column PAYMENT
   * @return {String} Column PAYMENT
   */
  static columnPayment() {
    return COLUMN.payment;
  }

  /**
   * CashInfo DB - Column WITHDRAWAL
   * @return {String} Column WITHDRAWAL
   */
  static columnWithdrawal() {
    return COLUMN.withdrawal;
  }

  /**
   * CashInfo DB - Column SUMMARY
   * @return {String} Column SUMMARY
   */
  static columnSummary() {
    return COLUMN.summary;
  }

  /**
   * Find ID
   * @return {Object} Find Info
   */
  findId() {
    return {_id: this._id};
  }

  /**
   * Update ALL
   * @return {Object} Update Info
   */
  updateAll() {
    return {$set: this.dbData()};
  }

  /**
   * Database 科目無し情報
   * @return {Object} Database Info
   */
  dbData() {
    return {
      date: this._date,
      subject: this._subject,
      payment: this._payment,
      withdrawal: this._withdrawal,
      summary: this._summary};
  }
};
