import { UPGRADE_MODAL } from "./actions";

const initialState = {
    upgradePopup: false,
    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPGRADE_MODAL:
            return { ...state, upgradePopup: action.value }
        default:
            return state;
    }
}