import { Button, Card, Form, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as S from './CampStyles';
import Flex from '@components/common/Flex';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import TabSection from '../../partials/TabSection';
import SheduleSetting from '../../partials/SheduleSetting';
import moment from 'moment';
import dayjs from 'dayjs';
import { useSelector, shallowEqual } from 'react-redux';
import Upgrade from '../../../../../upgrade/components/Upgrade';
import { useNavigate } from 'react-router-dom';

const { WHATSAPP_CSV_URL } = process.env;

const StyledCard = styled(Card)`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  .ant-card-body {
    padding: 20px;
  }
`;
const Text = styled(Typography.Text)`
  font-weight: 700;
  font-size: 1rem;
  color: #4d4d4d;
`;
const Container = styled.div`
  margin-top: 1rem;
`;
const ErrorText = styled.span`
  color: #f5222d;
  font-size: 0.875rem;
  display: flex;
  margin: 0.5rem 0;
  line-height: 1;
`;
const Section1 = ({
  updateCampSteps,
  uploadWhatsAppCSV,
  updateShedulingSetting,
  whatsApp_CSV_Url,
  existingCSVList,
  updateWhatsAppCSV,
  selectedWhatsAppCampagin,
  fetchCampaginDetails,
  campaginDetails,
  campaignName,
  updatecampaignError,
  updateCampaignName,
  uploadExistingWhatsAppCSV,
  csvErrorUpdate,
  tab,
  setTab,
  existingFile,
  setEXistingFile,
  sheduleSteeings,
  setProspectsCount,
}) => {
  const startDate = selectedWhatsAppCampagin?.start_date?.substring(0, 10);
  const createDate = selectedWhatsAppCampagin?.created_at?.substring(0, 10);
  const startTime = selectedWhatsAppCampagin?.start_date?.substring(11, 19);
  const [sheduleTime, setTime] = useState(startTime);
  const [sheduleDate, setDate] = useState(startDate);
  const [captureTime, setCaptureTime] = useState(null);
  const [captureDate, setCaptureDate] = useState(null);
  const [newFileName, setNewFileName] = useState(null);
  const [campaign, setCamapaign] = useState();
  const [showfileErorr, setFilePathError] = useState(false);
  const [csvfile, setCsvFiles] = useState();
  const [removestatus, setStatus] = useState();
  const [form] = Form.useForm();
  const [inputLength, setInputLength] = useState();
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );

  const error = useSelector(
    state => state.createWhatsAppSelector.campaignError
  );
  const fileError = useSelector(state => state.createWhatsAppSelector.csvError);
  const navigate = useNavigate();
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const onFinish = value => {
    if (priceValidation?.broadcast_limit) {
      if (
        Object.keys(fileError)?.length !== 0 ||
        campaginDetails?.path_url !== undefined
      ) {
        if (
          csvfile !== null &&
          csvfile !== ' ' &&
          csvfile !== undefined &&
          (whatsApp_CSV_Url !== undefined ||
            campaginDetails?.path_url !== undefined)
        ) {
          let step1 = {
            campaign_name: value?.campaign_name,
            file_path: tab === '1' ? whatsApp_CSV_Url?.url : existingFile?.url,
            schedule_type: value?.schedule_type,
            processing_date: sheduleDate + ' ' + sheduleTime,
            date: captureDate,
            time: captureTime,
            tab: tab,
            fileName: newFileName,
            existingList: selectedRowKeys,
          };
          updateShedulingSetting(step1);
          updateCampSteps(1);
          setFilePathError(false);
        } else {
          setFilePathError(true);
        }
      } else {
        if (sheduleSteeings?.campaign_name) {
          let step1 = {
            campaign_name: value?.campaign_name,
            file_path: tab === '1' ? whatsApp_CSV_Url?.url : existingFile?.url,
            schedule_type: value?.schedule_type,
            processing_date: sheduleDate + ' ' + sheduleTime,
            date: captureDate,
            time: captureTime,
            tab: tab,
            fileName: newFileName,
            existingList: selectedRowKeys,
          };
          updateShedulingSetting(step1);
          updateCampSteps(1);
          setFilePathError(false);
        } else {
          setOpenUpgrade(true);
        }
      }
    } else {
      setOpenUpgrade(true);
    }
  };
  useEffect(() => {
    if (selectedWhatsAppCampagin?.id) {
      fetchCampaginDetails(selectedWhatsAppCampagin?.id);
    }

    csvErrorUpdate({});
    if (sheduleSteeings?.campaign_name && sheduleSteeings?.schedule_type) {
      form.setFieldsValue({
        campaign_name: sheduleSteeings?.campaign_name,
        schedule_type: sheduleSteeings?.schedule_type,
      });
      sheduleSteeings?.tab && setTab(sheduleSteeings?.tab);
      sheduleSteeings?.tab === '2' &&
        form.setFieldsValue({
          file_path: sheduleSteeings?.file_path,
        });
      sheduleSteeings?.existingList?.length > 0 &&
        setSelectedRowKeys(sheduleSteeings?.existingList);
    }
  }, []);

  const dateFormat = 'DD/MM/YYYY';
  const scheduleType =
    startDate > createDate ? 'SCHEDULE_LATER' : 'IMMEDIATELY';
  // useEffect(() => {
  // form.setFieldsValue({
  //   campaign_name: selectedWhatsAppCampagin?.name,
  //   schedule_type:
  //     selectedWhatsAppCampagin?.list_status === 'Scheduled'
  //       ? scheduleType
  //       : '',
  //   processing_date:
  //     selectedWhatsAppCampagin?.list_status === 'Draft'
  //       ? moment(`${startDate}`)
  //       : '',
  //   processing_time:
  //     selectedWhatsAppCampagin?.list_status === 'Draft'
  //       ? moment(`${startTime}`, 'hh:mm a')
  //       : '',
  // });
  // }, []);
  const msg = error?.length > 0 ? error : ' ';
  const handleInput = e => {
    setInputLength(e.target.value);
    if (selectedWhatsAppCampagin === ' ') {
      campaignName(brand?.id, e.target.value);
      updatecampaignError('');
      updateCampaignName('');
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <StyledCard>
          <S.FormItem
            label={'Campaign Name'}
            name="campaign_name"
            rules={[
              {
                required:
                  selectedWhatsAppCampagin?.name?.length > 0 ? false : true,
                message: 'Campaign Name Required',
              },
            ]}
          >
            <S.FormInput size="large" onChange={handleInput} />
          </S.FormItem>

          <ErrorText>{msg}</ErrorText>
        </StyledCard>
        <Container>
          <Card>
            <Flex spaceBetween>
              <Text>Add Prospects</Text>
              <Text style={{ color: '#4AACEA', cursor: 'pointer' }}>
                <a href={WHATSAPP_CSV_URL}>
                  <DownloadOutlined color={'#4AACEA'} /> &nbsp; Sample xlsx
                </a>
              </Text>
            </Flex>
            <S.FormItem>
              <TabSection
                uploadWhatsAppCSV={uploadWhatsAppCSV}
                uploadExistingWhatsAppCSV={uploadExistingWhatsAppCSV}
                existingCSVList={existingCSVList}
                updateWhatsAppCSV={updateWhatsAppCSV}
                setFilePathError={setFilePathError}
                setCsvFiles={setCsvFiles}
                campaginDetails={campaginDetails}
                fetchCampaginDetails={fetchCampaginDetails}
                selectedWhatsAppCampagin={selectedWhatsAppCampagin}
                setCamapaign={setCamapaign}
                whatsApp_CSV_Url={whatsApp_CSV_Url}
                setStatus={setStatus}
                setEXistingFile={setEXistingFile}
                setTab={setTab}
                sheduleSteeings={sheduleSteeings}
                tab={tab}
                setNewFileName={setNewFileName}
                setSelectedRowKeys={setSelectedRowKeys}
                selectedRowKeys={selectedRowKeys}
                setProspectsCount={setProspectsCount}
              />
              {showfileErorr === true && (
                <ErrorText>
                  * Please upload file or select existing files.
                </ErrorText>
              )}
              {showfileErorr === false &&
                fileError?.length > 0 &&
                fileError !== 'NoError' &&
                tab === '1' && <ErrorText>{`Note: ${fileError}`}</ErrorText>}
            </S.FormItem>
          </Card>
        </Container>
        <Container>
          <SheduleSetting
            setTime={setTime}
            setDate={setDate}
            startDate={startDate}
            createDate={createDate}
            startTime={startTime}
            selectedWhatsAppCampagin={selectedWhatsAppCampagin}
            sheduleSteeings={sheduleSteeings}
            form={form}
            setCaptureTime={setCaptureTime}
            setCaptureDate={setCaptureDate}
          />
        </Container>
        <Flex end>
          <div style={{ margin: 20 }}>
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </div>
        </Flex>
      </Form>
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </>
  );
};

export default Section1;
