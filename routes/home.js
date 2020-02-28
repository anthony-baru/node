const express = require('express');
const router = express.Router();
//home 
router.get('/', (req, res) => {
    // res.send('Hello Worldd');
    res.render('index', { title: 'My Express App', message: 'Hello' })
});
module.exports = router;