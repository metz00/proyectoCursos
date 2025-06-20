const express = require('express');
const router = express.Router();

const localAuth = require('./local');

router.use('/local', localAuth);

module.exports = router;
