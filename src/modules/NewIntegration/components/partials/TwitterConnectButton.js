import React from "react";
import Flex from "../../../../components/common/Flex";
import { MediaButton, ModalHeader } from "./ConnectedAccounts.styles";
import twitterIcon from "@assets/images/twitter.png";
import { twitterSignUp } from "../../actions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const TwitterConnectButton = () => {
    const socialMediaList = useSelector(state => state.integrationSelector.socialMediaList, shallowEqual)
    const dispatch = useDispatch()
    const connectTwitter = () => {
        dispatch(twitterSignUp())
    }
    const twiiterStatus = socialMediaList?.filter(data => data.platform_name === "Twitter")?.[0]?.connection_status
    return (
        <>
            <ModalHeader>Connect Your Profile</ModalHeader>
            <Flex spaceEvenly>
                <MediaButton column center alignCenter onClick={connectTwitter} disabled={!!twiiterStatus}>
                    <img src={twitterIcon} width="40px" height="40px"></img>
                    <div className="buttonText">Twitter</div>
                </MediaButton>
            </Flex>
        </>
    )
}

export default TwitterConnectButton;