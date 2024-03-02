import { Input, Select, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { CopyTwoTone } from '@ant-design/icons';
import copy from '@assets/images/Copy.svg';
const { WP_VERIFY_TOKEN } = process.env;
const { WP_CALL_BACK_URL } = process.env;

const Title = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  font-size: ${props => props.fontSize || '14px'};
  line-height: 17px;
  color: #4d4d4d;
  margin: 30px 15px 0 0;
`;
const WhatsAppConfig = () => {
  const [copied, setCopied] = useState(false);
  const [linkcopied, setLinkCopied] = useState(false);
  return (
    <Flex column>
      <Title>3. Add the following field in WhatsApp configuration page.</Title>
      <Flex>
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
        <Tooltip
          placement="top"
          title={linkcopied === true ? 'Link Copied' : 'Copy Link'}
          color={linkcopied === true ? '#00AC4F' : 'black'}
        >
          <img
            src={copy}
            width="18px"
            height="18px"
            style={{ cursor: 'pointer', marginTop: '10px' }}
            onClick={() => {
              navigator.clipboard.writeText(WP_CALL_BACK_URL);
              setLinkCopied(true);
              setCopied(false);
            }}
          />
        </Tooltip>
      </Flex>
      <Flex>
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
        <Tooltip
          placement="top"
          title={copied === true ? 'Token Copied' : 'Copy Token'}
          color={copied === true ? '#00AC4F' : 'black'}
        >
          <img
            src={copy}
            width="18px"
            height="18px"
            style={{ cursor: 'pointer', marginTop: '10px' }}
            onClick={() => {
              navigator.clipboard.writeText(WP_VERIFY_TOKEN);
              setCopied(true);
              setLinkCopied(false);
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
export default WhatsAppConfig;
