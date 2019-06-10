require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");

console.log("MONGO_URI:", process.env.MONGO_URI);

exports.handler = async event => {
  // TODO implement
  console.log("MONGO_URI:", process.env.MONGO_URI);
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  });
  const gridfs = await Grid(connection.db, mongoose.mongo);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!"
    })
  };
  return response;
};
