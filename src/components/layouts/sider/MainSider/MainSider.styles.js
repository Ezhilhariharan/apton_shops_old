import styled, { css } from 'styled-components';
import { Button, Card, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { media } from '@theme/styles/constants';
import { LAYOUT } from '@theme/styles/constants';
import { lightColorsTheme } from '../../../../theme/styles/light/lightTheme';
export const Sider = styled(Layout.Sider)`
  position: fixed;
  overflow: visible;
  right: 0;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;

  color: var(--text-secondary-color);

  @media only screen and ${media.md} {
    right: unset;
    left: 0;
  }

  @media only screen and ${media.xl} {
    position: unset;
  }
`;
export const CollapseButton = styled(Button)`
  background: var(--collapse-background-color);

  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  position: absolute;
  right: 0.5rem;

  ${props =>
    props.$isCollapsed &&
    css`
      right: -1rem;
    `}

  color: var(--text-secondary-color);

  &:hover {
    color: var(--text-secondary-color);
    background: var(--primary-color);
    border: 1px solid var(--border-color);
  }

  &:focus {
    color: var(--text-secondary-color);
    background: var(--primary-color);
    border: 1px solid var(--border-color);
  }
`;
export const SiderContent = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  margin: 10px;
  max-height: calc(100vh - ${LAYOUT.mobile.headerHeight});

  @media only screen and ${media.md} {
    max-height: calc(100vh - ${LAYOUT.desktop.headerHeight});
  }
`;
export const SiderLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;
export const SiderLogoDiv = styled.div`
  height: ${LAYOUT.mobile.headerHeight};
  padding: ${LAYOUT.mobile.headerPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 8px;

  @media only screen and ${media.md} {
    height: ${LAYOUT.desktop.headerHeight};
    padding-top: ${LAYOUT.desktop.paddingVertical};
    padding-bottom: ${LAYOUT.desktop.paddingVertical};
  }
`;
export const BrandSpan = styled.span`
  margin: 0 1rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--white);
`;
export const LogoutWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 30px;
  .marginLeftForLogout {
    margin-right: 1rem;
    margin-left: 1rem;
  }
  .accountButton {
    display: flex;
    align-items: flex-start;
    ${props =>
      (props.mobile || props.tablet) &&
      `
    flex-direction: column;
    `};
  }
  ${props =>
    (props.mobile || props.tablet) &&
    `
  flex-direction: column;
  `};
  .marginBottomButton {
    ${props =>
      (props.mobile || props.tablet) &&
      `
  margin-bottom: 1rem;
  `};
  }
`;
export const SettingsButton = styled(Button)`
  background-color: transparent;
  border: none;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props =>
    props.settingsPathName === '/settings' &&
    `
    background-color: ${lightColorsTheme.primary};
    border: none;
    color: ${lightColorsTheme.additionalBackground};
  &:hover {
    background-color: ${lightColorsTheme.primary};
    border: none;
    color: ${lightColorsTheme.additionalBackground};
  }
  `}
  &:focus {
    background-color: ${lightColorsTheme.primary};
    border: none;
    color: ${lightColorsTheme.additionalBackground};
  }
`;
export const AccountButton = styled(Button)`
  background-color: ${lightColorsTheme.primary};
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${lightColorsTheme.additionalBackground};
  &:hover {
    // background-color: ${lightColorsTheme.primary};
    border: none;
    color: ${lightColorsTheme.additionalBackground};
  }
  &:focus {
    background-color: ${lightColorsTheme.primary};
    border: none;
    color: ${lightColorsTheme.additionalBackground};
  }
`;
export const LogoutButton = styled(Button)`
  background-color: transparent;
  border: none;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    background-color: ${lightColorsTheme.primary};
    border: none;
    color: ${lightColorsTheme.additionalBackground};
  }
`;
export const SetPath = styled.div`
  display: flex;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 16px;
  ${props =>
    props.settingsPathName === props.name &&
    `
background-color:#4AACEA;
border-radius:10px;
color:#ffffff;
`}
`;
export const Popcont = styled(Card)`
  display: block;
  background-color: white;
  background: #ffffff;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  color: black;
  margin-bottom: 10px;
  .avatar {
    padding: 10px 20px;
  }
  .active {
    width: 10px;
    height: 10px;
    background-color: #1ad67b;
    border-radius: 50%;
    position: relative;
    top: 3px;
    right: 12px;
    border: 1px solid #ffffff;
  }
  .name {
    margin: auto;
  }
`;
