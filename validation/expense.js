const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateExpenseInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.description = !isEmpty(data.description) ? data.description : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.debit_credit = !isEmpty(data.debit_credit) ? data.debit_credit : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.account = !isEmpty(data.account) ? data.account : "";

  // desc checks
  if (Validator.isEmpty(data.description)) {
    errors.description = "Enter description";
  }
  // amount checks
  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Enter amount";
  }
  // debit_Credit
  if (Validator.isEmpty(data.debit_credit)) {
    errors.debit_credit = "";
  }
  // category
  if (Validator.isEmpty(data.category)) {
    errors.category = "Select category";
  }
  // account
  if (Validator.isEmpty(data.account)) {
    errors.account = "Select account";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};