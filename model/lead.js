import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import { required } from "joi";

const leadSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    status: { type: String, default: 'new' },
    notes: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    leadSource: {type: String, required: true}
},
    {
        timestamps: true,
    });
leadSchema.plugin(toJSON);


export const leadModel = model("Lead", leadSchema)