import styled from 'styled-components';
import { Checkbox, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import loginBackground from '@assets/images/bg.png';
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  media,
} from '@theme/styles/constants';
import { Input as commonInput } from '@components/common/Inputs/Input';
import { BaseFormItem } from '@components/common/form/BaseForm/BaseFormItem';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
export const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 17px;
  margin-top: -20px
  font-weight: ${FONT_WEIGHT.bold};
`;
export const Wrapper = styled.div`
  height: 100vh;
  //width: 100vw;
  display: flex;
`;
export const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url(${loginBackground}) no-repeat center;
  background-size: cover;
  position: relative;
`;
export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${props => (props.page ? `margin-top: 6rem;` : `margin-top: 3rem;`)};
  filter: drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.15));
`;
export const FormWrapper = styled.div`
  padding: 30px 2.5rem 2.5rem 2.5rem;
  width: 30rem;
  // overflow: auto;
  background-color: ${lightColorsTheme.additionalBackground};
  border-radius: ${BORDER_RADIUS};
  border-radius: 20px;

  @media only screen and ${media.xs} {
    padding: 30px 1.25rem;
    width: 23rem;
    max-height: calc(100vh - 3rem);
  }

  @media only screen and ${media.md} {
    padding: 30px 1rem 30px;
    width: 38rem;
    max-height: calc(100vh - 3rem);
  }
`;
export const FormTitle = styled.div`
  color: var(--primary-color);
  font-weight: 700;
  font-size: 24px;
  @media only screen and ${media.xs} {
    margin-bottom: 0.625rem;
    font-size: ${FONT_SIZE.lg};
    font-weight: ${FONT_WEIGHT.bold};
    line-height: 1.5625rem;
  }

  @media only screen and ${media.md} {
    margin-bottom: 0.875rem;
    font-size: ${FONT_SIZE.xxl};
    font-weight: ${FONT_WEIGHT.bold};
    line-height: 1.9375rem;
  }

  @media only screen and ${media.xl} {
    margin-bottom: 0.9375rem;
    font-size: ${FONT_SIZE.xxxl};
    font-weight: ${FONT_WEIGHT.extraBold};
    line-height: 2.125rem;
  }
`;
export const FormCheckbox = styled(Checkbox)`
  display: flex;
  padding-left: 0.125rem;

  & .ant-checkbox-inner {
    border-radius: 3px;
    transform: scale(1.375);
  }

  & .ant-checkbox-input {
    transform: scale(1.375);
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
export const Text = styled.span`
  color: var(--text-main-color);
  font-size: ${FONT_SIZE.xs};
  font-weight: ${FONT_WEIGHT.regular};
`;
export const LinkText = styled(Text)`
  text-decoration: underline;
  color: var(--primary-color);
`;
export const SubmitButton = styled(Button)`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  width: 100%;
`;
export const SocialButton = styled(Button)`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.bold};
  color: var(--primary-color);
  border: none;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  border-radius: 8px;
  color: ${lightColorsTheme.darkBlack};
  :hover {
    background-color: transparent;
    color: ${lightColorsTheme.darkBlack};
    border-radius: 8px;
  }
  &:focus {
    background-color: transparent;
    color: ${lightColorsTheme.darkBlack};
    border-radius: 8px;
  }
  &.active {
    background-color: transparent;
    color: ${lightColorsTheme.darkBlack};
    border-radius: 8px;
  }
`;
export const FooterWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
`;
export const BackIcon = styled(LeftOutlined)`
  font-size: 0.75rem;
  margin-right: 0.75rem;
`;
export const BackWrapper = styled.div`
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1.25rem;
`;
export const SocialIconWrapper = styled.div`
  display: flex;
  margin-right: 0.8125rem;
  @media only screen and ${media.xs} {
    margin-right: 0.625rem;
  }

  @media only screen and ${media.md} {
    margin-right: 0.8125rem;
  }
`;

export const outerDiv = styled.div`
  width: 35px;
  height: 35px;
  padding: 2px;
  border: 2px solid #4aacea;
  border-radius: 50%;
`;
export const innerDiv = styled.div`
  width: 28px;
  height: 28px;
  // background: #4aacea; 
  margin: -14px;
  border-radius: 50%;
`;

export const FormInput = styled(commonInput)`
  color: var(--text-main-color);
  background: transparent;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 400;
  padding: 11.5px 10px;
  & input.ant-input {
    background: transparent;
  }

  &::placeholder {
    color: #999999;
  }
`;

export const FormItem = styled(BaseFormItem)`
  margin-bottom: 0.75rem;
  & .ant-form-item-control-input {
    min-height: 3.125rem;
  }

  & .ant-form-item-explain-error {
    font-size: ${FONT_SIZE.xs};
  }

  & label {
    color: var(--primary-color);
    font-size: ${FONT_SIZE.xs};
    line-height: 1.25rem;
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }
`;
