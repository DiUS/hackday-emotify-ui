import React from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import './style.scss';

export default class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      screenshot: null,
      data: {}
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ screenshot: imageSrc });
    const url = 'https://us-central1-emotify-219203.cloudfunctions.net/http';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: imageSrc.substr(23)
      })
    };

    this.setState({ loading: true });

    fetch(url, options).then((res) => {
      res.json().then(data => {
        this.setState({
          data,
          loading: false
        });
      });
    });
  };

  sentimentText() {
    const {
      data,
      loading
    } = this.state;

    if (!data.faceSentiments) {
      return;
    }

    if (loading === true) {
      return 'Processing....';
    }

    const face = data.faceSentiments[0];

    if (!face) {
      return 'No faces detected';
    }

    switch (face.happyIndex) {
      case 1:
        return 'You are happy ;)';
        break;
      case -1:
        return 'You are unhappy ;(';
      default:
        return 'You have no feeling :|'
    }
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };

    return (
      <div>
        <div className="wrapper">
          <Webcam
            audio={false}
            height={550}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={550}
            videoConstraints={videoConstraints}
          />
          {this.state.screenshot ? <img src={this.state.screenshot} className="snapshot" alt="snapshot" /> : null}
        </div>
        <button onClick={this.capture} >Capture photo</button>
        <h3>{this.sentimentText()}</h3>
      </div>
    );
  }
}

WebcamCapture.propTypes = {
  // onCapture: PropTypes.func.isRequired
};
