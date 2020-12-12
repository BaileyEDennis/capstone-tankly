import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../Helpers/data/authData';
import {
  createDecor,
  updateDecor,
  addDecorOfTanks,
  getTankDecor,
  deleteDecorofTanks,
} from '../../Helpers/data/decorData';
import { getAllUserTanks, getTanks } from '../../Helpers/data/tankData';

export default class DecorForm extends Component {
  state = {
    name: this.props.decor?.name || '',
    firebaseKey: this.props.decor?.firebaseKey || '',
    imageUrl: this.props.decor?.imageUrl || '',
    notes: this.props.decor?.notes || '',
    type: this.props.decor?.type || '',
    userId: this.props.decor?.userId || '',
    tanks: [],
  };

  tankRef = React.createRef();

  componentDidMount() {
    const userId = getUser();
    this.setState({ userId });
    this.tanksResponse(userId).then((response) => {
      this.setState({
        userId,
        tanks: response,
      });
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `tankly/${this.state.userId}/${Date.now()}${e.target.files[0].name}`,
      );

      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.btn.setAttribute('disabled', 'disabled');
    if (this.state.firebaseKey === '') {
      const newDecor = {
        name: this.state.name,
        firebaseKey: this.state.firebaseKey,
        imageUrl: this.state.imageUrl,
        notes: this.state.notes,
        type: this.state.type,
        userId: this.state.userId,
      };
      createDecor(newDecor).then((response) => {
        const tankDecorObj = {
          tankId: this.tankRef.current.value,
          decorId: response.data.firebaseKey,
          userId: this.state.userId,
        };
        addDecorOfTanks(tankDecorObj);
      }).then(() => {
        this.props.onUpdate?.(this.props.tankId);
        this.setState({ success: true });
      });
    } else {
      getTanks(this.state.firebaseKey).then((response) => {
        response.forEach((item) => {
          const newArray = Object.values(item);
          if (newArray.includes(this.state.firebaseKey)) {
            deleteDecorofTanks(item.firebaseKey);
          }
        });
      });
      const newDecor = {
        name: this.state.name,
        firebaseKey: this.state.firebaseKey,
        imageUrl: this.state.imageUrl,
        notes: this.state.notes,
        type: this.state.type,
        userId: this.state.userId,
      };
      updateDecor(newDecor).then((response) => {
        const tankDecorObj = {
          tankId: this.tankRef.current.value,
          decorId: response.data.firebaseKey,
          userId: this.state.userId,
        };
        addDecorOfTanks(tankDecorObj);
      })
        .then(() => {
          getTankDecor(this.state.firebaseKey).then((response) => {
            response.forEach((tankDecor) => {
              deleteDecorofTanks(tankDecor.firebaseKey);
            });
          });
          this.props.onUpdate?.(this.props.decor.firebaseKey);
          this.setState({ success: true });
        });
    }
  };

  tanksResponse = (userId) => (
    getAllUserTanks(userId).then((response) => response)
  );

  render() {
    const { success, tanks } = this.state;

    return (
      <>
        {success && (
          <div className='alert alert-success' role='alert'>
            Success!
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
        <label><strong>Decor Name</strong></label>
          <div>
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              placeholder='Decoration Name'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label><strong>Notes</strong></label>
          <div>
            <input
              type='text'
              name='notes'
              value={this.state.notes}
              onChange={this.handleChange}
              placeholder='notes'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label><strong>Type</strong></label>
          <div>
            <input
              type='text'
              name='type'
              value={this.state.type}
              onChange={this.handleChange}
              placeholder='Plant, decoration, etc...'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label><strong>Select A Board</strong></label>
          <select ref={this.tankRef} label='Select A Board'className='form-control form-control-lg m-2'>
            {Object.keys(tanks).length
            && tanks.map((tank) => (
              <option key={tank.firebaseKey} value={tank.firebaseKey}>{tank.name}</option>
            ))}
          </select>
          <label><strong>Add an Image</strong></label>
          <div>
            <input
              type='url'
              name='imageUrl'
              value={this.state.imageUrl}
              onChange={this.handleChange}
              placeholder='Enter an Image URL or Upload a File'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <div>
            <input
              className='m-2'
              type='file'
              id='myFile'
              name='filename'
              accept='image/*'
              onChange={this.handleChange}
            />
          </div>
          <button
            ref={(btn) => {
              this.btn = btn;
            }}
            className='btn btn-primary m-2'
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}
