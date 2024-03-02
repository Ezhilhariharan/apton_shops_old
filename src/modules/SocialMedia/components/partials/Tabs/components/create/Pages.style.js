import {
  Card,
  Button,
  Modal,
  input,
  Select,
  Typography,
  Checkbox,
  Popover,
} from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
const { Paragraph, Text } = Typography;

export const PinterestWrapper = styled(Flex)`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  height: 50px;
  margin-bottom: 10px;
  margin-top: 10px;
  .titleLength {
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Uploader = styled.div`
margin-top:9px;
background-color:#FFFFFF !important;
border:2px dashed #d9d9d9;
border-radius:10px;
width:100px;
height:100px;
maxWidth:100px;
minWidth:100px !important;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
 }
`;

export const SocialAccountsFlex = styled(Flex)`
  height: 46px;
  width: 100%;
  ${props =>
    props.borderActive &&
    `
border-bottom:1px solid #D9D9D9;`}
`;
export const Video = styled.video`
  z-index: 0;
  position: relative !important;
  object-fit: cover;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  margin: 10px 20px 0px 0px;
`;
export const MainWrapper = styled('div')`
  // border:1px solid red;
  margin-bottom: 25px;
  padding: 10px;
  width: 92%;
  background: #ffffff;
  box-shadow: 0px 4px 14px rgba(79, 92, 128, 0.1);
  border-radius: 10px;

  .SocialIconBorder {
    background: white !important;
    height: 45px;
    width: 57.9px;
    top: 1px;
    left: 0px;
    position: absolute;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .SocialIconActiveBorder {
    position: relative;
    border: 1px solid #e2e2e2;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: none;
    height: 45px;
    width: 60px;
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
    min-width: 220px;
    box-shadow: 4px 4px 14px rgba(79, 92, 128, 0.15);
    padding: 8px;
    z-index: 2;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;
export const DropDownRow = styled(Checkbox)`
  display: flex;
  height: 55px;
  width: 100%;
  cursor: pointer;
  align-items: center;
  border-radius: 4px;
  padding-left: 8px;
  z-index: 2 !importatn;
  :hover {
    background: #f8f8fa;
  }
  .row {
    display: flex;
    width: auto;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
  }
`;
export const Socialtext = styled('div')`
  font-weight: 500;
  font-size: 14px;
  color: #181818;
  margin-left: 10px;
`;
export const SocialIconsName = styled(Paragraph)`
  font-size: 14px;
  webkit-font-weight: 700;
  color: #181818;
  margin-left: 10px;
  width: 117px;
  padding: 0 10px 0 10px;
  margin: 0px 0 0 0 !important;
  .ant-typography {
    margin-bottom: 0px !important;
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
`;
export const SocialIcon = styled('div')`
  margin: 8px 13px 0 13px;
  position: relative;
  cursor: pointer;
  .span {
    position: absolute;
    background: transparent;
    bottom: 18px;
    left: 19px;
    cursor: pointer;
    width: 14px;
    height: 16px;
    border-radius: 50%;
  }
`;
export const MediaCategory = styled(Button)`
  border: none;
  color: #999999;
  font-weight: 700;
  font-size: 16px;
  background-color: white;
  border-radius: 0px;
  margin: 0 5px;
  &:hover {
    background-color: white;
  }
  &:focus {
    background-color: white;
  }
  :&.active  {
    background-color: white;
  }
  ${props =>
    props?.selectedTab &&
    `
border-bottom: 1px solid #4AACEA;
color: #4AACEA;
background-color: white;
`}
`;
export const Customize = styled(Button)`
  margin-right: 10px;
  border: 2px solid #4aacea;
  color: white;
  font-weight: 700;
  font-size: 16px;
  width: 110px;
  height: 35px;
  background-color: #4aacea;
  &:hover {
    border: 1px solid #4aacea;
    color: white;
    background-color: #4aacea;
  }
  &:focus {
    border: 1px solid rgba(79, 92, 128, 0.15);
    color: rgba(79, 92, 128, 0.55);
    background-color: rgba(79, 92, 128, 0.15);
  }
  :&.active  {
    border: 1px solid rgba(79, 92, 128, 0.15);
    color: rgba(79, 92, 128, 0.55);
    background-color: rgba(79, 92, 128, 0.15);
  }
  ${props =>
    props?.customizeProp &&
    `
border: 1px solid rgba(79, 92, 128, 0.15);
color: rgba(79, 92, 128, 0.55);
background-color:  rgba(79, 92, 128, 0.15);
`}
  ${props =>
    props?.addBoard &&
    `
height: 46px;
margin:2px 0 0 10px;
`}
`;

export const ActionWrapper = styled('div')`
  margin-top: 36px;
`;

export const AddPost = styled(Button)`
  border: 2px solid #4aacea;
  color: #4aacea;
  background-color: white;
  height: 35px;
  font-weight: 700;
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    border: 2px solid #4aacea;
    color: #4aacea;
    background-color: white;
  }
  &:focus {
    border: 2px solid #4aacea;
    color: #4aacea;
    background-color: white;
  }
  :&.active  {
    border: 2px solid #4aacea;
    color: #4aacea;
    background-color: white;
  }
`;
export const Import = styled(Button)`
  border: 2px solid #4aacea;
  color: #4aacea;
  width: 110px;
  height: 35px;
  background-color: white;
  font-weight: 700;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    border: 2px solid #4aacea;
    color: #4aacea;
    background-color: white;
  }
  &:focus {
    border: 2px solid #4aacea;
    color: #4aacea;
    background-color: white;
  }
  :&.active  {
    border: 2px solid #4aacea;
    color: #4aacea;
    background-color: white;
  }
`;
export const TitleInput = styled(input)`
  background: #ffffff;
  // border: 1px solid #d9d9d9;
  // border-radius: 10px;
  // height: 50px;
  width: 90%;
  margin-left: 5px;
  border: none;
  &:hover {
    // border: 1px solid #d9d9d9;
    box-shadow: none !important;
  }
  &:focus {
    // border: 1px solid #d9d9d9;
    box-shadow: none !important;
  }
  &.active {
    // border: 1px solid #d9d9d9;
    box-shadow: none !important;
  }
  ${props => props.link && `margin-top: 10px;`}
`;
export const SelectInput = styled(Select)`
width: 100% ;
height: 50px !important;
.ant-select-selector {
    width: 100% ;  
    background: #FFFFFF !important;
    height: 50px !important;
    border: 1px solid #D9D9D9;
    border-radius: 10px !important;
    display:flex;
    align-items:center;
&:hover {
  border: 1px solid #D9D9D9 !important;
  box-shadow: none !important;
};
&:focus {
  border: 1px solid #D9D9D9 !important;
  box-shadow: none !important;
};
&.active {
  border: 1px solid #D9D9D9 !important;
  box-shadow: none !important;
};
.ant-select-open {
  &:hover {
    border: 1px solid #D9D9D9 !important;
    box-shadow: none !important;
  };
  &:focus {
    border: 1px solid #D9D9D9 !important;
    box-shadow: none !important;
  };
  &.active {
    border: 1px solid #D9D9D9 !important;
    box-shadow: none !important;
  };
};
`;
export const StyledCard = styled(Card)`
  width: auto;
  height: auto;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  margin-top: 20px;
  border-radius: 10px;
  .MB {
    margin-bottom: 34px;
  }
  .w-100 {
    width: 100%;
  }
  .info {
    cursor: pointer;
    margin-top: 9px;
    margin-left: 10px;
  }
  .margintop {
    margin-top: 10px;
  }
  input[type='file'] {
    display: none;
  }
  .custom-file-upload {
    border: 1px solid #ccc;
    background: #f4f4f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100px;
    height: 100px;
    border-radius: 6px;
    margin: 20px 20px 0 0;
    color: black;
    font-weight: 500;
    font-size: 14px;
  }
  #textArea {
    span {
      color: blue;
    }
  }
  .ant-divider-horizontal {
    margin: 0px 0px;
  }
`;
export const MinimizeCard = styled('div')`
  width: 100%;
  height: 100px;
  padding: 0 10px 0 10px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TextEllipse = styled(Paragraph)`
  width: 35vw;
  padding: 0 10px 0 10px;
  margin: 0px 0 0 0 !important;
  .ant-typography {
    margin-bottom: 0px !important;
  }
`;
export const TextBorder = styled(Card)`
  width: 100%;
  height: 60px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const Error = styled('div')`
  color: red;
  margin: 0 0 10px 10px;
`;
export const Linespan = styled.span`
  border-left: 1px solid #d9d9d9;
  margin: 0px 10px 0px 10px;
`;
export const SocialMediaModal = styled(Modal)`
  .ant-modal-content {
    width: 600px;
    border-radius: 20px;
    z-index: 0;
  }
`;

export const InputWrapper = styled('div')`
  width: auto;
  height: auto;
  display: flex;
  padding: 1px;
  display: block;
  border: 1px solid red;
  .ant-card-body {
    width: auto;
    height: auto;
    display: flex;
    padding: 1px;
  }
  .textlength {
    width: 80px;
    color: #999999;
    font-weight: 700;
    font-size: 13px;
    // margin-left:10px;
  }
  .textarea {
    // width:45vw;
    // height:120px;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;
export const Main = styled('div')`
  width: auto;
  height: auto;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 15px;
  .dFVvmW {
    padding: 1px;
  }
  .textarea {
    height: 120px;
    width: 100% !important;
    margin: 0;
    padding: 0;
  }
  #editor {
    width: 400px;
    height: 100px;
    padding: 10px;
    background-color: #444;
    color: white;
    font-size: 14px;
    font-family: monospace;
    .statement {
      color: orange;
    }
  }
`;
export const Buttons = styled(Button)`
  background: white;
  color: #999999;
  border: 1px solid #999999;
  font-weight: 700;
  font-size: 14px;
  &:hover,
  &:focus,
  &:active {
    background: white;
    color: #999999;
    border: 1px solid #999999;
  }
`;
export const VideoFlex = styled('div')`
  display: flex;
  input[type='file'] {
    display: none;
  }
  width: 100%;
  height: 104px;
  margin: auto;
  display: grid;
  place-items: center;
  background-color: #f0f2f4;
  // border: 1px dashed #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: #4d4d4d;
  .VideoInput_video {
    border-radius: 20px;
    border: 1px solid #d9d9d9;
    margin: 20px 5px 0 0;
  }
  .VideoCover {
    position: relative;
    .videoAction {
      position: absolute;
      background: transparent;
      top: 50%;
      left: 38%;
    }
    &:hover,
    &:focus,
    &:active {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  :.delete-upload  {
    border: 1px solid #ccc;
    background: #f4f4f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 6px;
    margin: 20px 20px 0 20px;
    color: black;
    font-weight: 500;
    font-size: 14px;
  }
`;
export const VideoWrapper = styled.div`
  position: relative;
  z-index: 1;
  .innerWrapper {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-items: center;
    margin: auto;
  }
  .innerSpan {
    position: absolute;
    right: 10%;
    top: 3%;
    z-index: 1;
    cursor: pointer;
  }
  .iconStyle {
    font-size: 22px;
    font-weight: 600;
    color: black;
    cursor: pointer;
    margin-left: 10px;
    color: #fff;
  }
`;
export const IconSpan = styled.span`
  position: absolute;
  right: 5px;
  top: 3px;
  z-index: 1;
`;
export const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  alignitems: center;
  justifyitems: center;
  margin: auto;
`;
export const DescriptionWrapper = styled.div`
  color: #999999;
  display: flex;
  .description {
    margin: 0px 5px;
  }
  .icon {
    color: #999999;
    margin: 3px 5px;
  }
`;

export const HastagWrapper = styled(Flex)`
  width: 100%;
  margintop: 10px;
  .icon {
    font-size: 20px;
  }
`;
