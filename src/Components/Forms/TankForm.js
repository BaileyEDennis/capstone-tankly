import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../Helpers/data/authData';

export default class BoardForm extends Component {
  state = {
    firebaseKey: this.props.board?.firebaseKey || '',
    name: this.props.board?.name || '',
    imageUrl: this.props.board?.imageUrl || '',
    userId: this.props.board?.userId || '',
    description: this.props.board?.description || '',
  }

  componentDidMount() {
    const userId = getUser();
    this.setState({ userId });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imagesRef = storageRef.child(`pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);

      imagesRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.btn.setAttribute('disabled', 'disabled');
  }

  render() {
    const { success } = this.state;
    return (
      <>
      { success && (<div className="alert alert-success" role="alert">Your Board was Updated/Created</div>)
      }
      <form onSubmit={this.handleSubmit}>
        <div>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Board Name'
          className="form-control form-control-lg m-1"
          required
        />
        </div>
        <div>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Board Description'
          className="form-control form-control-lg m-1"
          required
        />
        </div>
        <div>
        <input
          type='url'
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className="form-control form-control-lg m-1"
          required
        />
        </div>
        <div>
         <input className="m-2" type="file" id="myFile" name="filename" accept="image/*" onChange={this.handleChange} />
         </div>
         <button ref={(btn) => { this.btn = btn; }} className="btn btn-primary m-2">Submit</button>
      </form>
      </>
    );
  }
}
