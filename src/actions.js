
export const UPDATE_BRAND_SWITCHING = 'UPDATE_BRAND_SWITCHING';
export const UPDATE_BRAND_COVER_PHOTO = 'UPDATE_BRAND_COVER_PHOTO';
export const UPGRADE_MODAL = 'UPGRADE_MODAL';
import request from "@utils/request";

export const updateBrandSwitching = switchedBrand => ({
    type: UPDATE_BRAND_SWITCHING,
    switchedBrand,
})

export const updateBrandCoverPhoto = coverPhoto => ({
    type: UPDATE_BRAND_COVER_PHOTO,
    coverPhoto,
})
export const upgradeModal = value => ({
    type: UPGRADE_MODAL,
    value,
})

export const saveSwitchedBrand = value => async dispatch => {
    if (value) {
        dispatch(updateBrandSwitching(value));
    }
}
export const upgradePopup = value => async dispatch => {
       if (value) {
        dispatch(upgradeModal(value));
    }
}

export const uploadCoverPhoto = (fileName, filePath) => async dispatch => {
    try {
        const response = await request.post(`/api/file_upload`, {
            file_name: fileName && fileName,
            file_path: filePath && filePath,
        })
        if (response.status === 200) {
            dispatch(updateBrandCoverPhoto(response.data))
        }
    } catch (error) {
        console.log('brand logo', error)
    }
}