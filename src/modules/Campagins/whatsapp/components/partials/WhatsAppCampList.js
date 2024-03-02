import React, { Fragment, useEffect, useState } from 'react';
import { Pagination, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Flex from '../../../../../components/common/Flex';
import { useDispatch } from 'react-redux';
import { backPage } from '../../../whatsAppChat/actions';
import { StyledTable } from '../../../Customers/components/partials/ContactTable';

const Text = styled.p`
  border-radius: 30px;
  width: 120px;
  height: 34px;
  text-align: center;
  align-items: center;
  padding: 7px;
`;
const hoverColor = {
  2: '#4AACEA',
  1: '#00AC4F',
  0: '#F25511',
  3: '#FFDD55',
};
const backgroundColor = {
  2: 'rgb(200 228 246)',
  1: 'rgb(195 244 217)',
  0: 'rgb(252 203 182)',
  3: 'rgb(255 241 183)',
};
export const CampaignPagination = styled(Pagination)`
  margin-top: 15px;
  .ant-pagination-options-size-changer.ant-select {
    display: none;
  }
`;

const WhatsAppCampList = ({
  whatsCampaginList,
  updateSelectedCampagin,
  totalCounts,
  pageNumber,
  setPageNumber,
  setSelectionType,
  selectionType,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createdate = moment().format('YYYY-MM-DD');
  // const [selectionType, setSelectionType] = useState([]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: '250px',
      render: (text, record) => {
        const displayString = str => {
          if (str?.length > 20) {
            return str?.slice(0, 20) + '...';
          } else {
            return str;
          }
        };
        const displayDate = (date, status) => {
          if (status === 0) {
            return `Last Edited :
            ${dayjs?.utc(date)?.format('MMM DD, YYYY hh:mma')}`;
          } else if (status === 3 || status === 1) {
            return `Starts at :
            ${dayjs?.utc(date)?.format('MMM DD, YYYY hh:mma')}`;
          } else if (status === 2) {
            return `Completed at :
            ${dayjs?.utc(date)?.format('MMM DD, YYYY hh:mma')}`;
          }
        };

        return (
          <>
            <Tooltip placement="top" title={text?.length > 20 && text}>
              {displayString(text)}
            </Tooltip>
            <div
              style={{
                fontWeight: 500,
                fontSize: '12px',
                color: 'rgba(153, 153, 153, 1)',
                width: '200px',
                marginTop: '6px',
              }}
            >
              {displayDate(record?.start_date, record?.status)}
            </div>
          </>
        );
      },
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      width: '230px',
      render: text => (
        <>
          <Flex
            style={{
              alignItems: 'center',
            }}
          >
            {dayjs(text)?.format('DD/MM/YYYY')}
            <span style={{ margin: '0px 5px', height: 'auto' }}>|</span>

            {dayjs(text)?.format('hh:mm a')}
          </Flex>
        </>
      ),
    },
    {
      title: 'Prospects',
      dataIndex: 'prospects_count',
      key: 'prospects_count',
      align: 'center',
      render: text => {
        return (
          <Flex center>
            <Text>{text}</Text>
          </Flex>
        );
      },
    },
    {
      title: 'Seen',
      key: 'seen_count',
      dataIndex: 'seen_count',
      align: 'center',
      render: text => {
        return (
          <Flex center>
            <Text>{text}</Text>
          </Flex>
        );
      },
    },
    {
      title: 'Leads',
      dataIndex: 'leads',
      key: 'leads',
      align: 'center',
      render: text => {
        return (
          <Flex center>
            <Text>{text}</Text>
          </Flex>
        );
      },
    },
    {
      title: 'Bounces',
      dataIndex: 'bounces',
      key: 'bounces',
      align: 'center',
      render: text => {
        return (
          <Flex center>
            <Text>{text}</Text>
          </Flex>
        );
      },
    },
    {
      title: 'Status',
      key: 'list_status',
      align: 'center',
      render: text => {
        return (
          <Flex center>
            <span
              style={{
                borderRadius: '30px',
                padding: '7px',
                fontSize: '14px',
                width: '90px',
                height: '34px',
                backgroundColor: backgroundColor[text?.status],
                color: hoverColor[text?.status],
              }}
            >
              {text?.status === 0
                ? 'Draft'
                : text?.status === 1
                ? 'Running'
                : text?.status === 2
                ? 'Completed'
                : text?.status === 3
                ? 'Scheduled'
                : ''}
            </span>
          </Flex>
        );
      },
    },
  ];
  const handlePagination = page => {
    setPageNumber(page);
  };

  const getRowClassName = (record, index) => {
    return index % 2 != 1 ? 'odd-row' : '';
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectionType(selectedRowKeys);
    },
    getCheckboxProps: record => ({
      disabled: record?.status === 1,
    }),
  };
  const data = whatsCampaginList?.map((v, id) => ({ ...v, key: v?.id }));
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <Fragment>
      <StyledTable
        rowSelection={rowSelection}
        columns={columns}
        style={{ cursor: 'pointer' }}
        dataSource={data}
        pagination={false}
        rowClassName={getRowClassName}
        onRow={record => {
          return {
            onClick: () => {
              dispatch(backPage(null));
              updateSelectedCampagin(record);
              {
                record?.status === 0
                  ? navigate('/create-whatsapp-campaign')
                  : navigate('/campagin-details');
              }
            },
          };
        }}
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

export default WhatsAppCampList;
