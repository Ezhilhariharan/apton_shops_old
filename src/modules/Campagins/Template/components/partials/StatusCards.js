import React from 'react';
import { Card, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { Col, Row } from 'antd';
import Flex from '@components/common/Flex';
import Icon from '@ant-design/icons';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { updateRetrieveTemplate } from '../../actions';

const StyledCard = styled(Card)`
  width: 270px;
  height: 135px !important;
  background: #ffffff;
  border-radius: 10px;
  cursor: pointer;

  .ant-card-body {
    padding: 20px;
    // min-height: 100%;

    .ant-col > div {
      min-height: 100%;

      h1 {
        line-height: 1.5;
        font-weight: 700;
        font-size: 2.375rem !important;
        color: #4d4d4d;
      }
    }
  }

  &:hover {
    // border-bottom: ${props => props.hoverColor};
    cursor: pointer;
    box-shadow: 0px 0px 20px rgba(217, 217, 217, 1);
  }

  .text {
    font-weight: 500;
    font-size: 1rem;
    color: #999999;
  }
  ${props =>
    props.active &&
    css`
  border-bottom:${props => props.hoverColor};
    cursor:pointer;
    box-shadow: 0px 0px 20px rgba(217, 217, 217, 1);
  }
`}
`;

const StatusCards = ({
  item,
  setClick,
  click,
  overviewTemplate,
  setFilterByStatus,
  hoverColor,
  active,
  filterByStatus,
}) => {
  const dispatch = useDispatch();
  const handleClick = (template, propsItem) => {
    if (
      (propsItem?.title === 'Approved' && template?.approved_count !== 0) ||
      (propsItem?.title === 'Draft' && template?.draft_count !== 0) ||
      (propsItem?.title === 'Pending' && template?.pending_count !== 0) ||
      (propsItem?.title === 'Rejected' && template?.rejected_count !== 0)
    ) {
      const newFilterByStatus = filterByStatus === item.title ? '' : item.title;
      setFilterByStatus(newFilterByStatus);
    } else {
      dispatch(updateRetrieveTemplate([]));
    }
  };
  return (
    <StyledCard
      hoverColor={hoverColor}
      active={active}
      onClick={() => handleClick(overviewTemplate, item)}
    >
      <Row
        style={{
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Col span={16}>
          <Flex column>
            {item.title === 'Draft' && (
              <Typography.Title>
                {overviewTemplate?.draft_count
                  ? overviewTemplate?.draft_count
                  : 0}
              </Typography.Title>
            )}
            {item.title === 'Approved' && (
              <Typography.Title>
                {overviewTemplate?.approved_count
                  ? overviewTemplate?.approved_count
                  : 0}
              </Typography.Title>
            )}
            {item.title === 'Pending' && (
              <Typography.Title>
                {overviewTemplate?.pending_count
                  ? overviewTemplate?.pending_count
                  : 0}
              </Typography.Title>
            )}

            {item.title === 'Rejected' && (
              <Typography.Title>
                {overviewTemplate?.rejected_count
                  ? overviewTemplate?.rejected_count
                  : 0}
              </Typography.Title>
            )}

            <Typography className="text">
              {item.title === 'Pending' ? 'In-review' : item.title}
            </Typography>
          </Flex>
        </Col>
        <Col span={7}>
          <Icon component={item.icon} />
        </Col>
      </Row>
    </StyledCard>
  );
};

export default StatusCards;
