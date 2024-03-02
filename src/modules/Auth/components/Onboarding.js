import React, { useEffect } from 'react';
import * as S from './partials/SignUp/Authlayout';
import { AppLogo } from '@components/common/AppLogo';
import Stepper from './partials/Stepper';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import StepOne from './partials/BrandCreation/StepOne';
import StepTwo from './partials/BrandCreation/StepTwo';
import { useResponsive } from '../../../hooks/useResponsive';

const FlexWrap = styled(Flex)`
  margin-left: 6rem;
  margin-right: 6rem;
  margin-right: 6rem;
  margin-top: 2rem;
`;

const OnboardingProcess = ({
  // state
  onboardingStep,
  onboardingStepTwoValues,
  onboardingStepOneValues,
  brandCategoryList,
  countryList,
  brandLogoUrl,
  brandLogoFromOnboarding,
  //actions
  updateOnboardingSteps,
  onboardingInitiate,
  updatedStepTwoValues,
  updateStepOneValues,
  fetchBrandCategoryList,
  fetchCountryList,
  uploadCoverPhoto,
}) => {
  useEffect(() => {
    fetchBrandCategoryList();
    fetchCountryList();
  }, []);
  const { mobileOnly } = useResponsive();
  return (
    <S.Wrapper>
      <S.BackgroundWrapper>
        <Flex center style={{marginTop: '10px'}}>
          <AppLogo />
        </Flex>
        {!mobileOnly && (
          <FlexWrap>
            <Stepper currentStep={onboardingStep} />
          </FlexWrap>
        )}
        <S.LoginWrapper top="55%" page="onboarding">
          <S.FormWrapper style={{ minHeight: '520px' }}>
            {onboardingStep === 1 && (
              <StepOne
                updateOnboardingSteps={updateOnboardingSteps}
                updateStepOneValues={updateStepOneValues}
                uploadCoverPhoto={uploadCoverPhoto}
                brandLogoUrl={brandLogoUrl}
                onboardingStepOneValues={onboardingStepOneValues}
                brandLogoFromOnboarding={brandLogoFromOnboarding}
              />
            )}

            {onboardingStep === 2 && (
              <StepTwo
                updateOnboardingSteps={updateOnboardingSteps}
                updatedStepTwoValues={updatedStepTwoValues}
                onboardingInitiate={onboardingInitiate}
                onboardingStepOneValues={onboardingStepOneValues}
                brandCategoryList={brandCategoryList}
                countryList={countryList}
              />
            )}
          </S.FormWrapper>
        </S.LoginWrapper>
      </S.BackgroundWrapper>
    </S.Wrapper>
  );
};

export default OnboardingProcess;
