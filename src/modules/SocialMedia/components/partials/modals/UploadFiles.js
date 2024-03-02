import React, { useEffect, useState, useRef } from 'react';
import { Divider, Typography, Upload, Modal, notification } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import UnSplash from '@components/icons/UnSplash';
import { uploadFileList } from '../Tabs/components/partials/StaticData';
import { PlusOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
import { VideoFlex } from '../Tabs/components/create/Pages.style';
import UnsplashPop from './UnsplashPop';
//redux
import {
  mediaPopupOpen,
  updateMediaLoader,
  updateFileList,
  updateMediaCategoryList,
  updateActiveMediaCategory,
  updateDynamicUpload,
  updateSource,
  updateFileRestriction,
  openFileType,
  updateUnsplashFileList,
  // updateFileUpload,
} from '../../../extendedAction';
import { Unsplash, preSendURl, updateFileUpload } from '../../../actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

export const MainWrapper = styled('div')`
  width: 100%;
  .divider {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 0px;
  }
  .dividerMargin {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 0px;
    margin-top: 17px;
  }
`;
export const Heading = styled(Typography)`
  font-weight: 700;
  font-size: 18px;
  color: #4d4d4d;
  margin-bottom: 12px;
`;

export const ContentHeading = styled(Typography)`
  font-weight: 500;
  font-size: 15px;
  color: #4d4d4d;
  margin: 12px 0 12px 0;
`;

export const BorderBox = styled('div')`
  background: #ffffff;
  border: 1px solid #f4f4f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 2px 10px 2px 10px;
  width: 100px;
  height: 100px;
`;

export const MediumName = styled('div')`
  font-weight: 700;
  font-size: 10px;
  color: #4d4d4d;
  margin: 10px 0px 0px 0px;
`;

export const StyledDragger = styled(Upload)`
  width: 100%;
  .ant-upload {
    width: 100%;
  }
  .ant-upload-list-picture-card-container {
    display: none !important;
  }

  .ant-upload.ant-upload-select-picture-card:hover {
    border-color: #d9d9d9;
  }
  .ant-upload.ant-upload-select-picture-card {
    border: none;
    border-radius: 10px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: none !important;
  }
  .ant-upload-list-picture .ant-upload-list-item,
  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0px;
  }
  .text {
    font-weight: 700;
    font-size: 14px;
    color: #4d4d4d;
  }
`;
export const MediaModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
  }
`;
const UploadFiles = ({ tabs, fileInputRef }) => {
  // const [openUnsplash, setOpenUnsplash] = useState(false);
  const dispatch = useDispatch();
  const modalOpen = useSelector(
    state => state?.socialMedialExtended?.mediaPopupOpen
  );
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const fileList = useSelector(state => state?.socialMedialExtended?.fileList);
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload
  );
  const fileUploadLoader = useSelector(
    state => state?.socialMedialIntegration?.fileUploadLoader,
    shallowEqual
  );
  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  const fileRestriction = useSelector(
    state => state?.socialMedialExtended?.fileRestriction
  );
  const source = useSelector(state => state?.socialMedialExtended?.source);
  const uploading = useSelector(
    state => state?.socialMedialExtended?.mediaLoader
  );
  const fileurl = useSelector(state => state?.socialMedialIntegration?.sendUrl);

  useEffect(() => {
    if (source) {
      dispatch(updateFileRestriction('.mp4'));
    } else if (fileList?.length > 0) {
      dispatch(updateFileRestriction('.jpeg,.jpg,.png'));
    } else {
      dispatch(updateFileRestriction('.jpeg,.jpg,.mp4,.png'));
    }

    if (parseInt(fileList?.length) === 0) {
      dispatch(updateFileRestriction('.jpeg,.jpg,.mp4,.png'));
    }
  }, [selectedAccounts, source, fileList]);

  useEffect(() => {
    dispatch(updateFileUpload(''));
    if (selectedAccounts?.length > 0 && fileurl && uploading) {
      dispatch(mediaPopupOpen(false));
    }
  }, [fileurl, uploading]);

  const handleChange = event => {
    let checkingType = file?.type.split('/')?.[0];
    const file = event.target.files[0];
    const name = event.target.files[0]?.name;
    const type = file?.name?.split('.').pop();
    if (type === type?.toUpperCase()) {
      notification.warn({
        message: '',
        description: 'Only supported formats are jpg, jpeg, mp4,png',
      });
      dispatch(mediaPopupOpen(false));
    } else {
      if (checkingType === 'image') {
        updateImageUrl(file, name);
      } else {
        if (
          parseInt(selectedAccounts?.length) === 1 &&
          selectedAccounts[0] === 'Instagram'
        ) {
          updateImageUrl(file, name);
        } else {
          updateImageUrl(file, name);
        }
      }
    }
    event.target.value = '';
  };

  const updateImageUrl = async (file, name) => {
    let imageUrl = await getBase64(file);
    let fileObj = {
      name: name,
      status: 'done',
      lastModified: file?.lastModified,
      originFileObj: file,
    };
    let checkingType = file?.type.split('/')?.[0];
    if (checkingType === 'image') {
      if (
        parseInt(selectedAccounts?.length) === 1 &&
        selectedAccounts[0] === 'Instagram'
      ) {
        dispatch(openFileType('image'));
        dispatch(updateFileRestriction('.jpeg,.jpg,.png'));
      } else {
        dispatch(openFileType('image'));
        dispatch(updateFileRestriction('.jpeg,.jpg,.png'));
        if (customize) {
          if (
            activeSocialIcon === 'Twitter' ||
            activeSocialIcon === 'Pinterest'
          ) {
          } else {
            dispatch(updateMediaCategoryList(['Feed', 'Reels']));
            dispatch(updateActiveMediaCategory('Feed'));
          }
        } else {
          if (
            parseInt(selectedAccounts?.length) === 1 &&
            (selectedAccounts[0] === 'Twitter' ||
              selectedAccounts[0] === 'Pinterest')
          ) {
          } else if (
            parseInt(selectedAccounts?.length) === 1 &&
            selectedAccounts[0] === 'Facebook Groups'
          ) {
          } else {
            dispatch(updateMediaCategoryList(['Feed', 'Reels']));
            dispatch(updateActiveMediaCategory('Feed'));
          }
        }
      }
    } else {
      if (
        parseInt(selectedAccounts?.length) === 1 &&
        selectedAccounts[0] === 'Instagram'
      ) {
        dispatch(openFileType('image'));
        dispatch(updateFileRestriction('.jpeg,.jpg,.png'));
      } else {
        dispatch(openFileType('video'));
      }
    }
  };
  const getBase64 = file => {
    new Promise((resolve, reject) => {
      const currentObj = Object.assign(file, {
        lastModifiedSet: Math.floor(Date.now() / 1000),
      });
      const reader = new FileReader();
      let permitted = null;
      if (file) {
        dispatch(updateMediaLoader(true));
        reader.readAsDataURL(file);
        const fileName = file?.name;
        if (fileList?.length > 0) {
          for (let i = 0; i < fileList.length; i++) {
            const item = fileList[i];
            if (item?.name === fileName) {
              permitted = false;
              dispatch(mediaPopupOpen(false));
              dispatch(updateMediaLoader(false));
              break;
            } else {
              permitted = true;
            }
          }
        } else {
          permitted = true;
        }
      }
      if (permitted) {
        reader.addEventListener('load', event => {
          const _loadedImageUrl = event.target.result;
          // instagram ,facebook post validate
          if (file?.type?.startsWith('image/')) {
            const image = document.createElement('img');
            image.src = _loadedImageUrl;

            updatingImage(image.src, currentObj, file);
            resolve(_loadedImageUrl);
          } else if (file?.type?.startsWith('video/')) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = function () {
              updatingVideo(video.src, currentObj);
              resolve(_loadedImageUrl);
            };
            video.src = URL.createObjectURL(file);
            if (!fileUploadLoader) {
              dispatch(mediaPopupOpen(false));
            }
          }
        });
      }
      reader.onerror = error => reject(error);
    });
  };

  const updatingImage = (img, currentObj, file) => {
    const updatedFileList = [];
    updatedFileList.push(...fileList, {
      thumbUrl: img,
      lastModified: currentObj?.lastModifiedSet,
      id: fileList?.length + 1,
      name: file?.name,
    });
    dispatch(updateFileList(updatedFileList));
    let checkingType = file?.type.split('/')?.[0];
    const updateDynamicPayload = [];
    dynamicPayload?.map(data => {
      if (customize) {
        if (activeSocialIcon === data?.connection_name) {
          checkingType === 'image'
            ? updateDynamicPayload.push({
                ...data,
                localFileList: updatedFileList,
              })
            : updateDynamicPayload.push({ ...data, localFileList: [] });
        } else updateDynamicPayload.push({ ...data });
      } else {
        checkingType === 'image'
          ? updateDynamicPayload.push({
              ...data,
              localFileList: updatedFileList,
            })
          : updateDynamicPayload.push({ ...data, localFileList: [] });
      }
    });
    dispatch(updateDynamicUpload(updateDynamicPayload));
    sendFile(currentObj);
  };

  const updatingVideo = (video, currentObj) => {
    sendFile(currentObj);
    if (customize) {
      if (activeSocialIcon === 'Twitter' || activeSocialIcon === 'Pinterest') {
      } else {
        dispatch(updateMediaCategoryList(['Feed', 'Reels']));
        dispatch(updateActiveMediaCategory('Reels'));
      }
      const updateDynamicPayload = [];
      dynamicPayload?.map(data => {
        if (activeSocialIcon === data?.connection_name)
          updateDynamicPayload.push({
            ...data,
            videoSource: video,
          });
        else updateDynamicPayload.push({ ...data });
      });
      dispatch(updateDynamicUpload(updateDynamicPayload));
    } else {
      const updateDynamicPayload = [];
      dynamicPayload?.map(data =>
        updateDynamicPayload.push({ ...data, videoSource: video })
      );
      dispatch(updateDynamicUpload(updateDynamicPayload));
    }
    dispatch(updateSource(video));
  };

  const handleVideoChange = event => {
    const file = event.target.files[0];
    const name = event.target.files[0]?.name;
    updateVideoUrl(file, name);
    dispatch(updateMediaLoader(true));
  };

  const sendFile = fileData => {
    let fileName = fileData?.name?.split('.')[0];
    let fileType = fileData?.name?.split('.').pop();
    const body = {
      file_name: `${fileName?.replace(/\s|\(|\)/g, '')}.${fileType?.replace(
        /\s/g,
        ''
      )}`,
      file_path: fileData,
    };
    dispatch(preSendURl(body, fileType, fileData));
  };

  return (
    <MainWrapper>
      <MediaModal
        open={modalOpen}
        onCancel={() => dispatch(mediaPopupOpen(false))}
        footer={null}
        width="600px"
        style={{ borderRadius: '0px' }}
      >
        <Heading>Import media from</Heading>
        <Divider className="divider" />
        <ContentHeading> From device </ContentHeading>
        {parseInt(tabs) == 1 ? (
          <div className="margintop">
            <>
              <VideoFlex>
                <label className="custom-file-upload">
                  <input
                    className="input"
                    type="file"
                    onChange={handleChange}
                    ref={fileInputRef}
                    accept={fileRestriction}
                  />
                  Select media
                </label>
              </VideoFlex>
            </>
          </div>
        ) : (
          <VideoFlex>
            <label className="custom-file-upload">
              <input
                className="input"
                type="file"
                onChange={handleVideoChange}
                ref={fileInputRef}
                accept=".mp4"
              />
              Select media
            </label>
          </VideoFlex>
        )}

        <Divider className="dividerMargin" />
        <ContentHeading> From </ContentHeading>
        <BorderBox>
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
      {/* {openUnsplash && (
        <UnsplashPop
          openUnsplash={openUnsplash}
          setOpenUnsplash={setOpenUnsplash}
        />
      )} */}
    </MainWrapper>
  );
};

export default UploadFiles;
