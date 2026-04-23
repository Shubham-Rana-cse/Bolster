import mongoose from "mongoose";

const {Schema, model}  = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    phonenumber: {type: Number},

    x: {type: String},
    instagram: {type: String},
    linkedin: {type: String},
    
    // This is the correct Mongoose syntax for nested objects with defaults.
    profilepic: {
    type: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
    },
    default: () => ({
        url: "",
        public_id: "",
    }),
    },

    bannerpic: {
    type: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
    },
    default: () => ({
        url: "",
        public_id: "",
    }),
    },

    document: {
    type: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
    },
    default: () => ({
        url: "",
        public_id: "",
    }),
    },

    razorpayid: {type: String},
    razorpaysecret: {type: String},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

export default mongoose.models.User || mongoose.model("User", UserSchema);