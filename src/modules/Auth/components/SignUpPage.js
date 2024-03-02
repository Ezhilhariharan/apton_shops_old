import React, { useEffect } from 'react';
import * as S from './partials/SignUp/Authlayout';
import { AppLogo } from '@components/common/AppLogo';
import Stepper from './partials/Stepper';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { SignUpForm } from './partials/SignUp/SignUpForm';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';
import PrivacyAndHelp from './partials/PrivacyAndHelp';

const FlexWrap = styled(Flex)`
  margin-left: 6rem;
  margin-right: 6rem;
`;
const SignUpPage = ({
  // state
  onboardingStep,
  signUpStatus,
  // actions
  signUpAttempt,
  updateOnboardingSteps,
}) => {
  const navigate = useNavigate();
  const onFinish = values => {
    if (values) {
      signUpAttempt(values, navigate);
    }
  };
  const { mobileOnly, desktopOnly, tabletOnly } = useResponsive();
  return (
    <S.Wrapper>
      <S.BackgroundWrapper>
        <Flex center style={{ margin: '10px 0' }}>
          <AppLogo />
        </Flex>
        {!mobileOnly && (
          <FlexWrap>
            <Stepper currentStep={onboardingStep} />
          </FlexWrap>
        )}
        <S.LoginWrapper>
          <S.FormWrapper>
            <SignUpForm
              onFinish={onFinish}
              updateOnboardingSteps={updateOnboardingSteps}
            />
          </S.FormWrapper>
          <PrivacyAndHelp />
        </S.LoginWrapper>
      </S.BackgroundWrapper>
    </S.Wrapper>
  );
};

export default SignUpPage;
