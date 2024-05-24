const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return params;
};

const queryParse = (query) => {
  const queryKey = query.split("=")[0];
  if (window.location.search === "") {
    return `?${query}`;
  }
  if (window.location.search.includes(queryKey)) {
    const params = getParams().get(queryKey);
    return window.location.search.replace(`${queryKey}=${params}`, query);
  }
  return `${window.location.search}&${query}`;
};

const parseFindNewQuery = (params, fist) => {
  const { search } = window.location;
  const queryVal = getParams().get(params); // 取得 query 參數值
  let newPath = "";
  if (search[fist - 1] === "&") {
    newPath = search.replace(`&${params}=${queryVal}`, "");
  }
  if (search[fist - 1] === "?") {
    const str = search.include("&") ? `${params}=${queryVal}&` : `?{params}=${queryVal}`;
    newPath = search.replace(str, "");
  }
  return newPath;
};

// 添加 query 參數 push
const routerQueryPush = (params) => {
  // 取得當前網址
  const { pathname } = window.location;
  // 添加 query 參數
  const query = queryParse(params);
  // 將當前網址加上 query 參數
  window.history.pushState({}, null, `${pathname}${query}`);
  // 顯示當前網址
  console.log(`routerQueryPush url=${window.location.href}`); //  顯示當前網址
};

// 添加 query 參數 replace
const routerQueryReplace = (params) => {
  const { pathname } = window.location;
  const query = queryParse(params);
  window.history.replaceState({}, null, `${pathname}${query}`);
};

// 刪除 query 參數 push
const routerQueryRemove = (params) => {
  const { search } = window.location;
  const first = search.indexOf(params);
  if (("?", "&".includes(search[first - 1]))) {
    const { pathname } = window.location;
    const query = parseFindNewQuery(params, first);
    window.history.pushState({}, null, `${pathname}${query}`);
  }
};

// 刪除 query 參數 replace
const routerQueryReplaceRemove = (params) => {
  const { search } = window.location;
  const first = search.indexOf(params);
  if (("?", "&".includes(search[first - 1]))) {
    const { pathname } = window.location;
    const query = parseFindNewQuery(params, first);
    window.history.replaceState({}, null, `${pathname}${query}`);
  }
};

export { routerQueryPush, routerQueryReplace, routerQueryRemove, routerQueryReplaceRemove, getParams };
