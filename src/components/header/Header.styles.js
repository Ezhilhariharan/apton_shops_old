import { Card, Col, Input, Row, Button, Dropdown, Layout, Select } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { lightColorsTheme } from '../../theme/styles/light/lightTheme';

export const Headerdiv = styled('div')`
  height: 70px;
  background: #ffffff;
`;
export const StyledHeaderText = styled('div')`
  font-size: 1.25rem;
  margin-left: 20px;
  margin-bottom: 0;
  font-weight: 700;
  color: #181818;
  &.textOnly {
    padding: 10px 0 10px 0;
    margin-left: -20px;
  }
`;
export const StyledTrialButton = styled(Button)`
  background-color: ${lightColorsTheme.headerTrialButtonColor};
  color: ${lightColorsTheme.darkBlack};
  height: 32px;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1rem;
  padding: 20px 30px;
  border radius: 6px;
  border: none;
  &:hover {
    background-color: ${lightColorsTheme.headerTrialButtonColor};
    color: ${lightColorsTheme.darkBlack};
  }
  &:focus {
    background-color: ${lightColorsTheme.headerTrialButtonColor};
    color: ${lightColorsTheme.darkBlack};
  }
  &.trialButtonOnly {
    margin-bottom: 10px;
  }
`;
export const StyledSpan = styled('span')`
  display: inline-flex;
  // height: 32px;
  align-items: center;
  padding: 5px 12px;
  color: #181818;
  font-size: 1rem;
  font-weight: 700;

  .ant-select-single: not(.ant-select-customize-input) .ant-select-selector {
    height: 0px;
    color: red;
  }
`;
export const TextSpan = styled(StyledSpan)`
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

`;
export const StyledName = styled('span')`
  width: 120px;
  display: inline-flex;
  height: 32px;
  align-items: center;
  padding: 0 12px 0 12px;
  border: 1px solid red;
`;
export const StyledHeaderCard = styled('div')`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: row;
  border-bottom: 1px solid #d9d9d9;
  height: 70px;
  justify-content: space-between;
  width: 100%;
`;
export const VerticalLine = styled.div`
  height: 35px;
  border: 1px solid #999999;
  background-color: #999999;
  margin: 0 8px 0 20px;
`;
export const BrandsDropDown = styled(Select)`
  width: 210px;
  height: 800px !important;
  border: none !important;
  cursor: pointer;
  margin-right: 28.5px;
  display: flex;
  align-items: center !important;

  .ant-select-open {
    height: 300px !important;
    background: #f00;
  }

  &.dropdownOnly {
    margin-bottom: 10px;
  }
  .ant-dropdown-menu {
    box-shadow: none;
  }
  .ant-select-selector {
    height: auto !important  ;
  }
  .ant-select-arrow {
    right: -5px;
    font-size: 16px;
    color: #181818;
  }
`;
export const ColorlessButton = styled(Button)`
  background-color: #ffffff;
  border: none;
  min-width: 200px;
`;
export const EndButtonWrapper = styled('div')`
  display: flex;
  flexdirection: row;
  align-items: center;
  justifycontent: flex-end;
`;
