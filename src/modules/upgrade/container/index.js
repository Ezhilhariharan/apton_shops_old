import { connect } from 'react-redux'
import upgradeSelector from '../selectors'
import {upgradePopup} from '../actions'
import Upgrade from "../components/Upgrade"


const mapStateToProps = state => ({
  upgradePopupModal: upgradeSelector.getUpgradeValue(state),

})

const mapDispatchToProps = {
    upgradePopup,
   
}

export default connect(mapStateToProps, mapDispatchToProps)(Upgrade)
