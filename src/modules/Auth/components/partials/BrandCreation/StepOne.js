import { Button, Form } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import * as S from '../SignUp/Authlayout';
import { Typography } from 'antd';
import Flex from '@components/common/Flex';
import { BaseFormItem } from '@components/common/form/BaseForm/BaseFormItem';
import UploadButton from '@components/common/UploadButton/UploadButton';
import { useResponsive } from '../../../../../hooks/useResponsive';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


export const TitleBox = styled(Typography.Title)`
  color: ${lightColorsTheme.textColorLight} !important;
  font-weight: 600;
  font-size: 24px !important;
  color: #181818 !important;
`;
export const NavButton = styled(Button)`
  width: 70px;
  height: 40px;
  background: ${props => (props.save ? '#4AACEA' : '#ffffff')};
  border-radius: 10px;
  font-weight: 700;
  border: ${props => (props.save ? 'none' : '1px solid #999999')};
  color: ${props => (props.save ? '#ffffff' : '#999999')};
  font-size: 16px;
  :hover {
    background: ${props => (props.save ? '#4AACEA' : '#ffffff')};
    border: ${props => (props.save ? 'none' : '1px solid #999999')};
    color: ${props => (props.save ? '#ffffff' : '#999999')};
  }
`;
const StepOne = ({
  onboardingStepOneValues,
  updateOnboardingSteps,
  updateStepOneValues,
  uploadCoverPhoto,
  brandLogoUrl,
  brandLogoFromOnboarding,
}) => {
  const [imageUrl, setImageUrl] = useState();
  const [filesList, setFilesList] = useState([]);
  const [fieldValue, setFieldvalue] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [form] = Form.useForm();

  const onFinish = values => {
    updateStepOneValues({
      brand_name: values?.brand_name,
      logo_photo: filesList
        ? brandLogoUrl?.path_url || brandLogoFromOnboarding?.path_url
        : null,
    });
    updateOnboardingSteps(2);
  };
  const { mobileOnly } = useResponsive();
  const brandCoverPhotoUpload = (fileInfo, file) => {
    setFilesList(fileInfo);
    if (file?.status === 'done') {
      const updatedTime = new Date()?.getTime();
      const timeStamp = `_${updatedTime}`;
      const fileName = file && file?.name?.split('');
      const t = fileName?.lastIndexOf('.');
      fileName?.splice(t, 0, timeStamp);
      const timeStampFileName = fileName?.join('')?.split(' ')?.join('');
      const filePath = fileInfo?.split(',')[1];
      uploadCoverPhoto(timeStampFileName, filePath);
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      brand_name: onboardingStepOneValues?.brand_name,
    });
  }, []);

  return (
    <Fragment >
      <Flex center >
        <TitleBox level={3}>
          {'Create a new'}{' '}
          {<span style={{ color: lightColorsTheme.primary }}>brand</span>}
        </TitleBox>
      </Flex>
      <Form
        style={{
          marginRight: mobileOnly ? '1rem' : '4rem',
          marginLeft: mobileOnly ? '1rem' : '4rem',
          marginTop: '1rem',
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <BaseFormItem
          label="Brand Name"
          name={'brand_name'}
          rules={[{ required: true, message: 'Please enter your brand name' }]}
        >
          <S.FormInput size="large" placeholder="Enter brand name" />
        </BaseFormItem>
        <BaseFormItem label="Brand Logo" name="logo_photo">
          <UploadButton
            setImageUrl={setImageUrl}
            defaultImage={onboardingStepOneValues?.logo_photo}
            brandCoverPhotoUpload={brandCoverPhotoUpload}
          />
        </BaseFormItem>
        <S.FooterWrapper style={{ marginTop: '5rem' }}>
          <Flex end>
            <NavButton save={'save'} type="primary" htmlType="submit">
              Next
            </NavButton>
          </Flex>
        </S.FooterWrapper>
      </Form>
    </Fragment>
  );
};

export default StepOne;
