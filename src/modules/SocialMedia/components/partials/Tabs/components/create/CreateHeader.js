import React, { useState, useEffect ,useCallback} from 'react';
import Flex from '@components/common/Flex';
import {
  SocialAccountsFlex,
} from './Pages.style';
import { Row } from 'antd';
//components
import SocialMediaAccounts from './SocialMediaAccounts';
import CreatePostDropdown from './CreatePostDropdown';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

function CreateHeader() {
 
 const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount,
  ); 
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus,
  ); 
  return (
   <Flex>
        <CreatePostDropdown  />
        <SocialAccountsFlex
          borderActive={customize && selectedAccounts?.length >= 2}
        >
          <Row>
            {selectedAccounts?.map(item => (
              <SocialMediaAccounts
                item={item}
              />
            ))}
          </Row>
        </SocialAccountsFlex>
      </Flex>
  )
}

export default CreateHeader