import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";
import BlueTagIcon from "@components/icons/BlueTagIcon";
import CallContactIcon from "@components/icons/CallContactIcon";
import LocationContactIcon from "@components/icons/LocationContactIcon";
import MailContactIcon from "@components/icons/MailContactIcon";
import TimeContactIcon from "@components/icons/TimeContactIcon";
import { Col, Grid, Row } from "antd";
import IphonIcon from "../../../../../components/icons/IphonIcon";

const ShortText = styled(Flex)`
    font-size: 38px;
    font-weight: 500;
    color: #999999;
    width: 80px !important;
    height: 80px !important;
    background-color: #F4F4F5;
    border-radius: 50px;
    margin-right: 20px;
`;
const FullNameBox = styled(Flex)`
    max-width: 300px;
    .fullNameText {
        color: ${lightColorsTheme.textColorLight};
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 1rem;
    }
    .blueTags {
        color: #3771C8;
        background: rgba(55, 113, 200, 0.1);
        border-radius: 20px;
        padding: 6px;
        text-align: center;
    }
    .blueIcon {
        margin-right: 6px;
    }
`;
const ParentWrapper = styled.div`
    .border {
        border-bottom: 1px solid #F4F4F5;
        padding-bottom: 15px;
        margin-bottom: 15px;
    }
    .otherContent {
        font-size: 14px;
        font-weight: 700;
        color: ${lightColorsTheme.textColorLight};
        margin-bottom: 20px;
    }
    .marginRightIcon {
        margin-right: 10px;
        min-width: 30px;
        min-height: 30px;
    }
    .ellipsis {
        width: 220px;
        white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    }
`

const PreviewContent = () => {
    const contactDetails = useSelector(state => state.customerReducer.previewDetails, shallowEqual);
    const time = new Date(contactDetails?.updated_at)
    const monthNumber = time.getMonth();
    time.setMonth(monthNumber - 1);
    const shortMonth = time.toLocaleString([], { month: 'short' })
    const date = time.getDate();
    const year = time.getFullYear();
    return (
        <>
            <ParentWrapper>
                {Object.keys(contactDetails)?.length > 0 && <div>
                    <Flex className="border">
                        <ShortText centerVertically center>
                            {contactDetails?.last_name ?
                                contactDetails?.first_name[0]?.toUpperCase() + contactDetails?.last_name[0]?.toUpperCase() :
                                contactDetails?.first_name[0]}
                        </ShortText>
                        <FullNameBox centerVertically column flexStart={contactDetails?.last_name ? true : false}>
                            <div className="fullNameText">
                                {contactDetails?.last_name ?
                                    contactDetails?.first_name + " " + contactDetails?.last_name :
                                    contactDetails?.first_name}
                            </div>
                            <Flex>
                                <Row gutter={[10,8]}>
                                    {contactDetails?.tags?.length > 0 && Array.isArray(contactDetails?.tags) && contactDetails?.tags?.map((data, ind) =>
                                        <Col key={ind}>
                                            <Flex
                                                className="blueTags"
                                                alignCenter
                                            >
                                                <BlueTagIcon className="blueIcon" />
                                                {data}
                                            </Flex></Col>)}
                                </Row>
                            </Flex>
                        </FullNameBox>
                    </Flex>
                    <div>
                        <Row>
                            <Col span={contactDetails?.location ? 16 : 12}>
                                <Flex centerVertically className="otherContent">
                                    <CallContactIcon className="marginRightIcon" />
                                    {contactDetails?.phone_number}
                                </Flex>
                            </Col>
                            {contactDetails?.location && <Col span={8}>
                                <Flex centerVertically className="otherContent">
                                    <LocationContactIcon className="marginRightIcon" />
                                    {contactDetails?.location}
                                </Flex>
                            </Col>}
                            <Col span={contactDetails?.location ? 16 : 12}>
                                <Flex centerVertically className="otherContent">
                                    <MailContactIcon className="marginRightIcon" />
                                    <div className="ellipsis">{contactDetails?.email ? contactDetails?.email : <IphonIcon />}</div>
                                </Flex>
                            </Col>
                            <Col span={8}>
                                <Flex centerVertically className="otherContent">
                                    <TimeContactIcon className="marginRightIcon" />
                                    {shortMonth + " " + date + "," + year}
                                </Flex>
                            </Col>
                        </Row>
                    </div>
                </div>}
            </ParentWrapper>
        </>
    )
}

export default PreviewContent;