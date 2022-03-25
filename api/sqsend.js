var express = require('express')
var router = express.Router();
var normalpage = require('../router/nomal')
var awssql = require('./awssql')

router.use(express.urlencoded({extended : true}))
//리액트에서 비동기로 요청시  주소 타입을 읽음
router.get('/', (req, res,next) => {
  var sqlsideis = req.query.type;
  
  if(sqlsideis == 'aws'){
  // localhost:3000/prointerview?type=aws
    req.body.mapper = "IntrodueSql" // mapper namespace로 설정
    req.body.crud = "select" //select, insert, update, delete 중에 선택
    req.body.mapper_id = "interview" //sql문 정보를 담고있는 객체의 id

    router.use('/',awssql)
    next('route') // 미들웨어로 req와 res를 연결해준다.

  }else{ //평범한 라우팅이 기다리고 있음
    // localhost:3000/prointerview/write
    // localhost:3000/prointerview
    router.use('/',normalpage)
    next('route')
  }

})

module.exports = router;