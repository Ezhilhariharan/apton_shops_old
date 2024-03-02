import React, { useState, useEffect ,useCallback} from 'react';
import { Row, Tooltip, Spin } from 'antd';
import Flex from '@components/common/Flex';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  MediaCategory,
} from './Pages.style';
import { updateActiveMediaCategory,updateDynamicUpload,updateFileRestriction } from '../../../../../extendedAction';

function MediaCategories() {
const dispatch = useDispatch();
  
const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount,
      );
const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon,
    ); 
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus,
  ); 
  const mediaCategoryList = useSelector(
    state => state?.socialMedialExtended?.mediaCategoryList,
  ); 
  const mediaCategory = useSelector(
    state => state?.socialMedialExtended?.activeMediaCategory,
    ); 
  const fileList = useSelector(
    state => state?.socialMedialExtended?.fileList,
    ); 
  const source = useSelector(
    state => state?.socialMedialExtended?.source,
  ); 
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload,
  ); 
    
 const handleDisable = btn => {
    if (
      mediaCategory === 'Feed' &&
      (activeSocialIcon === 'Facebook' || activeSocialIcon === 'Instagram') &&
      (source || fileList?.length > 0)
    ) {
      return false;
    } else {
      if (btn === 'Reels' && mediaCategory === 'Feed' && fileList?.length > 0) {
        return true;
      }
    }
    };
const mediaCategoryFunc = (
  data,
) => {
  if (data == 'Feed') {
    dispatch(updateActiveMediaCategory(data))
    dispatch(updateFileRestriction('.jpeg,.jpg,.mp4,.png'));
  } else {
    dispatch(updateActiveMediaCategory(data))
    dispatch(updateFileRestriction('.mp4'))   
  }
  if (customize) {
     let changeDynamicPayload = []
     dynamicPayload?.map(item => {
        if (activeSocialIcon === item?.connection_name)
         changeDynamicPayload.push({ ...item, mediaCategory: data })
        else  changeDynamicPayload.push({ ...item })
   });
     dispatch(updateDynamicUpload(changeDynamicPayload))
  } else {
    let changeDynamicPayload = []
      dynamicPayload?.map(item =>  changeDynamicPayload.push({...item,  mediaCategory: data }))
    dispatch(updateDynamicUpload(changeDynamicPayload))

  } 
};
  return (
    <Flex start>
              {(selectedAccounts?.length === 1 &&
                selectedAccounts?.includes('Instagram')) ||
              activeSocialIcon === 'Instagram' ? (
                <></>
              ) : (
                <Row>
                  {(selectedAccounts?.length == 1 ||
                    (customize && activeSocialIcon)) &&
                    mediaCategoryList?.map((activeButton, ind) => (
                      <MediaCategory
                        key={ind}
                        selectedTab={mediaCategory == activeButton}
                        onClick={() => mediaCategoryFunc(activeButton)}
                        disabled={handleDisable(activeButton)}
                      >
                        {activeButton}
                      </MediaCategory>
                    ))}
                </Row>
              )}
    </Flex>
  )
}

export default MediaCategories