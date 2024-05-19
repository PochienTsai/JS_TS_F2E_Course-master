import Cookies from "js-cookie";

const cookie = {
  set(key, value) {
    let val = value;
    if (typeof value === "object") {
      val = JSON.stringify(value); // 將物件轉為字串
    }
    Cookies.set(key, val);
  },
  get(key) {
    if (key === "all") return Cookies.get(); // 取得所有資料
    const content = Cookies.get(key);
    if (!content) return null; // 若無資料則回傳null
    try {
      return JSON.parse(content); // 將字串轉為物件
    } catch (error) {
      return content;
    }
  },
  remove(key) {
    if (key === "all") {
      Object.keys(Cookies.get()).forEach((item) => {
        Cookies.remove(item);
      }); // 清除所有資料
    } else {
      Cookies.remove(key);
    }
  },
};
const local = {
  set(key, value) {
    let val = value;
    if (typeof value === "object") {
      val = JSON.stringify(value); // 將物件轉為字串
    }
    localStorage.setItem(key, val);
  },
  get(key) {
    if (key === "all") {
      const res = {};
      Object.keys(localStorage).forEach((item) => {
        res[item] = local.get(item);
      });
      return res; // 取得所有資料
    } // 取得所有資料
    const content = localStorage.getItem(key);
    if (!content) return null; // 若無資料則回傳null
    try {
      return JSON.parse(content); // 將字串轉為物件
    } catch (error) {
      return content;
    }
  },
  remove(key) {
    if (key === "all") {
      localStorage.clear(); // 清除所有資料
    } else {
      localStorage.removeItem(key);
    }
  },
};
export { cookie, local };
