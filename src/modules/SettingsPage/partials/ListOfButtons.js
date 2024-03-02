import { Button, Tabs, Col } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../theme/styles/light/lightTheme';
import InvoiceIcon from '../../../components/icons/InvoiceIcon';
import SecurityShieldIcon from '../../../components/icons/SecurityShieldIcon';
import StoreIcon from '../../../components/icons/StoreIcon';
import UsersIcon from '../../../components/icons/UsersIcon';
import UserCircleIcon from '../../../components/icons/UserCircleIcon';
import { FlexBox } from '../../Integration/component/Integration.styles';
const StyledButton = styled(Button)`
  background-color: transparent;
  border: none;
  margin-bottom: 1rem;
  min-width: 200px;
  height: 50px;
  box-shadow: none;
  font-size: 16px;
  font-weight: 600;
  color: ${lightColorsTheme.buttonColorSettings};
  border-radius: 10px;
  ${props =>
    props?.selectedText &&
    `
    background-color: ${lightColorsTheme.primary};
    color: ${lightColorsTheme.additionalBackground};
    `}
  &:hover {
    color: ${lightColorsTheme.buttonColorSettings};
  }
  &:focus {
    background-color: ${lightColorsTheme.primary};
    color: ${lightColorsTheme.additionalBackground};
    #iconStyles {
      fill: none;
      stroke-width: 3;
      stroke: ${lightColorsTheme.additionalBackground} !important;
      marginright: '20px';
    }
  }
  &.active {
    background-color: ${lightColorsTheme.primary};
    color: ${lightColorsTheme.additionalBackground};
    #iconStyles {
      fill: none;
      stroke-width: 3;
      stroke: ${lightColorsTheme.additionalBackground} !important;
      marginright: '20px';
    }
  }
  display: flex;
  align-items: center;
`;

export const ListOfButtons = ({ saveText, selectedText }) => {
  const handleSelect = text => {
    saveText(text);
  };
  return (
    <>
      <div style={{ margin: '20px 71px 0 50px' }}>
        {buttonArray?.map((data, index) => {
          return (
            <div key={index}>
              <StyledButton
                onClick={() => handleSelect(data.text)}
                selectedText={data.text === selectedText}
                disabled={data?.text === 'Billing' || data?.text === 'My Team'}
              >
                {data.icon}
                {data.text}
              </StyledButton>
            </div>
          );
        })}
      </div>
    </>
  );
};

const buttonArray = [
  {
    text: 'Account',
    icon: <UsersIcon id="iconStyles" style={{ marginRight: '20px' }} />,
  },
  {
    text: 'Branding',
    icon: <StoreIcon id="iconStyles" style={{ marginRight: '20px' }} />,
  },
  // { text: "Billing", icon: <InvoiceIcon id="iconStyles" style={{marginRight: "20px"}} /> },
  // { text: "My Team", icon: <UserCircleIcon id="iconStyles" style={{marginRight: "20px"}} /> },
  {
    text: 'Policy',
    icon: (
      <SecurityShieldIcon id="iconStyles" style={{ marginRight: '20px' }} />
    ),
  },
];
