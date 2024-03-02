import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row } from 'antd';
import ProfileDropdown from './components/profileDropDown/profileDropDown';
import styled from 'styled-components';
import Layout from 'antd/lib/layout/layout';
import {
  SearchOutlined,
  DownOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import request from '@utils/request';
import {
  StyledTrialButton,
  StyledHeaderCard,
  VerticalLine,
  StyledHeaderText,
  BrandsDropDown,
  StyledSpan,
  EndButtonWrapper,
  Headerdiv,
} from './Header.styles';
import Upgrade from '../../modules/upgrade/components/Upgrade';
import { TrialClockIcon } from '../icons/TrialClockIcon';
import { DownArrow } from '../icons/DownArrow';
import { useResponsive } from '../../hooks/useResponsive';
import { Divider, Space } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { backPage } from '../../modules/Campagins/whatsAppChat/actions';
import { SelectComponent } from './components/partials/Select';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../icons/ArrowRight';
import Flex from '@components/common/Flex';
const Header = ({
  headerText,
  accountInfo,
  onboardingStep,
  updateOnboardingSteps,
  updateStepOneValues,
  onboardingInitiate,
  brandCategoryList,
  countryList,
  updatedStepTwoValues,
  onboardingStepOneValues,
  fetchBrandCategoryList,
  fetchCountryList,
  saveSwitchedBrand,
  switchedBrand,
  getBrandInfoAPI,
  brandLogoUrl,
  uploadCoverPhoto,
  pricingValidation,
}) => {
  const items = accountInfo?.brands?.map(i => ({ label: i?.name, key: i?.id }));
  const { mobileOnly } = useResponsive();
  const w = window;
  const name = w?.location?.pathname.replace('/', '').replace('-', ' ');
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const pathname =
    name === 'whatsapp marketing'
      ? 'WhatsApp Marketing'
      : name?.toLowerCase()?.replace(/(^.|\s+.)/g, m => m?.toUpperCase());
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const showPlan = () =>
    priceValidation?.current_plan != 'Enterprise Plan' && setOpenUpgrade(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBackPage = () => {
    dispatch(backPage('back'));
    navigate('/campagin-details');
    if (pathname === 'Create Bot') {
      navigate('/survey-bots');
    }
  };

  return (
    <div>
      {!mobileOnly ? (
        <StyledHeaderCard className="headerCard">
          <StyledHeaderText
            style={{
              marginLeft:
                pathname === 'Chat' || (pathname === 'Create Bot' && '0px'),
            }}
          >
            {pathname === 'Chat' || pathname === 'Create Bot' ? (
              <Flex>
                <Button
                  onClick={handleBackPage}
                  style={{ background: '#FFFFFF', border: 'none' }}
                >
                  <ArrowRight />
                </Button>
                <div>{pathname}</div>
              </Flex>
            ) : pathname === 'Socialmedia Automation' ? (
              'Social Media'
            ) : (
              pathname
            )}
          </StyledHeaderText>
          <EndButtonWrapper>
            <StyledTrialButton>
              {/* <TrialClockIcon style={{ paddingRight: "5px" }} /> */}
              {/* {accountInfo?.remaining_days < 0 ? `account expired` : 
              accountInfo?.remaining_days > 1 ? `${accountInfo?.remaining_days} days trial remaining` : `${accountInfo?.remaining_days} day trial remaining`} */}
              {priceValidation?.current_plan}
            </StyledTrialButton>
            <VerticalLine></VerticalLine>
            {accountInfo?.brands?.length > 0 && (
              <SelectComponent
                headerBrandDetails={accountInfo?.brands}
                onboardingStep={onboardingStep}
                updateOnboardingSteps={updateOnboardingSteps}
                updateStepOneValues={updateStepOneValues}
                onboardingInitiate={onboardingInitiate}
                brandCategoryList={brandCategoryList}
                countryList={countryList}
                updatedStepTwoValues={updatedStepTwoValues}
                onboardingStepOneValues={onboardingStepOneValues}
                fetchBrandCategoryList={fetchBrandCategoryList}
                fetchCountryList={fetchCountryList}
                saveSwitchedBrand={saveSwitchedBrand}
                switchedBrand={switchedBrand}
                getBrandInfoAPI={getBrandInfoAPI}
                uploadCoverPhoto={uploadCoverPhoto}
                brandLogoUrl={brandLogoUrl}
                pricingValidation={pricingValidation}
              />
            )}
          </EndButtonWrapper>
        </StyledHeaderCard>
      ) : (
        <StyledHeaderCard style={{ flexDirection: 'column', height: 'auto' }}>
          <StyledHeaderText className="textOnly">Home</StyledHeaderText>
          <StyledTrialButton className="trialButtonOnly">
            <TrialClockIcon style={{ paddingRight: '5px' }} />
            {/* {accountInfo?.remaining_days < 0 ? `account expired` : 
              accountInfo?.remaining_days > 1 ? `${accountInfo?.remaining_days} days trial remaining` : `${accountInfo?.remaining_days} day trial remaining`} */}
              {priceValidation?.current_plan}
              
          </StyledTrialButton>
          {accountInfo?.brands?.length > 0 && (
            <SelectComponent
              headerBrandDetails={accountInfo?.brands}
              onboardingStep={onboardingStep}
              updateOnboardingSteps={updateOnboardingSteps}
              updateStepOneValues={updateStepOneValues}
              onboardingInitiate={onboardingInitiate}
              brandCategoryList={brandCategoryList}
              countryList={countryList}
              updatedStepTwoValues={updatedStepTwoValues}
              onboardingStepOneValues={onboardingStepOneValues}
              fetchBrandCategoryList={fetchBrandCategoryList}
              fetchCountryList={fetchCountryList}
              saveSwitchedBrand={saveSwitchedBrand}
              switchedBrand={switchedBrand}
              getBrandInfoAPI={getBrandInfoAPI}
              uploadCoverPhoto={uploadCoverPhoto}
              brandLogoUrl={brandLogoUrl}
              pricingValidation={pricingValidation}
              accountInfo={accountInfo}
            />
          )}
        </StyledHeaderCard>
      )}
      {pathname === 'Integration' ||
        (pathname === 'Dashboard' && <Headerdiv></Headerdiv>)}
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </div>
  );
};

export default Header;
