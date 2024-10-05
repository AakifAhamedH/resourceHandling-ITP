import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="text-dark"><i>NELCO</i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/AddResource" className="text-dark">Add New Resource</Nav.Link>
            <span className="mx-2">|</span>
            <Nav.Link as={NavLink} to="/ResourceShedule" className="text-dark">Add Maintenance & Cost</Nav.Link>
            <span className="mx-2">|</span>
            <Nav.Link as={NavLink} to="/AddChemicals" className="text-dark">Add Chemical Resource</Nav.Link>
            <span className="mx-2">|</span>
            <Nav.Link as={NavLink} to="/Recent" className="text-dark">View Resource</Nav.Link>
            <span className="mx-2">|</span>
            <Nav.Link as={NavLink} to="/Shedule" className="text-dark">Resource Maintenance & Cost Records</Nav.Link>
            <span className="mx-2">|</span>
            <Nav.Link as={NavLink} to="/ViewChemicals" className="text-dark">Chemical Resource Records</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
