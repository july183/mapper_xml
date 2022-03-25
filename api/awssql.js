var express = require('express')
var mysql = require('mysql')
var mymapper = require('mybatis-mapper')
var dbconfig = require('../db/config.js')

var router = express.Router();
var pool = mysql.createPool(dbconfig);
//mybatis 모듈가져와서 mapper정보받아서 query문 전달
router.use(express.json())//sqsend에서 넘어온 자바스크립트 데이터를 뭉쳐주는 역활을 한다.
mymapper.createMapper(['./mapper/introduseSql.xml']) //'../mapper/introduseSql.xml'->'./mapper/introduseSql.xml' 노드루트부터 경로 시작하기
// node의 main을 기준으로 경로계산해야함
var format = { language : 'sql', indent : '  '}


router.get('/', (req, res,next) => {
    var params = req.body;
    var query = mymapper.getStatement(
        params.mapper, params.mapper_id, params, format );

    pool.getConnection(function(err,connection){
        connection.query(
            query,
            (error, result) => {
                if (error) throw error;
                res.send(result);
            })
        connection.release();  //연결한것을 이제 풀어라
    })
})

module.exports = router;