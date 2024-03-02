import { Select} from 'antd';
import React from 'react';
import Flex from '@components/common/Flex'
import styled from 'styled-components';

const Title = styled.span`
font-family: Lato;
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: #4D4D4D;
padding-bottom: 1rem;
`
const WhatsAppNumber = ({businessAccount,selectedBusinessList, setBusinessList}) => {
  return (
    <Flex column >
    <Title>3.Select The  Business Phone Numer</Title>
      <Select
      size="large"
      placeholder="Select the WhatsApp Business List"
      value={selectedBusinessList}
      onChange={setBusinessList}
      style={{
        width: '100%',
      }}
      options={businessAccount.map((item) => ({
        value: item?.id,
        label: <>{item?.verified_name}/{item?.display_phone_number}</>,
      }))}
    />
    </Flex>
   
  );
};
export default WhatsAppNumber;