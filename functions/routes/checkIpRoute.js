const express = require('express');
const checkIpController = require('../controllers/checkIpController');
const router = express.Router();

router.post('/', checkIpController);

module.exports = router;