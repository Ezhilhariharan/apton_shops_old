import React from "react";
import styled from "styled-components";
import { useResponsive } from "../../../../hooks/useResponsive";
import { lightColorsTheme } from "../../../../theme/styles/light/lightTheme";
const BottomEnd = styled("span")`
  color: #181818;
  display: flex;
  // justify-content: center
  margin-top: 2.5rem;
  margin-bottom: 1rem;
`
const IndividualAnchor = styled("a")`
    color: ${lightColorsTheme.darkBlack};
    display: block;
    font-size: 18px;
    font-weight: 400;

    ${props => props.marginRight && (props.mobileOnly ? `margin-right: 80px` : `margin-right: 100px;`)}
`
const PrivacyAndHelp = () => {
    const {mobileOnly} = useResponsive();
    return (
      <BottomEnd>
        <div style={{ marginLeft: '20px' }}>
          <IndividualAnchor
            marginRight="259px"
            mobileOnly={mobileOnly}
            target="_blank"
          >
            Help
          </IndividualAnchor>
        </div>
        <div style={{ marginLeft: '10px' }}>
          <IndividualAnchor
            marginRight="299px"
            mobileOnly={mobileOnly}
            href={'https://www.aptonshops.com/privacypolicy.html'}
            target="_blank"
          >
            Terms & Conditions
          </IndividualAnchor>
        </div>
        <div style={{ marginLeft: '-10px' }}>
          <IndividualAnchor
            href={'https://www.aptonshops.com/privacypolicy.html'}
            target="_blank"
          >
            Privacy Policy
          </IndividualAnchor>
        </div>
      </BottomEnd>
    );
}

export default PrivacyAndHelp;