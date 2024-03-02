import React, { Fragment, useEffect, useState } from 'react';
import { EmptyHeader } from '@components/common/EmptyHeader';
import { useSelector, shallowEqual } from 'react-redux';
import ChatBox from './Partials/ChatBox';
import EmptyInbox from '@components/icons/EmptyInbox';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { Typography } from 'antd';

const Header = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #4D4D4D;
  display:block;
  text-align:center;
}`;
const Content = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #4D4D4D;
  display:block;
  text-align:center;
}`;
const Text = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin: 20px;
`;

const index = ({
  inboxListNumbers,
  getwhatsapptemplist,
  currentUser,
  inboxList,
  whatsapptempList,
  fetchChatHistory,
  sendwpMessage,
  fetchWpStatus,
  chatHistory,
  conversationStatus,
  toggleConvesatation,
}) => {
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const [value, setValue] = useState('');
  const [limit, setLimit] = useState(10);
  const [tempSearch, setTempSearch] = useState('');
  const accountId = currentUser?.account?.id;
  useEffect(() => {
    if (accountId && brand) {
      inboxListNumbers(accountId, brand?.id);
      getwhatsapptemplist(tempSearch, limit);
    }
  }, [accountId, brand]);
  return (
    <Fragment>
      <EmptyHeader>
        {inboxList?.list?.length > 0 ? (
          <Text>You have {inboxList?.list?.length} open conversations.</Text>
        ) : (
          ''
        )}
      </EmptyHeader>
      {(value?.length === 0 && inboxList?.list?.length == 0) ||
      inboxList?.list?.length === undefined ? (
        <div style={{ paddingTop: '140px' }}>
          <Flex center>
            {' '}
            <EmptyInbox />
          </Flex>
          <Header>Your inbox is empty</Header>
          <Content>
            Begin your conversation by broadcasting messages to your customers.
          </Content>
        </div>
      ) : (
        <div>
          <ChatBox
            inboxList={inboxList}
            whatsapptempList={whatsapptempList}
            currentUser={currentUser}
            inboxListNumbers={inboxListNumbers}
            getwhatsapptemplist={getwhatsapptemplist}
            fetchChatHistory={fetchChatHistory}
            sendwpMessage={sendwpMessage}
            fetchWpStatus={fetchWpStatus}
            chatHistory={chatHistory}
            limit={limit}
            setLimit={setLimit}
            tempSearch={tempSearch}
            setTempSearch={setTempSearch}
            value={value}
            setValue={setValue}
            conversationStatus={conversationStatus}
            toggleConvesatation={toggleConvesatation}
          />
        </div>
      )}
    </Fragment>
  );
};

export default index;
