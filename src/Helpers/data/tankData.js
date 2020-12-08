import axios from 'axios';
import ApiKeys from '../apiKeys';

const baseUrl = ApiKeys.databaseURL;

const getAllUserTanks = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/tanks.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const getTankDecors = (tankId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tank-decor.json?orderBy="tankId"&equalTo="${tankId}"`).then((response) => {
    const tankResponse = response.data;
    const tankArray = [];
    if (tankResponse) {
      Object.keys(tankResponse).forEach((item) => {
        tankArray.push(tankResponse[item]);
      });
    }
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleTank = (tankId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tanks/${tankId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getAllUserTanks, getTankDecors, getSingleTank };
