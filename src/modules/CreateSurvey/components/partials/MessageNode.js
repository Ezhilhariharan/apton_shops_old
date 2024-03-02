import React from 'react';
import { Row, Col, Space, Typography } from 'antd';
import {
  IconWrapper,
  ProspectBody,
  ProspectCard,
} from './SurveyStyles';
import MessageIcon from '@components/icons/MessageIcon';
import WhiteBin from '@components/icons/WhiteBin';
import BasicEye from '@components/icons/BasicEye';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { lightColorsTheme } from '@theme/styles/light/lightTheme';
import documentImage from "@assets/images/documentImage.svg"
import { deleteNodesById } from '../../actions';
import { useDispatch } from 'react-redux';
import NodeActions from './NodeActions';

const Text = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #4aacea;
`;

const HeaderText = styled(Text)`
  color: ${lightColorsTheme.darkBlack};
`;

const MessageBody = ({ data,nodeId }) => {
  return (
    <ProspectCard backgroundColor={'#4AACEA'}>
      <Row style={{ padding: 10 }}>
        <Col span={12}>
          <IconWrapper>
            <MessageIcon />
          </IconWrapper>
        </Col>
        <Col span={12}>
          <Flex end>
            <Space align="center" size={'middle'}>
              {/* <div>
                <BasicEye />
              </div> */}
              <div>
                <NodeActions title={"Message"} nodeId={nodeId}/>
              </div>
            </Space>
          </Flex>
        </Col>
      </Row>
      <ProspectBody style={{ padding: 15 }}>
        {data?.data?.type === 'text' && (
          <Typography.Paragraph>
            <HeaderText>{data?.data?.text?.text}</HeaderText>
          </Typography.Paragraph>
        )}
        {data?.data?.type === 'image' && (
            <img src={data?.data?.image?.link} width="100%" height="100%"></img>
        )}
       {data?.data?.type === 'video' && (
          <div style={{height: 100, width: "auto", overflow: "hidden"}}>
            <video src={data?.data?.video?.link} autoPlay muted width="100%" height="auto"></video>
          </div>
        )}
         {data?.data?.type === 'document' && <Flex center>
                <img src={documentImage} width="260px" height="160px"></img>
        </Flex>}
        {data?.data?.body && (
          <Typography.Paragraph>{data?.data?.body?.text}</Typography.Paragraph>
        )}
       
      </ProspectBody>
    </ProspectCard>
  );
};

export default MessageBody;
