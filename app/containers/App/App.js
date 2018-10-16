/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Webcam from "react-webcam";

import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Header />
    <Webcam />
  </div>
);

export default App;
