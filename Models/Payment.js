import mongoose from "mongoose";

const {Schema, mode} = mongoose;


const PaymentSchema = new Schema({
    amount: {type: Number, required: true},
    name: {type: String, required: true},
    to_user: {type: String, required: true},
    order_id: {type: String, required: true},
    message: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    pending: {type: Boolean, default: true},
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);