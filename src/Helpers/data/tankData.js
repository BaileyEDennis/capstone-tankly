import axios from 'axios';
import ApiKeys from '../apiKeys';
import { deleteFish } from './fishData';
import { deleteDecor } from './decorData';

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

const getTanks = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/tanks.json`)
    .then((response) => {
      const tanks = response.data;
      const tanksArray = [];
      if (tanks) {
        Object.keys(tanks).forEach((tankId) => {
          tanksArray.push(tanks[tankId]);
        });
      }
      resolve(tanksArray);
    })
    .catch((error) => reject(error));
});

const getFishInTanks = (tankId) => new Promise((resolve, reject) => {
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

const createTank = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/tanks.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/tanks/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updateTank = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/tanks/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const deleteTank = (tankId) => {
  getSingleTank(tankId).then((response) => {
    axios.delete(`${baseUrl}/tanks/${response.firebaseKey}.json`);
  });
  getTankDecors(tankId)
    .then((response) => {
      response.forEach((decor) => {
        deleteDecor(decor.decorId);
      });
    });
  getFishInTanks(tankId)
    .then((response) => {
      response.forEach((fish) => {
        deleteFish(fish.fishId);
      });
    });
};

export {
  getAllUserTanks,
  getTankDecors,
  getSingleTank,
  getTanks,
  getFishInTanks,
  createTank,
  updateTank,
  deleteTank,
};
