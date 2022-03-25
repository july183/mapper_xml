var express = require('express')
var router = express.Router();

router.get('/sqlsend',(req, res) =>{
    res.send('/sqltsend라는 요청의 응답일뿐');
})

module.exports = router;