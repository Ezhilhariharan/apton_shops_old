import React, { useRef, useState } from 'react';
import { ContactWrapper, NameText, TimeText, Box, Span } from './ChatCSS';
import { Avatar, Space, Row, Col } from 'antd';
import dayjs from 'dayjs';
import Flex from '../../../../../components/common/Flex';
import moment from 'moment';
import { colors } from '../../../../Inbox/components/Partials/SideChat';
import { UserOutlined } from '@ant-design/icons';

const ContactList = ({
  conversationList,
  fetchChatHistory,
  setSelectedContact,
  fetchConversationList,
  campId,
  searchValue,
  selecteContact,
}) => {
  const [selected, setSelected] = useState(false);
  const scrollingRef = useRef();
  const [limit, setLimit] = useState(10);
  const onChange = (e, i) => {
    const receipentId = e?.to;
    const fromId = e?.from;
    fetchChatHistory(receipentId, fromId);
    setSelected(i);
    setSelectedContact(e);
  };
  const handleScroll = () => {
    if (scrollingRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollingRef?.current;
      if (scrollTop + clientHeight === scrollHeight) {
        let increasedLimit = limit + 10;
        setLimit(increasedLimit);
        fetchConversationList(campId, searchValue, increasedLimit);
      }
    }
  };
  const capitalizeFirstLetter = (str, maxLength) => {
    if (str?.length > maxLength) {
      const capitalized = str?.slice(0, maxLength) + '....';
      return capitalized;
    } else {
      return str;
    }
  };
  const getRandomColor = letter => {
    const index = letter?.charCodeAt(0) % colors?.length;
    return colors[index];
  };
  return (
    <Box onScroll={handleScroll} ref={scrollingRef}>
      {conversationList?.campaign_list?.map((e, i) => {
        // console.log(conversationList?.campaign_list);
        // console.log(e?.messages);
        const msg =
          e?.replied !== null && Array.isArray(e?.messages)
            ? e?.messages?.filter(i => i?.type === 'BODY')
            : null;
        const Header =
          e?.replied !== null && Array.isArray(e?.messages)
            ? e?.messages?.filter(i => i?.type === 'HEADER')
            : null;
        const headTitle =
          Header !== null && Header !== undefined
            ? Header?.map(cont =>
                cont?.format === 'TEXT' ? cont?.text : ''
              ).filter(Boolean)
            : '';
        const capitalizedString = capitalizeFirstLetter(
          msg !== null && msg !== undefined ? msg[0]?.text : '',
          headTitle && 20 + headTitle[0]?.length
        );

        const name =
          e?.first_name?.charAt(0).toUpperCase() ||
          e?.last_name?.charAt(0).toUpperCase();
        const names = headTitle === undefined ? '' : headTitle[0];
        return (
          <ContactWrapper
            key={i}
            selected={selecteContact?.id === e?.id ? true : ''}
            onClick={() => onChange(e, i)}
          >
            <Row>
              <Col span={18}>
                <Flex>
                  <div style={{ margin: '5px 5px 0px 10px' }}>
                    <Avatar
                      size={'large'}
                      style={{
                        backgroundColor: getRandomColor(name),
                        border: '2px solid white',
                      }}
                    >
                      {name ? (
                        <p style={{ textAlign: 'center', fontSize: '16px' }}>
                          {' '}
                          {name}
                        </p>
                      ) : (
                        <UserOutlined style={{ fontSize: '20px' }} />
                      )}
                    </Avatar>
                  </div>
                  <div>
                    <NameText
                      selected={selecteContact?.id === e?.id ? true : ''}
                    >
                      {!e?.first_name && !e?.last_name && e?.to}
                      {e.first_name} {e.last_name}
                    </NameText>
                    <div style={{ height: 'auto' }}>
                      <Span selected={selecteContact?.to === e?.to ? true : ''}>
                        {e?.replied?.messages?.messages?.length > 0 ? (
                          e?.replied?.messages?.messages
                        ) : (
                          <>
                            <strong>{names}</strong>
                            {capitalizedString}
                          </>
                        )}
                      </Span>
                    </div>
                  </div>
                </Flex>
              </Col>
              <Col span={6}>
                <Flex end>
                  <TimeText selected={selecteContact?.id === e?.id ? true : ''}>
                    {moment(e?.updated_at).fromNow() === 'a day ago'
                      ? '1 day ago'
                      : moment(e?.updated_at).fromNow()}
                  </TimeText>
                </Flex>
              </Col>
            </Row>
          </ContactWrapper>
        );
      })}
    </Box>
  );
};
export default ContactList;
