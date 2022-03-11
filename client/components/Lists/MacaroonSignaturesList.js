import React, { useState, useEffect } from 'react';

import {
  ListGroup,

} from 'react-bootstrap';

import _ from 'lodash';
import macaroonsjsModule from 'macaroons.js'

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const MacaroonSignaturesList = (props) => {

  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // Destructuring Lifted State from page 'index' (Landing Page)
  const {macaroonBaseConfig, dischargeMacaroonBaseConfig
    , firstPartyCaveats, thirdPartyCaveats, caveatEnabled} = props

  // iv) React Hooks - Effects
  const [macaroonSignature, setMacaroonSignature] = useState({
    base: "",
    withFirstPartyCaveats: "",
    withThirdPartyCaveats:"",
    withFirstAndThirdPartyCaveats:""
  })

  const [dischargeMacaroonSignature, setDischargeMacaroonSignature] = useState({
    base: "",
    withFirstPartyCaveats: "",
  })

  useEffect(() => {
    
    let base;
    let withFirstPartyCaveats;
    let withThirdPartyCaveats;
    let withFirstAndThirdPartyCaveats;

    let macaroonObject = macaroonsjsModule.MacaroonsBuilder.create(
      macaroonBaseConfig.location,
      macaroonBaseConfig.secret_key,
      macaroonBaseConfig.identifier
    )
    base = macaroonObject.signature 
    
    if(caveatEnabled.firstParty){
      firstPartyCaveats.forEach((caveat) => {
        macaroonObject = macaroonsjsModule.MacaroonsBuilder.modify(macaroonObject)
          .add_first_party_caveat(caveat.predicate).getMacaroon()
      })
      withFirstPartyCaveats = macaroonObject.signature
    }
    
    if(caveatEnabled.thirdParty){
      macaroonObject = macaroonsjsModule.MacaroonsBuilder.modify(macaroonObject)
      .add_third_party_caveat(
        dischargeMacaroonBaseConfig.location,
        dischargeMacaroonBaseConfig.secret_key,
        dischargeMacaroonBaseConfig.identifier
      ).getMacaroon()
      withThirdPartyCaveats = macaroonObject.signature
    }

    // if(caveatEnabled.thirdParty){
    //   macaroonObject = macaroonsjsModule.MacaroonsBuilder.modify(macaroonObject)
    //   .add_third_party_caveat(
    //     "www.isp.com",
    //     "a-very-secret-key-for-bob-from-third-party",
    //     "key-for-bob"
    //   ).getMacaroon()
    //   withThirdPartyCaveats = macaroonObject.signature
    // }

    if(caveatEnabled.firstParty && caveatEnabled.thirdParty){
      withFirstAndThirdPartyCaveats = withThirdPartyCaveats
    }

    setMacaroonSignature({
      base,
      withFirstPartyCaveats,
      withThirdPartyCaveats,
      withFirstAndThirdPartyCaveats
    })
    
  },[macaroonBaseConfig, dischargeMacaroonBaseConfig, 
      firstPartyCaveats, caveatEnabled]);

  useEffect(() => {
    
    let base;
    let withFirstPartyCaveats;

    let macaroonObject = macaroonsjsModule.MacaroonsBuilder.create(
      dischargeMacaroonBaseConfig.location,
      dischargeMacaroonBaseConfig.secret_key,
      dischargeMacaroonBaseConfig.identifier
    )
    base = macaroonObject.signature 
    
    if(caveatEnabled.thirdParty){
      thirdPartyCaveats.forEach((caveat) => {
        macaroonObject = macaroonsjsModule.MacaroonsBuilder.modify(macaroonObject)
          .add_first_party_caveat(caveat.predicate).getMacaroon()
      })
      withFirstPartyCaveats = macaroonObject.signature
    }

    setDischargeMacaroonSignature({
      base,
      withFirstPartyCaveats
    })
   
  },[dischargeMacaroonBaseConfig, thirdPartyCaveats, caveatEnabled]);
  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------


  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <h5> Root Macaroon Signatures:</h5>
      <ListGroup className="mt-3 mx-2">
        <ListGroup.Item >
          <span className="fw-bold"> Base Signature: </span>
          <span className="text-break">
            {_.truncate(macaroonSignature.base,
              {'length': 20, 'omission': '...'}
            )}
          </span>
        </ListGroup.Item>
        {caveatEnabled.firstParty 
          ? 
            <>
              <ListGroup.Item >
                <span className="fw-bold"> Signature with 1st-Party-Caveats: </span>
                <span className="text-break">
                  {_.truncate(macaroonSignature.withFirstPartyCaveats, 
                    {'length': 20, 'omission': '...'}
                  )}
                </span>
              </ListGroup.Item>
            </>
          : 
            ' '
        }
        {!caveatEnabled.firstParty && caveatEnabled.thirdParty 
          ? 
            <>
              <ListGroup.Item >
                <span className="fw-bold"> Signature with 3rd-Party-Caveats: </span>
                <span className="text-break">
                  {_.truncate(macaroonSignature.withThirdPartyCaveats, 
                    {'length': 20, 'omission': '...'}
                  )}
                </span>
              </ListGroup.Item>
            </>
          : 
            ' '
        }
        {caveatEnabled.firstParty && caveatEnabled.thirdParty  
          ? 
            <>
              <ListGroup.Item >
                <span className="fw-bold"> Signature with 1st and 3rd-Party-Caveats: </span>
                <span className="text-break">
                  {_.truncate(macaroonSignature.withFirstAndThirdPartyCaveats, 
                    {'length': 15, 'omission': '...'}
                  )}
                </span>
              </ListGroup.Item>
            </>
          : 
            ' '
        }
       
      </ListGroup>
      {caveatEnabled.thirdParty
        ? 
          <>
            <h5 className="mt-3"> Discharge Macaroon Signatures:</h5>
            <ListGroup className="mt-3 mx-2">
              <ListGroup.Item >
                  <span className="fw-bold"> Base Signature: </span>
                  <span className="text-break">
                    {_.truncate(dischargeMacaroonSignature.base,
                      {'length': 20, 'omission': '...'}
                    )}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item >
                  <span className="fw-bold"> Signature with 1st-Party-Caveats: </span>
                  <span className="text-break">
                    {_.truncate(dischargeMacaroonSignature.withFirstPartyCaveats,
                      {'length': 20, 'omission': '...'}
                    )}
                  </span>
                </ListGroup.Item>
            </ListGroup>
          </>
        :  
        ' '
      }

    </>
  );
};

export default MacaroonSignaturesList;
