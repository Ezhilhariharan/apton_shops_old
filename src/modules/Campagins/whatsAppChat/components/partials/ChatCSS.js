import styled from 'styled-components';
import whatsAppBackground from '@assets/images/inboxbg.png';
import { Card, Typography, Button, Input, Divider } from 'antd';
import { lightColorsTheme } from '@theme/styles/light/lightTheme';
const { Search } = Input;

export const ChatBody = styled.div`
  width: 100%;
  height: 66vh;
  background: url(${whatsAppBackground});
  background-size: cover;
  position: relative;
  // padding: 0 0 20px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  overflow: auto;
  ::-webkit-scrollbar {
    width: 13px;
  }
`;
export const StyleBtn = styled.a`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  justify-content: center;
  display: flex;

  //padding:3px;
  margin: 3px;
  //border-radius: 0px 10px 10px 10px;
  height: 40px;
`;

export const WhiteText = styled.div`
  max-width: 420px;
  height: auto;
  background: #ffffff;
  overflow: hidden;
  white-space: pre-line;
  font-size: 0.938rem;
  overflow-wrap: break-word;
  background: #4aacea;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 0 10px 10px;
  padding: 10px;
  margin: 10px 20px 0px 0px;

  span {
    max-width: 420px;
    height: auto;
    color: #ffffff;
    white-space: pre-line;
    font-size: 0.938rem;
    overflow-wrap: break-word;
  }

  .ant-typography {
    color: #ffffff;
  }
`;
export const ReciveText = styled.div`
  max-width: 420px;
  width: auto;
  height: auto;
  background: #ffffff;
  overflow: hidden;
  white-space: pre-line;
  font-size: 0.938rem;
  overflow-wrap: break-word;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0 10px 10px 10px;
  margin: 10px 270px 0px 20px;
  padding: 10px;
`;
export const StyledDivider = styled(Divider)`
  border-bottom: 1px solid #d9d9d9;
  margin: 11px 4px 11px 4px;
`;
export const ColourlessSearch = styled(Search)`
  button {
    border: none !important;
    background-color: #ffffff !important;
  }
`;
export const ChatList = styled(Card)`
  height: 82vh;
  .ant-card-body {
    padding: 10px;
  }
`;
export const TextField = styled(Input)`
  //width: 590px;
  height: 60px;
  background: #ffffff;

  ::placeholder {
    color: #4d4d4d;
  }
`;
export const PaginationButton = styled(Button)`
  background-color: ${lightColorsTheme.primary};
  color: ${lightColorsTheme.additionalBackground};
  font-weight: 700;
  &:hover,
  &:focus {
    background-color: ${lightColorsTheme.primary};
    color: ${lightColorsTheme.additionalBackground};
  }
  &:disabled {
    background-color: ${lightColorsTheme.inputGrayColor} !important;
  }
  margin: 20px 10px 10px 10px;
`;
export const Content = styled.div`
  margin: 20px 0px 0px 0px;
  height: 50px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 13px;
  }
`;

export const Wrapper = styled.div`
  margin-top: 0.5rem;
  .textStyles {
    color: #181818;
    font-size: 1rem;
    font-weight: 700;
  }
  .firstLetter {
    color: #181818;
    font-size: 1rem;
    font-weight: 700;
  }
  .head {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 1.625rem;
    line-height: 31px;
    color: #4d4d4d;
    display: block;
    text-align: center;
  }
  .cont {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    color: #4d4d4d;
    display: block;
    text-align: center;
  }
`;
export const BottomBox = styled.div`
  background-color: #ededed;
  border-radius: 5px;
  height: 0px;

  .messageInput {
    height: 60px;
    border-radius: 10px;
    color: #4d4d4d;
    font-weight: 400;
    font-size: 1rem;
    margin-right: 20px;
  }
  .sendMessageButton {
    height: 50px;
    width: 50px;
    border-radius: 5px;
    border: none;
    background-color: #ededed;
  }
  .Attachment {
    margin-top: 13px;
  }
  .temp {
    margin: 15px 10px 0px 10px;
  }
  .Container {
    background-color: white;
    display: flex;
    width: 100%;
    border-radius: 10px;
  }
  .div {
    height: 40px;
    width: 2px;
    margin-top: 10px;
    border-right: 1px solid #d9d9d9;
  }
  .header {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 1.125rems;
    line-height: 22px;
    color: #4d4d4d;
    display: block;
    margin: 20px 10px 10px 10px;
  }
  .des {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 17px;
    color: #4d4d4d;
    margin: 10px;
  }
`;
export const Text = styled(Typography)`
  ont-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 19px;
  color: #4aacea;
  margin: 5px 10px;
`;
export const Cards = styled(Card)`
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
  height: 160px;

  .Header {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #181818;
  }

  .ant-card-body {
    padding: 15px 10px;
  }
`;
export const ConversationButton = styled(Button)`
  width: 160px;
  height: 40px;
  font-weight: 500;
  font-size: 1rem;
  background: ${props => (props.msgStatus === 'Closed' ? '#4AACEA' : 'white')};
  border-radius: 5px;
  color: ${props => (props.msgStatus === 'Closed' ? 'white' : 'black')};
  border: none;
  &:hover {
    background: ${props =>
      props.msgStatus === 'Closed' ? '#4AACEA' : 'white'};
    color: white;
    ${props => (props.msgStatus === 'Closed' ? 'white' : 'black')};
  }
  &.btn-button {
    background: ${props =>
      props.msgStatus === 'Closed' ? '#4AACEA' : 'white'};
    color: ${props => (props.msgStatus === 'Closed' ? 'white' : 'black')};
  }
`;
export const ChartHeader = styled.div`
  display: flex;
  position: relative;
  background: #ffffff;
  //min-width:${window.innerWidth > 1600 ? '53%' : '50%'};
  z-index: 5;
  box-shadow: 0px 2px 2px 2px #d9d9d9;
  border-width: 1px;
  //border-style: solid;
  //border-color: #D9D9D9;
  padding: 0.5px 0 4px 15px;
`;
export const ContactWrapper = styled.div`
  //display:flex;
  padding: 10px;
  justify-content: space-between;
  cursor: pointer;
  min-height: 50px;
  min-width: 200px;
  margin-right: 5px;
  background: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  line-height: 19px;
  background-color: ${props => (props.selected ? '#4AACEA' : 'none')};
  border-radius: ${props => (props.selected ? '10px' : 'none')};
`;
export const TextButton = styled(Button)`
  background: #ffffff;
  border: none;
  color: black;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  &:hover {
    background: #ffffff;
    border: none;
    color: black;
  }
`;
export const Box = styled.div`
  height: 69vh;
  overflow-y: scroll;
`;

export const NameText = styled.span`
  font-weight: 700;
  font-size: 1rem;
  line-height: 30px;
  color: ${props => (props.selected ? '#FFFF' : '#181818')};
`;
export const Span = styled.div`
  width: 280px;
  height: 28px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 14px;
  margin-bottom: 5px;
  color: ${props => (props.selected ? '#FFFF' : '#181818')};
`;

export const Message = styled.p`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 14px;
  color: ${props => (props.selected ? '#FFFF' : '#999999')};
`;
export const TimeText = styled.p`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  margin: 5px;
  color: ${props => (props.selected ? '#FFFF' : '#999999')};
`;
