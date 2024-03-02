import React from 'react';
import { Row, Col, Space, Button } from 'antd';
import { IconWrapper, ProspectBody, ProspectCard } from './SurveyStyles';
import TemplateIcon from '@components/icons/TemplateIcon';
import WhiteBin from '@components/icons/WhiteBin';
import BasicEye from '@components/icons/BasicEye';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { PlusCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateBotDrawer, updateDrawerTitile } from '../../actions';
import BotTemplate from './BotTemplate';
const Wrapper = styled.div`
  width: 290px;
  height: 123px;
  background: #ffffff;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
`;

const Text = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 35px;
  color: #4d4d4d;
`;

const TemplateNode = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <ProspectCard backgroundColor={'#FFDD55'}>
      <Row style={{ padding: 10 }}>
        <Col span={12}>
          <IconWrapper>
            <TemplateIcon />
          </IconWrapper>
        </Col>
        <Col span={12}>
          <Flex end>
            <Space align="center" size={'middle'}>
              {/* <div>
                <BasicEye />
              </div> */}
            </Space>
          </Flex>
        </Col>
      </Row>
      {data === null ? (
        <ProspectBody>
          <Wrapper>
            <Button
              shape="circle"
              icon={<PlusCircleFilled />}
              onClick={() => {
                dispatch(updateDrawerTitile('Template'));
                dispatch(updateBotDrawer(true));
              }}
            />
            <Text>Choose Template</Text>
          </Wrapper>
        </ProspectBody>
      ) : (
        <ProspectBody style={{ padding: 15 }}>
          <BotTemplate item={data}/>
        </ProspectBody>
      )}
    </ProspectCard>
  );
};

export default TemplateNode;
