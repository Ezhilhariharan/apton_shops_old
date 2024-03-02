import React from "react";
import youtubeIcon from "@assets/images/Youtube.png"
import { Col, Divider, Row, Switch,Tooltip } from "antd";
import { MediaStyle } from "../ConnectedAccounts.styles";
import Flex from "../../../../../components/common/Flex";
import UnconnectedCard from "../UnconnectedCard";
import greenDot from "@assets/images/green-dot.png";
import blueDot from "@assets/images/blue-dot.png";
import { useDispatch } from "react-redux";
import { youtubeSignUp } from "../../../actions"

const YoutubeStatus = ({ connectedAccounts, FB_INST_Disconnect,displayString }) => {
    const { API_BASEURL } = process.env;
    const dispatch = useDispatch()
    const youtubeOnly = connectedAccounts?.filter(data => data.platform_name === "YouTube")
    const youtubeDisconnect = (media, value) => {
        if (value === false) {
            FB_INST_Disconnect(media)
        }
        if (value === true) {
            const param = {
                reference_url: `&reference_url=${API_BASEURL}/integration`,
                connection_name: `&connection_name=${media}`,
                redirect_uri: `&redirect_uri=${API_BASEURL}/youtube/page_list`,
            }
            dispatch(youtubeSignUp(param))
        }
    }
    return (
        <>
            <Row gutter={[25, 25]} style={{ marginTop: "20px" }}>
                {youtubeOnly?.length > 0 && youtubeOnly?.map(media => <Col key={media.id}>
                    <MediaStyle>
                        <Flex alignCenter spaceBetween>
                            <Flex column>
                                <Flex alignCenter>
                                    <img src={youtubeIcon} width="40px" height="40px"></img>
                                    {media.configuration.page_name ?
                                    <Tooltip placement='top' title={media.configuration.page_name?.length>15 && media.configuration.page_name}>
                                        <a href={media.configuration.page_link} target="_blank" className="mediaText">
                                            {displayString(media.configuration.page_name)}</a> </Tooltip>:
                                        <div className="mediaText">YouTube</div>
                                    }
                                </Flex>
                                <div className="connectText">Connect your Youtube account </div>
                            </Flex>
                        </Flex>
                        <Divider />
                        <Flex spaceBetween>
                            {media.connection_status === 1 ? <Flex alignCenter>
                                <img src={greenDot}></img>
                                <div className="greenText">Connected</div>
                            </Flex> : <Flex>
                                <img src={blueDot}></img>
                                <div className="blueText">Connect</div>
                            </Flex>}
                            <Switch style={{ color: "#4AACEA" }} defaultChecked={media.connection_status === 1} onChange={(e) => youtubeDisconnect(media?.platform_name, e)}></Switch>
                        </Flex>
                    </MediaStyle>
                </Col>)}
            </Row>
            {(youtubeOnly?.length === 0 || !youtubeOnly) && <UnconnectedCard />}
        </>
    )
}

export default YoutubeStatus;