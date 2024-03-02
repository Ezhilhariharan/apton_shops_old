import styled from 'styled-components';
import { Typography, Card, Image, Button, Carousel } from 'antd';
import Flex from '@components/common/Flex';

export const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
`;
export const GlobalWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .toggleLeft {
    width: 100px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #4aacea;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    font-size: 15px;
    color: #4aacea;
    cursor: pointer;
  }
  .toggleLeftActive {
    width: 100px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #4aacea;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    font-size: 15px;
    color: white;
    background-color: #4aacea;
    cursor: pointer;
  }
  .toggleRightActive {
    width: 100px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #4aacea;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    font-size: 15px;
    color: white;
    background-color: #4aacea;
    cursor: pointer;
  }
  .toggleRight {
    width: 100px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #4aacea;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    font-size: 15px;
    color: #4aacea;
    cursor: pointer;
  }
`;
export const LinkdinAndTwitter = styled.div`
  width: 310px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 0px 14px rgba(79, 92, 128, 0.15);
  border-radius: 12px;
  padding: 22px;
  overflow: hidden;
  margin-top: 20px;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    // padding:15px 0px 10px 0px;
  }
  .profile {
    display: flex;
  }
  .profile-img {
    padding: 5px 10px 0 0;
  }
  .title {
    font-weight: 700;
    font-size: 16px;
    color: black;
    margin-top: 10px;
  }
`;

export const PinterestWrapper = styled.div`
  height: 480px;
  width: 580px !important;
  background: #ffffff;
  box-shadow: 0px 0px 14px rgba(79, 92, 128, 0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin-top: 15px;
`;

export const PinterestButton = styled(Button)`
  width: auto;
  height: 30px;
  background: #cb2027;
  border-radius: 30px;
  color: white;
  text-align: center;
  &:hover,
  &:focus,
  &:active {
    background: #cb2027;
    color: white;
  }
`;
export const FeedCard = styled(Card)`
  width: auto;
  height: autox;
  background: #ffffff;
    border-radius: 10px;
  .ant-card-body {
    padding:0px;
  };
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
  margin-top:30px;
  .header{ 
   width:100%;
   display:flex;
   justify-content:space-between; 
   padding:15px 0px 10px 0px; 
  };
  .profile{
    display:flex;
  };
  .profile-img{
    padding:5px 10px 0 10px;
  };
  .title{
    font-weight: 700;
font-size: 16px;
color:black;
margin-top:10px;
  };
  .category{
    font-weight: 400;
font-size: 12px;
color: #65676B;
  };
  .menu{
    margin-top:10px;
    margin-right:20px
  };
    .instlink{
    color: #00376B;
  }
  };
    overflow:hidden;
`;
export const Cardimage = styled(Image)`
  width: 100% !important;
  height: 290px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const TwitterAndLinkdinImage = styled(Image)`
  min-width: 245px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  vertical-align: middle;
`;
export const MarginBottom = styled('div')`
  height: 50px;
`;
export const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 10px;
  padding: 0px 10px;
  .instaheart {
    width: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const BottomSpace = styled('div')`
  height: 10px;
`;

export const MainWrapper = styled('div')`
  width: 100% !important;
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f4f4f5;
    height: 290px;
  }
  .ant-divider-horizontal {
    margin: 12px 0px;
  }
  .iconWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    .font {
      font-size: 9px;
      margin-top: 5px;
    }
  }
  .description {
    white-space: pre-line;
    padding: 5px 10px;
    font-weight: 500;
    font-size: 16px !important;
    .fblink {
      color: #216fdb;
    }
  }
  .divider {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 0px;
  }
  .row {
    margin-top: 18px;
  }
  .w-100 {
    width: 100%;
  }
  .flex {
    display: flex;
  }
  .margin {
    margin: 0 4px;
  }
  .videoStyle {
    padding-bottom: 10px;
    background: #f4f4f5;
  }
  .twitter {
    padding-bottom: 10px;
    background: #f4f4f5;
    magin-top: 10px;
  }
  .marginTop {
    magin-top: 50px;
  }
  .blueTick {
    margin-left: 5px;
    margin-top: 12px;
  }
  .linkWorld {
    margin-left: 7px;
    margin-top: 5px;
  }
  .verticalMenu {
    margin-top: 5px;
    margin-left: 15px;
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
export const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    background: #3897f0;
  }
  > .slick-dots li.slick-active button {
    background: #3897f0;
  }
  .border {
    height: 290px;
    background: #f4f4f5;
    width: 100%;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border:1px solid red;

  }
  min-height: 335px;
`;
export const TwitterLinkdinCarousel = styled(Carousel)`
  > .slick-dots li button {
    background: #3897f0;
  }
  > .slick-dots li.slick-active button {
    background: #3897f0;
  }
  .border {
    background: white;
    width: 100%;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  ${props => `
min-height:${props?.minimumHeight};
`}
`;
export const HorizontalLine = styled('div')`
  height: 1px;
  background: rgba(79, 92, 128, 0.35);
  width: 100%;
  margin: 15px 0px;
`;
export const TwitterText = styled('div')`
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: rgba(79, 92, 128, 0.75);
`;
export const Dot = styled('span')`
  width: 4px;
  height: 4px;
  margin-top: 3px;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 50%;
  background: #565c65;
`;
export const TextWeight = styled('div')`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #4d4d4d;
`;
export const TextLight = styled('div')`
  font-weight: 500;
  font-size: 10px;
  line-height: 18px;
  color: #999999;
  margin-top: 2px;
`;
export const RightContent = styled('div')`
  height: auto;
  // width:100%;
  width: 250px;
  min-width: 250px !important;
  overflow: hidden;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  .link {
    text-decoration: underline;
    color: #585858;
    margin-top: 15px;
    width: 230px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const ToggleWrapper = styled('div')`
  width: 100px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
  display: flex;
  .item {
    width: 50%;
    height: 100%;
    background: white;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 3px;
  }
  .active {
    width: 50%;
    height: 100%;
    background: #4aacea;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const AccountsWrapper = styled('div')`
  display: flex;
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
`;
export const SocialIcon = styled('div')`
  margin: 8px 13px 0 13px;
  position: relative;
  cursor: pointer;
  .span {
    position: absolute;
    background: transparent;
    bottom: 14px;
    left: 19px;
    cursor: pointer;
  }
`;
