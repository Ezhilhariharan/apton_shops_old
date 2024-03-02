import { Button, Checkbox, Divider, Form, Input } from 'antd';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { GoogleIcon } from '@components/icons/GoogleIcon';
import * as S from './Authlayout';
import { Typography } from 'antd';
import Flex from '@components/common/Flex';
import { useNavigate } from 'react-router-dom';
import { CreateAccountButton, FormTitle } from '../Login/LoginForm';
import { useResponsive } from '../../../../../hooks/useResponsive';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
const { APP_MODE } = process.env;

const FormInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0px;
  font-size: 18px;
  font-weight: 400;
  color: #181818;
  margin: 5px 0 !important;
  box-shadow: none !important;
  // padding: 10px 0 0;
  &:focus {
    box-shadow: none;
  }

  &::placeholder {
    color: #999999;
  }
`;
const Checkedbox = styled(Checkbox)`
  font-weight: 500 !important;
  font-size: 15px !important;
  color: #999999 !important;
  .ant-checkbox-inner{
  width: 20px !important;
  height: 20px !important;
  border-radius: 4px;
}
`;
const FormInputPassword = styled(Input.Password)`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0px;
  font-size: 18px;
  font-weight: 400;
  box-shadow: none !important;
  margin: 4px 0 !important;

  #password::placeholder,
  #password_confirmation::placeholder {
    color: #999999;
  }

  .ant-input-suffix > span {
    color: #999999;
    font-size: 18px !important;
  }
`;

const StyledTextBox = styled(Flex)`
  // margin-bottom: 50px;
`;

export const SignUpForm = ({ onFinish, onFinishFailed }) => {
  const navigate = useNavigate();
  const { mediumScreen } = useResponsive();
  const isNumberKey = (rule, value) => {
    if (value == '') {
      return Promise.reject('Please enter contact number');
    } else if (!/^\d{10}$/.test(parseInt(value))) {
      return Promise.reject('Please enter 10 digit numbers');
    } else {
      return Promise.resolve();
    }
  };
  const validatePassword = (rule, value) => {
    const notSpace = /^\S*$/;
    const eightChar = /.{8,}/;

    if (!value) {
      return Promise.reject('Please enter your password');
    } else if (!eightChar.test(value)) {
      return Promise.reject('Must contain 8 or more characters');
    } else if (!notSpace.test(value)) {
      return Promise.reject('Must not have any blank spaces');
    } else if (!/.*\d/.test(value)) {
      return Promise.reject('Must contain a number');
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
  const validateCheckBox = (_, value) => {
    if (!value) {
      return Promise.reject('Please accept the terms.');
    }
    return Promise.resolve();
  };
  return (
    <Fragment>
      <StyledTextBox center>
        <FormTitle level={4} style={{ marginBlock: '10px' }}>
          {"Let's get started!"}
        </FormTitle>
      </StyledTextBox>
      <Form
        style={{
          height: 'auto',
          marginRight: mediumScreen ? '1rem' : '4rem',
          marginLeft: mediumScreen ? '1rem' : '4rem',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete={'off'}
      >
        {/* {APP_MODE !== 'Prod' && (
          <Form.Item>
            <a href="https://preprod.aptonshops.com/api/google_sso">
              <S.SocialButton
                type="default"
                style={{ boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.12)' }}
              >
                <S.SocialIconWrapper>
                  <GoogleIcon />
                </S.SocialIconWrapper>
                {'Sign up with Google'}
              </S.SocialButton>
            </a>
            <Divider plain style={{ color: lightColorsTheme.grayTextColor }}>
              Or
            </Divider>
          </Form.Item>
        )} */}
        <Form.Item
          name={'first_name'}
          rules={[
            { required: true, message: 'Please enter your first name' },
            () => ({
              validator(_rule, value) {
                if (!/^.{5,}$/.test(value)) {
                  return Promise.reject(
                    'Username must be minimum 5 characters'
                  );
                } else if (!/^([\s.]?[a-zA-Z\. ]+)+$/.test(value)) {
                  return Promise.reject('Must contains only alphabet');
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <FormInput size="middle" placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name={'last_name'}
          rules={[
            { required: true, message: 'Please enter your last name' },
            () => ({
              validator(_rule, value) {
                if (!/^([\s.]?[a-zA-Z\. ]+)+$/.test(value)) {
                  return Promise.reject('Must contains only alphabet');
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <FormInput size="middle" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name={'email'}
          rules={[
            {
              required: true,
              message: 'Please Enter your Email',
            },
            {
              type: 'email',
              message: 'Enter a valid email address',
            },
          ]}
        >
          <FormInput size="middle" placeholder="E-mail" />
        </Form.Item>
        {/* <Form.Item
          name={'contact_number'}
          rules={[
            {
              validator: isNumberKey,
            },
          ]}
        >
          <FormInput type="tel" size="middle" placeholder="Phone Number" />
        </Form.Item> */}
        <Form.Item name={'password'} rules={[{ validator: validatePassword }]}>
          <FormInputPassword size="middle" placeholder="Password" />
        </Form.Item>
        <Form.Item
          name={'password_confirmation'}
          rules={[
            { required: true, message: 'Please enter your confirm-password' },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'These passwords didn’t match. Try again'
                );
              },
            }),
          ]}
        >
          <FormInputPassword size="middle" placeholder="Confirm Password" />
        </Form.Item>
        <S.FooterWrapper>
          <S.StyledButton
            type="primary"
            htmlType="submit"
            style={{ fontSize: '16px' }}
          >
            Sign Up
          </S.StyledButton>
        </S.FooterWrapper>
        <Form.Item
          name={'checked'}
          valuePropName="checked"
          // rules={[{ validator: validateCheckBox }]}
        >
          <Checkedbox defaultChecked={true} style={{ marginTop: '15px' }}>
            Tell me about exclusive updates on our products & offers.
          </Checkedbox>
        </Form.Item>
        <S.FooterWrapper style={{ marginTop: '10px' }}>
          <CreateAccountButton
            type="link"
            onClick={() => {
              navigate('/');
            }}
          >
            Already have an account?
          </CreateAccountButton>
        </S.FooterWrapper>
      </Form>
    </Fragment>
  );
};
