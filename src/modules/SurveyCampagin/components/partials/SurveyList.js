import React, { Fragment } from 'react';
import { Table, Dropdown } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { RiseOutlined, MoreOutlined } from '@ant-design/icons';
import RowActions from './RowActions';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { CampaignPagination } from '../../../Campagins/whatsapp/components/partials/WhatsAppCampList';
import { StyledTable } from '../../../Campagins/Customers/components/partials/ContactTable';
const SurveyList = ({
  whatsAppSurveyList,
  updateBotStatus,
  totalCounts,
  pageNumber,
  setPageNumber,
}) => {
  const navigate = useNavigate();
  const handlePagination = page => {
    setPageNumber(page);
  };
  const backgroundColor = {
    1: 'rgba(0, 172, 79, 0.1)',
    0: 'rgb(255 236 227)',
    '-1': '#DA001A1A',
  };
  const hoverColor = {
    1: '#00AC4F',
    0: 'rgb(242, 85, 17)',
    '-1': '#DA001A',
  };
  const status = {
    1: 'Active',
    0: 'Draft',
    '-1': 'Inavtive',
  };
  const Text = styled.p`
    border-radius: 30px;
    width: 120px;
    height: 34px;
    text-align: center;
    align-items: center;
    padding: 7px;
  `;
  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: text => <>{dayjs(text).format('DD/MM/YYYY hh:mm a')}</>,
    },
    {
      title: 'Last Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: text => <>{dayjs(text).format('DD/MM/YYYY hh:mm a')}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        return (
          <Text
            style={{
              backgroundColor: backgroundColor[text.toString()],
              color: hoverColor[text.toString()],
            }}
          >
            {status[text.toString()]}
          </Text>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: record => (
        <>
          <RowActions records={record} updateBotStatus={updateBotStatus} />
        </>
      ),
    },
  ];
  return (
    <Fragment>
      <StyledTable
        columns={columns}
        style={{ cursor: 'pointer' }}
        dataSource={whatsAppSurveyList}
        pagination={false}
      />
      <Flex end>
        <CampaignPagination
          total={totalCounts}
          current={pageNumber}
          onChange={handlePagination}
        />
      </Flex>
    </Fragment>
  );
};

export default SurveyList;
