import { connect } from "react-redux";
import SurveyCampagin from "../components";
import surveyCampaginSelector from "../selectors";
import {fetchWhatsAppSurveyList,updateSelectedSurvey,updateBotStatus,fetchBotOverViews} from '../actions'


const mapStateToProps = state => ({
    whatsAppSurveyList: surveyCampaginSelector.getWhatsAppSurvyCampaginList(state),
    selectedSurvey: surveyCampaginSelector.getSelectedSurveyCampagin(state),
    botsOverview: surveyCampaginSelector.getBotsOverview(state)
})

const mapDispatchToProps = {
    fetchWhatsAppSurveyList,
    updateSelectedSurvey,
    updateBotStatus,
    fetchBotOverViews
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCampagin);