import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error'

import { 
  Row,
  Col,
 } from 'react-bootstrap';


import SubmitMacaroonConfigurationButton from 'components/Buttons/SubmitMacaroonConfigurationButton';
import MacaroonBaseConfigForm from 'components/Forms/MacaroonBaseConfigForm';
import CaveatEnableInputs from 'components/Inputs/CaveatEnableInputs';
import CaveatList from 'components/Lists/CaveatList';
import MacaroonSignaturesList from 'components/Lists/MacaroonSignaturesList';
import SubmitMacaroonConfigurationModal from 'components/Modals/SubmitMacaroonConfigurationModal' 

import { caveatService, macaroonService } from 'services';
import _ from 'lodash';


//******************************************************************************
// SERVER SIDE PROPS
//******************************************************************************

export const getServerSideProps = async () => {

  let firstPartyCaveatsSS = await caveatService.getAllByLocation("1st-party");
  let thirdPartyCaveatsSS = await caveatService.getAllByLocation("3rd-party");
  let rootMacaroonConfigSS = await macaroonService.getAllByType("root");
  let dischargeMacaroonConfigSS = await macaroonService.getAllByType("discharge");

  let rootMacaroonBaseConfigSS = !_.isEmpty(rootMacaroonConfigSS) 
  ? 
    {
      location: rootMacaroonConfigSS[0].location,
      identifier: rootMacaroonConfigSS[0].identifier,
      secret_key: rootMacaroonConfigSS[0].secret_key,
      type: rootMacaroonConfigSS[0].type
    }
  :
    {
      location: "",
      identifier: "",
      secret_key: "",
      type: "root"
    }

  let dischargeMacaroonBaseConfigSS = !_.isEmpty(dischargeMacaroonConfigSS) 
  ? 
    {
      location: dischargeMacaroonConfigSS[0].location,
      identifier: dischargeMacaroonConfigSS[0].identifier,
      secret_key: dischargeMacaroonConfigSS[0].secret_key,
      type: dischargeMacaroonConfigSS[0].type
    }
  :
    {
      location: "",
      identifier: "",
      secret_key: "",
      type: "discharge"
    }

  let caveatEnabledSS = !_.isEmpty(rootMacaroonConfigSS) 
  ? 
    {
      firstParty: rootMacaroonConfigSS[0].first_party_caveats_enabled,
      thirdParty: rootMacaroonConfigSS[0].third_party_caveats_enabled
    }
  :
    {
      firstParty: false,
      thirdParty: false
    }

  return {
    props:{ 
      firstPartyCaveatsSS,
      thirdPartyCaveatsSS,
      rootMacaroonBaseConfigSS,
      dischargeMacaroonBaseConfigSS,
      caveatEnabledSS
    },
  }

};

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const NewCampaignPage = (props) => {

  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------

  // Destructuring Server Side Props
  const { firstPartyCaveatsSS, thirdPartyCaveatsSS, rootMacaroonBaseConfigSS, 
    dischargeMacaroonBaseConfigSS,  caveatEnabledSS } = props;

  // React Hooks - States
  const [firstPartyCaveats, setFirstPartyCaveats] = useState(firstPartyCaveatsSS);
  const [thirdPartyCaveats, setThirdPartyCaveats] = useState(thirdPartyCaveatsSS);
  
  const [macaroonBaseConfig, setMacaroonBaseConfig] 
    = useState(rootMacaroonBaseConfigSS)
  const [dischargeMacaroonBaseConfig, setDischargeMacaroonBaseConfig] 
    = useState(dischargeMacaroonBaseConfigSS)

  const [openModal, setOpenModal] = useState({
    submitMacaroonConfigurationModal:false
  })

  const [caveatEnabled, setCaveatEnabled] = useState(caveatEnabledSS)

  const [finalStepNumber, setFinalStepNumber] = useState('2')
  
  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------


  //------------------------------------------  
  // JSX
  //------------------------------------------

  return (
    <>
      <Head>
          <title> Macaroon Demo | Setup </title>
      </Head>
      <h4>Macaroon Configuration</h4>
      <hr/>
      <Row>
        <Col sm="12" md="6" className="p-3">
          <h5> Step 1: Introduce Base Details </h5>
          <p className="mb-3"> Please define secret key, location and identifier for root macaroon: </p>
          <MacaroonBaseConfigForm
            macaroonBaseConfig= {macaroonBaseConfig}
            setMacaroonBaseConfig = {setMacaroonBaseConfig}
            location="1st-party"
          />
          <div className="my-3">
            <CaveatEnableInputs
              caveatEnabled = {caveatEnabled}
              setCaveatEnabled = {setCaveatEnabled}
              setFinalStepNumber = {setFinalStepNumber}
            />
          </div>
        </Col >
        {caveatEnabled.firstParty 
          ?
            <Col sm="12" md="6" className="p-3">
              
                <>
                  <h5> Step 2: Add First Party Caveats Configuration (Optional)</h5>
                  <p className="mb-3"> Please add predicates for 1st-party caveats you would like to include: </p>
                  <CaveatList
                    caveatList = {firstPartyCaveats}
                    setCaveatList = {setFirstPartyCaveats}
                    location="1st-party"
                  />
                </>
            </Col>
          : 
            ''
        }
        {caveatEnabled.thirdParty 
          ? 
            <Col sm="12" md="6" className="p-3">
            
                <>
                  <h5> Step {finalStepNumber-1}: Add Third Party Caveats Configuration (Optional)</h5>
                  <p className="mb-3"> Please define secret key, location and identifier for root macaroon: </p>
                  <MacaroonBaseConfigForm
                    macaroonBaseConfig= {dischargeMacaroonBaseConfig}
                    setMacaroonBaseConfig = {setDischargeMacaroonBaseConfig}
                    location="3rd-party"
                  />
                  <p className="my-4"> Also, please include predicates for 3rd-party caveats:: </p>
                  <CaveatList
                    caveatList = {thirdPartyCaveats}
                    setCaveatList = {setThirdPartyCaveats}
                    location="3rd-party"
                  />
                </>
            </Col>
          :
            ''  
        }
        <Col sm="12" md="6" className="p-3">
          <h5> Step {finalStepNumber}: Submit Configuration</h5>
            <p className="mb-3"> Please define secret key, location and identifier for root macaroon: </p>
            <SubmitMacaroonConfigurationButton
              
              firstPartyCaveats = {firstPartyCaveats}
              thirdPartyCaveats = {thirdPartyCaveats}
              openModal = {openModal}
              macaroonBaseConfig = {macaroonBaseConfig}
              dischargeMacaroonBaseConfig = {dischargeMacaroonBaseConfig}
              caveatEnabled = {caveatEnabled}
              setOpenModal = {setOpenModal}
            />

            <MacaroonSignaturesList
              macaroonBaseConfig = {macaroonBaseConfig}
              dischargeMacaroonBaseConfig = {dischargeMacaroonBaseConfig}
              firstPartyCaveats = {firstPartyCaveats}
              thirdPartyCaveats = {thirdPartyCaveats}
              caveatEnabled ={caveatEnabled}
            />
        </Col>
      </Row>
      

      <div className="mt-4 button btn-link">
        <Link href="/">
          Go Back
        </Link>
      </div>

      <SubmitMacaroonConfigurationModal
        openModal = {openModal} 
        setOpenModal = {setOpenModal}
      />   

    </>
  );
};

export default NewCampaignPage;
