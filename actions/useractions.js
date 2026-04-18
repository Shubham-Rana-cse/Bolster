"use server"

import Razorpay from "razorpay"
import Payment from "@/Models/Payment"
import connectDB from "@/DB/connectDB"
import User from "@/Models/User"

export const initiate = async (amount, from_username, to_username, paymentForm)=>{
    await connectDB();

    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    })

    /* instance.orders.create({
        amount: 500,
        currency: 'INR',
        receipt: 'receipt#1'
    }) */

    let options = {
        amount: Number.parseInt(amount),
        currency: 'INR',
    }

    let order = await instance.orders.create(options);    //custom payment instance

    //creating a payment object which shows a pending payment in the database
    await Payment.create({
        order_id: order.id,
        amount: order.amount,
        from_user: from_username,
        to_user: to_username,
        name: paymentForm.name,
        message: paymentForm.message
    })

    return order;
}

export const fetchUser = async (username) =>{
    await connectDB();

    let user = await User.findOne({username: username}).lean(); //.lean() returns a plain object instead of a Mongoose document

    if (!user) return null;

    //return user.toObject();

    return JSON.parse(JSON.stringify(user));    //JSON.stringify converts _id, createdAt, etc. into strings
}

export const fetchPayments = async (username) =>{
    await connectDB();

    let payments = await Payment.find({to_user: username, pending: false}).sort({createdAt: -1}).lean();

    return JSON.parse(JSON.stringify(payments));    //JSON.parse converts it back into a normal JS object/array that can safely be passed to Client Components
}

export const updateProfile = async (profile,oldusername) => {
    await connectDB();

    let newProfile = {...profile};
    
    //check if username is beign changed
    if (oldusername !== newProfile.username) {
        const existingUser = await User.findOne({ username: newProfile.username });

        if (existingUser) {
            return { error: "Username already exists." };
        }
    }

    await User.updateOne( { username: oldusername }, { $set: newProfile } );

    return newProfile;
}