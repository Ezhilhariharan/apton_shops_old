import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Divider, Select, Button, Space } from 'antd';
import { SectionTitle } from './HeaderMessage';
import Flex from '@components/common/Flex';
import CallToAction from './CallToAction';
import QuickReply from './QuickReply';
const Wrapper = styled.div`
  margin-top: 1rem;
`;

const StyledInput = styled(Input)`
  background-color: #f4f4f5;
  border-radius: 5px;
  border: 1px solid #f4f4f5;
`;

const ButtonsMessage = ({FItem,buttonList, setButtonList}) => {
  const [value, setValue] = useState('Quick reply');
  const onChange = value => {
    setValue(value);
  };

  return (
    <div>
      <SectionTitle>Buttons</SectionTitle>
      {/* <SectionTitle fontColor="#999999" fontSize="12px">
        {'( Optional )'}
      </SectionTitle> */}
      <Wrapper>
        <Flex spaceBetween>
        <FItem name="Buttons_type" initialValue={'Quick reply'}>
          <Select
            style={{ width: 200, background: '#F4F4F5' }}
            defaultValue={'Quick reply'}
            size="large"
            onChange={onChange}
            options={[
              // {
              //   value: 'None',
              //   label: 'None',
              // },
              // {
              //   value: 'Call to action',
              //   label: 'Call to action',
              // },
              {
                value: 'Quick reply',
                label: 'Quick reply',
              },
            ]}
          />
          </FItem>
        
        </Flex>
      </Wrapper>
      <Wrapper>
      {value==='Call to action'&&
      <CallToAction FItem={FItem}/>
      }
      {value==='Quick reply' &&
       <QuickReply FItem={FItem} buttonList={buttonList} setButtonList={setButtonList}/>
      }
      </Wrapper>
      <Divider />
    </div>
  );
};

export default ButtonsMessage;
