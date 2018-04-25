'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const nameSchema = new Schema({
	//field
	"name": String
})

module.exports = mongoose.model('name', nameSchema)