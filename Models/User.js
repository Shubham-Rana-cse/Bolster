import mongoose from "mongoose";

const {Schema, model}  = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    phonenumber: {type: Number},

    x: {type: String},
    instagram: {type: String},
    linkedin: {type: String},
    
    profilepic: {type: String},
    bannerpic: {type: String},
    document: {type: String},

    razorpayid: {type: String},
    razorpaysecret: {type: String},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

export default mongoose.models.User || mongoose.model("User", UserSchema);