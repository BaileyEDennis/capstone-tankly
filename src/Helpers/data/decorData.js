import axios from 'axios';
import ApiKeys from '../apiKeys';

const baseUrl = ApiKeys.databaseURL;

const getUserDecor = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/decor.json?orderBy="userId"&equalTo="${userId}"`).then((response) => {
    const decResponse = response.data;
    const decArray = [];
    if (decResponse) {
      Object.keys(decResponse).forEach((decoration) => {
        decArray.push(decResponse[decoration]);
      });
    }
    resolve(decArray);
  }).catch((error) => reject(error));
});

const getSingleDecoration = (decorId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/decor/${decorId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getUserDecor, getSingleDecoration };
