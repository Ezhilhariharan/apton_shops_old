import React, { useEffect, useState } from 'react';
import PageHeader from '../partials/PageHeadr';
import Progress from '../partials/Progress';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Section1 from './campsections/Section1';
import Section2 from './campsections/Section2';
import Section3 from './campsections/Sections3';

const Wrapper = styled.div`
  padding: 2rem;
`;

const CreateWhatsAppCampgains = ({
  //state
  createCapmStep,
  whatsapptempList,
  sheduleSteeings,
  sheduleStep2,
  whatsApp_CSV_Url,
  brandProfile,
  currentUserInfo,
  existingCSVList,
  selectedWhatsAppCampagin,
  campName,
  updatecampaignError,

  // actions
  updateCampSteps,
  getwhatsapptemplist,
  uploadWhatsAppCSV,
  updateCampSetp1,
  updateCampStep2,
  getBrandInfoAPI,
  createWhatsAppCampgainsAPI,
  fetchExistingCSVList,
  updateWhatsAppCSV,
  updateCampaign,
  campaginDetails,
  fetchCampaginDetails,
  campaignName,
  campaignError,
  updateCampaignName,
  uploadExistingWhatsAppCSV,
  csvErrorUpdate,
}) => {
  const [existingFile, setEXistingFile] = useState('');
  const [tab, setTab] = useState('1');
  const [prospectsCount, setProspectsCount] = useState(0);
  useEffect(() => {
    getwhatsapptemplist();
    getBrandInfoAPI(currentUserInfo?.brand?.slug);
  }, []);
  useEffect(() => {
    updateCampSteps(0);
    fetchExistingCSVList();
  }, []);
  return (
    <>
      <PageHeader />
      <Wrapper>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Progress step={createCapmStep} />
          </Col>
          <Col span={18}>
            {createCapmStep === 0 && (
              <Section1
                updateCampSteps={updateCampSteps}
                uploadWhatsAppCSV={uploadWhatsAppCSV}
                updateShedulingSetting={updateCampSetp1}
                sheduleSteeings={sheduleSteeings}
                whatsApp_CSV_Url={whatsApp_CSV_Url}
                existingCSVList={existingCSVList}
                updateWhatsAppCSV={updateWhatsAppCSV}
                campaginDetails={campaginDetails}
                selectedWhatsAppCampagin={selectedWhatsAppCampagin}
                fetchCampaginDetails={fetchCampaginDetails}
                campaignName={campaignName}
                campName={campName}
                updatecampaignError={updatecampaignError}
                campaignError={campaignError}
                updateCampaignName={updateCampaignName}
                uploadExistingWhatsAppCSV={uploadExistingWhatsAppCSV}
                csvErrorUpdate={csvErrorUpdate}
                setEXistingFile={setEXistingFile}
                existingFile={existingFile}
                tab={tab}
                setTab={setTab}
                setProspectsCount={setProspectsCount}
              />
            )}
            {createCapmStep === 1 && (
              <Section2
                updateCampSteps={updateCampSteps}
                whatsapptempList={whatsapptempList}
                updateWhatsAppCSV={updateWhatsAppCSV}
                updateCampStep2={updateCampStep2}
                fetchCampaginDetails={fetchCampaginDetails}
                updateCampaign={updateCampaign}
                sheduleSteeings={sheduleSteeings}
                campaginDetails={campaginDetails}
                selectedWhatsAppCampagin={selectedWhatsAppCampagin}
                existingFile={existingFile}
                tab={tab}
                createWhatsAppCampgainsAPI={createWhatsAppCampgainsAPI}
                sheduleStep2={sheduleStep2}
              />
            )}
            {createCapmStep == 2 && (
              <Section3
                updateCampSteps={updateCampSteps}
                sheduleSteeings={sheduleSteeings}
                sheduleStep2={sheduleStep2}
                whatsApp_CSV_Url={whatsApp_CSV_Url}
                brandProfile={brandProfile}
                createWhatsAppCampgainsAPI={createWhatsAppCampgainsAPI}
                updateCampaign={updateCampaign}
                campaginDetails={campaginDetails}
                selectedWhatsAppCampagin={selectedWhatsAppCampagin}
                setEXistingFile={setEXistingFile}
                existingFile={existingFile}
                tab={tab}
                setTab={setTab}
                prospectsCount={prospectsCount}
              />
            )}
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default CreateWhatsAppCampgains;
