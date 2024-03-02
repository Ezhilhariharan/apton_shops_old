import { Dropdown } from "antd";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ThreeDotsHorizontalIcon from "../../../../../components/icons/ThreeDotsHorizontalIcon";
import ActionModal from "./ActionModal";
import AddCustomerDrawer from "./AddCustomerDrawer";
import PreviewModal from "./PreviewModal";

const ActionDropDown = ({
    singleContactDetails,
    deleteContact,
    customer,
    updateEditedContact,
    removeContactDetailsCancelSubmit,
    pageNumber,
    limit,
    setPageNumber,
}) => {
    const contacts = useSelector(state => state.customerReducer.contacts, shallowEqual)
    const [openAction, SetOpenAction] = useState(null);
    const [openEditContact, setEditContact] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const handleDropDown = (visible) => {
        if(!visible) {
            SetOpenAction(null)
        }
        else {
            SetOpenAction(customer?.id)
        }
    }
    return (
        <>
            <Dropdown
                trigger={["click"]}
                onClick={() => SetOpenAction(true)}
                onOpenChange={visible => handleDropDown(visible)}
                open={openAction === customer?.id}
                dropdownRender={() => (
                    <ActionModal
                        openAction={openAction}
                        deleteContact={deleteContact}
                        singleContactDetails={singleContactDetails}
                        setEditContact={setEditContact}
                        contactId={customer?.id}
                        SetOpenAction={SetOpenAction}
                        setOpenPreview={setOpenPreview}
                        pageNumber={pageNumber}
                        limit={limit}
                        contacts={contacts}
                        setPageNumber={setPageNumber}
                    />
                )}
            >
                <ThreeDotsHorizontalIcon className="margin" />
            </Dropdown>
            <AddCustomerDrawer
                open={openEditContact}
                setOpen={setEditContact}
                placement="right"
                updateEditedContact={updateEditedContact}
                pageNumber={pageNumber}
                type="EDIT"
                removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
            />
            <PreviewModal
                openPreview={openPreview}
                setOpenPreview={setOpenPreview}
                removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
            />
        </>
    )
}

export default ActionDropDown;