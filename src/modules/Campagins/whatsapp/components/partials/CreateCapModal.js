import React, { useState } from 'react';
import { Button, Modal, Space, Tooltip } from 'antd';
import { Typography } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import WhatsApp from '../../../../../../public/whatsapp.png';
import Survey from '../../../../../../public/survey.png';
import Upgrade from '../../../../upgrade/components/Upgrade';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

const StyledCard = styled(Button)`
  width: 240px;
  height: 120px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #4aacea;
`;

const Title = styled(Typography.Text)`
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 30px;
  color: #4aacea;
`;
const CreateCapModal = ({ updateSelectedCampagin, whatsAppConnectStatus }) => {
  const navigate = useNavigate();
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );

  const navPage = () => {
    if (priceValidation?.add_campaign) {
      updateSelectedCampagin(' ');
      navigate('/create-whatsapp-campaign');
    } else {
      setOpenUpgrade(true);
    }
  };
  return (
    <>
      <Tooltip
        placement="top"
        title={whatsAppConnectStatus && 'Please Integrate WhatsApp'}
      >
        <Button
          type="primary"
          ghost
          onClick={navPage}
          // && priceValidation?.add_campaign == false
          disabled={whatsAppConnectStatus ? true : false}
          style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: 'white',
            backgroundColor: '#4aacea',
            height: '40px',
          }}
        >
          Create Campaign
        </Button>
      </Tooltip>
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </>
  );
};

export default CreateCapModal;
