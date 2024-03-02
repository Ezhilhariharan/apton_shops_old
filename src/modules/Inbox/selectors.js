const getInboxListNumbers=state=>state.inboxSelector.inboxList
const getToggleButton=state=>state.inboxSelector.conversationStatus
const selectors = {
    getInboxListNumbers,
    getToggleButton
}

export default selectors