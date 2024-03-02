import React from 'react';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../theme/styles/light/lightTheme';
import ArrowRightSideUpper from '../../../components/icons/ArrowRightSideUpper';
const RedirectLink = styled('a')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${lightColorsTheme.headerInputBackground};
  width: 100%;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 30px;
`;
const PolicyWrapper = styled('div')`
  margin: 39px 30px 0 30px;
  .textColor {
    color: ${lightColorsTheme.black};
    font-size: 16px;
    font-weight: 16px;
    margin-left: 20px;
  }
  .arrowStyle {
    margin-right: 13px;
  }
`;
const PolicyPage = () => {
  return (
    <>
      <PolicyWrapper>
        <RedirectLink
          onClick={() =>
            window.open(
              'https://www.aptonshops.com/privacypolicy.html',
              '_blank'
            )
          }
        >
          <span className="textColor">Cookie Policy</span>
          <span className="arrowStyle">
            <ArrowRightSideUpper />
          </span>
        </RedirectLink>
        <RedirectLink
          onClick={() =>
            window.open(
              'https://www.aptonshops.com/privacypolicy.html',
              '_blank'
            )
          }
        >
          <span className="textColor">Privacy Policy</span>
          <span className="arrowStyle">
            <ArrowRightSideUpper />
          </span>
        </RedirectLink>
        <RedirectLink
          onClick={() =>
            window.open(
              'https://www.aptonshops.com/privacypolicy.html',
              '_blank'
            )
          }
        >
          <span className="textColor">Terms & Conditions</span>
          <span className="arrowStyle">
            <ArrowRightSideUpper />
          </span>
        </RedirectLink>
      </PolicyWrapper>
    </>
  );
};

export default PolicyPage;
