import { connect } from "react-redux"
import authSelector from "../selectors"
import {updateOnboardingSteps,signInAttempt,getCurrentUserInfo} from "../actions"
import LoginPage from "../components/LoginPage"

const mapStateToProps = state =>({
    onboardingStep: authSelector.getOnboardingStep(state),
})

const mapDispatchToProps = {
    updateOnboardingSteps,
    signInAttempt,
    getCurrentUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)
