var express = require('express')
var mysql = require('mysql')
var dbconfig = require('../db/config.js')

var pool = mysql.createPool(dbconfig);
var router = express.Router();

router.use(express.urlencoded({extended : true}))

router.get('/', (req, res,next) => {
  var botable = req.query.botable
  // ~~~~?botable=qna
  pool.getConnection(function(err,connection){
    if(botable == 'qna'){//여기서 보테이블은 qna이다
      connection.query(
        'SELECT * FROM potopolio.'+botable,
        (error, result) => {
          if (error) throw error;
          res.send(result);
        })
      connection.release();  
    }else{
      var accident = require('../routers/postsend')
      router.use('/', accident )
      next('route')
    }
  })
})

module.exports = router;