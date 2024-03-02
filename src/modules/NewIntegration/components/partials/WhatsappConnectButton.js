import React from "react";
import Flex from "../../../../components/common/Flex";
import { MediaButton, ModalHeader } from "./ConnectedAccounts.styles";
import whatsappMetaIcon from "@assets/images/whatsappcloud.png";
import { whatsappAuthenticationStepOne } from "../../actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const WhatsappConnectButton = () => {
    const dispatch = useDispatch()
    const socialMediaList = useSelector(state => state.integrationSelector.socialMediaList, shallowEqual)
    const connectWhatsapp = () => {
        dispatch(whatsappAuthenticationStepOne())
    }
    const whatsappConnectStatus = socialMediaList?.filter(data => data.platform_name === "WhatsApp")?.[0]?.connection_status
    return (
        <>
            <ModalHeader>Connect Your Profile</ModalHeader>
            <Flex spaceEvenly>
                <MediaButton column center alignCenter onClick={connectWhatsapp} disabled={!!whatsappConnectStatus}>
                    <img src={whatsappMetaIcon} width="40px" height="40px"></img>
                    <div className="buttonText">WhatsApp Cloud API</div>
                </MediaButton>
            </Flex>
        </>
    )
}

export default WhatsappConnectButton;