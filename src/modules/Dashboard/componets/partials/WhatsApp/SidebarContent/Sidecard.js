import React, { useEffect, useState } from 'react';
import { Card, DatePicker, Typography, Progress, Divider, Button } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { MoreOutlined } from '@ant-design/icons';
import RecentCampaigns from './RecentCampaigns';
import dayjs from 'dayjs';
import moment from 'moment';
import DashboardCalendar from '@components/icons/DashboardCalendar';
import { useSelector, shallowEqual } from 'react-redux';
import Recentposts from '../../SocialMedia/SidebarContent/Recentposts';
// import RecomendedVideos from '../../SocialMedia/MainContent/RecomendedVideos';
import Upgrade from '../../../../../upgrade/components/Upgrade';

export const Text = styled(Typography)`
  // width: 100%;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  padding-bottom: 10px;
  letter-spacing: 0px;
  color: #181818;
  font-size: ${props => props.fontSize || '1.125rem'};
  line-height: 19px;
  //color: ${props => props.fontColor || '#4D4D4D'};
`;
const Datecard = styled(Card)`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // justify-content: center;
  border: none;
  // .ant-card-body {
  //   padding: 20px 10px;
  // }
  .box {
    width: 100%;
    overflow: hidden;
    box-shadow: 0px 4px 14px rgba(79, 92, 128, 0.15);
    border-radius: 10px;

    .ant-picker-input input {
      width: 100%;
      padding: 5px 0px;
      color: #999999;
      font-weight: 400;
      font-size: 1rem;
    }
    &::-webkit-scrollbar {
      width: 0rem;
    }
  }
  .icon {
    padding: ${window.innerWidth < 1300
      ? '15px 0px 0px 16px'
      : '15px 15px 0px 16px'};
    width: 20px;
  }
  .betweenCont {
    padding: 15px;
    margin-top: 5px;
    font-weight: 700;
    font-size: 1rem;
    line-height: 19px;
    color: #4d4d4d;
  }
`;
const Contacts = styled(Card)`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  margin: 20px 0;
  height: 170px;
  border: none;
  .ant-card-body {
    padding: 20px;
  }
  .more {
    cursor: pointer;
    font-size: 1.25rem;
    color: black;
  }
`;
export const BuyMore = styled(Button)`
  width: 111px;
  height: 39px;
  border-radius: 5px;
  margin-top: 10px;
`;
export const More = styled(Button)`
  font-weight: 700;
  font-size: 1rem;
  color: #4aacea;
  //  margin-top: 0.60rem;
  font &:hover {
    color: #4aacea;
    background-color: #ffffff;
  }
  &:focus {
    color: #4aacea;
    background-color: #ffffff;
  }
`;
const SideCard = ({
  dashboardCampaignsList,
  dashboardPostsList,
  setFromDate,
  setToDate,
  transactions,
}) => {
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const currentDate = moment().format('DD/MM/YY');
  const monthStart = moment().startOf('month').format('DD/MM/YY');
  const [fdate, setfDate] = useState(moment(`${monthStart}`, 'DD/MM/YY'));
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [tdate, setTdate] = useState(moment(`${currentDate}`, 'DD/MM/YY'));
  const fromDate = (date, dateString) => {
    const value = dateString ? dayjs(dateString).toISOString() : null;
    setFromDate(value);
    setfDate(value);
  };
  const toDate = (date, dateString) => {
    const value = dateString ? dayjs(dateString).toISOString() : null;
    setToDate(value);
    setTdate(value);
  };
  const disabledFromDate = current => {
    let customDate = moment().format('YYYY-MM-DD');
    let currentDateTime = new Date(current)?.getTime();
    let endDate = new Date(tdate)?.getTime();
    if (current && current > moment(customDate, 'YYYY-MM-DD')) {
      return true;
    }
    if (current && currentDateTime > endDate) {
      return true;
    }
  };
  const disabledFutureDate = current => {
    let customDate = new Date()?.getTime();
    let selectedDate = new Date(current)?.getTime();
    if (selectedDate && selectedDate > customDate) {
      return true;
    }
  };
  const disabledToDate = current => {
    let customDate = moment().format('YYYY-MM-DD');
    let currentDateTime = new Date(current)?.getTime();
    let startDate = new Date(fdate)?.getTime();
    if (current && current > moment(customDate, 'YYYY-MM-DD')) {
      return true;
    }
    if (current && currentDateTime < startDate) {
      return true;
    }
  };
  const remaining =
    transactions?.overall_social_media_limit -
    transactions?.campaign_contact_limit;
  const persentage =
    (parseInt(transactions?.campaign_contact_limit) /
      parseInt(transactions?.overall_social_media_limit)) *
    100;

  return (
    <Flex style={{ display: 'block' }}>
      <Datecard>
        <Flex spaceBetween>
          <Flex className="box" start>
            <div className="icon">
              <DashboardCalendar />
            </div>
            <DatePicker
              disabledDate={(tdate && disabledFromDate) || disabledFutureDate}
              //disabled={(endingDate && beginningDate < endingDate)}
              defaultValue={moment(`${monthStart}`, 'DD/MM/YY')}
              bordered={false}
              onChange={fromDate}
              suffixIcon={false}
              placeholder="DD/MM/YY"
              style={{ margin: '0 5px' }}
            />
          </Flex>
          <div className="betweenCont"> To </div>
          <Flex className="box" start>
            <div className="icon">
              <DashboardCalendar />
            </div>
            <DatePicker
              defaultValue={moment(`${currentDate}`, 'DD/MM/YY')}
              disabledDate={(fdate && disabledToDate) || disabledFutureDate}
              // disabled={(beginningDate && beginningDate < endingDate)}
              bordered={false}
              onChange={toDate}
              suffixIcon={false}
              placeholder="DD/MM/YY"
              style={{ margin: '0 5px' }}
            />
          </Flex>
        </Flex>
      </Datecard>
      <Contacts>
        <Flex spaceBetween>
          <Text>Broadcast Limit</Text>
          {/* <Text>
            <MoreOutlined className='more' />
          </Text> */}
        </Flex>

        {transactions?.overall_limit === 'UNLIMITED' ? (
          <>
            <Divider style={{ marginTop: '10px' }} />
            <Flex spaceBetween style={{ marginTop: '30px' }}>
              <Text
                style={{
                  marginTop: '20px',
                  color: '#4d4d4d',
                  fontSize: '1rem',
                  fontWeight: '700',
                }}
              >
                Unlimited
              </Text>
              <Text
                style={{
                  marginTop: '20px',
                  color: '#4d4d4d',
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginLeft: '70px',
                }}
              >
                No of credits used :&nbsp;{transactions?.campaign_contact_limit}
              </Text>
            </Flex>
          </>
        ) : (
          <>
            <Divider style={{ marginTop: '10px' }} />
            <Flex spaceBetween>
              <Text
                style={{
                  marginTop: '20px',
                  color: '#4d4d4d',
                  fontSize: '1rem',
                  fontWeight: '700',
                }}
              >
                Total Credits :&nbsp;{transactions?.campaign_contact_limit}
                {transactions?.overall_social_media_limit}
              </Text>
              <Text
                style={{
                  marginTop: '20px',
                  color: '#4d4d4d',
                  fontSize: '1rem',
                  fontWeight: '700',
                }}
              >
                ({remaining} &nbsp;Remaining)
              </Text>
            </Flex>
            <Progress
              showInfo={false}
              percent={Math.round(persentage)}
              size="small"
            />
            {/* <Flex center>
              <BuyMore
                type="primary"
                // onClick={() => setOpenUpgrade(true)}
              >
                Buy More
              </BuyMore>
            </Flex> */}
          </>
        )}
      </Contacts>
      <RecentCampaigns dashboardCampaignsList={dashboardCampaignsList} />
      {/* <ChatBox/> */}
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </Flex>
  );
};

export default SideCard;
