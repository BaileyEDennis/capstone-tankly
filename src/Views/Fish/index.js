import React from 'react';
import {
  getUserFish,
  deleteFish,
  getTankFish,
  deleteFishofTanks,
} from '../../Helpers/data/fishData';
import FishCard from '../../Components/Cards/FishCard';
import Loader from '../../Components/Loader';
import { getUid } from '../../Helpers/data/authData';
import AppModal from '../../Components/Modal';
import FishForm from '../../Components/Forms/FishForm';

export default class Fish extends React.Component {
  state = {
    fishes: [],
  };

  deleteAFish = (firebaseKey) => {
    deleteFish(firebaseKey);
    getTankFish(firebaseKey).then((response) => {
      response.forEach((fish) => {
        deleteFishofTanks(fish.firebaseKey);
      });
    });
    this.getFish();
  }

  componentDidMount() {
    this.getFish();
  }

  getFish = () => {
    const currentUserId = getUid();
    getUserFish(currentUserId).then((response) => {
      this.setState(
        {
          fishes: response,
        },
      );
    });
  };

  render() {
    const { fishes } = this.state;
    const showFish = () => fishes.map((fish) => (
      <FishCard key={fish.firebaseKey} fish={fish} fishDataFunc={this.deleteAFish} onUpdate={this.getFish} />
    ));
    return (
      <>
        {fishes.length === 0 ? (
          <Loader />
        ) : (
          <div className="fishy-page">
            <h2>Your Fish</h2>
            <AppModal title={'Add fish to your Aquarium'} buttonLabel={'New Fish'}>
              <FishForm onUpdate={this.getFish}/>
            </AppModal>
            <div className="d-flex justify-content-start card-area">{showFish()}</div>
          </div>
        )}
      </>
    );
  }
}
