import React from 'react'
import Flex from '@components/common/Flex';
import {
  Customize,
} from './Pages.style';
import { Row,Tooltip } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateSocialIcon,updateCustomization,socialMediaPopupToggle,socialMediaPopupName,captureCustomization} from '../../../../../extendedAction';

function Customization() {
    const dispatch = useDispatch();
    const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount,
    ); 
      const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus,
  ); 
   const fileUploadLoader = useSelector(
    state => state?.socialMedialIntegration?.fileUploadLoader,
    shallowEqual
   );
     const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload,
  ); 
    
const customizeFunc = () => {
  if (customize) {
      dispatch(socialMediaPopupToggle(true))
      dispatch(socialMediaPopupName('Revert'))
  } else {
      dispatch(updateSocialIcon(selectedAccounts[0]))
      dispatch(updateCustomization(true))
    let staticData = JSON.parse(JSON.stringify(dynamicPayload[0]));
    // setBeforeCustomize(staticData);captureCustomization
      dispatch(captureCustomization(staticData))
  }
}
  return (
  <Flex end className="w-100">
              <Row>
                <Tooltip
                  placement="top"
                  title={
                    selectedAccounts?.length < 2 ? 'Select two accounts' : ''
                  }
                >
                  <Customize
                    onClick={() => customizeFunc()}
                    customizeProp={customize}
                    disabled={
                      selectedAccounts?.length >= 2 || fileUploadLoader
                        ? false
                        : true
                    }
                  >
                    Customize
                  </Customize>
                </Tooltip>
                
              </Row>
            </Flex>
  )
}

export default Customization