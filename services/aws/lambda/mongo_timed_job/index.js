require("dotenv").config({ path: __dirname + "/.env" });
const moment = require("moment");
// Mongoose connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
require("./models/Documents");

const Grid = require("gridfs-stream");
eval(
  `Grid.prototype.findOne = ${Grid.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);

const removeExpiredDocuments = async () => {
  let expiredDocsData = {
    numberOfDocs: 0,
    docMetadata: new Array()
  };

  const mongooseConn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  });

  const Document = mongooseConn.model("documents");
  const currentDate = moment().format();

  const documents = await Document.find(
    {
      expirationDate: {
        $gte: currentDate
      }
    },
    (err, doc) => {
      if (err) {
        // console.error(err);
        res.status(404).send("Error retrieving Document from Database.");
      }
    }
  );

  console.log(documents.length);
  documents.forEach(doc => {
    expiredDocsData.numberOfDocs += 1;
    expiredDocsData.docMetadata.push(doc);

    doc.remove((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  });

  console.log(expiredDocsData);
  return expiredDocsData;
};

removeExpiredDocuments();

exports.handler = async event => {
  const expiredDocsData = removeExpiredDocuments();
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `${expiredDocsData.numberOfDocs} document(s) have been removed.`,
      docData: expiredDocsData.docMetadata
    })
  };
  return response;
};
