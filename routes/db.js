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


router.post("/upload",  function(req, res) {
    
    console.log('*** arived in post db/upload ***');
    const form = new formidable.IncomingForm();
    
    form.parse(req, async function(err, fields, files) {
  		console.log(fields);
  		// console.log(files);

  		const docId = uuidv4();

  		const newDoc = await new Document({
  			docId: docId,
    		fileName:  files['file'].name,
    		hashedKey: fields.key,
    		userID: req.userID
  		})
  		.save();

  		const gridfs = Grid(connection.db, mongoose.mongo);

		const writestream = gridfs.createWriteStream( {
			filename: docId
		});
			// console.log("built writestream...");
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

router.get("/download/:documentCode", async function(req,res){
	console.log('*** arived in get db/download ***');
	const docId = req.params.documentCode;

	const document = await Document.findOne({docId:docId}, function (err, doc) {
		if (err) return console.error(err);
	});

	const gridfs = await Grid(connection.db, mongoose.mongo);
	gridfs.exist({filename:docId}, function (err, file){
		console.log('exists: ', file);
	});
	gridfs.findOne( {filename:docId}, function (err,file){
		console.log('found:',file);
		if (err) return res.status(400).send(err);
		else if (!file) {
        	return res.status(404).send('Error on the database looking for the file.');
    	}
		// return res.status(200).download( file );

		res.set('Content-Type', file.contentType);
    	res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

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