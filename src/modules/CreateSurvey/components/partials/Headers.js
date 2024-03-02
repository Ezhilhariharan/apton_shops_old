import { Col, Input, Row, Space, Typography, Button } from 'antd';
import Icon, { EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { lightColorsTheme } from "@theme/styles/light/lightTheme";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const Wrapper = styled.div`
  height: 70px;
  background: #ffffff;
`;

export const Span = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #999999;
  padding: 10px;
`;

export const CustomizedButton = styled(Button)`
    border: none;
    width: 90px;
    height: 40px;
    text-align: center;
    padding: 0;
    font-weight: 700;
    border-radius: 0;
    color: #999999;
    background-color: #FFF;
    :hover {
        color: ${lightColorsTheme.primary};
        border-bottom: 2px solid ${lightColorsTheme.primary};
        background-color: #FFF;
    };
    :focus {
        color: ${lightColorsTheme.primary};
        border-bottom: 2px solid ${lightColorsTheme.primary};
        background-color: #FFF;
    };
    :active {
        color: ${lightColorsTheme.primary};
        border-bottom: 2px solid ${lightColorsTheme.primary};
        background-color: #FFF;
    }
`;

const Headers = ({
  setSurveyName,
  surveyName,
  createBot,
  surveyMode,
  disbleButtons,
  updateBot,
  surveyBotDetails
}) => {
  const nodeEdges = useSelector(state => state.createSurveySelector.nodeEdgs)
  const nodes = useSelector(state => state.createSurveySelector.nodeList)
  const navigate = useNavigate()
  const onChange = (e) => {
    setSurveyName(e.target.value);
  };

  const saveBot = (type) => {
    if(nodes.length>=1&&surveyName){
      createBot(nodes,nodeEdges,surveyName,type,navigate)
    }
  }
  return (
    <Wrapper>
      <div style={{ padding: 8 }}>
        <Row>
          <Col span={12}>
            <Flex>
              <Space>
                <Typography.Title style={{fontSize:16,paddingTop:7}}>Bot Name:</Typography.Title>
                <Input bordered={true} onChange={onChange} defaultValue={surveyName}/>
                <Icon component={EditOutlined} style={{cursor:'pointer'}}/>
              </Space>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex end style={{padding:10}}>
              <Space size={"large"}>
              { surveyMode !=="edit" &&
                 <CustomizedButton onClick={()=>{saveBot('Draft')}} disabled={disbleButtons}>Draft</CustomizedButton>
              }
             
              {surveyMode !=="edit" &&
              <Button type="primary" onClick={()=>{saveBot('Plublish')}} disabled={disbleButtons}>Save</Button>
              }
               {surveyMode==="edit" &&
                <Button type="primary" onClick={()=>{updateBot(surveyBotDetails?.id,nodes,nodeEdges,surveyName,navigate)}} disabled={disbleButtons}>Update</Button>
               }
               {
                surveyMode==="edit" &&
                <Button type="primary" onClick={()=>{saveBot('Plublish')}} disabled={disbleButtons}>Save</Button>
               }
              </Space>
            </Flex>
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
};

export default Headers;
