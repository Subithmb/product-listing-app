const mongoose=require("mongoose"); 

 
  const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  });

 module.exports = mongoose.model("category",categorySchema);

  