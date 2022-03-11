import React, { useState } from 'react';

import {
  Form,
  InputGroup,
  Button,
  Modal
} from 'react-bootstrap';

import _ from 'lodash';
import { caveatService } from 'services';
import axios from 'axios';

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const EditCaveatForm = (props) => {

  //-----------------------------------
  // I) HOOKS & VARIABLES
  // ----------------------------------
  
  // Destructuring Lifted State from component 'CaveatList'
  const {editCaveat, setEditCaveat, openModal, setOpenModal, setCaveatList} = props

  // React Hooks - States
  
    


  //------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnChangeEditCaveat = (e) => {
    
    setEditCaveat({
      ...editCaveat,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmitEditCaveat = async (e) => {
    e.preventDefault();
    await caveatService.update(editCaveat.id, editCaveat)
    const updatedCaveatList = await caveatService.getAll()
    setCaveatList(updatedCaveatList)
    setOpenModal({...openModal, editCaveatModal:false}); 
  };

  const handleCloseOfModal = () => {
    setOpenModal({...openModal, editCaveatModal:false});
  }

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <> 
      <Modal show={openModal.editCaveatModal} onHide={handleCloseOfModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Caveat</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleOnSubmitEditCaveat}>
          <Modal.Body>
              <InputGroup>
                <InputGroup.Text>Predicate</InputGroup.Text>
                <Form.Control
                  type="input"
                  placeholder="Client = Repsol"
                  name="predicate"
                  value = {editCaveat.predicate}
                  onChange={handleOnChangeEditCaveat}
                />
              </InputGroup>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOfModal}>
            Close
          </Button>
          <Button variant="success" type="submit" >
            Edit
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditCaveatForm;
