import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Typography, Tag, Button, Divider } from 'antd';
import { Select } from '@components/common/form/select/Select/Select';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import * as S from './CampStyles';
import Template from './Template';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  min-height: 65vh;
`;
const Text = styled(Typography.Text)`
  font-weight: 700;
  font-size: 1rem;
  line-height: 19px;
  color: #181818;
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;
  margin: 1rem;
`;
const DraftButton = styled(Button)`
  border: 1px solid #4d4d4d;
  border-radius: 5px;
  &:hover {
    border: 1px solid #4d4d4d;
    color: #4d4d4d;
  }
  &:focus {
    border: 1px solid #4d4d4d;
    color: #4d4d4d;
  }
`;
const BackButton = styled(Button)`
  background: #d9d9d9;
  border: none;
  color: #181818;
  &:hover {
    border: none;
    background: #d9d9d9;
    color: #181818;
  }
  &:focus {
    border: none;
    background: #d9d9d9;
    color: #181818;
  }
`;
const tagRender = props => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
      <Divider />
    </Tag>
  );
};
const findDynamictemplate = str => {
  const value = '{{';
  const count = str.split(value).length - 1;
  const arr = [];
  if (count !== 0) {
    for (let i = 0; i < count; i++) {
      arr.push({
        type: 'text',
        text: `{{${i + 1}}}`,
      });
    }
  }
  return arr;
};
const Section2 = ({
  fetchCampaginDetails,
  sheduleSteeings,
  updateCampaign,
  selectedWhatsAppCampagin,
  campaginDetails,
  updateCampSteps,
  whatsapptempList,
  updateCampStep2,
  createWhatsAppCampgainsAPI,
  updateWhatsAppCSV,
  tab,
  sheduleStep2,
}) => {
  const [template, setTemplate] = useState();
  const [selectedTmp, setSelectedTemp] = useState();
  const [metaData, setMetaData] = useState();
  const [campMetadata, setCampMetaData] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (selectedWhatsAppCampagin?.id) {
      fetchCampaginDetails(selectedWhatsAppCampagin?.id);
    }
    if (sheduleStep2?.selected_template) {
      setSelectedTemp(sheduleStep2?.selected_template);
      form.setFieldsValue({
        campagin_template: sheduleStep2?.selected_template?.id,
      });
      setTemplate(sheduleStep2?.selected_template?.id);
    }
  }, []);
  const date = sheduleSteeings?.processing_date?.substring(0, 10);
  const time = sheduleSteeings?.processing_date?.substring(11, 19);
  const type = sheduleSteeings?.schedule_type;
  const onFinish = value => {
    let step2 = {
      template_name: selectedTmp?.name,
      template_language: selectedTmp?.language,
      template_id: value?.campagin_template,
      template_body: {
        components: selectedTmp?.components,
      },
      meta_data:
        metaData !== undefined
          ? {
              components: {
                type: 'body',
                parameters: metaData,
              },
            }
          : null,
      selected_template: selectedTmp,
    };
    updateCampSteps(2);
    updateCampStep2(step2);
  };

  const findTemplate = template => {
    return whatsapptempList?.list?.find(item => item.id === template);
  };
  useEffect(() => {
    if (template) {
      let resp = findTemplate(template);
      setSelectedTemp(resp);
      const boadyContent = resp?.components?.filter(i => i.type === 'BODY');
      const bodyPhrams =
        boadyContent?.length > 0
          ? findDynamictemplate(boadyContent[0]?.text)
          : '';
      if (bodyPhrams.length > 0) {
        setMetaData(bodyPhrams);
      }
    }
    if (campaginDetails?.campaign_template) {
      const boadyContent =
        campaginDetails?.campaign_template?.response?.template_body?.components?.filter(
          i => i.type === 'BODY'
        );
      const bodyPhrams =
        boadyContent?.length > 0
          ? findDynamictemplate(boadyContent[0]?.text)
          : '';
      if (bodyPhrams.length > 0) {
        setCampMetaData(bodyPhrams);
      }
    }
  }, [template, campaginDetails?.campaign_template]);
  const data = metaData === undefined ? campMetadata : metaData;
  const handleDraft = value => {
    if (selectedWhatsAppCampagin?.list_status === 'Draft') {
      updateCampaign(
        campaginDetails?.campaign,
        sheduleSteeings?.campaign_name,
        date,
        time,
        navigate,
        type,
        value,
        selectedTmp,
        data
      );
    } else {
      createWhatsAppCampgainsAPI(
        navigate,
        value,
        selectedTmp,
        sheduleSteeings?.file_path,
        tab
      );
    }
  };
  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <StyledCard>
          <Row>
            <Col span={12}>
              <Text>Select template message</Text>
            </Col>
            <Col span={12}>
              <Flex center>
                <Text>Preview</Text>
              </Flex>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <S.FormItem
                name="campagin_template"
                rules={[
                  {
                    required:
                      campaginDetails?.campaign_template?.response
                        ?.template_name?.length > 0
                        ? false
                        : true,
                    message: 'Please select the template',
                  },
                ]}
                style={{ marginTop: '1rem' }}
              >
                <Select
                  mode="tages"
                  size="large"
                  showArrow
                  defaultValue={
                    selectedWhatsAppCampagin?.list_status === 'Draft' &&
                    campaginDetails?.campaign_template?.response
                      ?.template_name !== undefined &&
                    selectedTmp === undefined &&
                    campaginDetails?.campaign_template?.response?.template_name
                  }
                  tagRender={tagRender}
                  width={'100%'}
                  onSelect={id => {
                    setTemplate(id);
                  }}
                  options={whatsapptempList?.list?.map(item => ({
                    label: item?.name,
                    value: item?.id,
                  }))}
                />
              </S.FormItem>
            </Col>
            <Col span={12}>
              <Flex center style={{ marginTop: '1rem', cursor: 'pointer' }}>
                <S.BackgroundWrapper
                  style={{ width: 300, height: 400, overflow: 'auto' }}
                >
                  <Wrapper>
                    <Template
                      item={selectedTmp}
                      campaginDetails={campaginDetails}
                      selectedWhatsAppCampagin={selectedWhatsAppCampagin}
                    />
                  </Wrapper>
                </S.BackgroundWrapper>
              </Flex>
            </Col>
          </Row>
        </StyledCard>
        <Flex spaceBetween style={{ marginTop: '4rem' }}>
          <BackButton
            onClick={() => {
              updateCampSteps(0);
              updateWhatsAppCSV(null);
            }}
          >
            Back
          </BackButton>
          <S.FormItem
            rules={[{ required: true, message: 'Please select the template' }]}
          >
            <Flex end>
              <DraftButton onClick={() => handleDraft('draft')}>
                Save draft
              </DraftButton>

              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 20 }}
              >
                Continue
              </Button>
            </Flex>
          </S.FormItem>
        </Flex>
      </Form>
    </>
  );
};

export default Section2;
