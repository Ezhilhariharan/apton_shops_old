import React from 'react';
import { AppLogo } from '@components/common/AppLogo';
import * as S from './partials/SignUp/Authlayout';
import Flex from '@components/common/Flex';
import { ChangePassword } from './partials/ResetPassword/ChangePassword';
import PrivacyAndHelp from './partials/PrivacyAndHelp';


const ChangePasswordPage = () => {
  return (
    <S.Wrapper>
      <S.BackgroundWrapper>
        <Flex center>
          <AppLogo />
        </Flex>
        <S.LoginWrapper top="50%" page="changePassword">
          <S.FormWrapper>
            <ChangePassword />
          </S.FormWrapper>
          <PrivacyAndHelp />
        </S.LoginWrapper>
      </S.BackgroundWrapper>
    </S.Wrapper>
  );
};

export default ChangePasswordPage;
