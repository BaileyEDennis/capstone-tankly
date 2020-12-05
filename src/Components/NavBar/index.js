import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function NavBar(props) {
  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };
  const { user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color='dark' dark expand='md' className='justify-content-between'>
        <Link className="navbar-brand" to='/'>Tankly</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
          <NavItem>
              <Link className="nav-link" to='/tanks'>Tanks</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to='/fauna'>Fish</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to='/flora'>
                Decorations
              </Link>
            </NavItem>
          </Nav>
          {
            user
            && <>
              <img className="userInfo" src={user?.photoURL} alt={user?.displayName} />
              <UncontrolledDropdown>
              <DropdownToggle nav caret>
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
                {user?.displayName}
                </DropdownItem>
                <DropdownItem>
                  <div
                    className='nav-link btn btn-danger'
                    onClick={(e) => logMeOut(e)}
                  >
                    Logout
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </>
          }
        </Collapse>
      </Navbar>
    </div>
  );
}
