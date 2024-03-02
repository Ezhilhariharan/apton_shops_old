import { Input } from "antd";
import styled from "styled-components";
import { lightColorsTheme } from "../../../theme/styles/light/lightTheme";

export const MyTeamsBox = styled("div")`
    margin: 18px 30px 0 30px;
`;

export const InvitationWrapper = styled("div")`

`;

export const MailInput = styled(Input)`
    width: 580px;
    height: 60px;
    border: 1px solid #D9D9D9;
    border-radius: 10px;
`;

export const CustomizedSelect = styled("select")`
    border: none;
    color: ${lightColorsTheme.grayText};
    font-size: 16px;
    font-weight: 500;
    width: 90px;
    background-color: transparent;
    &.active {
        border: none;
        color: ${lightColorsTheme.grayText};
        background-color: transparent;
    };
    &:focus {
        border: none;
        color: ${lightColorsTheme.grayText};
        background-color: transparent;
    };
    .optionStyle {
        
    }
`;