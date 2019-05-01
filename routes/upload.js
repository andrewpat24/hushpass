const express = require('express');
const router = express.Router();

router.post('/',function(req, res) {
    
    console.log('*** arived in post upload ***');
    console.log(req.body);
    
    return res.status(200).send(req.body);
    
});

router.get('/',function(req,res){
	console.log('*** arived in get upload ***');
});


module.exports = router; 