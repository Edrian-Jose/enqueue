import mongoose from "mongoose";
import Joi from "joi";
import { jwtSign } from "../utils/apiAuth";
Joi.objectId = require("joi-objectid")(Joi);

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
    trim: true,
  },
  opentime: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
});

const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const validateService = (service) => {
  const schema = Joi.object({
    name: Joi.string().trim().required().label("Service Name"),
    serviceType: Joi.string().trim().required().label("Service Type"),
    ownerName: Joi.string().trim().required().label("Service Owner"),
    opentime: Joi.string().trim().label("Open Time"),
    address: Joi.string().trim().label("Open Time"),
    ownerId: Joi.objectId().required().label("Owner Id"),
    rating: Joi.number().default(0).min(0).max(5).label("Rating"),
    reviewCount: Joi.number().default(0).min(0).label("Review Count"),
  });

  return schema.validate(service);
};

export { Service, validateService };
