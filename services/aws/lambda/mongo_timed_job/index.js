require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");

console.log("MONGO_URI:", process.env.MONGO_URI);

const test = async () => {
  const thing = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  });
  console.log(thing);
};

test();

// exports.handler = async event => {
//   // TODO implement
//   console.log("MONGO_URI:", process.env.MONGO_URI);
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "Hello from Lambda!",
//       uri: process.env.MONGO_URI
//     })
//   };
//   return response;
// };
