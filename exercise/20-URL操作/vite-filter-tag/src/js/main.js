/*eslint-disable*/
import "../css/normalize.css";
import "../css/style.css";
import { routerQueryReplace, routerQueryPush, routerQueryRemove, getParams } from "./utils/url";
import { apiGetTagsList, apiGetTagsProduct } from "../api";
import loading from "./utils/load.js";

const tagParent = document.querySelector(".parent");
const tagChild = document.querySelector(".child");
const content = document.querySelector(".content");
let tagsArr = [];
let productsArr = [];
let tagsHtml = "";
let tagsChildHtml = "";
let productsHtml = "";

// 產品列表渲染
const productsRender = () => {
  productsHtml = "";
  if (productsArr.length === 0) {
    productsHtml = "<h1 class='no_data'>目前尚無任何資料</h1>";
  } else {
    productsArr.forEach((item) => {
      productsHtml += `
        <div class="card">
          <h1>${item.title}</h1>
          <a href="${item.url}" target="_blank">${item.url}</a>
          <p>${item.content}</p>
        </div>
      `;
    });
  }
  content.innerHTML = productsHtml;

  // return Promise
  return new Promise((resolve) => setTimeout(resolve, 0));
};

// 抓取產品資料
const fetchProducts = async () => {
  try {
    const params = {};
    const tagQuery = getParams().get("tag");
    const childQuery = getParams().get("child");
    if (tagQuery) {
      params.tag = tagQuery;
    }
    if (childQuery) {
      params.child = childQuery;
    }
    console.log(params);
    const res = await apiGetTagsProduct(params);
    productsArr = res.data;
  } catch (error) {
    console.error(error);
  }
};

// 第二層選單渲染
const tagChildRender = () => {
  tagsChildHtml = "";
  const tagQuery = getParams().get("tag");
  const childQuery = getParams().get("child");
  const child = tagsArr.filter((item) => item.id === tagQuery);
  child.forEach((childItem) => {
    childItem.child.forEach((item) => {
      tagsChildHtml += `
        <a id="${item.id}" class="${childQuery === item.id ? "active" : ""}" data-key="${item.id}">${item.name}</a>
      `;
    });
  });
  tagChild.innerHTML = tagsChildHtml;
  console.log(3);
  return new Promise((resolve) => setTimeout(resolve, 0));
};

// 第一層選單渲染
const tagsRender = () => {
  tagsHtml = "";
  const queryTag = getParams().get("tag");
  console.log(queryTag);
  tagsArr.forEach((item) => {
    if (queryTag === item.id) {
      tagsHtml += `<a id="${item.id}" class="active">${item.name}</a>`;
    } else {
      tagsHtml += `<a id="${item.id}">${item.name}</a>`;
    }
  });
  tagParent.innerHTML = tagsHtml;
  return new Promise((resolve) => setTimeout(resolve, 0));
};

// 抓 tags 所有資料
const fetchTags = async () => {
  try {
    const res = await apiGetTagsList();
    tagsArr = res.data;
    console.log(1);
  } catch (error) {
    console.log(error);
  }
};

// 網址確認
const routeCheck = () => {
  // console.log(`url=${window.location.href}`); // 顯示當前網址
  // console.log(`search=${window.location.search}`); // 顯示當前網址 query
  if (window.location.search === "") {
    routerQueryReplace("tag=frontEnd");
  }
  return new Promise((resolve) => setTimeout(resolve, 0)); //這種做法的目的是為了確保所有的同步代碼都已經執行完畢，並且在 Promise 解析之前，所有的同步程式碼或DOM 渲染都已經執行完成。
};

// 抓完產品資料後跟者渲染
const fetchProductsRender = async () => {
  await fetchProducts(); // 抓取產品資料
  await productsRender(); // 產品列表渲染
};

// 第二層 tag event listener
const addTagChildListener = () => {
  const tagChildAll = document.querySelectorAll(".child > a");
  tagChildAll.forEach((item) => {
    item.addEventListener("click", async (e) => {
      loading.show();
      const tagId = e.target.id;
      routerQueryPush(`child=${tagId}`);
      tagChildAll.forEach((item) => item.classList.remove("active"));
      e.target.classList.add("active");
      await fetchProductsRender();
      loading.hidden();
    });
  });
};

// 第一層 tag event listener
const addTagListener = () => {
  const tagParentAll = document.querySelectorAll(".parent > a");
  console.log(tagParentAll);
  tagParentAll.forEach((item) => {
    item.addEventListener("click", async (e) => {
      loading.show();
      const tagId = e.target.id;
      routerQueryPush(`tag=${tagId}`);
      tagParentAll.forEach((item) => item.classList.remove("active"));
      e.target.classList.add("active");
      routerQueryRemove("child");

      await tagChildRender();
      await fetchProductsRender();
      addTagChildListener();
      loading.hidden();
    });
  });
};

// 初始化
const init = async () => {
  loading.show();
  await routeCheck(); // 網址確認
  await fetchTags(); // 抓 tags 所有資料
  await tagsRender(); // 第一層 tags 渲染
  await tagChildRender(); // 第二層 tags 渲染
  await fetchProductsRender(); // 抓產品資料以及渲染
  loading.hidden();
  addTagListener();
  addTagChildListener();
  window.addEventListener("popstate", async () => {
    loading.show();
    await fetchTags(); // 抓 tags 所有資料
    await tagsRender(); // 第一層 tags 渲染
    await tagChildRender(); // 第二層 tags 渲染
    await fetchProductsRender(); // 抓產品資料以及渲染
    loading.hidden();
    addTagListener();
    addTagChildListener();
  });
};

init();
