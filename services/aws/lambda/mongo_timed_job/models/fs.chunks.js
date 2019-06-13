const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const chunksSchema = new Schema({
  _id: { type: ObjectId },
  files_id: { type: ObjectId }
});

mongoose.model("fs.chunks", chunksSchema);
