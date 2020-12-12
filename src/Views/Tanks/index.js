import React from 'react';
import {
  getAllUserTanks,
  deleteTank,
  getTankDecors,
  getFishInTanks,
} from '../../Helpers/data/tankData';
import TankCard from '../../Components/Cards/TankCard';
import TankForm from '../../Components/Forms/TankForm';
import Loader from '../../Components/Loader';
import getUid from '../../Helpers/data/authData';
import AppModal from '../../Components/Modal';
import { deleteFishofTanks } from '../../Helpers/data/fishData';
import { deleteDecorofTanks } from '../../Helpers/data/decorData';

export default class Tanks extends React.Component {
  state = {
    tanks: [],
    loading: true,
  };

  componentDidMount() {
    this.getTanks();
  }

  getTanks = () => {
    const currentUserId = getUid();
    getAllUserTanks(currentUserId).then((response) => {
      this.setState(
        {
          tanks: response,
        },
        this.setLoading,
      );
    });
  };

  deleteATank = (firebaseKey) => {
    deleteTank(firebaseKey);
    getTankDecors(firebaseKey).then((response) => {
      response.forEach((dec) => {
        deleteDecorofTanks(dec.firebaseKey);
      });
    });
    getFishInTanks(firebaseKey).then((response) => {
      response.forEach((fish) => {
        deleteFishofTanks(fish.firebaseKey);
      });
    }).then(
      this.getTanks,
    );
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { tanks, loading } = this.state;
    const showTanks = () => tanks.map((tank) => (
        <TankCard key={tank.firebaseKey} tank={tank} tankDataFunc={this.deleteATank} onUpdate={this.getTanks}/>
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className='tank-page'>
            <h2>My Aquariums</h2>
          <AppModal title={'Create a new aquarium'} buttonLabel={'New Tank'}>
            <TankForm onUpdate={this.getTanks}/>
          </AppModal>
            <div className="d-flex justify-content-start card-area">{showTanks()}</div>
          </div>
        )}
      </>
    );
  }
}
