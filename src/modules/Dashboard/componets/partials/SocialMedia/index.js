import React from 'react';
import { Row, Col } from 'antd';
import Postcards from './MainContent/Postcards';
import Recentposts from './SidebarContent/Recentposts';
import Tutorial from './MainContent/Tutorial';
import RecomendedVideos from './MainContent/RecomendedVideos';
import ChatBox from '../SocialMedia/SidebarContent/ChatBox';
const SocialMedia = ({ dashboardPostsList }) => {
  return (
    <Row style={{ padding: '20px 20px' }}>
      <Col span={16}>
        <Postcards />
        <Tutorial />
        <RecomendedVideos />
      </Col>
      <Col span={8}>
        <Recentposts dashboardPostsList={dashboardPostsList} />
        <ChatBox />
      </Col>
    </Row>
  );
};

export default SocialMedia;
