import React from 'react';
import { Row, Col, Card, Typography, Progress } from 'antd';
import styled from 'styled-components';
import WatCampAnalytics from '../../WhatsApp/MainContent/WatCampAnalytics';
import Postcards from '../../WhatsApp/SidebarContent/RecentCampaigns';
import Tutorial from '../../SocialMedia/MainContent/Tutorial';
import Flex from '@components/common/Flex';
import RecomendedVideos from '../../SocialMedia/MainContent/RecomendedVideos';
import TotalCampaign from '../../../../../../assets/images/totalCampaign.png';
import Totalcamp from '@components/icons/Totalcamp';
import Running from '@components/icons/Running';
import Schedule from '../../../../../../components/icons/Schedule';

const Cards = styled(Card)`
  width: 93%;
  background: #ffffff;
  border: none;
  border-radius: 10px;
  margin: 20px 0;
  height: 150px;
  .ant-card-body {
    padding: 20px;
  }
`;
const Text = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;total_list
  font-weight: 700;
  font-size: 1.125rem;
`;
const Count = styled.div`
  font-weight: 700;
  font-size: 3rem;
  line-height: 40px;
  color: #4d4d4d;
  margin-top: 40px;
`;

const IntroCards = ({
  dashboardCampaignDetails,
  postListStatus,
  dashboardGrapDetails,
  setGraphType,
}) => {
  const running = parseInt(dashboardCampaignDetails?.running);
  const scheduled = parseInt(dashboardCampaignDetails?.scheduled);
  const total = parseInt(dashboardCampaignDetails?.total_list);
  const runningPercent = running ? (running / total) * 100 : 0;
  const scheduledPercent = scheduled ? (scheduled / total) * 100 : 0;
  const campaginCount = {
    'Total Campaigns': total,
    Running: running,
    Scheduled: scheduled,
  };
  return (
    <>
      <Row
        gutter={{
          xs: 4,
          sm: 12,
          md: 24,
          lg: 32,
        }}
      >
        {data?.map(campdata => {
          return (
            <Col span={8}>
              <Cards>
                <Text
                  style={{
                    color:
                      campdata?.name === 'Total Campaigns'
                        ? ' #7D7EE5'
                        : campdata?.name === 'Running'
                        ? '#00AC4F'
                        : '#F09E00',
                  }}
                >
                  {campdata?.name}
                </Text>

                <Flex
                  spaceBetween
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'block' }}>
                    <Count> {campaginCount[campdata?.name] || 0}</Count>
                  </div>

                  {campdata?.icon}
                </Flex>
              </Cards>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
const data = [
  {
    id: 1,
    name: 'Total Campaigns',
    image: TotalCampaign,
    icon: <Totalcamp />,
  },
  {
    id: 2,
    name: 'Running',
    image: Running,
    icon: <Running />,
  },
  {
    id: 3,
    name: 'Scheduled',
    image: Schedule,
    icon: <Schedule />,
  },
];
export default IntroCards;
