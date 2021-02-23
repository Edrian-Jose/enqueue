import mongoose from "mongoose";
const Joi = require("joi");

/* PetSchema will correspond to a collection in your MongoDB database. */
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
  },
});

const validateUser = (user) => {
  const schema = {
    name: Joi.object({
      first: Joi.string().trim().required(),
      last: Joi.string().trim().required(),
    }),
    email: Joi.string().trim().required(),
    password: Joi.string().min(7).trim().required(),
  };

  return Joi.validate(user, schema);
};

UserSchema.methods.fullname = function () {
  return `${this.name.first} ${this.name.last}`;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
exports.validateUser = validateUser;
