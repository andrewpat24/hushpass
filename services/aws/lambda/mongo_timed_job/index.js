require("dotenv").config({ path: __dirname + "/.env" });
const moment = require("moment");
// Mongoose setup
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
// Models Import
require("./models/Documents");
require("./models/fs.chunks.js");
require("./models/fs.files.js");

const removeExpiredDocuments = async () => {
  // <CODE> //////////////////////
  const messageHeaders = {
    log: " | log start: | ",
    err: " | err start: | "
  };

  let expiredDocsData = {
    numberOfDocs: 0,
    docMetadata: new Array(),
    logData: "logs: "
  };

  expiredDocsData.logData += messageHeaders.log + "start";
  const mongooseConn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    connectTimeoutMS: 20000, // Give up initial connection after 20 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
  });

  // Models Init
  const Document = mongooseConn.model("documents");
  const FsChunks = mongooseConn.model("fs.chunks");
  const FsFiles = mongooseConn.model("fs.files");

  // console.log(FsChunks);
  const currentDate = moment().format();
  messageHeaders.log +
    `Mongoose connection status: ${mongoose.connection.readyState}`;

  const documents = await Document.find(
    {
      $or: [
        {
          expirationDate: {
            $lte: currentDate
          }
        },
        { maxDownloadsReached: true }
      ]
    },
    (err, doc) => {
      if (err) {
        // console.error(err);
        expiredDocsData.logData +=
          messageHeaders.err +
          `Error retrieving Document from Database.: ${err}`;
      }
    }
  );

  expiredDocsData.logData +=
    messageHeaders.log + `Docs found: ${documents.length}`;
  documents.forEach(async doc => {
    const docId = doc.docId;

    expiredDocsData.logData += messageHeaders.log + `Current Doc: ${doc.docId}`;

    expiredDocsData.logData += messageHeaders.log + "Begin async remove doc.";

    const fsFile = await FsFiles.findOne(
      {
        filename: docId
      },
      (err, fsDoc) => {
        if (err) {
          expiredDocsData.logData += messageHeaders.err + err;
        }
      }
    );

    if (fsFile === null) {
      console.log("File data has already been deleted.");
      return "File data has already been deleted.";
    }

    expiredDocsData.logData += messageHeaders.log + "Begin remove fsFile.";

    fsFile.remove((err, response) => {
      if (err) {
        expiredDocsData.logData += messageHeaders.err + err;
      } else {
        expiredDocsData.logData += messageHeaders.log + "removed fsFile.";
      }
    });

    if (fsFile === null) {
      expiredDocsData.logData +=
        messageHeaders.err +
        `${docId} - Document id cannot be found in fsFile.`;
      return;
    }

    console.log("fsFile", fsFile);
    if (fsFile._id === undefined) {
      return;
    }

    expiredDocsData.logData += messageHeaders.log + "Begin find chunk.";
    const chunks = await FsChunks.find(
      {
        files_id: fsFile._id
      },
      (err, fsChunk) => {
        if (err) {
          expiredDocsData.logData += messageHeaders.err + err;
        } else {
          expiredDocsData.logData +=
            messageHeaders.log + `Found ${fsChunk.length} chunk(s).`;
        }
      }
    );

    expiredDocsData.logData += messageHeaders.log + "Begin remove chunk loop.";
    chunks.forEach(chunk => {
      chunk.remove((err, response) => {
        if (err) {
          expiredDocsData.logData += messageHeaders.err + err;
        } else {
          expiredDocsData.logData += messageHeaders.log + "removed chunk.";
        }
      });
      console.log("IM REMOVING CHUNKS", chunk._id);
    });

    expiredDocsData.numberOfDocs += 1;
    expiredDocsData.docMetadata.push(doc);
  });
  // </CODE> //////////////////////

  // console.log(expiredDocsData);
  return expiredDocsData;
};

console.log(removeExpiredDocuments());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.handler = async event => {
  // <CODE> //////////////////////
  const messageHeaders = {
    log: " | log start: | ",
    err: " | err start: | "
  };

  let expiredDocsData = {
    numberOfDocs: 0,
    docMetadata: new Array(),
    logData: "logs: "
  };

  expiredDocsData.logData += messageHeaders.log + "start";
  const mongooseConn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    connectTimeoutMS: 20000, // Give up initial connection after 20 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
  });

  // Models Init
  const Document = mongooseConn.model("documents");
  const FsChunks = mongooseConn.model("fs.chunks");
  const FsFiles = mongooseConn.model("fs.files");

  // console.log(FsChunks);
  const currentDate = moment().format();
  messageHeaders.log +
    `Mongoose connection status: ${mongoose.connection.readyState}`;

  const documents = await Document.find(
    {
      $or: [
        {
          expirationDate: {
            $lte: currentDate
          }
        },
        { maxDownloadsReached: true }
      ]
    },
    (err, doc) => {
      if (err) {
        // console.error(err);
        expiredDocsData.logData +=
          messageHeaders.err +
          `Error retrieving Document from Database.: ${err}`;
      }
    }
  );

  expiredDocsData.logData +=
    messageHeaders.log + `Docs found: ${documents.length}`;
  documents.forEach(async doc => {
    const docId = doc.docId;

    expiredDocsData.logData += messageHeaders.log + `Current Doc: ${doc.docId}`;

    expiredDocsData.logData += messageHeaders.log + "Begin async remove doc.";

    const fsFile = await FsFiles.findOne(
      {
        filename: docId
      },
      (err, fsDoc) => {
        if (err) {
          expiredDocsData.logData += messageHeaders.err + err;
        }
      }
    );

    expiredDocsData.logData += messageHeaders.log + "Begin remove fsFile.";

    fsFile.remove((err, response) => {
      if (err) {
        expiredDocsData.logData += messageHeaders.err + err;
      } else {
        expiredDocsData.logData += messageHeaders.log + "removed fsFile.";
      }
    });

    if (fsFile === null) {
      expiredDocsData.logData +=
        messageHeaders.err +
        `${docId} - Document id cannot be found in fsFile.`;
      return;
    }

    console.log("fsFile", fsFile);
    if (fsFile._id === undefined) {
      return;
    }

    expiredDocsData.logData += messageHeaders.log + "Begin find chunk.";
    const chunks = await FsChunks.find(
      {
        files_id: fsFile._id
      },
      (err, fsChunk) => {
        if (err) {
          expiredDocsData.logData += messageHeaders.err + err;
        } else {
          expiredDocsData.logData +=
            messageHeaders.log + `Found ${fsChunk.length} chunk(s).`;
        }
      }
    );

    expiredDocsData.logData += messageHeaders.log + "Begin remove chunk loop.";
    chunks.forEach(chunk => {
      chunk.remove((err, response) => {
        if (err) {
          expiredDocsData.logData += messageHeaders.err + err;
        } else {
          expiredDocsData.logData += messageHeaders.log + "removed chunk.";
        }
      });
      console.log("IM REMOVING CHUNKS", chunk._id);
    });

    expiredDocsData.numberOfDocs += 1;
    expiredDocsData.docMetadata.push(doc);
  });
  // </CODE> //////////////////////
  // const expiredDocsData = removeExpiredDocuments();
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `${expiredDocsData.numberOfDocs} document(s) have been removed.`,
      docData: expiredDocsData.docMetadata,
      logData: expiredDocsData.logData,
      expiredDocsData
    })
  };
  return response;
};
