import mongoose from "mongoose";

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

UserSchema.methods.fullname = function () {
  return `${this.name.first} ${this.name.last}`;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
