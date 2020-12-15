import React from 'react';
import { getSingleDecoration } from '../../Helpers/data/decorData';
import { getTankDecors, getSingleTank } from '../../Helpers/data/tankData';
import { getTankFish, getSingleFish } from '../../Helpers/data/fishData';
import DecorCard from '../../Components/Cards/DecorCard';
import FishCard from '../../Components/Cards/FishCard';
// import TankForm from '../../Components/Forms/TankForm';
// import AppModal from '../../Components/Modal';

export default class SingleTank extends React.Component {
  state = {
    tank: {},
    decor: [],
    fish: [],
  };

  componentDidMount() {
    const TankId = this.props.match.params.id;
    this.getTankInfo(TankId);
    this.getDecor(TankId)
      .then((resp) => this.setState({ decor: resp }));
    this.getFish(TankId)
      .then((resp) => this.setState({ fish: resp }));
  }

  getTankInfo = (tankId) => {
    getSingleTank(tankId).then((response) => {
      this.setState({
        tank: response,
      });
    });
  };

  getDecor = (tankId) => getTankDecors(tankId).then((response) => {
    const decorArray = [];
    response.forEach((item) => {
      decorArray.push(getSingleDecoration(item.decorId));
    });
    return Promise.all([...decorArray]);
  });

  getFish = (tankId) => getTankFish(tankId).then((response) => {
    const fishArray = [];
    response.forEach((item) => {
      fishArray.push(getSingleFish(item.fishId));
    });
    return Promise.all([...fishArray]);
  });

  render() {
    const { decor, fish, tank } = this.state;
    const renderDecor = () => decor.map((dec) => (<DecorCard key={dec.firebaseKey} decor={dec} onUpdate={this.getDecor}/>));
    const renderFish = () => fish.map((ghoti) => (<FishCard key={ghoti.firebaseKey} fish={ghoti} />));
    return (
      <div>
        {/* <AppModal
          title={'Update Board'}
          buttonLabel={'Update Board'}
          btnColor={'danger'}
          icon={'fa-plus-circle'}
        >
          {Object.keys(tank).length && (
            <TankForm tank={tank} onUpdate={this.getTankInfo} />
          )}
        </AppModal> */}
        <h1>{tank.name}</h1>
        <div className="d-flex flex-wrap container">{renderDecor()}</div>
        <div className="d-flex flex-wrap container">{renderFish()}</div>
      </div>
    );
  }
}
