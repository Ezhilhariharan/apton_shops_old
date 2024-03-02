import { Button, Form, Tag } from 'antd';
import React, { Fragment, useState } from 'react';
import * as S from '../SignUp/Authlayout';
import { Typography } from 'antd';
import Flex from '@components/common/Flex';
import { BaseFormItem } from '@components/common/form/BaseForm/BaseFormItem';
import { Select } from '@components/common/form/select/Select/Select';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../../../hooks/useResponsive';
import { TitleBox } from './StepOne';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import styled from 'styled-components';
import { NavButton } from './StepOne';
import { updateStepOneValues } from '../../../actions';
import { useDispatch } from 'react-redux';

const tagRender = props => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};
const StyledBrandFlex = styled(Flex)`
  margin: 0.3rem;
`;
const BrandTypeNameStyle = styled.div`
  color: ${lightColorsTheme.textColorLight};
font-weight: 400;
font-size: 17px;
color: #4D4D4D;
  margin-left: 16px;
`;
const OtherButton = styled(Button)`
  background-color: ${lightColorsTheme.primary} !important;
  color: ${lightColorsTheme.additionalBackground} !important;
  height: 40px;
  width: 100%;
  border-radius: 10px;
  font-size: 17px;
  color: #ffffff;
  font-weight: 400;
`;
const StyledSelect = styled(Select)`
  color: #181818;
  font-size: 17]px;
  .ant-select-selection-placeholder {
    color: #999999;
    font-size: 17px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
  .ant-select-selector {
    border-radius: 10px !important;
    height: 50px !important;
  }

  .ant-select-selector .ant-select-selection-item {
    line-height: 46px !important;
  }

  .ant-select-item {
    font-size: 17px !important;
    color: #4d4d4d;
  }
`;
const OtherInput = styled(S.FormInput)`
  font-weight: 500;
  .ant-input:placeholder-shown {
    color: #181818;
    font-size: 17px;
    font-weight: 400;
  }
`;
const StepTwo = ({
  updateOnboardingSteps,
  onboardingInitiate,
  onboardingStepOneValues,
  brandCategoryList,
  countryList,
  setOpen,
}) => {
  const [showOtherCategory, setOtherCatgory] = useState(false);
  const navigate = useNavigate();

  const updateOtherCategory = value => {
    setOtherCatgory(value);
  };

  const onFinish = value => {
    if (value) {
      onboardingInitiate(onboardingStepOneValues, value, navigate, setOpen);
    }
    dispatch(updateStepOneValues());
  };
  const { mobileOnly } = useResponsive();
  const originalBrandTypes = brandCategoryList?.filter(
    brandType => brandType?.code
  );
  const options = originalBrandTypes?.map(item => ({
    label: item?.name,
    value: item?.name,
    logo: item?.logo_photo,
  }));
  const withOtherOptions = [
    ...options,
    {
      label: 'Other',
      value: 'Other',
    },
  ];
  const handleBrandSelection = val => {
    if (val === 'Other') {
      updateOtherCategory(true);
    } else {
      updateOtherCategory(false);
    }
  };
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Flex center style={{ marginBottom: 10 }}>
        <TitleBox level={4}>
          {'Enter '}{' '}
          {
            <span style={{ color: lightColorsTheme.primary }}>
              brand category
            </span>
          }
        </TitleBox>
      </Flex>
      <Form
        style={{
          marginRight: mobileOnly ? '1rem' : '4rem',
          marginLeft: mobileOnly ? '1rem' : '4rem',
        }}
        layout="vertical"
        onFinish={onFinish}
      >
        <div style={{ height: '350px' }}>
          <BaseFormItem
            label="Brand Category"
            name="brand_id"
            rules={[
              {
                required: showOtherCategory === false ? true : false,
                message: 'Please select brand category',
              },
            ]}
            style={{
              fontWeight: 600,
              maxHeight: '50vh',
              border: '1 px solid red',
            }}
          >
            <StyledSelect
              mode="tag"
              size="large"
              showArrow
              allowClear={true}
              tagRender={tagRender}
              width={'100%'}
              placeholder="Select your brand category"
              onChange={handleBrandSelection}
              //options={withOtherOptions}
              style={{ fontWeight: 600}}
              optionLabelProp={withOtherOptions}
              // dropdownRender={menu => (
              //   <>
              //     {menu}
              //     <Divider
              //       style={{
              //         margin: '8px 0',
              //       }}
              //     />
              //     <Flex center style={{ margin: 5 }}>
              //       <Button
              //         type="primary"
              //         style={{ width: '100%', borderRadius: 10 }}
              //         onClick={() => {
              //           updateOtherCategory(true);
              //         }}
              //       >
              //         Other
              //       </Button>
              //     </Flex>
              //   </>
              // )}
            >
              {withOtherOptions?.map((data, ind) => {
                return (
                  <>
                    <Option key={ind} value={data.value}>
                      <StyledBrandFlex alignCenter>
                        {data.label === 'Other' ? (
                          <>
                            <OtherButton>Other</OtherButton>
                          </>
                        ) : (
                          <>
                            <img
                              src={data?.logo}
                              width="40px"
                              height="40px"
                            ></img>
                            <BrandTypeNameStyle>
                              {data?.label}
                            </BrandTypeNameStyle>
                          </>
                        )}
                      </StyledBrandFlex>
                    </Option>
                  </>
                );
              })}
            </StyledSelect>
          </BaseFormItem>
          {showOtherCategory && (
            <BaseFormItem
              label="Mention Brand Category"
              name="other_category"
              rules={[
                { required: true, message: 'Please enter your brand category' },
              ]}
              style={{ fontWeight: 600 }}
            >
              <OtherInput
                size="large"
                placeholder="Please type your brand category"
              />
            </BaseFormItem>
          )}
          <BaseFormItem
            label="Location "
            name="location_id"
            rules={[{ required: true, message: 'Please enter your location' }]}
            style={{ fontWeight: 600 }}
          >
            <StyledSelect
              mode="tages"
              size="large"
              placeholder="Select your location"
              showArrow
              tagRender={tagRender}
              width={'100%'}  
              options={countryList.map(item => ({
                label: item?.name,
                value: item?.id,
              }))}
            />  
          </BaseFormItem>
        </div>
        <S.FooterWrapper>
          <Flex spaceBetween style={{marginTop: '-40px'}}>
            <NavButton
              type="default"
              onClick={() => {
                updateOnboardingSteps(1);
              }}
            >
              Back
            </NavButton>
            <NavButton save={'save'} type="primary" htmlType="submit">
              Save
            </NavButton>
          </Flex>
        </S.FooterWrapper>
      </Form>
    </Fragment>
  );
};

export default StepTwo;
