import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Weather App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Current Weather</Nav.Link>
                        <Nav.Link href="/forecast">Forecast</Nav.Link>
                        <Nav.Link href="/stats">Statistics</Nav.Link>
                        <Nav.Link href="/userinfo">User Info</Nav.Link>
                        <Nav.Link href="#logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;