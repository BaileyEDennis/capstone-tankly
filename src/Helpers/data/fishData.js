import axios from 'axios';
import ApiKeys from '../apiKeys';

const baseUrl = ApiKeys.databaseURL;

const getUserFish = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/fish.json?orderBy="userId"&equalTo="${userId}"`).then((response) => {
    const fishResponse = response.data;
    const fishArray = [];
    if (fishResponse) {
      Object.keys(fishResponse).forEach((ghoti) => {
        fishArray.push(fishResponse[ghoti]);
      });
    }
    resolve(fishArray);
  }).catch((error) => reject(error));
});

const getTankFish = (tankId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tank-fish.json?orderBy="tankId"&equalTo="${tankId}"`).then((response) => {
    const fishResponse = response.data;
    const fishArray = [];
    if (fishResponse) {
      Object.keys(fishResponse).forEach((item) => {
        fishArray.push(fishResponse[item]);
      });
    }
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleFish = (fishId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/fish/${fishId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getTankFish, getUserFish, getSingleFish };
