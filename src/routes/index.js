import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '@components/layouts/MainLayout/MainLayout';
import RequireAuth from './RequireAuth';
import SignUpIndex from '@modules/Auth/containers/SignUpIndex';
import OnboardingIndex from '@modules/Auth/containers/OnboardingIndex';
import LoginIndex from '@modules/Auth/containers/LoginIndex';
import ForgotPasswordIndex from '@modules/Auth/containers/ForgotPasswordIndex';
import UserSSOAuthIndex from '@modules/Auth/containers/UserSSOAuthIndex';
import ChangePasswordIndex from '@modules/Auth/containers/ChangePasswordIndex';
import WhatsAppCampagin from '@modules/Campagins/whatsapp/container';
import Dashboard from '../modules/Dashboard/container';
import WhatsAppCampIndex from '@modules/Campagins/whatsapp/subcomponet/container/WhatsAppCampIndex';
import InstagramPopOverIndex from '../modules/NewIntegration/container/InstagramPopOverIndex';
import FacebookPopup from '../modules/NewIntegration/container/FacebookPopupIndex';
import CampaginDetails from '@modules/Campagins/campaginDetails/container';
import SocialMedia from '../modules/SocialMedia/container/SocialmediaIntegration';
import WhatsAppChat from '../modules/Campagins/whatsAppChat/container';
import SettingsPage from '../modules/SettingsPage/container/SettingsPageIndex';
import WhatsAppAuthIndex from '../modules/NewIntegration/container/WhatsAppAuthIndex';
import FbGroupIndex from '../modules/NewIntegration/container/FbGroupIndex';
import WhatsappTemplate from '../modules/Campagins/Template/container';
import Inbox from '../modules/Inbox/container';
import WhatsappCustomerIndex from '@modules/Campagins/Customers/container';
import SurveyCampagin from '../modules/SurveyCampagin/containers';
import CreateSurvey from '../modules/CreateSurvey/container';
import NewIntegration from '../modules/NewIntegration/container/index';
import FbAdIndex from '../modules/NewIntegration/container/FbAdIndex';
import ResetLinkIndex from '../modules/Auth/containers/ResetLInkIndex';
export const AUTHENDICATION_PATH = '/login';
export const DASHBOARD_PATH = '/dashboard';

const AppRouter = ({
  authToken,
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
}) => {
  const protectedLayout = (
    <RequireAuth authToken={authToken}>
      <MainLayout
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
        selectedBrandUser={selectedBrandUser}
        getBrandInfoAPI={getBrandInfoAPI}
        uploadCoverPhoto={uploadCoverPhoto}
        brandLogoUrl={brandLogoUrl}
        pricingValidation={pricingValidation}
        upDateAuthToken={upDateAuthToken}
        authToken={authToken}
      />
    </RequireAuth>
  );
  const brandsCount = accountInfo?.brands
    ? accountInfo?.brands?.length
    : []?.length;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginIndex />} />
        <Route
          path="*"
          element={
            <Navigate
              to={brandsCount > 0 && authToken ? '/dashboard' : '/login'}
            />
          }
        />
        <Route element={protectedLayout}>
          <Route path="/whatsapp-marketing" element={<WhatsAppCampagin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/create-whatsapp-campaign"
            element={<WhatsAppCampIndex />}
          />
          <Route path="/integration" element={<NewIntegration />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/facebook/page_list" element={<FacebookPopup />} />
          <Route
            path="/instagram/page_list"
            element={<InstagramPopOverIndex />}
          />
          <Route path="/campagin-details" element={<CampaginDetails />} />
          <Route path="/socialmedia-automation" element={<SocialMedia />} />
          <Route path="/chat" element={<WhatsAppChat />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/whatsapp-auth" element={<WhatsAppAuthIndex />} />
          <Route path="/facebook-groups-auth" element={<FbGroupIndex />} />
          <Route path="/facebook-ads-auth" element={<FbAdIndex />} />
          <Route path="/whatsapp-template" element={<WhatsappTemplate />} />
          <Route path="/customer" element={<WhatsappCustomerIndex />} />
          <Route path="/survey-bots" element={<SurveyCampagin />} />
          <Route path="/create-bot" element={<CreateSurvey />} />
        </Route>
        <Route path="/signup" element={<SignUpIndex />} />
        <Route path="/onboarding" element={<OnboardingIndex />} />
        <Route path="/forgot-password" element={<ForgotPasswordIndex />} />
        <Route path="/sso_callback" element={<UserSSOAuthIndex />} />
        <Route path="/change-password" element={<ChangePasswordIndex />} />
        <Route path="/reset-password" element={<ResetLinkIndex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
