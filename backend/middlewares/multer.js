//هاد الملف لرفع الصور عالمجلد استدعينا مكاتب الاولى للتعامل مع المللفات صور وكذا والتانية للمسارات
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({//اعداد التخزين
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // مجلد الصور
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));//الاول بيعطي رقم فريد والتاني بحافظ عالامتداد نفسو للصورة
  },
});

const upload = multer({ storage });//انشاء المجلد اذا مموجود

export default upload;