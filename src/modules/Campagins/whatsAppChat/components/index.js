import React, { Fragment, useEffect,useState } from 'react'
import { EmptyHeader } from '@components/common/EmptyHeader'
import ChatBox from './partials/ChatBox'
import styled from 'styled-components'
import { Typography } from 'antd'
import { useSelector } from 'react-redux'
 
const Text=styled(Typography)`
font-family: 'Lato';
font-style: normal;
font-weight: 500; 
font-size: 16px;
color: #4D4D4D;
margin:20px 0px 10px 25px`
const WhatsAppChat = ({
  fetchConversationList,
  conversationList,
  whatsapptempList,
  selectedWhatsAppCampagin,
  chatHistory,
  fetchChatHistory,
  sendwpMessage,
  getwhatsapptemplist
}) => {
  const[tempSearch,setTempSearch]=useState("")
  const [limit, setLimit] = useState(10);
  const[pageNumber,setPageNumber]=useState(1)
  const userInfo = useSelector(state => state.authSelector.currentUser);
  const accountId = userInfo?.account?.id;
  const brand = useSelector(state => state?.parentReducer?.switchedBrand);
  useEffect(() => {
    fetchConversationList(selectedWhatsAppCampagin?.id,'')
    getwhatsapptemplist(tempSearch);
  }, [])
  return (
    <Fragment>
      <EmptyHeader/>
      <ChatBox
        conversationList={conversationList}
        chatHistory={chatHistory}
        fetchChatHistory={fetchChatHistory}
        sendwpMessage={sendwpMessage}
        fetchConversationList={fetchConversationList}
        campId={selectedWhatsAppCampagin?.id}
        whatsapptempList={whatsapptempList}
        getwhatsapptemplist={ getwhatsapptemplist}
        limit={limit}
        setLimit={setLimit}
        tempSearch={tempSearch}
        setTempSearch={setTempSearch}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </Fragment>
  )
}

export default WhatsAppChat
