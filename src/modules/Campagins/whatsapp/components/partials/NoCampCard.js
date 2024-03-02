import React from 'react';
import Flex from '@components/common/Flex';
import pic from '../../../../../../public/nocamp.png';
import CreateCapModal from './CreateCapModal';

const NoCampCard = ({
  whatsAppConnectStatus,
  updateSelectedCampagin,
  selectedWhatsAppCampagin,
}) => {
  return (
    <>
      <Flex center style={{ marginTop: '100px' }}>
        <img
          width={300}
          height={300}
          src={pic}
          style={{
            objectFit: 'contain',
          }}
        />
      </Flex>
      <Flex center style={{ marginTop: '2rem' }}>
        <CreateCapModal
          whatsAppConnectStatus={whatsAppConnectStatus}
          updateSelectedCampagin={updateSelectedCampagin}
          selectedWhatsAppCampagin={selectedWhatsAppCampagin}
        />
      </Flex>
    </>
  );
};

export default NoCampCard;
