import React, { useState, useEffect } from 'react';
import { EmptyHeader } from '../../../components/common/EmptyHeader';
import YoutubePopover from './YoutubePopover';
import LinkedinPagesPopover from './LinkedinPagesPopover';
import IntegrationParent from './partials/IntegrationParent';
import { useDispatch } from 'react-redux';
import { twitterActive } from '../actions';

const NewIntegration = ({
  FB_INST_Disconnect,
  youtubeChannels,
  linkedinPages,
  youtubeChannelsList,
  linkedinPagesList,
  CurentUser,
  linkedinPageSave,
  socialMediaList,
}) => {
  const [path, setPath] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(twitterActive(false));
    const params = new URLSearchParams(window.location.search);
    const connectionName = params.get('connection_name');
    setPath(connectionName);
    if (connectionName === 'YouTube') {
      youtubeChannelsList();
    }
    if (connectionName === 'Linkedin Pages') {
      linkedinPagesList();
    }
  }, [socialMediaList]);
  return (
    <>
      <EmptyHeader />
      <IntegrationParent FB_INST_Disconnect={FB_INST_Disconnect} />
      {path === 'YouTube' && (
        <YoutubePopover
          details={youtubeChannels}
          youtubeSave={youtubeSave}
          CurentUser={CurentUser}
        />
      )}
      {path === 'Linkedin Pages' && (
        <LinkedinPagesPopover
          details={linkedinPages}
          CurentUser={CurentUser}
          linkedinPageSave={linkedinPageSave}
        />
      )}
    </>
  );
};

export default NewIntegration;
