import mongoose, { Schema,HydratedDocument } from "mongoose";
import { IAdminModel } from "../interface/admin/IAdminModel";


export type AdminDocument =HydratedDocument<IAdminModel>;


const adminSchema = new Schema<IAdminModel>(
  {
    // 🔹 Basic Info
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // 🔹 Permissions (VERY IMPORTANT)
    permissions: {
      manageUsers: { type: Boolean, default: false },
      manageRecipes: { type: Boolean, default: false },
      managePayments: { type: Boolean, default: false },
      manageAdmins: { type: Boolean, default: false },
      viewAnalytics: { type: Boolean, default: false },
    },

    // 🔹 Account Status
    Blocked: {
      isBlocked:{type: Boolean,default: false},
      blockedReason:{type:String},
      blockedBy:{ type: Schema.Types.ObjectId, default: null },
    },

    Deleted: {
       isDeleted:{type:Boolean,default:false},
       deletedReason:{type:String},
       deletedBy:{ type: Schema.Types.ObjectId, default: null },
    },

    // 🔹 Activity Tracking
    lastLogin: {
      type: Date,
    },

    lastLogout: {
      type: Date,
    },

    loginHistory: [
      {
        ip: String,
        device: String,
        date: { type: Date, default: Date.now },
      },
    ],

    // 🔹 Security
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
    },

    // 🔹 Audit Info
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // who created this admin
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const AdminModel = mongoose.model<IAdminModel>("Admin", adminSchema);