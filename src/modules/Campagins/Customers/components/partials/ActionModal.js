import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";

const EachTab = styled(Button)`
    height: 25px;
    margin-top: 10px;
    border: none !important;
    background-color: transparent !important;
    margin-left: 10px;
`;
const PopupChild = styled.div`
    background-color: ${lightColorsTheme.additionalBackground};
    width: 100px;
    height: auto;
    border-radius: 10px;
    filter: drop-shadow(0px 0px 14px rgba(0, 0, 0, 0.15));
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 20px;
`

const ActionModal = ({
    openAction,
    deleteContact,
    singleContactDetails,
    setEditContact,
    contactId,
    SetOpenAction,
    setOpenPreview,
    pageNumber,
    limit,
    contacts,
    setPageNumber,
}) => {
    const editContact = () => {
        setEditContact(true)
        singleContactDetails(contactId, pageNumber)
        SetOpenAction(null)
    }
    const previewContact = () => {
        singleContactDetails(contactId, "preview")
        setOpenPreview(true)
        SetOpenAction(null)
    }
    const deleteHandle = () => {
        deleteContact(contactId, Math.ceil(contacts?.customer_count/limit) === pageNumber ? 1 : pageNumber, "", Math.ceil(contacts?.customer_count/limit) === pageNumber && setPageNumber)
        SetOpenAction(null)
    }
    return (
        <>
            <PopupChild>
                <div>
                    <EachTab onClick={editContact}>
                        <span key='0'>Edit</span>
                    </EachTab>
                    <EachTab onClick={previewContact}>
                        <span key='1'>Preview</span>
                    </EachTab>
                    <EachTab onClick={deleteHandle}>
                        <span key='2'>Delete</span>
                    </EachTab>
                </div>
            </PopupChild>
        </>
    )
}

export default ActionModal;