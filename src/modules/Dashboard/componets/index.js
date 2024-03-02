import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd';
import IntroCards from './partials/WhatsApp/MainContent/IntroCards';
import SideCard from './partials/WhatsApp/SidebarContent/Sidecard';
import WhatsApp from './partials/WhatsApp';
import SocialMedia from './partials/SocialMedia';
import Flex from '@components/common/Flex';
import { Divider } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, shallowEqual } from 'react-redux';
import dayjs from 'dayjs';

const Text = styled(Typography)`
  color: #181818;
  margin-left: 10px;
  font-size: 1.125rem;
  font-weight: 700;
  padding: 10px 0px 0px 12px;
`;
const Dashboard = ({
  dashboardCampaignDetails,
  campaignsList,
  currentUser,
  recentPosts,
  recentCampaigns,
  dashboardPostsList,
  dashboardCampaignsList,
  postLists,
  postListStatus,
  transactions,
  transactionsLimit,
  dashboardGrapDetails,
  graphDetails,
}) => {
  const brand = useSelector(state => state.parentReducer.switchedBrand);
  const now = dayjs();
  const currentDate = dayjs(now).toISOString();
  const monthStart = moment().startOf('month').format();
  const startDate = dayjs(monthStart).add('1', 'day').toISOString();
  const [fromdate, setFromDate] = useState();
  const [todate, setToDate] = useState();
  const [graphtype, setGraphType] = useState('Campaign');
  const accountId = currentUser?.account?.id;
  const addFrom = fromdate && dayjs(fromdate).toISOString();
  const addTo = todate && dayjs(todate).toISOString();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (brand && accountId) {
      campaignsList(
        accountId,
        brand?.id,
        addFrom,
        addTo,
        startDate,
        currentDate
      );
      postLists(accountId, brand?.id, addFrom, addTo, startDate, currentDate);
      transactionsLimit(accountId, brand?.id);
      graphDetails(
        accountId,
        brand?.id,
        addFrom,
        addTo,
        graphtype,
        startDate,
        currentDate
      );
      recentCampaigns(
        accountId,
        brand?.id,
        addFrom,
        addTo,
        startDate,
        currentDate
      );
      recentPosts(accountId, brand?.id, addFrom, addTo, startDate, currentDate);
    }
  }, [fromdate, todate, brand, accountId, graphtype]);
  return (
    <Row>
      <Col span={24} style={{ width: '100%' }}>
        <WhatsApp
          currentUser={currentUser}
          dashboardCampaignsList={dashboardCampaignsList}
          recentCampaigns={recentCampaigns}
          setFromDate={setFromDate}
          setToDate={setToDate}
          transactions={transactions}
          setGraphType={setGraphType}
          dashboardGrapDetails={dashboardGrapDetails}
          dashboardCampaignDetails={dashboardCampaignDetails}
          dashboardPostsList={dashboardPostsList}
        />
      </Col>
      <Col span={5}>
        <Text>Social Media Automation</Text>
      </Col>
      <Col span={18}>
        <Divider style={{ border: '1px solid #D9D9D9',width: "100%" }} />
      </Col>
      <Col span={24}>
        <SocialMedia
          recentPosts={recentPosts}
          setFromDate={setFromDate}
          setToDate={setToDate}
          postListStatus={postListStatus}
          dashboardPostsList={dashboardPostsList}
        />
      </Col>

      {/* <Col span={7}>
        <SideCard
          currentUser={currentUser}
          recentPosts={recentPosts}
          
          dashboardCampaignsList={dashboardCampaignsList}
          
          setFromDate={setFromDate}
          setToDate={setToDate}

           />
      </Col> */}
      {/* <Col span={24}><RecomendedVideos /></Col> */}
    </Row>
  );
};

export default Dashboard;
