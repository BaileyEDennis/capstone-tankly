import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TankCard extends Component {
  render() {
    const { tank } = this.props;

    return (
      <div className="Goat col-3" id={tank.firebaseKey}>
        <div className="card">
          <Link to={`/tanks/${tank.firebaseKey}`}>
          <img src={tank.imageUrl} className="card-img-top" alt="..." />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{tank.name}</h5>
            <p className="card-text">{tank.description}</p>
              <div className='card-btns'>
                <Link className='btn btn-info' to={`/tanks/${tank.firebaseKey}`}><i className="far fa-edit"></i></Link>
                <Link className='btn btn-danger' to={`/tanks/${tank.firebaseKey}`}><i className="far fa-trash-alt"></i></Link>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
