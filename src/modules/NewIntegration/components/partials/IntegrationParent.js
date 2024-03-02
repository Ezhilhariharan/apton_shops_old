import React from 'react';
import Flex from '../../../../components/common/Flex';
import ConnectedAccounts from './ConnectedAccounts';
import SocialIntegration from './SocialIntegration';

const IntegrationParent = ({ FB_INST_Disconnect }) => {
  return (
    <>
      <Flex>
        <SocialIntegration />
        <ConnectedAccounts FB_INST_Disconnect={FB_INST_Disconnect} />
      </Flex>
    </>
  );
};

export default IntegrationParent;
