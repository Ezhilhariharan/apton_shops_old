import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import Flex from "../../../../components/common/Flex";
import puzzle from "@assets/images/puzzle-icon.svg";
import { UnconnectedBox } from "./ConnectedAccounts.styles";

const UnconnectedCard = () => {
    const activeMedia = useSelector(state => state.integrationSelector.active, shallowEqual)
    return (
        <>
            <UnconnectedBox center alignCenter column>
                <img src={puzzle} width="160px" height="135px"></img>
                <div className="connectText">Please connect your {activeMedia} account</div>
            </UnconnectedBox>
        </>
    )
}

export default UnconnectedCard;