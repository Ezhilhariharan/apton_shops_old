import React from 'react';
import { Card, Typography } from 'antd';
import styled,{css} from 'styled-components';
import { Col, Row } from 'antd';
import Flex from '@components/common/Flex';
import Icon from '@ant-design/icons';

const StyledCard = styled(Card)`
  width: 240px;
  height: 120px;
  border-radius: 10px;
  border: 1px 
  cursor:pointer;
  &:hover {
    border-bottom:${props => props.hoverColor};
    cursor:pointer;
    box-shadow: 0px 0px 20px rgba(217, 217, 217, 1);

  }
  ${props => props.active && css`
  border-bottom:${props => props.hoverColor};
    cursor:pointer;
    box-shadow: 0px 0px 20px rgba(217, 217, 217, 1);
  }
`}
`;

const Title = styled(Typography.Text)`
  color: #999999;
  opacity: 0.7;
  font-weight: 400;
  font-size: 16px;
`;

const BotInfoCard = ({ item, campOverViewCard,filterList,setPageNumber, setStatusTitle,hoverColor,setSelectedCard,active,keys}) => {
  const sendTitle = title => {
    filterList(title);
  };
  return (
    <StyledCard hoverColor={hoverColor}  active={active}>
      <Row onClick={()=>{
        sendTitle(item?.status)
        setSelectedCard(keys)
        setStatusTitle(item.title)
        setPageNumber(1)}}>
        <Col span={15}>
          <Flex column>
            {item.title === 'Draft' && (
              <Typography.Title style={{ lineHeight: 1 }}>
                {campOverViewCard?.draft || 0}
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
        <Col span={8}>
          <Icon component={item.icon} />
        </Col>
      </Row>
    </StyledCard>
  );
};

export default BotInfoCard;