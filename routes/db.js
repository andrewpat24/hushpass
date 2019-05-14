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
    
    console.log('*** arived in post db/upload ***');
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
  			console.log("file added to db");
  		});
		
  		
  		return res.status(200)
    	.send(docId);
	});

    
    // const data = req.body;
    // console.log(data);
    // return res.status(500)
    // .send({});
    
});

router.get("/:documentCode", async function(req,res){
	console.log('*** arived in get db/:doc ***');
	const docId = req.params.documentCode;

	const document = await Document.findOne({docId:docId}, function (err, doc) {
		if (err) return console.error(err);
	});

	res.status(200).send({
		fileName:document.fileName,
		fileType:document.fileType,
		expirationDate: document.expirationDate
	});
});


router.get("/download/:documentCode", async function(req,res){
	console.log('*** arived in get db/download ***');
	const docId = req.params.documentCode;

	const form = new formidable.IncomingForm();
	form.parse(req, async function(err, fields, files) {

    	console.log("fields:",fields);
    });


	const document = await Document.findOne({docId:docId}, function (err, doc) {
		if (err) return console.error(err);
	});

	const gridfs = await Grid(connection.db, mongoose.mongo);

	gridfs.findOne( {filename:docId}, function (err,file){
		
		if (err) return res.status(400).send(err);
		else if (!file) {
        	return res.status(404).send('Error on the database looking for the file.');
    	}
		// return res.status(200).download( file );

		res.set('Content-Type', document.fileType);
    	res.set('Content-Disposition', 'attachment; filename="' + document.fileName +  '"');

    	var readstream = gridfs.createReadStream({filename:docId});

    	readstream.on("error", function(err) { 
        	res.end();
    	});
    	readstream.pipe(res);
	});

	// return res.status(200).send(document.filename);
});


router.get("/test", async function(req,res){
	console.log('*** arived in get db/test ***');

	console.log('hash: ' + crypto.createHash('sha256').update('password').digest('hex'));
	console.log('hash: ' + crypto.createHash('sha256').update('password').digest('hex'));

	console.log('*** ended get db/test ***');
	return res.status(200);

});

router.get("/test/:argument", async function(req,res){

	const form = new formidable.IncomingForm();
    
    form.parse(req, async function(err, fields) {
    	console.log("pw: ",fields);
		const hash1 = crypto.createHash('sha256').update('password').digest('hex');
		const hash2 = crypto.createHash('sha256').update(fields.password).digest('hex');
		console.log('hash: ' + hash1 );
		console.log('hash: ' + hash2 );
		console.log( hash1 == hash2 );

		return res.status(200).send(hash1 == hash2);
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

		if( hash == document.hashedKey ){
			const gridfs = await Grid(connection.db, mongoose.mongo);

			gridfs.findOne( {filename:docId}, function (err,file){
				
				if (err) return res.status(400).send(err);
				else if (!file) {
		        	return res.status(404).send('Error on the database looking for the file.');
		    	}
				// return res.status(200).download( file );

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
		}
		else {
			console.log('bad password');
			return res.status(200).send('Bad Password');}
	});
});


module.exports = router; 