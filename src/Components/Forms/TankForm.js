import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../Helpers/data/authData';
import { createTank, updateTank, getAllUserTanks } from '../../Helpers/data/tankData';

export default class TankForm extends Component {
  state = {
    description: this.props.tank?.description || '',
    firebaseKey: this.props.tank?.firebaseKey || '',
    imageUrl: this.props.tank?.imageUrl || '',
    name: this.props.tank?.name || '',
    private: this.props.fish?.private || false,
    userId: this.props.tank?.UserId || '',
    tanks: [],
  }

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
      const newTank = {
        description: this.state.description,
        firebaseKey: this.state.firebaseKey,
        imageUrl: this.state.imageUrl,
        name: this.state.name,
        private: this.privateRef.current.value,
        userId: this.state.userId,
      };
      createTank(newTank).then(() => {
        this.props.onUpdate?.(this.props.tankId);
        this.setState({ success: true });
      });
    } else {
      const newTank = {
        description: this.state.description,
        firebaseKey: this.state.firebaseKey,
        imageUrl: this.state.imageUrl,
        name: this.state.name,
        private: this.privateRef.current.value,
        userId: this.state.userId,
      };
      updateTank(newTank).then(() => {
        this.props.onUpdate?.(this.props.fish.firebaseKey);
        this.setState({ success: true });
      });
    }
  };

  tanksResponse = (userId) => (
    getAllUserTanks(userId).then((response) => response)
  );

  render() {
    const { success } = this.state;

    return (
      <>
        {success && (
          <div className='alert alert-success' role='alert'>
            Your Tank was Created
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
        <label>Tank Name</label>
          <div>
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              placeholder='Your tank name'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label><strong>description</strong></label>
          <div>
            <input
              type='text'
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
              placeholder='A breif description'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label>Public or Private</label>
          <select ref={this.privateRef} className='form-control form-control-lg m-2' required>
            <option value='true'>Private</option>
            <option value='false'>Public</option>
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
