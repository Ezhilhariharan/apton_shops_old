import React, { useEffect, useState } from 'react';
import SideBar from '../sidebar/SideBar';
import CreateSideBar from '../sidebar/CreateSideBar';
import { Card, Checkbox, Spin } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { socialmediaAccountsList } from '../../components/index/StaticData';
import { getSocialMediaList } from '../../../NewIntegration/actions';
import { useResponsive } from '@hooks/useResponsive';
import { getSocialMediaCount, updateButtons } from '../../actions';
import {
  updateSelectedAccounts,
  updateAvailableAccounts,
} from '../../extendedAction';

const StyledCard = styled(Card)`
height:100%;
.ant-card-head-title{
  font-weight: 700;
  font-size: 17px;
  line-height: 19px;
  margin-top:13px;
}
justify-content: center;
align-items: center;
border-radius: 10px;
.ant-card-body {
  padding:0px;  
}}`;

const CheckBoxGroup = styled(Checkbox.Group)`
  width: 100%;
  margin-top: 20px;
`;

export default function index() {
  const dispatch = useDispatch();
  const { tabletOnly } = useResponsive();

  const buttonState = useSelector(
    state => state.socialMedialIntegration.buttons
  );
  const socialMediaList = useSelector(
    state => state?.integrationSelector.socialMediaList
  );
  const linkedinStatus = useSelector(
    state => state?.authSelector?.pricingValidationObj
  );
  const brand = useSelector(state => state?.parentReducer?.switchedBrand);
  const accounts = useSelector(
    state => state?.socialMedialExtended?.availableAccounts
  );

  useEffect(() => {
    dispatch(getSocialMediaList());
    mergingData();
    dispatch(getSocialMediaCount());
    // const storedButtonState = localStorage.getItem('Create');
    // if (storedButtonState) dispatch(updateButtons('Create'));
    dispatch(updateButtons('Create'));
  }, []);

  useEffect(() => {
    mergingData();
  }, [socialMediaList, brand]);

  useEffect(() => {
    getSocialMediaList();
  }, [brand]);

  useEffect(() => {
    localStorage.setItem('Create', buttonState);
  }, [buttonState]);

  const onChange = checkedValues => {
    let filtered = [];
    checkedValues?.map(parent => {
      accounts?.map(data => {
        if (data.title == parent) {
          if (parseInt(data?.apiData?.connection_status) == 0) {
            notification?.warn({
              message: '',
              description: `Connect ${parent}`,
            });
            filtered = checkedValues?.filter(item => item != parent);
          } else {
            filtered = checkedValues;
          }
        }
      });
    });
    dispatch(updateSelectedAccounts(filtered));
  };

  const mergingData = () => {
    let merging = [];
    socialmediaAccountsList?.map(parent => {
      socialMediaList?.map(child => {
        if (child?.platform_name == parent?.title) {
          parent?.title != 'Twitter'
            ? merging?.push({ ...parent, apiData: child, checked: false })
            : merging?.push({
                ...parent,
                apiData: child,
                checked: false,
                activeStatus: linkedinStatus?.twitter_post,
              });
        }
      });
    });
    dispatch(updateAvailableAccounts(merging));
  };

  return (
    <StyledCard title="Social Accounts" bordered={false}>
      {buttonState === 'Create' ? (
        accounts?.length === 0 ? (
          <Loading />
        ) : (
          accounts?.map(item => {
            return (
              <CreateSideBar
                buttonState={buttonState}
                tabletOnly={tabletOnly}
                item={item}
                key={item?.id}
              />
            );
          })
        )
      ) : (
        <CheckBoxGroup onChange={onChange}>
          {accounts?.map(item => (
            <SideBar
              buttonState={buttonState}
              tabletOnly={tabletOnly}
              item={item}
              key={item?.id}
            />
          ))}
        </CheckBoxGroup>
      )}
    </StyledCard>
  );
}
