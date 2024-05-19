import "../css/normalize.css";
import "../css/scrolling.css";
import star from "../images/star.svg";
import { apiGetRepos } from "../api";

let repos = []; // repo列表
let html = "";
const limit = 100; // 一次取得的repo數量
const cardBox = document.querySelector(".card_box");
let cards = null;
const scrollFun = () => {
  cards.forEach((item) => {
    const windowMid = window.innerHeight / 2;
    if (item.getBoundingClientRect().top <= windowMid) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
    cards.forEach((item) => {
      item.classList.add("show");
    });
  }
};
const renderRepos = () => {
  html = "";
  repos.forEach((item) => {
    html += `
      <li class="card show">
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
  cards = document.querySelectorAll(".card");
  console.log(cards);
  scrollFun();
};

const getRepos = async () => {
  try {
    const res = await apiGetRepos("MikeCheng1208", 1, limit);
    repos = res.data;
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

window.addEventListener("scroll", scrollFun);
