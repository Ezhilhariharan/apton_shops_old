import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";
import AddCustomerTag from "@components/icons/AddCustomerTag";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { NameStyle } from "./ContactTable";
import Flex from "../../../../../components/common/Flex";
import BlueTagIcon from "@components/icons/BlueTagIcon";
import { listOfTags } from "../../actions";
import AddTags from "./AddTags";

const InputLabel = styled.div`
    font-weight: 600;
    color: ${lightColorsTheme.textColorLight};
    font-size: 16px;
    margin-bottom: 0.5rem;
    .mandatorySymbol {
        color: red;
        font-weight: 700;
    }
`;
const GrayInputTag = styled(Input)`
    background-color: ${lightColorsTheme.inputGrayColor} !important;
    border: 1px solid ${lightColorsTheme.inputGrayColor};
    height: 50px;
    border-radius: 5px;
    font-size: 16px;
    input {
        background-color: ${lightColorsTheme.inputGrayColor} !important;
    }
`;
export const AddCustomerButton = styled(Button)`
border-radius: 10px;
background-color: ${lightColorsTheme.primary} !important;
color: ${lightColorsTheme.additionalBackground} !important;
width: 100%;
height: 50px;
font-weight: 700;
font-size: 16px;
&:disabled {
    background-color: ${lightColorsTheme.inputGrayColor} !important;
    color: ${lightColorsTheme.black} !important;
}
`;
const LessMarginFormItem = styled(Form.Item)`
    margin-bottom: 15px;
`;
const CountryCodeSelect = styled(Select)`
margin-left: 2px;
.ant-select-selector {
    background-color: ${lightColorsTheme.inputGrayColor} !important;
    height: 50px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${lightColorsTheme.inputGrayColor} !important;
    width: 75px !important;
}
`

const SelectTags = styled(Select)`
    width: 100%;
    .ant-select-selector {
        padding: 7px;
    }
`

const AddCustomerForm = ({
    createWhatsappContact,
    type,
    updateEditedContact,
    setOpen,
    form,
    contactDetails,
    setSelectedTags,
    selectedTags,
    pageNumber,
    setPageNumber,
}) => {
    const dispatch = useDispatch();
    const tagList = useSelector(state => state.customerReducer.tags, shallowEqual)
    const wordRegex = /^\w+$/;
    const wordWithNumRegex = /^\w*\d\w*$/;
    const tagListWithWordsOnly = tagList?.length > 0 && tagList?.filter(data => wordRegex.test(data) ||
        wordWithNumRegex.test(data))
    const [options, setOptions] = useState(tagListWithWordsOnly?.length > 0 ? tagListWithWordsOnly?.map((data, i) => ({ value: data, key: i })) : []);
    const createContact = (val) => {
        if (type === "CREATE") {
            createWhatsappContact(val, form, setOpen, setPageNumber)
        }
        else if (type === "EDIT") {
            updateEditedContact(val, form, setOpen, contactDetails?.id, pageNumber)
        }
    }
    const computeDefaultValue = () => {
        const phoneNumberString = contactDetails?.phone_number?.toString();
        const countryCode = phoneNumberString?.slice(0, phoneNumberString?.length - 10);
        const mobileNumber = phoneNumberString?.slice(-10)
        form.setFieldsValue({
            "first_name": contactDetails?.first_name ? contactDetails?.first_name : "",
            "email": contactDetails?.email ? contactDetails?.email : "",
            "last_name": contactDetails?.last_name ? contactDetails?.last_name : "",
            "location": contactDetails?.location ? contactDetails?.location : "",
            "phone_number": mobileNumber ? mobileNumber : "",
            "countryCode": countryCode ? countryCode : null,
            "tags": contactDetails?.tags?.length > 0 ? contactDetails?.tags : [],
        })
        setSelectedTags((contactDetails?.tags) ? contactDetails?.tags : [])
    }
    useEffect(() => {
        computeDefaultValue()
    }, [contactDetails])
    const validatePhoneNumber = (rule, value) => {
        if (value === "") {
            return Promise.reject("Enter your phone number")
        }
        else if (!/^[0-9]*$/.test(value)) {
            return Promise.reject("Please give valid phone number")
        }
        else if (!/^.{10}$/.test(value)) {
            return Promise.reject("Phone number must be 10 digits")
        }
        else {
            return Promise.resolve()
        }
    }
    useEffect(() => {
        dispatch(listOfTags())
    }, [])
    useEffect(() => {
        const modifiedTagListWithWordsOnly = tagList?.length > 0 && tagList?.filter(data => wordRegex.test(data) || wordWithNumRegex.test(data))
        setOptions(modifiedTagListWithWordsOnly?.length > 0 ? 
            modifiedTagListWithWordsOnly?.map((data, i) => ({ value: data, key: i })) : [])
    }, [tagList])
    const handleTags = (val, event) => {
        setSelectedTags(val)
    }
    return (
        <>
            <Form onFinish={createContact} form={form}>
                <div>
                    <InputLabel>First Name <span className="mandatorySymbol">*</span></InputLabel>
                    <LessMarginFormItem
                        name="first_name"
                        rules={[
                            { required: true, message: 'Enter your first name' },
                            { pattern: /^.{3,}$/, message: "First name should atleast 3 characters" },
                            { pattern: /^.{1,15}$/, message: "First name should not more than 15 characters" },
                            {
                                pattern: /^[^0-9]*[a-zA-Z]/,
                                message: "First name should not begin with number"
                            },
                        ]}
                    >
                        <GrayInputTag placeholder="John"></GrayInputTag>
                    </LessMarginFormItem>
                </div>
                <div>
                    <InputLabel>Last Name</InputLabel>
                    <LessMarginFormItem
                        name="last_name"
                        rules={[
                            { pattern: /^.{1,15}$/, message: "Last name should not more than 15 characters" },
                            {
                                pattern: /^[^0-9]*[a-zA-Z]/,
                                message: "Last name should not begin with number"
                            },
                        ]}
                    >
                        <GrayInputTag placeholder="Deo"></GrayInputTag>
                    </LessMarginFormItem>
                </div>
                <div>
                    <InputLabel>Email</InputLabel>
                    <LessMarginFormItem
                        name="email"
                        rules={[
                            { type: "email", message: 'Please give valid email' },
                        ]}
                    >
                        <GrayInputTag placeholder="Example@gmail.com"></GrayInputTag>
                    </LessMarginFormItem>
                </div>
                <div>
                    <InputLabel>Phone Number <span className="mandatorySymbol">*</span></InputLabel>
                    <Flex>
                        <div style={{ marginRight: "15px" }}>
                            <LessMarginFormItem name="countryCode" rules={[
                                { required: true, message: "Enter country code" }
                            ]}>
                                <CountryCodeSelect placeholder="+00">
                                    <Option key='0' value="91">+91</Option>
                                    <Option key='1' value="1">+1</Option>
                                </CountryCodeSelect>
                            </LessMarginFormItem>
                        </div>
                        <div style={{ flexGrow: 10 }}>
                            <LessMarginFormItem
                                name="phone_number"
                                rules={[
                                    { validator: validatePhoneNumber },
                                ]}
                            >
                                <GrayInputTag
                                    placeholder="9765423456"
                                />
                            </LessMarginFormItem>
                        </div>
                    </Flex>
                </div>
                <div>
                    <InputLabel>Location</InputLabel>
                    <LessMarginFormItem
                        name="location"
                        rules={[
                            { pattern: /^.{1,15}$/, message: "Location should not more than 15 characters" },
                        ]}
                    >
                        <GrayInputTag placeholder="Example:- Chennai"></GrayInputTag>
                    </LessMarginFormItem>
                </div>
                <div>
                    <InputLabel>Tags</InputLabel>
                    <LessMarginFormItem name="tags">
                        <SelectTags
                            mode="multiple"
                            options={options}
                            value={selectedTags}
                            onChange={handleTags}
                            showArrow
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <AddTags
                                        options={options}
                                        setOptions={setOptions}
                                        setSelectedTags={setSelectedTags}
                                        form={form}
                                        selectedTags={selectedTags}
                                    />
                                </>
                            )}
                        >
                        </SelectTags>
                    </LessMarginFormItem>
                </div>
                <div style={{ marginBottom: "25px", maxWidth: "400px" }}>
                    <NameStyle tag="tag">
                        <Row gutter={[10, 8]}>{(contactDetails?.tags?.length > 0 && Array.isArray(contactDetails?.tags)) && contactDetails?.tags?.map((tag, ind) => {
                            return (
                                <Col key={ind}>
                                    <Flex alignCenter className="blueBox">
                                        <BlueTagIcon style={{ marginRight: "5px" }} />
                                        {tag}
                                    </Flex>
                                </Col>
                            )
                        })}</Row></NameStyle>
                </div>
                <AddCustomerButton htmlType="submit">Add Customer</AddCustomerButton>
            </Form>
        </>
    )
}

export default AddCustomerForm;