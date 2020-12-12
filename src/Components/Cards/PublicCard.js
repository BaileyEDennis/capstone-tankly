import React from 'react';
import { updateTankLikes } from '../../Helpers/data/tankData';

export default class PublicTankCard extends React.Component {
  state = {
    count: this.props.tank?.likes,
    userId: this.props.tank?.userId,
    tankId: this.props.tank?.firebaseKey,
    liked: false,
  };

  addMe = (e) => {
    e.preventDefault();
    const newCount = this.state.count + 1;
    if (this.state.liked !== true) {
      this.setState({
        count: newCount,
        liked: true,
      });
      this.btn.setAttribute('disabled', 'disabled');
      const updateObj = {
        likes: newCount,
        firebaseKey: this.state.tankId,
      };
      updateTankLikes(updateObj);
    } else {
      const minusCount = this.state.count - 1;
      this.setState({
        count: minusCount,
        liked: false,
      });
      this.btn.removeAttribute('disabled', 'disabled');
      const minusObj = {
        likes: minusCount,
        firebaseKey: this.state.tankId,
      };
      updateTankLikes(minusObj);
    }
  }

  render() {
    const { tank } = this.props;
    const { count } = this.state;
    return (
      <div className="PubTank" id={tank.firebaseKey}>
        <div className="card">
          <img src={tank.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{tank.name}</h5>
            <p className="card-text">{tank.description}</p>
            <div className="reaction-button">
              <button
                ref={(btn) => {
                  this.btn = btn;
                }}
                onClick={this.addMe}
                className="btn btn-dark like-tank"
              >
                <i className="far fa-thumbs-up"> Likes: {count}</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
