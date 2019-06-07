const mongoose = require("mongoose");
var MONGO_URI = require("./credentials").MONGO_URI;

exports.handler = async event => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!")
  };
  return response;
};
