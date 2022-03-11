import React, { useState } from 'react';

import {
  Form,
  InputGroup
} from 'react-bootstrap';

import _ from 'lodash';

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const MacaroonBaseConfigForm = (props) => {

  //-----------------------------------
  // I) HOOKS & VARIABLES
  // ----------------------------------
  
  // Destructuring Lifted State from page 'caveats'
  const {macaroonBaseConfig, setMacaroonBaseConfig, location} = props

  // React Hooks - States
  
  
  //------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnChangeMacaroonBaseDetails = (e) => {
    
    setMacaroonBaseConfig({
      ...macaroonBaseConfig,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmitMacaroonBaseDetails = (e) => {
    
    //
  };


  //------------------------------------------
  // JSX
  //------------------------------------------

  return (

    <> 
      
      <Form className="my-2" onSubmit={handleOnSubmitMacaroonBaseDetails}>
        <Form.Group className="mb-2">
            <InputGroup className="mb-1">
              <InputGroup.Text>Location</InputGroup.Text>
              <Form.Control
                type="input"
                placeholder= { 
                  (location) == "1st-party" 
                    ? "www.sp1.com" 
                    : "www.isp.com"
                }
                name="location"
                value = {macaroonBaseConfig.location}
                onChange={handleOnChangeMacaroonBaseDetails}
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <InputGroup.Text>Identifier</InputGroup.Text>
              <Form.Control
                type="input"
                placeholder= { 
                  (location) == "1st-party" 
                    ? "key-for-pictures" 
                    : "key-for-bob"
                }
                name="identifier"
                value = {macaroonBaseConfig.identifier}
                onChange={handleOnChangeMacaroonBaseDetails}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Secret Key</InputGroup.Text>
              <Form.Control
                type="input"
                placeholder={ 
                  (location) == "1st-party" 
                    ? "a-very-secret-signing-key" 
                    : "another-very-secret-signing-key"
                }
                name="secret_key"
                value = {macaroonBaseConfig.secret_key}
                onChange={handleOnChangeMacaroonBaseDetails}
              />
            </InputGroup>
      
        </Form.Group>  
      </Form>

    </>
  );
};

export default MacaroonBaseConfigForm;