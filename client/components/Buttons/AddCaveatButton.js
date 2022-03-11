import React, { useState } from 'react';

import {
  Button,
} from 'react-bootstrap';


//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const AddCaveatButton = (props) => {

  //-----------------------------------
  // I) HOOKS & VARIABLES
  // ----------------------------------
  
  // Destructuring Lifted State from page 'caveats'
  const {caveatList, setCaveatList, location} = props



  //------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnClickNewCaveatInput = async (e) => {
    
    let newCaveat = {
      predicate:"",
      location: location
    }
    setCaveatList([...caveatList, newCaveat])
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
        onClick = {handleOnClickNewCaveatInput}
        >
          Add Caveat
      </Button>
    </>
  );
};

export default AddCaveatButton;
