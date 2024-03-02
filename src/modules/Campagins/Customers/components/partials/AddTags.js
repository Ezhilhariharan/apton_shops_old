import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";

const AddButton = styled(Button)`
    background-color: ${lightColorsTheme.primary} !important;
    color: ${lightColorsTheme.additionalBackground} !important;
    font-weight: 700;
    margin-left: 15px;
    margin-right: 10px;
`
const StyledInput = styled(Input)`
    margin-left: 10px;
`
const ErrorTag = styled.div`
    color: red;
    font-size: 15px;
    margin-left: 12px;
`

const AddTags = ({ options, setOptions, setSelectedTags, form, selectedTags }) => {
    const [tagError, setTagError] = useState("");
    const [tagValue, setTagValue] = useState("");
    const tagHandler = (e) => {
        const value = e.target.value;
        setTagValue(value?.toLowerCase());
        if (/\s/g.test(value)) {
            setTagError("Spaces are not allowed in tags")
        }
        else if (!/^[a-zA-Z0-9]*$/.test(value)) {
            setTagError("special characters are not allowed")
        }
        else if (!/^(?![0-9]*$)(?!.*\s)/.test(value)) {
            if (value !== "") {
                setTagError("numbers alone are not allowed in tags")
            }
            else {
                setTagError("")
            }
        }
        else if (value === "") {
            setTagError("")
        }
        else {
            setTagError("")
        }
    }
    const addingTags = (value) => {
        const alreadyPresent = options?.find(data => data.value === tagValue)?.value;
        if (!!alreadyPresent) {
            setTagError("duplicate values are not allowed")
        }
        else {
            setTagError("")
        }
        if (value !== "" && !alreadyPresent && !tagError && tagValue !== "") {
            const addedOptions = options?.length > 0 ? [...options, { value: tagValue, key: options?.length }] : [{ value: tagValue, key: options?.length }]
            const selectedValue = addedOptions ? addedOptions?.filter(data => data.value === tagValue)[0] : [];
            form.setFieldsValue({
                "tags": [...selectedTags, selectedValue?.value]
            })
            setOptions(addedOptions)
            setSelectedTags([...selectedTags, selectedValue?.value])
            setTagValue("")
        }
    }
    return (
        <>
            <Flex style={{ height: "40px", paddingTop: "7px" }} alignCenter>
                <StyledInput
                    name="tagsAdded"
                    onChange={tagHandler}
                    value={tagValue}
                    onKeyDown={e => e.stopPropagation()}
                />
                <AddButton onClick={addingTags}>Add Tags</AddButton>
            </Flex>
            {tagError && <ErrorTag>{tagError}</ErrorTag>}
        </>
    )
}

export default AddTags;