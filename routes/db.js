const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);

const fs = require('fs');
const crypto = require('crypto');

const formidable = require('formidable');
const uuidv4 = require('uuid/v4');
const Document = mongoose.model('documents'); 

mongoose.Promise = global.Promise;
const connection = mongoose.connection;
Grid.mongo = mongoose.mongo;

router.post("/upload",  function(req, res) {
    
    console.log('*** arrived in post db/upload ***');
    const form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {

  		const docId = uuidv4();
  		const newDoc = await new Document({
  			docId: docId,
    		fileName: files['file'].name,
    		fileType: files['file'].type,
    		hashedKey: fields.key,
    		userID: req.userID
  		})
		.save();
		  
		const cipher = crypto.createCipher('aes-256-cbc', process.env.CRYPTO_KEY);
		const input = fs.createReadStream(files['file'].path);

		const encryptedFilePath = files['file'].path + '.enc'; 
		const output = fs.createWriteStream(encryptedFilePath);

		input.pipe(cipher).pipe(output);
		
		//FILE HAS BEEN SUCCESSFULLY ENCRYPTED 
		output.on('finish', function() {
			console.log('Encrypted file written to disk!');
			const gridfs = Grid(connection.db, mongoose.mongo);

			const writestream = gridfs.createWriteStream( {
				filename: docId
			});
			
			fs.createReadStream( encryptedFilePath ).pipe( writestream );
			
			writestream.on('close',function(file){
				console.log("file added to db");
			});
			
			return res.status(200)
			.send(docId);

		});

	});

});

router.get("/download/:documentCode", async function(req,res){
	console.log('*** arrived in get db/download ***');
	const docId = req.params.documentCode;

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