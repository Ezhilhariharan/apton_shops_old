import { UPDATE_BRAND_SWITCHING, UPDATE_BRAND_COVER_PHOTO, UPGRADE_MODAL } from "./actions";

const initialState = {
    switchedBrand: "",
    coverPhoto: "",
    upgradePopup:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BRAND_SWITCHING:
            return { ...state, switchedBrand: action.switchedBrand }
        case UPDATE_BRAND_COVER_PHOTO:
            return { ...state, coverPhoto: action.coverPhoto }
        case UPGRADE_MODAL:
            return { ...state, upgradePopup: action.value }
        default:
            return state;
    }
}