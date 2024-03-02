import React, { useEffect, useState } from 'react';
import {
    ModalContentBox,
    CardListBox,
    Modal_body, ErrorContent, NoListText,
    ConfirmButton, Notification, NotificationHeader
} from './Integration.styles';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@components/icons/FacebookIcon';
import { ArrowLeftOutlined } from '@ant-design/icons';
import NoListFound from '@components/icons/NoListFound';

const FbGroupPopup = ({ fbGroupList, saveFbGroup, fetchFbGroupList }) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [unLock, setUnLock] = useState("")
    const [accessToken, setToken] = useState()
    const [state, setState] = useState()

    useEffect(() => {
        setIsModalOpen(true)
        const windowLink = window.location.href;
        let accessToken = "";
        let state = "";
        const trim = windowLink?.split("#")
        trim[1]?.split("&").map(item => {
            if (item.split("=")[0] == "access_token") {
                accessToken = item.split("=")[1]
            }
            else if (item.split("=")[0] == "state") {
                state = item.split("=")[1]
            }
        })
        setToken(accessToken)
        setState(state)
        fetchFbGroupList(accessToken)
    }, [])

    const goBack = (value) => {
        const body = {
            access_token: accessToken,
            group_id: value?.id,
            group_name: value?.name,
            privacy_type: value?.privacy
        }
        saveFbGroup(state, body)
    }
    return (
        <Modal
            open={isModalOpen}
            centered={true}
            closable={false}
            footer={null}>
            <div>
                <ModalContentBox>Facebook Group List</ModalContentBox>
                <Modal_body>
                    {
                        fbGroupList.length > 0 ?
                            fbGroupList?.map((data, index) => (
                                <CardListBox key={index} >
                                    <div className="content" onClick={() => setUnLock(data?.id)}>
                                        <div className="icon">
                                            <FacebookIcon />
                                        </div>
                                        <div >
                                            <div className="text">{data?.name}</div>
                                            <div className="description">{data?.id}</div>
                                        </div>
                                    </div>
                                    {unLock == data?.id && <div className="button"> <ConfirmButton onClick={() => goBack(data)}>Confirm</ConfirmButton></div>}
                                </CardListBox>
                            ))
                            :
                            <ErrorContent>
                                <NoListFound />
                                <NoListText style={{ margin: "15px 0" }}>No List Found</NoListText>
                                <Button
                                    type="primary"
                                    style={{
                                        borderRadius: '5px',
                                        fontWeight: 600,
                                        width: " 129px",
                                        height: "60px !important",
                                        margin: "15px 0",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                    }}
                                    onClick={() => window.open("https://www.facebook.com/groups/create/", "_blank")}
                                >
                                    Create
                                </Button>
                                <Button
                                    type="primary"
                                    style={{
                                        background: "#FFFFFF",
                                        borderRadius: '5px',
                                        fontWeight: 600,
                                        width: " 98px",
                                        height: "32px !important",
                                        margin: "15px 0 ",
                                        border: "none",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        lineHeight: "20px",
                                        color: "#999999",
                                    }}
                                    onClick={() => navigate('/integration')}
                                >
                                    <ArrowLeftOutlined /> Back
                                </Button>
                            </ErrorContent>
                    }
                </Modal_body>
            </div>
        </Modal>
    )
}
export default FbGroupPopup;