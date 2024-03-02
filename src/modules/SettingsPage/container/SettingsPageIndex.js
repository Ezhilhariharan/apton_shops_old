import SettingsPage from "../components";
import { 
    saveText, 
    brandUpdate, 
    accountUpdate, 
    uploadBrandLogo,
    getCountries,
    getProvince,
    getCity,
    saveSelectedCurrentUser,
    removeBrandLogo,
    updateBillingDetails,
    viewPlansDetails ,
    viewDetails
} from "../actions";
import { connect } from "react-redux";
import settingSelector from "../selectors";
import authSelector from "../../../modules/Auth/selectors";
import { getBrandInfoAPI } from "../../Auth/actions";
import parentSelector from "../../../selectors";

const mapStateToProps = state => ({
    selectedText: settingSelector.getSelectedText(state),
    currentUser: authSelector.getCurentUser(state),
    imageUrl: settingSelector.getBrandLogoUrl(state),
    country: settingSelector.getCountry(state),
    province: settingSelector.getProvince(state),
    city: settingSelector.getCity(state),
    brandInfo: authSelector.getBrandProfile(state),
    accountCountry: settingSelector.getAccountCountry(state),
    accountProvince: settingSelector.getAccountProvince(state),
    accountCity: settingSelector.getAccountCity(state),
    switchedBrand: parentSelector.getSwitchedBrands(state),
    selectedUser: settingSelector.getSelectedUser(state),
    billingInfo:settingSelector.getUpdateBillingInfo(state),
    plansList:settingSelector.getPlans(state) ,
    planInfo:settingSelector.getPlansInfo(state),
})

const mapDispatchToProps = {
    saveText,
    brandUpdate,
    accountUpdate,
    uploadBrandLogo,
    getCountries,
    getProvince,
    getCity,
    getBrandInfoAPI,
    saveSelectedCurrentUser,
    removeBrandLogo,
    updateBillingDetails,
    viewPlansDetails,
    viewDetails

}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
