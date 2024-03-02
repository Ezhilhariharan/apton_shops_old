import { connect } from "react-redux"
import authSelector from "../selectors"
import {updateOnboardingSteps,upDateAuthToken,getCurrentUserInfo} from "../actions"
import UserSSOAuth from "../components/UserSSOAuth"


const mapStateToProps = state =>({
    onboardingStep: authSelector.getOnboardingStep(state),
})

const mapDispatchToProps = {
    updateOnboardingSteps,
    upDateAuthToken,
    getCurrentUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSSOAuth)