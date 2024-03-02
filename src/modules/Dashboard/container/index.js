import { connect } from "react-redux";
import Dashboard from "../componets";
import selectors from "../selectors";
import authSelector from '../../Auth/selectors';
import {getCurrentUserInfo} from '../../Auth/actions';
import { campaignsList,recentPosts,recentCampaigns,postLists,transactionsLimit,graphDetails,recentSurveysList} from "../actions";
const mapStateToProps = state =>({
    dashboardCampaignDetails:selectors.getDashboardCampaigns(state),
    currentUser:authSelector.getCurentUser(state),
    dashboardPostsList:selectors.getRecentPosts(state),
    dashboardCampaignsList:selectors.getRecentCampaigns(state),
    postListStatus:selectors.getPostListStatus(state),
    transactions:selectors.getTransactionsList(state),
    surveysList:selectors.getSurveysList(state),
    dashboardGrapDetails:selectors.getGraphDetails(state)
})

const mapDispatchToProps = {
    campaignsList,
    getCurrentUserInfo,
    recentPosts,
    recentCampaigns,
    postLists,
    transactionsLimit,
    recentSurveysList,
    graphDetails

}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
