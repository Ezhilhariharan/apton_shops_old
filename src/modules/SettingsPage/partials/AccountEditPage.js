import { Divider, Form, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../theme/styles/light/lightTheme';
import * as A from '../components/index.styles';

export const SaveButton = styled(A.UpgardePlanButton)`
  width: 93px;
  height: 39px;
  :disabled {
    border: none;
    background: ${lightColorsTheme.headerInputBackground};
    :hover {
      border: none;
      background: ${lightColorsTheme.headerInputBackground};
    }
  }
`;
export const SaveButtonWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;
const AccountEditPage = ({
  accountUpdate,
  currentUser,
  getCountries,
  getProvince,
  getCity,
  accountCountry,
  accountProvince,
  accountCity,
}) => {
  const [form] = Form.useForm();
  const account = currentUser?.account;
  const [enableButton, setEnableButton] = useState(false);
  const defaultCountry = account?.country_id;
  const defaultProvince = account?.province_id;
  const defaultCity = account?.city_id;
  const defaultPostCode = account?.postal_index_id;

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const saveAccountInfo = value => {
    const locationInfo = {
      country: selectedCountry,
      province: selectedProvince,
      city: selectedCity,
    };
    accountUpdate(value, account?.id, locationInfo);
  };
  const handleCountry = e => {
    setSelectedCountry(e.target.value);
    form.setFieldValue({
      state: '0',
      city: '0',
    });
    setSelectedProvince('0');
    setSelectedCity('0');
  };

  useEffect(() => {
    getCountries('Account');
    getProvince(defaultProvince, 'Account');
    getCity(defaultCity, 'Account');
    setSelectedCity(defaultCity);
    setSelectedProvince(defaultProvince);
  }, []);
  useEffect(() => {
    if (selectedCountry) {
      getProvince(selectedCountry, 'Account');
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedProvince) {
      // form.setFieldValue({
      //   city: '',
      // });
      getCity(selectedProvince, 'Account');
    }
  }, [selectedProvince]);
  const makeButtonEnable = () => {
    setEnableButton(true);
  };
  const validatePassword = (rule, value, callback) => {
    const notSpace = /^\S*$/;
    const eightChar = /.{8,}/;
    if (!value) {
      return callback();
    } else if (!eightChar.test(value)) {
      return callback('Must contain 8 or more characters');
    } else if (!notSpace.test(value)) {
      return callback('Must not have any blank spaces');
    } else if (!/.*\d/.test(value)) {
      return callback('Must contain a digit');
    } else if (!/.*[a-z]/.test(value)) {
      return callback('Must contain a lower case character');
    } else if (!/.*[A-Z]/.test(value)) {
      return callback('Must contain an upper case character');
    } else if (/^[a-zA-Z0-9 ]*$/.test(value)) {
      return callback('Must contain a symbol');
    } else {
      return callback();
    }
  };

  return (
    <>
      <A.AccountBoxWrapper>
        <div>
          <div className="circleBox">
            <span>
              {currentUser?.first_name[0]?.toUpperCase()}
              {currentUser?.last_name[0]?.toUpperCase()}
            </span>
          </div>
        </div>
        <Divider />
        <A.FormWrapper onFinish={saveAccountInfo} form={form}>
          <div className="marginRight">
            <div className="inputLabelText">First Name</div>
            <Form.Item
              name={'firstName'}
              rules={[
                {
                  pattern: /^[^0-9]*[a-zA-Z]/,
                  message: 'First name should not begin with number',
                },
                {
                  pattern: /^.{3,}$/,
                  message: 'First name should atleast 3 characters',
                },
                {
                  pattern: /^.{1,15}$/,
                  message: 'First name should not more than 15 characters',
                },
              ]}
            >
              <A.CustomInput
                defaultValue={currentUser?.first_name}
                placeholder="Enter your first name"
                value={currentUser?.first_name}
                onChange={makeButtonEnable}
              />
            </Form.Item>
            <div className="inputLabelText">Company Name</div>
            <Form.Item
              name={'companyName'}
              rules={[
                {
                  pattern: /^[A-Za-z \-]+$/,
                  message: 'Numbers are not allowed in company name',
                },
              ]}
            >
              <A.CustomInput
                placeholder="Company name"
                defaultValue={account?.name}
                onChange={makeButtonEnable}
              />
            </Form.Item>
            <div className={'inputLabelText'}>Phone Number</div>
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  pattern: /^[0-9/+]*$/,
                  message: 'Please give only numbers',
                },
                {
                  pattern: /^.{10,16}$/,
                  message: 'Phone number must be 10 to 16 digits',
                },
              ]}
            >
              <A.CustomInput
                placeholder="+00 0000 000 000"
                defaultValue={account?.contact_number}
                onChange={makeButtonEnable}
              />
            </Form.Item>
            <div className={'inputLabelText'}>Country</div>
            <Form.Item name={'country'} className="removeDefaultArrow">
              <A.LocationSelect
                onChange={e => {
                  handleCountry(e);
                  makeButtonEnable();
                }}
                value={accountCountry}
              >
                <option value="" disabled selected>
                  Select country
                </option>
                {accountCountry?.length > 0 &&
                  accountCountry?.map((data, ind) => (
                    <option
                      className="option"
                      value={data.id}
                      selected={defaultCountry === data.id}
                      key={ind}
                    >
                      {data.name}
                    </option>
                  ))}
              </A.LocationSelect>
            </Form.Item>
            <div className={'inputLabelText'}>City</div>
            <Form.Item name={'city'} className="removeDefaultArrow">
              <A.LocationSelect
                placeholder="Select city"
                onChange={e => {
                  setSelectedCity(e.target.value);
                  makeButtonEnable();
                }}
                value={selectedCity}
                disabled={!accountCity}
              >
                {!accountCity && (
                  <option value="" disabled selected>
                    Select City
                  </option>
                )}
                {accountCity?.length > 0 &&
                  accountCity?.map((data, ind) => (
                    <option
                      value={data.id}
                      selected={selectedCity === data.id}
                      key={ind}
                    >
                      {data.name}
                    </option>
                  ))}
              </A.LocationSelect>
            </Form.Item>
            {currentUser?.login_type === 'SIGNUP_FLOW' && (
              <>
                <div className="inputLabelText">Change Password</div>
                <Form.Item
                  name={'changePassword'}
                  rules={[{ validator: validatePassword }]}
                >
                  <A.PasswordInput
                    placeholder="Enter new password"
                    type="password"
                    onChange={makeButtonEnable}
                    className="colorInput"
                  />
                </Form.Item>
              </>
            )}
          </div>
          <div>
            <div className="inputLabelText">Last Name</div>
            <Form.Item
              name={'lastName'}
              rules={[
                {
                  pattern: /^[^0-9]*[a-zA-Z]/,
                  message: 'Last name should not begin with number',
                },
                {
                  pattern: /^.{1,15}$/,
                  message: 'Last name should not more than 15 characters',
                },
              ]}
            >
              <A.CustomInput
                defaultValue={currentUser?.last_name}
                placeholder="Enter your last name"
                value={currentUser?.last_name}
                onChange={makeButtonEnable}
              />
            </Form.Item>
            <div className="inputLabelText">Email Address</div>
            <Form.Item
              name={'email'}
              rules={[
                {
                  type: 'email',
                  message: 'Enter a valid email address',
                },
              ]}
            >
              <A.CustomInput
                placeholder="abc@xyz.com"
                defaultValue={account?.contact_email}
                disabled={!!account?.contact_email}
                onChange={makeButtonEnable}
              />
            </Form.Item>
            <div className="inputLabelText">Address</div>
            <Form.Item name={'location'}>
              <A.CustomInput
                placeholder="Enter address"
                defaultValue={account?.address_line_1}
                onChange={makeButtonEnable}
              />
            </Form.Item>

            <div className="inputLabelText">State</div>
            <Form.Item name={'state'} className="removeDefaultArrow">
              <A.LocationSelect
                onChange={e => {
                  setSelectedProvince(e.target.value);
                  makeButtonEnable();
                }}
                placeholder="Select state"
                value={selectedProvince}
                disabled={!accountProvince}
              >
                {accountProvince?.length > 0 ? (
                  accountProvince?.map((data, ind) => (
                    <option
                      className="option"
                      selected={selectedProvince === data.id}
                      value={data.id}
                      key={ind}
                    >
                      {data.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled selected>
                    Select state
                  </option>
                )}
              </A.LocationSelect>
            </Form.Item>
            <div className="inputLabelText">Zip Code</div>
            <Form.Item
              name={'postal_code'}
              rules={[
                {
                  pattern: /^[0-9]{5,6}$/,
                  message: 'Enter only 5 or 6 digits postal code',
                },
              ]}
            >
              <A.CustomInput
                placeholder="000 000"
                defaultValue={defaultPostCode}
                onChange={makeButtonEnable}
              />
            </Form.Item>
            {currentUser?.login_type === 'SIGNUP_FLOW' && (
              <>
                <div className="inputLabelText">Confirm Password</div>
                <Form.Item
                  name={'confirmPassword'}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_rule, value) {
                        if (getFieldValue('changePassword') == value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          'These passwords didn’t match. Try again'
                        );
                      },
                    }),
                  ]}
                >
                  <A.PasswordInput
                    placeholder="Enter new password"
                    type="password"
                    onChange={makeButtonEnable}
                    className="colorInput"
                  />
                </Form.Item>
              </>
            )}
            <SaveButtonWrapper>
              <SaveButton htmlType="submit" disabled={!enableButton}>
                Save
              </SaveButton>
            </SaveButtonWrapper>
          </div>
        </A.FormWrapper>
      </A.AccountBoxWrapper>
    </>
  );
};

export default AccountEditPage;
