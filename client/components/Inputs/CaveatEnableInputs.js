import React, { useEffect, useState } from 'react';

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const CaveatEnabledInputs = (props) => {

  //-----------------------------------
  // I) HOOKS & VARIABLES
  // ----------------------------------
  
  // Destructuring Lifted State from page 'caveats'
  const {caveatEnabled, setCaveatEnabled, setFinalStepNumber} = props

  useEffect(() => {
    if(caveatEnabled.firstParty && caveatEnabled.thirdParty){
      setFinalStepNumber('4')
    }
    else if (caveatEnabled.firstParty || caveatEnabled.thirdParty){
      setFinalStepNumber('3')
    }
    else {
      setFinalStepNumber('2')
    }
  },[caveatEnabled]);

  //------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnChangeCaveatEnable = (e) => {
    
    setCaveatEnabled({
      ...caveatEnabled, 
      [e.target.name]: !caveatEnabled[e.target.name]
    })
  }

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <div className="form-check">
        <input 
          className="form-check-input" 
          type="checkbox"
          name = "firstParty"
          checked={caveatEnabled.firstParty}
          onChange={handleOnChangeCaveatEnable}
        />
        <label className="form-check-label">
          Enable First Party Caveats
        </label>
      </div>
      <div className="form-check">
        <input 
          className="form-check-input" 
          type="checkbox"
          name = "thirdParty"
          checked={caveatEnabled.thirdParty}
          onChange={handleOnChangeCaveatEnable}
        />
        <label className="form-check-label">
          Enable Third Party Caveats
        </label>
      </div>
    </>
  );
};

export default CaveatEnabledInputs;
