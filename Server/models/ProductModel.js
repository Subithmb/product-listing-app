const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
  photo: { type: String }
});

module.exports = mongoose.model("Product", productSchema);
