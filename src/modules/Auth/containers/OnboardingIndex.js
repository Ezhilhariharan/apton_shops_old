import { connect } from 'react-redux'
import OnboardingProcess from '../components/Onboarding'
import authSelector from '../selectors'
import {
  updateOnboardingSteps,
  onboardingInitiate,
  updateStepOneValues,
  updatedStepTwoValues,
  fetchBrandCategoryList,
  fetchCountryList
} from '../actions'
import settingSelector from "../../SettingsPage/selectors";
import parentSelector from "../../../selectors";
import {uploadCoverPhoto} from "../../../actions";
const mapStateToProps = state => ({
  onboardingStep: authSelector.getOnboardingStep(state),
  onboardingStepOneValues: authSelector.getOnboardingStepOneValues(state),
  onboardingStepTwoValues: authSelector.getOnboardingStepTwoValues(state),
  brandCategoryList: authSelector.getBrandCategoryList(state),
  countryList: authSelector.getCountryList(state),
  brandLogoUrl: parentSelector.getCoverPhoto(state),
  brandLogoFromOnboarding: parentSelector.getCoverPhoto(state),
})

const mapDispatchToProps = {
  updateOnboardingSteps,
  onboardingInitiate,
  updateStepOneValues,
  updatedStepTwoValues,
  fetchBrandCategoryList,
  fetchCountryList,
  uploadCoverPhoto,
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingProcess)
