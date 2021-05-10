import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from 'react-bootstrap';

const NavbarContainer = () => {
  const [user, setUser] = useState('');

  const getAuthedStatus = () => {
    fetch('/secret')
      .then((response) => response.json())
      .then((response) => {
        console.log(typeof response);
        setUser(response);
      });
  };

  const renderContent = (user) => {
    if (typeof user === 'number') {
      return (
        <div>
          <Nav>
            <Nav.Link href="/auth/logout">Logout</Nav.Link>
          </Nav>
        </div>
      );
    } else {
      return (
        <div>
          <Nav>
            <Nav.Link href="/auth/google">Login</Nav.Link>
          </Nav>
        </div>
      );
    }
  };

  // useEffect(() => {

  // }, [])
  // console.log('this is the func');
  getAuthedStatus();
  return (
    <div>
      <Navbar bg="primary" expand="lg" className="p-2" variant="dark">
        <Navbar.Brand href="#home">OneNumber Net Worth tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="navbar">{renderContent(user)}</div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarContainer;
