import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import { uploadFileList } from '../Tabs/components/partials/StaticData';
import { VideoFlex } from '../Tabs/components/create/Pages.style';
import {
  MainWrapper,
  Heading,
  ContentHeading,
  BorderBox,
  MediumName,
  MediaModal,
} from './UploadFiles';
import Flex from '@components/common/Flex';
import UnSplash from '@components/icons/UnSplash';

const EditUploader = ({
  setModalOpen,
  modalOpen,
  handleChange,
  handleVideoChange,
  fileRestriction,
  tabs,
  uploading,
  fileInputRef,
}) => {
  const fileurl = useSelector(state => state?.socialMedialIntegration?.sendUrl);
  const fileUploadLoader = useSelector(
    state => state?.socialMedialIntegration?.fileUploadLoader,
    shallowEqual
  );
  useEffect(() => {
    if (fileurl && fileUploadLoader) {
      setModalOpen(false);
    }
  }, [fileurl]);

  return (
    <MainWrapper>
      <MediaModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width="600px"
        style={{ borderRadius: '0px' }}
      >
        <Heading>Import media from</Heading>
        <Divider className="divider" />
        <ContentHeading> From device </ContentHeading>
        {parseInt(tabs) != 3 ? (
          <VideoFlex>
            <label className="custom-file-upload">
              <input
                className="input"
                type="file"
                onChange={handleChange}
                ref={fileInputRef}
                accept={fileRestriction}
              />
              {uploading ? 'Uploading...' : 'Select or Drag & Drop media'}
            </label>
          </VideoFlex>
        ) : (
          <VideoFlex>
            <label className="custom-file-upload">
              <input
                className="input"
                type="file"
                onChange={handleVideoChange}
                accept=".mp4"
              />
              <span style={{ marginTop: '10px', cursor: 'pointer' }}>
                {uploading ? 'Uploading...' : 'Select or Drag & Drop media'}
              </span>
            </label>
          </VideoFlex>
        )}
        <Divider className="dividerMargin" />
        <ContentHeading> From </ContentHeading>
        <BorderBox
        // style={{ cursor: 'pointer' }}
        // onClick={() => {
        //   setOpenUnsplash(true);
        //   setModalOpen(false);
        // }}
        >
          <>
            <UnSplash />
          </>
          <MediumName>Coming soon</MediumName>
        </BorderBox>
        <Divider className="dividerMargin" />
        <ContentHeading> Design with </ContentHeading>
        <Flex>
          {uploadFileList?.map(item => (
            <BorderBox>
              <>{item?.icon}</>
              <MediumName>{item?.name}</MediumName>
            </BorderBox>
          ))}
        </Flex>
      </MediaModal>
    </MainWrapper>
  );
};

export default EditUploader;
