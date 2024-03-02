import React from 'react';
import styled from 'styled-components';
import { LAYOUT } from '@theme/styles/constants';
import { Link } from 'react-router-dom';
import logo from '../../../public/asp.png';
import { media } from '@theme/styles/constants';
const SiderLogoDiv = styled.div`
  height: ${LAYOUT.mobile.headerHeight};
  padding: ${LAYOUT.mobile.headerPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and ${media} {
    height: ${LAYOUT.desktop.headerHeight};
    padding-top: ${LAYOUT.desktop.paddingVertical};
    padding-bottom: ${LAYOUT.desktop.paddingVertical};
  }
`;

const SiderLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

export const AppLogo = ({ width, height }) => {
  return (
    <SiderLogoDiv>
      <SiderLogoLink
        target={window?.location?.pathname === '/login' ? '_blank' : '_self'}
        to={'https://www.aptonshops.com/'}
      >
        <img
          height={height || 54}
          width={width || 236}
          src={logo}
          alt="applogo"
        />
      </SiderLogoLink>
    </SiderLogoDiv>
  );
};
