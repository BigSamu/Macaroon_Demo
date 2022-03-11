import React, { useState, useEffect } from 'react';

import {
  Form,
  Button,
  Figure,
  Alert,
  InputGroup,
  Row,
  Col
} from 'react-bootstrap';


import _ from 'lodash';
import { caveatService, macaroonService, authService } from 'services';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import macaroonsjsModule from 'macaroons.js'
//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const LoginForm = (props) => {

  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------
  
  // Destructuring Lifted State from page 'index' (Landing Page)
  const {isAvailable, setIsAvailable, userLoggedIn, setUserLoggedIn, 
    rootMacaroonObject, setRootMacaroonObject, setDischargeMacaroonObject,
    setFirstPartyCaveats, setThirdPartyCaveats, setCaveatEnabled} = props

  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnSubmitLogIn = async (e) => {
    e.preventDefault()
    
    destroyCookie(null, 'username')
    destroyCookie(null, 'rootMacaroonCookie')
    destroyCookie(null, 'dischargeMacaroonCookie')

    setCookie(null, 'username', userLoggedIn.username)
    if(userLoggedIn.username !== "" ){
      setUserLoggedIn({...userLoggedIn, loggedIn: true})
    }
    else{
      setUserLoggedIn({...userLoggedIn, loggedIn: false})
    }

    await authService.login()
    const { rootMacaroonCookie, dischargeMacaroonCookie} = parseCookies()
    
    let rootMacaroonConfig = await macaroonService.getAllByType("root");
    let firstPartyCaveats = await caveatService.getAllByLocation("1st-party");
    let thirdPartyCaveats = await caveatService.getAllByLocation("3rd-party");

    setRootMacaroonObject(
      macaroonsjsModule.MacaroonsBuilder
        .deserialize(rootMacaroonCookie))
    if(!_.isEmpty(dischargeMacaroonCookie))
      setDischargeMacaroonObject(
        macaroonsjsModule.MacaroonsBuilder
          .deserialize(dischargeMacaroonCookie))
    
    setFirstPartyCaveats(firstPartyCaveats)
    setThirdPartyCaveats(thirdPartyCaveats)

    setCaveatEnabled({
        firstParty: rootMacaroonConfig[0].first_party_caveats_enabled,
        thirdParty: rootMacaroonConfig[0].third_party_caveats_enabled
      })
    setIsAvailable(true)
    
  };

  const handleOnClickLogOut = (e) => {
    
    destroyCookie(null, 'username')
    setUserLoggedIn({
      username: "",
      loggedIn: false
    })
  
    destroyCookie(null, 'rootMacaroonCookie')
    destroyCookie(null, 'dischargeMacaroonCookie')
    
    setRootMacaroonObject({})
    setDischargeMacaroonObject({})
    
    setFirstPartyCaveats([])
    setThirdPartyCaveats([])
    
    setCaveatEnabled({
      firstParty: false,
      thirdParty: false
    })
    setIsAvailable(false)
  }
  
  const handleOnChangeUserName = (e) => {
    
    setUserLoggedIn({
      ...userLoggedIn, 
      [e.target.name]: e.target.value
    })
  }


  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <h4> Login Form: </h4>
      
      { userLoggedIn.loggedIn
        ? <Alert variant="success"> {parseCookies().username} is logged in the System </Alert>
        : <Alert variant="warning" className="py-3">Warning: There is no user logged in! </Alert>
      }  

      <Form className="my-3" onSubmit={handleOnSubmitLogIn}>
        {!isAvailable 
          ?
            <Figure className="d-flex flex-column align-items-center">
              <Figure.Image
                width={180}
                height={'auto'}
                alt="crying_mcaroon"
                src="crying_macaroon.png"
              />
              <Figure.Caption>
                <h5> Wuaaa!!! I am hungry!</h5> 
              </Figure.Caption>
            </Figure>
          :
            <Figure className="d-flex flex-column align-items-center">
              <Figure.Image
                width={161}
                height={'auto'}
                alt="happy_macaroon"
                src="happy_macaroon.jpeg"
              />
              <Figure.Caption>
                <h5> Yey!!! We got a Macaroon</h5>
                <p> Signature: {_.truncate(rootMacaroonObject.signature, 
                  {'length': 20, 'omission': '...'}
                )}</p>
              </Figure.Caption>
            </Figure>
        }

        <p> Please introduce your username and login to retrieve a Macaroon: </p>
        <Row>
          <Col sm={6} lg={6} className="pe-0">
            <Form.Group>
              <InputGroup >
                <InputGroup.Text>Username</InputGroup.Text>
                <Form.Control
                  type="input"
                  name="username"
                  value={userLoggedIn.username}
                  onChange={handleOnChangeUserName}
                />
              </InputGroup>
            </Form.Group>  
          </Col>
          <Col sm={6} lg={6} className="mt-2 mt-sm-0">
            <Button 
              variant="success"
              
              className="mx-1"
              type="submit"
              >
                Get Macaroon
            </Button>
            <Button 
              variant="outline-danger"
              
              className="mx-1"
              type="button"
              onClick={handleOnClickLogOut}
              >
                Delete
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default LoginForm;
