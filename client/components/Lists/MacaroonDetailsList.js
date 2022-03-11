import React, { useState, useEffect } from 'react';

import {
  Button,
  Alert
} from 'react-bootstrap';

import _ from 'lodash';


//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const MacaroonDetailsList = (props) => {

  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // Destructuring Lifted State from page 'index' (Landing Page)
  const {rootMacaroonObject, dischargeMacaroonObject, 
    firstPartyCaveats, thirdPartyCaveats, caveatEnabled} = props

    
  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <h4> Macaroon Current Server Configuration: </h4>
      <ul >
        <li> 
          <span className="fw-bold">Location: </span> 
          <span>{!_.isEmpty(rootMacaroonObject)
            ? rootMacaroonObject.location
            : "Unknown" }</span>
        </li>
        <li> 
          <span className="fw-bold">Identifier: </span> 
          <span>{!_.isEmpty(rootMacaroonObject)
            ? rootMacaroonObject.identifier
            : "Unknown" }</span>
        </li>
        
        <li> 
          <span className="fw-bold">First Party Caveats: </span> 
          {!_.isEmpty(rootMacaroonObject)
            ?
              caveatEnabled.firstParty && !_.isEmpty(firstPartyCaveats) 
                ?
                  <ul>
                    {firstPartyCaveats.map((item, idx) =>
                      <li key={idx}> {item.predicate} </li>
                    )}
                  </ul>
                :
                  'None'
            : 
              "Unknown" 
          }
        </li>
        <li> 
          <span className="fw-bold">Third Party Caveats: </span> 
          {!_.isEmpty(rootMacaroonObject)
            ?
              caveatEnabled.thirdParty 
                ?
                <ul>
                  <li> 
                    <span className="fw-bold">Location: </span> 
                    <span>{!_.isEmpty(dischargeMacaroonObject)
                      ? dischargeMacaroonObject.location
                      : "Unknown" }</span>
                  </li>
                  <li> 
                    <span className="fw-bold">Identifier: </span> 
                    <span>{!_.isEmpty(dischargeMacaroonObject)
                      ? dischargeMacaroonObject.identifier
                      : "Unknown" }</span>
                  </li>
                  <li> 
                  <span className="fw-bold">First Party Caveats: </span> 
                  {!_.isEmpty(thirdPartyCaveats) 
                      ?
                        <ul>
                          {thirdPartyCaveats.map((item, idx) =>
                            <li key={idx}> {item.predicate} </li>
                          )}
                        </ul>
                      :
                        'None'
                  }
                </li>
                  {/* {!_.isEmpty(thirdPartyCaveats) && thirdPartyCaveats.map((item, idx) =>
                      
                      <li key={idx}> {item.predicate} </li>
                  )} */}
                </ul>
                :
                  'None'
            : 
              "Unknown"
          }
        </li>
      </ul>
    </>
  );
};

export default MacaroonDetailsList;
