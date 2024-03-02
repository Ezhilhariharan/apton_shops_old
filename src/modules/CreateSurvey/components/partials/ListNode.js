import React from 'react';
import { Row, Col, Space, Typography, Button } from 'antd';
import { IconWrapper, ProspectBody, ProspectCard } from './SurveyStyles';
import ListIcon from '@components/icons/ListIcon';
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

const MenuButton = styled.div`
    background: rgb(93, 173, 236);
    border-radius: 5px;
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 6px;
`

const RowTitle = styled.div`
font-weight: 600;
margin: 10px 0px;
word-break: break-all;
font-size: 12px;
line-height: 18px;
`

const ListNode = ({ data,nodeId }) => {
  return (
    <div>
<ProspectCard backgroundColor={'#0047B3'}>
      <Row style={{ padding: 10 }}>
        <Col span={12}>
          <IconWrapper>
            <ListIcon />
          </IconWrapper>
        </Col>
        <Col span={12}>
          <Flex end>
            <Space align="center" size={'middle'}>
              {/* <div>
                <BasicEye />
              </div> */}
              <div>
                <NodeActions title={'List'} nodeId={nodeId} />
              </div>
            </Space>
          </Flex>
        </Col>
      </Row>
      <ProspectBody style={{ padding: 15 }}>
        {data?.data?.header && (
          <HeaderText>
            {data?.data?.header?.text}
          </HeaderText>
        )}
        {data?.data?.body && (
          <BodyText>{data?.data?.body?.text}</BodyText>
        )}
        {data?.data?.footer && (
          <FooterText>
            {data?.data?.footer?.text}
          </FooterText>
        )}
        <MenuButton>
            {data?.data?.action?.button}
        </MenuButton>
        <div style={{marginTop:5}}>
            {data?.data?.action?.sections?.map((i,id)=>{
                return(
                    <div key={id}>
                        <RowTitle>{i?.title}</RowTitle>
                        <div>
            {i?.row?.map((value,id) => {
              return <SourceHandler data={value} key={id} />;
            })}
          </div>
                    </div>
                )
            })}
        </div>
      </ProspectBody>
    </ProspectCard>
    </div>

  );
};

export default ListNode;
