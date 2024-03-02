import React from 'react';
import { Card, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { Col, Row } from 'antd';
import Flex from '@components/common/Flex';
import Icon from '@ant-design/icons';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { updateCampList } from '../../actions';

const StyledCard = styled(Card)`
  width: 270px;
  height: 135px;
  border-radius: 10px;
  border: 1px 
  cursor:pointer;

   &>div>div:nth-of-type(3){
      border: 1px solid red !important;
      background:#f00 !important;
    }

  .ant-card-body{
    padding: 20px;

      h1 {
        line-height: 1.5;
        font-weight: 700;
        font-size: 2.375rem !important;
        color: #4d4d4d;
      }
  }
  &:hover {
    border-bottom:${props => props.hoverColor};
    cursor:pointer;
    box-shadow: 0px 0px 20px rgba(217, 217, 217, 1);

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

const Title = styled(Typography.Text)`
  font-weight: 500;
  font-size: 1rem;
  line-height: 19px;
  color: #999999;
  margin-top: 15px;
`;

const InfoCard = ({
  item,
  setClick,
  click,
  campOverViewCard,
  filterList,
  hoverColor,
  setSelectedCard,
  active,
  keys,
  statusTitle,
  setStatusTitle,
  setPageNumber,
  whatsAppConnectStatus,
}) => {
  const dispatch = useDispatch();
  const sendTitle = title => {
    filterList(title);
  };
  const handleClick = (cardItem, cardValue) => {
    if (
      (cardItem?.title === 'Draft' && cardValue?.draft !== 0) ||
      (cardItem?.title === 'Scheduled' && cardValue?.scheduled !== 0) ||
      (cardItem?.title === 'Running' && cardValue?.active !== 0) ||
      (cardItem?.title === 'Completed' && cardValue?.completed !== 0)
    ) {
      if (!whatsAppConnectStatus === true && statusTitle !== item?.title) {
        sendTitle(item.title);
        setSelectedCard(keys);
        setStatusTitle(item.title);
        setPageNumber(1);
      }
      //check
      if (!whatsAppConnectStatus === true && statusTitle === item?.title) {
        setClick(!click);
        sendTitle('');
        setSelectedCard('');
        setStatusTitle('');
        setPageNumber(1);
      }
    } else {
      dispatch(
        updateCampList({
          throttle_wa_limit: '',
          total_count: '',
          whatsapp_campaigns: [],
        })
      );
    }
  };
  return (
    <StyledCard
      hoverColor={hoverColor}
      active={!whatsAppConnectStatus && active}
      onClick={() => handleClick(item, campOverViewCard)}
    >
      <Row
        style={{
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Col span={16}>
          <Flex column>
            {item.title === 'Draft' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {campOverViewCard?.draft || 0}
              </Typography.Title>
            )}
            {item.title === 'Scheduled' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {campOverViewCard?.scheduled || 0}
              </Typography.Title>
            )}
            {item.title === 'Running' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {campOverViewCard?.active || 0}
              </Typography.Title>
            )}

            {item.title === 'Completed' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {campOverViewCard?.completed || 0}
              </Typography.Title>
            )}
            {item.title === 'Active' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {campOverViewCard?.active || 0}
              </Typography.Title>
            )}
            {item.title === 'Inactive' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {campOverViewCard?.inactive || 0}
              </Typography.Title>
            )}
            <Title>{item.title}</Title>
          </Flex>
        </Col>
        <Col span={7}>
          <Icon component={item.icon} />
        </Col>
      </Row>
    </StyledCard>
  );
};

export default InfoCard;
