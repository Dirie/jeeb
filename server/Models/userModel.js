import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100
  },
  lastName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true
  },
  hashPassword: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
