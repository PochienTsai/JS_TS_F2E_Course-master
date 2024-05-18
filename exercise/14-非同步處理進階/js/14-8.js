/**
 * API https://vue-lessons-api.vercel.app/auth/registered
 *  username: string
 *  password: string
 *  email: string
 *  sex: string
 *  age: string
 *  terms: boolean
 *
 * {
    value: "",
    error: "",
  }
 */

// input
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const age = document.querySelector('#age');
const sex = document.querySelectorAll("input[name='sex']");
const terms = document.querySelector('#terms');

// error message
const usernameError = document.querySelector('.username-error');
const passwordError = document.querySelector('.password-error');
const emailError = document.querySelector('.email-error');

// 送出按鈕
const btn = document.querySelector('.btn');
// 註冊的頁面
const loginPage = document.querySelector('#login-page');
// 註冊完成頁面
const successPage = document.querySelector('#success-page');

let isClick = false;

const info = {
  username: { value: '', error: '' },
  password: { value: '', error: '' },
  email: { value: '', error: '' },
  sex: { value: '', error: '' },
  age: { value: '', error: '' },
  terms: { value: 'off', error: '' },
};
function inputData(e) {
  let id = e.target.id;
  if (['boy', 'girl'].includes(id)) {
    // 這裡要注意的是，如果是radio的話，會有兩個id，所以要用includes
    id = 'sex';
  }
  info[id].value = e.target.value;
  console.log(info);
}

username.addEventListener('input', inputData);
password.addEventListener('input', inputData);
email.addEventListener('input', inputData);
age.addEventListener('input', inputData);
sex[0].addEventListener('input', inputData);
sex[1].addEventListener('input', inputData);
terms.addEventListener('input', inputData);

function errorMessageSHow() {
  if (info.username.error) {
    usernameError.classList.remove('hidden');
    usernameError.textContent = info.username.error;
  }
  if (info.password.error) {
    passwordError.classList.remove('hidden');
    passwordError.textContent = info.password.error;
  }
  if (info.email.error) {
    emailError.classList.remove('hidden');
    emailError.textContent = info.email.error;
  }
}

function resetErrorMessage() {
  info.username.error = '';
  info.password.error = '';
  info.email.error = '';
  usernameError.classList.add('hidden');
  passwordError.classList.add('hidden');
  emailError.classList.add('hidden');
}

btn.addEventListener('click', function ()
{
  resetErrorMessage();
  if (isClick) {
    return;
  }
  const req = {
    username: info.username.value,
    password: info.password.value,
    email: info.email.value,
    sex: info.sex.value,
    age: info.age.value,
    terms: info.terms.value === 'on',
  };
  axios
    .post('https://vue-lessons-api.vercel.app/auth/registered', req)
    .then(res => {
      console.log(res.data);
      loginPage.classList.add('hidden');
      successPage.classList.remove('hidden');
      isClick = true;
    })
    .catch(err => {
      const obj = err.response.data.error_message;
      Object.keys(obj).forEach(key => {
        info[key].error = obj[key];
      });
      console.log(info);
      errorMessageSHow();
    });
});
