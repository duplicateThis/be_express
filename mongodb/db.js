'use strict';

import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/data_a');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.once('connected', () => {
  console.log('MongoDB connected success.')
})
db.on('error', () => {
  console.log('MongoDB connected fail.')
})
db.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})

module.exports = db
