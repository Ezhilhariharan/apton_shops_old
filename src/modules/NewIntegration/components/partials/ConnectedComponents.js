import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import FacebookStatus from './MediaStatus/FacebookStatus';
import InstagramStatus from './MediaStatus/InstagramStatus';
import LinkedInStatus from './MediaStatus/LinkedInStatus';
import PinterestStatus from './MediaStatus/PinterestStatus';
import TwitterStatus from './MediaStatus/TwitterStatus';
import WhatsappStatus from './MediaStatus/WhatsappStatus';
import YoutubeStatus from './MediaStatus/YoutubeStatus';

const ConnectedMedia = ({ socialMediaList, FB_INST_Disconnect }) => {
  const activeButton = useSelector(
    state => state.integrationSelector.active,
    shallowEqual
  );
  const linkedinStatus = useSelector(
    state => state?.authSelector?.pricingValidationObj
  );
  const displayString = str => {
    if (str?.length > 15) {
      return str?.slice(0, 15) + '...';
    } else {
      return str;
    }
  };
  return (
    <>
      {activeButton === 'Facebook' && (
        <FacebookStatus
          displayString={displayString}
          socialMediaList={socialMediaList}
          FB_INST_Disconnect={FB_INST_Disconnect}
        />
      )}
      {activeButton === 'Instagram' && (
        <InstagramStatus
          displayString={displayString}
          connectedAccounts={socialMediaList}
          FB_INST_Disconnect={FB_INST_Disconnect}
        />
      )}
      {activeButton === 'WhatsApp' && (
        <WhatsappStatus
          displayString={displayString}
          connectedAccounts={socialMediaList}
          FB_INST_Disconnect={FB_INST_Disconnect}
        />
      )}
      {linkedinStatus?.twitter_post && activeButton === 'Twitter' && (
        <TwitterStatus
          displayString={displayString}
          connectedAccounts={socialMediaList}
          FB_INST_Disconnect={FB_INST_Disconnect}
        />
      )}
      {activeButton === 'LinkedIn' && (
        <LinkedInStatus
          displayString={displayString}
          connectedAccounts={socialMediaList}
          FB_INST_Disconnect={FB_INST_Disconnect}
        />
      )}
      {/* {activeButton === "YouTube" && <YoutubeStatus displayString={displayString} connectedAccounts={socialMediaList} FB_INST_Disconnect={FB_INST_Disconnect} />} */}
      {activeButton === 'Pinterest' && (
        <PinterestStatus
          displayString={displayString}
          connectedAccounts={socialMediaList}
          FB_INST_Disconnect={FB_INST_Disconnect}
        />
      )}
    </>
  );
};

export default ConnectedMedia;
