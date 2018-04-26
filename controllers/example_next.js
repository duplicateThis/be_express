'use strict';

import Name from '../models/example.js';

module.exports = (req, res, next) => {
	let a = 1;
	console.log(a);
	next()
} 