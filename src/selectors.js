const getSwitchedBrands = state => state.parentReducer.switchedBrand
const getCoverPhoto = state => state.parentReducer.coverPhoto
const getUpgradeValue = state => state.parentReducer.upgradePopup

const selectors = {
    getSwitchedBrands,
    getCoverPhoto,
    getUpgradeValue
}

export default selectors;