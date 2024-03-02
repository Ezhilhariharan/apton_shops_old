import React, { useState } from 'react';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { TitleInput, PinterestWrapper } from './Pages.style';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  updateDynamicUpload,
  updatePinterestTitle,
} from '../../../../../extendedAction';

function PinterestTitle() {
  const dispatch = useDispatch();

  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload
  );
  const title = useSelector(
    state => state?.socialMedialExtended?.pinterestTitle
  );

  const onTileChange = e => {
    const changeDynamicPayload = [];
    dynamicPayload?.map(data => {
      if (customize) {
        if (activeSocialIcon === data?.connection_name) {
          changeDynamicPayload.push({ ...data, title: e.target.value });
        } else {
          changeDynamicPayload.push({ ...data });
        }
      } else {
        if (data?.connection_name === 'Pinterest') {
          changeDynamicPayload.push({ ...data, title: e.target.value });
        } else {
          changeDynamicPayload.push({ ...data });
        }
      }
    });
    dispatch(updateDynamicUpload(changeDynamicPayload));
    dispatch(updatePinterestTitle(e.target.value));
  };
  return (
    <>
      {((selectedAccounts?.length == 1 && selectedAccounts[0] == 'Pinterest') ||
        (customize && activeSocialIcon == 'Pinterest')) && (
        <PinterestWrapper>
          <TitleInput
            maxLength={100}
            value={title}
            onChange={onTileChange}
            placeholder="Add Title..."
          />
          <span
            style={{
              color: '#999999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {title?.length ? title?.length : 0}/100
          </span>
        </PinterestWrapper>
      )}
    </>
  );
}

export default PinterestTitle;
