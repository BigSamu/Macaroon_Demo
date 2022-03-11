import React, {useState} from 'react';

import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {



  //------------------------------------------
  // JSX
  //------------------------------------------
  
  return (
    <>
      <Header />
      <Container className="p-4">
        {props.children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
