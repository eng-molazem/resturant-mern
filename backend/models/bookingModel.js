import mongoose from "mongoose";
// هون عم نعمل استيراد للمكتبة لحتى نعمل model
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,  //ربط الحجز مع المستخدمين يعني بيربط الحجز بالمستخدم بال id 
      ref: "User",   //هون عم نقول للmongo انو الid هو للمستخدم
      required: true, //اجباري
    },
     name: {     //اسم الحجز
      type: String,
      required: true,
      trim: true,
    },
    phone: {    // رقم الهالف
      type: String,
      required: true,
    },
    numberOfPeople: {
      type: Number,    //عدد الاشخاص
      required: true,
      min: 1,
    },
    date: { //التاريخ
      type: Date, 
      required: true,
    },
    time: { //الوقت
      type: String,
      required: true,
    },
    note: {    //ملاحظة
      type: String,
      default: "",
      trim: true,
    },
    status: {    //الحالة
      type: String,
      enum: ["Pending", "Approved", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }// هي التعليمة بتضيف حقل تلقائي تاريخ ووقت انشاء الحجز
);

const Booking = mongoose.model("Booking", bookingSchema);//هون ملنا المخطط ل نموذج model
export default Booking;