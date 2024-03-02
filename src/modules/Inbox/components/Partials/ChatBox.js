import React, { useRef, useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  Card,
  Avatar,
  Divider,
  Form,
  Button,
  Typography,
  Popover,
  Drawer,
  Pagination,
  message,
} from 'antd';
import { lightColorsTheme } from '@theme/styles/light/lightTheme';
import styled from 'styled-components';
import {
  ChartHeader,
  ChatBody,
  ChatList,
  ColourlessSearch,
  StyledDivider,
  WhiteText,
  ReciveText,
  Cards,
  BottomBox,
  Text,
  TextField,
  TextButton,
  Content,
  Wrapper,
  PaginationButton,
  ConversationButton,
  StyleBtn,
} from '../../../Campagins/whatsAppChat/components/partials/ChatCSS';
import SideChat from './SideChat';
import TemplateMsg from '../../../Campagins/whatsAppChat/components/partials/TemplateMsg';
import Flex from '@components/common/Flex';
import Loader from '../../../Campagins/whatsAppChat/components/partials/Loader';
import {
  SendOutlined,
  MailOutlined,
  SearchOutlined,
  CloseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { templateListPreviousPage } from '../../../Campagins/whatsapp/subcomponet/actions';
import { templateListNextPage } from '../../../Campagins/whatsapp/subcomponet/actions';
import NochatSelected from '../../../../components/icons/NochatSelected';
import VariableDrawer from './VariableDrawer';
import SendIconLarge from '@components/icons/SendIconLarge';
import Layout from '@components/icons/Layout';
import moment from 'moment';
import chatAvatar from '@components/icons/chatAvatar.png';
import { getRandomColor } from './SideChat';
import Vector from '../../../../components/icons/vector';
import SearchInputIcon from '../../../../components/icons/SearchInputIcon';

export const More = styled(Button)`
  color: #4aacea;
  &:hover {
    color: #4aacea;
    background-color: #ffffff;
  }
  &:focus {
    color: #4aacea;
    background-color: #ffffff;
  }
`;
const Box = styled.div`
  width: 50rem;
  max-height: 500px;
  height: auto;
  overflow: hidden;

  ::-webkit-scrollbar {
    width: 13px;
  }
  border-radius: 10px 10px 0px 0px;

  .ant-row {
    gap: 0px 35px;
  }
`;

const StyledInput = styled(Input)`
  width: 340px;
  height: 30px;
  border-radius: 5px;
  // box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
`;

const ChatBox = ({
  inboxList,
  whatsapptempList,
  getwhatsapptemplist,
  inboxListNumbers,
  fetchChatHistory,
  sendwpMessage,
  currentUser,
  chatHistory,
  setTempSearch,
  value,
  setValue,
  conversationStatus,
  toggleConvesatation,
}) => {
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const brandId = currentUser?.brand?.id;
  const selectedNumber = useSelector(
    state => state.campainDetailSelector.selectedRow
  );
  const accountId = currentUser?.account?.id;
  const [selecteContact, setSelectedContact] = useState(selectedNumber);
  const [searchValue, setSearchValue] = useState('');
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [opendr, setOpenDr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [currValue, setCurrValue] = useState('');

  // useEffect(() => {
  //   if (selecteContact !== undefined) {
  //     const interval = setInterval(() => {
  //       setLoading(false);
  //       fetchChatHistory(
  //         accountId,
  //         brand?.id,
  //         selecteContact?.to,
  //         selecteContact?.from
  //       );
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [selecteContact]);

  // useEffect(() => {
  //   if (selecteContact !== undefined) {
  //     setLoading(true);
  //     fetchChatHistory(
  //       accountId,
  //       brand?.id,
  //       selecteContact?.to,
  //       selecteContact?.from
  //     )
  //       .then(() => setLoading(false))
  //       .catch(error => {
  //         setLoading(false);
  //         console.error('Error fetching chat history:', error);
  //       });
  //   }
  // }, [selecteContact]);
  useEffect(() => {
    if (selecteContact !== undefined) {
      setLoading(true);
      fetchChatHistory(
        accountId,
        brand?.id,
        selecteContact?.to,
        selecteContact?.from
      );
      setLoading(false);

      const interval = setInterval(() => {
        fetchChatHistory(
          accountId,
          brand?.id,
          selecteContact?.to,
          selecteContact?.from
        );
        setLoading(false);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [selecteContact]);

  const dynamicData = [];

  const onFinish = value => {
    const receipentId = selecteContact?.to;
    const fromId = selecteContact?.from;
    sendwpMessage(receipentId, value, fromId, null, null, 'text', dynamicData);
    form.resetFields();
  };
  const [selectedtemp, setSelectedTemp] = useState();
  const templateHandle = data => {
    setSelectedTemp(data);
    setOpen(false);
    setOpenDr(true);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [value]);

  const ref = useRef();
  const scrollingBottom = () => {
    const e = ref;

    e.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'end',
    });
  };

  useEffect(() => {
    scrollingBottom();
  });
  const handleConversation = val => {
    setIsOpen(!isOpen);
    if (selecteContact && val) {
      const status =
        chatHistory?.message_active || chatHistory?.message_active === 'Closed'
          ? 'Opened'
          : 'Closed';
      toggleConvesatation(
        accountId,
        brand?.id,
        selecteContact?.from,
        selecteContact?.to,
        status
      );
      if (chatHistory?.message_active === 'Closed') {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  };
  const totalPages = Math.ceil(whatsapptempList?.list?.length / 10);
  const displayData = whatsapptempList?.list?.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  const handlePageChnage = num => {
    setCurrentPage(num);
  };

  const templates = (
    <Box>
      <Row>
        <Col span={14}>
          <Text>Choose template</Text>
        </Col>
        <Col span={8} style={{ display: 'flex' }}>
          <StyledInput
            prefix={<SearchInputIcon style={{ marginRight: '12px' }} />}
            placeholder="Search"
            style={{ border: '1px solid #F4F4F5', borderRadius: '5px' }}
            onChange={e => {
              const value = e.target.value;
              setCurrValue(value);
              setTempSearch(currValue);
              getwhatsapptemplist(currValue);
            }}
          />
          <CloseOutlined
            onClick={() => setOpen(false)}
            style={{ fontSize: '18px', margin: '7px 10px' }}
          />
        </Col>
      </Row>
      <div style={{ height: '40vh', overflowY: 'scroll' }}>
        <Row>
          {displayData
            ?.filter(data => {
              const nameToSearch = currValue?.toLowerCase();
              const dataName = data?.name?.toLowerCase();
              return dataName?.includes(nameToSearch);
            })
            ?.map(data => {
              const BodyContent = data?.components?.filter(
                i => i.type === 'BODY'
              );
              return (
                <Col span={11} style={{ marginTop: '10px', marginLeft: '6px' }}>
                  <Cards>
                    <span className="Header">
                      {data?.name?.charAt(0) + data?.name.slice(1)}
                    </span>
                    {BodyContent?.length > 0 && (
                      <Content length={BodyContent[0]?.text?.length}>
                        {BodyContent[0]?.text}
                      </Content>
                    )}
                    <Flex center>
                      <Text
                        style={{
                          padding: '10px 0px 20px 0px',
                          cursor: 'pointer',
                        }}
                        onClick={() => templateHandle(data)}
                      >
                        Use Template
                      </Text>
                    </Flex>
                  </Cards>
                </Col>
              );
            })}
          <Col span={24}>
            {/* <Flex end>
            <PaginationButton
              onClick={() => handlePageChnage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationButton>
            <PaginationButton
              onClick={() => handlePageChnage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>
          </Flex> */}
          </Col>
        </Row>
      </div>
    </Box>
  );
  const name =
    selecteContact?.first_name?.charAt(0).toUpperCase() ||
    selecteContact?.last_name?.charAt(0).toUpperCase();
  return (
    <Wrapper>
      <Row>
        <Col span={7}>
          <ChatList>
            <ColourlessSearch
              bordered={false}
              value={value}
              placeholder="Search"
              style={{ width: '100%' }}
              onChange={e => {
                const currValue = e.target.value;
                setValue(currValue);
                inboxListNumbers(accountId, brand?.id, currValue);
              }}
            />
            <StyledDivider />
            {inboxList?.list?.length === 0 && (
              <Flex center>
                <span className="head" style={{ fontSize: '1.125rem' }}>
                  Searched Contact Is Not Found
                </span>
              </Flex>
            )}
            <SideChat
              searchValue={searchValue}
              inboxList={inboxList}
              selecteContact={selecteContact}
              setSelectedContact={setSelectedContact}
              inboxListNumbers={inboxListNumbers}
              currentUser={currentUser}
              convoMessage={chatHistory?.convo_status}
            />
          </ChatList>
        </Col>
        <Col span={17}>
          {selecteContact === undefined ? (
            <div style={{ background: 'white', height: '100%' }}>
              <div style={{ paddingTop: '140px' }}>
                <Flex center>
                  {' '}
                  <NochatSelected />
                </Flex>
                <span className="head">No contacts selected</span>
                <span className="cont">
                  Select a contact to see conversation history.
                </span>
              </div>
            </div>
          ) : (
            <>
              <ChartHeader>
                <Row style={{ width: '100%' }}>
                  <Col span={18}>
                    <Avatar
                      size={'large'}
                      style={{
                        backgroundColor: getRandomColor(name),
                        border: '2px solid white',
                        margin: 5,
                      }}
                      className="firstLetter"
                    >
                      {name ? (
                        <span style={{ color: 'black' }}>{name}</span>
                      ) : (
                        <UserOutlined
                          style={{ fontSize: '1.25rem', color: 'white' }}
                        />
                      )}
                    </Avatar>
                    <Typography.Text
                      style={{ padding: '0 5px' }}
                      className="textStyles"
                    >
                      {selecteContact?.first_name} {selecteContact?.last_name}
                      {!selecteContact?.first_name &&
                        !selecteContact?.last_name &&
                        selecteContact?.to}
                    </Typography.Text>
                  </Col>
                  <Col span={6} style={{ width: '100%', margin: 'auto' }}>
                    <Flex end style={{ marginRight: '10px' }}>
                      {/* <ConversationButton
                        msgStatus={chatHistory?.message_active}
                        className="btn-button"
                        onClick={() =>
                          handleConversation(chatHistory?.message_active)
                        }
                      >
                        {chatHistory?.message_active === undefined
                          ? ' '
                          : chatHistory?.message_active ||
                            chatHistory?.message_active === 'Closed'
                          ? 'Open Conversation'
                          : 'Close Conversation'}
                      </ConversationButton> */}
                    </Flex>
                  </Col>
                </Row>
              </ChartHeader>
              <ChatBody>
                {loading ? (
                  <Loader />
                ) : (
                  <div ref={ref}>
                    {chatHistory &&
                      chatHistory?.conversation_messages?.map((item, id) => {
                        const date = item?.sent_at?.substring(0, 10);
                        const time = item?.sent_at?.substring(11, 19);
                        const total = date + ' ' + time;
                        const momentDate = moment(total);
                        const momentTime = moment(time, 'HH:mm:ss');

                        return (
                          <>
                            {(item?.status === 'read' ||
                              item?.status === 'sent' ||
                              item?.status === 'delivered') &&
                              item?.messages === undefined && (
                                <>
                                  <Flex end>
                                    <div style={{ display: 'block' }}>
                                      <WhiteText>
                                        <TemplateMsg
                                          item={item?.messages}
                                          key={id}
                                        />
                                        <Flex
                                          end
                                          style={{
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            margin: '0 0 0 80px',
                                            color: '#999999',
                                          }}
                                        >
                                          {momentTime.format('hh:mm A')}
                                        </Flex>
                                      </WhiteText>
                                      <Flex
                                        end
                                        style={{ margin: '5px 5px 20px 0px' }}
                                      >
                                        {momentDate
                                          .from(moment())
                                          .indexOf('an') !== -1
                                          ? momentDate
                                              .from(moment())
                                              ?.replace('an', '1')
                                          : momentDate.from(moment()) ===
                                            'a day ago'
                                          ? '1 day ago'
                                          : momentDate.from(moment())}
                                        {/* <MailOutlined
                                          style={{ margin: '5px 0px 0px 4px' }}
                                        /> */}
                                      </Flex>
                                    </div>
                                    {/* <div
                                      style={{
                                        width: '40px',
                                        height: '60px',
                                        margin: '10px 0px 0px 10px',
                                      }}
                                    > */}
                                    {/* <Avatar size={'large'}>
                                        <span>
                                          <img
                                            src={chatAvatar}
                                            alt="noAvatar"
                                          />
                                        </span>
                                      </Avatar> */}
                                    {/* </div> */}
                                  </Flex>
                                </>
                              )}
                            {(item?.status === 'read' ||
                              item?.status === 'sent' ||
                              item?.status === 'delivered') &&
                              item?.messages && (
                                <>
                                  <Flex end>
                                    <div
                                      style={
                                        {
                                          // display: 'flex',
                                          // width: '50%',
                                        }
                                      }
                                    >
                                      <WhiteText>
                                        <TemplateMsg
                                          item={item?.messages}
                                          key={id}
                                        />
                                        <Flex
                                          end
                                          style={{
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            margin: '0 0 0 80px',
                                            color: '#fff',
                                          }}
                                        >
                                          {momentTime.format('hh:mm A')}
                                          {/* <MailOutlined
                                            style={{
                                              margin: '5px 0px 0px 4px',
                                            }}
                                          /> */}
                                        </Flex>
                                      </WhiteText>
                                      <Flex
                                        end
                                        style={{
                                          margin: '5px 25px 0 0px',
                                        }}
                                      >
                                        {momentDate
                                          .from(moment())
                                          .indexOf('an') !== -1
                                          ? momentDate
                                              .from(moment())
                                              ?.replace('an', '1')
                                          : momentDate.from(moment()) ===
                                            'a day ago'
                                          ? '1 day ago'
                                          : momentDate.from(moment())}
                                        {/* <MailOutlined
                                          style={{ margin: '5px 0px 0px 4px' }}
                                        /> */}
                                      </Flex>
                                    </div>
                                    {/* <div
                                      style={{
                                        width: '40px',
                                        height: '60px',
                                        margin: '10px 0px 0px 10px',
                                      }}
                                    > */}
                                    {/* <Avatar size={'large'}>
                                        <img src={chatAvatar} alt="noAvatar" />
                                      </Avatar> */}
                                    {/* </div> */}
                                  </Flex>
                                </>
                              )}
                            {item?.status === 'received' &&
                              item?.messages?.map(msg => {
                                return msg?.text?.body === [] ? (
                                  ''
                                ) : (
                                  <>
                                    <Flex start>
                                      {/* <div
                                        style={{
                                          width: '30px',
                                          height: '40px',
                                          margin: '5px 0px 20px 10px',
                                        }}
                                      > */}
                                      {/* <Avatar>
                                          <span style={{ color: 'black' }}>
                                            {selecteContact?.first_name === null
                                              ? selecteContact?.last_name?.charAt(
                                                  0
                                                )
                                              : selecteContact?.first_name?.charAt(
                                                  0
                                                )}
                                          </span>
                                        </Avatar> */}
                                      {/* </div> */}
                                      <div>
                                        <ReciveText style={{ width: 'auto' }}>
                                          <span>{msg?.text?.body}</span>
                                          {msg?.button?.text && (
                                            <span>{msg?.button?.text}</span>
                                          )}
                                          <Flex
                                            end
                                            style={{
                                              fontSize: '12px',
                                              fontWeight: '500',
                                              margin: '5px 0 0 80px',
                                              color: '#999999',
                                            }}
                                          >
                                            {momentTime.format('hh:mm A')}
                                          </Flex>
                                        </ReciveText>
                                        <Flex
                                          end
                                          style={{
                                            margin: '5px 275px 0px 0px',
                                          }}
                                        >
                                          {momentDate
                                            .from(moment())
                                            .indexOf('an') !== -1
                                            ? momentDate
                                                .from(moment())
                                                ?.replace('an', '1')
                                            : momentDate.from(moment()) ===
                                              'a day ago'
                                            ? '1 day ago'
                                            : momentDate.from(moment())}
                                        </Flex>
                                      </div>
                                    </Flex>
                                  </>
                                );
                              })}
                          </>
                        );
                      })}
                  </div>
                )}
              </ChatBody>
              <BottomBox>
                {chatHistory?.message_active === 'Opened' ? (
                  <Form
                    style={{ margin: '20px 15px 0 15px' }}
                    onFinish={onFinish}
                    form={form}
                  >
                    <Form.Item name={'message'}>
                      <Flex>
                        <div className="Container">
                          {/* <Popover
                            open={open}
                            // content={templates}
                            trigger="click"
                            placement="topLeft"
                            color="white"
                          >
                            <TextButton
                              type="default"
                              icon={<Vector />}
                              className="temp"
                              onClick={() => setOpen(true)}
                            />
                          </Popover> */}
                          <Popover
                            open={open}
                            content={templates}
                            trigger="click"
                            placement="topLeft"
                            color="white"
                          >
                            <TextButton
                              type="default"
                              icon={<Layout />}
                              className="temp"
                              onClick={() => setOpen(true)}
                            />
                          </Popover>

                          <span className="div" />
                          <TextField
                            bordered={false}
                            placeholder="write message here ..."
                            size="large"
                          />
                        </div>

                        <Button
                          type="primary"
                          icon={<SendIconLarge />}
                          htmlType="submit"
                          style={{
                            width: '50px',
                            color: 'white',
                            alignItems: 'center !important',
                            height: '50px',
                            margin: '6px',
                            padding: '8px 5px',
                          }}
                        />
                      </Flex>
                    </Form.Item>
                  </Form>
                ) : (
                  <Flex spaceBetween>
                    <div style={{ display: 'block' }}>
                      <span className="header">
                        Your conversation is closed
                      </span>
                      <span className="des">
                        You can start with new template
                      </span>
                    </div>
                    <Popover
                      content={templates}
                      trigger="click"
                      placement="topLeft"
                      color="white"
                      open={open}
                    >
                      <Button
                        type="primary"
                        style={{
                          margin: '20px 10px 10px 10px',
                          height: '40px',
                          fontWeight: 500,
                          fontSize: '16px',
                          background: '#4aacea',
                        }}
                        onClick={() => setOpen(true)}
                      >
                        Send templates
                      </Button>
                    </Popover>
                  </Flex>
                )}
              </BottomBox>
            </>
          )}

          {opendr && (
            <VariableDrawer
              open={opendr}
              setOpenDr={setOpenDr}
              selectedtemp={selectedtemp}
              sendwpMessage={sendwpMessage}
              selecteContact={selecteContact}
              fetchChatHistory={fetchChatHistory}
              setOpen={setOpen}
            />
          )}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ChatBox;
