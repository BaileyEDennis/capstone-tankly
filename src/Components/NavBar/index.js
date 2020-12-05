import React, { StrictMode } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';

export default function NavBar() {
  return (
      <StrictMode>
      <Navbar expand='md'>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link className="nav-bar" to="/">Home</Link>
              <Link className="nav-bar" to='/fauna'>Fish</Link>
              <Link className="nav-bar" to='/flora'>Decorations</Link>
            </NavItem>
          </Nav>
          </Navbar>
    </StrictMode>
  );
}
