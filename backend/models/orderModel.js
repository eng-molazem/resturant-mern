import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [// مصفوفة فيا الاصناف
      {
        menuItem: {//عم نربط جدول المينيو مع الوجبة او المنتج
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: { //عدد القطع مع شرط اقل شي 1
          type: Number,
          required: true,
          min: 1, 
        },
      },
    ],
    totalAmount: { //المبلغ
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Delivered", "Cancelled"], 
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Card"], 
      default: "Cash on Delivery",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;