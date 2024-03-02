import { Button, Col, Divider, Modal, Row, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Flex from "../../../../../components/common/Flex";
import { lightColorsTheme } from "../../../../../theme/styles/light/lightTheme";
import { MainHeaderText } from "./CreateTemplateForm.styles";
import blueMessageSymbol from "@assets/images/blueMessageSymbol.svg";
import redMessageSymbol from "@assets/images/redMessageSymbol.svg";
import CreateTemplateForm from "./CreateTemplateForm";
import { CreateTemplateModal } from "./NewTemplatePopup";
import { EditTemplateModal } from "./NewTemplatePopup";
import PreviewTemplate from "./PreviewTemplate";

const SingleTemplate = styled.div`
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15));
    border: 0.5px solid rgba(0, 0, 0, 0.15);
    width: 256px;
    height: 154px;
    border-radius: 10px;
    .parent {
        margin: 15px;
    }
    .borderBottom {
        border-bottom: 1px solid ${lightColorsTheme.topHeaderBorderColor};
        padding-bottom: 10px;
    };
    .imageBox {
        width: 70px;
        height: 70px;
        border: 1px solid ${lightColorsTheme.headerInputBackground};
        border-radius: 10px;
    };
    .templateInfo {
        margin-left: 10px;
    };
    .ellipsis{
        max-width: 10rem;
        white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    };
`;
const PreviewButton = styled(Button)`
border-radius: 5px;
background-color: ${lightColorsTheme.additionalBackground};
width: 76px;
height: 30px;
margin-right: 20px;
margin-top: 10px;
color: ${lightColorsTheme.textColorLight};
border: none !important;
box-shadow: none !important;
&:hover {
    background-color: rgba(74, 172, 234, 0.1);
    color: ${lightColorsTheme.primary};
};
&:focus {
    background-color: rgba(74, 172, 234, 0.1);
    color: ${lightColorsTheme.primary};
};
`;
const UseTemplateButton = styled(Button)`
width: 109px;
height: 30px;
background-color: ${lightColorsTheme.additionalBackground};
border-radius: 5px;
margin-top: 10px;
border: none !important;
box-shadow: none !important;
&:hover {
    background-color: ${lightColorsTheme.primary};
    color: ${lightColorsTheme.additionalBackground};
};
&:focus {
    background-color: ${lightColorsTheme.primary};
    color: ${lightColorsTheme.additionalBackground};
}
`;
const StyledRow = styled(Row)`
    display: flex;
    justify-content: center;
`;

const EditTemplateCard = ({
    retrieveTemplate,
    getSingleTemplateOnEdit,
    accountId,
    brandId,
    singleTemplate,
    createWhatsappTemplate,
    brands,
    setOpen,
    mediaUpload,
    mediaUrl,
    editWhatsappTemplate,
    openEditTemplate,
    setEditTemplate,
    removeSingleTemplateOnEdit,
    setFilterByStatus,
    setSelelctedCategory,
    setSearch,
}) => {
    const [openPreview, setOpenPreview] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const [preventId, setId] = useState();
    const [openCreateTemplate, setCreateTemplate] = useState(false);
    const approvedTemplates = retrieveTemplate?.template_response?.data?.filter((template) => template.status === "APPROVED" && template.category !== "TRANSACTIONAL")
    const getPreviewTemplate = (id) => {
        setOpenPreview(true);
        getSingleTemplateOnEdit(id, accountId, brandId);
    };
    useEffect(() => {
        let timer = setInterval(() => {
            setCurrentTime(new Date().getTime())
        }, 1000);
        return function cleanUp() {
            clearInterval(timer)
        }
    });
    const useExistingTemplate = (id) => {
        getSingleTemplateOnEdit(id, accountId, brandId);
        setCreateTemplate(true)
    };
    return (
        <EditTemplateModal
            open={openEditTemplate}
            onCancel={() => setEditTemplate(false)}
            footer={null}
            centered
        >
            <>
                <MainHeaderText>Edit existing template</MainHeaderText>
                <Divider />
                <StyledRow gutter={[20, 20]} style={{ overflowY: 'auto', height: "510px" }}>
                    {approvedTemplates?.length > 0 && approvedTemplates?.map((approved, ind) => {
                        return (
                            <div key={ind}>
                                <Col span={8}>
                                    <SingleTemplate>
                                        <div className="parent">
                                            <Flex className="borderBottom">
                                                <div>
                                                    <Flex className="imageBox" center alignCenter>
                                                        {approved.category === "MARKETING" ?
                                                            <img src={blueMessageSymbol} width="47.27px" height="47.27px"></img> :
                                                            <img src={redMessageSymbol} width="47.27px" height="47.27px"></img>
                                                        }
                                                    </Flex>
                                                </div>
                                                <div className="templateInfo">
                                                    <div>{approved.category}</div>
                                                    <div className="ellipsis">{approved.name}</div>
                                                    <div>{approved.status}</div>
                                                </div>
                                            </Flex>
                                            <Flex>
                                                <PreviewButton
                                                    onClick={() => getPreviewTemplate(approved?.id)}
                                                >
                                                    Preview
                                                </PreviewButton>
                                                <UseTemplateButton onClick={() => {
                                                    setId(approved?.id)
                                                    useExistingTemplate(approved?.id)
                                                }}>
                                                    Use Template
                                                </UseTemplateButton>
                                            </Flex>
                                        </div>
                                    </SingleTemplate>
                                </Col>
                            </div>
                        )
                    })}
                </StyledRow>
                <PreviewTemplate
                    openPreview={openPreview}
                    setOpenPreview={setOpenPreview}
                    removeSingleTemplateOnEdit={removeSingleTemplateOnEdit}
                />
                <CreateTemplateForm
                    setCreateTemplate={setCreateTemplate}
                    createWhatsappTemplate={createWhatsappTemplate}
                    brands={brands}
                    setOpen={setOpen}
                    openCreateTemplate={openCreateTemplate}
                    mediaUpload={mediaUpload}
                    mediaUrl={mediaUrl}
                    type="USETEMPLATE"
                    editWhatsappTemplate={editWhatsappTemplate}
                    removeSingleTemplateOnEdit={removeSingleTemplateOnEdit}
                    setFilterByStatus={setFilterByStatus}
                    setSelelctedCategory={setSelelctedCategory}
                    setSearch={setSearch}
                />
            </>
        </EditTemplateModal>
    )
}

export default EditTemplateCard;