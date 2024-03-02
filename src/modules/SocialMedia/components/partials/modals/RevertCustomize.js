import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import {
  updateCustomization,
  updateFeedDescription,
  socialMediaPopupName,
  socialMediaPopupToggle,
  updateFileList,
  updateComments,
  updateSocialIcon,
  updateSetCharacterLimit,
  updateDynamicUpload,
  updateSource,
  openFileType,
  setSelectedDataForPopup,
} from '../../../extendedAction';
import { updateDynamicComment } from '../../../actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const TextStyle = styled('div')`
  font-weight: 700;
  font-size: 17px;
  line-height: 19px;
  color: #4d4d4d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const Wrapper = styled('div')`
  .ant-divider-horizontal {
    margin: 15px 0px;
  }
  .Cancel {
    color: #999999;
    margin-right: 15px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #999999;
  }
  .Create {
    color: white;
    border-radius: 5px;
    background-color: #4aacea;
  }
  .fotter {
    height: 20px;
  }
`;
const PostButton = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  .infoText {
    color: #999999;
    font-size: 12px;
    margin-top: 7px;
    display: flex;
    margin-right: 20px;
  }
`;

const RevertCustomize = () => {
  const dispatch = useDispatch();
  const beforeCustomize = useSelector(
    state => state?.socialMedialExtended?.captureCustomization
  );
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload
  );

  const cancel = () => {
    dispatch(socialMediaPopupToggle(false));
    dispatch(
      setSelectedDataForPopup({
        platform_type: '',
        file_url: '',
        message: '',
        type: '',
      })
    );
  };

  const revertCustomize = () => {
    dispatch(updateCustomization(false));

    const Fileurl =
      beforeCustomize?.file_url[beforeCustomize?.file_url?.length - 1];
    const Extension = Fileurl?.url?.split('.').pop();

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

    let mediaPostObj = [];
    selectedAccounts?.forEach(item => {
      mediaPostObj.push({
        message: beforeCustomize?.message,
        comment: beforeCustomize?.comment,
        file_url: beforeCustomize?.file_url,
        file: beforeCustomize?.file,
        localFileList: beforeCustomize?.localFileList,
        connection_name: item,
        characterLimit: smallestCharacterLimitObj?.characterLimit,
        videoSource: smallestCharacterLimitObj?.videoSource,
        savedComment: smallestCharacterLimitObj?.savedComment,
        savedDelay: smallestCharacterLimitObj?.savedDelay,
        savedShedule: smallestCharacterLimitObj?.savedShedule,
      });
    });
    dispatch(updateDynamicUpload(mediaPostObj));
    dispatch(socialMediaPopupToggle(false));
    dispatch(socialMediaPopupName(''));
    dispatch(updateFeedDescription(beforeCustomize?.message));
    dispatch(
      updateFileList(Extension !== 'mp4' ? beforeCustomize?.file_url : '')
    );
    dispatch(updateComments(beforeCustomize?.comment));
    dispatch(updateSocialIcon());
    beforeCustomize?.comment
      ? dispatch(updateDynamicComment(beforeCustomize?.comment))
      : dispatch(updateDynamicComment(' '));
    dispatch(
      updateSource(
        beforeCustomize?.videoSource
          ? beforeCustomize?.videoSource
          : Extension === 'mp4' && Fileurl?.url
      )
    );
    if (beforeCustomize?.localFileList?.length > 0)
      dispatch(openFileType('image'));
    else {
      if (beforeCustomize?.videoSource) dispatch(openFileType('video'));
      else dispatch(openFileType('image'));
    }
  };
  return (
    <Wrapper>
      <TextStyle>Do you wish to revert the all the changes?</TextStyle>
      <PostButton>
        <Button type="primary" className="Cancel" onClick={() => cancel()}>
          Cancel
        </Button>
        <Button
          type="primary"
          className="Create"
          onClick={() => revertCustomize()}
        >
          revert
        </Button>
      </PostButton>
      <div className="fotter"></div>
    </Wrapper>
  );
};

export default RevertCustomize;
