import React from "react";
import Flex from "../../../../components/common/Flex";
import { MediaButton, ModalHeader } from "./ConnectedAccounts.styles";
import youtubeIcon from "@assets/images/Youtube.png"
import { youtubeSignUp } from "../../actions"
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const YoutubeConnectButton = () => {
    const { API_BASEURL } = process.env;
    const dispatch = useDispatch()
    const socialMediaList = useSelector(state => state.integrationSelector.socialMediaList, shallowEqual)
    const connectYoutube = text => {
        const param = {
            reference_url: `&reference_url=${API_BASEURL}/integration`,
            connection_name: `&connection_name=${text}`,
            redirect_uri: `&redirect_uri=${API_BASEURL}/youtube/page_list`,
        }
        dispatch(youtubeSignUp(param))
    }
    const youtubeStatus = socialMediaList?.filter(data => data.platform_name === "YouTube")?.[0]?.connection_status
    return (
        <>
            <ModalHeader>Connect Your Profile</ModalHeader>
            <Flex spaceEvenly>
                <MediaButton column center alignCenter onClick={() => connectYoutube("YouTube")} disabled={!!youtubeStatus}>
                    <img src={youtubeIcon} width="40px" height="40px"></img>
                    <div className="buttonText">YouTube</div>
                </MediaButton>
            </Flex>
        </>
    )
}

export default YoutubeConnectButton;