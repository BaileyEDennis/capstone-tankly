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

export default getAllUserTanks;
