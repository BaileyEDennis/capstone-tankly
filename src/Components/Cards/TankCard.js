import React from 'react';
import { Link } from 'react-router-dom';
import AppModal from '../Modal';
import TankForm from '../Forms/TankForm';

export default function DecorCard({ tank, tankDataFunc, onUpdate }) {
  return (
    <div className="Fish" id={tank.firebaseKey}>
      <div className="card">
        <Link to={`/tanks/${tank.firebaseKey}`}>
          <img src={tank.imageUrl} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{tank.name}</h5>
          <p className="card-text">{tank.description}</p>
          <div className="card-btns">
            <AppModal
              title={'Update Your Aquarium'}
              buttonLabel={'Update tank'}
            >
              <TankForm tank={tank} onUpdate={onUpdate}></TankForm>
            </AppModal>
            <button onClick={ () => { tankDataFunc(tank.firebaseKey); } }className='btn btn-dark delete-tank'>
          <i className='far fa-trash-alt'></i> Delete tank
        </button>
          </div>
        </div>
      </div>
    </div>
  );
}
