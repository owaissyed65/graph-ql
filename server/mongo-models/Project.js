
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const projectSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});
module.exports = model("Project", projectSchema);
