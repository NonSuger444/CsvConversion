
'use strict';

/**
 * Operation Database
 */
module.exports = class OperationDB {
  /**
   * Constructor
   * @param {String} name Database Name
   */
  constructor(name) {
    const Datastore = require('nedb');
    this.db = new Datastore({
      filename: name,
      timestampData: true,
    });
    this.name = name;
  }

  /**
   * Load Database
   * @return {String} Load Result
   */
  load() {
    return new Promise((resolve, reject) => {
      this.db.loadDatabase((error) => {
        error !== null ? reject(error) : resolve('load database completed!!');
      });
    });
  }

  /**
   * Data Count
   * @param {Object} query Query
   * @return {Any} Number of documents
   */
  dataCount(query = {}) {
    return new Promise((resolve, reject) => {
      this.db.count(query, (error, numOfDocs) => {
        error !== null ? reject(error) : resolve(numOfDocs);
      });
    });
  }

  /**
   * Data Insert
   * @param {Object} data Insert Data
   * @return {Any} Insert Result
   */
  insert(data) {
    return new Promise((resolve, reject) => {
      this.db.insert(data, (error, docs) => {
        error !== null ? reject(error) : resolve(docs);
      });
    });
  }

  /**
   * Data Sort
   * @param {Object} findQuery Find Query
   * @param {Object} sortQuery Sort Ouery
   * @return {Any} Sort Result
   */
  sort(findQuery = {}, sortQuery = {}) {
    return new Promise((resolve, reject) => {
      this.db.find(findQuery).sort(sortQuery).exec((error, docs) => {
        error !== null ? reject(error) : resolve(docs);
      });
    });
  }

  /**
   * Data Find
   * @param {Object} query Query
   * @return {Any} Find Result
   */
  find(query = {}) {
    return new Promise((resolve, reject) => {
      this.db.find(query, (error, docs) => {
        error !== null ? reject(error) : resolve(docs);
      });
    });
  }

  /**
   * Data Destroy
   * @param {Object} query Query
   * @param {Object} options Destroy Option
   * @return {Any} Destroy Count
   */
  destroy(query = {}, options = {}) {
    return new Promise((resolve, reject) => {
      this.db.remove(query, options, (error, numOfDocs) => {
        error !== null ? reject(error) : resolve(numOfDocs);
      });
    });
  }

  /**
   * Data Update
   * @param {Object} query Query
   * @param {Object} update Update Data
   * @param {Object} options Update Option
   * @return {Any} Update Count
   */
  update(query = {}, update = {}, options = {}) {
    return new Promise((resolve, reject) => {
      this.db.update(query, update, options, (error, numOfDocs) => {
        error !== null ? reject(error) : resolve(numOfDocs);
      });
    });
  }
};
