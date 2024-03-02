import React, { useState, useEffect } from 'react';
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
  Pagination,
} from 'antd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  ChartHeader,
  ConversationButton,
  ChatBody,
  Cards,
  BottomBox,
  Text,
  TextField,
  TextButton,
  Content,
  PaginationButton,
  Wrapper,
  WhiteText,
  ReciveText,
} from './ChatCSS';
import SideChat from './ContactList';
import TemplateMsg from './TemplateMsg';
import Flex from '@components/common/Flex';
import NochatSelected from '@components/icons/NochatSelected';
import {
  SendOutlined,
  CloseOutlined,
  MailOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import VariableDrawer from '../../../../Inbox/components/Partials/VariableDrawer';
import chatAvatar from '@components/icons/chatAvatar.png';
import SendIconLarge from '../../../../../components/icons/SendIconLarge';
import Loader from './Loader';
import { useRef } from 'react';
import Layout from '@components/icons/Layout';
import { toggleConvesatation } from '../../../../Inbox/actions';
import { retrieveWhatsappMessageTemplates } from '../../../Template/actions';
import SearchInputIcon from '../../../../../components/icons/SearchInputIcon';
import { getwhatsapptemplist } from '../../../whatsapp/subcomponet/actions';
const { Search } = Input;
const Box = styled.div`
  width: 600px;
  height: 420px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 13px;
  }
  border-radius: 10px 10px 0px 0px;
`;
const ChatList = styled(Card)`
  height: 82vh;
  .ant-card-body {
    padding: 10px;
  }
`;
export const SearchInput = styled(Input)`
  .ant-input-affix-wrapper {
    border: 0px solid #d9d9d9;
  }
`;
const ColourlessSearch = styled(Search)`
  button {
    border: none !important;
    background-color: #ffffff !important;
  }
`;
const StyledDivider = styled(Divider)`
  border-bottom: 1px solid #d9d9d9;
  margin: 11px 4px 11px 4px;
`;
const CampaignPagination = styled(Pagination)`
  margin-top: 15px;
  .ant-pagination-options-size-changer.ant-select {
    display: none;
  }
`;
const ChatBox = ({
  conversationList,
  chatHistory,
  fetchChatHistory,
  sendwpMessage,
  fetchConversationList,
  campId,
  whatsapptempList,
  setTempSearch,
  getwhatsapptemplist,
  setPageNumber,
  pageNumber,
}) => {
  const selectedNumber = useSelector(
    state => state.campainDetailSelector.selectedRow
  );
  const [searchedValue, setSearchedValue] = useState(selectedNumber?.to);
  const [selecteContact, setSelectedContact] = useState(selectedNumber);
  const [open, setOpen] = useState(false);
  const [opendr, setOpenDr] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [currValue, setCurrValue] = useState('');
  const dispatch = useDispatch();
  const onFinish = value => {
    const receipentId = selecteContact?.to;
    const fromId = selecteContact?.from;
    sendwpMessage(receipentId, value, fromId);
    form.resetFields();
  };
  const currentUser = useSelector(state => state.authSelector.cusrentUser);
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const brandId = currentUser?.brand?.id;
  const accountId = currentUser?.account?.id;
  useEffect(() => {
    if (selecteContact !== undefined) {
      const interval = setTimeout(() => {
        setLoading(false);
        fetchChatHistory(
          accountId,
          brand?.id,
          selecteContact?.to,
          selecteContact?.from
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [selecteContact]);

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
  useEffect(() => {
    if (searchedValue) {
      fetchConversationList(campId, searchedValue);
    }
  }, [searchedValue]);

  const handlePagination = page => {
    setPageNumber(page);
  };
  const [selectedtemp, setSelectedTemp] = useState();
  const templateHandle = data => {
    setSelectedTemp(data);
    setOpen(false);
    setOpenDr(true);
  };
  const totalPages = Math.ceil(whatsapptempList?.data?.length / 10);
  const displayData = whatsapptempList?.data?.slice(
    (pageNumber - 1) * 10,
    pageNumber * 10
  );
  const handlePageChnage = num => {
    setPageNumber(num);
  };
  const templates = (
    <Box>
      <Row>
        <Col span={15}>
          <Text>Choose template</Text>
        </Col>
        <Col span={8} style={{ display: 'flex' }}>
          <Input
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
              const dataName = data?.name.toLowerCase();
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
                      {data?.name.charAt(0) + data?.name.slice(1)}
                    </span>
                    <Content length={BodyContent[0]?.text?.length}>
                      {BodyContent[0]?.text}
                    </Content>
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
  return (
    <Wrapper>
      <Row>
        <Col span={8} style={{ marginRight: '2px' }}>
          <ChatList>
            <Flex>
              <ColourlessSearch
                bordered={false}
                defaultValue={
                  selectedNumber?.first_name == undefined
                    ? selectedNumber?.last_name
                    : selectedNumber?.first_name
                }
                onChange={e => {
                  setSearchedValue(e.target.value);
                  fetchConversationList(
                    accountId,
                    brand?.id,
                    campId,
                    e.target.value
                  );
                }}
              />
            </Flex>
            <StyledDivider />
            {conversationList?.campaign_list?.length === 0 && (
              <Flex center>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>
                  Searched Contact Is Not Found
                </span>
              </Flex>
            )}
            <SideChat
              conversationList={conversationList}
              fetchChatHistory={fetchChatHistory}
              setSelectedContact={setSelectedContact}
              fetchConversationList={fetchConversationList}
              campId={campId}
              searchValue={searchedValue}
              selecteContact={selecteContact}
            />
          </ChatList>
        </Col>
        <Col span={15}>
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
                      style={{ backgroundColor: '#F4F4F5', margin: 5 }}
                      className="firstLetter"
                    >
                      <span style={{ color: 'black' }}>
                        {selecteContact?.first_name?.charAt(0)}
                      </span>
                    </Avatar>
                    <Typography.Text
                      style={{ padding: 13 }}
                      className="textStyles"
                    >
                      {selecteContact?.first_name} {selecteContact?.last_name}
                      {!selecteContact?.first_name &&
                        !selecteContact?.last_name &&
                        selecteContact?.to}
                    </Typography.Text>
                  </Col>
                  <Col span={6} style={{ width: '100%', margin: 'auto' }}>
                    <ConversationButton
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
                    </ConversationButton>
                  </Col>
                </Row>
              </ChartHeader>
              <ChatBody>
                {loading ? (
                  <Loader />
                ) : (
                  <div ref={ref}>
                    {chatHistory?.conversation_messages?.map((item, id) => {
                      const date = item?.sent_at?.substring(0, 10);
                      const time = item?.sent_at?.substring(11, 19);
                      const total = date + ' ' + time;
                      const momentDate = moment(total);
                      const momentTime = moment(time, 'HH:mm:ss');
                      return (
                        <>
                          {(item.status === 'read' ||
                            item.status === 'sent' ||
                            item.status === 'delivered') &&
                            item?.messages === undefined && (
                              <>
                                <Flex end>
                                  <div style={{ display: 'block' }}>
                                    <WhiteText>
                                      <TemplateMsg
                                        item={item?.messages}
                                        key={id}
                                      />
                                    </WhiteText>
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
                                        <img src={chatAvatar} alt="noAvatar" />
                                      </span>
                                    </Avatar> */}
                                  {/* </div> */}
                                </Flex>
                              </>
                            )}
                          {(item.status === 'read' ||
                            item.status === 'sent' ||
                            item.status === 'delivered') &&
                            item?.messages && (
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
                                          color: 'white',
                                        }}
                                      >
                                        {momentTime.format('hh:mm A')}
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
                                      <span>
                                        <img src={chatAvatar} alt="noAvatar" />
                                      </span>
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
                                        margin: '5px 0px 5px 10px',
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
                                      <ReciveText>
                                        <span>{msg?.text?.body}</span>
                                        {msg?.button?.text && (
                                          <span>{msg?.button?.text}</span>
                                        )}
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
                  <Form style={{ padding: 20 }} onFinish={onFinish} form={form}>
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
                        style={{ margin: '20px 10px 10px 10px' }}
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
