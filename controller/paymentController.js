import {instance} from '../index.js'
import dotenv from "dotenv";
import crypto from "crypto"
import { PaymentModel } from '../model/paymentSchema.js';
dotenv.config();
export const addPaymentGateway = async (req, res)=>{
    var options = {
        amount: Number(req.body.amount*100),  
        currency: "INR",
      };
     const order = await instance.orders.create(options) 
       res.status(200).json({success:true, order})
}


export const paymentVerification = async (req, res)=>{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
  .update(body.toString())
  .digest("hex");

const isAuthenticated = expectedSignature === razorpay_signature;

if (isAuthenticated) {
  await PaymentModel.create({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  res.redirect(
    `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
  ); 

}else{
  res.status(400).json({success:false})
}
}

export const getRazorKey = async(req, res)=>{
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
}
