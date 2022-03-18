import React, { useState, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    Collapse,
    NavItem,
} from "reactstrap";

import Icon from "../Icon/Icon";

import "./Header.scss";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <header className="Header">
            <Navbar color="light" expand="md" light fixed="top" container="md">
                <NavbarBrand to="/" tag={Link} onClick={closeMenu}>
                    <Icon icon="attach_money" />
                    Exchanger
                </NavbarBrand>
                <NavbarToggler onClick={toggleMenu} />
                <Collapse navbar isOpen={isOpen}>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink
                                to="/"
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                Currency Converter
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                to="/history"
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                Conversion History
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default Header;
