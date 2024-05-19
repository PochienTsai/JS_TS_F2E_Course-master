import '../style/style.css';
import { apiGetCityList, apiGetPhddotoList } from '../api';

async function init() {
  await apiGetCityList().then((response) => {
    console.log(response.data);
  });

  await apiGetPhddotoList().then((response) => {
    console.log(response.data);
  });
}
init();
