import { Button, DatePicker, Input, Tabs } from "antd";
import React from "react";
import styled from "styled-components";
import BlueCalenderIcon from "../../../../../components/icons/BlueCalenderIcon";
import BlueTagIcon from "@components/icons/BlueTagIcon";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";
import GrayCalenderIcon from "../../../../../components/icons/GrayCalenderIcon";
import Flex from "../../../../../components/common/Flex";
import { useState } from "react";
import SearchInputIcon from "@components/icons/SearchInputIcon";
import SearchIcon from "../../../../../components/icons/SearchIcon";
import dayjs from "dayjs";
import moment from "moment";
import DarkBlueTagIcon from "../../../../../components/icons/DarkBlueTagIcon";
import DashboardCalendar from '@components/icons/DashboardCalendar'

const ParentBox = styled.div`
    padding: 0;
    .tabStyle {
        border-radius: 10px;
    }
    .filterTab {
        width: 175px;
        height: 50px;
    }
    .blueBox {
        width: 420px;
        height: 70px;
        background-color: ${lightColorsTheme.primary};
        border-radius: 10px;
    }
    .rightMargin {
        margin-right: 5px;
    }
    .toText {
        margin-right: 16px;
        margin-left: 16px;
        font-weight: 700;
        font-size: 16px;
        margin-top: 4px;
        color: ${lightColorsTheme.textColorLight};
    }
`;
const CommonButtonStyle = styled(Button)`
display: inline-flex;
align-items: center;
border: none !important;
width: 175px;
height: 50px;
margin-right: 15px;
margin-left: 15px;
background-color: ${lightColorsTheme.primary};
border-radius: 10px;
&.active {
    background-color: ${lightColorsTheme.additionalBackground};
    color: #003E66;
}
&:focus {
    background-color: ${lightColorsTheme.additionalBackground};
    color: #003E66;
}
&:hover {
    color: #003E66;
}
`
const StyledDatePicker = styled(DatePicker)`
    width: 164px;
    height: 40px;
`;
const DateButton = styled(CommonButtonStyle)`
    ${props => props.activeButton === "date" && `background-color: ${lightColorsTheme.additionalBackground};`}
`
const TagButton = styled(CommonButtonStyle)`
    ${props => props.activeButton === "tags" && `background-color: ${lightColorsTheme.additionalBackground};`}
`;
const SearchInput = styled(Input)`
    width: 340px;
    height: 40px;
    background: #F4F4F5 !important;
    border-radius: 5px;
    border: none !important;
    input {
        background: #F4F4F5 !important;
    }
    margin: 18px 40px 18px 40px;
`;
const DataWrapper = styled(Flex)`
filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15));
border-radius: 5px;
border:1px solid rgba(0, 0, 0, 0.15);
width: 164px;
height: 40px;
`;

const DateTagFilter = ({
    setSearchTag,
    searchTag,
    setFromDate,
    setToDate,
    toDate,
    fromDate,
}) => {
    const [activeButton, setActiveButton] = useState("date");
    const [displayFromDate, setDisplayFromDate] = useState();
    const [displayToDate, setDisplayToDate] = useState();
    const fromDateHandler = (date, dateString) => {
        const formatDate = dateString ? moment(date)?.format('DD-MM-YYYY') : ""
        setFromDate(formatDate)
        setDisplayFromDate(date)
    }
    const toDateHandler = (date, dateString) => {
        const formatDate = dateString ? moment(date)?.format('DD-MM-YYYY') : ""
        setToDate(formatDate)
        setDisplayToDate(date)
    }
    const disabledFromDate = current => {
        let customDate = new Date()?.getTime();
        let selectedDate = new Date(current)?.getTime();
        let endDate = new Date(displayToDate)?.getTime();
        if (selectedDate && selectedDate > customDate) {
            return true;
        }
        if (selectedDate > endDate) {
            return true;
        }
    }
    const disabledFutureDate = current => {
        let customDate = new Date()?.getTime();
        let selectedDate = new Date(current)?.getTime();
        if (selectedDate && selectedDate > customDate) {
            return true;
        }
    }
    const disabledToDate = current => {
        let customDate = new Date()?.getTime();
        let selectedDate = new Date(current)?.getTime();
        let startDate = new Date(displayFromDate)?.getTime();
        if (selectedDate && selectedDate > customDate) {
            return true;
        }
        if (selectedDate < startDate) {
            return true;
        }
    }
    return (
        <>
            <ParentBox>
                <Flex className="blueBox" alignCenter>
                    <DateButton className="filterTabButton" activeButton={activeButton} onClick={() => setActiveButton("date")}>
                        <BlueCalenderIcon className="rightMargin" />
                        Filter By Date
                    </DateButton>
                    <TagButton className="filterTabButton two" activeButton={activeButton} onClick={() => setActiveButton("tags")}>
                        <DarkBlueTagIcon className="rightMargin" />
                        Filter By Tags
                    </TagButton>
                </Flex>
                <div>
                    {activeButton === "date" && <>
                        <Flex alignCenter style={{ margin: "20px 0 0 18px" }}>
                            <DataWrapper>
                                <div style={{ padding: "7px 0px 0px 20px" }}><DashboardCalendar /></div>
                                <StyledDatePicker
                                    placeholder="DD-MM-YY"
                                    onChange={fromDateHandler}
                                    bordered={false}
                                    suffixIcon={false}
                                    disabledDate={(displayToDate && disabledFromDate) || disabledFutureDate}
                                    value={displayFromDate}
                                    format={"DD-MM-YYYY"}
                                />
                            </DataWrapper>
                            <div className="toText">To</div>
                            <DataWrapper>
                                <div style={{ padding: "7px 0px 0px 20px" }}><DashboardCalendar /></div>
                                <StyledDatePicker
                                    placeholder="DD-MM-YY"
                                    onChange={toDateHandler}
                                    bordered={false}
                                    suffixIcon={false}
                                    disabledDate={(displayFromDate && disabledToDate) || disabledFutureDate}
                                    value={displayToDate}
                                    format={"DD-MM-YYYY"}
                                />
                            </DataWrapper>
                        </Flex>
                    </>}
                    {activeButton === "tags" && <>
                        <SearchInput
                            placeholder="Search Tag Keywords..."
                            prefix={<SearchIcon style={{ marginRight: "6px" }} />}
                            onChange={(e) => setSearchTag(e.target.value)}
                            value={searchTag}
                            name="searchTag"
                            autoComplete={false}
                        />
                    </>}
                </div>
            </ParentBox>
        </>
    )
}

export default DateTagFilter;