import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DecorCard extends Component {
  render() {
    const { decor } = this.props;

    return (
      <div className="Goat col-3" id={decor.firebaseKey}>
        <div className="card">
          <img src={decor.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{decor.Name}</h5>
            <p className="card-text">Type: {decor.type}</p>
            <p className="card-text">{decor.notes}</p>
              <div className='card-btns'>
                <Link className='btn btn-info' to={`/decor/${decor.firebaseKey}`}><i className="far fa-edit"></i></Link>
                <Link className='btn btn-danger' to={`/decor/${decor.firebaseKey}`}><i className="far fa-trash-alt"></i></Link>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
