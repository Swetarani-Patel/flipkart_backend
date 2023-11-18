import UserModel from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const userSignup = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return res.status(401).json({ message: "username  already exist" });
    }
    const hash = bcrypt.hashSync(password, 5);
    const newUser = new UserModel({ name, email, mobile, password: hash });
    await newUser.save();
    res.status(200).json({ message: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authenticatedUser = await UserModel.findOne({ email });
    if (authenticatedUser) {
      const match = await bcrypt.compare(password, authenticatedUser.password);
      if (match) {
        const token = jwt.sign({ id: authenticatedUser._id }, JWT_SECRET_KEY);
        return res.status(200).json({ data: authenticatedUser, token });
      } else {
        return res.status(401).json({ message: "wrong password" });
      }
    } else {
      return res.status(401).json({ message: "login failed" });
    }
  } catch (err) {
    res.status(500).json("Error", err.message);
  }
};
