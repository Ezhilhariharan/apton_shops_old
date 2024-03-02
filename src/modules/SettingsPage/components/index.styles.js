import { Form, Button, Row, Select, Input, Typography } from "antd";
import styled from "styled-components";
import { lightColorsTheme } from "../../../theme/styles/light/lightTheme";
import { Input as InputCustom } from "@components/common/Inputs/Input";

export const StyledBox = styled("div")`
    display: flex;
    height: 100%;
    ${props => props.mobileOnly || props.tabletOnly && `flex-direction: row`}
`;
export const ColorBox = styled("div")`
    background-color: ${lightColorsTheme.additionalBackground};
    margin-top: 10px;
    width: 100%;
    padding-bottom: 100px;
    margin-right: 34px;
    border-radius: 10px;
`;
export const RecomendedText=styled(Typography)`
color:#999999;
`
export const OuterBox = styled("div")`
    flex-shrink: 0;
    padding: 22px 30px 30px 30px;
    .brandLogoTitle {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 14px;
        color: ${lightColorsTheme.darkBlack};
    };
    .managementText {
        font-size: 16px;
        font-weight: 700;
        color: ${lightColorsTheme.darkBlack};
        margin-bottom: 6px;
    };
    .clickText {
        font-size: 14px;
        color: ${lightColorsTheme.textColorLight};
    };
    .brandDetailsText {
        font-size: 16px;
        font-weight: 700;
        color: ${lightColorsTheme.darkBlack};
        margin-bottom: 20px;
    };
`;
export const BrandLogoWrapper = styled("div")`
    display: flex;
    .customBrandButton {
        background: linear-gradient(92.32deg, #BF0099 0%, #FDC71B 100%);
        border-radius: 5px;
        color: ${lightColorsTheme.additionalBackground};
        font-size: 14px;
        font-weight: 700;
    };
    .customWrapper {
        margin-left: 26px;
    };
    .applyCheckBoxWrapper {
        margin-top: 23px;
        .applyText {
            color: ${lightColorsTheme.textColorLight};
            font-weight: 400;
            margin-left: 5.25px;
        }
    };
`;
export const BrandForm = styled(Form)`
    .formParent {
        display: flex;
        margin-bottom: 21px;
    }
    .inputWrapper {
        margin-right: 30px;
    };
    .saveButton {
        font-size: 16px;
        display: flex;
        align-items: center;
        border: none;
        justify-content: center;
        width: 157px;
        height: 39px;
        float: right;
        margin-top: 140px;
    };
    .brandInputLabel {
        font-size: 13px;
        font-weight: 700;
        color: ${lightColorsTheme.primary};
        margin-bottom: 11px;
    };
    .formContainer {
        display: flex;
    };
    .removeDefaultArrow {
        select {
            -webkit-appearance: none;
        appearance: none;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAAAdVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhMdQaAAAAJ3RSTlMAAAECAwQGBwsOFBwkJTg5RUZ4eYCHkJefpaytrsXGy8zW3+Do8vNn0bsyAAAAYElEQVR42tXROwJDQAAA0Ymw1p9kiT+L5P5HVEi3qJn2lcPjtIuzUIJ/rhIGy762N3XaThqMN1ZPALsZPEzG1x8LrFL77DHBnEMxBewz0fJ6LyFHTPL7xhwzWYrJ9z22AqmQBV757MHfAAAAAElFTkSuQmCC);
        background-position: 100%;
        background-repeat: no-repeat;
        border: 1px solid #ccc;
        padding: 0.5rem;
        };
    };
`;
export const CustomInput = styled(InputCustom)`
    width: 355px;
    height: 50px;
    background-color: ${lightColorsTheme.headerInputBackground};
    border: 1px solid ${lightColorsTheme.headerInputBackground};
    box-shadow: none;
    border-radius: 10px;
    &:focus {
        box-shadow: none;
    }
`;
export const LocationSelect = styled("select")`
    width: 355px;
    height: 50px;
    background-color: ${lightColorsTheme.headerInputBackground};
    border: none !important;
    box-shadow: none;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 27px;
    &:focus {
        border: none !important;
        box-shadow: none;
    };
    &.select {
        border: none !important;
        box-shadow: none;
    };
    .option {
        margin: 1rem;
        padding: 1rem;
    }
`;
export const BrandManagementWrapper = styled("div")`

`;
export const DeleteButton = styled(Button)`
    margin-top: 27px;
    color: ${lightColorsTheme.deleteTextColor};
    background: rgba(218, 0, 26, 0.1);
    border: 1px solid ${lightColorsTheme.deleteTextColor};
    &:hover {
        color: ${lightColorsTheme.deleteTextColor};
        background: rgba(218, 0, 26, 0.1);
        border: 1px solid ${lightColorsTheme.deleteTextColor};
    };
    &:focus {
        color: ${lightColorsTheme.deleteTextColor};
        background: rgba(218, 0, 26, 0.1);
        border: 1px solid ${lightColorsTheme.deleteTextColor};
    }
`;
export const BillingBox = styled("div")`
    padding-top: 11px;
    background-color: ${lightColorsTheme.additionalBackground};
    .subscriptWrapper {
        padding: 0 20px 0 20px;
    }
    .subscriptionText {
        color:#181818;
        font-weight: 700;
        margin-bottom: 5px;
        font-size: 18px;
    };
    .reverseMargin {
        margin-top: 0;
    }
    .upgradeText {
        font-size: 14px;
        color: #4D4D4D;        ;
        margin-bottom: 10px;
    }
`;
export const SubscriptionWrapper = styled("div")`
    background: ${lightColorsTheme.additionalBackground};
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    display:block;
    margin: 40px 20px 50px 20px;
    justify-content: space-between;
    padding: 26px 20px 25px 20px;
    .planText {
        font-size: 16px;
        font-weight: 500;
        color: ${lightColorsTheme.textColorLight};
        margin-bottom: 30px;
    }
    .cardNum {
font-weight: 700;
font-size: 20px;
line-height: 29px;
align-items: center;
color: #4D4D4D;
    }
    .BillText {
        color: ${lightColorsTheme.black};
        font-weight: 500;
        font-size: 14px;
        margin: 20px 0px 10px 0px;
        line-height: 31.2px;
    };
    .MonthText {
        color:#181818;
        font-weight: 700;
        font-size: 20px;
    }
    .contText {
        color:#181818;
        font-weight: 500;
        font-size: 14px;
        margin:7px 0px 0px 10px;
    }
`;
export const TrialBox = styled("div")`
   width:100%;
    .marginLeft {
        margin-left: 10px;
    };
    .icon {
        padding:7px 0px 0px 20px;
      }

    .trialText {
        color: ${lightColorsTheme.black};
        font-weight: 700;
        font-size: 18px;
        margin: 0px 0px 10px 10px;
        line-height: 31.2px;
    };
    .subscriptionRequest {
        font-size: 12px;
        color: ${lightColorsTheme.grayText};
        font-weight: 400;
        line-height: 14px;
    };
`;
export const CancelPlanButton = styled(Button)`
    font-size: 13px;
    font-weight: 600;
    height: 32px;
    text-align:center;
    color: ${lightColorsTheme.darkBlack};
    border: 1px solid ${lightColorsTheme.topHeaderBorderColor};
    border-radius: 5px;
    background-color: ${lightColorsTheme.additionalBackground};
    margin:0px 5px 0px 0px;
    &:hover {
        background-color: ${lightColorsTheme.additionalBackground};
        color: ${lightColorsTheme.darkBlack};
    };
    &:focus {
        background-color: ${lightColorsTheme.additionalBackground};
        color: ${lightColorsTheme.darkBlack};
    }
`;
export const UpgardePlanButton = styled(Button)`
    background-color: ${lightColorsTheme.primary};
    color: ${lightColorsTheme.additionalBackground};
    font-size: 13px;
    font-weight: 600;
    height: 32px;
    padding: 3px;
    border-radius: 5px;
    &:hover {
        background-color: ${lightColorsTheme.primary};
        color: ${lightColorsTheme.additionalBackground};
    };
    &:focus {
        background-color: ${lightColorsTheme.primary};
        color: ${lightColorsTheme.additionalBackground};
    };
`;
export const BillingHistoryBox = styled("div")`
    margin: 0 20px 0 20px;
    .marginRight {
        margin-right: 19px;
    };
    .billingText {
        font-size: 16px;
        font-weight: 700;
        color: ${lightColorsTheme.darkBlack};
        margin-bottom: 24px;
        margin-top: 30px;
    }
`;
export const AccountBoxWrapper = styled("div")`
    margin: 20px 30px 0 30px;
    .circleBox {
        width: 80px;
        height: 80px;
        background: ${lightColorsTheme.circleBackground};
        border: 1px solid ${lightColorsTheme.topHeaderBorderColor};
        color: ${lightColorsTheme.textColorLight};
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        margin-bottom: 30px;
    };
`;
export const FormWrapper = styled(Form)`
    display: flex;
    .inputLabelText {
        color: ${lightColorsTheme.primary};
        font-size: 13px;
        font-weight: 600;
        margin-top: 30px;
        margin-bottom:10px;
    };
    .marginRight {
        margin-right: 30px;
    };
    .removeDefaultArrow {
        select {
            -webkit-appearance: none;
        appearance: none;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAAAdVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhMdQaAAAAJ3RSTlMAAAECAwQGBwsOFBwkJTg5RUZ4eYCHkJefpaytrsXGy8zW3+Do8vNn0bsyAAAAYElEQVR42tXROwJDQAAA0Ymw1p9kiT+L5P5HVEi3qJn2lcPjtIuzUIJ/rhIGy762N3XaThqMN1ZPALsZPEzG1x8LrFL77DHBnEMxBewz0fJ6LyFHTPL7xhwzWYrJ9z22AqmQBV757MHfAAAAAElFTkSuQmCC);
        background-position: 100%;
        background-repeat: no-repeat;
        border: 1px solid #ccc;
        padding: 0.5rem;
        };
    };
`;
export const RoleBox = styled("div")`
    border-radius: 10px;
    background: ${lightColorsTheme.additionalBackground};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    padding: 10px 10px 18px 10px;
    width: 240px;
    .roleEmail {
        padding-top: 17px;
        font-weight: 500;
        font-size: 14px;
        color: ${lightColorsTheme.textColorLight};
    }
`;

export const PasswordInput = styled(Input.Password)`
width: 355px;
    height: 50px;
    box-shadow: none;
    border-radius: 10px;
    border: none;
    background-color: #F4F4F5 !important;
    .ant-input {
        background-color: #F4F4F5;
    };
    &:focus {
        box-shadow: none;
    };
`;