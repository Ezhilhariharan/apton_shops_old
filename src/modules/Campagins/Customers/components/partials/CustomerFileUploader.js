import { Form, Spin, Upload } from "antd";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import CircleUploadIcon from "../../../../../components/icons/CircledUploadIcon";
import { AddCustomerButton } from "./AddCustomerForm";
import { DownloadOutlined } from '@ant-design/icons';
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";
import ExcelIcon from "../../../../../components/icons/ExcelIcon";
import { uploadFinalCSVURL, updateErrorFileUpload } from "../../actions";

const FileWrapper = styled("div")`
border: 1px dashed #D9D9D9;
border-radius: 10px;
width: 460px;
`;
const StyledUpload = styled(Upload)`
border-radius: 10px;
.uploadText {
    font-weight: 700;
    font-size: 14px;
    margin-top: 1rem;
    margin-bottom: 0.8rem;
    text-align: center;
}
.dragText {
    font-size: 12px;
    margin-bottom: 1.3rem;
    text-align: center;
}
.ant-upload-list-item-error .ant-upload-list-item-name {
    color: #181818;
font-size: 16px;
font-weight: 700;
}
.ant-upload-list-text .ant-upload-list-item-name {
    color: #181818;
font-size: 16px;
font-weight: 700;
}
.ant-upload-list-item-error .ant-upload-list-item-card-actions .anticon {
    color: #181818;
}
.ant-tooltip-inner, .ant-tooltip-placement-top .ant-tooltip-arrow {
    display: none;
}
`
const SampleCSVStyle = styled(Flex)`
    margin-bottom: 21px;
    color: ${lightColorsTheme.primary};
    font-size: 14px;
    font-weight: 700;
`
const BottomFlex = styled.div`
    position: absolute;
    bottom: 20px;
    width: 92%;
`;
const ErrorBox = styled.div`
    color: ${lightColorsTheme.passwordError};
    font-weight: 500;
    font-size: 16px;
    .errorLink {
        color: ${lightColorsTheme.passwordError};
        font-weight: 700;
        border-bottom: 2px solid ${lightColorsTheme.passwordError};
    }
`

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const { CUSTOMER_CONTACT_CSV_URL } = process.env
const CustomerFileUploader = ({
    bulkUploadMethod,
    setOpen, fileList,
    setFileList,
    setLoading,
    loading,
    showError,
    setShowError,
    isCallUploadAPI,
    setUploadApi,
}) => {
    const [form] = Form.useForm()
    const dispatch = useDispatch();
    const CSVUrl = useSelector(state => state.customerReducer.fileInfo, shallowEqual);
    const CSVFileHandler = async ({ fileList: newFileList, file: fileInfo }) => {
        const timeStamp = `_${newFileList[0]?.lastModifiedDate?.getTime()}`;
        const fileName = newFileList?.length > 0 && newFileList[0]?.name?.split("");
        const t = fileName && fileName?.lastIndexOf('.')
        dispatch(updateErrorFileUpload(""))
        fileName && fileName?.splice(t, 0, timeStamp);
        const timeStampFileName = fileName && fileName?.join("");
        setFileList(newFileList);
        setShowError(false)
        setUploadApi(true)
        switch (fileInfo.status) {
            case "done":
                setFileList(newFileList);
                setLoading(true)
                let CSVUrlSuccess = await getBase64(fileInfo.originFileObj);
                //setUploadInfo()
                const fileInformation = {
                    file_path: CSVUrlSuccess?.split(",")[1],
                    file_name: timeStampFileName,
                }
                bulkUploadMethod(fileInformation, setLoading)
                break;
            case "error":
                setFileList(newFileList);
                setLoading(true)
                let CSVUrlFail = await getBase64(fileInfo.originFileObj);
                const fileInformationError = {
                    file_path: CSVUrlFail?.split(",")[1],
                    file_name: timeStampFileName,
                }
                bulkUploadMethod(fileInformationError, setLoading)
                break;
            default:
                break;
        }
    }
    const uploadFile = () => {
        if (CSVUrl?.valid_file_url) {
            dispatch(uploadFinalCSVURL(CSVUrl?.valid_file_url, setOpen, setFileList, CSVUrl?.errors, setShowError, setUploadApi, isCallUploadAPI))
        }
    }
    const renderFile = () => {
        return (
            <>
                <div><ExcelIcon style={{ marginTop: "12px" }} /></div>
            </>
        )
    }
    const fileUploadError = useSelector(state => state.customerReducer.fileError, shallowEqual)
    const removeFile = () => {
        setFileList([])
    }
    return (
        <>
            <SampleCSVStyle end><a href={CUSTOMER_CONTACT_CSV_URL}>
                <DownloadOutlined color={lightColorsTheme.primary} /> &nbsp; Sample CSV
            </a></SampleCSVStyle>
            <Form onFinish={uploadFile} form={form}>
                <Form.Item name="CSVUploader">
                    <StyledUpload
                        name='file'
                        onChange={CSVFileHandler}
                        fileList={fileList}
                        multiple={false}
                        maxCount={1}
                        action=''
                        accept=".xlsx,.xls,.csv"
                        onRemove={() => removeFile}
                        iconRender={renderFile}
                        showUploadList={{ showProgress: true }}
                    >
                        <FileWrapper>
                            <div className="uploadText">Upload files</div>
                            <div className="dragText">Drag and drop or click to add csv file</div>
                            <div className="dragText">
                                <CircleUploadIcon />
                            </div>
                        </FileWrapper>
                    </StyledUpload>
                </Form.Item>
                {loading && <Flex center>
                    <Spin size="large" />
                </Flex>}
                {CSVUrl?.errors && showError && <ErrorBox>
                    {parseInt(CSVUrl?.errors?.overview_count) - parseInt(CSVUrl?.errors?.error_count) === 0 ?
                        <span>All rows are invalid. {" "}
                            <a href={CSVUrl?.errors?.error_file_url} className="errorLink">click here</a> {" "}
                            to download invalid data.</span>
                        :
                        <span>{parseInt(CSVUrl?.errors?.overview_count) - parseInt(CSVUrl?.errors?.error_count)}/{CSVUrl?.errors?.overview_count} Rows are valid. {" "}
                            <a href={CSVUrl?.errors?.error_file_url} className="errorLink">click here</a> {" "}
                            to download invalid data.</span>}
                </ErrorBox>}
                {fileUploadError && <ErrorBox>{fileUploadError}</ErrorBox>}
                <BottomFlex>
                    <AddCustomerButton htmlType="submit" disabled={loading || fileUploadError}>Upload</AddCustomerButton>
                </BottomFlex>
            </Form>
        </>
    )
}

export default CustomerFileUploader;