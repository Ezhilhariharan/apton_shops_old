import React from "react";
import Flex from "../../../../components/common/Flex";
import { MediaButton, ModalHeader } from "./ConnectedAccounts.styles";
import facebookAdIcon from "@assets/images/facebook-ad.svg"
import facebookGroupIcon from "@assets/images/Facebook Group.svg"
import facebookPageIcon from "@assets/images/Facebook Page.svg"
import { FB_INST_integration, connectFBGroups } from "../../actions"
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const FacebookConnectButton = () => {
    const dispatch = useDispatch()
    const { API_BASEURL } = process.env;
    const socialMediaList = useSelector(state => state.integrationSelector.socialMediaList, shallowEqual)
    const connectFacebookPage = (text) => {
        const parameters = {
            reference_url: `&reference_url=${API_BASEURL}/integration`,
            connection_name: `&connection_name=${text}`,
            redirect_uri: `&redirect_uri=${API_BASEURL}/facebook/page_list`,
        }
        dispatch(FB_INST_integration(parameters))
    }
    const connectFacebookGroup = () => {
        dispatch(connectFBGroups())
    }
    const connectFacebookAds = text => {
        const param = {
            reference_url: `&reference_url=${API_BASEURL}/integration`,
            connection_name: `&connection_name=${text}`,
            redirect_uri: `&redirect_uri=${API_BASEURL}/facebook-ads-auth`,
        }
        dispatch(FB_INST_integration(param))
    }
    const facebookPageConnectStatus = socialMediaList?.filter(data => data.platform_name === "Facebook")?.[0]?.connection_status
    const faceGroupConnectStatus = socialMediaList?.filter(data => data.platform_name === "Facebook Groups")?.[0]?.connection_status
    const facebookAdsStatus = socialMediaList?.filter(data => data.platform_name === "Facebook Ads")?.[0]?.connection_status

    return (
        <>
            <ModalHeader>Connect Your Profile</ModalHeader>
            <Flex spaceEvenly>
                {facebookData?.map(data => (
                    <div key={data.text}>
                        {data.text === "Facebook" &&
                            <MediaButton onClick={() => connectFacebookPage(data.text)} disabled={!!facebookPageConnectStatus}>
                                <Flex column center alignCenter>
                                    <img src={data.icon} width="40px" height="40px"></img>
                                    <div className="buttonText">Facebook Page</div>
                                </Flex>
                            </MediaButton>}
                        {data.text === "Facebook Groups" &&
                            <MediaButton key={data.text} onClick={() => connectFacebookGroup()} disabled={!!faceGroupConnectStatus}>
                                <Flex column center alignCenter>
                                    <img src={data.icon} width="40px" height="40px"></img>
                                    <div className="buttonText">Facebook Group</div>
                                </Flex>
                            </MediaButton>}
                        {/* {data.text === "Facebook Ads" &&
                            <MediaButton key={data.text} onClick={() => connectFacebookAds(data.text)} disabled={!!facebookAdsStatus}>
                                <Flex column center alignCenter>
                                    <img src={data.icon} width="40px" height="40px"></img>
                                    <div className="buttonText">Facebook Ad Account</div>
                                </Flex>
                            </MediaButton>
                        } */}
                    </div>
                ))}
            </Flex>
        </>
    )
}

export default FacebookConnectButton;

const facebookData = [
    {
        text: 'Facebook',
        icon: facebookPageIcon,
    },
    {
        text: 'Facebook Groups',
        icon: facebookGroupIcon,
    },
    {
        text: "Facebook Ads",
        icon: facebookAdIcon,
    }
]