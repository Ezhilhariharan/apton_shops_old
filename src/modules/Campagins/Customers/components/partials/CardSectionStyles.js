import { Checkbox, Row } from "antd"
import styled from "styled-components"
import Flex from "../../../../../components/common/Flex"
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme"

export const CustomerCard = styled.div`
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    min-width: 240px;
    min-height: 280px;
    padding: 15px;
    .margin {
        cursor: pointer;
        transform: rotate(270deg);
    }
    .iconStyle {
        margin-right: 6px;
    }
`
export const AbbreviationBox = styled.div`
    font-size: 38px;
    color: #999999;
    width: 80px;
    height: 80px;
    ${props => `background: ${props.abbreviationColor};`}
    border-radius: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    margin-bottom: 10px;
`
export const NameBox = styled(Flex)`
    font-weight: 700;
    font-size: 18px;
    color: #4D4D4D;
    margin-bottom: 20px;
`
export const PhoneEmailStyle = styled(Flex)`
    font-weight: 600;
    font-size: 16px;
    color: #4D4D4D;
    margin-bottom: 13px;
    .ellipsis {
        max-width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
export const TagStyle = styled.span`
    color: #3771C8;
    font-size: 14px;
    font-weight: 400;
    background: rgba(55, 113, 200, 0.1);
    display: inline-block;
    border: 1px solid #3771C8;
    border-radius: 23px;
    padding: 3px 7px 3px 7px;
    max-width: 68px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const CenteredRow = styled(Row)`
    display: flex;
    align-items: center;
    max-width: 190px;
`
export const StyledCheckbox = styled(Checkbox)`
    .ant-checkbox-inner {
        border: 1px solid #4D4D4D;
        border-radius: 3px;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
        border: 1px solid #4aacea;
    }
`