import firebase from 'firebase/app';
import axios from 'axios';
import 'firebase/auth';
import ApiKeys from '../apiKeys';

const baseUrl = ApiKeys.databaseURL;

const getUid = () => firebase.auth().currentUser?.uid;

const createUser = (user) => {
  axios
    .get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((resp) => {
      if (Object.values(resp.data).length === 0) {
        axios.post(`${baseUrl}/users.json`, user)
          .then((response) => {
            const update = { firebaseKey: response.data.name };
            axios.patch(`${baseUrl}/users/${response.data.name}.json`, update);
          }).catch((error) => console.warn(error));
      }
      window.sessionStorage.setItem('ua', true);
    })
    .catch((error) => console.error(error));
};
export { getUid, createUser };
