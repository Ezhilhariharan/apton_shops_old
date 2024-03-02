export const UPGRADE_MODAL = 'UPGRADE_MODAL';


export const upgradeModal = value => ({
  type: UPGRADE_MODAL,
  value,
});


export const upgradePopup = value => async dispatch => {
  if (value) {
    dispatch(upgradeModal(value));
  }
};


