import React, { useEffect, useRef, useState } from 'react';
import {
  ContactWrapper,
  NameText,
  TimeText,
  Box,
  Span,
} from '../../../Campagins/whatsAppChat/components/partials/ChatCSS';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Space, Row } from 'antd';
import Flex from '@components/common/Flex';
import moment from 'moment';
import { useSelector, shallowEqual } from 'react-redux';
import { updateSelectedRow } from '../../../Campagins/campaginDetails/actions';

export const colors = [
  '#363945',
  '#939597',
  '#EFE1CE',
  '#9A8B4F',
  '#E0B589',
  '#9BB7D4',
  '#9d5f3f',
  '#64b9dd',
  '#e8cdc0',
  '#7e7e7e',
  '#83aabf',
];

export const getRandomColor = letter => {
  const index = letter?.charCodeAt(0) % colors?.length;
  return colors[index];
};
const SideChat = ({
  currentUser,
  inboxListNumbers,
  inboxList,
  selecteContact,
  setSelectedContact,
  searchValue,
}) => {
  const [selected, setSelected] = useState(false);
  const scrollingRef = useRef();
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const accountId = currentUser?.account?.id;
  // const [limit, setLimit] = useState(30);
  const onChange = (e, i) => {
    setSelected(i);
    setSelectedContact(e);
  };
  const handleScroll = () => {
    if (scrollingRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollingRef?.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // let increasedLimit = limit + 30;
        // setLimit(increasedLimit);
        inboxListNumbers(accountId, brand?.id, searchValue);
      }
    }
  };

  const capitalizeFirstLetter = (str, maxLength) => {
    if (str !== ' ' && str?.length > maxLength) {
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
  const displayString = str => {
    if (str?.length > 20) {
      return str?.slice(0, 20) + '...';
    } else {
      return str;
    }
  };
  const sortedList = inboxList?.list?.sort((a, b) => {
    const timeA = a?.updated_at;
    const timeB = b?.updated_at;
    if (timeA < timeB) {
      return 1;
    }
    if (timeA > timeB) {
      return -1;
    }
    return 0;
  });

  const MAX_CHARACTERS = 20;

  function addEllipsis(text, maxLength) {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <Box onScroll={handleScroll} ref={scrollingRef}>
      {inboxList?.list?.map((e, i) => {
        const date = e?.response !== null && e?.updated_at?.substring(0, 10);
        const time = e?.response !== null && e?.updated_at?.substring(11, 19);
        const total = date + ' ' + time;
        const momentDate = moment(total);
        // const text = e?.messages?.split(':').pop().split('}');

        // const text = e?.messages?.split(':');
        // const text1 =
        //   text?.length > 0 && text[4]?.split(',')?.shift()?.slice(2, -2);
        const messageObj = JSON.parse(e?.messages);

        const messageTexts = [
          messageObj?.text?.body,
          messageObj?.length > 0 && messageObj[0]?.text,
          messageObj?.length > 0 && messageObj[1]?.text,
          messageObj?.button?.text,
        ];

        const name =
          e?.first_name?.charAt(0).toUpperCase() ||
          e?.last_name?.charAt(0).toUpperCase();
        // const names = headTitle === undefined ? '' : headTitle[0];

        return (
          <ContactWrapper
            key={i}
            selected={selecteContact?.to === e?.to ? true : ''}
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
                      selected={selecteContact?.to === e?.to ? true : ''}
                    >
                      {!e?.first_name && !e?.last_name && e?.to}
                      {e.first_name} {e.last_name}
                    </NameText>

                    {/* <Span
                      selected={selecteContact?.to === e?.to ? true : ''}
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {/* {text1?.length > 0 &&
                        text[0]?.toString().replace(/\\n/g, ' ')} */}
                    {/* {text1?.length > 0 &&
                        text1?.toString().replace(/\\n/g, ' ')}
                    </Span> */}
                    <div
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {messageTexts.map((text, index) => (
                        <div key={index}>
                          {addEllipsis(text, MAX_CHARACTERS)}
                        </div>
                      ))}
                    </div>
                  </div>
                </Flex>
              </Col>
              <Col span={6}>
                <Flex end>
                  <TimeText selected={selecteContact?.to === e?.to ? true : ''}>
                    {momentDate.from(moment()).indexOf('an') !== -1
                      ? momentDate.from(moment())?.replace('an', '1')
                      : momentDate.from(moment()) === 'a day ago'
                      ? '1 day ago'
                      : momentDate.from(moment())}
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

export default SideChat;
