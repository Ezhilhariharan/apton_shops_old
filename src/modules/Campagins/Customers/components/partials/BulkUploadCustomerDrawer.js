import { Button, Drawer } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import CloseCircleAddCustomer from "../../../../../components/icons/CloseCircleAddCustomer";
import { CustomizedDrawer, CloseButton } from "./AddCustomerDrawer";
import CustomerFileUploader from "./CustomerFileUploader";
import { updateErrorFileUpload, updateBulkUploadCSV } from "../../actions";
import { useDispatch } from "react-redux";

const ColorLessButton = styled("button")`
    background-color: none !important;
    border: none !important;
    border-radius: 50px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        background-color: #cccccc;
    }
`
const BulkUploadCustomerDrawer = ({
    open,
    placement,
    setOpen,
    bulkUploadMethod,
}) => {
    const [fileList, setFileList] = useState();
    const [isCallUploadAPI, setUploadApi] = useState(true)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false)
    const close = () => {
        setOpen(false)
        setFileList([])
        dispatch(updateErrorFileUpload(""))
        setShowError(false)
        dispatch(updateBulkUploadCSV({}))
        setUploadApi(true)
    }
    return (
        <>
            <CustomizedDrawer
                open={open}
                //onClose={close}
                placement={placement}
                closable={false}
                contentWrapperStyle={{
                    width: "500px"
                }}
                bodyStyle={{
                    margin: "20px"
                }}
                style={{ boxShadow: "none" }}
            >
                <Flex spaceBetween className="marginTop">
                    <div className="textFont">Bulk upload</div>
                    <div>
                        <ColorLessButton onClick={close} disabled={loading}><CloseCircleAddCustomer /></ColorLessButton>
                    </div>
                </Flex>
                <CustomerFileUploader
                    bulkUploadMethod={bulkUploadMethod}
                    setOpen={setOpen}
                    fileList={fileList}
                    setFileList={setFileList}
                    setLoading={setLoading}
                    loading={loading}
                    showError={showError}
                    setShowError={setShowError}
                    setUploadApi={setUploadApi}
                    isCallUploadAPI={isCallUploadAPI}
                />
            </CustomizedDrawer>
        </>
    )
}

export default BulkUploadCustomerDrawer;