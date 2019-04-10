const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  description: {
    type: String
  },
  amount: {
    type: Number
  },
  debit_credit: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  account: {
    type: String
  },
  category: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Expense = mongoose.model("Expense", ExpenseSchema);