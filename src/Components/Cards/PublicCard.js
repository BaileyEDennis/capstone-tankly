import React from 'react';

export default function PublicTankCard({ tank, pubDataFunc }) {
  return (
    <div className="Fish col-3" id={tank.firebaseKey}>
      <div className="card">
        <img src={tank.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{tank.name}</h5>
          <p className="card-text">{tank.description}</p>
          <div className="reaction-button">
          <button onClick={ () => { pubDataFunc(tank.firebaseKey); } }
            className='btn btn-dark like-tank'>
            <i className="far fa-thumbs-up"></i>
          </button>
            <p>Likes: {tank.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
