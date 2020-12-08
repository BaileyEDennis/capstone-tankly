import React from 'react';
import { getUserDecor } from '../../Helpers/data/decorData';
import DecorCard from '../../Components/Cards/DecorCard';
import Loader from '../../Components/Loader';
import getUid from '../../Helpers/data/authData';
import AppModal from '../../Components/Modal';

export default class Decor extends React.Component {
  state = {
    decorations: [],
    loading: true,
  };

  componentDidMount() {
    this.getDecs();
  }

  getDecs = () => {
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
    const showDecor = () => decorations.map((decor) => (
      <DecorCard key={decor.firebaseKey} decor={decor} onUpdate={this.getDecs} />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Add some Decoration'} buttonLabel={'Add Décor'}>
          </AppModal>
            <h2>Your Décor</h2>
            <div className="d-flex flex-wrap container">{showDecor()}</div>
          </>
        )}
      </>
    );
  }
}
