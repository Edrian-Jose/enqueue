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

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  if (method == "GET") {
    const { id, date } = req.query;
    const datePicked = moment(date).format("YYYY-MM-DDTHH:mm:ss");
    const tomorrowDate = moment(date).add(1, "d").format("YYYY-MM-DDTHH:mm:ss");

    const statuses =
      parseInt(moment().format("x")) > parseInt(moment(date).format("x"))
        ? ["Completed"]
        : ["Approved", "Completed"];

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(400)
        .json({ success: false, message: "Service cannot found" });
    }

    const appointments = await Appointment.find({
      startDate: { $gte: datePicked, $lte: tomorrowDate },
      serviceId: id,
      status: { $in: statuses },
    }).select(["startDate", "endDate", "status"]);

    return res.status(200).json({ success: true, data: appointments });
  }

  if (method == "POST") {
  }
}
