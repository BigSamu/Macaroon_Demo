import React, { useState, useEffect } from 'react';
import Head from 'next/head'

import {  
  Row, 
  Col
} from 'react-bootstrap';


import MacaroonDetailsList from 'components/Lists/MacaroonDetailsList';
import LoginForm from 'components/Forms/LoginForm';
import ResourceList from 'components/Lists/ResourceList';

import nookies from 'nookies'
import macaroonsjsModule from 'macaroons.js'
import { caveatService, macaroonService, authService } from 'services';
import _ from 'lodash';

//******************************************************************************
// SERVER SIDE PROPS
//******************************************************************************

export const getServerSideProps = async (ctx) => {

  const firstPartyCaveatsSS = await caveatService.getAllByLocation("1st-party");
  const thirdPartyCaveatsSS = await caveatService.getAllByLocation("3rd-party");
  const rootMacaroonConfigSS = await macaroonService.getAllByType("root");
  const dischargeMacaroonConfigSS = await macaroonService.getAllByType("discharge");
  const cookies = nookies.get(ctx)


  const caveatEnabledSS = !_.isEmpty(rootMacaroonConfigSS) 
  ? 
    {
      firstParty: rootMacaroonConfigSS[0].first_party_caveats_enabled,
      thirdParty: rootMacaroonConfigSS[0].third_party_caveats_enabled
    }
  :
    {
      firstParty: false,
      thirdParty: false
    }

  return {
    props:{ 
      firstPartyCaveatsSS,
      thirdPartyCaveatsSS,
      rootMacaroonConfigSS,
      dischargeMacaroonConfigSS,
      caveatEnabledSS,
      cookies
    },
  }

};

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const LandingPage = (props) => {
  
  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------
  // Destructuring Server Side Props
  const {firstPartyCaveatsSS, thirdPartyCaveatsSS, rootMacaroonConfigSS,
    dischargeMacaroonConfigSS, caveatEnabledSS, cookies } = props
    
  // React Hooks = States
  const [userLoggedIn, setUserLoggedIn] = useState({
    username: "",
    loggedIn: false
  })
  
  const [rootMacaroonObject, setRootMacaroonObject] = useState(
    cookies.hasOwnProperty('rootMacaroonCookie')
    ? macaroonsjsModule.MacaroonsBuilder
      .deserialize(cookies.rootMacaroonCookie)
    : {}
  )

  const [dischargeMacaroonObject, setDischargeMacaroonObject] = useState(
    cookies.hasOwnProperty('dischargeMacaroonCookie')
    ? macaroonsjsModule.MacaroonsBuilder
      .deserialize(cookies.dischargeMacaroonCookie)
    : {}
  )
  
  const [isAvailable, setIsAvailable] = useState(
    !_.isEmpty(rootMacaroonObject) ? true : false
  )

  const [firstPartyCaveats, setFirstPartyCaveats] = useState(firstPartyCaveatsSS);
  const [thirdPartyCaveats, setThirdPartyCaveats] = useState(thirdPartyCaveatsSS);
  

  const [caveatEnabled, setCaveatEnabled] = useState(caveatEnabledSS)

  // React Hooks - Effects
  useEffect(() => {
    const currentUsername = !_.isEmpty(cookies.username)
      ? cookies.username 
      : ""
    setUserLoggedIn({
      username: currentUsername, 
      loggedIn: (currentUsername != "") ? true : false
    })
    
  },[]);

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <Head>
        <title> Macaroons Demo | Home </title>
      </Head>
        <Row className="align-items-stretch justify-content-around">
          <Col sm="12" md="6" className="p-3">
            <LoginForm
              isAvailable = {isAvailable}
              setIsAvailable = {setIsAvailable}
              userLoggedIn={userLoggedIn}
              setUserLoggedIn={setUserLoggedIn}
              rootMacaroonObject = {rootMacaroonObject}
              setRootMacaroonObject = {setRootMacaroonObject}
              setDischargeMacaroonObject = {setDischargeMacaroonObject}
              setFirstPartyCaveats={setFirstPartyCaveats}
              setThirdPartyCaveats={setThirdPartyCaveats}
              setCaveatEnabled = {setCaveatEnabled}
            />
          </Col>
          <Col sm="12" md="6" className="p-3">
            <MacaroonDetailsList
              rootMacaroonObject ={rootMacaroonObject}
              dischargeMacaroonObject = {dischargeMacaroonObject}
              firstPartyCaveats= {firstPartyCaveats}
              thirdPartyCaveats = {thirdPartyCaveats}
              caveatEnabled = {caveatEnabled}
            />
            <hr/>
            <ResourceList/>

          </Col>
        </Row>

        
        <Row>
          <Col sm="12" md="6" className="p-3">
         
          </Col>
          <Col sm="12" md="6" className="p-3">
          </Col>
        </Row>

    
    </>
  );
};

export default LandingPage;
