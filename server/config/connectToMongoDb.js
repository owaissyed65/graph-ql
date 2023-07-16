const mongoose = require("mongoose");
const connectToMongo = async (uri) => {
  const connection = await mongoose.connect(uri);

  console.log(
    `Connect To mongo ${connection.connection.host}`.cyan.underline.bold
  );
};
module.exports = connectToMongo;
