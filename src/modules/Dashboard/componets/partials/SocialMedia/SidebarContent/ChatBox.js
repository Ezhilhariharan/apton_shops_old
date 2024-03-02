import React from 'react';
import { Text } from '../../WhatsApp/SidebarContent/Sidecard';
import Flex from '@components/common/Flex';
import { Avatar, Card, Divider, Layout, Typography } from 'antd';
import styled from 'styled-components';
import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { lightColorsTheme } from '../../../../../../theme/styles/light/lightTheme';

const Chats = styled(Card)`
  width: 100%;
  background: #ffffff;
  border: none;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 50px;

  .ant-card-body {
    padding: 20px 17px;
  }

  // &:hover {
  //   background-color: ${lightColorsTheme.headerInputBackground};
  // }

  .more {
    cursor: pointer;
    font-size: 20px;
    color: black;
  }

  .hoverCard:hover {
    background-color: ${lightColorsTheme.headerInputBackground};
  }
  /* Media Query */

  // @media screen and (min-width: 1200px) {
  //   width: 100%;
  //   border: 1px solid red;
  // }
`;
const Div = styled.div`
  max-height: 445px;
  overflow-y: scroll;
  cursor: pointer;
  // &:hover {
  //   background-color: ${lightColorsTheme.headerInputBackground};
  // }

  ::-webkit-scrollbar {
    width: 4px;
  }
`;

const ChatBox = () => {
  return (
    <Chats>
      <div style={{ height: '40px' }}>
        <Text>Chat Inbox</Text>

        {/* <Text>
            <MoreOutlined className='more'/>
          </Text> */}
      </div>
      <Divider style={{ marginTop: '0px' }} />
      <Div>
        {chats?.map(details => {
          return (
            <Link to="/inbox">
              <Flex
                style={{
                  width: '100%',
                  marginTop: '15px',
                  marginLeft: '-10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Flex style={{ width: '100%' }} className="hoverCard">
                  <span
                    style={{
                      width: '14px',
                      height: '12px',
                      border: '2px solid #fff',
                      borderRadius: '50%',
                      background: '#00AC4F',
                      position: 'relative',
                      left: '45px',
                      top: '35px',
                      zIndex: 1,
                    }}
                  ></span>
                  <div
                    style={{
                      border: '1px solid #4AACEA',
                      borderRadius: '50%',
                      height: '47px',
                      marginRight: '5px',
                    }}
                  >
                    <Avatar
                      shape="circle"
                      icon={details?.icon}
                      size="large"
                      style={{
                        zIndex: 0,
                        margin: '3px',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: '100%',
                      // marginTop: '5px',
                      // justifyContent: 'space-between',
                    }}
                  >
                    <Flex
                      style={{
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text>{details?.name}</Text>
                      <div>
                        <p
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: '#4d4d4d',
                          }}
                        >
                          {details?.lastseen}
                        </p>
                      </div>
                    </Flex>
                    <div>
                      <p
                        className="status"
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          // lineHeight: '14px',
                          color: '#4d4d4d',
                        }}
                      >
                        {details?.status}
                      </p>
                    </div>
                  </div>
                </Flex>
              </Flex>
            </Link>
          );
        })}
      </Div>
    </Chats>
  );
};
const chats = [
  {
    name: 'Wanda Fuller',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: 'Just Now',
  },
  {
    name: 'Lonnie Garza',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: '1m ago',
  },
  {
    name: 'Magnus Howe',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: '1h ago',
  },
  {
    name: 'Emily Stokes',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: 'Just Now',
  },
  {
    name: 'Zelda Barker',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: 'Just Now',
  },
  {
    name: 'John',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: 'Just Now',
  },
  {
    name: 'Sam',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: 'Just Now',
  },
  {
    name: 'Christina',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: 'Just Now',
  },
  {
    name: 'Zoey',
    icon: <UserOutlined />,
    status: 'Hello, I need some help for my customer support',
    lastseen: 'Just Now',
  },
];
export default ChatBox;
