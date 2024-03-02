import React from "react";
import Flex from "../../../../components/common/Flex";
import { ModalHeader, MediaButton } from "./ConnectedAccounts.styles";
import instagramIcon from "@assets/images/Instagram.png";
import InstagramBusinessIcon from "@assets/images/instagram business.svg";
import {FB_INST_integration} from "../../actions"
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const InstagramConnectButton = () => {
    const { API_BASEURL } = process.env;
    const dispatch = useDispatch()
    const socialMediaList = useSelector(state => state.integrationSelector.socialMediaList, shallowEqual)
    const connectInsta = (text) => {
        const parameters = {
            reference_url: `&reference_url=${API_BASEURL}/integration`,
            connection_name: `&connection_name=${text}`,
            redirect_uri: `&redirect_uri=${API_BASEURL}/instagram/page_list`,
        }
        dispatch(FB_INST_integration(parameters))
    }
    const instagramConnectStatus = socialMediaList?.filter(data => data.platform_name === "Instagram")?.[0]?.connection_status
    return (
        <>
            <ModalHeader>
                <Flex alignCenter>
                    <img src={instagramIcon} width="33px" height="33px"></img>
                    <div className="instaMargin">Instagram</div>
                </Flex>
            </ModalHeader>
            <Flex spaceEvenly>
                <MediaButton column center alignCenter onClick={() => connectInsta("Instagram")} disabled={!!instagramConnectStatus}>
                    <img src={InstagramBusinessIcon} width="40px" height="40px"></img>
                    <div className="buttonText">Business Page</div>
                </MediaButton>
            </Flex>
        </>
    )
}

export default InstagramConnectButton;