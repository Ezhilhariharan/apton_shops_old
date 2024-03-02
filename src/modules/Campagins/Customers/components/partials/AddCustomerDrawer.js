import { Button, Drawer, Form } from "antd";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import CloseCircleAddCustomer from "../../../../../components/icons/CloseCircleAddCustomer";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";
import AddCustomerForm from "./AddCustomerForm";

export const CustomizedDrawer = styled(Drawer)`
.ant-drawer-content {
    height: 86vh;
    position: absolute;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    border-radius: 10px 0px 0px 10px;
}
.ant-drawer-content-wrapper {
    box-shadow: none !important;
}
.textFont {
    font-weight: 600;
    font-size: 20px;
    color: #4D4D4D;
}
.marginTop {
    margin-top: 7px;
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 29px;
}
.ant-drawer-body::-webkit-scrollbar {
    display: none;
}
.ant-drawer-body {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
`;
export const CloseButton = styled.div`
    cursor: pointer;
`;

const AddCustomerDrawer = ({
    open,
    placement,
    setOpen,
    createWhatsappContact,
    type,
    updateEditedContact,
    removeContactDetailsCancelSubmit,
    pageNumber,
    setPageNumber,
}) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [form] = Form.useForm();
    const closeContactForm = () => {
        setOpen(false)
        removeContactDetailsCancelSubmit()
        setSelectedTags([])
        form.resetFields()
    }
    const closeHandler = () => {
        setOpen(false)
        removeContactDetailsCancelSubmit()
        setSelectedTags([])
        form.resetFields()
    }
    const contactDetails = useSelector(state => state.customerReducer.contactDetails, shallowEqual);
    return (
        <>
            <CustomizedDrawer
                open={open}
                closable={false}
                onClose={closeContactForm}
                placement={placement}
                contentWrapperStyle={{
                    width: "500px"
                }}
                bodyStyle={{
                    margin: "20px"
                }}
                style={{ boxShadow: "none" }}
            >
                <Flex spaceBetween className="marginTop">
                    <div className="textFont">Add Customer</div>
                    <CloseButton onClick={closeHandler}><CloseCircleAddCustomer /></CloseButton>
                </Flex>
                <AddCustomerForm
                    createWhatsappContact={createWhatsappContact}
                    type={type}
                    updateEditedContact={updateEditedContact}
                    setOpen={setOpen}
                    form={form}
                    contactDetails={contactDetails}
                    setSelectedTags={setSelectedTags}
                    selectedTags={selectedTags}
                    removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                />
            </CustomizedDrawer>
        </>
    )
}

export default AddCustomerDrawer;