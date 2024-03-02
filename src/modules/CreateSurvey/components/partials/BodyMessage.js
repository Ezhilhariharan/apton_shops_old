import { Button, Divider, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SectionTitle } from './HeaderMessage';
import Flex from '@components/common/Flex';
const { TextArea } = Input;
const Wrapper = styled.div`
  margin-top: 2rem;
`;
const StyledInput = styled(TextArea)`
  background-color: #F4F4F5;
  border-radius: 5px;
  border: 1px solid #F4F4F5;
`;

const BodyMessage = ({FItem}) => {
  const [textLength, setLength] = useState(0);
  return (
    <>
    <Wrapper>
      <SectionTitle>Body</SectionTitle>
      {/* <div style={{ marginTop: 5 }}>
        <Button
          type="primary"
          ghost
          style={{ border: '2px solid' }}
        >
          {' '}
          Add Variable
        </Button>
      </div> */}
      <Flex end>
        <SectionTitle>{`${textLength}/1024`}</SectionTitle>
      </Flex>
      <FItem name="question" rules={[
        {
          required: true,
          message: 'Please enter the valid input',
        }
      ]}>
      <StyledInput
        rows={4}
        placeholder="Body message..."
        minLength={0}
        maxLength={1024}
        onChange={e => setLength(e.target.value.length)}
      />
      </FItem>
    </Wrapper>
    <Divider/>
    </>
  );
};

export default BodyMessage;

