import React from "react";
import Flex from "../../../../components/common/Flex";
import { MediaButton, ModalHeader } from "./ConnectedAccounts.styles";
import pinterestIcon from "@assets/images/pinterest.png";
import { pinterestSignUp } from "../../actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const PinterestConnectButton = () => {
    const { API_BASEURL } = process.env;
    const dispatch = useDispatch()
    const socialMediaList = useSelector(state => state.integrationSelector.socialMediaList, shallowEqual)
    const connectPinterest = text => {
        const param = {
            reference_url: `&reference_url=${API_BASEURL}/integration`,
            connection_name: `&connection_name=${text}`,
            redirect_uri: `&redirect_uri=${API_BASEURL}/pinterest/page_list`,
        }
        dispatch(pinterestSignUp(param))
    }
    const pinterestStatus = socialMediaList?.filter(data => data.platform_name === "Pinterest")?.[0]?.connection_status
    return (
        <>
            <ModalHeader>Connect Your Profile</ModalHeader>
            <Flex spaceEvenly>
                <MediaButton column center alignCenter onClick={() => connectPinterest("Pinterest")} disabled={!!pinterestStatus}>
                    <img src={pinterestIcon} width="40px" height="40px"></img>
                    <div className="buttonText">Pinterest</div>
                </MediaButton>
            </Flex>
        </>
    )
}

export default PinterestConnectButton;