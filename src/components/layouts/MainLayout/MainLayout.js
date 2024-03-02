import React, { useEffect, useState } from 'react';
import Header from '../../header/header';
import MainSider from '../sider/MainSider/MainSider';
import MainContent from '../MainContent/MainContent';
import * as S from './MainLayout.styles';
import { Outlet, useLocation } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../../routes';
import { useResponsive } from '../../../hooks/useResponsive';
import { useSelector, shallowEqual } from 'react-redux';
import PlanEXpired from '../PlanExpired/PlanExpired';

const MainLayout = ({
  children,
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
  selectedBrandUser,
  getBrandInfoAPI,
  brandLogoUrl,
  uploadCoverPhoto,
  pricingValidation,
  upDateAuthToken,
  authToken,
}) => {
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const { isDesktop } = useResponsive();
  const location = useLocation();
  const upgradePopup = useSelector(
    state => state?.parentReducer?.upgradePopup,
    shallowEqual
  );
  const toggleSider = () => setSiderCollapsed(!siderCollapsed);
  useEffect(() => {
    setIsTwoColumnsLayout(
      [DASHBOARD_PATH].includes(location.pathname) && isDesktop
    );
  }, [location.pathname, isDesktop]);
  const currentPlanDetails = useSelector(
    state => state.authSelector.pricingValidationObj
  );
  return (
    <S.LayoutMaster>
      {/* {currentPlanDetails?.error ? (
        <PlanEXpired />
      ) : (
        <> */}
      <MainSider
        isCollapsed={siderCollapsed}
        setCollapsed={setSiderCollapsed}
        selectedBrandUser={selectedBrandUser}
        updateOnboardingSteps={updateOnboardingSteps}
        upDateAuthToken={upDateAuthToken}
        authToken={authToken}
      />
      <S.LayoutMain>
        <Header
          toggleSider={toggleSider}
          isSiderOpened={!siderCollapsed}
          isTwoColumnsLayout={isTwoColumnsLayout}
          headerText={headerText ? headerText : 'Home'}
          accountInfo={accountInfo}
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
        {/* <MainHeader isTwoColumnsLayout={isTwoColumnsLayout}>
          
          </MainHeader> */}
        <MainContent id="main-content" $isTwoColumnsLayout={isTwoColumnsLayout}>
          <div>
            <Outlet />
          </div>
          {children}
        </MainContent>
      </S.LayoutMain>
      {currentPlanDetails?.error && <PlanEXpired />}
      {/* </>
      )} */}
    </S.LayoutMaster>
  );
};
export default MainLayout;
