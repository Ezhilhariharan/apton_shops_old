import React, { useEffect, useState } from 'react';
import { Table, Space,Pagination } from 'antd';
import Flex from '@components/common/Flex';
import {
  ArrowDownOutlined,
  EyeOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import File from '../../../components/icons/File';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HistoryTable = styled(Table)`
  margin-top: 5px;
  .ant-table-thead > tr > th {
    background: white;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #4d4d4d;
    border-bottom: 1px solid #d9d9d9;
  }
`;
const columns = [
  {
    title: 'Invoice',
    dataIndex: 'id',
    key: 'id',
    render: (data, obj) => {
      return (
        <Space size="middle">
          <File />
          <p>{obj?.invoice_number}</p>
        </Space>
      );
    },
  },
  {
    title: (
      <span>
        Billing Date &nbsp;
        <ArrowDownOutlined />
      </span>
    ),
    dataIndex: 'issue_date',
    key: 'issue_date',
    render: (data, obj) => {
      let fullDate = obj?.issue_date;
      const displayedTime = moment(fullDate).format('MMM DD, YYYY');
      return <span>{displayedTime}</span>;
    },
  },
  {
    title: 'Amount',
    dataIndex: 'total_amount',
    key: 'total_amount',
    render: (data, obj) => {
      return (
        <span>
          {obj?.currency_code}
          {obj?.total_amount.toLocaleString('en-US')}
        </span>
      );
    },
  },
  {
    title: 'Plan Name',
    dataIndex: 'plan_name',
    key: 'plan_name',
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    render: (text, record) => {
      return(
        <div style={{marginLeft:"13px"}}> 
              <CloudDownloadOutlined
              onClick={() => {
                window.open(record?.invoice_file, '_blank');
              }}
            />
         
        </div>
      )
    },
  },
];

const BillingHistory = ({ history,setPage}) => {
  const handlePagination = (pageSize) => {
    setPage(pageSize)
  };
  return (
   <>
    <HistoryTable
      columns={columns}
      pagination={false}
      dataSource={history?.invoices?.length > 0 && history?.invoices}
    />
    {history?.invoices?.length >=10 &&
    <Flex end style={{marginTop:"20px"}}>
      <Pagination  onChange={handlePagination} total={history?.history_count} /></Flex>}
    </>
  );
};

export default BillingHistory;
