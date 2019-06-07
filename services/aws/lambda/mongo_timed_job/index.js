// require("dotenv").load();
const mongoose = require("mongoose");

exports.handler = async event => {
  // TODO implement
  console.log("MONGO_URI:", process.env.MONGO_URI);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
      uri: process.env.MONGO_URI
    })
  };
  return response;
};
