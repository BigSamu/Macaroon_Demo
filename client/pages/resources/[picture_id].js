import React, {useState} from 'react';
import Head from 'next/head'
import Link from 'next/link'

import {
  Figure,
  Alert
} from 'react-bootstrap';

import { pictureService } from 'services';
import axios from 'axios'
import _ from 'lodash';

export const getServerSideProps = async (ctx) => {
  
  const {picture_id} = ctx.query
  const pictures = await pictureService.getAll()
 
  
  // Cookies are not send in SS in Next (they have to be attached using context object)
  // Axios instance creaeted in "services/base.js" cannot be overwritten to add new headers
  // (complete entire axios GET request is build)
  const req = await axios.get(`${process.env.API_SERVER_URL}/auth/verify_access/${picture_id}`,
    {
      withCredentials: true,
      headers:{
        Cookie: !_.isEmpty(ctx.req.headers.cookie) ? ctx.req.headers.cookie : ""
      }
  });

   
  const authGranted =  req.data
  
  return {
    props: {
      picture_id,
      pictures,
      authGranted
    }
  };
};

const ResourceDetailsPage = (props) => {
  
  const {picture_id, pictures, authGranted} = props;


  return (
    <>
      <Head>
          <title> Macaroon Demo | Picture {picture_id} </title>
      </Head>
      { authGranted
      ?
        <>
          <h3> {pictures[picture_id-1].title} </h3>
          <Figure className="mb-1">
              <Figure.Image 
                width={600}
                height={'auto'}
                alt="landscape_picture"
                src={`../pic_${picture_id}.jpg`}
                thumbnail
              />
          </Figure>
          <p className="fst-italic">"{pictures[picture_id-1].description}"</p>
        </>
      :
        <>
          <Alert variant="danger">
            <Alert.Heading>Not Authorized Access</Alert.Heading>
            <p>
              Sorry! The access to this resource is not authorized. Please contact your admin
            </p>
          </Alert>
          <Figure className="mb-1 d-flex flex-column align-items-center">
            <Figure.Image 
              width={400}
              height={'auto'}
              alt="landscape_picture"
              src={"../crying_macaroon_2.jpeg"}
              thumbnail
            />
            <Figure.Caption>
              <h5> Please!!! Show me that picture!!! </h5> 
            </Figure.Caption>
          </Figure>
        </>
      }

      <div className="mt-4 button btn-link">
        <Link href="/">
          Go Back
        </Link>
      </div>

    </>
  );
};

export default ResourceDetailsPage;
