import React, { useEffect, useState } from "react";
import Flex from "../../../../components/common/Flex";
import * as C from "./ConnectedAccounts.styles";
import SocialMediaPopup from "./SocialMediaPopup";
import UnconnectedCard from "./UnconnectedCard";
import { getSocialMediaList } from "../../actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ConnectedMedia from "./ConnectedComponents";

const ConnectedAccounts = ({FB_INST_Disconnect}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const socialMediaList = useSelector(state => state.integrationSelector.socialMediaList, shallowEqual)
    //const connectedList = socialMediaList?.length > 0 && socialMediaList?.filter(data => data.connection_status === 1)
    useEffect(() => {
        dispatch(getSocialMediaList())
    }, [])
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <C.AccountWrapper>
                <C.AccountBox>
                    <Flex spaceBetween className="marginBottom">
                        <div className="header">Connected Accounts</div>
                        <C.ConnectButton onClick={() => handleOpen()}>Connect</C.ConnectButton>
                    </Flex>
                    <ConnectedMedia socialMediaList={socialMediaList} FB_INST_Disconnect={FB_INST_Disconnect} />
                </C.AccountBox>
            </C.AccountWrapper>
            <SocialMediaPopup
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}

export default ConnectedAccounts;
