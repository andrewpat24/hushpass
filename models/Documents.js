const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 var documentsSchema = new Schema({
    docId: {type:String,trim:true},
    data: {},
    title:  {type:String, trim:true, default:'file'},
    hashedKey: String,
    expirationDate: { type: Date, default: Date.now },
    maxDownloads: { type: Number, default: 1 },
    downloadCount: { type: Number, default: 0 },
    dateCreated:  { type: Date, default: Date.now },
    userID: Number,
    valid: { type:Boolean, default: true },
    urlKey: String
  });

mongoose.model('documents', documentsSchema);