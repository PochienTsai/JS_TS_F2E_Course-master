window.onload = () => {
  const a1 = document.querySelector('#a1');
  const a2 = document.querySelector('#a2');
  const a3 = document.querySelector('#a3');
  const a4 = document.querySelector('#a4');
  const a5 = document.querySelector('#a5');
  const photo = document.querySelector('#contentPhoto');
  let pageIdx = 4;
  let timer = null;

  a1.addEventListener('click', showPhoto);
  a2.addEventListener('click', showPhoto);
  a3.addEventListener('click', showPhoto);
  a4.addEventListener('click', showPhoto);
  a5.addEventListener('click', showPhoto);

  function timeGo() {
    timer = setInterval(() => {
      pageIdx++;
      if (pageIdx > 5) {
        pageIdx = 1;
      }
      photo.style.backgroundImage = `url(../images/08/big/a${pageIdx}.jpg)`;
      changeActiveIMg();
    }, 1000);
  }
  function changeActiveIMg() {
    for (let i = 1; i <= 5; i++) {
      document.querySelector(`#a${i}`).style.opacity = 0.5;
    }
    document.querySelector(`#a${pageIdx}`).style.opacity = 1;
  }

  function showPhoto() {
    clearInterval(timer);
    photo.style.backgroundImage = `url(../images/08/big/${this.id}.jpg)`;
    pageIdx = Number(this.id.slice(1)); // 取得數字
    changeActiveIMg();
    timeGo();
  }
  function init() {
    document.querySelector(`#a${pageIdx}`).style.opacity = 1;
    photo.style.backgroundImage = `url(../images/08/big/a${pageIdx}.jpg)`;
    timeGo();
  }
  init();
};
