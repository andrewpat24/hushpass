const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
const fs = require('fs');

const formidable = require('formidable');

const Document = mongoose.model('documents'); 
mongoose.Promise = global.Promise;
gridfs.mongo = mongoose.mongo;
const connection = mongoose.connection;

router.post("/upload",function(req, res) {
    
    console.log('*** arived in post db/upload ***');
    const form = new formidable.IncomingForm();
    let formFields,formFiles;
    form.parse(req, function(err, fields, files) {
  		console.log(fields);
  		console.log(files);
  		formFields = fields;
  		formFiles = files;
  		
	});
        
    const data = req.body;
    // console.log(data);
    return res.status(200)
    .send(formFiles);
    
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