import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Divider, Form, FormInput, Upload } from 'antd';
import { lightColorsTheme } from '../../../theme/styles/light/lightTheme';
import UploadButton from '@components/common/UploadButton/UploadButton';
import nehasDefaultImage from '@public/neha bags logo 1.jpg';
import * as B from '../components/index.styles';
import { Input } from '@components/common/Inputs/Input';
import BrandRoleMailIcon from '../../../components/icons/BrandRoleMailIcon';
const SaveButton = styled(B.UpgardePlanButton)`
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
const BrandInformation = ({
  currentUser,
  brandUpdate,
  uploadBrandLogo,
  imageUrl,
  getCountries,
  country,
  getProvince,
  province,
  getCity,
  city,
  brandInfo,
  switchedBrand,
  selectedUser,
  saveSelectedCurrentUser,
  removeBrandLogo,
}) => {
  const [form] = Form.useForm();
  const [image, setImageUrl] = useState();
  const [formValue, setFormValue] = useState();
  const [enableButton, setEnableButton] = useState(false);
  const [inputValues, setInputValues] = useState({
    brand_name: brandInfo?.name,
    brand_link: brandInfo?.website_url,
    brand_email: brandInfo?.contact_email,
    brand_phone_number: brandInfo?.contact_number,
    brand_location: brandInfo?.location?.address_line_1,
    postal_code: brandInfo?.location?.postal_index_code,
    country: brandInfo?.location?.country_id
      ? brandInfo?.location?.country_id
      : '',
    state: brandInfo?.location?.province_id
      ? brandInfo?.location?.province_id
      : '',
    city: brandInfo?.location?.city_id ? brandInfo?.location?.city_id : '',
    applyToAllBrand: brandInfo?.is_apply_all ? 1 : 0,
  });
  const [brandLogo, setBrandLogo] = useState(brandInfo?.logo_photo);
  const [brandSlug, setBrandSlug] = useState(selectedUser[0]?.slug);
  const saveHandler = e => {
    if (inputValues) {
      brandUpdate(inputValues, brandSlug);
      setFormValue(inputValues);
    }
  };
  useEffect(() => {
    const selectedBrand = currentUser?.brands?.filter(
      data => data.id === switchedBrand.id
    );
    saveSelectedCurrentUser(selectedBrand);
  }, [switchedBrand]);
  useEffect(() => {
    setBrandSlug(selectedUser[0]?.slug);
  }, [selectedUser, currentUser]);
  useEffect(() => {
    setBrandLogo(brandInfo?.logo_photo);
  }, [selectedUser, switchedBrand, brandInfo]);
  useEffect(() => {
    if (brandSlug && imageUrl?.path_url) {
      brandUpdate(undefined, brandSlug, imageUrl?.path_url);
    }
  }, [imageUrl]);
  useEffect(() => {
    getCountries('brandPage');
  }, []);
  useEffect(() => {
    setInputValues({
      brand_name: brandInfo?.name,
      brand_link: brandInfo?.website_url,
      brand_email: brandInfo?.contact_email,
      brand_phone_number: brandInfo?.contact_number,
      brand_location: brandInfo?.location?.address_line_1,
      postal_code: brandInfo?.location?.postal_index_code,
      country: brandInfo?.location?.country_id
        ? brandInfo?.location?.country_id
        : '',
      state: brandInfo?.location?.province_id
        ? brandInfo?.location?.province_id
        : '',
      city: brandInfo?.location?.city_id ? brandInfo?.location?.city_id : '',
      applyToAllBrand: brandInfo?.is_apply_all ? 1 : 0,
    });
    form.setFieldsValue({
      applyToAllBrand: brandInfo?.is_apply_all ? 1 : 0,
    });
    form.setFieldsValue({
      brand_name: brandInfo?.name,
      brand_email: brandInfo?.contact_email,
      brand_location: brandInfo?.location?.address_line_1,
      postal_code: brandInfo?.location?.postal_index_code,
      brand_link: brandInfo?.website_url,
      brand_phone_number: brandInfo?.contact_number,
    });
  }, [brandInfo, switchedBrand, selectedUser]);
  useEffect(() => {
    if (inputValues?.country) {
      getProvince(inputValues?.country, 'brandPage');
    }
  }, [inputValues?.country]);
  useEffect(() => {
    if (inputValues?.state) {
      getCity(inputValues?.state, 'brandPage');
    }
  }, [inputValues?.state]);
  const updateFileUpload = (fileInfo, file) => {
    if (file?.status === 'done') {
      const updatedTime = new Date()?.getTime();
      const timeStamp = `_${updatedTime}`;
      const fileName = file && file?.name?.split('');
      const t = fileName?.lastIndexOf('.');
      fileName?.splice(t, 0, timeStamp);
      const timeStampFileName = fileName?.join('')?.split(' ')?.join('');
      const filePath = fileInfo?.split(',')[1];
      uploadBrandLogo(timeStampFileName, filePath);
    }
  };
  const singleFileUploader = (fileInfo, file) => {
    updateFileUpload(fileInfo, file);
  };
  const makeButtonEnable = () => {
    setEnableButton(true);
  };
  const handleMultipleInput = e => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    makeButtonEnable();
  };
  const handleApplyToAllCheckBox = e => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.checked });
    makeButtonEnable();
  };
  return (
    <B.OuterBox>
      <div>
        <B.BrandForm onSubmitCapture={saveHandler} form={form}>
          <div className="brandLogoTitle">Your Brand logo</div>
          <B.BrandLogoWrapper>
            <UploadButton
              setImageUrl={setImageUrl}
              defaultImage={brandInfo?.logo_photo}
              singleFileUploader={singleFileUploader}
              removeBrandLogo={removeBrandLogo}
              brandSlug={brandSlug}
            />
            <div className="customWrapper">
              {/* <Button className="customBrandButton">Custom branding</Button>
                            <div className="applyCheckBoxWrapper">
                                <Form.Item name="applyToAllBrand">
                                    <Checkbox
                                        name="applyToAllBrand"
                                        onChange={handleApplyToAllCheckBox}
                                        checked={inputValues?.applyToAllBrand ? true : false}
                                        disabled={!brandInfo?.logo_photo}
                                    />
                                    <span className="applyText">Apply to all brands</span>
                                </Form.Item>
                            </div> */}
            </div>
          </B.BrandLogoWrapper>
          <B.RecomendedText>Recommended Size (228x43)</B.RecomendedText>
          <Divider />

          <div className="brandDetailsText">Brand Details</div>
          <div className="formParent">
            <div className="formContainer">
              <div className="inputWrapper">
                <div className="brandInputLabel">Brand name</div>
                <Form.Item
                  name="brand_name"
                  rules={[
                    {
                      pattern: /^[^0-9]*[a-zA-Z]/,
                      message: 'Brand name should not begin with number',
                    },
                    {
                      pattern: /^.{1,15}$/,
                      message: 'Brand name should not more than 15 characters',
                    },
                  ]}
                >
                  <B.CustomInput
                    type="text"
                    value={inputValues.brand_name}
                    name={'brand_name'}
                    placeholder={'Enter brand name'}
                    onChange={e => {
                      handleMultipleInput(e);
                    }}
                  ></B.CustomInput>
                </Form.Item>
                <div className="brandInputLabel">Brand Email Address</div>
                <Form.Item
                  name="brand_email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Enter a valid email address',
                    },
                  ]}
                >
                  <B.CustomInput
                    name={'brand_email'}
                    placeholder="Enter brand email"
                    value={inputValues?.brand_email}
                    onChange={e => {
                      handleMultipleInput(e);
                    }}
                  />
                </Form.Item>
                <div className="brandInputLabel">Brand Address</div>
                <Form.Item name="brand_location">
                  <B.CustomInput
                    name={'brand_location'}
                    placeholder="Enter brand address"
                    value={inputValues?.brand_location}
                    onChange={e => {
                      handleMultipleInput(e);
                    }}
                  />
                </Form.Item>

                <div className="brandInputLabel">State</div>
                <Form.Item name={'state'} className="removeDefaultArrow">
                  <B.LocationSelect
                    name={'state'}
                    onChange={handleMultipleInput}
                    value={inputValues?.state}
                    //disabled={!province}
                  >
                    {!province && (
                      <option value="" disabled selected>
                        Select state
                      </option>
                    )}
                    {province?.length > 0 &&
                      province?.map((data, ind) => (
                        <option
                          className="option"
                          value={data.id}
                          selected={inputValues?.state === data.id}
                          key={ind}
                        >
                          {data.name}
                        </option>
                      ))}
                  </B.LocationSelect>
                </Form.Item>
                <div className="brandInputLabel">Zip Code</div>
                <Form.Item
                  name="postal_code"
                  rules={[
                    {
                      pattern: /^[0-9]{5,6}$/,
                      message: 'Enter only 5 or 6 digits postal code',
                    },
                  ]}
                >
                  <B.CustomInput
                    name={'postal_code'}
                    placeholder="000 000"
                    value={inputValues?.postal_code}
                    onChange={e => {
                      handleMultipleInput(e);
                    }}
                  />
                </Form.Item>
              </div>
              <div>
                <div className="brandInputLabel">Website URL</div>
                <Form.Item
                  name="brand_link"
                  rules={[
                    {
                      pattern:
                        /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/,
                      message: 'Please give valid website',
                    },
                  ]}
                >
                  <B.CustomInput
                    name={'brand_link'}
                    value={inputValues?.brand_link}
                    //defaultValue={brandInfo?.website_url}
                    placeholder="Enter brand website url"
                    onChange={e => {
                      handleMultipleInput(e);
                    }}
                  />
                </Form.Item>
                <div className="brandInputLabel">Brand Phone Number</div>
                <Form.Item
                  name="brand_phone_number"
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
                  <B.CustomInput
                    name={'brand_phone_number'}
                    placeholder="Enter brand phone number"
                    value={inputValues?.brand_phone_number}
                    defaultValue={brandInfo?.contact_number}
                    onChange={e => {
                      handleMultipleInput(e);
                    }}
                  />
                </Form.Item>
                <div className="brandInputLabel">Country</div>
                <Form.Item name={'country'} className="removeDefaultArrow">
                  <B.LocationSelect
                    onChange={handleMultipleInput}
                    value={inputValues?.country}
                    name={'country'}
                  >
                    <option value="" disabled selected>
                      Select country
                    </option>
                    {country?.length > 0 &&
                      country?.map((data, ind) => (
                        <option
                          className="option"
                          value={data.id}
                          selected={inputValues?.country === data.id}
                          key={ind}
                        >
                          {data.name}
                        </option>
                      ))}
                  </B.LocationSelect>
                </Form.Item>
                <div className="brandInputLabel">City</div>
                <Form.Item name={'city'} className="removeDefaultArrow">
                  <B.LocationSelect
                    onChange={handleMultipleInput}
                    value={inputValues?.city}
                    //disabled={!city}
                    name={'city'}
                  >
                    {!city && (
                      <option value="" disabled selected>
                        Select City
                      </option>
                    )}
                    {/* {defaultCity && !city && <option value={defaultCity} selected>{defaultCity}</option>} */}
                    {city?.length > 0 &&
                      city?.map((data, ind) => (
                        <option
                          className="option"
                          value={data.id}
                          selected={inputValues?.city === data.id}
                          key={ind}
                        >
                          {data.name}
                        </option>
                      ))}
                  </B.LocationSelect>
                </Form.Item>
                <SaveButton
                  htmlType="submit"
                  className="saveButton"
                  disabled={!enableButton}
                >
                  Save Changes
                </SaveButton>
              </div>
            </div>
          </div>
          <div></div>
          {/* <Divider /> */}
          {/* <div>
                    <div className="managementText">Brand Managers</div>
                    <B.RoleBox>
                        <div>
                            <div><BrandRoleMailIcon /></div>
                            <div></div>
                        </div>
                        <div className="roleEmail">freelancingabc@xyz.com</div>
                    </B.RoleBox>
                </div> */}
          {/* <Divider />
                <div>
                    <div className="managementText">Brand Management</div>
                    <div className="clickText">Click the button to delete current brand.</div>
                    <B.DeleteButton>Delete Brand</B.DeleteButton>
                </div> */}
        </B.BrandForm>
      </div>
    </B.OuterBox>
  );
};

export default BrandInformation;
