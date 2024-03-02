import React, { useState } from 'react';
import { AppLogo } from '@components/common/AppLogo';
import * as S from './partials/SignUp/Authlayout';
import Flex from '@components/common/Flex';
import { ChangePassword } from './partials/ResetPassword/ChangePassword';
import PrivacyAndHelp from './partials/PrivacyAndHelp';
import { Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ResetPage = () => {
  const [resetPassword, setResetPassword] = useState(true);
  const navigate = useNavigate();
  const emailInfo = useSelector(state => state.authSelector.getEmail);
  const { Paragraph } = Typography;
  const StyledParagraph = styled(Paragraph)`
    width: 60%;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    color: #4d4d4d;
  `;

  return (
    <S.Wrapper>
      <S.BackgroundWrapper>
        <Flex center style={{ marginTop: '10px' }}>
          <AppLogo />
        </Flex>
        <S.LoginWrapper top="50%" page="resetPassword">
          <S.FormWrapper style={{ minHeight: '490px' }}>
            <Flex
              center
              style={{
                fontSize: '24px',
                padding: '90px 0',
                color: '#181818',
                fontWeight: '700',
              }}
            >
              Check your email
            </Flex>
            <Flex center>
              <StyledParagraph style={{ marginTop: '-80px' }}>
                {`We sent a password reset link to  ${emailInfo?.email}`}
              </StyledParagraph>
            </Flex>
            <Flex center>
              <Paragraph
                style={{
                  color: '#4d4d4d',
                  fontSize: '17px',
                  marginTop: '20px',
                  display: 'flex',
                }}
              >
                Didn’t receive the email?
                <span
                  onClick={() => navigate('/forgot-password')}
                  style={{ cursor: 'pointer', color: '#4aacea',marginLeft: '5px' }}
                >
                  click to resend
                </span>
              </Paragraph>
            </Flex>
            <S.FooterWrapper>
              <Flex center>
                <Button
                  type="link"
                  style={{
                    color: '#999999',
                    fontSize: '16px',
                    marginTop: '-30px',
                  }}
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  {<ArrowLeftOutlined />} {'Back to login'}
                </Button>
              </Flex>
            </S.FooterWrapper>
          </S.FormWrapper>
          <PrivacyAndHelp />
        </S.LoginWrapper>
      </S.BackgroundWrapper>
    </S.Wrapper>
  );
};

export default ResetPage;
