import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExitIcon from '@components/icons/ExitIcon';
import { SocialIcon } from './Pages.style';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  updateSocialIcon,
  updateCreateSelectedAccounts,
  updateDropdownList,
  updateSelectedPinterestBoard,
} from '../../../../../extendedAction';

import Facebook from '@assets/images/FBFlag.png';
import Instagram from '@assets/images/Instagram.png';
import Twitter from '@assets/images/twitter.png';
import FacebookGrp from '@assets/images/FBGroup.png';
import Linkedin from '@assets/images/LinkdinPage.svg';
import Pinterest from '@assets/images/PinterestLogo.png';
import { Row } from 'antd';

const Wrapper = styled('div')`
  display: flex;
`;

const SocialMediaAccounts = ({ item }) => {
  const [closeButton, setCloseButton] = useState('');

  const dispatch = useDispatch();
  const setActiveSocialIcon = icon => {
    customize && dispatch(updateSocialIcon(icon));
  };

  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const fileUploadLoader = useSelector(
    state => state?.socialMedialIntegration?.fileUploadLoader,
    shallowEqual
  );
  const items = useSelector(state => state?.socialMedialExtended?.dropdownList);
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );

  const setExitAccount = item => {
    let arrayVal = [];
    const filteredAccounts = selectedAccounts?.filter(data => data != item);
    items.forEach(val => {
      if (val?.title === item) {
        arrayVal.push({ ...val, checked: false });
      } else arrayVal.push({ ...val });
    });
    dispatch(updateCreateSelectedAccounts(filteredAccounts));
    dispatch(updateDropdownList(arrayVal));
    const previousData = selectedAccounts[selectedAccounts.indexOf(item) - 1];
    customize && dispatch(updateSocialIcon(previousData));
  };
  return (
    <Wrapper>
      {item === 'Facebook' && (
        <div
          className={
            activeSocialIcon === 'Facebook' && customize
              ? 'SocialIconActiveBorder'
              : ''
          }
        >
          <span
            className={
              activeSocialIcon === 'Facebook' && customize
                ? 'SocialIconBorder'
                : ''
            }
          >
            <SocialIcon>
              <img
                src={Facebook}
                alt="Lightence"
                width={34}
                height={34}
                onMouseEnter={() => setCloseButton('Facebook')}
                onMouseLeave={() => setCloseButton('')}
                onClick={() =>
                  !fileUploadLoader && setActiveSocialIcon('Facebook')
                }
              />
              {closeButton === 'Facebook' && (
                <span
                  className="span"
                  onClick={() => {
                    setExitAccount('Facebook');
                  }}
                  onMouseEnter={() => setCloseButton('Facebook')}
                  onMouseLeave={() => setCloseButton('')}
                >
                  <ExitIcon />
                </span>
              )}
            </SocialIcon>
          </span>
        </div>
      )}
      {item === 'Instagram' && (
        <div
          className={
            activeSocialIcon === 'Instagram' && customize
              ? 'SocialIconActiveBorder'
              : ''
          }
        >
          <span
            className={
              activeSocialIcon === 'Instagram' && customize
                ? 'SocialIconBorder'
                : ''
            }
          >
            <SocialIcon>
              <img
                src={Instagram}
                alt="Lightence"
                width={30}
                height={30}
                onMouseEnter={() => setCloseButton('Instagram')}
                onMouseLeave={() => setCloseButton('')}
                onClick={() =>
                  !fileUploadLoader && setActiveSocialIcon('Instagram')
                }
              />
              {closeButton === 'Instagram' && (
                <span
                  className="span"
                  onClick={() => {
                    setExitAccount('Instagram');
                  }}
                  onMouseEnter={() => setCloseButton('Instagram')}
                  onMouseLeave={() => setCloseButton('')}
                >
                  <ExitIcon />
                </span>
              )}
            </SocialIcon>
          </span>
        </div>
      )}
      {item === 'Facebook Groups' && (
        <div
          className={
            activeSocialIcon === 'Facebook Groups' && customize
              ? 'SocialIconActiveBorder'
              : ''
          }
        >
          <span
            className={
              activeSocialIcon === 'Facebook Groups' && customize
                ? 'SocialIconBorder'
                : ''
            }
          >
            <SocialIcon>
              <img
                src={FacebookGrp}
                alt="Lightence"
                width={34}
                height={34}
                onMouseEnter={() => setCloseButton('Facebook Groups')}
                onMouseLeave={() => setCloseButton('')}
                onClick={() =>
                  !fileUploadLoader && setActiveSocialIcon('Facebook Groups')
                }
              />
              {closeButton === 'Facebook Groups' && (
                <span
                  className="span"
                  onClick={() => {
                    setExitAccount('Facebook Groups');
                  }}
                  onMouseEnter={() => setCloseButton('Facebook Groups')}
                  onMouseLeave={() => setCloseButton('')}
                >
                  <ExitIcon />
                </span>
              )}
            </SocialIcon>
          </span>
        </div>
      )}
      {item === 'Linkedin Pages' && (
        <div
          className={
            activeSocialIcon === 'Linkedin Pages' && customize
              ? 'SocialIconActiveBorder'
              : ''
          }
        >
          <span
            className={
              activeSocialIcon === 'Linkedin Pages' && customize
                ? 'SocialIconBorder'
                : ''
            }
          >
            <SocialIcon>
              <img
                src={Linkedin}
                alt="Lightence"
                width={30}
                height={30}
                onMouseEnter={() => setCloseButton('Linkedin Pages')}
                onMouseLeave={() => setCloseButton('')}
                onClick={() =>
                  !fileUploadLoader && setActiveSocialIcon('Linkedin Pages')
                }
              />
              {closeButton === 'Linkedin Pages' && (
                <span
                  className="span"
                  onClick={() => {
                    setExitAccount('Linkedin Pages');
                  }}
                  onMouseEnter={() => setCloseButton('Linkedin Pages')}
                  onMouseLeave={() => setCloseButton('')}
                >
                  <ExitIcon />
                </span>
              )}
            </SocialIcon>
          </span>
        </div>
      )}
      {item === 'Twitter' && (
        <div
          className={
            activeSocialIcon === 'Twitter' && customize
              ? 'SocialIconActiveBorder'
              : ''
          }
        >
          <span
            className={
              activeSocialIcon === 'Twitter' && customize
                ? 'SocialIconBorder'
                : ''
            }
          >
            <SocialIcon>
              <img
                src={Twitter}
                alt="Lightence"
                width={30}
                height={30}
                onMouseEnter={() => setCloseButton('Twitter')}
                onMouseLeave={() => setCloseButton('')}
                onClick={() =>
                  !fileUploadLoader && setActiveSocialIcon('Twitter')
                }
              />
              {closeButton === 'Twitter' && (
                <span
                  className="span"
                  onClick={() => {
                    setExitAccount('Twitter');
                  }}
                  onMouseEnter={() => setCloseButton('Twitter')}
                  onMouseLeave={() => setCloseButton('')}
                >
                  <ExitIcon />
                </span>
              )}
            </SocialIcon>
          </span>
        </div>
      )}
      {item === 'Pinterest' && (
        <div
          className={
            activeSocialIcon === 'Pinterest' && customize
              ? 'SocialIconActiveBorder'
              : ''
          }
        >
          <span
            className={
              activeSocialIcon === 'Pinterest' && customize
                ? 'SocialIconBorder'
                : ''
            }
          >
            <SocialIcon>
              <img
                src={Pinterest}
                alt="Lightence"
                width={30}
                height={30}
                onMouseEnter={() => setCloseButton('Pinterest')}
                onMouseLeave={() => setCloseButton('')}
                onClick={() =>
                  !fileUploadLoader && setActiveSocialIcon('Pinterest')
                }
              />
              {closeButton === 'Pinterest' && (
                <span
                  className="span"
                  onClick={() => {
                    setExitAccount('Pinterest');
                    dispatch(updateSelectedPinterestBoard([]));
                  }}
                  onMouseEnter={() => setCloseButton('Pinterest')}
                  onMouseLeave={() => setCloseButton('')}
                >
                  <ExitIcon />
                </span>
              )}
            </SocialIcon>
          </span>
        </div>
      )}
    </Wrapper>
  );
};

export default SocialMediaAccounts;
