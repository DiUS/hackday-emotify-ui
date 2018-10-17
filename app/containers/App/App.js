/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Webcam from "react-webcam";
import Header from 'components/Header';
import WebcamCapture from 'components/webcamCapture';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Header />
    <WebcamCapture />
  </div>
);

export default App;
