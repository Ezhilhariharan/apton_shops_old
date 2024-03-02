import { Button, Form, Input } from 'antd';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import * as S from '../SignUp/Authlayout';
import { Typography } from 'antd';
import Flex from '@components/common/Flex';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import { FormTitle } from '../Login/LoginForm';
import { useResponsive } from '../../../../../hooks/useResponsive';
import { useDispatch, useSelector } from 'react-redux';
import { getResetEmailInfo } from '../../../actions';
const FormInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0px;
  font-size: 18px;
  color: #181818;
  box-shadow: none !important;

  &::placeholder {
    color: #999999;
  }
`;
export const ForgotPassword = ({ requestForgotPassword }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Paragraph } = Typography;
  const StyledParagraph = styled(Paragraph)`
    color: ${lightColorsTheme.textColorLight};
    width: 80%;
    font-size: 17px;
    text-align: center;
  `;
  const dispatch = useDispatch();
  const onFinish = value => {
    dispatch(getResetEmailInfo(value));
    requestForgotPassword(value, form, navigate);
  };

  const { mobileOnly } = useResponsive();
  return (
    <Fragment>
      <Flex center>
        <FormTitle level={4}>{'Forgot password'}</FormTitle>
      </Flex>
      <Flex center>
        <StyledParagraph>
          {
            'Enter your user verified email address and we will send you a password reset link.'
          }
        </StyledParagraph>
      </Flex>
      <Form
        style={{
          marginRight: mobileOnly ? '1rem' : '4rem',
          marginLeft: mobileOnly ? '1rem' : '4rem',
        }}
        autoComplete={'off'}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          style={{ marginTop: '1rem' }}
          name="email"
          autoComplete={'off'}
          onFinish={onFinish}
          rules={[
            {
              required: true,
              message: 'Please Enter Email',
            },
            {
              type: 'email',
              message: 'Enter valid email address',
            },
          ]}
        >
          <FormInput size="middle" placeholder="E-mail" />
        </Form.Item>
        <S.FooterWrapper style={{ marginTop: '2rem', fontSize: '16px' }}>
          <S.StyledButton type="primary" htmlType="submit">
            Reset password
          </S.StyledButton>
        </S.FooterWrapper>
        <S.FooterWrapper>
          <Flex center>
            <Button
              type="link"
              style={{ color: '#999999', fontSize: '16px' }}
              onClick={() => {
                navigate('/');
              }}
            >
              {<ArrowLeftOutlined />} {'Back to login'}
            </Button>
          </Flex>
        </S.FooterWrapper>
      </Form>
    </Fragment>
  );
};
