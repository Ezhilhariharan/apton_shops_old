import React, { useState, useEffect } from 'react';
import error from '../../../assets/images/error.gif';
import { ModalWrapper } from './Payment';
import Flex from '@components/common/Flex';
import { Text, Title } from './SuccessPopover';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
const FailurePopover = ({ popup, close }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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
      onCancel={() => {
        closeModal();
        navigate('/settings');
      }}
      centered={true}
      footer={null}
      style={{ minWidth: '40vw' }}
    >
      <Flex center>
        <Text status="error">Payment Error</Text>
      </Flex>
      <Flex center>
        <img src={error} alt="nogif" width="80px" height="80px" />
      </Flex>
      <Title reply="text" style={{ textAlign: 'center' }}>
        <strong>Your Payment Is Incomplete</strong>
      </Title>
      <Flex
        column
        center
        alignCenter
        style={{ height: '100px', width: '60px', margin: 'auto' }}
      >
        <Button
          type="primary"
          style={{ padding: '5px', height: '37px' }}
          onClick={() => {
            navigate('/settings');
            setIsModalOpen(false);
            closePop(false);
          }}
        >
          Ok
        </Button>
      </Flex>
    </ModalWrapper>
  );
};

export default FailurePopover;
