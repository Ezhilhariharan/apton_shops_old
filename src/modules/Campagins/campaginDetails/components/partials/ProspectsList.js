import React from 'react';
import { Row, Space, Table, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import Icon, { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Bounced from '@components/icons/Bounced';
import ArrowLeft from '@components/icons/ArrowLeft';
import Replied from '@components/icons/Replied';
import OpenMsg from '@components/icons/OpenSmall';
import { useDispatch } from 'react-redux';
import { updateSelectedRow } from '../../actions';
import Flex from '@components/common/Flex';
import { NameAbbreavation } from '../../../Customers/components/partials/ContactTable';
import DefaultProfile from '../../../../../components/icons/DefaultProfile';
import { prospectColors } from './prospectColors';
import { CustomerPagination } from '../../../Customers/components/partials/ContactTable';
import { StyledTable } from '../../../Customers/components/partials/ContactTable';

const Wrapper = styled.div`
  margin-top: 4rem;
`;
const ColorAbbreviation = styled(NameAbbreavation)`
  ${props => `background-color: ${prospectColors[props.color]};`}
  width:40px;
  height: 50px;
`;
const statusIcon = {
  Opened: ArrowLeft,
  Lead: Replied,
  Bounced: Bounced,
  Blacked: StopOutlined,
  Delivered: OpenMsg,
};

const fontColor = {
  Opened: '#4AACEA',
  Lead: '#00AC4F',
  Bounced: '#F25511',
  Blacked: '#F25511',
  Delivered: '#AD2F24',
};

const ProspectsList = ({ prospectsList, page, setPage, campaginDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'First Name',
      render: (item, record, index) => (
        <Flex>
          {!(!record?.first_name && !record?.last_name) ? (
            <ColorAbbreviation center alignCenter color={index}>
              {record?.last_name &&
                record?.first_name &&
                item?.first_name[0]?.toUpperCase() +
                  record?.last_name[0]?.toUpperCase()}
              {record?.last_name &&
                !record?.first_name &&
                item?.last_name[0]?.toUpperCase()}
              {record?.first_name &&
                !record?.last_name &&
                item?.first_name[0]?.toUpperCase()}
            </ColorAbbreviation>
          ) : (
            <DefaultProfile style={{ width: '40px', height: '30px' }} />
          )}
          {/* {!item?.first_name && !item?.last_name && item?.to} */}
          {item?.first_name === null ? <span>-</span> : item?.first_name}
        </Flex>
      ),
    },
    {
      title: 'Last Name',
      render: item => (
        <Space>
          {/* {!item?.first_name && !item?.last_name && item?.to} */}
          {item?.last_name === null ? '-' : item?.last_name}
        </Space>
      ),
    },
    {
      title: 'Mobile Number',
      dataIndex: 'to',
      key: 'to',
      align: 'center',
    },
    {
      title: 'Status',
      key: 'campaign_status',
      dataIndex: 'campaign_status',
      align: 'center',
      render: status => (
        <Flex center>
          <span
            style={{
              display: 'flex',
              justifyContent: 'start',
              color: fontColor[status],
              marginLeft: '40px',
            }}
          >
            {status === 'Replied' ? (
              'Lead'
            ) : (
              <Flex>
                <Icon
                  component={statusIcon[status]}
                  style={{ fontSize: '1.2rem' }}
                />
                <div
                  style={{
                    width: '90px',
                    textAlign: 'left',
                    marginLeft: '3px',
                  }}
                >
                  {status}
                </div>
              </Flex>
            )}
          </span>
        </Flex>
      ),
    },

    // {
    //   title: 'Action',
    //   key: 'action',
    //   align: 'center',
    //   render: () => (
    //     <div style={{ cursor: 'pointer' }} onClick={()=>{navigate('/chat')}}>
    //       <MoreOutlined style={{ fontSize: 20 }} />
    //     </div>
    //   ),
    // },
  ];
  const getRowClassName = (record, index) => {
    return index % 2 != 1 ? 'odd-row' : '';
  };
  const handlePagination = page => {
    setPage(page);
  };

  return (
    <Wrapper>
      <StyledTable
        columns={columns}
        dataSource={prospectsList}
        rowClassName={getRowClassName}
        onRow={record => {
          return {
            onClick: () => {
              if (record?.campaign_status != 'Bounced') {
                dispatch(updateSelectedRow(record));
                navigate('/inbox');
              }
              dispatch(updateSelectedRow(record));
              navigate('/inbox');
            },
          };
        }}
        pagination={false}
      />
      <Flex end>
        <CustomerPagination
          total={campaginDetails?.prospects_count}
          current={page}
          onChange={handlePagination}
        />
      </Flex>
    </Wrapper>
  );
};

export default ProspectsList;
