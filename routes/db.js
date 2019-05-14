const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');

const formidable = require('formidable');
const uuidv4 = require('uuid/v4');

const Document = mongoose.model('documents'); 
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
Grid.mongo = mongoose.mongo;

const crypto = require('crypto');

router.post("/upload",  function(req, res) {
    
    const form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
  		// console.log(fields);
  		// console.log(files);

  		const docId = uuidv4();

  		const newDoc = await new Document({
  			docId: docId,
    		fileName: files['file'].name,
    		fileType: files['file'].type,
    		hashedKey: crypto.createHash('sha256').update(fields.key).digest('hex'),
    		userID: req.userID
  		})
  		.save();

  		const gridfs = Grid(connection.db, mongoose.mongo);

		const writestream = gridfs.createWriteStream( {
			filename: docId
		});
		
  		fs.createReadStream( files['file'].path ).pipe( writestream );
  		
  		writestream.on('close',function(file){
  			// console.log("file added to db");
  		});
  		writestream.on("error", function(err) { 
	    	console.error('error');
    		res.status(500).end();
		});
  		
  		return res.status(201)
    	.send(docId);
	});
});

router.get("/:documentCode", async function(req,res){

	const docId = req.params.documentCode;
	const document = await Document.findOne({docId:docId}, function (err, doc) {
		if (err) {
			// console.error(err);
			res.status(404).send('Error getting Document from Database');
		}
	});

	res.status(200).send({
		fileName:document.fileName,
		fileType:document.fileType,
		expirationDate: document.expirationDate
	});
});

router.post("/file/:documentCode", async function(req,res){
	console.log('*** arived in get db/file ***');
	console.log('body:',req.body);
	const docId = req.params.documentCode;

	const form = new formidable.IncomingForm();
    
    form.parse(req, async function(err, fields) {

    	console.log("fields:",fields);

		const document = await Document.findOne({docId:docId}, function (err, doc) {
			if (err) return console.error(err);
		});

		const hash = crypto
						.createHash('sha256')
						.update(fields.password)
						.digest('hex');

		if( hash != document.hashedKey ) return res.status(401).send('Bad password');

		const gridfs = await Grid(connection.db, mongoose.mongo);

		gridfs.findOne( {filename:docId}, function (err,file){
			
			if (err) return res.status(400).send(err);
			else if (!file) {
	        	return res.status(404).send('Error on the database looking for the file.');
	    	}

			res.set('Content-Type', document.fileType);
	    	res.set('Content-Disposition', 'attachment; filename="' + document.fileName +  '"');

	    	var readstream = gridfs.createReadStream({filename:docId});

	    	readstream.on("error", function(err) { 
	        	res.end();
	    	});
	    	readstream.pipe(res);

	    	readstream.on("error", function(err) { 
	    		console.error('error');
    			res.end();
			});
		});
	});
});


module.exports = router; 