import "../css/normalize.css";
import "../css/scroll.css";
import star from "../images/star.svg";
import { apiGetRepos } from "../api";

let repos = []; // repo列表
let html = "";
const limit = 10; // 一次取得的repo數量
const cardBox = document.querySelector(".card_box");
const loading = document.querySelector(".loading");
let pageIndex = 0;
let isDisable = false; // 防止重複請求
const renderRepos = () => {
  html = "";
  repos.forEach((item) => {
    html += `
      <li>
          <h1 class="title">${item.name}</h1>
          <h2 class="description">${item.description}</h2>
          <a class="url" href="${item.html_url}" target="_blank">
            ${item.html_url}
          </a>
          <div class="star_box">
            <img class="star_icon" src="${star}" alt="star" />
            ${item.stargazers_count}
          </div>
        </li>
    `;
  });
  cardBox.innerHTML = html;
};

const getRepos = async () => {
  if (isDisable) return; // 如果沒有資料了就不再請求
  try {
    pageIndex += 1;
    const res = await apiGetRepos("MikeCheng1208", pageIndex, limit);
    repos = [...repos, ...res.data]; // 合併舊資料 + 新資料
    if (res.data.length < limit) {
      console.log("沒有資料了");
      isDisable = true;
      loading.style.display = "none";
    }
    console.log(">>", repos);
    renderRepos();
  } catch (error) {
    console.log(error);
  }
};

const fetchInit = () => {
  getRepos();
};

// 初始化
fetchInit();

const scrollDown = () => {
  console.log(`scroll ${window.scrollY}`);
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
    console.log("倒底了");
    getRepos();
  }
};
window.addEventListener("scroll", scrollDown);
