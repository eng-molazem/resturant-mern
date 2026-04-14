import Menu from "../models/menuModel.js";

//  إضافة عنصر للقائمة
export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || price === undefined || !category || !req.file) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    //  حفظ الصورة محليًا
    const imageUrl = `/uploads/${req.file.filename}`;

    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Menu item added",
      success: true,
      menuItem: newMenuItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  جلب كل عناصر المنيو
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      menuItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  تعديل عنصر
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
        success: false,
      });
    }

    //  تحديث الصورة لو موجودة
    if (req.file) {
      menuItem.image = `/uploads/${req.file.filename}`;
    }

    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price !== undefined) menuItem.price = price;
    if (category) menuItem.category = category;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

    await menuItem.save();

    res.status(200).json({
      message: "Menu item updated",
      success: true,
      menuItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  حذف عنصر
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};