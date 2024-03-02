import React from 'react';
import { AppLogo } from '@components/common/AppLogo';
import * as S from './partials/SignUp/Authlayout';
import Flex from '@components/common/Flex';
import { ForgotPassword } from './partials/ForgotPassword/ForgotPassword';
import PrivacyAndHelp from './partials/PrivacyAndHelp';

const ForgotPasswordPage = ({ requestForgotPassword }) => {
  return (
    <S.Wrapper>
      <S.BackgroundWrapper>
        <Flex center style={{marginTop: '10px'}}>
          <AppLogo />
        </Flex>
        <S.LoginWrapper top="50%" page="forgot">
          <S.FormWrapper style={{minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <ForgotPassword requestForgotPassword={requestForgotPassword} />
          </S.FormWrapper>
          <PrivacyAndHelp />
        </S.LoginWrapper>
      </S.BackgroundWrapper>
    </S.Wrapper>
  );
};

export default ForgotPasswordPage;
