import {
  Appointment,
  validateAppointment,
} from "../../../app/models/Appointment";

import { Service } from "../../app/models/Service";
import { User } from "../../../app/models/User";
import { encryptData, jwtSign } from "../../../app/utils/apiAuth";
import dbConnect from "../../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  if (method == "GET") {
  }

  if (method == "POST") {
    const appointmentReq = req.body;
    const { error } = validateAppointment(appointmentReq);
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const service = await Service.findById(appointmentReq.serviceId);
    if (!service) {
      return res.status(400).json({
        success: false,
        message: "Enqueuing to a service that doesn't exist",
      });
    }

    const requestor = await User.findById(appointmentReq.requestor.id);
    if (!requestor) {
      return res.status(400).json({
        success: false,
        message: "There's a problem with your authentication",
      });
    }

    const blockingApprovedService = await Appointment.find({
      status: "Approved",
      $and: {
        startDate: { $lt: appointmentReq.startDate },
        endDate: { $gt: appointmentReq.startDate },
      },
    });

    if (blockingApprovedService) {
      return res.status(400).json({
        success: false,
        message: "Your appointment is in between an approved appointment",
      });
    }

    try {
      const appointment = await Appointment.create(appointmentReq);
      return res.status(201).json({ success: true, data: appointment });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error, message: "Error occured" });
    }
  }
}
