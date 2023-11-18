import express from "express";
import { connection } from "./database/db.js";
import dotenv from "dotenv";
import DefaultData from "./default.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import Razorpay from "razorpay"
const app = express();
dotenv.config();
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use("/", router);
const PORT = process.env.PORT;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

connection();
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}...`);
  DefaultData();
});
