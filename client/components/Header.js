import React from 'react'
import Link from 'next/link'
import {Container, Navbar, Nav } from 'react-bootstrap';

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const Header = (props) => {
    
  //------------------------------------------
  // JSX
  //------------------------------------------

  return (   
    <> 
      <Navbar bg="secondary" variant="dark">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>
              <img
                alt=""
                src={"/macaroon.png"}
                width={32}
                height={32}
              />
              <p className = "d-inline-block my-0 mx-2 align-middle"> Macaroon Demo </p>
            </Navbar.Brand>
          </Link>
          <Nav className="ms-auto">
            <Link href="/setup" passHref>
              <Nav.Link active>Setup</Nav.Link>
            </Link>
            <Link href="/" passHref>
              <Nav.Link active>Home</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header