import { Component } from 'react';
import { getPublicTanks } from '../../Helpers/data/tankData';
import PublicTankCard from '../../Components/Cards/PublicCard';
import Loader from '../../Components/Loader';

export default class PublicTanks extends Component {
  state = {
    pubTanks: [],
  };

  componentDidMount() {
    this.getPubTanks();
  }

  getPubTanks = () => {
    getPublicTanks().then((resp) => {
      this.setState(
        {
          pubTanks: resp,
        },
      );
    });
  };

  render() {
    const { pubTanks } = this.state;
    const showTanks = () => pubTanks.map((tank) => <PublicTankCard key={tank.firebaseKey} tank={tank} onUpdate = {this.getPubTanks} />);
    return (
      <>
        {pubTanks.length === 0 ? (
          <Loader />
        ) : (
          <div className='public-page'>
            <h2>New on Tankly</h2>
            <div className="d-flex justify-content-start card-area">{showTanks()}</div>
          </div>
        )}
       </>
    );
  }
}
