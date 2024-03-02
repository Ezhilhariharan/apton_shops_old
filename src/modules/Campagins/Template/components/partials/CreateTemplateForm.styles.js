import { Button, Divider, Form, Input, Radio, Select, Typography } from 'antd';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import Flex from '@components/common/Flex';
import CallLinkIcon from '../../../../../components/icons/CallLinkIcon';

const { Paragraph, Text } = Typography;

export const ScrollWrapper = styled.div`
  over-flow: auto;
`;

export const MainHeaderText = styled.div`
  color: ${lightColorsTheme.darkBlack};
  font-size: 1rem;
  font-weight: 700;
`;
export const RightContentWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${lightColorsTheme.headerInputBackground} !important;
  margin-right: 10px;
`;
export const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #4d4d4d;
`;
export const Video = styled.video`
  z-index: 0;
  position: relative !important;
  object-fit: cover;
  border-radius: 10px;
  width: 80px;
  height: 80px;
  margin: 10px 20px 0px 0px;
`;
export const TemplateHeaderWrapper = styled.div`
  .button {
    border: 1px solid ${lightColorsTheme.primary};
    background-color: ${lightColorsTheme.primary} !important;
    color: white;
    margin-bottom: 10px;
    &:focus {
      border: 1px solid ${lightColorsTheme.primary};
      background-color: ${lightColorsTheme.primary} !important;
    }
  }
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    left: 5px;
    background-color: #ffffff;
    border-radius: 8px;
    width: auto;
    box-shadow: 4px 4px 14px rgba(79, 92, 128, 0.15);
    padding: 8px;
    z-index: 2;
    cursor: pointer;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;
export const ButtonRow = styled(Flex)`
  margin: 15px 0 15px 0;
  .checkBox {
    margin-top: 8px;
  }
  .buttonIcon {
    width: 25px;
    height: 25px;
    margin: 9px 5px;
    cursor: pointer;
  }
`;
export const InputTag = styled(Input)`
  height: 40px;
  border-radius: 5px;
  background-color: ${lightColorsTheme.headerInputBackground} !important;
  border: none !important;
  padding: 0 10px !important;
  &:focus {
    border: 1px solid ${lightColorsTheme.primary};
  }
  .buttonText {
    width: 150px;
  }
  .ant-input {
    background-color: ${lightColorsTheme.headerInputBackground};
  }
`;
export const HeaderTextWrapper = styled.div`
  .button {
    border: 1px solid ${lightColorsTheme.primary};
    background-color: ${lightColorsTheme.primary} !important;
    color: white;
    margin-bottom: 10px;
    &:focus {
      border: 1px solid ${lightColorsTheme.primary};
      background-color: ${lightColorsTheme.primary} !important;
    }
  }
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    left: 5px;
    background-color: #ffffff;
    border-radius: 8px;
    width: auto;
    box-shadow: 4px 4px 14px rgba(79, 92, 128, 0.15);
    padding: 8px;
    z-index: 2;
    cursor: pointer;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .headerDefaultInput {
    height: 40px;
    width: 100%;
    border-radius: 5px;
    background-color: ${lightColorsTheme.headerInputBackground} !important;
    border: none !important;
    outline: none;
    padding: 0 15px;
    &:focus {
      border: 1px solid ${lightColorsTheme.primary} !important;
      border-radius: 5px;
    }
  }
`;
export const VariableName = styled(Paragraph)`
  font-size: 16px;
  webkit-font-weight: 700;
  color: #181818;
  margin-left: 10px;
  width: 170px;
  padding: 0 10px 0 10px;
  margin: 3px 0 3px 0 !important;
  line-height: 35px;
  background: #f8f8fa;
  .ant-typography {
    margin-bottom: 0px !important;
  }
`;
export const QuickReplyInput = styled(InputTag)`
  // padding: 0px 10px;
  width: 250px;
  height: 40px;
  // color: ${lightColorsTheme.primary} !important;
  margin: 0 10px;
  .Stop_promotions {
    padding-left: 20px !important;
    margin-left: 20px !important;
  }
`;
export const CountryCode = styled(InputTag)`
  padding: 5px 10px;
  width: 70px;
  height: 40px;
  // margin: 0 5px;
`;
export const MediaUploader = styled.div`
  display: flex;
  input[type='file'] {
    display: none;
  }
  width: 450px;
  height: 100px;
  // margin: auto;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(249, 249, 249, 1);
  border: 1px dashed rgba(228, 232, 239, 1);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: #4d4d4d;
  margin: 15px 0;

  .custom-file-upload {
    border: none;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 190px;
    height: 40px;
    padding: 10px;
    border-radius: 6px;
    margin: 0 20px 0 0;
    color: black;
    font-weight: 500;
    font-size: 14px;
  }
  .uploadIcon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .uploadContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .textThick {
      font-weight: 600;
      font-size: 14px;
      color: black;
    }
    .textThin {
      font-weight: 500;
      font-size: 12px;
      color: grey;
    }
  }
`;
export const BodyWrapper = styled.div`
  .exampleText {
    color: ${lightColorsTheme.primary};
    font-size: 0.875rem;
    font-weight: 400;
  }
  .textAreaStyles {
    width: 100%;
    height: 120px;
    padding: 10px;
    background-color: #f4f4f5;
    border-radius: 5px;
    // border: 0px solid #f4f4f5 !important;
    border: none !important;
    outline: none;
    &:focus {
      border: 1px solid ${lightColorsTheme.primary} !important;
      // border: 1px solid green;
      border-radius: 5px;
    }
  }
  .marginTop {
    margin-top: 20px;
  }
`;
export const ParagraphError = styled(Text)`
  width: 100%;
  height: 100%;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 133.33%;
  color: #f25511;
  padding: 20px 0;
`;
export const SubmitButton = styled(Button)`
  background-color: ${lightColorsTheme.primary} !important;
  color: ${lightColorsTheme.additionalBackground} !important;
  padding: 0;
  border-radius: 5px;
  width: 142px;
  height: 40px;
  ${props =>
    props.disabled &&
    `
    background-color: ${lightColorsTheme.topHeaderBorderColor} !important;
color: ${lightColorsTheme.grayTextColor} !important;
padding: 0;
    `};
`;
export const AddButton = styled(Button)`
  background-color: ${lightColorsTheme.primary};
  color: ${lightColorsTheme.additionalBackground};
  padding: 0;
  border-radius: 5px;
  width: 122px;
  height: 40px;
  ${props =>
    props.disabled &&
    `
    background-color: ${lightColorsTheme.topHeaderBorderColor} !important;
color: ${lightColorsTheme.grayTextColor};
padding: 0;
    `};
  &:hover {
    background-color: ${lightColorsTheme.primary};
  }
  &:focus {
    background-color: ${lightColorsTheme.primary};
  }
`;
export const BottomWrapper = styled.div`
  .selectAction {
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;
export const AddVariable = styled(Button)`
  padding: 0;
  width: 131px;
  height: 40px;
  color: ${lightColorsTheme.primary} !important;
  border: 2px solid ${lightColorsTheme.primary} !important;
  background-color: ${lightColorsTheme.additionalBackground} !important;
  margin-right: 16px;
`;
export const ColourTemplateWrapper = styled.div`
  background-color: ${lightColorsTheme.templateBackground};
  width: 100%;
  margin-bottom: 15px;
  height: auto;
  border-radius: 10px;
  padding: 10px 10px;
  overflow: scroll;
  .parent {
    background-color: ${lightColorsTheme.additionalBackground};
    width: auto;
    border-radius: 10px;
  }
  .textParent {
    padding: 10px;
  }
  .marginTopVideo {
    margin-top: 10px;
  }
`;
export const ChatHeaderText = styled('div')`
  width: 100%;
  color: black;
  font-weight: 800;
  font-size: 1rem;
  // line-break: loose;
  padding: 0 0 5px 0;
`;
export const ChatBodyText = styled('div')`
  font-weight: 400;
  color: ${lightColorsTheme.textColorLight};
  font-size: 0.875rem;
  white-space: pre-line;
  // line-break: anywhere;
  // line-break: normal;
  width: 100%;
  // height: auto;
  // margin-top: 20px;
`;

export const ChatFooterText = styled('div')`
  color: ${lightColorsTheme.grayText};
  font-size: 0.875rem;
  font-weight: 400;
  padding-top: 5px;
`;
export const ChatCurrentTime = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-iems: flex-end;
  padding-right: 8px;
  padding-bottom: 8px;
`;
export const ChatButtons = styled('div')`
  flex: 100%;
  background: ${lightColorsTheme.additionalBackground};
  padding: 10px 40px;
  display: flex;
  width: 260px;
  height: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 15px !important;
  color: ${lightColorsTheme.primary};
`;

export const SelectTag = styled(Select)`
  .ant-select-selection-placeholder {
    margin-top: 4px;
  }
  // width: 248px !important;
  border-radius: 5px;
  height: 40px !important;
  vertical-align: middle;
  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
  .ant-select-selector {
    height: 40px !important;
    background-color: ${lightColorsTheme.headerInputBackground} !important;
    border: none !important;
  }
`;
export const QuickReplySelectTag = styled(Select)`
  .ant-select-selection-placeholder {
    margin-top: 4px;
  }
  border-radius: 5px;
  height: 40px !important;
  vertical-align: middle;
  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
  .ant-select-selector {
    height: 40px !important;
    background-color: ${lightColorsTheme.headerInputBackground} !important;
    border: none !important;
    width: 200px !important;
  }
  padding: 0 !important;
`;
export const RightInputWrapper = styled.div`
  margin-right: 20px;
  width: 100%;
`;
export const InputLabel = styled.div`
  color: ${lightColorsTheme.textColorLight};
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 15px;
`;
export const MarginFlex = styled(Flex)`
  margin-bottom: 20px;
`;
export const HeaderText = styled.div`
  font-size: 1rem;
  color: ${lightColorsTheme.textColorLight};
  font-weight: 700;
  .optionalText {
    font-weight: 400;
    font-size: 12px;
    color: ${lightColorsTheme.grayText};
  }
`;
export const AddText = styled.div`
  color: ${lightColorsTheme.grayText};
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const BodyAddText = styled.div`
  color: ${lightColorsTheme.grayText};
  font-size: 0.875rem;
  font-weight: 400;
`;
export const MediaTypeSelect = styled(SelectTag)`
  width: 176px !important;
  margin-right: 30px;
`;
export const MediaRadioWrapper = styled.div`
  .radioText {
    margin-right: 30px;
    font-size: 0.875rem;
    font-weight: 700;
    color: ${lightColorsTheme.textColorLight};
  }
`;
export const HeaderTextInput = styled(InputTag)`
  width: 100%;
  border-radius: 5px;
`;
export const TextWrapper = styled.div`
  margin-top: 10px;
`;
export const RemainingText = styled.div`
  margin-bottom: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${lightColorsTheme.textColorLight};
  .moveRight {
    margin-left: 190px;
  }
`;
export const DeleteButton = styled(Button)`
  height: 40px;
  width: 40px;
  border: none !important;
  border-radius: 5px;
  background: ${lightColorsTheme.headerInputBackground};
  margin-left: 10px;
  margin-right: 18px;
  padding: 0;
  vertical-align: middle;
  paddin-bottom: -2px;
`;
export const ButtonInputTextTag = styled(InputTag)`
  width: 200px;
`;
export const CallToActionSelect = styled(SelectTag)``;
export const ActionInput = styled(InputTag)`
  ${props => !props.noMargin && `margin-left: 20px`};
`;
export const AddSampleButton = styled(Button)`
  width: 171px;
  height: 40px;
  padding: 0;
  font-weight: 700;
  font-size: 1rem;
  color: ${lightColorsTheme.additionalBackground};
  background-color: ${lightColorsTheme.primary};
  &:hover {
    color: ${lightColorsTheme.additionalBackground};
    background-color: ${lightColorsTheme.primary};
  }
  &:focus {
    color: ${lightColorsTheme.additionalBackground};
    background-color: ${lightColorsTheme.primary};
  }
`;
