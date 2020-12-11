import React from 'react';
import {
  deleteDecor,
  getTankDecor,
  getUserDecor,
  deleteDecorofTanks,
} from '../../Helpers/data/decorData';
import DecorCard from '../../Components/Cards/DecorCard';
import Loader from '../../Components/Loader';
import getUid from '../../Helpers/data/authData';
import AppModal from '../../Components/Modal';
import DecorForm from '../../Components/Forms/DecorForm';

export default class Decor extends React.Component {
  state = {
    decorations: [],
    loading: true,
  };

  deleteADecoration = (firebaseKey) => {
    deleteDecor(firebaseKey);
    getTankDecor(firebaseKey).then((response) => {
      response.forEach((fish) => {
        deleteDecorofTanks(fish.firebaseKey);
      });
    });
    this.getDecor();
  }

  componentDidMount() {
    this.getDecor();
  }

  getDecor = () => {
    const currentUserId = getUid();
    getUserDecor(currentUserId).then((response) => {
      this.setState(
        {
          decorations: response,
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
    const { decorations, loading } = this.state;
    const showDecor = () => decorations.map((dec) => (
      <DecorCard key={dec.firebaseKey} decor={dec} decorDataFunc={this.deleteADecoration} onUpdate={this.getDecor} />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Add some Decoration'} buttonLabel={'Add Decor'}>
            <DecorForm onUpdate={this.getDecor}/>
          </AppModal>
            <h2>Your Decor</h2>
            <div className="d-flex flex-wrap container">{showDecor()}</div>
          </>
        )}
      </>
    );
  }
}
