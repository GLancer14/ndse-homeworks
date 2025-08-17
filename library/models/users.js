const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

module.exports = model("Users", usersSchema);