
import React, { useState } from 'react';

import {

  Button,
  Modal,
  Alert
} from 'react-bootstrap';


//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const EditCaveatForm = (props) => {

  //-----------------------------------
  // I) HOOKS & VARIABLES
  // ----------------------------------
  
  // Destructuring Lifted State from component 'SubmitConfigurationButton'
  const {openModal, setOpenModal} = props

  // React Hooks - States
  
    


  //------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleCloseOfModal = () => {
    setOpenModal({...openModal, submitMacaroonConfigurationModal:false});
  }

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <> 
      <Modal show={openModal.submitMacaroonConfigurationModal} onHide={handleCloseOfModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks</Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <Alert  variant="success">
                Your Macaroon configuration was submitted succesfully!
              </Alert>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOfModal}>
            Close
          </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  );
};

export default EditCaveatForm;
