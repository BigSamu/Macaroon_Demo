import React, { useState, useEffect } from 'react';
import Link from 'next/link'

import {
  ListGroup,
  Button

} from 'react-bootstrap';

import AddCaveatButton from 'components/Buttons/AddCaveatButton' 

import _ from 'lodash';


//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const ResourceList = (props) => {

  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // Destructuring Lifted State from page 'add.js'
  const [resourceList, setCaveatList] = useState([
    'pic_1.jpg', 'pic_2.jpg', 'pic_3.jpg', 'pic_4.jpg'
  ])

  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------


  const handleOnClickAccessResource = async (e) => {
    console.log("Accessing Resource")
  }

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <h4 className="mb-3"> Current List of Resources: </h4>
      
      <ListGroup className="w-75">
        { !_.isEmpty(resourceList) && resourceList.map((item, index) =>
         
            
            <ListGroup.Item key={index}>
            <span className="fw-bold"> Picture {index+1}: </span>
            <span className="mb-0 button btn-link">
              <Link href={`/resources/${index+1}`}>
                {item}
              </Link>
            </span>
           </ListGroup.Item>

                   
        )}
      </ListGroup>
    </>
  );
};

export default ResourceList;
