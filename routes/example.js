'use strict';

import example from '../controllers/example.js';
import express from 'express';
const router = express.Router();

router.get('/example', example);

module.exports = router