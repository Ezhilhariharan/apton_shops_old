import React, { useState } from 'react';
import { Button, Space, Card } from 'antd';
import styled from 'styled-components';

const ButtonStyle = styled(Button)`
  width: 180px;
  height: 40px;
  background: ${props => (props.type === 'primary' ? '#4AACEA' : 'white')};
  color: ${props => (props.type === 'primary' ? 'white' : '#4AACEA')};
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: ${props => props.type === 'default' && '5px 3px 6px 3px #DCDCDC'};
  border: ${props => props.type === 'default' && 'none'};
  &:hover {
    background: ${props => (props.type === 'primary' ? '#4AACEA' : 'white')};
  }
  &.btn-active {
    background: ${props => (props.type === 'primary' ? '#4AACEA' : 'white')};
  }
`;
const SwitchTop = ({ setShowSetails, tab }) => {
  const [primary, setPrimary] = useState(tab === 2 ? 1 : 0);

  const onChange = (primaryValue, id) => {
    setPrimary(primaryValue);
    setShowSetails(id);
  };
  return (
    <Card style={{ border: 'none' }}>
      <Space wrap size={'large'}>
        <ButtonStyle
          className="btn-active"
          type={primary === 0 ? 'primary' : 'default'}
          onClick={() => {
            onChange(0, 1);
          }}
          primary={primary === 0}
        >
          Campaign Details
        </ButtonStyle>
        <ButtonStyle
          className="btn-active"
          type={primary === 1 ? 'primary' : 'default'}
          onClick={() => {
            onChange(1, 2);
          }}
          primary={primary === 1}
        >
          {' '}
          Prospect Details{' '}
        </ButtonStyle>
      </Space>
    </Card>
  );
};

export default SwitchTop;
