import React from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import './style.scss';
import {
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap';

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
        console.log(data);
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

    if (loading === true) {
      return 'Processing....';
    }

    if (!data.faceSentiments) {
      return;
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

    const {
      screenshot,
      data
    } = this.state;

    return (
      <Grid className="margin-top">
        <Row className="show-grid">
          <Col md={6}>
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width="100%"
              height="auto"
              videoConstraints={videoConstraints}
            />
            <Button
              bsSize="large"
              bsStyle="primary"
              className="margin-top"
              onClick={this.capture} >Capture photo</Button>
          </Col>
          <Col md={6}>
            {screenshot ? <img src={screenshot} alt="snapshot" /> : null}
            <h3>{this.sentimentText()}</h3>
          </Col>
        </Row>
      </Grid>
    );
  }
}

WebcamCapture.propTypes = {
  // onCapture: PropTypes.func.isRequired
};
