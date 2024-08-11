import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Navbar} from "react-bootstrap";

export default function PortfolioNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavDropdown title="Profile" id="collapsible-nav-dropdown" className="custom-navbar">
                            <NavDropdown.Item href="/home">
                                Home
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/update">
                                Update Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/operation-history">
                                Operation history
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/">
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}