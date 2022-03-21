var express = require('express')
var router = express.Router();

router.get('/',(req, res) =>{
    res.send("죄송합니다. 요청주소에 대한 데이터가 없습니다.");
})

module.exports  = router;