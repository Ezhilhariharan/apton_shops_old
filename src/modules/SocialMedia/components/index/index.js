import React from 'react';
import { Col, Row, Layout } from 'antd';
import styled from 'styled-components';
import Tabs from '../partials/Tabs/Tab';
import { useResponsive } from '@hooks/useResponsive';
import HeaderTabs from './HeaderTabs';
import SideBar from '../sidebar/index';

const { Content } = Layout;

const Body = styled(Content)`
  margin-top: 15px;
`;

const SocialMedia = ({}) => {
  const { tabletOnly } = useResponsive();
  return (
    <>
      <HeaderTabs />
      <Body>
        <Row justify="space-around">
          <Col span={tabletOnly ? 7 : 6}>
            <SideBar />
          </Col>
          <Col span={tabletOnly ? 16 : 17}>
            <Tabs />
          </Col>
        </Row>
      </Body>
    </>
  );
};
export default SocialMedia;
