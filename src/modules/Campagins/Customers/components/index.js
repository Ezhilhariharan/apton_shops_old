import React, { useEffect, useState } from "react";
import AddNewContact from "./partials/AddNewContact";
import Flex from '@components/common/Flex';
import { shallowEqual, useSelector } from "react-redux";
import ContactTable from "./partials/ContactTable";
import styled from "styled-components";
import { lightColorsTheme } from "../../../../theme/styles/light/lightTheme";
import CustomerFilters from "./partials/CustomerFilters";
import CustomerCards from "./partials/CustomerCards";

const TableWrapper = styled.div`
    background-color: ${lightColorsTheme.additionalBackground};
    margin: 7px 10px 0px 10px;
    padding: 10px 20px 25px 20px;
    border-radius: 10px;
`;

const WhatsappCustomers = ({
    //actions
    contactList,
    createWhatsappContact,
    singleContactDetails,
    deleteContact,
    updateEditedContact,
    removeContactDetailsCancelSubmit,
    exportFileMethod,
    bulkUploadMethod,
}) => {
    const [newOldFilter, setNewOldFilter] = useState("DESC");
    const [searchTag, setSearchTag] = useState("");
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [limit, setLimit] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [appearance, setAppearance] = useState("table")
    const [selectedKeys, setSelectedKeys] = useState([]);
    const selectedBrand = useSelector(state => state.parentReducer.switchedBrand, shallowEqual)
    useEffect(() => {
        if(appearance === "table") {
            contactList()
        }
        else if(appearance === "cards") {
            let limits = window?.screen?.width > 1812 ? 10 : 12;
            setLimit(limits)
            contactList(newOldFilter, searchTag, fromDate, toDate, pageNumber, limits)
        }
    }, [selectedBrand?.id, appearance, window?.screen?.width])
    useEffect(() => {
        setSelectedKeys([])
    }, [appearance])
    const contacts = useSelector(state => state.customerReducer.contacts, shallowEqual)
    return (
        <>
            <AddNewContact
                createWhatsappContact={createWhatsappContact}
                removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
                exportFileMethod={exportFileMethod}
                bulkUploadMethod={bulkUploadMethod}
                newOldFilter={newOldFilter}
                searchTag={searchTag}
                fromDate={fromDate}
                toDate={toDate}
                contacts={contacts}
                deleteContact={deleteContact}
                setSelectedKeys={setSelectedKeys}
                selectedKeys={selectedKeys}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                limit={limit}
            />
            <TableWrapper>
                <CustomerFilters
                    contactList={contactList}
                    newOldFilter={newOldFilter}
                    searchTag={searchTag}
                    fromDate={fromDate}
                    toDate={toDate}
                    setNewOldFilter={setNewOldFilter}
                    setSearchTag={setSearchTag}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    setAppearance={setAppearance}
                    appearance={appearance}
                />
                {appearance === "table" ? <ContactTable
                    singleContactDetails={singleContactDetails}
                    deleteContact={deleteContact}
                    updateEditedContact={updateEditedContact}
                    removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
                    contactList={contactList}
                    selectedBrand={selectedBrand}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    setSelectedKeys={setSelectedKeys}
                    selectedKeys={selectedKeys}
                    limit={limit}
                /> : <CustomerCards
                    singleContactDetails={singleContactDetails}
                    deleteContact={deleteContact}
                    updateEditedContact={updateEditedContact}
                    removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
                    contactList={contactList}
                    selectedBrand={selectedBrand}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    setSelectedKeys={setSelectedKeys}
                    selectedKeys={selectedKeys}
                    fromDate={fromDate}
                    toDate={toDate}
                    searchTag={searchTag}
                    newOldFilter={newOldFilter}
                    appearance={appearance}
                    limit={limit}
                />}
            </TableWrapper>
        </>
    )
}

export default WhatsappCustomers;