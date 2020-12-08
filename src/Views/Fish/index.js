import React from 'react';
import { getUserFish } from '../../Helpers/data/fishData';
import FishCard from '../../Components/Cards/FishCard';
import Loader from '../../Components/Loader';
import getUid from '../../Helpers/data/authData';
import AppModal from '../../Components/Modal';
import FishForm from '../../Components/Forms/FishForm';

export default class Fish extends React.Component {
  state = {
    fishes: [],
    loading: true,
  };

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
        this.setLoading,
      );
    });
  };

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { fishes, loading } = this.state;
    const showFish = () => fishes.map((fish) => (
      <FishCard key={fish.firebaseKey} fish={fish} onUpdate={this.getDecs} />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Add some Decoration'} buttonLabel={'Add Fish'}>
            <FishForm onUpdate={this.getFish}/>
          </AppModal>
            <h2>Your Fish</h2>
            <div className="d-flex flex-wrap container">{showFish()}</div>
          </>
        )}
      </>
    );
  }
}
