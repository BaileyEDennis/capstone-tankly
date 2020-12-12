import { Component } from 'react';
import { getPublicTanks, updateTank, getSingleTank } from '../../Helpers/data/tankData';
import PublicTankCard from '../../Components/Cards/PublicCard';
import Loader from '../../Components/Loader';

export default class PublicTanks extends Component {
  state = {
    pubTanks: [],
    loading: true,
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

  setLikes = (firebaseKey) => {
    getSingleTank(firebaseKey).then((response) => {
      updateTank({
        likes: response.likes + 1,
        firebaseKey,
      });
    }).then(
      this.getPubTanks,
    );
  }

  render() {
    const { pubTanks, loading } = this.state;
    const showTanks = () => pubTanks.map((tank) => <PublicTankCard key={tank.firebaseKey} tank={tank} pubDataFunc={this.setLikes} onUpdate = {this.getPubTanks}/>);
    return (
      <>
        {loading ? (
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
