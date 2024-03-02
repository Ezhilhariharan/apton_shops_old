import { Button, Divider, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import CircleInfoIcon from "../../../../../components/icons/CircleInfoIcon";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";

const StyledModal = styled(Modal)`
    width: 650px !important;
    margin: 30px;
    .ant-modal-content {
        border-radius: 20px;
        box-shadow: none;
        height: auto !important;
    }
    .header {
        font-weight: 700;
        font-size: 1rem;
        color: ${lightColorsTheme.darkBlack};
        margin-right: 10px;
    }
    .reduceMargin {
        margin-top: 13px;
        margin-bottom: 15px;
    }
    .bodyHeader {
        font-weight: 700;
        font-size: 16px;
        color: ${lightColorsTheme.darkBlack};
    }
    .variableDisplay {
        font-weight: 700;
        font-size: 1rem;
        color: ${lightColorsTheme.textColorLight};
        margin-top: 18px;
        margin-bottom: 17px;
    }
    .positionAbsolute {
        position: absolute;
        bottom: 30px;
    }
    .dataMargin {
        margin-right: 11px;
    }
`;
const StyledInput = styled(Input)`
    background-color: ${lightColorsTheme.headerInputBackground};
    width: 580px;
    height: 40px;
    border-radius: 5px;
`;
const DoneButton = styled(Button)`
width: 79px;
height: 40px;
padding: 0;
font-weight: 700;
margin-right: 10px;
font-size: 1rem;
color: ${lightColorsTheme.additionalBackground};
background-color: ${lightColorsTheme.primary};
&:hover {
  color: ${lightColorsTheme.additionalBackground};
  background-color: ${lightColorsTheme.primary};
};
&:focus {
  color: ${lightColorsTheme.additionalBackground};
  background-color: ${lightColorsTheme.primary};
}
`;
const CancelButton = styled(Button)`
    width: 89px;
    height: 40px;
    border-radius: 5px;
    background-color: ${lightColorsTheme.additionalBackground};
    color: ${lightColorsTheme.textColorLight};
    margin-right: 10px;
    &:hover {
        border: 1px solid black;
        background-color: ${lightColorsTheme.additionalBackground};
        color: ${lightColorsTheme.textColorLight};
    }
    &:focus {
        border: 1px solid black;
        background-color: ${lightColorsTheme.additionalBackground};
        color: ${lightColorsTheme.textColorLight};
    }
`;
const Scroller = styled("div")`
    max-height: 380px;
    overflow-y: auto;
`;

const AddVariableModal = ({
    addVariable,
    openSample,
    setOpenSample,
    setSampleArray,
    sampleValueArray,
    type,
}) => {
    const [form] = Form.useForm();
    const [variableObject, setVariableObject] = useState({});
    const resetModalStates = () => {
        setOpenSample(false)
        form.resetFields();
        setVariableObject({})
    }
    const AddSampleHandler = () => {
        setSampleArray(Object.values(variableObject))
        resetModalStates()
    }
    const variableHandler = (e) => {
        setVariableObject({ ...variableObject, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (sampleValueArray?.length > 0 && (type === "EDIT" || type === "DRAFT")) {
            let tempvariable = {};
            sampleValueArray?.map((data, i) => {
                tempvariable[`variable${i}`] = data;
            })
            form.setFieldsValue({
                ...tempvariable
            })
            setVariableObject({ ...tempvariable })
        }
    }, [sampleValueArray])
    return (
        <>
            <StyledModal open={openSample} onCancel={() => resetModalStates()} footer={null} centered>
                <div>
                    <div>
                        <Flex>
                            <div className="header">Add sample content</div>
                            <div><CircleInfoIcon /></div>
                        </Flex>
                    </div>
                    <Divider className="reduceMargin" />
                    <div>
                        <div className="bodyHeader">Body:</div>
                        <div className="variableDisplay">
                            {addVariable?.length > 0 && addVariable?.map((data, index) => {
                                return (
                                    <span key={index} className="dataMargin">{data}</span>
                                )
                            })}
                        </div>
                        <div>
                            <Form onFinish={AddSampleHandler} form={form}>
                                <Scroller>
                                    {addVariable?.length > 0 && addVariable?.map((data, ind) => {
                                        return (
                                            <div key={ind}>
                                                <Form.Item
                                                    name={`variable${ind}`}
                                                    rules={[
                                                        { required: true, message: "Please give variable names" }
                                                    ]}
                                                >
                                                    <StyledInput
                                                        placeholder={`Enter content for ${data}`}
                                                        name={`variable${ind}`}
                                                        value={
                                                            variableObject ? variableObject[`variable${ind}`] : ""
                                                        }
                                                        onChange={variableHandler}
                                                        autoComplete="off"
                                                    />
                                                </Form.Item>
                                            </div>
                                        )
                                    })}
                                </Scroller>
                                <Flex end>
                                    <CancelButton onClick={() => resetModalStates()}>Cancel</CancelButton>
                                    <DoneButton htmlType="submit">Done</DoneButton>
                                </Flex>
                            </Form>
                        </div>
                    </div>
                </div>
            </StyledModal>
        </>
    )
}

export default AddVariableModal;