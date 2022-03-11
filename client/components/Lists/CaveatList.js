import React, { useState, useEffect } from 'react';

import {
  ListGroup,
  InputGroup,
  Button,
  Form

} from 'react-bootstrap';

import AddCaveatButton from 'components/Buttons/AddCaveatButton' 

import _ from 'lodash';


//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const CaveatList = (props) => {

  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // Destructuring Lifted State from page 'add.js'
  const {caveatList, setCaveatList, location} = props

  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnChangeCaveatList = (e) => {
    const idx = e.target.name
    const predicate = e.target.value
    let updatedCaveatList = _.cloneDeep(caveatList)
    updatedCaveatList[idx].predicate=predicate
    setCaveatList(updatedCaveatList);
  };

  const handleOnDeleteCaveat = async (e) => {
    const idx = e.currentTarget.value
    console.log(idx)
    const updatedCaveatList = caveatList.filter((item => 
      caveatList.indexOf(item) != idx))
    setCaveatList(updatedCaveatList);
  }

  // const handleOpenEditCaveatModal = async (e) => {
  //   e.preventDefault();
  //   let id = e.currentTarget.value;
  //   const selectedCaveat = await caveatService.getById(id)
  //   setEditCaveat(selectedCaveat);
  //   setOpenModal({...openModal, editCaveatModal: true});
  // };
  

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <p className="mb-1"> Current List of Caveats: </p>
      { _.isEmpty(caveatList)
        ? <>
        <ListGroup>
          <ListGroup.Item className=" mb-2" >
            <span className="fst-italic"> No Caveats Listed </span>
          </ListGroup.Item>
        </ListGroup>
        </>
        : ''
      }
      <ListGroup >
        { !_.isEmpty(caveatList) && caveatList.map((item, index) =>
          <div className="d-flex mb-2" key={index}>
            
            <InputGroup className="mb-0">
              <InputGroup.Text>Predicate {index+1}</InputGroup.Text>
              <Form.Control
                type="input"
                placeholder={
                  (location) == "1st-party" 
                    ? "resource=pic_1.jpg" 
                    : "timeout<10"}
                name={index}
                value={item.predicate}
                onChange={handleOnChangeCaveatList}
              />
            </InputGroup>
          
            {/* <Button 
              variant="outline-success"
              size="sm"
              className="mx-1 align-self-start"
              value={item.id}
              onClick={handleOpenEditCaveatModal}
            >
              Edit
            </Button> */}
            <Button 
              variant="outline-danger"
              size="sm"
              className="ms-2 align-self-center"
              value={index}
              onClick={handleOnDeleteCaveat}  
            >
              Delete
            </Button>
          </div>            
        )}
      </ListGroup>
      
      <AddCaveatButton
        caveatList = {caveatList}
        setCaveatList = {setCaveatList}
        location={location}
      />

      {/* <EditCaveatModal
        editCaveat = {editCaveat}
        setEditCaveat = {setEditCaveat}
        openModal = {openModal} 
        setOpenModal = {setOpenModal}
        setCaveatList = {setCaveatList}
      />    */}
    </>
  );
};

export default CaveatList;
