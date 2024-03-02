import { connect } from "react-redux"
import APP from "./App"
import authSelectors from './modules/Auth/selectors'
import { 
    updateOnboardingSteps, 
    updateStepOneValues, 
    onboardingInitiate, 
    updatedStepTwoValues,
    fetchBrandCategoryList,
    fetchCountryList,
    pricingValidation,
    upDateAuthToken,
} from "./modules/Auth/actions"
import { saveSwitchedBrand, uploadCoverPhoto } from "./actions"
import parentSelector from "./selectors";
import { getBrandInfoAPI } from "./modules/Auth/actions";

const mapStateToProps = (state) => ({
    authToken: authSelectors.getAuthToken(state),
    currentUserInfo: authSelectors.getCurentUser(state),
    onboardingStep: authSelectors.getOnboardingStep(state),
    brandCategoryList: authSelectors.getBrandCategoryList(state),
    countryList: authSelectors.getCountryList(state),
    onboardingStepOneValues: authSelectors.getOnboardingStepOneValues(state),
    switchedBrand: parentSelector.getSwitchedBrands(state),
    selectedBrandUser: authSelectors.getBrandProfile(state),
    brandLogoUrl: parentSelector.getCoverPhoto(state),
})
const mapDispatchToProps = {
    updateOnboardingSteps,
    updateStepOneValues,
    onboardingInitiate,
    updatedStepTwoValues,
    fetchBrandCategoryList,
    fetchCountryList,
    saveSwitchedBrand,
    getBrandInfoAPI,
    uploadCoverPhoto,
    pricingValidation,
    upDateAuthToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(APP)
