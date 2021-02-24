import {
  Appointment,
  validateAppointment,
} from "../../../app/models/Appointment";

import { Service } from "../../../app/models/Service";
import { User } from "../../../app/models/User";
import { encryptData, jwtSign } from "../../../app/utils/apiAuth";
import dbConnect from "../../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";
import moment from "moment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  if (method == "GET") {
    const { id, serviceId } = req.query;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    const service = await Service.findById(serviceId);
    if (!service) {
      return res
        .status(400)
        .json({ success: false, message: "Service cannot found" });
    }

    const appointments = await Appointment.find({
      startDate: {
        $gte: new Date(datePicked).toISOString(),
        $lte: new Date(tomorrowDate).toISOString(),
      },
      serviceId: id,
      status: { $in: statuses },
    }).select(["startDate", "endDate", "status"]);

    return res.status(200).json({
      success: true,
      data: appointments,
      datePicked: new Date(datePicked).toISOString(),
      tomorrowDate: new Date(tomorrowDate).toISOString(),
    });
  }

  if (method == "POST") {
    const appointmentReq = req.body;

    const { error } = validateAppointment(appointmentReq);
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const datePassed =
      parseInt(moment().format("x")) >
      parseInt(moment(appointmentReq.startDate).format("x"));
    if (datePassed) {
      return res.status(400).json({
        success: false,
        message: "You cannot enqueue an appointment on previous dates",
      });
    }

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
    const dateReq = moment(appointmentReq.startDate).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    const blockingApprovedService = await Appointment.find({
      status: "Approved",
      startDate: { $lt: new Date(dateReq).toISOString() },
      endDate: { $gt: new Date(dateReq).toISOString() },
    });

    if (blockingApprovedService && blockingApprovedService.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Your appointment is in between an approved appointment",
      });
    }

    try {
      const appointment = await Appointment.create(appointmentReq);
      return res.status(201).json({
        success: true,
        data: appointment,
        d: new Date(dateReq).toISOString(),
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error, message: "Error occured" });
    }
  }
}
