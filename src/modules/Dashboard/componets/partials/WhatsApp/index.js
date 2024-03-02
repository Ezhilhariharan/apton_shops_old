import React from 'react';
import { Row, Col } from 'antd';
import IntroCards from '../WhatsApp/MainContent/IntroCards';
import SideCard from '../WhatsApp/SidebarContent/Sidecard';
import WatCampAnalytics from '../WhatsApp/MainContent/WatCampAnalytics';
const WhatsApp = ({
  dashboardCampaignDetails,
  currentUser,
  recentCampaigns,
  dashboardCampaignsList,
  setFromDate,
  setToDate,
  transactions,
  setGraphType,
  dashboardGrapDetails,
}) => {
  return (
    <Row style={{padding: '20px 20px'}}>
      <Col span={16}>
        <WatCampAnalytics
          setGraphType={setGraphType}
          dashboardGrapDetails={dashboardGrapDetails}
        />
        <IntroCards dashboardCampaignDetails={dashboardCampaignDetails} />
      </Col>

      <Col span={8}>
        <SideCard
          currentUser={currentUser}
          dashboardCampaignsList={dashboardCampaignsList}
          recentCampaigns={recentCampaigns}
          setFromDate={setFromDate}
          setToDate={setToDate}
          transactions={transactions}
        />
      </Col>
    </Row>
  );
};

export default WhatsApp;
