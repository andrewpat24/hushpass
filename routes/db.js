const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
const fs = require('fs');

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});
mongoose.Promise = global.Promise;
gridfs.mongo = mongoose.mongo;
const connection = mongoose.connection;

router.post("/upload",function(req, res) {
    
    console.log('*** arived in post db/upload ***');
    console.log(req.body);
    return res.status(200)
    .send(req.body);
    
});

router.get("/test",function(req,res){
	console.log('*** arived in get db/test ***');
	connection.on('error',console.error.bind(console,'connection error:'));
	connection.once('open',function(){});
	return res.status(200).send("hi");
});

module.exports = router; 