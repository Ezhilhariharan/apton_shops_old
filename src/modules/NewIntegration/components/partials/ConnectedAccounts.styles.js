import { Button, Modal } from "antd";
import styled from "styled-components";
import Flex from "../../../../components/common/Flex";

export const AccountWrapper = styled.div`
    width: 67.22%;
    background: #FFFFFF;
    margin: 1.68% 1.68% 0 0;
    box-shadow: 0px 0px 14px rgba(79, 92, 128, 0.15);
    border-radius: 10px;
    min-height: 82.5vh
    
`
export const AccountBox = styled.div`
    padding: 2.5%;
    .header {
        color: #181818;
        font-weight: 700;
        font-size: 20px;
    }
    .marginBottom {
        border-bottom: 1px solid #F4F4F5;
        padding-bottom: 10px;
    }
`
export const ConnectButton = styled(Button)`
    padding: 0;
    color: #4AACEA !important;
    background: #FFFFFF !important;
    border: 1.5px solid #4AACEA !important;
    border-radius: 5px;
    width: 81px;
    height: 30px;
`
export const UnconnectedBox = styled(Flex)`
    height: 500px;
    .connectText {
        color: #4D4D4D;
        font-weight: 500;
        font-size: 20px;
        margin-top: 30px;
    }
`
export const SocialMediaModal = styled(Modal)`
    .ant-modal-content {
        width: 600px;
        height: 300px;
        border-radius: 10px;
    }
`
export const MediaButton = styled("button")`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: none !important;
    background: #FFFFFF !important;
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.05), -4px -4px 14px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    width: 150px;
    height: 150px;
    cursor: pointer;
    ${props => props.disabled && `
    cursor: not-allowed;
    `}
    .buttonText {
        color: #4D4D4D;
        font-weight: 700;
        font-size: 16px;
        margin: 10px 30px 10px 30px;
        text-align: center;
        &::selection {
            background-color: #FFFFFF !important;
            color: #4D4D4D;
        }
    }
`
export const ModalHeader = styled.div`
    color: #181818;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 41px;
    .instaMargin {
        margin-left: 10px;
    }
`
export const MediaStyle = styled.div`
background: #FFFFFF;
box-shadow: 0px 4px 14px rgba(79, 92, 128, 0.15);
border-radius: 14px;
height: auto;
padding: 28px;
min-height: 200px;
.mediaText {
    max-width: 330px;
    color: #4D4D4D;
    font-weight: 700;
    font-size: 18px;
    margin-left: 12px;
    cursor: pointer;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.greenText {
    color: #00AC4F;
    font-weight: 700;
    font-size: 16px;
    margin-left: 8px;
}
.connectText {
    font-size: 16px;
    font-weight: 600;
    line-height: 17px;
    color: #999999;
    margin-top: 14px;
}
.blueText {
    color: #4AACEA;
    font-weight: 700;
    font-size: 16px;
    margin-left: 8px;
}
`