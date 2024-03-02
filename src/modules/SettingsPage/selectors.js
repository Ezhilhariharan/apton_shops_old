
const getSelectedText = state => state.settingSelector.selectedText;
const getBrandLogoUrl = state => state.settingSelector.imageUrl
const getCountry = state => state.settingSelector.country
const getProvince = state => state.settingSelector.province
const getCity = state => state.settingSelector.city
const getAccountCountry = state => state.settingSelector.accountCountry
const getAccountProvince = state => state.settingSelector.accountProvince
const getAccountCity = state => state.settingSelector.accountCity
const getSelectedUser = state => state.settingSelector.selectedUser
const getUpdateBillingInfo=state=>state.settingSelector.billingInfo
const getPlans=state=>state.settingSelector.plansList
const getPlansInfo=state=>state.settingSelector.planInfo
const getPayment=state=>state.settingSelector.payNow
const getPaymentMessage=state=>state.settingSelector.paymentInformation
const getBillingHistory=state=>state.settingSelector.historyDetails
const selectors = {
    getSelectedText,
    getBrandLogoUrl,
    getCountry,
    getProvince,
    getCity,
    getAccountCountry,
    getAccountProvince,
    getAccountCity,
    getSelectedUser,
    getUpdateBillingInfo,
    getPlans,
    getPlansInfo,
    getPayment,
    getPaymentMessage,
    getBillingHistory
}

export default selectors;
