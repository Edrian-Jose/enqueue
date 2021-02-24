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

  //update
  if (method == "POST") {
    const ratingReq = req.body;
    const id = ratingReq._id;
    const rating = ratingReq.rating;
    delete ratingReq._id;
    if (!id || !rating)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    const a = await Appointment.findById(id);
    if (!a)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    const service = await Service.findById(a.serviceId);
    if (!service) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const reviews = service.reviewCount + 1;
    const newRating = (service.rating + rating) / reviews;

    try {
      const appointment = await Appointment.findByIdAndUpdate(id, ratingReq, {
        new: true,
      });
      service.reviewCount = reviews;
      service.rating = newRating;
      await service.save();

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
}
