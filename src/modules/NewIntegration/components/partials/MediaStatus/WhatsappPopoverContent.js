import {
  InfoCircleOutlined,
  SyncOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import playSymbol from '@assets/images/play-symbol.svg';
import { Text } from '../../Integration.styles';
import Flex from '../../../../../components/common/Flex';
import {
  Button,
  Col,
  Divider,
  Popover,
  Row,
  Switch,
  Form,
  Input,
  Modal,
  Tooltip,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import switchIcon from '@assets/images/switch-icon.svg';
import copy from '@assets/images/Copy.svg';

const Innertext = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #4d4d4d;
`;
const Titles = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #4d4d4d;
  margin: 40px 0px 10px 0px;
`;
const SubmitButton = styled(Button)`
  color: white;
  margin: 40px 0px 20px 0px;
`;
const Mod = styled(Modal)`
  border-radius: 10px;
  .ant-modal-header {
    background: none;
    border-bottom: none;
  }
  .ant-modal-content {
    border-radius: 16px;
  }
`;

export const WhatsappPopoverContent = (data, setPopoverOpen) => {
  const { WP_VERIFY_TOKEN } = process.env;
  const { WP_CALL_BACK_URL } = process.env;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkcopied, setLinkCopied] = useState(false);
  const [copied, setCopied] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setPopoverOpen(false);
  };
  return (
    <>
      <div onMouseLeave={() => setPopoverOpen(false)}>
        <Button
          type="text"
          style={{ display: 'block' }}
          href={
            'https://storage.googleapis.com/asp-pprd-images-bucket/ASPVIDEO/whatsappconfig.mp4'
          }
          target="_blank"
        >
          <Flex>
            <span style={{ marginRight: '13px' }}>Viewdemo</span>
            <img src={playSymbol}></img>
          </Flex>
        </Button>
        {data?.platform_name === 'WhatsApp' && (
          <>
            <Button type="text" onClick={showModal}>
              <Flex>
                <span style={{ marginRight: '13px' }}>Configure</span>
                <img src={switchIcon}></img>
              </Flex>
            </Button>
            <Mod
              title={<Text>Connecting WhatsApp Cloud API</Text>}
              footer={false}
              centered={true}
              onCancel={() => {
                setIsModalOpen(false);
                setPopoverOpen(false);
              }}
              open={isModalOpen}
            >
              <Innertext>
                Add the following field in WhatsApp configuration page.
              </Innertext>
              <Form>
                <Titles>Callback URL</Titles>
                <Form.Item name="Callback URL">
                  <Flex spaceBetween>
                    <Input
                      defaultValue={WP_CALL_BACK_URL}
                      disabled={true}
                      bordered={false}
                      style={{ borderBottom: '1px solid #D9D9D9' }}
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
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigator.clipboard.writeText(WP_CALL_BACK_URL);
                          setLinkCopied(true);
                          setCopied(false);
                        }}
                      />
                    </Tooltip>
                  </Flex>
                </Form.Item>
                <Titles>Verify Token</Titles>
                <Form.Item name="Verify Token">
                  <Flex spaceBetween>
                    <Input
                      defaultValue={WP_VERIFY_TOKEN}
                      bordered={false}
                      disabled={true}
                      style={{ borderBottom: '1px solid #D9D9D9' }}
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
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigator.clipboard.writeText(WP_VERIFY_TOKEN);
                          setCopied(true);
                          setLinkCopied(false);
                        }}
                      />
                    </Tooltip>
                  </Flex>
                </Form.Item>
                <Flex center>
                  <SubmitButton
                    type="primary"
                    htmlType="submit"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Done
                  </SubmitButton>
                </Flex>
              </Form>
            </Mod>
          </>
        )}
      </div>
    </>
  );
};
