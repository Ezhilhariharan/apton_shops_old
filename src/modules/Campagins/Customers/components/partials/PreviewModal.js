import { Modal } from "antd";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import PreviewContent from "./PreviewContent";

const CustomizedModal = styled(Modal)`
width: 440px !important;
.ant-modal-content {
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
};
.ant-modal-body {
    padding: 20px;
}
`;

const PreviewModal = ({ openPreview, setOpenPreview, removeContactDetailsCancelSubmit }) => {
    const close = () => {
        removeContactDetailsCancelSubmit()
        setOpenPreview(false)
    }
    const contactDetails = useSelector(state => state.customerReducer.previewDetails, shallowEqual);
    return (
        <>
            {Object.keys(contactDetails)?.length > 0 && <CustomizedModal
                open={openPreview}
                onCancel={close}
                footer={null}
                centered
            >
                <PreviewContent />
            </CustomizedModal>}
        </>
    )
}

export default PreviewModal;