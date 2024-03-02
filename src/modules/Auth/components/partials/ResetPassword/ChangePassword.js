import { Button, Form, Input } from 'antd';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import * as S from '../SignUp/Authlayout';
import { Typography } from 'antd';
import Flex from '@components/common/Flex';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { changePassword } from '../../../actions';
import { useDispatch } from 'react-redux';

const FormInputPassword = styled(Input.Password)`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0px;
  font-size: 20px;
  color: #181818;
  box-shadow: none !important;
  margin: 5px 0 0 !important;
  &:focus {
    box-shadow: none;
  }

  #password::placeholder,
  #confirm_password::placeholder {
    color: #999999;
  }

  .ant-input-suffix > span {
    color: #999999;
  }
`;
export const ChangePassword = ({ signInAttempt }) => {
  const { Paragraph } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const pathToken = location?.search && location?.search?.split('=')[1];
  const onFinish = value => {
    if (value) {
      dispatch(changePassword(value, pathToken, form, navigate));
    }
  };
  const validatePassword = (rule, value) => {
    const notSpace = /^\S*$/;
    const eightChar = /.{8,}/;
    if (value == '') {
      return Promise.reject('Please input your password!');
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
      <Flex center>
        <Typography.Title level={3} style={{ color: '#181818' }}>
          {'Set new password'}
        </Typography.Title>
      </Flex>
      <Flex center>
        <Paragraph
          style={{
            color: '#4d4d4d',
            fontSize: '17px',
          }}
        >
          {"No worries, we'll send you reset instructions."}
        </Paragraph>
      </Flex>
      <Form
        style={{ marginRight: '4rem', marginLeft: '4rem', marginTop: '2rem' }}
        onFinish={onFinish}
        autoComplete={'off'}
        form={form}
      >
        <Form.Item name={'password'} rules={[{ validator: validatePassword }]}>
          <FormInputPassword size="middle" placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name={'confirm_password'}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('These passwords didn’t match. Try again')
                );
              },
            }),
          ]}
        >
          <FormInputPassword size="middle" placeholder="Confirm Password" />
        </Form.Item>
        <S.FooterWrapper>
          <S.StyledButton type="primary" htmlType="submit">
            Reset Password
          </S.StyledButton>
        </S.FooterWrapper>
        <S.FooterWrapper>
          <Flex center>
            <Button
              type="link"
              style={{ color: '#999999', fontSize: '17px' }}
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
