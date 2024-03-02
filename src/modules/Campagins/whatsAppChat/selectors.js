const getConversationList = state => state.whatsAppChatSelector.conversationList
const getChatHistory = state => state.whatsAppChatSelector.chatHistory
const getOverviewStatus = state => state.whatsAppChatSelector.overviewStatus
const getBacktoprevious=state=>state.whatsAppChatSelector.backtoprevious

const selectors = {
    getConversationList,
    getChatHistory,
    getOverviewStatus,
    getBacktoprevious
}

export default selectors