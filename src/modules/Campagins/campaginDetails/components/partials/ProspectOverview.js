import React from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Flex from '@components/common/Flex';
import Icon from '@ant-design/icons';
import Delivered from '@assets/images/delivered.png';
const StyledCard = styled(Card)`
  width: 270px;
  height: 135px !important;
  border-radius: 10px;

  .ant-card-body {
    padding: 20px;
  }
  &:hover {
    border-bottom: ${props => props.hoverColor};
    cursor: pointer;
    box-shadow: 0px 0px 20px rgba(217, 217, 217, 1);
  }
  // -webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.15);
  // -moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.15);
  // box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.15);
  .text {
    font-weight: 500;
    font-size: 1rem;
    color: #999999;
    margin-top: 15px;
  }
  h1 {
    line-height: 1.5;
    font-weight: 700;
    font-size: 2.375rem !important;
    color: #4d4d4d;
  }
`;

const ProspectOverview = ({ hoverColor, item, overviewStatus }) => {
  return (
    <StyledCard hoverColor={hoverColor}>
      <Row style={{
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Col span={16}>
          <Flex column>
            {item.title === 'Opened' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {overviewStatus?.seen}
              </Typography.Title>
            )}
            {item.title === 'Replied' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {overviewStatus?.leads}
              </Typography.Title>
            )}
            {item.title === 'Bounced' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {overviewStatus?.bounced}
              </Typography.Title>
            )}
            {item.title === 'Delivered' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {overviewStatus?.delivered}
              </Typography.Title>
            )}
            <Typography className="text">
              {item?.title === 'Replied' ? 'Leads' : item?.title}
            </Typography>
          </Flex>
        </Col>
        <Col span={8}>
          {item?.icon === 'Delivered' ? (
            <img src={Delivered} alt="no img" width="61px" height="60px" />
          ) : (
            <Icon component={item?.icon} />
          )}
        </Col>
      </Row>
    </StyledCard>
  );
};

export default ProspectOverview;
