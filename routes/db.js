const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
const fs = require('fs');

const Document = mongoose.model('documents'); 
mongoose.Promise = global.Promise;
gridfs.mongo = mongoose.mongo;
const connection = mongoose.connection;

router.post("/upload",function(req, res) {
    
    console.log('*** arived in post db/upload ***');
    console.log(req.body);
    return res.status(200)
    .send(req.body);
    
});

router.get("/test", async function(req,res){
	console.log('*** arived in get db/test ***');

	const newDoc = await new Document({docId: '420'})
	.save();

	console.log('newDoc: ' + newDoc);

	Document.find(function (err, docs) {
		if (err) return console.error(err);
		// console.log('all docs:' + docs);
	});

	console.log('*** ended get db/test ***');
	return res.status(200).send("hi");

});

module.exports = router; 