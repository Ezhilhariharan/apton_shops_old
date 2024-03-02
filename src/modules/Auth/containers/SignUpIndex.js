import { connect } from "react-redux"
import SignUpPage from "../components/SignUpPage"
import authSelector from "../selectors"
import {updateOnboardingSteps,signUpAttempt,getCurrentUserInfo} from "../actions"

const mapStateToProps = state =>({
    onboardingStep: authSelector.getOnboardingStep(state),
})

const mapDispatchToProps = {
    updateOnboardingSteps,
    signUpAttempt,
    getCurrentUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpPage)
