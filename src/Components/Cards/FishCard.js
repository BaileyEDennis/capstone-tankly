import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FishCard extends Component {
  render() {
    const { fish } = this.props;

    return (
      <div className="Goat col-3" id={fish.firebaseKey}>
        <div className="card">
          <img src={fish.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{fish.breed}</h5>
            <p className="card-text">Sex: {fish.sex}</p>
            <p className="card-text">{fish.notes}</p>
              <div className='card-btns'>
                <Link className='btn btn-info' to={`/fish/${fish.firebaseKey}`}><i className="far fa-edit"></i></Link>
                <Link className='btn btn-danger' to={`/fish/${fish.firebaseKey}`}><i className="far fa-trash-alt"></i></Link>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
