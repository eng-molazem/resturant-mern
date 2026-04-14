import Category from "../models/categoryModel.js";

//  إضافة Category
export const addCategory = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
        success: false,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
        success: false,
      });
    }

    const existing = await Category.findOne({ name });

    if (existing) {
      return res.status(400).json({
        message: "Category already exists",
        success: false,
      });
    }

    //  حفظ الصورة محليًا
    const imageUrl = `/uploads/${req.file.filename}`;

    const category = await Category.create({
      name,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Category created",
      category,
    });

  } catch (error) {
    console.log("🔥 ADD CATEGORY ERROR:", error);

    res.status(500).json({
      message: error.message, 
      success: false,
    });
  }
};

//  جلب كل الكاتيجوري
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      categories,
    });

  } catch (error) {
    console.log("🔥 GET ERROR:", error);

    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//  تعديل Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    //  صورة جديدة
    if (req.file) {
      category.image = `/uploads/${req.file.filename}`;
    }

    if (name) category.name = name;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated",
      category,
    });

  } catch (error) {
    console.log("🔥 UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//  حذف Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted",
    });

  } catch (error) {
    console.log("🔥 DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};