import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { Card, Typography, Select, Divider, Radio, Button } from 'antd';
import Flex from '@components/common/Flex';
import moment from 'moment';
import pic from '@public/nocamp.png';
import { MoreOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { color } from 'echarts';

const Wrapper = styled(Card)`
  background: #ffffff;
  border-radius: 10px;
  border: none;
  width: 98%;
  .ant-card-body {
    height: auto;
    border: none;
    padding: 20px;
  }

  .chart {
    width: 103%;
    height: 100%;
    margin-top: 20px;
    margin-left: -10px;
  }
`;
const Title = styled(Typography)`
  font-weight: ${props => (props?.title === props?.name ? '700' : '500')};
  font-size: 1rem;
  // color: #181818;
`;
const Text = styled(Typography)`
  font-weight: 700;
  font-size: 1.125rem;
  color: #181818;
`;
const Box = styled.div`
  padding: 10px;
  display: flex;
  .more {
    font-size: 30px;
    margin-left: 10px;
    cursor: pointer;
  }
`;
const Radios = styled(Radio)`
  // width: 100%;
  // padding: 10px;
  font-weight: 500;
  font-size: 16px;
  color: #181818 !important;
  padding: 13px 15px;
  .ant-radio-checked .ant-radio-inner::after {
    background-color: ${props =>
      props.value === 'All'
        ? 'brown'
        : props.value === 'Delivered'
        ? '#3771C8'
        : props.value === 'Prospects'
        ? '#DA001A'
        : props.value === 'Seen'
        ? '#4AACEA'
        : props.value === 'Leads'
        ? '#23B33A'
        : '#F25511'};
  }
  .ant-radio-checked .ant-radio-inner::after {
    background-color: ${props =>
      props.value === 'All'
        ? 'brown'
        : props.value === 'Delivered'
        ? '#3771C8'
        : props.value === 'Prospects'
        ? '#DA001A'
        : props.value === 'Seen'
        ? '#4AACEA'
        : props.value === 'Leads'
        ? '#23B33A'
        : '#F25511'};
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: ${props =>
      props.value === 'All'
        ? 'brown'
        : props.value === 'Delivered'
        ? '#3771C8'
        : props.value === 'Prospects'
        ? '#DA001A'
        : props.value === 'Seen'
        ? '#4AACEA'
        : props.value === 'Leads'
        ? '#23B33A'
        : '#F25511'};
  }
  .ant-radio-inner {
    border-color: ${props =>
      props.value === 'All'
        ? 'brown'
        : props.value === 'Delivered'
        ? '#3771C8'
        : props.value === 'Prospects'
        ? '#DA001A'
        : props.value === 'Seen'
        ? '#4AACEA'
        : props.value === 'Leads'
        ? '#23B33A'
        : '#F25511'};
    background-color: #ffffff;
  }
`;
const NavButton = styled(Button)`
  width: 143px;
  height: 40px;
  background: #ffffff;
  color: #4aacea;
  padding: 10px;
  border: 2px solid #4aacea;
  border-radius: 5px;
  &:hover {
    color: #4aacea;
    background: #ffffff;
    border: 2px solid #4aacea;
  }
  &:active {
    color: #4aacea;
    background: #ffffff;
    border: 2px solid #4aacea;
  }
`;
const WatCampAnalytics = ({ dashboardGrapDetails, setGraphType }) => {
  const [value, setValue] = useState('All');
  const [selected, setSelected] = useState('Campaign');
  const handleChange = value => {
    setSelected(value);
    setGraphType(value);
  };
  const radiobuttonChnage = e => {
    setValue(e.target.value);
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const loader = useSelector(
    state => state?.socialMedialIntegration?.loader,
    shallowEqual
  );
  const datas =
    dashboardGrapDetails.length > 0 &&
    dashboardGrapDetails?.filter(
      data => Object.keys(data?.counts).length !== 0
    );
  const bounces =
    datas?.length > 0 && datas?.map(data => data?.counts?.bounces);
  const delivered =
    datas?.length > 0 && datas?.map(data => data?.counts?.delivered);
  const leads = datas?.length > 0 && datas?.map(data => data?.counts?.leads);
  const prospects =
    datas?.length > 0 && datas?.map(data => data?.counts?.prospects_count);
  const seen =
    datas?.length > 0 && datas?.map(data => data?.counts?.seen_count);
  const date =
    datas?.length > 0 &&
    datas?.map(data => moment(data?.start_date).format('MMM, DD/YYYY'));
  const options = {
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: 'category',
      data: date,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: value === 'All' ? [] : [],
        type: 'line',
        smooth: true,
        color: '#aaa',
        name: 'All',
      },
      {
        data: value === 'Delivered' || value === 'All' ? delivered : [],
        type: 'line',
        smooth: true,
        color: '#3771C8',
        name: 'Delivered',
      },
      {
        data: value === 'Prospects' || value === 'All' ? prospects : [],
        type: 'line',
        smooth: true,
        color: '#DA001A',
        name: 'Prospects',
      },
      {
        data: value === 'Seen' || value === 'All' ? seen : [],
        type: 'line',
        smooth: true,
        color: '#4AACEA',
        name: 'Seen',
      },
      {
        data: value === 'Leads' || value === 'All' ? leads : [],
        type: 'line',
        smooth: true,
        color: '#23B33A',
        name: 'Leads',
      },
      {
        data: value === 'Bounces' || value === 'All' ? bounces : [],
        type: 'line',
        smooth: true,
        color: '#F25511',
        name: 'Bounces',
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <Wrapper>
      <Flex spaceBetween>
        {selected === 'Campaign' ? (
          <Text> WhatsApp Campaign Analytics</Text>
        ) : (
          <Text> WhatsApp Survey Analytics</Text>
        )}
        {/* <Box>
          <Select
            defaultValue="Campaign"
            style={{
              width: 204,
              //border: "1px solid #D9D9D9",
              borderRadius: '10px',
            }}
            onChange={handleChange}
            options={[
              {
                value: 'Campaign',
                label: 'Campaign',
              },
              {
                value: 'Survey',
                label: 'Survey',
              },
            ]}
          />
          <MoreOutlined className='more'/>
        </Box> */}
      </Flex>
      {/* <Divider /> */}
      {datas?.length === 0 || dashboardGrapDetails?.length === 0 ? (
        <div style={{ margin: '40px' }}>
          <Flex center>
            <img width={250} src={pic} />
          </Flex>
          <Text
            style={{ textAlign: 'center', display: 'block', marginTop: '10px' }}
          >
            No data was found on the selected dates.
          </Text>
          <Flex center style={{ marginTop: '10px' }}>
            <NavButton href="/whatsapp-marketing" type="primary">
              Create Campaign
            </NavButton>
          </Flex>
        </div>
      ) : !datas ? (
        <Flex center>
          <Spin indicator={antIcon} />
          Loading...
        </Flex>
      ) : (
        <Spin spinning={loader}>
          <div className="chart" style={{ height: '330px' }}>
            <ReactEcharts
              option={options}
              style={{ maxHeight: '100%' }}
            ></ReactEcharts>
          </div>
        </Spin>
      )}
      <Flex
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Radio.Group
          onChange={radiobuttonChnage}
          value={value}
          // defaultChecked={'All'}
        >
          <Radios value={'All'}>
            <Title title={value} name="All">
              {value !== 'All' ? (
                <span style={{ color: '#999' }}>All</span>
              ) : (
                <span>All</span>
              )}
              {/* All */}
            </Title>
          </Radios>
          <Radios value={'Delivered'}>
            <Title title={value} name="Delivered">
              {value !== 'Delivered' ? (
                <span style={{ color: '#999' }}>Delivered</span>
              ) : (
                <span>Delivered</span>
              )}
            </Title>
          </Radios>
          <Radios value={'Prospects'}>
            <Title title={value} name="Prospects">
              {value !== 'Prospects' ? (
                <span style={{ color: '#999' }}>Prospects</span>
              ) : (
                <span>Prospects</span>
              )}
            </Title>
          </Radios>
          <Radios value={'Seen'} name="Seen">
            <Title title={value} name="Seen">
              {value !== 'Seen' ? (
                <span style={{ color: '#999' }}>Seen</span>
              ) : (
                <span>Seen</span>
              )}
            </Title>
          </Radios>
          <Radios value={'Leads'} name="Leads">
            <Title title={value} name="Leads">
              {value !== 'Leads' ? (
                <span style={{ color: '#999' }}>Leads</span>
              ) : (
                <span>Leads</span>
              )}
            </Title>
          </Radios>
          <Radios value={'Bounces'} name=" Bounces">
            <Title title={value} name="Bounces">
              {value !== 'Bounces' ? (
                <span style={{ color: '#999' }}>Bounces</span>
              ) : (
                <span>Bounces</span>
              )}
            </Title>
          </Radios>
        </Radio.Group>
      </Flex>
    </Wrapper>
  );
};

export default WatCampAnalytics;
