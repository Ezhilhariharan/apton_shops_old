import React from 'react';
import { Row, Col, Space, Typography, Button } from 'antd';
import { IconWrapper, ProspectBody, ProspectCard } from './SurveyStyles';
import QuestionIcon from '@components/icons/QuestionIcon';
import WhiteBin from '@components/icons/WhiteBin';
import BasicEye from '@components/icons/BasicEye';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { lightColorsTheme } from '@theme/styles/light/lightTheme';
import SourceHandler from './SourceHandler';
import NodeActions from './NodeActions';


const HeaderText = styled.div`
  color: ${lightColorsTheme.darkBlack};
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
`;
const FooterText = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  font-style: italic;
`;
const BodyText = styled.p`
  color: ${lightColorsTheme.darkBlack};
  font-weight: 500;
  font-size: 14px;
  line-height: 30px;
`;
const QuestionNode = ({ data,nodeId }) => {
  return (
    <div>
      <ProspectCard backgroundColor={'#F25511'}>
        <Row style={{ padding: 10 }}>
          <Col span={12}>
            <IconWrapper>
              <QuestionIcon />
            </IconWrapper>
          </Col>
          <Col span={12}>
            <Flex end>
              <Space align="center" size={'middle'}>
                {/* <div>
                  <BasicEye />
                </div> */}
                <div>
                  <NodeActions title={'Question'} data={data} nodeId={nodeId}/>
                </div>
              </Space>
            </Flex>
          </Col>
        </Row>
        <ProspectBody style={{ padding: 15 }}>
          {data?.data?.header && (
            <HeaderText>{data?.data?.header?.text}</HeaderText>
          )}
          {data?.data?.body && (
            <div>
              <BodyText>{data?.data?.body?.text}</BodyText>
            </div>
          )}
          {data?.data?.footer && (
            <FooterText>{data?.data?.footer?.text}</FooterText>
          )}
          <div>
            {data?.data?.action?.buttons.map(i => {
              return <SourceHandler data={i?.reply} key={i?.reply?.id} />;
            })}
          </div>
        </ProspectBody>
      </ProspectCard>
    </div>
  );
};

export default QuestionNode;
