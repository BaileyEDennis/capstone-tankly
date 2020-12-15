import React from 'react';
import { getAllUserTanks } from '../../Helpers/data/tankData';
import TankCard from '../../Components/Cards/TankCard';
import Loader from '../../Components/Loader';
import getUid from '../../Helpers/data/authData';
import AppModal from '../../Components/Modal';

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
        <TankCard key={tank.firebaseKey} tank={tank} />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className='tank-page'>
          <AppModal title={'Create Tank'} buttonLabel={'Create Tank'}>
          </AppModal>
            <h2>My Aquariums</h2>
            <div className="d-flex flex-wrap container card-area">{showTanks()}</div>
          </div>
        )}
      </>
    );
  }
}
