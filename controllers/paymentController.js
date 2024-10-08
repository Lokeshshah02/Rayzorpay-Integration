import { instance } from "../server.js";
import crypto from "crypto"
import { Payment } from "../models/paymentModel.js";

export const checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),  
            currency: "INR",
        };

        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order: order
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to create the order. Please try again later."
        });
    }
};
export const paymentVerification = async (req, res) => {
    try {
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature}= req.body
        // var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

        // var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
        // validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);

        //from the web site of razor pay and below code is from the 6 pack programmer

 const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }

    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to verify. Please try again later."
        });
    }
};
