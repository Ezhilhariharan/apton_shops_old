import React from 'react';
import FacebookConnectButton from './FacebookConnectButton';
import InstagramConnectButton from './InstagramConnectButton';
import LinkedInConnectButton from './LinkedInConnectButton';
import PinterestConnectButton from './PinterestConnectButton';
import TwitterConnectButton from './TwitterConnectButton';
import WhatsappConnectButton from './WhatsappConnectButton';
import YoutubeConnectButton from './YoutubeConnectButton';

const SocialModalContent = ({ activeButton }) => {
  return (
    <>
      {activeButton === 'Facebook' && <FacebookConnectButton />}
      {activeButton === 'WhatsApp' && <WhatsappConnectButton />}
      {activeButton === 'Instagram' && <InstagramConnectButton />}
      {activeButton === 'Twitter' && <TwitterConnectButton />}
      {activeButton === 'LinkedIn' && <LinkedInConnectButton />}
      {activeButton === 'Pinterest' && <PinterestConnectButton />}
      {activeButton === 'YouTube' && <YoutubeConnectButton />}
    </>
  );
};

export default SocialModalContent;
