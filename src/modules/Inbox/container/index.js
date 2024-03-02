import { connect } from "react-redux"
import index from "../components"
import campSelector from '../../Campagins/whatsapp/subcomponet/selectors'
import {getwhatsapptemplist} from '../../Campagins/whatsapp/subcomponet/actions'
import { inboxListNumbers ,toggleConvesatation} from "../actions"
import authSelector from '../../Auth/selectors';
import selectors from "../selectors"
import whatsAppChatSelector from '../../Campagins/whatsAppChat/selectors'
import {fetchChatHistory,sendwpMessage,fetchWpStatus} from '../../Campagins/whatsAppChat/actions'
const mapStateToProps = (state) =>({
    inboxList:selectors.getInboxListNumbers(state),
    currentUser:authSelector.getCurentUser(state),
    whatsapptempList: campSelector.getWhatsAppTemplate(state),
    chatHistory : whatsAppChatSelector.getChatHistory(state),
    conversationStatus:selectors.getToggleButton(state)
})

const mapDispatchToProps = {
 inboxListNumbers,
 getwhatsapptemplist,
 fetchChatHistory,sendwpMessage,fetchWpStatus,
 toggleConvesatation
}

export default connect(mapStateToProps,mapDispatchToProps)(index)