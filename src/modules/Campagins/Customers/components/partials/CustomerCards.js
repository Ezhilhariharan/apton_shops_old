import { Col, Row } from "antd";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import CardSection from "./CardSection";
import { CustomerPagination } from "./ContactTable";
import noCustomerImage from "@public/nocamp.png";
import { setOfColors } from "./SetOfColors";

const StyledPagination = styled(CustomerPagination)`
    margin-top: 50px;
    margin-bottom: 30px;
`
const NoCustomerText = styled.div`
    color: #4D4D4D;
    font-weight: 550;
    font-size: 22px;
    padding-bottom: 20px;
`
const CardWrapper = styled.div`
    padding-bottom: 15px;
`

const CustomerCards = ({
    deleteContact,
    singleContactDetails,
    updateEditedContact,
    removeContactDetailsCancelSubmit,
    contactList,
    selectedBrand,
    pageNumber,
    setPageNumber,
    setSelectedKeys,
    selectedKeys,
    fromDate,
    toDate,
    searchTag,
    newOldFilter,
    appearance,
    limit,
}) => {
    const contacts = useSelector(state => state.customerReducer.contacts, shallowEqual)
    const handlePagination = (page) => {
        setPageNumber(page)
    }
    return (
        <CardWrapper>
            <Row gutter={[60, 60]} style={{marginLeft: "7px"}}>
                {contacts?.brand_customers?.length > 0 && contacts?.brand_customers?.map((customer, custInd) => {
                    return (
                        <Col key={custInd}>
                            <CardSection
                                customer={customer}
                                deleteContact={deleteContact}
                                singleContactDetails={singleContactDetails}
                                updateEditedContact={updateEditedContact}
                                removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
                                pageNumber={pageNumber}
                                setSelectedKeys={setSelectedKeys}
                                selectedKeys={selectedKeys}
                                fromDate={fromDate}
                                toDate={toDate}
                                searchTag={searchTag}
                                newOldFilter={newOldFilter}
                                appearance={appearance}
                                abbreviationColor={setOfColors[custInd]}
                                limit={limit}
                                contacts={contacts}
                                setPageNumber={setPageNumber}
                            />
                        </Col>
                    )
                })}
            </Row>
            {contacts?.brand_customers?.length === 0 && <Flex column center alignCenter>
                <img src={noCustomerImage}></img>
                <NoCustomerText>No customer data available for this brand</NoCustomerText>
            </Flex>}
            {contacts?.customer_count > 10 && <Flex end>
                <StyledPagination
                    total={contacts?.customer_count}
                    current={pageNumber}
                    onChange={handlePagination}
                />
            </Flex>}
        </CardWrapper>
    )
}

export default CustomerCards;