import { createContext, useEffect, useState } from "react"; // هوك لانشاء متغيرات ثابتىة مشان بيانات المستخدم مثلا /  هوك لتنفيذكود معين لما نحمل الصفحة او نغير بيانات معينة / لانشاء خزان بيانات 
import { useNavigate } from "react-router-dom";//للتنقل بين الصفحات برمجيا مثلا بعد تسجيل الدخول
import axios from "axios"; //مكتبة لنعمل طلبات للسيرفر
import { toast } from "react-hot-toast"; //مكتبة لنطلع رسائل تنبيه حلوة 

export const AppContext = createContext();  //هون انشأنا الكونتيكست لحتى نعمللها استيراد بغير صفحات

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;       // للسماح بارسال واستقبال الكوكيز

const AppContextProvider = ({ children }) => { //انشاء المكون 
  const navigate = useNavigate();  //تفعيل التنقل
   //   منأنشئ فيه متغيرات حساسة يعني رياكت بحدث الشاشة فورا بس تتغير useState 
  const [loading, setLoading] = useState(false); //مخزن حالة التحميل منعملو ترو بس نبعت طلب للسيرفر
  const [user, setUser] = useState(null);  //مخزن بيانات المستخدم حطيناه null لانو ممنعرف مين المستخدم لسا
  const [admin, setAdmin] = useState(null);  // بيانات المسؤول
  const [categories, setCategories] = useState([]); 
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);

  // حساب المجموع الكلي للسلة مثلا النقطة الحمرا عالسلة
  useEffect(() => {
    if (cart?.items?.length) {
      const total = cart.items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);


  // عدد الأصناف في السلة
  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0);

  //  جلب بيانات السلة
  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");
      if (data.success) {
        setCart(data.cart);
      }
    } 
    catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  //  إضافة عنصر للسلة
  const addToCart = async (menuId) => {
    try {
      const { data } = await axios.post("/api/cart/add", { menuId, quantity: 1 });
      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong!");
    }
  };

  //  جلب categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategories(data.categories);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //  جلب القوائم
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) {
        setMenus(data.menuItems);
      } else {
        console.log("Failed to fetch menus");
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  //  التحقق من تسجيل الدخول
  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth check error:", error);
    }
  };

  // تشغيل عند فتح الصفحة فورا
  useEffect(() => {
    isAuth();
    fetchCategories();
    fetchMenus();
    fetchCartData();
  }, []);

  //هي الشنتة اللي منحط فيا كل المعلومات
  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    axios,
    admin,
    setAdmin,
    categories,
    fetchCategories,
    menus,
    fetchMenus,
    addToCart,
    cartCount,
    cart,
    totalPrice,
    fetchCartData,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;