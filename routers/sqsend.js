var express = require('express')
var mysql = require('mysql')
var dbconfig = require('../db/config.js')
const connection = mysql.createConnection(dbconfig);
var router = express.Router();

router.get('/',(req, res) => {
    res.send('/sqsend');
})
router.get('/getsend',(req, res) => {
    res.send({'url':'/sqsend/getsend'});
})

router.get('/awssql', (req, res) => {
    connection.query('SELECT * FROM react_suppose', 
      (error, rows) => {
        if (error) throw error;
        console.log('해당스키마안의 테이블내용: ', rows);
        res.send(rows);
      });
})

module.exports = router;