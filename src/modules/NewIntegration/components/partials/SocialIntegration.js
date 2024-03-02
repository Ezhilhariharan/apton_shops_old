import React from "react";
import styled from "styled-components";
import SocialButtons from "./SocialButtons";

const SocialWrapper = styled.div`
    width: 27.37%;
    background: #FFFFFF;
    min-height: 82.5vh;
    box-shadow: 0px 0px 14px rgba(79, 92, 128, 0.15);
    border-radius: 10px;
    margin: 1.68% 2.5% 0 1.68%;
    .header {
        color: #181818;
        font-weight: 700;
        font-size: 20px;
    }
    .margin {
        margin: 20px 3.125% 20px 3.125%;
    }
`

const SocialIntegration = props => {
    return (
        <SocialWrapper>
            <div className="margin">
                <div className="header">Social Integrations</div>
                <SocialButtons
                />
            </div>
        </SocialWrapper>
    )
}

export default SocialIntegration
