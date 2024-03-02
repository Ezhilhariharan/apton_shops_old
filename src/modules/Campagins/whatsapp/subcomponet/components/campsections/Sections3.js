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
} from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import * as S from './CampStyles';
import Template from './Template';
import dayjs from 'dayjs';
import { precentageCalculate } from '@utils/prencentageCalculate';
import { useNavigate } from 'react-router-dom';
import Upgrade from '../../../../../upgrade/components/Upgrade';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const StyledCard = styled(Card)`
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  height: 65vh;
`;
const Text = styled(Typography.Text)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 17px;
  color: #181818;
`;
const TitleText = styled(Typography.Text)`
  font-weight: 700;
  font-size: 1rem;
  line-height: 19px;
  color: #181818;
`;
const FormInput = styled(Input)`
  border-bottom: 1px solid;
  border-radius: 0px;
  background: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  line-height: 17px;
  color: #181818;
`;

const UnderLine = styled(Divider)`
  margin: 5px 0;
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;
  margin: 1rem;
`;

const Section3 = ({
  updateCampSteps,
  sheduleSteeings,
  sheduleStep2,
  whatsApp_CSV_Url,
  brandProfile,
  createWhatsAppCampgainsAPI,
  updateCampaign,
  selectedWhatsAppCampagin,
  campaginDetails,
  existingFile,
  tab,
  prospectsCount,
}) => {
  const currentDate = dayjs().format('DD/MM/YYYY hh:mm A');
  const [openUpgrade, setOpenUpgrade] = useState(false);

  const displayDate =
    sheduleSteeings?.schedule_type === 'IMMEDIATELY'
      ? currentDate
      : sheduleSteeings?.processing_date;

  const creditPrecent = precentageCalculate(
    parseInt(brandProfile?.current_limit),
    parseInt(brandProfile?.overall_limit)
  );

  const remainingLimit =
    brandProfile?.overall_limit - brandProfile?.current_limit;

  const navigate = useNavigate();
  const date = sheduleSteeings?.processing_date?.substring(1, 10);
  const time = sheduleSteeings?.processing_date?.substring(11, 19);

  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );

  return (
    <Fragment>
      <Form>
        <StyledCard>
          <Row>
            <Col span={12}>
              <TitleText>Review & Send</TitleText>
            </Col>
            <Col span={12}>
              <Flex center>
                <TitleText>Preview</TitleText>
              </Flex>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12} style={{ marginTop: '2rem' }}>
              <S.FormItem>
                <Text>Campaign Name</Text>
                <FormInput
                  bordered={false}
                  disabled
                  defaultValue={sheduleSteeings?.campaign_name}
                  style={{ color: '#181818', fontSize: '0.875rem' }}
                />
                <UnderLine />
              </S.FormItem>
              <S.FormItem>
                <Text>No. of Prospects</Text>
                <FormInput
                  bordered={false}
                  disabled
                  defaultValue={
                    tab === '1'
                      ? prospectsCount
                      : tab === '2'
                      ? existingFile?.prospects_count
                      : whatsApp_CSV_Url === ''
                      ? campaginDetails?.prospects_count
                      : whatsApp_CSV_Url?.prospects_count
                  }
                  style={{ color: '#181818', fontSize: '0.875rem' }}
                />
                <UnderLine />
              </S.FormItem>
              <S.FormItem>
                {sheduleSteeings?.schedule_type === 'IMMEDIATELY' ? (
                  <Text>Campaign Created</Text>
                ) : (
                  <Text>Campaign Scheduled</Text>
                )}
                <FormInput
                  bordered={false}
                  disabled
                  defaultValue={displayDate}
                  style={{ color: '#181818', fontSize: '0.875rem' }}
                />
                <UnderLine />
              </S.FormItem>
              <S.FormItem>
                <Flex spaceBetween>
                  <Text>
                    {priceValidation?.current_plan === 'Enterprise Plan'
                      ? 'Broadcast Unlimited'
                      : ' Broadcast Limit'}
                  </Text>
                  <Flex>
                    {priceValidation?.current_plan !== 'Enterprise Plan' && (
                      <>
                        <Text>Total Credits:</Text>
                        <TitleText>{brandProfile?.overall_limit}</TitleText>
                      </>
                    )}
                  </Flex>
                </Flex>
                <Progress
                  showInfo={false}
                  percent={creditPrecent}
                  size="small"
                />
                {priceValidation?.current_plan !== 'Enterprise Plan' && (
                  <Flex spaceBetween>
                    <TitleText>{`(${remainingLimit}  Remaining)`}</TitleText>
                    <Button
                      type="primary"
                      // onClick={() => setOpenUpgrade(true)}
                    >
                      Buy More
                    </Button>
                  </Flex>
                )}
              </S.FormItem>
            </Col>
            <Col span={12}>
              <Flex center style={{ marginTop: '1rem' }}>
                <S.BackgroundWrapper
                  style={{ width: 300, height: 400, overflow: 'auto' }}
                >
                  <Wrapper>
                    <Template
                      item={
                        sheduleStep2?.selected_template === undefined &&
                        selectedWhatsAppCampagin?.list_status === 'Draft'
                          ? campaginDetails?.campaign_template?.response
                              ?.template_body
                          : sheduleStep2?.selected_template
                      }
                    />
                  </Wrapper>
                </S.BackgroundWrapper>
              </Flex>
            </Col>
          </Row>
        </StyledCard>
      </Form>
      <Flex spaceBetween style={{ marginTop: '4rem' }}>
        <Button
          onClick={() => {
            updateCampSteps(1);
          }}
        >
          Back
        </Button>

        <Button
          type="primary"
          // disabled={remainingLimit == 0}
          onClick={() => {
            if (
              selectedWhatsAppCampagin?.list_status === 'Draft' &&
              sheduleSteeings !== undefined
            ) {
              updateCampaign(
                selectedWhatsAppCampagin,
                selectedWhatsAppCampagin?.name,
                date,
                time,
                navigate,
                sheduleSteeings?.schedule_type
              );
            } else {
              createWhatsAppCampgainsAPI(navigate, '', '', existingFile, tab);
            }
          }}
        >
          Start Campaign
        </Button>
      </Flex>
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </Fragment>
  );
};

export default Section3;
