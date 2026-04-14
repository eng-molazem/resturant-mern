import express from "express";//اطار البرمجي الاساسي لبناء السيرفر
import cors from "cors";//لتسمح لموقعك (الفرونت إند) بالتواصل مع السيرفر حتى لو كانا على نطاقين مختلفين
import cookieParser from "cookie-parser";//لقرائة الكوكيز مشان ال JWT
import dotenv from "dotenv"; //لقراء الملف .env

import { connectDB } from "./config/db.js"; // هاد السطر مسئول عن الاتصال بقاعدة البيانات
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config(); // تفعيل قراءة .env

const app = express(); //انشاء نسخة من ايكسبريسس

// middlewares
app.use(express.json());//بحول الطلب ل json
app.use(cookieParser());//بخلي السيرفر يقرأ الكوكيز

// ✅ CORS FIX
app.use(
  cors({
    origin: true,//تعني السماح لأي موقع (Domain) بإرسال طلبات للسيرفر
    credentials: true,//تسمح للمتصفح بإرسال الكوكيز والتوكن مع الطلب
  })
);
app.use("/uploads", express.static("uploads"));//بخلي ملف الصور متاح للكل يعني عام


// database connection
connectDB();


const PORT = process.env.PORT || 5000;

// test route
app.get("/", (req, res) => {//لحتى نتاكد من السيرفر اذا شغال يعني ياسيرفر اذا شغلتك بعتلي هيك
  res.send("Server is working 🚀");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);

//  error handler (مهم جدًا)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// start server
app.listen(PORT, () => {//حجز المنفذ وراقب اي حركة او طلب 
  console.log(`Server running on http://localhost:${PORT}`);//بتطبع رابط السيرفر 
});