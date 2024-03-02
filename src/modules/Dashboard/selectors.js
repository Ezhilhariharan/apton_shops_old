const getDashboardCampaigns= state => state.dashboardIntegration.dashboardCampaignDetails
const getRecentPosts=state =>state.dashboardIntegration.dashboardPostsList
const getRecentCampaigns=state=>state.dashboardIntegration.dashboardCampaignsList
const getPostListStatus=state =>state.dashboardIntegration.postListStatus
const getTransactionsList=state =>state.dashboardIntegration.transactions
const getSurveysList=state =>state.dashboardIntegration.surveysList
const getGraphDetails=state =>state.dashboardIntegration.dashboardGrapDetails
const selectors ={
    getDashboardCampaigns,
    getRecentPosts,
    getRecentCampaigns,
    getPostListStatus,
    getTransactionsList,
    getSurveysList,
    getGraphDetails
}

export default selectors