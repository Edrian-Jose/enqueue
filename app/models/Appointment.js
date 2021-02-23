import mongoose from "mongoose";
import Joi from "joi";
import { jwtSign } from "../utils/apiAuth";
Joi.objectId = require("joi-objectid")(Joi);

const AppointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  requestor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    required: true,
    default: "Pending Approval",
  },
  rating: {
    type: Number,
  },
  remarks: {
    type: String,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

const validateAppointment = (appointment) => {
  const schema = Joi.object({
    title: Joi.string().trim().required().label("Subject"),
    description: Joi.string().trim().label("Description"),
    startDate: Joi.date().required().label("Start Datetime"),
    endDate: Joi.date().label("End Datetime"),
    requestor: Joi.object({
      id: Joi.objectId().required().label("Requestor Id"),
      name: Joi.string().trim().required().label("Requestor Name"),
    }),
    status: Joi.string()
      .trim()
      .required()
      .default("Pending Approval")
      .label("Appointment Status"),
    rating: Joi.number().label("Rating"),
    remarks: Joi.string().label("Remarks"),
    serviceId: Joi.objectId().required().label("Service Id"),
  });

  return schema.validate(appointment);
};

export { Appointment, validateAppointment };
