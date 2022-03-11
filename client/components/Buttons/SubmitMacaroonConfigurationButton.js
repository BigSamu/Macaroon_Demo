import React, { useState } from 'react';

import {
  Button
} from 'react-bootstrap';



import { caveatService, macaroonService } from 'services';

import _ from 'lodash'

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const SubmitMacaroonConfigurationButton = (props) => {

  //-----------------------------------
  // I) HOOKS & VARIABLES
  // ----------------------------------
  
  // Destructuring Lifted State from page 'caveats'
  const {firstPartyCaveats, thirdPartyCaveats, openModal, setOpenModal, 
    macaroonBaseConfig, dischargeMacaroonBaseConfig, caveatEnabled} = props

  //------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnClicSubmitConfiguration = async (e) => {
     
    await caveatService.deleteAll();
    await caveatService.createAllInList([...firstPartyCaveats, ...thirdPartyCaveats]);
 

    await macaroonService.deleteAll();
    let macaroonConfig = { 
      ...macaroonBaseConfig, 
      first_party_caveats_enabled: caveatEnabled.firstParty,
      third_party_caveats_enabled: caveatEnabled.thirdParty,
    }

    let dischargeMacaroonConfig = { 
      ...dischargeMacaroonBaseConfig, 
      first_party_caveats_enabled: caveatEnabled.thirdParty,
      third_party_caveats_enabled: false,
    }

    await macaroonService.create(macaroonConfig);
    await macaroonService.create(dischargeMacaroonConfig);

    setOpenModal({...openModal, submitMacaroonConfigurationModal: true});
  };

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>     
      <Button 
        variant="success"
        className="d-block ms-auto"
        type="button"
        onClick = {handleOnClicSubmitConfiguration}
        >
          Submit Configuration
      </Button>
    </>
  );
};

export default SubmitMacaroonConfigurationButton;
