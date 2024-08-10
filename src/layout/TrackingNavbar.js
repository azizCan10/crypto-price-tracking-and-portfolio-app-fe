import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Navbar} from "react-bootstrap";

export default function TrackingNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavDropdown title="Hesap" id="collapsible-nav-dropdown" className="custom-navbar">
                            <NavDropdown.Item href="/home">
                                Ana Sayfa
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/operation-history">
                                İşlem geçmişi
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/">
                                Çıkış yap
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}