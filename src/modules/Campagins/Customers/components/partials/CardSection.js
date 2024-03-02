import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import ThreeDotsHorizontalIcon from "../../../../../components/icons/ThreeDotsHorizontalIcon";
import * as C from "./CardSectionStyles";
import BlueTagIcon from "@components/icons/BlueTagIcon";
import CallContactIcon from "@components/icons/CallContactIcon";
import MailContactIcon from "@components/icons/MailContactIcon";
import RoundedTagIcon from "../../../../../components/icons/RoundedTagIcon";
import { Checkbox, Col, Dropdown, Row } from "antd";
import ActionModal from "./ActionModal";
import ActionDropDown from "./ActionDropDown";
import IphonIcon from "../../../../../components/icons/IphonIcon";

const CardSection = ({
    customer,
    singleContactDetails,
    deleteContact,
    updateEditedContact,
    removeContactDetailsCancelSubmit,
    pageNumber,
    setSelectedKeys,
    selectedKeys,
    fromDate,
    toDate,
    searchTag,
    newOldFilter,
    appearance,
    abbreviationColor,
    limit,
    contacts,
    setPageNumber,
}) => {
    const [selectChecked, setSelectChecked] = useState({});
    useEffect(() => {
        setSelectedKeys([])
        setSelectChecked({})
    }, [pageNumber, fromDate, toDate, searchTag, newOldFilter, appearance])
    const handleCheckbox = (e) => {
        setSelectChecked({ ...selectChecked, [e.target.name]: e.target.checked })
        if (e.target.checked) {
            const checkedData = [...selectedKeys];
            checkedData.push(customer?.id)
            setSelectedKeys([...new Set(checkedData)])
        }
        else {
            const needToRemove = [...selectedKeys];
            const remianing = needToRemove?.filter((data) => data !== customer?.id)
            setSelectedKeys([...new Set(remianing)])
        }
    }
    const lengthOfRemainingTags = (customer?.tags?.length > 0 && Array.isArray(customer?.tags)) ?
        customer?.tags?.slice(2, customer?.tags?.length) : 0;
    return (
        <C.CustomerCard>
            <Flex spaceBetween>
                <C.StyledCheckbox
                    onChange={(e) => handleCheckbox(e)}
                    name={customer.id}
                    checked={selectChecked[customer.id]}
                />
                <ActionDropDown
                    customer={customer}
                    singleContactDetails={singleContactDetails}
                    deleteContact={deleteContact}
                    updateEditedContact={updateEditedContact}
                    removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
                    pageNumber={pageNumber}
                    limit={limit}
                    contacts={contacts}
                    setPageNumber={setPageNumber}
                />
            </Flex>
            <Flex center>
                <div>
                    <Flex center>
                        <C.AbbreviationBox abbreviationColor={abbreviationColor}>
                            {customer?.last_name ? customer?.first_name[0]?.toUpperCase() + customer?.last_name[0]?.toUpperCase() :
                                customer?.first_name[0]?.toUpperCase()}
                        </C.AbbreviationBox>
                    </Flex>
                    <C.NameBox alignCenter center>
                        {customer?.last_name ? customer?.first_name + " " + customer?.last_name :
                            customer?.first_name}
                    </C.NameBox>
                    <C.PhoneEmailStyle alignCenter>
                        <CallContactIcon className="iconStyle" />{customer?.phone_number}
                    </C.PhoneEmailStyle>
                    <C.PhoneEmailStyle alignCenter>
                        <MailContactIcon className="iconStyle" />{customer?.email ? <span className="ellipsis">{customer?.email}</span> : <span>{" "}{" "}<IphonIcon /></span>}
                    </C.PhoneEmailStyle>
                    {(customer?.tags && customer?.tags?.length > 0 && Array.isArray(customer?.tags)) ? <Flex>
                        <RoundedTagIcon className="iconStyle" />
                        <C.CenteredRow gutter={[5, 10]}>
                            {customer?.tags?.slice(0, 2)?.map((tag, tagIndex) => (
                                <Col key={tagIndex}>
                                    <C.TagStyle>
                                        {tag}
                                    </C.TagStyle>
                                </Col>
                            ))}
                            <Col>
                                {lengthOfRemainingTags && lengthOfRemainingTags?.length > 0 && <C.TagStyle>
                                    +{lengthOfRemainingTags?.length}
                                </C.TagStyle>}
                            </Col>
                        </C.CenteredRow>
                    </Flex> : <Flex alignCenter>
                        <RoundedTagIcon className="iconStyle" />{" "}{" "}<IphonIcon />
                    </Flex>}
                </div>
            </Flex>
        </C.CustomerCard>
    )
}

export default CardSection;