import React from 'react';
import Banner from './images/banner.jpg';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <a href="#">
          <img src={Banner} alt="react-redux-boilerplate - Logo" />
        </a>
      </div>
    );
  }
}

export default Header;
