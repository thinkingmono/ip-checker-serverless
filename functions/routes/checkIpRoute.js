const express = require('express');
const checkIpController = require('../controllers/checkIpController');
const router = express.Router();

router.post('/check', checkIpController);

module.exports = router;