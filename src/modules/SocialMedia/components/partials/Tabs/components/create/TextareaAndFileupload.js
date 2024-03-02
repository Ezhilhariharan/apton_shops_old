import React, { useEffect, useRef, useCallback } from 'react';
import UploadFiles from '../../../modals/UploadFiles';
import VideoComponent from './VideoComponent';
import ImageComponent from './ImageComponent';
import CharacterLimit from './CharacterLimit';
import HashTagComponent from './HashTagComponent';
import Flex from '@components/common/Flex';

import { Input, Col, Row, Spin } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import { Main, Uploader, ParagraphError } from './Pages.style';

import {
  updateFeedDescription,
  updateSetRemoveId,
  updateSetRemoveIndexId,
  openImportMedia,
  openFileType,
  mediaPopupOpen,
  updateUnsplashFileList,
  updateSource,
  updateFileRestriction,
  updateDynamicUpload,
  updateFileList,
  updateSetCharacterLimit,
} from '../../../../../extendedAction';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const { TextArea } = Input;

export const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TextareaAndFileupload = ({
  tabs,
  uplodededFiles,
  dynamicallyObj,
  setUplodededFiles,
}) => {
  const fileInputRef = useRef(null);
  //const text = () => tooltipText(instruction);
  const dispatch = useDispatch();
  const feedDiscription = useSelector(
    state => state?.socialMedialExtended?.feedDescription
  );
  const click = useSelector(state => state?.socialMedialExtended?.mediaImport);
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  const source = useSelector(state => state?.socialMedialExtended?.source);
  const fileList = useSelector(state => state?.socialMedialExtended?.fileList);
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload
  );
  const uploading = useSelector(
    state => state?.socialMedialExtended?.mediaLoader
  );
  const addComment = useSelector(state => state?.socialMedialExtended?.Comment);
  const characterLimit = useSelector(
    state => state?.socialMedialExtended?.characterLimit
  );

  const uploadButton = (
    <div>
      {uploading ? (
        <Spin indicator={antIcon} style={{ margin: '10px 0px 0px 15px' }} />
      ) : (
        <PlusOutlined
          onClick={() => {
            dispatch(openImportMedia('import'));
            dispatch(mediaPopupOpen(true));
          }}
          style={{
            fontSize: '18px',
            cursor: 'pointer',
            padding: '10px',
            border: '1px solid #D9D9D9',
            borderRadius: '50%',
            color: '#D9D9D9',
          }}
        />
      )}
    </div>
  );

  const onTextChange = e => dispatch(updateFeedDescription(e.target.value));

  useEffect(() => updateDescription(), [feedDiscription]);

  useEffect(() => {
    if (fileList?.length > 0) {
      const uniqueList = fileList?.filter(
        (obj, index, self) =>
          index === self.findIndex(el => el?.thumbUrl === obj?.thumbUrl)
      );
      dispatch(updateFileList(uniqueList));
    }
  }, [uploading]);

  const updateDescription = () => {
    if (customize) {
      const changeDynamicPayload = [];
      dynamicPayload?.map(data => {
        if (activeSocialIcon === data?.connection_name)
          changeDynamicPayload.push({ ...data, message: feedDiscription });
        else changeDynamicPayload.push({ ...data });
      });
      dispatch(updateDynamicUpload(changeDynamicPayload));
    } else {
      dynamicallyObj(feedDiscription, addComment, uplodededFiles, fileList);
    }
  };

  // const handleDel = data => {
  //   const updatedItems = unSplashfileList?.filter(item => item.id !== data);
  //   // setUnSplashFileList(updatedItems);
  //    dispatch(updateUnsplashFileList(updatedItems))
  // };
  // for unsplashFlow

  useEffect(() => {
    if (!customize) {
      const smallestCharacterLimitObj = dynamicPayload?.reduce((acc, obj) => {
        if (
          obj.characterLimit < acc.characterLimit ||
          acc.characterLimit === undefined
        ) {
          return obj;
        } else {
          return acc;
        }
      }, {});
      dispatch(
        updateSetCharacterLimit(smallestCharacterLimitObj?.characterLimit)
      );
    } else {
    }
  }, [dynamicPayload]);

  // const handleFileDel = useCallback(
  //   (selectedData, removedIndexId) => {
  //     const updatedItems = fileList?.filter(
  //       item => item?.id !== selectedData?.id
  //     );
  //     dispatch(updateFileList(updatedItems));
  //     dispatch(updateSetRemoveId(selectedData));
  //     dispatch(updateSetRemoveIndexId(removedIndexId));

  //     fileInputRef.current.value = null;

  //     const updatedItem = uplodededFiles?.filter(
  //       (item, index) => index !== removedIndexId
  //     );
  //     console.log(selectedData, removedIndexId);

  //     console.log(fileList, dynamicPayload, activeSocialIcon, customize);

  //     setUplodededFiles(updatedItem);

  //     let changeDynamicPayload = [];

  //     dynamicPayload?.map(data => {
  //       const removeLocalFilelist = Array.isArray(data?.localFileList)
  //         ? data?.localFileList?.filter(
  //             item => item?.lastModified !== selectedData?.lastModified
  //           )
  //         : [];
  //       const removeFileUrl = Array.isArray(data?.file_url)
  //         ? data?.file_url?.filter(
  //             item => item?.id !== selectedData?.lastModified
  //           )
  //         : [];
  //       if (customize) {
  //         if (activeSocialIcon === data?.connection_name) {
  //           changeDynamicPayload.push({
  //             ...data,
  //             localFileList: [...removeLocalFilelist],
  //             file_url: [...removeFileUrl],
  //           });
  //         } else {
  //           changeDynamicPayload.push({ ...data });
  //         }
  //       } else {
  //         changeDynamicPayload.push({
  //           ...data,
  //           localFileList: [...removeLocalFilelist],
  //           file_url: [...removeFileUrl],
  //         });
  //       }
  //     });

  //     dispatch(updateDynamicUpload(changeDynamicPayload));
  //   },
  //   [fileList, dynamicPayload, activeSocialIcon, customize]
  // );

  const handleFileDel = (selectedData, removedIndexId) => {
    const updatedItems = fileList?.filter(
      item => item?.id !== selectedData?.id
    );
    dispatch(updateFileList(updatedItems));
    dispatch(updateSetRemoveId(selectedData));
    dispatch(updateSetRemoveIndexId(removedIndexId));

    fileInputRef.current.value = null;

    const updatedItem = uplodededFiles?.filter(
      (item, index) => index !== removedIndexId
    );
    setUplodededFiles(updatedItem);

    let changeDynamicPayload = [];

    dynamicPayload?.map(data => {
      const removeLocalFilelist = Array.isArray(data?.localFileList)
        ? data?.localFileList?.filter(
            item =>
              item?.lastModified !==
              (selectedData?.lastModified
                ? selectedData?.lastModified
                : selectedData?.id)
          )
        : [];
      const removeFileUrl = Array.isArray(data?.file_url)
        ? data?.file_url?.filter(
            item =>
              item?.id !==
              (selectedData?.lastModified
                ? selectedData?.lastModified
                : selectedData?.id)
          )
        : [];
      if (customize) {
        if (activeSocialIcon === data?.connection_name) {
          changeDynamicPayload.push({
            ...data,
            localFileList: [...removeLocalFilelist],
            file_url: [...removeFileUrl],
          });
        } else {
          changeDynamicPayload.push({ ...data });
        }
      } else {
        changeDynamicPayload.push({
          ...data,
          localFileList: [...removeLocalFilelist],
          file_url: [...removeFileUrl],
        });
      }
    });

    dispatch(updateDynamicUpload(changeDynamicPayload));
  };

  const deleteVideo = useCallback(() => {
    const changeDynamicPayload = [];
    dynamicPayload?.map(data => {
      if (customize) {
        if (activeSocialIcon === data?.connection_name)
          changeDynamicPayload.push({
            ...data,
            file_url: [],
            localFileList: [],
            videoSource: '',
          });
        else {
          changeDynamicPayload.push({ ...data });
        }
      } else {
        changeDynamicPayload.push({
          ...data,
          file_url: [],
          localFileList: [],
          videoSource: '',
        });
      }
    });
    dispatch(updateDynamicUpload(changeDynamicPayload));
    setUplodededFiles([]);
    dispatch(openFileType('image'));
    dispatch(updateFileList([]));
    dispatch(updateSource(''));
    dispatch(updateFileRestriction('.jpeg,.jpg,.mp4,.png'));
    fileInputRef.current.value = null;
  }, [dynamicPayload, customize, activeSocialIcon]);

  const handleDescription = useCallback(prop => {
    dispatch(updateFeedDescription(prop));
  });

  const errorValidation = () => {
    if (
      customize &&
      (activeSocialIcon === 'Pinterest' || activeSocialIcon === 'Instagram')
    ) {
      if (!source && fileList?.length == 0) return true;
      else return false;
    } else if (
      (selectedAccounts?.length === 2 &&
        selectedAccounts?.includes('Instagram') &&
        selectedAccounts?.includes('Pinterest')) ||
      (selectedAccounts?.length === 1 &&
        selectedAccounts?.includes('Instagram')) ||
      (selectedAccounts?.length === 1 &&
        selectedAccounts?.includes('Pinterest'))
    ) {
      if (!source && fileList?.length == 0) return true;
      else return false;
    } else return false;
  };
  return (
    <Main>
      <Input.Group>
        <Row>
          <Col span={20}>
            <TextArea
              showCount={false}
              maxLength={characterLimit}
              bordered={false}
              resize="none"
              className="textarea"
              value={feedDiscription}
              onChange={onTextChange}
              placeholder="Write Something....."
              style={{ resize: 'none' }}
              disabled={selectedAccounts?.length === 0 && true}
            ></TextArea>
          </Col>
          <Col span={4}>
            <CharacterLimit />
          </Col>
        </Row>
      </Input.Group>

      <div>
        <HashTagComponent handleDescription={handleDescription} />

        {selectedAccounts?.length > 0 && (
          <Flex
            style={{ width: '100%', overflowY: 'scroll', marginBottom: '10px' }}
          >
            {parseInt(tabs) == 3 ? (
              source && <VideoComponent deleteVideo={deleteVideo} />
            ) : (
              <Flex style={{ margintop: '20px' }}>
                {source ? (
                  <VideoComponent deleteVideo={deleteVideo} />
                ) : (
                  <ImageComponent handleFileDel={handleFileDel} />
                )}
              </Flex>
            )}
            {(!source &&
              selectedAccounts.length == 1 &&
              selectedAccounts[0] == 'Linkedin Pages') ||
            (customize && activeSocialIcon == 'Linkedin Pages')
              ? fileList.length >= 9
                ? null
                : !source && <Uploader> {uploadButton}</Uploader>
              : (selectedAccounts.length == 1 &&
                  selectedAccounts[0] == 'Twitter') ||
                (customize && activeSocialIcon == 'Twitter')
              ? fileList.length >= 4
                ? null
                : !source && <Uploader> {uploadButton}</Uploader>
              : (selectedAccounts.length == 1 &&
                  selectedAccounts[0] == 'Pinterest') ||
                (customize && activeSocialIcon == 'Pinterest')
              ? fileList.length >= 5
                ? null
                : !source && <Uploader> {uploadButton}</Uploader>
              : fileList.length >= 10
              ? null
              : !source && <Uploader> {uploadButton}</Uploader>}
          </Flex>
        )}

        {errorValidation() && (
          <ParagraphError>
            Please upload at least one image or video.
          </ParagraphError>
        )}

        {click === 'import' && (
          <UploadFiles tabs={tabs} fileInputRef={fileInputRef} />
        )}
      </div>
    </Main>
  );
};

export default TextareaAndFileupload;
