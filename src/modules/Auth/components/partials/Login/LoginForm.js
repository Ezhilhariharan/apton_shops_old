import { Button, Divider, Form, Input } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleIcon } from '@components/icons/GoogleIcon';
import * as S from '../SignUp/Authlayout';
import { Typography } from 'antd';
import Flex from '@components/common/Flex';
import { useNavigate } from 'react-router-dom';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import { useResponsive } from '../../../../../hooks/useResponsive';
const { APP_MODE } = process.env;
const FormInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0px;
  font-size: 18px;
  color: #181818;
  margin: 5px 0 !important;
  box-shadow: none !important;
  &:focus {
    box-shadow: none;
  }

  &::placeholder {
    color: #999999;
  }
`;
const FormInputPassword = styled(Input.Password)`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0px;
  font-size: 18px;
  margin: 5px 0 !important;
  box-shadow: none !important;
  color: #999999;
  &:focus {
    box-shadow: none;
  }

  #password::placeholder {
    color: #999999;
  }

  .ant-input-suffix > span {
    color: #999999;
  }
`;

export const OrText = styled('span')`
  color: ${lightColorsTheme.orTextColor};
`;
export const LoginButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
`;
export const CreateAccountButton = styled(Button)`
  color: ${lightColorsTheme.primary};
  font-family: Lato;
  font-size: 16px;
  font-weight: 500;
  &:focus {
    color: ${lightColorsTheme.primary};
  }
  &:hover {
    color: ${lightColorsTheme.primary};
  }
`;
const StyledFlex = styled(Flex)`
  margin-bottom: 1rem;
`;
export const FormTitle = styled(Typography.Title)`
  color: ${lightColorsTheme.darkBlack} !important;
  font-weight: 700 !important;
  font-size: 24px !important;
  margin: 0 0 10px !important;
`;
export const LoginForm = ({ signInAttempt }) => {
  const navigate = useNavigate();

  const onFinish = value => {
    if (value) {
      signInAttempt(value, navigate);
    }
  };
  const { mobileOnly } = useResponsive();
  const { mediumScreen } = useResponsive();
  const validatePassword = (rule, value) => {
    const notSpace = /^\S*$/;
    const eightChar = /.{8,}/;
    if (value == '') {
      return Promise.reject('Please enter your password');
    } else if (!eightChar.test(value)) {
      return Promise.reject('Must contain 8 or more characters');
    } else if (!notSpace.test(value)) {
      return Promise.reject('Must not have any blank spaces');
    } else if (!/.*\d/.test(value)) {
      return Promise.reject('Must contain a digit');
    } else if (!/.*[a-z]/.test(value)) {
      return Promise.reject('Must contain a lower case character');
    } else if (!/.*[A-Z]/.test(value)) {
      return Promise.reject('Must contain an upper case character');
    } else if (/^[a-zA-Z0-9 ]*$/.test(value)) {
      return Promise.reject('Must contain a symbol');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Fragment>
      <StyledFlex center>
        <FormTitle level={4} style={{ paddingTop: '0px' }}>
          {'Welcome back!'}
        </FormTitle>
      </StyledFlex>
      <Form
        style={{
          marginRight: mediumScreen ? '1rem' : '4rem',
          marginLeft: mediumScreen ? '1rem' : '4rem',
        }}
        onFinish={onFinish}
        autoComplete={'off'}
      >
        {APP_MODE !== 'Prod' && (
          <Form.Item style={{ marginTop: 5 }}>
            {/* <a href='https://preprod.aptonshops.com/api/google_sso'>
              <S.SocialButton type="default" style={{ boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.12)" }}>
                <S.SocialIconWrapper>
                  <GoogleIcon />
                </S.SocialIconWrapper>
                {'Login  with Google'}
              </S.SocialButton>
            </a> */}
            {/* <Divider plain style={{ color: lightColorsTheme.grayTextColor }}>
              Or
            </Divider> */}
          </Form.Item>
        )}

        <Form.Item
          name={'email'}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter valid email address' },
          ]}
        >
          <FormInput size="middle" placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name={'password'}
          // rules={[{ validator: validatePassword }]}
        >
          <FormInputPassword size="middle" placeholder="Password" />
        </Form.Item>
        <S.FooterWrapper>
          <S.StyledButton type="primary" htmlType="submit">
            Login
          </S.StyledButton>
        </S.FooterWrapper>
        <S.FooterWrapper>
          <Flex spaceBetween>
            <CreateAccountButton
              type="link"
              onClick={() => navigate('/signup')}
            >
              Create an account?
            </CreateAccountButton>
            <Button
              type="link"
              style={{ color: '#999999', fontSize: '16px' }}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </Button>
          </Flex>
        </S.FooterWrapper>
      </Form>
    </Fragment>
  );
};
