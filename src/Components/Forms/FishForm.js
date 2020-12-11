import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../Helpers/data/authData';
import {
  createFish,
  updateFish,
  addFishOfTanks,
  getTankFish,
  deleteFishofTanks,
} from '../../Helpers/data/fishData';
import { getAllUserTanks, getTanks } from '../../Helpers/data/tankData';

export default class FishForm extends Component {
  state = {
    breed: this.props.fish?.breed || '',
    firebaseKey: this.props.fish?.firebaseKey || '',
    imageUrl: this.props.imageUrl?.imageUrl || '',
    notes: this.props.fish?.notes || '',
    sex: this.props.fish?.sex || '',
    private: this.props.fish?.private || false,
    userId: this.props.fish?.userId || '',
    tanks: [],
  };

  tankRef = React.createRef();

  privateRef = React.createRef();

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
      const newFish = {
        breed: this.state.breed,
        firebaseKey: this.state.firebaseKey,
        imageUrl: this.state.imageUrl,
        notes: this.state.notes,
        sex: this.state.sex,
        private: this.privateRef.current.value,
        userId: this.state.userId,
      };
      createFish(newFish).then((response) => {
        const tankFishObj = {
          tankId: this.tankRef.current.value,
          fishId: response.data.firebaseKey,
          userId: this.state.userId,
        };
        addFishOfTanks(tankFishObj);
      }).then(() => {
        this.props.onUpdate?.(this.props.tankId);
        this.setState({ success: true });
      });
    } else {
      getTanks(this.state.firebaseKey).then((response) => {
        response.forEach((item) => {
          const newArray = Object.values(item);
          if (newArray.includes(this.state.firebaseKey)) {
            deleteFishofTanks(item.firebaseKey);
          }
        });
      });
      const newFish = {
        breed: this.state.breed,
        firebaseKey: this.state.firebaseKey,
        imageUrl: this.state.imageUrl,
        notes: this.state.notes,
        sex: this.state.sex,
        private: this.privateRef.current.value,
        userId: this.state.userId,
      };
      updateFish(newFish).then((response) => {
        const tankFishObj = {
          tankId: this.tankRef.current.value,
          fishId: response.data.firebaseKey,
          userId: this.state.userId,
        };
        addFishOfTanks(tankFishObj);
      })
        .then(() => {
          getTankFish(this.state.firebaseKey).then((response) => {
            response.forEach((tankFish) => {
              deleteFishofTanks(tankFish.firebaseKey);
            });
          });
          this.props.onUpdate?.(this.props.fish.firebaseKey);
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
            Your Fish was Created
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
        <label>Fish Breed</label>
          <div>
            <input
              type='text'
              name='breed'
              value={this.state.breed}
              onChange={this.handleChange}
              placeholder='Fish Breed'
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
          <label>Gender</label>
          <div>
            <input
              type='text'
              name='sex'
              value={this.state.sex}
              onChange={this.handleChange}
              placeholder='Gender'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label>Public or Private</label>
          <select ref={this.privateRef} className='form-control form-control-lg m-2' required>
            <option value='true'>Private</option>
            <option value='false'>Public</option>
          </select>
          <label>Select A Board</label>
          <select ref={this.tankRef} label='Select A Board'className='form-control form-control-lg m-2'>
            {Object.keys(tanks).length
            && tanks.map((tank) => (
              <option key={tank.firebaseKey} value={tank.firebaseKey}>{tank.name}</option>
            ))}
          </select>
          <label>Add an Image</label>
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
