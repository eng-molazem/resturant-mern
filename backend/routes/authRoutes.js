import express from "express"; // مكتبة لانشاء التوجيه

import { //استيراد التوابع من  contoller تحوي على المنطق البرمجي
  adminLogin,
  getProfile,
  isAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js"; //استيراد الدالة ليتحقق من وجود التوكن JWT وصحته قبل السماح للطلب بالوصولل للبيانات 

const authRoutes = express.Router();//نقوم بانشاء الراوتر بدال م نكتب كل المسارات في ملف سيرفر الرئيسي


authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/logout", logoutUser);
authRoutes.get("/profile", protect, getProfile);
authRoutes.get("/is-auth", protect, isAuth);


export default authRoutes;
