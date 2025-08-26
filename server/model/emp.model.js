const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50, // limit name to 50 chars
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    maxlength: 50, // limit email to 50 chars
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"], // exactly 10 digits
  },
  depart: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50, // limit department to 50 chars
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});

const EMP = mongoose.model("EMP", empSchema);
module.exports = EMP;
