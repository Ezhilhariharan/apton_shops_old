import React from 'react';
import { LoginForm } from './partials/Login/LoginForm';
import { AppLogo } from '@components/common/AppLogo';
import * as S from './partials/SignUp/Authlayout';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import Stepper from './partials/Stepper';
import { useResponsive } from '../../../hooks/useResponsive';
import PrivacyAndHelp from './partials/PrivacyAndHelp';
const FlexWrap = styled(Flex)`
  margin-left: 6rem;
  margin-right: 6rem;
`;

const LoginPage = ({
  signInAttempt,
  onboardingStep,
  updateOnboardingSteps,
}) => {
  const { isMobile, desktopOnly, tabletOnly } = useResponsive();
  return (
    <S.Wrapper>
      <S.BackgroundWrapper>
        <Flex center style={{marginTop: '10px'}}>
          <AppLogo />
        </Flex>
        {/* {desktopOnly || tabletOnly && <FlexWrap>
          <Stepper currentStep={onboardingStep} />
        </FlexWrap>} */}
        <S.LoginWrapper top="55%" page="login">
          <S.FormWrapper>
            <LoginForm
              signInAttempt={signInAttempt}
              updateOnboardingSteps={updateOnboardingSteps}
            />
          </S.FormWrapper>
          <PrivacyAndHelp />
        </S.LoginWrapper>
      </S.BackgroundWrapper>
    </S.Wrapper>
  );
};

export default LoginPage;
