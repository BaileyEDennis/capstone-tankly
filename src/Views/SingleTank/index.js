import React from 'react';
import getUid from '../../Helpers/data/authData';
import {
  getSingleDecoration,
  deleteDecor,
  getTankDecor,
  deleteDecorofTanks,
  getUserDecor,
} from '../../Helpers/data/decorData';
import { getTankDecors, getSingleTank, getFishInTanks } from '../../Helpers/data/tankData';
import {
  getSingleFish,
  getTankFish,
  deleteFish,
  deleteFishofTanks,
  getUserFish,
} from '../../Helpers/data/fishData';
import DecorCard from '../../Components/Cards/DecorCard';
import FishCard from '../../Components/Cards/FishCard';

export default class SingleTank extends React.Component {
  state = {
    tank: {},
    decor: [],
    fish: [],
  };

  deleteAFish = (firebaseKey) => {
    deleteFish(firebaseKey);
    getTankFish(firebaseKey).then((response) => {
      response.forEach((fish) => {
        deleteFishofTanks(fish.firebaseKey);
      });
    }).then(
      this.setFish(),
    );
  }

  deleteADecoration = (firebaseKey) => {
    deleteDecor(firebaseKey);
    getTankDecor(firebaseKey).then((response) => {
      response.forEach((fish) => {
        deleteDecorofTanks(fish.firebaseKey);
      });
    }).then(
      this.setDecor(),
    );
  }

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

  getFish = (tankId) => getFishInTanks(tankId).then((response) => {
    const fishArray = [];
    response.forEach((item) => {
      fishArray.push(getSingleFish(item.fishId));
    });
    return Promise.all([...fishArray]);
  });

  setFish = () => {
    const currentUserId = getUid();
    getUserFish(currentUserId).then((response) => {
      this.setState(
        {
          fish: response,
        },
      );
    });
  };

  setDecor = () => {
    const currentUserId = getUid();
    getUserDecor(currentUserId).then((response) => {
      this.setState(
        {
          decorations: response,
        },
      );
    });
  };

  render() {
    const { decor, fish, tank } = this.state;
    const renderDecor = () => decor.map((dec) => (
      <DecorCard key={dec.firebaseKey}
      decor={dec}
      onUpdate={this.setDecor}
      decorDataFunc={this.deleteADecoration} />));
    const renderFish = () => fish.map((ghoti) => (
      <FishCard key={ghoti.firebaseKey}
      fish={ghoti}
      onUpdate={this.setFish}
      fishDataFunc={this.deleteAFish} />));
    return (
      <div>
        <h1>{tank.name}</h1>
        <div className="d-flex flex-wrap container">{renderDecor()}</div>
        <div className="d-flex flex-wrap container">{renderFish()}</div>
      </div>
    );
  }
}
