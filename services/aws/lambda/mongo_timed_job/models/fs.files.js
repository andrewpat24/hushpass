const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const filesSchema = new Schema({
  _id: { type: ObjectId },
  filename: { type: String }
});

mongoose.model("fs.files", filesSchema);
