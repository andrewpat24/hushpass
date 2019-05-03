const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');

const formidable = require('formidable');
const uuidv4 = require('uuid/v4');

const Document = mongoose.model('documents'); 
mongoose.Promise = global.Promise;
gridfs.mongo = mongoose.mongo;
const connection = mongoose.connection;

router.post("/upload",  function(req, res) {
    
    console.log('*** arived in post db/upload ***');
    const form = new formidable.IncomingForm();
    
    form.parse(req, async function(err, fields, files) {
  		console.log(fields);
  		console.log(files);

  		const docId = uuidv4();

  		const newDoc = await new Document({
  			docId: docId,
    		data: files['file'],
    		fileName:  files['file'].name,
    		hashedKey: fields.key,
    		userID: req.userID
  		})
  		.save();
  		
  		return res.status(200)
    	.send(docId);
	});

    
    const data = req.body;
    console.log(data);
    // return res.status(200)
    // .send({});
    
});

router.get("/download/:documentCode", async function(req,res){
	console.log('*** arived in get db/download ***');
	const docId = req.params.documentCode;

	const document = await Document.findOne({docId:docId},function (err, docs) {
		if (err) return console.error(err);
		// console.log('all docs:' + docs);
	});

	console.log(document);
	return res.status(200).download(document.data.path);
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