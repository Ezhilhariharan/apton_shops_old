import React from 'react';
import AppRouter from './routes';
import GlobalStyles from './theme/GlobalStyles';


const APP = ({
  //data
  authToken,
  currentUserInfo,
  brandCategoryList,
  countryList,
  onboardingStep,
  onboardingStepOneValues,
  switchedBrand,
  brandLogoUrl,
  //action
  updateOnboardingSteps,
  updateStepOneValues,
  onboardingInitiate,
  updatedStepTwoValues,
  fetchBrandCategoryList,
  fetchCountryList,
  saveSwitchedBrand,
  selectedBrandUser,
  getBrandInfoAPI,
  uploadCoverPhoto,
  pricingValidation,
  upDateAuthToken,
}) => {
  return (
    <>
      <GlobalStyles />
      <AppRouter
        authToken={authToken}
        accountInfo={currentUserInfo}
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
        selectedBrandUser={selectedBrandUser}
        getBrandInfoAPI={getBrandInfoAPI}
        uploadCoverPhoto={uploadCoverPhoto}
        brandLogoUrl={brandLogoUrl}
        pricingValidation={pricingValidation}
        upDateAuthToken={upDateAuthToken}
      />
    </>
  );
};

export default APP;
