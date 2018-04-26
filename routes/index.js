'use strict';

import example from '../controllers/example.js';
import example_son from '../controllers/example_son.js';
import example_next from '../controllers/example_next.js';

module.exports = function (app) {
	app.get('/example', example);
	app.get('/son', example_son.son);
	app.get('/next', example_next, example);
}