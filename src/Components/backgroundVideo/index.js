import React from 'react';
import vid from '../../images/Burning.webm';

export default class BgVid extends React.Component {
  render() {
    return (
      <div className='video-container'>
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        >
      <source src={vid} type='video/webm' />
      </video>
      </div>
    );
  }
}
