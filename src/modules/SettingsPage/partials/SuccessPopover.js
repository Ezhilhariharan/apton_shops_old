import React, { useState, useEffect } from 'react';
import { ModalWrapper } from './Payment';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { Divider, Typography, Row, Col, Form, Input, Button } from 'antd';
import { SaveButton } from './AccountEditPage';
import success from '../../../assets/images/success.gif';
import error from '../../../assets/images/error.gif';
import { useNavigate } from 'react-router-dom';

export const Text = styled(Typography)`
  color: ${props => (props.status === true ? '#00AC4F' : '#DA001A')};
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
`;
export const Title = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight:  ${props => (props.payment ? '700' : '400')};
  font-size: 14px;
  margin:10px 0px 10px 0px;
  color: ${props => (props.reply ? '#4D4D4D' : '#999999')};
`;
const SuccessPopover = ({ popup, close, closePop, PaymentMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(popup);
  }, [popup]);

  const closeModal = () => {
    close(false);
    setIsModalOpen(false);
  };
  const navigate=useNavigate()
  return (
    <ModalWrapper
      open={isModalOpen}
      onCancel={() => closeModal()}
      centered={true}
      footer={null}
      style={{ minWidth: '40vw' }}
    >
      <Text status={PaymentMessage?.is_payment_success}>
        {PaymentMessage?.is_payment_success === true
          ? 'Payment Successfull'
          : 'Payment Error'}
      </Text>
      <Flex center>
        {PaymentMessage?.is_payment_success === true ? (
          <img src={success} alt="nogif" width="80px" height="80px" />
        ) : (
          <img src={error} alt="nogif" width="80px" height="80px" />
        )}{' '}
      </Flex>
      <div>
        <Row>
          <Col span={24}>
            <Flex spaceBetween>
              <Title>Payment Medthod</Title>
              <Title reply="text">{PaymentMessage?.payment_type}</Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <Title>Plan Name</Title>
              <Title reply="text">{PaymentMessage?.plan_name}</Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <Title>Mobile</Title>
              <Title reply="text">{PaymentMessage?.mobile}</Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <Title>Email Id</Title>
              <Title reply="text">{PaymentMessage?.email}</Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <Title><strong>Amount Paid</strong></Title>
              <Title reply="text"><strong>{PaymentMessage?.currency_code}{PaymentMessage?.amount_paid}</strong></Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex spaceBetween>
              <Title>Invoice Id</Title>
              <Title reply="text">{PaymentMessage?.invoice_id}</Title>
            </Flex>
          </Col>
        </Row>
      </div>
      <Flex center>
        <SaveButton
          style={{
            background: '#FFFFFF',
            border: '1px solid #D9D9D9',
            color: '#999999',
          }}
          onClick={()=>{setIsModalOpen(false);
            closePop(false);
          navigate("/settings")}}
        >
          Close
        </SaveButton>
        <Button
          type="primary"
          style={{ padding: '5px', height: '37px', marginLeft: '20px' }}
          onClick={() => {
            setIsModalOpen(false);
            closePop(false);
            window.open(PaymentMessage?.invoice_url, "_blank")
            navigate("/settings")
          }}
        >
          Download InVoice
        </Button>
      </Flex>
    </ModalWrapper>
  );
};

export default SuccessPopover;
