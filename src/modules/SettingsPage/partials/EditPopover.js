import React, { useState, useEffect } from 'react';
import { ModalWrapper } from './Payment';
import InvoiceIcon from '../../../components/icons/InvoiceIcon';
import { Divider, Form, Input, Row, Col, Button } from 'antd';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { SaveButton } from './AccountEditPage';
import { useSelector, shallowEqual } from 'react-redux';
import * as A from '../components/index.styles';

const CustomInput = styled(Input)`
  width: 300px;
  height: 50px;
  background: #f4f4f5;
  border-radius: 10px;
  border:none;
`;
const Tag = styled.div`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: #4aacea;
  padding: 5px;
`;

const EditPopover = ({
  popup,
  close,
  billingInfo,
  updateBillingDetails,
  currentUser,
  getCountries,
  getProvince,
  getCity,
  accountCountry,
  accountProvince,
  accountCity,
}) => {
  const account = currentUser?.account;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultCountry = account?.country_id;
  const defaultProvince = account?.province_id;
  const defaultCity = account?.city_id;
  const defaultPostCode = account?.postal_index_id;

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [selectedProvince, setSelectedProvince] = useState(defaultProvince);
  const [selectedCity, setSelectedCity] = useState(defaultCity);

  useEffect(() => {
    setIsModalOpen(popup);
  }, [popup]);

  const closeModal = () => {
    close(false);
    setIsModalOpen(false);
  };
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );

  const brand = useSelector((state) => state?.parentReducer?.switchedBrand, shallowEqual)
  const accountId = currentUser?.account?.id
  const [form] = Form.useForm();
  const saveInfo = value => {
    const locationInfo = {
      country: selectedCountry,
      province: selectedProvince,
      city: selectedCity,
  }
    updateBillingDetails(priceValidation?.billing_info?.billing_id, value,locationInfo,accountId,brand?.id);
    close(false)
  };
  const handleProvince = e => {
    setSelectedProvince(e.target.value);
  };
  const handleCountry = e => {
    setSelectedCountry(e.target.value);
    form.setFieldValue({
      state: accountProvince[0]?.id,
    });
    setSelectedProvince(accountProvince[0]?.id);
  };

  useEffect(() => {
    if (selectedCountry && popup) {
      getProvince(selectedCountry, 'Account');
      getCountries('Account');
    }
  }, [selectedCountry,popup]);
  useEffect(() => {
    if (selectedProvince) {
      getCity(selectedProvince, 'Account');
      form.setFieldValue({
        city: accountCity[0]?.id,
      });
      setSelectedCity(accountCity[0]?.id);
    }
  }, [selectedProvince]);
  const makeButtonEnable = () => {
    setEnableButton(true);
  };
  useEffect(()=>{
  form.setFieldsValue({
    "firstName":priceValidation?.billing_info?.first_name,
    "lastName":priceValidation?.billing_info?.last_name,
    "companyName":priceValidation?.billing_info?.business_name,
    "phoneNumber":priceValidation?.billing_info?.contact_number,
    "postal_code":priceValidation?.billing_info?.postal_index_code,
    "email":priceValidation?.billing_info?.email,
    "address":priceValidation?.billing_info?.address_line_1
  })
  },[priceValidation])

  return (
    <ModalWrapper
      open={isModalOpen}
      onCancel={() => closeModal()}
      centered={true}
      footer={null}
      style={{minWidth:"40vw"}}
    >
      <span className="plan">
        <InvoiceIcon /> &nbsp; Billing Information
      </span>
      <Divider />
      <Form onFinish={saveInfo} form={form}>
        <Row>
          <Col span={24}>
            <Flex spaceBetween>
              <div>
                <Tag>First name</Tag>
                <Form.Item
                  name={'firstName'}
                  rules={[
                    {
                      required:true,
                      pattern: /^[^0-9]*[a-zA-Z]/,
                      message: 'First name should not begin with number',
                    },
                    {
                      required:true,
                      pattern: /^.{3,}$/,
                      message: 'First name should atleast 3 characters',
                    },
                    {
                      required:true,
                      pattern: /^.{1,15}$/,
                      message: 'First name should not more than 15 characters',
                    },
                  ]}
                >
                  <CustomInput />
                </Form.Item>
              </div>
              <div>
                <Tag>Last Name</Tag>
                <Form.Item
                  name={'lastName'}
                  rules={[
                    {
                      required:true,
                      pattern: /^[^0-9]*[a-zA-Z]/,
                      message: 'Last name should not begin with number',
                    },
                    {
                      required:true,
                      pattern: /^.{1,15}$/,
                      message: 'Last name should not more than 15 characters',
                    },
                  ]}
                >
                  <CustomInput />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <div>
                <Tag>Company name</Tag>
                <Form.Item
                  name={'companyName'}
                  rules={[
                    {
                      required:true,
                      pattern: /^[A-Za-z0-9.,@ \-]+$/,
                      message: 'Enter valid characters in company name',
                    },
                  ]}
                >
                  <CustomInput />
                </Form.Item>
              </div>
              <div>
                <Tag>Email Address</Tag>
                <Form.Item
                  name={'email'}
                  rules={[
                    {
                      required:true,
                      type: 'email',
                      message: 'Enter a valid email address',
                    },
                  ]}
                >
                  <CustomInput />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <div>
                <Tag>Phone Number</Tag>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required:true,
                      pattern: /^[0-9/+]*$/,
                      message: 'Please give only numbers',
                    },
                    {
                      required:true,
                      pattern: /^.{10,16}$/,
                      message: 'Phone number must be 10 to 16 digits',
                    },
                  ]}
                >
                  <CustomInput />
                </Form.Item>
              </div>
              <div>
                <Tag>Address</Tag>
                <Form.Item
                  name="address"
                >
                  <CustomInput />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <div>
                <Tag>Country</Tag>
                <Form.Item name={'country'}>
                  <A.LocationSelect
                    onChange={e => {
                      handleCountry(e);
                      makeButtonEnable();
                    }}
                    value={accountCountry}
                    style={{width:"300px"}}
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
              </div>
              <div>
                <Tag>State</Tag>
                <Form.Item name={'state'}>
                  <A.LocationSelect
                    onChange={e => {
                      handleProvince(e);
                      makeButtonEnable();
                    }}
                    value={selectedProvince}
                    disabled={!accountProvince}
                    style={{width:"300px"}}
                  >
                    {!accountProvince && (
                      <option value="" disabled selected>
                        Select state
                      </option>
                    )}
                    {accountProvince?.length > 0 &&
                      accountProvince?.map((data, ind) => (
                        <option
                          className="option"
                          value={data.id}
                          selected={defaultProvince === data.id}
                          key={ind}
                        >
                          {data.name}
                        </option>
                      ))}
                  </A.LocationSelect>
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <div>
                <Tag>City</Tag>
                <Form.Item name="city">
                  <A.LocationSelect
                    placeholder="Select city"
                    onChange={e => {
                      setSelectedCity(e.target.value);
                      makeButtonEnable();
                    }}
                    value={selectedCity}
                    disabled={!accountCity}
                    style={{width:"300px"}}
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
                          selected={defaultCity === data.id}
                          key={ind}
                        >
                          {data.name}
                        </option>
                      ))}
                  </A.LocationSelect>
                </Form.Item>
              </div>
              <div>
                <Tag>Zip Code</Tag>
                <Form.Item
                 
                  name={'postal_code'}
                  rules={[
                    {
                      required:true,
                      pattern: /^[0-9]{5,6}$/,
                      message: 'Enter only 5 or 6 digits postal code',
                    },
                  ]}
                >
                  <CustomInput />
                </Form.Item>
              </div>
            </Flex>
          </Col>
         <Col span={24}>
         <Flex end>
            <SaveButton
              style={{
                marginRight: '10px',
                color: '#4AACEA',
                background: 'white',
              }}
              onClick={() => {
                setIsModalOpen(false);
                close(false);
              }}
            >
              Cancel
            </SaveButton>
            <SaveButton htmlType="submit">Update</SaveButton>
          </Flex>
         </Col>
        </Row>
      </Form>
    </ModalWrapper>
  );
};

const fields = [
  {
    id: 1,
    label: 'First Name',
    name: 'First_Name',
    error: 'please Enter FirstName',
  },
  {
    id: 2,
    label: 'Last Name',
    name: 'Last_Name',
    error: 'please Enter LastName',
  },
  {
    id: 3,
    label: 'Business Name',
    name: 'Business_Name',
    error: 'please Enter BusinessName',
  },
  {
    id: 4,
    label: 'Email ID',
    name: 'Email_Id',
    error: 'please Enter EmailId',
  },
  {
    id: 5,
    label: 'Phone Number',
    name: 'Phone_Number',
    error: 'please Enter PhoneNumber',
  },
  {
    id: 6,
    label: 'Country',
    name: 'Country',
    error: 'please Enter Country',
  },
  {
    id: 7,
    label: 'City',
    name: 'City',
    error: 'please Enter City',
  },
  {
    id: 8,
    label: 'Zip Code',
    name: 'Zip_Code',
    error: 'please Enter ZipCode',
  },
];
export default EditPopover;
