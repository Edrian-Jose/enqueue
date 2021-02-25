import { Service } from "../../../app/models/Service";
import {
  Appointment,
  validateAppointment,
} from "../../../app/models/Appointment";
import { User } from "../../../app/models/User";
import { encryptData, jwtSign } from "../../../app/utils/apiAuth";
import dbConnect from "../../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";
import moment from "moment";
import { authToken, runMiddleware } from "../../../app/utils/middlewares";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method == "GET") {
    const { id, date, type } = req.query;
    const datePicked = moment(date).format("YYYY-MM-DDTHH:mm:ss");
    const tomorrowDate = moment(date).add(1, "d").format("YYYY-MM-DDTHH:mm:ss");

    const statuses =
      parseInt(moment(moment().format("YYYY-MM-DD")).format("x")) >
      parseInt(moment(date).format("x"))
        ? ["Completed"]
        : ["Approved", "Completed"];

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    let service = null;
    if (type == "provider") {
      service = await Service.findOne({ ownerId: id });
    } else {
      service = await Service.findById(id);
    }

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
      serviceId: service._id,
      status: { $in: statuses },
    }).select(["startDate", "endDate", "status"]);

    return res.status(200).json({
      success: true,
      data: appointments,
      datePicked: new Date(datePicked).toISOString(),
      tomorrowDate: new Date(tomorrowDate).toISOString(),
    });
  }

  //update
  if (method == "POST") {
    const { result, error } = await runMiddleware(req, res, authToken);
    if (error) {
      return res.status(400).json({ error, message: "Authentication failed" });
    }
    const appointmentReq = req.body;
    const id = appointmentReq._id;
    delete appointmentReq._id;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    const a = await Appointment.findById(id);
    if (!a)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    if (appointmentReq.endDate) {
      if (moment(appointmentReq.endDate) <= moment(a.startDate)) {
        return res.status(400).json({
          success: false,
          message: "End datetime should be later than the start datetime",
        });
      }
      const dateReq = moment(appointmentReq.endDate).format(
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
    }

    try {
      const appointment = await Appointment.findByIdAndUpdate(
        id,
        appointmentReq,
        { new: true }
      );
      return res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error, message: "Error occured" });
    }
  }

  if (method == "DELETE") {
    const { id } = req.query;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(400).json({
        success: false,
        message: "Apppointment not found",
      });
    }

    const deleted = await Appointment.remove({ _id: appointment._id });
    if (deleted && deleted.count == 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete, apppointment not found",
      });
    } else {
      return res.status(202).json({
        success: true,
        data: appointment,
      });
    }
  }
}
