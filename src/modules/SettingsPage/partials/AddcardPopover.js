import React,{useState,useEffect} from 'react'
import {ModalWrapper} from './Payment';
import {CreditCardOutlined } from '@ant-design/icons';
import tick from '@assets/images/tick.svg';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { Divider, Typography ,Row,Col,Form,Input} from 'antd';
import Visa from '@components/icons/Visa'
import mastercard from '@assets/images/mastercard.png'
import { SaveButton } from './AccountEditPage';

const SmallField=styled(Input)`
height: 40px;
left: 0px;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 5px;`
const Text= styled(Typography)`
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
color: #4D4D4D;
margin:3px 0px 0px 0px;
`
const AddcardPopover = ({popup,close}) => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(() => {
    setIsModalOpen(popup);
  }, [popup]);

  const closeModal = () => {
    close(false);
    setIsModalOpen(false);
  };
  return (
    <ModalWrapper
    open={isModalOpen}
   onCancel={() => closeModal()}
   centered={true}
   footer={null}
   style={{minWidth:"40vw"}}
  >
<Row> 
 <Col span={12}>
 <Flex spaceBeween>
  <img src={tick} alt="no img" width="25px"/><CreditCardOutlined style={{fontSize:"20px",margin:"3px 5px 0px 20px"}}/>
  <Text>Debit or Credit card</Text></Flex></Col>
 <Col span={12}>
 <Flex end style={{margin:"5px 15px 0px 0px"}}><img src={mastercard} alt="no img" style={{marginRight:"10px"}}/>
 <Visa/></Flex></Col>
</Row>
<Divider/>
<Form>
<Row>
 <Col span={24}>
 <Form.Item>
  <div>Card Number</div>
  <SmallField type="24span" placeholder="XXXX - XXXX - XXXX - XXXX"/>
 </Form.Item>
 </Col>
 <Col span={8}>
 <Form.Item>
  <div>Expairy Date</div>
  <SmallField placeholder="01/25"/>
 </Form.Item>
 </Col>
 <Col span={8}>
 <Form.Item>
  <div>Security code(cvv)</div>
  <SmallField placeholder='000'/>
 </Form.Item>
 </Col>
 <Col span={8}>
 <Form.Item>
  <div>Zip Code</div>
  <SmallField placeholder='000 000'/>
 </Form.Item>
 </Col>
</Row>
<Flex end style={{marginTop:"20px"}}>
<SaveButton htmlType='submit' onClick={()=>close(false)}>save</SaveButton>
</Flex>
</Form>
    </ModalWrapper>
  )
}

export default AddcardPopover