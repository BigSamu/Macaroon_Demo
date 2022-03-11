import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

import Layout from '../components/Layout';

import nookies from 'nookies'
import _ from 'lodash';




//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

function MyApp({ Component, pageProps }) {
  

  //------------------------------------------
  // JSX
  //------------------------------------------
  
  return (
    <Layout>
      <Component 
        {...pageProps}
      />
    </Layout>
  );
}

export default MyApp;
