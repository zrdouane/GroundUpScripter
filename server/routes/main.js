const express = require('express');
const router = express.Router();

/**
 * routes here
 */
router.get('/test', (req, res) => {
    res.send('Hello Zrdouane');
});

module.exports = router;