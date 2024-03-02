import React, { Fragment, useEffect, useState } from 'react';
import SwitchTop from './partials/SwitchTop';
import CampDetailsInfo from './partials/CampDetailsInfo';
import styled from 'styled-components';
import ProspectDetails from './partials/ProspectsDetails';
import { useSelector } from 'react-redux';
const Wrapper = styled.div`
  margin-top: 0.5rem;
  margin-left: ${props => props.Left || '5rem'};
  margin-right: ${props => props.Right || '5rem'};
`;
const CampaginDetails = ({
  // state
  selectedWhatsAppCampagin,
  brandProfile,
  campaginDetails,
  prospectsList,
  overviewStatus,
  // actions
  fetchCampaginDetails,
  fetchProspectsDetails,
  fetchWpStatus,
  downloadCampDetails,
  updateCampaign,
}) => {
  const BackOption = useSelector(
    state => state.whatsAppChatSelector.backtoprevious
  );
  const [showDetails, setShowSetails] = useState(BackOption ? 2 : 1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (selectedWhatsAppCampagin?.id) {
      fetchCampaginDetails(selectedWhatsAppCampagin?.id);
      fetchWpStatus(selectedWhatsAppCampagin?.id);
    }
  }, []);
  useEffect(() => {
    if (selectedWhatsAppCampagin?.id) {
      fetchProspectsDetails(selectedWhatsAppCampagin?.id, page);
    }
  }, [page]);
  return (
    <Fragment>
      <SwitchTop setShowSetails={setShowSetails} tab={showDetails} />
      {showDetails === 1 && campaginDetails && (
        <Wrapper>
          <CampDetailsInfo
            campaginDetails={campaginDetails}
            brandProfile={brandProfile}
            updateCampaign={updateCampaign}
            selectedWhatsAppCampagin={selectedWhatsAppCampagin}
          />
        </Wrapper>
      )}
      {showDetails === 2 && prospectsList?.campaign_list && (
        <Wrapper Left="1rem" Right="1rem">
          <ProspectDetails
            prospectsList={prospectsList?.campaign_list}
            campaginDetails={campaginDetails}
            overviewStatus={overviewStatus}
            downloadCampDetails={downloadCampDetails}
            page={page}
            setPage={setPage}
            selectedWhatsAppCampagin={selectedWhatsAppCampagin}
          />
        </Wrapper>
      )}
    </Fragment>
  );
};

export default CampaginDetails;
