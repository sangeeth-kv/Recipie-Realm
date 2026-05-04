import mongoose, { Document, Schema,HydratedDocument  } from "mongoose";
import { IUserModel } from "../interface/user/IuserModel";
import { email } from "zod";


export type UserDocument = HydratedDocument<IUserModel>;

const userSchema :Schema<IUserModel> = new Schema<IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      default: function () {
        return this.email.split("@")[0];
      },
      trim: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPER_ADMIN"],
      default: "USER",
    },
    // bio: String,
    // followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // savedRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],

    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export const UserModel = mongoose.model<IUserModel>("User", userSchema);






//future user schema:
// import { Schema, model } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: String,
//     email: String,
//     password: String,
//     avatar: String,

//     bio: String,

//     followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     following: [{ type: Schema.Types.ObjectId, ref: "User" }],

//     savedRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
//   },
//   { timestamps: true }
// );

// export default model("User", userSchema);