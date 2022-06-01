const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter tag name"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
