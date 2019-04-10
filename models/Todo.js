const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Todo = mongoose.model("Todo", TodoSchema);