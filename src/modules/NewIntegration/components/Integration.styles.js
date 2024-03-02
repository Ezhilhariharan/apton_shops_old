import { Col, Button, Card, Typography } from 'antd';
import styled from 'styled-components';
import { lightColorsTheme } from '@theme/styles/light/lightTheme';

export const StyledLayout = styled('div')`
  background-color: ${lightColorsTheme.additionalBackground};
  //width: 100%;
  height: 100%;
  padding-left: 29px;
`;
export const TextCard = styled(Card)`
  //width: 100%;
  height: 890px;
  //left: 0px;
  background: #ffffff;
  border-radius: 10px;
`;
export const Text = styled(Typography)`
margin:10px;
`;
export const SocialIcon = styled("div")`
margin-right: 10px ;
 position: relative;
 .span{
  position: absolute;
  background: transparent;
  bottom: 4px;
  left: 29px;
   cursor: pointer;
 };
`;
export const Cards = styled(Card)`
background: #FFFFFF;
box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
border-radius: 14px;
min-height:190px;
margin-bottom:30px;
.connectBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 9.5px 0 9.5px 0;
}
.descrptionBox {
  height: 160px;
}
.bottomBox {
  height: 50px;
}
.connectTextStyle {
  font-size: 15px;
  line-height: 17px;
  color: #999999;
  margin-top: 14px;
  margin-left: 20px;
}
.ant-card-body{
  padding:0px;
}`
export const FlexBox = styled('div')`
  display: flex;
  margin: 20px 0 0 20px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  vertical-align: middle;
  .marginRight {
    margin-left: 7px;
  }
  .viewDemo {
    margin-right: 22px;
  }
`;
export const StyledSpan = styled('span')`
  margin-left: 10px;
   vertical-align: middle;
  font-size: 19px;
  font-weight: 600;
  color: ${lightColorsTheme.darkBlack};
`;
export const Viewdemo = styled('span')`
  font-weight: 700;
  font-size: 12px;
  color: #181818;
  margin-right: 7px;
  
`;

export const InternalFlexBox = styled('div')`
  display: flex;
  align-items: center;
`;
export const StyledLink = styled('a')`
  display: flex;
  align-items: center;
  color: ${lightColorsTheme.darkBlack};
  font-size: 12px;
`;
export const AddingMedia = styled(FlexBox)`
  //justify-content: flex-start;
  //margin: 30px 50px 0px 29px;
`;
export const StyledButton = styled('button')`
  border: none;
  background-color: ${lightColorsTheme.additionalBackground};
  width: 100%;
  height: 40px;
  :hover {
    background-color: ${lightColorsTheme.additionalBackground};
  }
  display: flex;
  justify-content: center;
  //margin: 20px;
  cursor: pointer;
`;
export const ConnectButton = styled(Button)`
  background-color: ${lightColorsTheme.additionalBackground};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border: 1.5px solid #ffffff;
  :hover {
    border: 1.5px solid #ffffff;
    background-color: ${lightColorsTheme.additionalBackground};
    color: ${lightColorsTheme.primary} !important;
  }
  :focus {
    border: 1.5px solid #ffffff;
    background-color: ${lightColorsTheme.additionalBackground};
    color: ${lightColorsTheme.primary} !important;
  }
  .rightArrow {
    //margin-left: 10.67px;
    :hover {
      color: ${lightColorsTheme.primary};
    }
  }
`;
export const ModalContentBox = styled('div')`
  color: ${lightColorsTheme.darkBlack};
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 31px;
`;
export const CardWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;
export const CardBox = styled('div')`
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.05),
    -4px -4px 14px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  .text {
    margin: 0 20px 0 20px;
    text-align: center;
  }
`;
export const Modal_body = styled('div')`
  width: 100%;
  height: 400px;
  overflow: scroll;
`;

export const ErrorContent = styled('div')`
  width: 100%;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
   flex-direction: column;
 `;
export const NoListText = styled('div')`
font-weight: 500;
font-size: 26px;
line-height: 31px;
letter-spacing: 0.01em;
color: rgba(79, 92, 128, 0.75);
`;
export const NotificationHeader = styled('div')`
  color: black;
  font-size: 17px;
  // marginTop:10px;
`;
export const Notification = styled('div')`
  color: red;
  // marginTop:10px;
`;
export const ConfirmButton = styled(Button)`
  background-color: ${lightColorsTheme.primary};
  border: none;
  min-width: 50px;
  color: #ffffff;
  border-radius: 7px;
  &:hover {
    background-color: ${lightColorsTheme.primary};
    color: #ffffff;
  }
`;
export const CardListBox = styled('div')`
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.05),
    -4px -4px 14px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  width: '100%';
  height: auto;
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: row;
  padding: 10px;
  .text {
    font-size: 17px;
    margin: 0 20px 0 20px;
  }
  .description {
    font-size: 12px;
    color: 'grey';
    margin: 0 20px 0 20px;
  }
  .icon {
    margin: 6px 0 0 4px;
  }
  .content {
    display: flex;
    flex-direction: row;
    width: 80%;
  }
  .button {
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // border:1px solid red;
  }
  cursor: pointer;
`;
