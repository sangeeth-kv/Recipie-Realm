// models/notification.model.ts
import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    sender: { type: Schema.Types.ObjectId, ref: "User" },

    type: {
      type: String,
      enum: ["like", "comment", "follow"],
    },

    recipe: { type: Schema.Types.ObjectId, ref: "Recipe" },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Notification", notificationSchema);