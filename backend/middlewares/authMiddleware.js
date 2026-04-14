import jwt from "jsonwebtoken";

// حماية المستخدم مشان م حدا يدخل غيرو
export const protect = (req, res, next) => {
  const token = req.cookies.token;//جلب التوكن من الكوكيز
  if (!token) {//اذا مافي توكن يعني ممسجل دخول
    return res.status(401).json({
      message: "Not Authorized, no token",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);//للتأكد من أن التوكن الذي أرسله المستخدم صحيح ولم يتم التلاعب به

    req.user = decoded; // عم نضيف البيانات جوا req مشان نستخدما بعدين

    next(); //عم ننتقل للتابع اللي بعدو
  } 
  catch (error) { 
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

// حماية الأدمن
export const adminOnly = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Not Authorized, no token",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  التحقق الصحيح من role
    if (decoded.role !== "admin") {//عم يتأكد انو المستخدم ادمن
      return res.status(403).json({
        message: "Access denied, admin only",
        success: false,
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};