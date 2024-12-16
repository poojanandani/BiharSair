import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    token:{
        type: String,
        required: true
    },
    createdAt: {typel:Date, default:Date.now(), expires:3600}
});

export default mongoose.model("token", tokenSchema);
