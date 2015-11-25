'use strict';

const stampit = require('stampit');
const debug = require('debug')('buspirate:buspirate');
const SerialPort = require('serialport').SerialPort;
const EventEmittable = require('./eventemittable');
const Promise = require('bluebird');

const BusPirate = stampit({
  refs: {
    baud: 115200
  },
  init() {
    const port = this.port = new SerialPort(this.device, this.baud);
    debug('Initializing port...');

    return new Promise((resolve, reject) => {
      port.on('open', resolve)
        .on('error', reject);
    })
      .tap(() => {
        debug('Port initialized');
        this.emit('ready', port);
      })
      .return(this);
  }
})
  .compose(EventEmittable);

module.exports = BusPirate;
