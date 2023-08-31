import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

// Tự động tạo createAt and updateAt => timestamps = true

const NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel;
