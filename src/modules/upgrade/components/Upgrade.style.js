import { Col, Button, Card, Typography, Modal } from 'antd';
import styled from 'styled-components';
import { lightColorsTheme } from '@theme/styles/light/lightTheme';
import upgradeBackground from '@assets/images/upgradeBackground.png';

export const ModalTitle = styled('div')`
 margin:20px 0px 20px 0px;
 font-weight: 400;
 font-size: 22px;
  .orange{
    color:#FF4C00;
    font-weight: 700;
    font-size: 28px !important;
    border-bottom:3px solid #FF4C00;
   }
   .green{
    color:#006558;
    font-weight: 700;
    font-size: 28px !important;
    border-bottom:3px solid #006558;
   }
   .blue{
    color:#0046FF;   
    font-weight: 700;
    font-size: 28px !important;  
    border-bottom:3px solid #0046FF;     
   }
`;
export const ModalWrapper = styled(Modal)`
.ant-modal-content {
  border-radius: 20px;
  overflow:hidden;
 
 };
 .ant-modal-body {
  background: url(${upgradeBackground});
  background-size: cover;
  position: relative;
 
 };

`;
export const CardWrapper = styled(Card)`
background: #FFFFFF; 
box-shadow: 0px 0px 14px rgba(79, 92, 128, 0.15);
border-radius: 20px;
margin:25px 0;
.ant-card-body {
  padding: 10px;
  display: flex;
  width:300px;
flex-direction:column;
align-items:center;
// border:1px solid red;
// height:50rem;
}
.price{
  font-weight: 700;
font-size: 30px;
color: #4D4D4D
line-height: 50px;
}
.category{
  font-weight: 700;
  font-size: 18px;
  color: #4D4D4D
  line-height: 30px;
}
.benefits{
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #999999
  display:flex;
  // border:1px solid red;
  };
.content{
    margin:0 0 0 7px;
    // border:1px solid red;
};
.icons{
  height:80px;
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
}
.benefitsList{
  min-height:270px;
  //width:300px;
  margin:20px 0;
// border:1px solid red;
}
`;
export const Wrapper = styled('div')`
width:100%;
  display: flex;
  flex-direction:column;
align-items:center;
justify-content: center;
.plan-suggestion{
 margin:5px 0;
font-weight: 500;
font-size: 16px;
color: #4D4D4D;
  }
`;

export const Modal_body = styled('div')`
  width: 100%;
  height: 400px;
  overflow: scroll;
`;



