import { connect } from "react-redux"
import WhatsAppChat from "../components"
import selectors from "../selectors"
import {getwhatsapptemplist} from '../../whatsapp/subcomponet/actions'
import {fetchConversationList,fetchChatHistory,sendwpMessage,fetchWpStatus} from '../actions'
import whatsAppSelector from '../../whatsapp/selectors'
import campSelector from '../../whatsapp/subcomponet/selectors'

const mapStateToProps = (state) =>({
    conversationList : selectors.getConversationList(state),
    selectedWhatsAppCampagin: whatsAppSelector.getSelectedCampagin(state),
    chatHistory : selectors.getChatHistory(state),
    overviewStatus:selectors.getOverviewStatus(state),
    whatsapptempList: campSelector.getWhatsAppTemplate(state),
})

const mapDispatchToProps = {
 fetchConversationList,
 fetchChatHistory,
 sendwpMessage,
 fetchWpStatus,
 getwhatsapptemplist,
}

export default connect(mapStateToProps,mapDispatchToProps)(WhatsAppChat)