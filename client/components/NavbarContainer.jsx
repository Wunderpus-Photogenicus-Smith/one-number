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
import PlaidLinkButton from './SpaceFiller.jsx';


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
          <Nav >
            <Nav.Link
              href="/auth/logout"
              className="btn float-right"
              style={{ float: 'right' }}
            >
              Logout
            </Nav.Link>
            <PlaidLinkButton />
          </Nav>
        </div>
      );
    } else {
      return (
        <div>
          <Nav className="mr-auto">
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
      <Navbar  bg="dark" variant="dark" expand="lg" className="p-2" padding={13}  position='static' color='inherit' >
        <Navbar.Brand href="/landing"> OneNumber</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" align='right'>
          <div>{renderContent(user)}</div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarContainer;
