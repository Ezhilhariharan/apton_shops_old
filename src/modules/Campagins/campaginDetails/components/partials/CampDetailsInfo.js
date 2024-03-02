import React, { Fragment, useState } from 'react';
import {
  Card,
  Col,
  Form,
  Row,
  Typography,
  Button,
  Input,
  Divider,
  Progress,
  DatePicker,
  TimePicker,
} from 'antd';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import * as S from '@modules/Campagins/whatsapp/subcomponet/components/campsections/CampStyles';
import { precentageCalculate } from '@utils/prencentageCalculate';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
// import PreviewTemplate from './PreviewTemplate';
// import PreviewTemplate from '../../../Template/components/partials/PreviewTemplate';
import OriginalPreview from '../../../../../components/common/Preview/OriginalPreview';
const StyledCard = styled(Card)`
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  height: 65vh;
`;
const Text = styled(Typography.Text)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: ${props => props.fontSize || '17px'};
  line-height: 19px;
  color: ${props => props.fontColor || '#4D4D4D'};
`;

const FormInput = styled(Input)`
  border-bottom: 1px solid;
  border-radius: 0px;
  background: #ffffff;
  font-weight: 700;
  font-size: 16px;
  line-height: 17px;
  color: #181818;
`;

const UnderLine = styled(Divider)`
  margin: 5px 0;
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;
  // margin: 10px;
`;

const CampDetailsInfo = ({
  selectedWhatsAppCampagin,
  campaginDetails,
  brandProfile,
  updateCampaign,
}) => {
  const creditPrecent = precentageCalculate(
    parseInt(brandProfile?.current_limit),
    parseInt(brandProfile?.overall_limit)
  );
  const data = campaginDetails?.campaign?.start_date;
  const timing = data?.substring(11, 19);

  const dateentry = data?.substring(0, 10);
  const value = dateentry?.split('-').reverse().join('-');
  const [edit, setEdit] = useState();
  const [input, setInput] = useState(campaginDetails?.campaign?.name);
  const [datevalue, setDatevalue] = useState(value);
  const [timevalue, setTimevalue] = useState(timing);
  const remainingLimit =
    brandProfile?.overall_limit - brandProfile?.current_limit;
  const date = campaginDetails?.campaign?.start_date?.substring(0, 10);
  const time = campaginDetails?.campaign?.start_date?.substring(11, 19);
  const navigate = useNavigate();
  const dateFormatList = ['DD/MM/YYYY'];
  const handleDateChange = (value, dateString) => {
    setDatevalue(dateString);
  };
  const handleTimeChange = (value, timeString) => {
    setTimevalue(timeString);
  };
  const saveContent = () => {
    updateCampaign(
      campaginDetails?.campaign,
      input,
      datevalue,
      timevalue,
      navigate
    );
    navigate('/whatsapp-marketing');
  };
  const disabledDate = current => {
    // Can not select days before today and today
    return (
      current.year() !== new Date().getFullYear() ||
      (current && current < dayjs().endOf('day'))
    );
  };
  const planDetails = useSelector(
    state => state.authSelector.pricingValidationObj
  );

  return (
    <Fragment>
      <Form>
        <StyledCard>
          <Row>
            <Col span={19}>
              <Text>
                {selectedWhatsAppCampagin?.list_status}&nbsp; Campaign
              </Text>
            </Col>
            <Col span={3}>
              <Flex center>
                <Text>Preview</Text>
              </Flex>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12} style={{ marginTop: '2rem' }}>
              <S.FormItem>
                <Text fontSize="14px" fontColor="#181818">
                  Campaign Name
                </Text>
                {selectedWhatsAppCampagin?.list_status === 'Scheduled' ||
                selectedWhatsAppCampagin?.list_status === 'Draft' ? (
                  <div style={{ display: 'flex' }}>
                    <FormInput
                      bordered={false}
                      disabled={edit !== 'editName' ? true : false}
                      placeholder={campaginDetails?.campaign?.name}
                      onChange={e => setInput(e.target.value)}
                    />
                    <EditOutlined onClick={() => setEdit('editName')} />
                  </div>
                ) : (
                  <div style={{ display: 'flex' }}>
                    <FormInput
                      bordered={false}
                      disabled={true}
                      placeholder={campaginDetails?.campaign?.name}
                    />
                  </div>
                )}
                <UnderLine />
              </S.FormItem>
              <S.FormItem>
                <Text fontSize="14px" fontColor="#181818">
                  No. of Prospects
                </Text>
                <FormInput
                  bordered={false}
                  disabled
                  defaultValue={campaginDetails?.prospects_count}
                />
                <UnderLine />
              </S.FormItem>
              <S.FormItem>
                {selectedWhatsAppCampagin?.list_status === 'Running' ? (
                  <Text fontSize="14px" fontColor="#181818">
                    Campaign Created
                  </Text>
                ) : (
                  <Text fontSize="14px" fontColor="#181818">
                    Campaign Scheduled
                  </Text>
                )}
                {selectedWhatsAppCampagin?.list_status === 'Draft' ||
                selectedWhatsAppCampagin?.list_status === 'Scheduled' ? (
                  <div style={{ display: 'flex' }}>
                    <DatePicker
                      style={{ width: '50%' }}
                      format={dateFormatList}
                      placeholder={value}
                      suffixIcon={false}
                      disabledDate={disabledDate}
                      bordered={false}
                      onChange={handleDateChange}
                    />
                    <TimePicker
                      style={{ width: '100%' }}
                      bordered={false}
                      placeholder={timing}
                      onChange={handleTimeChange}
                      suffixIcon={<EditOutlined />}
                      use12Hours
                      format="hh:mm:ss A"
                    />
                  </div>
                ) : (
                  <div style={{ display: 'flex' }}>
                    <FormInput
                      bordered={false}
                      disabled={true}
                      defaultValue={date + ' ' + time}
                    />
                  </div>
                )}
                <UnderLine />
              </S.FormItem>
              <S.FormItem>
                <Flex spaceBetween>
                  <Text>
                    {planDetails?.overall_social_media_limit === 'UNLIMITED'
                      ? 'Unlimited'
                      : 'Credits Left'}
                  </Text>
                  {planDetails?.overall_social_media_limit != 'UNLIMITED' && (
                    <Text>{`Total Credits:${brandProfile?.overall_limit}`}</Text>
                  )}
                </Flex>
                <Progress
                  showInfo={false}
                  percent={creditPrecent}
                  size="small"
                />
                {planDetails?.overall_social_media_limit != 'UNLIMITED' && (
                  <Text>{`(${remainingLimit}  Remaining)`}</Text>
                )}
              </S.FormItem>
              {selectedWhatsAppCampagin?.list_status === 'Draft' ||
                (selectedWhatsAppCampagin?.list_status === 'Scheduled' && (
                  <Flex center style={{ marginTop: '2rem' }}>
                    <Button type="primary" onClick={saveContent}>
                      Save
                    </Button>
                  </Flex>
                ))}
            </Col>
            <Col span={11}>
              <Flex end style={{ marginTop: '-20px' }}>
                {/* <S.BackgroundWrapper
                  style={{ width: 'auto', height: 'auto', overflow: 'auto' }}
                > */}
                <OriginalPreview
                  item={
                    campaginDetails?.campaign_template?.response?.template_body
                  }
                  style={{ marginTop: '40px' }}
                />
                {/* </S.BackgroundWrapper> */}
              </Flex>
            </Col>
          </Row>
        </StyledCard>
      </Form>
    </Fragment>
  );
};

export default CampDetailsInfo;
