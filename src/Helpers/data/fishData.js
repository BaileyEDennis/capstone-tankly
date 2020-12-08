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
  axios.get(`${baseUrl}/tank-fish.json?orderBy="fishId"&equalTo="${tankId}"`).then((response) => {
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

const createFish = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/fish.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/fish/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const addFishOfTanks = (dataObject) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/tank-fish.json`, dataObject).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/tank-fish/${response.data.name}.json`, update);
  }).catch((error) => reject(error));
});

const updateFish = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/fish/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const deleteFish = (firebaseKey) => axios.delete(`${baseUrl}/fish/${firebaseKey}.json`);

const deleteFishofTanks = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/tank-fish/${firebaseKey}.json`).then((response) => { if (response.statusText === 'OK') { resolve(0); } }).catch((error) => reject(error));
});

export {
  getTankFish,
  getUserFish,
  getSingleFish,
  createFish,
  addFishOfTanks,
  updateFish,
  deleteFish,
  deleteFishofTanks,
};
