import React, { useState } from "react";
import WhatsAppIcon from "@assets/images/WhatsApp.svg"
import { Button, Col, Divider, Popover, Row, Switch, Form, Input, Modal, Tooltip, Typography } from "antd";
import { MediaStyle } from "../ConnectedAccounts.styles";
import Flex from "../../../../../components/common/Flex";
import UnconnectedCard from "../UnconnectedCard";
import ThreeDotsHorizontalIcon from "../../../../../components/icons/ThreeDotsHorizontalIcon";
import greenDot from "@assets/images/green-dot.png";
import { WhatsappPopoverContent } from "./WhatsappPopoverContent";
import { whatsappAuthenticationStepOne } from "../../../actions"
import { useDispatch } from "react-redux";
import blueDot from "@assets/images/blue-dot.png";

const WhatsappStatus = ({ connectedAccounts, FB_INST_Disconnect }) => {
    const dispatch = useDispatch()
    const [popoverOpen, setPopoverOpen] = useState(false);
    const whatsappOnly = connectedAccounts?.filter(data => data.platform_name === "WhatsApp")
    const whatsappDisconnect = (media, value) => {
        if (value === false) {
            FB_INST_Disconnect(media)
        }
        if (value === true) {
            dispatch(whatsappAuthenticationStepOne())
        }
    }
    return (
        <>
            <Row gutter={[25, 25]} style={{ marginTop: "20px" }}>
                {whatsappOnly?.length > 0 && whatsappOnly?.map(media => <Col key={media.id} span={12}>
                    <MediaStyle>
                        <Flex alignCenter spaceBetween>
                            <Flex column>
                                <Flex alignCenter>
                                    <img src={WhatsAppIcon} width="40px" height="40px"></img>
                                    {media.configuration.phone_number ?
                                        <div className="mediaText">{media.configuration.phone_number}</div> :
                                        <div className="mediaText">WhatsApp</div>
                                    }
                                </Flex>
                            </Flex>
                            <Popover
                                content={() => WhatsappPopoverContent(media, setPopoverOpen)}
                                open={popoverOpen}
                                color="white"
                                placement="bottom"
                                style={{ cursor: 'pointer' }}
                                onOpenChange={() => setPopoverOpen(state => !state)}
                            >
                                <Button
                                    type="text"
                                    onMouseOver={() => setPopoverOpen(true)}
                                    style={{ cursor: 'pointer', background: "transparent" }}
                                >
                                    <ThreeDotsHorizontalIcon style={{ transform: "rotate(270deg)" }} />
                                </Button>
                            </Popover>
                        </Flex>
                        <div className="connectText">Connect your WhatsApp business API here</div>
                        <Divider />
                        <Flex spaceBetween>
                            {media.connection_status === 1 ? <Flex alignCenter>
                                <img src={greenDot}></img>
                                <div className="greenText">Connected</div>
                            </Flex> : <Flex alignCenter>
                                <img src={blueDot}></img>
                                <div className="blueText">Connect</div>
                            </Flex>}
                            <Switch style={{ color: "#4AACEA" }} defaultChecked={media.connection_status === 1} onChange={(e) => whatsappDisconnect(media?.platform_name, e)}></Switch>
                        </Flex>
                    </MediaStyle>
                </Col>)}
            </Row>
            {(whatsappOnly?.length === 0 || !whatsappOnly) && <UnconnectedCard />}
        </>
    )
}

export default WhatsappStatus;