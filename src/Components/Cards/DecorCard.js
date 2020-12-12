import React from 'react';
import AppModal from '../Modal';
import DecorForm from '../Forms/DecorForm';

export default function DecorCard({ decor, decorDataFunc, onUpdate }) {
  return (
    <div className="Goat col-3" id={decor.firebaseKey}>
      <div className="card">
        <img src={decor.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{decor.name}</h5>
          <p className="card-text">Type: {decor.type}</p>
          <div id="notes">
          <h6>Notes:</h6>
          <p className="card-text">{decor.notes}</p>
          </div>
          <div className="card-btns">
            <AppModal
              title={'Update Your Decorations'}
              buttonLabel={'Update Decor'}
            >
              <DecorForm decor={decor} onUpdate={onUpdate}></DecorForm>
            </AppModal>
            <button onClick={ () => { decorDataFunc(decor.firebaseKey); } }className='btn btn-dark delete-decoration'>
          <i className='far fa-trash-alt'></i> Delete decor
        </button>
          </div>
        </div>
      </div>
    </div>
  );
}
