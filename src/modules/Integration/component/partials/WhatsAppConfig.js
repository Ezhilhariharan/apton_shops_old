import { Input, Select, Space } from 'antd';
import React from 'react';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { CopyTwoTone } from '@ant-design/icons';
const {WP_VERIFY_TOKEN} = process.env
const {WP_CALL_BACK_URL} = process.env

const Title = styled.span`
font-family: Lato;
font-style: normal;
font-weight: 700;
font-size:  ${props => props.fontSize || '14px;'}
line-height: 17px;
color: #4D4D4D;
padding-bottom: 1rem;
`;
const WhatsAppConfig = () => {
  return (
    <Flex column>
      <Title>3.Add the following field in WhatsApp configuration page.</Title>
      <Space size={'large'}>
        <Title>Callback URL</Title>
        <Input
          size="large"
          bordered={false}
          disabled
          defaultValue={WP_CALL_BACK_URL}
          style={{
            borderBottom: '1px solid #d9d9d9',
            borderRadius: 0,
            width: '30rem',
          }}
        />
          <CopyTwoTone style={{cursor:'pointer'}} onClick={()=>{navigator.clipboard.writeText(WP_CALL_BACK_URL)}}/>
      </Space>
      <Space>
        <Title>Verify Token</Title>
        <Input
          size="large"
          bordered={false}
          disabled
          defaultValue={WP_VERIFY_TOKEN}
          style={{
            borderBottom: '1px solid #d9d9d9',
            borderRadius: 0,
            width: '30rem',
          }}
        />
       <CopyTwoTone style={{cursor:'pointer'}} onClick={()=>{navigator.clipboard.writeText(WP_VERIFY_TOKEN)}}/>
      </Space>
    </Flex>
  );
};
export default WhatsAppConfig;
