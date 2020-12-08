import React from 'react';
import AppModal from '../Modal';
import FishForm from '../Forms/FishForm';

export default function FishCard({ fish, fishDataFunc, onUpdate }) {
  return (
    <div className="Goat col-3" id={fish.firebaseKey}>
      <div className="card">
        <img src={fish.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{fish.breed}</h5>
          <p className="card-text">Sex: {fish.sex}</p>
          <p className="card-text">{fish.notes}</p>
          <div className="card-btns">
            <AppModal
              title={'Update Pin'}
              buttonLabel={'Update Pin'}
              btnColor={'info'}
              icon={'fa-plus-circle'}
            >
              <FishForm fish={fish} onUpdate={onUpdate}></FishForm>
            </AppModal>
            <button onClick={ () => { fishDataFunc(fish.firebaseKey); } }className='btn btn-dark delete-fishy'>
          <i className='far fa-trash-alt'></i> Delete fish
        </button>
          </div>
        </div>
      </div>
    </div>
  );
}
