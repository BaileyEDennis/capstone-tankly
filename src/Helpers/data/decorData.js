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

const getTankDecor = (tankId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tank-decor.json?orderBy="decorId"&equalTo="${tankId}"`).then((response) => {
    const decorResponse = response.data;
    const decorArray = [];
    if (decorResponse) {
      Object.keys(decorResponse).forEach((item) => {
        decorArray.push(decorResponse[item]);
      });
    }
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createDecor = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/decor.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/decor/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const addDecorOfTanks = (dataObject) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/tank-decor.json`, dataObject).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/tank-decor/${response.data.name}.json`, update);
  }).catch((error) => reject(error));
});

const updateDecor = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/decor/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const deleteDecor = (firebaseKey) => axios.delete(`${baseUrl}/decor/${firebaseKey}.json`);

const deleteDecorofTanks = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/tank-decor/${firebaseKey}.json`).then((response) => { if (response.statusText === 'OK') { resolve(0); } }).catch((error) => reject(error));
});

export {
  getUserDecor,
  getSingleDecoration,
  getTankDecor,
  createDecor,
  addDecorOfTanks,
  updateDecor,
  deleteDecor,
  deleteDecorofTanks,
};
