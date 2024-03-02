import { Button, Popover, Select, Tooltip } from "antd";
import React from "react";
import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import DateTagFilter from "./DateTagFilter";
import SmallDownIcon from "../../../../../components/icons/SmallDownIcon";
import { useEffect } from "react";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";
import CategoryIcon from "../../../../../components/icons/CategoryIcon";
import EqualSymbolIcon from "../../../../../components/icons/EqualSymbolIcon";

const FilterWrapper = styled.div`
    padding: 24px 10px 40px 10px;
    .selectLabelStyle {
        color: #999999;
        font-size: 16px;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
    }
    .marginLeft {
        margin-left: 9px;
    }
    .button {
        color: #4D4D4D;
    font-weight: 700;
    font-size: 16px;
    margin-top: 4px;
    cursor: pointer;
    }
    .marginSelect {
        margin-right: 24px;
    }
    .totalText {
        font-weight: 700;
font-size: 16px;
color: ${lightColorsTheme.textColorLight};
    }
`;
const NewOldSelectFilter = styled(Select)`
.ant-select-selection-item {
    color: #4D4D4D;
    font-weight: 700;
    font-size: 16px;
}
.ant-select-arrow {
    color: #4D4D4D;
    font-size: 12px;
}
`
const FilterPopover = styled(Popover)`
.ant-popover-inner-content {
    padding: 0 !important;
};
`
const AppearanceModifier = styled(Flex)`
    width: 90px;
    height: 40px;
    background: #F4F4F5;
    border-radius: 5px;
    margin-left: 30px;
`
const AppearanceButton = styled(Button)`
    width: 40px;
    height: 30px;
    padding: 0;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F4F4F5;
    border: none !important;
    &:hover {
        background-color: #F4F4F5;
    }
    ${props => props.displayType && `background-color: #FFFFFF !important;`}
`

const CustomerFilters = ({
    contactList,
    searchTag,
    fromDate,
    toDate,
    setNewOldFilter,
    setSearchTag,
    setFromDate,
    setToDate,
    newOldFilter,
    pageNumber,
    setPageNumber,
    setAppearance,
    appearance,
}) => {
    const contacts = useSelector(state => state.customerReducer.contacts, shallowEqual)
    useEffect(() => {
        contactList(newOldFilter, searchTag, fromDate, toDate, pageNumber)
    }, [newOldFilter, searchTag, fromDate, toDate, pageNumber])
    useEffect(() => {
        setPageNumber(1)
    }, [newOldFilter, searchTag, fromDate, toDate])
    return (
        <>
            <FilterWrapper>
                <Flex
                    spaceBetween={(contacts?.customer_count === 0) ? false : true}
                    flexEnd={(contacts?.customer_count === 0) ? true : false}
                >
                    <div></div>
                    <Flex flexEnd alignCenter>
                        <div className="marginSelect">
                            <FilterPopover
                                trigger="click"
                                content={
                                    <DateTagFilter
                                        setSearchTag={setSearchTag}
                                        searchTag={searchTag}
                                        setFromDate={setFromDate}
                                        setToDate={setToDate}
                                        toDate={toDate}
                                        fromDate={fromDate}
                                    />
                                }
                                placement="bottom"
                                showArrow={false}
                                color="white"
                                overlayInnerStyle={{
                                    borderRadius: "10px",
                                }}
                            >
                                <Flex alignCenter className="button">Filter by <SmallDownIcon className="marginLeft" /></Flex>
                            </FilterPopover>
                        </div>
                        <div>
                            <label className="selectLabelStyle">Sort by:{" "}</label>
                            <NewOldSelectFilter
                                value={newOldFilter}
                                onChange={(val) => setNewOldFilter(val)}
                                name="newOldFilter"
                                bordered={false}
                                suffixIcon={<SmallDownIcon />}
                            >
                                <Option value="DESC">Newest</Option>
                                <Option value="ASC">Oldest</Option>
                            </NewOldSelectFilter>
                        </div>
                        <div>
                            <AppearanceModifier alignCenter center>
                                <AppearanceButton onClick={() => setAppearance("table")} displayType={appearance === "table"}>
                                    <EqualSymbolIcon appearance={appearance} />
                                </AppearanceButton>
                                <AppearanceButton onClick={() => setAppearance("cards")} displayType={appearance === "cards"}>
                                    <CategoryIcon appearance={appearance}/>
                                </AppearanceButton>
                            </AppearanceModifier>
                        </div>
                    </Flex>
                </Flex>
            </FilterWrapper>
        </>
    )
}

export default CustomerFilters;