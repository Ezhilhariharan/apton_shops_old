import {Button, Col, Divider, Row, Tooltip, Typography } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {updateMode} from "../../../CreateSurvey/actions"
import { updateSelectedSurvey } from '../../actions';
import { getSocialMediaList } from '../../../Integration/actions'
import { AllStatusButton } from '../../../Campagins/whatsapp/components/partials/Filters';
const Title = styled(Typography.Text)`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

const Wrapper = styled.div`
  margin-top: 3rem;
`;

const FilterSection = ({ whatsAppConnectStatus,campaginCount,setPageNumber,setSelectedCard,setStatusTitle}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onClick = () => {
      dispatch(updateMode('New'))
      dispatch(updateSelectedSurvey(null))
      navigate('/create-bot')
    }
 useEffect(()=>{
  getSocialMediaList()
 },[])
      const allStatusHandler = () => {
        setSelectedCard()
        setStatusTitle(null)
        setPageNumber(1)
      }

  return (
    <Wrapper>
      <Row>
        <Col span={12}>
          <Title>{`You have ${campaginCount||0} total bots`}</Title>
        </Col>
        <Col span={12}>
        <Flex end>
        <AllStatusButton onClick={() => allStatusHandler()} style={{backgroundColor: "transparent"}}>All status</AllStatusButton>
          <Tooltip placement="top" title={whatsAppConnectStatus &&"Please Integrate WhatsApp"}>
           <Button type="primary" ghost onClick={onClick}  disabled={whatsAppConnectStatus }>New Bot</Button>
           </Tooltip>
        </Flex>
        </Col>
      </Row>
      <Divider />
    </Wrapper>
  );
};

export default FilterSection;
