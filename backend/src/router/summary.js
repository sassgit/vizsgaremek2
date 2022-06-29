const express = require('express');
const controller = require('../controller/summary');

const router = express.Router();

router.get('/', async (req, res, next) => controller.summary(req, res, next));

module.exports = router;