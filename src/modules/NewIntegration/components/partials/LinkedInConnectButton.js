import React from "react";
import Flex from "../../../../components/common/Flex";
import { MediaButton, ModalHeader } from "./ConnectedAccounts.styles";
import linkedInIcon from "@assets/images/LinkdinPage.svg";
import { linkedinPageSignUp } from "../../actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const LinkedInConnectButton = () => {
    const dispatch = useDispatch()
    const { API_BASEURL } = process.env;
    const socialMediaList = useSelector(state => state.integrationSelector.socialMediaList, shallowEqual)
    const connectLinkedInPages = (text) => {
        const param = {
            reference_url: `&reference_url=${window.location.href}`,
            connection_name: `&connection_name=${text}`,
            redirect_uri: `&redirect_uri=${API_BASEURL}/linkedin pages/page_list`,
        }
        dispatch(linkedinPageSignUp(param))
    }
    const LinkedInPageConnectionStatus = socialMediaList?.filter(data => data.platform_name === "Linkedin Pages")?.[0]?.connection_status
    
    return (
        <>
            <ModalHeader>Connect Your Profile</ModalHeader>
            <Flex spaceEvenly>
                <MediaButton column center alignCenter onClick={() => connectLinkedInPages("Linkedin Pages")} disabled={!!LinkedInPageConnectionStatus}>
                    <img src={linkedInIcon} width="40px" height="40px"></img>
                    <div className="buttonText">Linked In</div>
                </MediaButton>
            </Flex>
        </>
    )
}

export default LinkedInConnectButton;