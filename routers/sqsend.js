var express = require('express')
var mysql = require('mysql')
var dbconfig = require('../db/config.js')

var pool = mysql.createPool(dbconfig);
var router = express.Router();

router.use(express.urlencoded({extended : true}))

router.get('/', (req, res,next) => {
  var botable = req.query.botable
  // ~~~~?botable=qna
  var crud = 'select'

  switch(botable){
    case "introduce.conent_interview" :
      crud = 'select';
      break;
    case "introduce.conent_portfolio" :
      crud = 'select';
      break;
    case "introduce.conent_qna" :
      crud = 'select';
      break;
    default:
      botable = 'none';
      crud = '';
      break;

}



  if(botable !== 'none'){
    pool.getConnection(function(err,connection){
      connection.query(
        crud + ' * FROM '+botable,
        (error, result) => {
          if (error) throw error;
          res.send(result);
        })
      connection.release();  
    })
  }
  else{
    var accident = require('../routers/postsend')
    router.use('/', accident )
    next('route')
  }
})

module.exports = router;