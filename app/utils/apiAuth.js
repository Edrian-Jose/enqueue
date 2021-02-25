import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const encryptData = async (data, saltSize = 10) => {
  const salt = await bcrypt.genSalt(saltSize);
  return await bcrypt.hash(data, salt);
};

const jwtSign = (obj) => {
  return jwt.sign(obj, process.env.PRIVATE_KEY);
};

const jwtVerify = (obj) => {
  return jwt.verify(obj, process.env.PRIVATE_KEY);
};

export { encryptData, jwtSign, jwtVerify };
