import React from 'react';
import ReactDOM from 'react-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from 'react-bootstrap';

const NavbarContainer = () => {
  return (
    <div>
      <Navbar bg="primary" expand="lg" className='p-2' variant="dark">
        <Navbar.Brand href="#home">OneNumber Net Worth tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarContainer;
