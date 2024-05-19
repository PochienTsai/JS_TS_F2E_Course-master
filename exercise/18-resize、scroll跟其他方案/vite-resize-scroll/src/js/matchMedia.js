import "../css/normalize.css";
import "../css/style.css";

import { apiGetPhotoList } from "../api/index.js";

// 所有照片列表
let photoList = [];

// 容器
const content = document.querySelector(".content");

const isMobile = window.matchMedia("(max-width:768px)");
// 照片列表渲染
const renderPhotoList = (photoArr) => {
  let html = "";
  photoArr.forEach((item) => {
    html += `
      <div class="card">
        <img
          src="${item.url}"
          alt=""
        />
        <div class="text-content">
          <h1>這是一個好的產品</h1>
        </div>
      </div>
    `;
  });
  content.innerHTML = html;
};

const changeWindow = () => {
  if (isMobile.matches) {
    const newArr = [...photoList].splice(0, 4); // 取前四個
    renderPhotoList(newArr);
  } else {
    renderPhotoList(photoList);
  }
};

// 初始化抓資料
const fetchInit = async () => {
  try {
    const res = await apiGetPhotoList();
    photoList = res.data;
    renderPhotoList(photoList);
  } catch (error) {
    console.log(error);
  }
};

// 初始化抓資料
fetchInit();

// 有些瀏覽器 window.matchMedia 沒有 addEventListener
if ("addEventListener" in isMobile) {
  isMobile.addEventListener("change", changeWindow);
} else {
  isMobile.addListener(changeWindow);
}
