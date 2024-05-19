import "../css/normalize.css";
import "../css/style.css";

import { apiGetPhotoList } from "../api/index.js";

// 所有照片列表
let photoList = [];

// 容器
const content = document.querySelector(".content");

let isMobile = window.innerWidth < 768;
// console.log(`isMobile = ${isMobile}`);
// 照片列表渲染
const renderPhotoList = (photoArr) => {
  if (isMobile && document.querySelectorAll(".card").length === 4) {
    return; // 如果是手機版且已經渲染過四張就不再渲染
  }
  if (!isMobile && document.querySelectorAll(".card").length === photoList.length) {
    return; // 如果是桌機版且已經渲染過所有就不再渲染
  }
  console.log("renderPhotoList");
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
function resizeWindow() {
  isMobile = window.innerWidth < 768;
  if (isMobile) {
    const newArr = [...photoList].splice(0, 4); // 取前四個
    renderPhotoList(newArr);
  } else {
    renderPhotoList(photoList);
  }
}
// 初始化抓資料
const fetchInit = async () => {
  try {
    const res = await apiGetPhotoList();
    photoList = res.data;
    resizeWindow();
  } catch (error) {
    console.log(error);
  }
};

fetchInit();

window.addEventListener("resize", resizeWindow);
