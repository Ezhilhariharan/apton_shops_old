import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { SocialMediaModal } from "./ConnectedAccounts.styles";
import SocialModalContent from "./SocialModalContent";

const SocialMediaPopup = ({open, setOpen}) => {
    const activeButton = useSelector(state => state.integrationSelector.active, shallowEqual)
    return (
        <>
            <SocialMediaModal open={open} centered footer={null} onCancel={() => setOpen(false)}>
                <SocialModalContent activeButton={activeButton}/>
            </SocialMediaModal>
        </>
    )
}

export default SocialMediaPopup;