import { Input as CommonInput } from '@components/common/Inputs/Input'
import { BaseFormItem } from '@components/common/form/BaseForm/BaseFormItem'
import { FONT_SIZE } from '@theme/styles/constants'
import styled from 'styled-components'
import whatsAppBackground from '@assets/images/chatBg.png'

export const FormInput = styled(CommonInput)`
  color: var(--text-main-color);
  background: transparent;

  & input.ant-input {
    background: transparent;
  }
`

export const FormItem = styled(BaseFormItem)`
  margin-bottom: 0.75rem;
  & .ant-form-item-control-input {
    min-height: 3.125rem;
  }

  & .ant-form-item-explain-error {
    font-size: ${FONT_SIZE.xs};
  }

  & label {
    color: #4d4d4d !important;
    font-size: 1rem !important;
    font-weight: 700 !important;
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }
`

export const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url(${whatsAppBackground});
  background-size: cover;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
`
