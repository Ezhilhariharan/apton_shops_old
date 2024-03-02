import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Space, Badge, Layout, Button } from 'antd';
import { TabsButton } from './StaticData';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateButtons } from '../../actions';

const { Header } = Layout;

const HeaderWrapper = styled(Header)`
  height: 80px;
  background: #ffff;
  padding: 0px 0px 20px 7px;
`;

const Buttons = styled(Button)`
  height: 40px;
  background: #ffffff;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: black;
    background: #ffffff;
    border: 1px solid #4d4d4d;
  }
  &.btn-active {
    background: #4aacea;
    border-radius: 10px;
    color: white;
    border: none;
  }
`;

const Spacing = styled(Space)`
  margin: 10px;
`;

function HeaderTabs() {
  const dispatch = useDispatch();

  const buttonState = useSelector(
    state => state.socialMedialIntegration.buttons
  );
  const SocialMediaCount = useSelector(
    state => state?.socialMedialIntegration?.SocialMediaCount,
    shallowEqual
  );

  const navigatingTab = tabName => {
    dispatch(updateButtons(tabName));
  };

  return (
    <HeaderWrapper>
      {TabsButton?.map(tabs => (
        <Spacing direction="horizontal" key={tabs?.id}>
          {tabs?.name === 'Create' ? (
            <Buttons
              onClick={() => navigatingTab('Create')}
              className={buttonState === 'Create' ? 'btn-active' : ''}
            >
              {tabs?.name}
            </Buttons>
          ) : (
            <Badge
              count={
                tabs?.name === 'Scheduled'
                  ? SocialMediaCount?.scheduled_count
                  : tabs?.name === 'Published'
                  ? SocialMediaCount?.publish_count
                  : tabs?.name === 'Failed' && SocialMediaCount?.failed_count
              }
              color="#4AACEA"
            >
              <Buttons
                onClick={() => navigatingTab(tabs?.name)}
                className={buttonState === tabs?.name ? 'btn-active' : ''}
              >
                {tabs?.name}
              </Buttons>
            </Badge>
          )}
        </Spacing>
      ))}
    </HeaderWrapper>
  );
}

export default HeaderTabs;
