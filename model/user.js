import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String, default: "user", enum: ["adminstrator", "user"]
    }
    
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);


export const UserModel = model("User", userSchema);
