import React from 'react'
import logo from '../../logo.png';
import styled from 'styled-components';

const Logo = styled.img`
  margin: 0 auto;
`

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Logo src={logo} alt="Catch'Em All" className="navbar-brand align-item-center" />
      </nav>
    </div>
  );
}

export default NavBar;