import React, { useEffect, useState } from 'react';
import Flex from '@components/common/Flex';
import { Card, Row, Col } from 'antd';
import Published from '@components/icons/Published';
import Scheduled from '@components/icons/Scheduled';
import Failed from '@components/icons/Failed';
import MoreIcon from '@components/icons/MoreIcon';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const Cards = styled(Card)`
  width: 93%;
  background: #ffffff;
  border: none;
  border-radius: 10px;
  .ant-card-body {
    padding: 20px;
  }

`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;

  .count {
    font-weight: 700;
    font-size: 1.875rem;
    line-height: 36px;
    color: #4d4d4d;
    display: block;
  }
  .text {
    font-weight: 400;
    font-size: 15px;
    line-height: 1.063rem;
    color: #999999;
  }
`;
const Postcards = () => {
  const postList = useSelector(
    state => state?.dashboardIntegration?.postListStatus,
    shallowEqual
  );
  const [viewList, setViewList] = useState([]);
  useEffect(() => {
    mergingData();
  }, [postList]);
  const mergingData = () => {
    let merging = [];
    list?.map(parent => {
      if (parent.name == 'total_scheduled') {
        merging.push({ ...parent, count: postList?.total_scheduled });
      }
      if (parent.name == 'total_published') {
        merging.push({ ...parent, count: postList?.total_published });
      }
      if (parent.name == 'total_failed') {
        merging.push({ ...parent, count: postList?.total_failed });
      }
    });
    setViewList(merging);
  };

  return (
    <Row
      gutter={{
        xs: 4,
        sm: 12,
        md: 24,
        lg: 32,
      }}

    >
      {viewList?.map(data => {
        return (
          <Col span={8}>
            <Cards
            // style={{ borderRadius: '10px', border: 'none', width: '104%', border: '1px solid red' }}
            >
              <Flex>
                {data?.icon}
                <Box>
                  <span className="count">{data.count || 0}</span>
                  <span className="text">{data?.type}</span>
                </Box>
                {/* <MoreIcon style={{cursor:"pointer"}}/> */}
              </Flex>
            </Cards>
          </Col>
        );
      })}
    </Row>
  );
};

const list = [
  {
    id: 1,
    icon: <Scheduled />,
    type: 'Published Posts',
    name: 'total_published',
  },
  {
    id: 2,
    icon: <Published />,
    type: 'Scheduled Posts',
    name: 'total_scheduled',
  },
  {
    id: 3,
    icon: <Failed />,
    type: 'Failed Posts',
    name: 'total_failed',
  },
];
export default Postcards;
