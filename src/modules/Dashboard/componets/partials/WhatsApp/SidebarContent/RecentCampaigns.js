import React, { useState, useEffect } from 'react';
import { Text, More } from './Sidecard';
import Flex from '@components/common/Flex';
import { Card, Carousel, Divider, Progress, Tooltip, Spin } from 'antd';
import styled from 'styled-components';
import { MoreOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Prospects from '@components/icons/Prospects';
import Leads from '@components/icons/Leads';
import Opens from '@components/icons/Opens';
import TutorialImage from '@components/icons/TutorialImage';
import { useSelector, shallowEqual } from 'react-redux';
import { MarginBottom } from '../../../../../SocialMedia/components/partials/modals/ViewStyle';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
// import { Chart } from 'react-chartjs-2';

const Campaigns = styled(Card)`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  // height: 335px;
  border: none;
  .ant-card-body {
    padding: 20px;
  }
  .more {
    cursor: pointer;
    font-size: 1.25rem;
    color: black;
  }
  .image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // transform: translate(0px, 20px);
  }
`;
const Content = styled.div`
  display: block;
  // margin: 10px 50px;

  .discount {
    font-weight: 500;
    font-size: 1.25rem;
    color: #4d4d4d;
  }
`;

export const calculatePercentage = (count, total) => {
  if (total === 0) return 0;
  const percentage = (count / total) * 100;
  return Math.min(percentage, 100);
};
const RecentCampaigns = ({ dashboardCampaignsList }) => {
  const [list, setList] = useState(dashboardCampaignsList?.list);
  const campaigns = dashboardCampaignsList?.list?.map(item => {
    return item;
  });
  const loader = useSelector(
    state => state?.socialMedialIntegration?.loader,
    shallowEqual
  );
  const addform = useSelector(
    state => state?.dashboardIntegration?.dashboardCampaignsList,
    shallowEqual
  );
  const values = campaigns
    ?.filter(name => name?.status !== 0)
    .map(filteredName => {
      return filteredName;
    });
  useEffect(() => {
    setList(dashboardCampaignsList?.list);
  }, [dashboardCampaignsList?.list]);
  const displayString = str => {
    if (str?.length > 15) {
      return str?.slice(0, 15) + '...';
    } else {
      return str;
    }
  };

  return (
    <Campaigns>
      <Flex spaceBetween>
        <Text>Recent Campaigns</Text>
        {/* <Text>
          <MoreOutlined className="more" />
        </Text> */}
      </Flex>
      <Divider style={{ marginTop: '10px' }} />
      {list?.length === 0 && (
        <div className="image">
          <TutorialImage />{' '}
          <Text
            style={{ marginTop: '5px', fontSize: '1rem', color: '#4d4d4d' }}
          >
            No Recent Campaign's found
          </Text>
        </div>
      )}
      <Spin spinning={loader}>
        <Carousel autoplay dots={false}>
          {values !== '' &&
            values?.length > 0 &&
            values?.map(data => {
              const proPercentage = calculatePercentage(
                data.prospects_count,
                data.prospects_count
              );
              const leadsPercentage = calculatePercentage(
                data.leads,
                data.leads + data.prospects_count
              );
              const opensPercentage = calculatePercentage(
                data.seen_count,
                data.prospects_count
              );
              const name =
                data?.name.charAt(0).toUpperCase() + data?.name.slice(1);

              const dataPieChart = {
                // labels: ['Delivered', 'Leads', 'opens'],
                datasets: [
                  {
                    data: [proPercentage, leadsPercentage, opensPercentage],
                    backgroundColor: ['#7D7EE5', '#46A5F2', '#EF9F39'],
                  },
                ],
              };

              const chartOptions = {
                options: {
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                },
              };

              return (
                <div key={data?.id}>
                  {values?.length > 0 && (
                    <Flex
                      style={{
                        marginTop: '1rem',
                        alignItems: 'center',
                        gap: '30px',
                        width: '150px',
                        height: '150px',
                      }}
                    >
                      <Doughnut data={dataPieChart} options={chartOptions} />
                      {/* <Progress
                        type="circle"
                        percent={100}
                        width={150}
                        height={150}
                        strokeColor={limitsColor}
                        strokeWidth={15}
                        format={() => ''}
                      /> */}
                      <Flex style={{ alignItems: 'center' }}>
                        <Content style={{ width: '100%' }}>
                          <Tooltip
                            placement="top"
                            title={name?.length > 15 && name}
                          >
                            <Text
                              style={{
                                width: '16rem',
                                fontSize: '1rem',
                                borderBottom: '1px solid #e4e8ef',
                                marginBottom: '20px',
                              }}
                            >
                              {displayString(name)}
                            </Text>
                          </Tooltip>
                          {/* <p className="discount">10% off on all collections</p> */}

                          {datas?.map(list => {
                            return (
                              <Flex style={{ marginTop: '10px' }}>
                                {list?.icon}
                                <p
                                  style={{
                                    marginLeft: '5px',
                                    marginTop: '-4px',
                                    color: '#181818',
                                    fontSize: '0.938rem',
                                    fontWeight: '500',
                                  }}
                                >
                                  {list?.name === 'Prospects'
                                    ? 'Delivered'
                                    : list?.name}
                                  &nbsp;
                                  {list?.name === 'Prospects'
                                    ? data?.prospects_count !== 0
                                      ? Math.round(proPercentage) + '%'
                                      : '0%'
                                    : list?.name === 'No.of Leads'
                                    ? data?.leads !== 0
                                      ? Math.round(leadsPercentage) + '%'
                                      : '0%'
                                    : data?.seen_count !== 0
                                    ? Math.round(opensPercentage) + '%'
                                    : '0%'}
                                </p>
                              </Flex>
                            );
                          })}
                        </Content>
                      </Flex>
                    </Flex>
                  )}
                </div>
              );
            })}
        </Carousel>

        <Flex center>
          <More type="link" href="/whatsapp-marketing">
            See All Campagins <ArrowRightOutlined />
          </More>
        </Flex>
      </Spin>
    </Campaigns>
  );
};

const datas = [
  {
    name: 'Prospects',
    icon: <Prospects />,
  },
  {
    name: 'No.of Leads',
    icon: <Leads />,
  },
  {
    name: 'No.of Opens',
    icon: <Opens />,
  },
];
export default RecentCampaigns;
