import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Divider } from 'antd';
import { SectionTitle } from './HeaderMessage';
const Wrapper = styled.div`
  margin-top: 2rem;
`;

const StyledInput = styled(Input)`
  background-color: #f4f4f5;
  border-radius: 5px;
  border: 1px solid #f4f4f5;
`;

const FooterMessage = ({ FItem }) => {
  const [value, setValue] = useState(1);
  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <div>
      <SectionTitle>Footer</SectionTitle>
      <SectionTitle fontColor="#999999" fontSize="12px">
        {'( Optional )'}
      </SectionTitle>
      <Wrapper>
        <FItem name="Footer_input_value">
          <StyledInput
            size="large"
            placeholder="Footer text..."
            onChange={onChange}
            value={value}
          />
        </FItem>
      </Wrapper>
      <Divider />
    </div>
  );
};

export default FooterMessage;
