import mongoose from "mongoose";
import Joi from "joi";
import { jwtSign } from "../utils/apiAuth";

const UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      trim: true,
      required: true,
    },
    last: {
      type: String,
      trim: true,
      required: true,
    },
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 7,
    required: true,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["customer", "provider"],
    default: "customer",
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

UserSchema.methods.fullname = function () {
  return `${this.name.first} ${this.name.last}`;
};

UserSchema.methods.generateAuthToken = function () {
  const unsignedUser = {
    _id: this._id,
    name: this.fullname(),
    type: this.userType,
    completed: this.completed,
  };

  return jwtSign(unsignedUser);
};
const User = mongoose.models.User || mongoose.model("User", UserSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().trim().required().label("First Name"),
      last: Joi.string().trim().required().label("Last Name"),
    })
      .required()
      .label("Name"),
    email: Joi.string().trim().required().label("Email"),
    password: Joi.string().min(7).trim().required().label("Password"),
    userType: Joi.string()
      .trim()
      .default("customer")
      .valid("customer", "provider")
      .required()
      .label("User Type"),
  });

  return schema.validate(user);
};

export { User, validateUser };
