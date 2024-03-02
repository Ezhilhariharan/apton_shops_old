import { Select } from 'antd';
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
const BusinessAccounts = ({businessAccount,selectedBusinessAccount,
    setBusinessAccount}) => {
  return (
    <Flex column >
    <Title>2.Select The Business Account</Title>
      <Select
      size="large"
      placeholder="Select the WhatsApp Account"
      value={selectedBusinessAccount}
      onChange={setBusinessAccount}
      style={{
        width: '100%',
      }}
      options={businessAccount.map((item) => ({
        value: item?.id,
        label: item?.name,
      }))}
    />
    </Flex>
   
  );
};
export default BusinessAccounts;