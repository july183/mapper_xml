//botable에서 대한 응답을 해줄수 없는 경우 출력될 페이지임

var express = require('express')
var router = express.Router();

router.get('/',(req, res) =>{
    res.send('localhost:3000/prointerview');
})
router.post('/write',(req, res) =>{
    res.send('/localhost:3000/prointerview/write');
})

module.exports = router;