import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/Models/Payment";
import connectDB from "@/DB/connectDB";

export const POST = async (req) => {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);    // forms an object

    //check if razorpay orderId is present on the server 
    let order = await Payment.findOne({order_id: body.razorpay_order_id});
    if(!order){
        return NextResponse.json({success: false, message: "ERROR: Order id not found!"});
    }

    //verify the payment
    let payment = validatePaymentVerification({'order_id': body.razorpay_order_id, 'payment_id': body.razorpay_payment_id}, body.razorpay_signature, process.env.RAZORPAY_SECRET);

    if(payment){
        //update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({order_id: body.razorpay_order_id}, {pending: false}, {new: true});    //by doing {new: true} we also return the new updated document
        return NextResponse.redirect(`http://localhost:3000/${updatedPayment.to_user}?paymentDone=true`);
    }
    else{
        return NextResponse.json({success: false, message: "ERROR: Payment verification failed!"})
    }
}