import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  TimePicker,
  DatePicker,
  Radio,
  Space,
  Form,
} from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import dayjs from 'dayjs';
import moment from 'moment';
import * as S from '../components/campsections/CampStyles';
import { useSelector, shallowEqual } from 'react-redux';
import Upgrade from '../../../../upgrade/components/Upgrade';
const StyledCard = styled(Card)`
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;
const Text = styled(Typography.Text)`
  font-weight: 700;
  font-size: 1rem;
  line-height: 30px;
  color: #181818;
`;
const SheduleSetting = ({
  setTime,
  setDate,
  startDate,
  createDate,
  form,
  sheduleSteeings,
  setCaptureDate,
  setCaptureTime,
}) => {
  const [showTimer, setShowTimer] = useState(
    startDate > createDate ? true : false
  );
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const [selectDate, setSelectedDate] = useState(null);
  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    if (sheduleSteeings?.date && sheduleSteeings?.time) {
      form.setFieldsValue({
        processing_date: sheduleSteeings?.date,
        processing_time: sheduleSteeings?.time,
      });
      setSelectedDate(sheduleSteeings?.date);
      setShowTimer(true);
    }
  }, []);

  const onChange = e => {
    if (e.target.value === 'SCHEDULE_LATER') {
      if (!priceValidation?.scheduled_campaign) {
        setOpenUpgrade(true);
      }
      setShowTimer(true);
    } else {
      setShowTimer(false);
    }
  };
  const onChangeTimer = (time, timeString) => {
    let hours = ('0' + time?._d?.getHours()).slice(-2);
    let minutes = ('0' + time?._d?.getMinutes()).slice(-2);
    setCaptureTime(time);
    if (time) {
      setTime(`${hours}:${minutes}`);
    }
  };

  const onChangeDate = (date, dateString) => {
    setCaptureDate(date);
    if (date) {
      setDate(dateString);
      setSelectedDate(date);
    } else {
      console.log('Clear');
    }
  };
  const disabledDate = current => {
    // Can not select days before today and today
    const previousDate = dayjs().subtract(1, 'day');
    return (
      current.year() !== new Date().getFullYear() ||
      (current && current <= previousDate)
    );
  };
  //  disablehours
  const getDisabledHours = () => {
    let hours = [];
    if (selectDate < dayjs().endOf('day')) {
      for (let i = 0; i < moment().hour(); i++) {
        hours.push(i);
      }
      return hours;
    } else {
      return hours;
    }
  };
  const getDisabledMinutes = selectedHour => {
    let minutes = [];
    if (selectDate < dayjs().endOf('day')) {
      if (selectedHour <= moment().hour()) {
        for (let i = 0; i < moment().minute() + 2; i++) {
          minutes.push(i);
        }
        return minutes;
      }
    } else {
      return minutes;
    }
  };
  const disabledRangeTime = () => {
    return {
      disabledHours: () => getDisabledHours(),
      disabledMinutes: selectedHour => getDisabledMinutes(selectedHour),
    };
  };
  return (
    <StyledCard>
      <Flex column spaceAround>
        <Text>Sending Settings</Text>
        <S.FormItem
          name="schedule_type"
          rules={[{ required: true, message: 'Please select the setting' }]}
        >
          <Radio.Group onChange={onChange}>
            <Space direction="vertical">
              <Radio value={'IMMEDIATELY'} style={{ color: '#181818' }}>
                Send it now
              </Radio>
              <Radio value={'SCHEDULE_LATER'} style={{ color: '#181818' }}>
                Schedule this send
              </Radio>
            </Space>
          </Radio.Group>
        </S.FormItem>
      </Flex>
      {showTimer && (
        <Space size={'large'} style={{ marginTop: 20 }}>
          <S.FormItem
            name="processing_date"
            rules={[{ required: true, message: 'Please select the date' }]}
          >
            <DatePicker
              format={dateFormat}
              onChange={onChangeDate}
              disabledDate={disabledDate}
            />
          </S.FormItem>
          <S.FormItem
            name="processing_time"
            rules={[{ required: true, message: 'Please select the time' }]}
          >
            <TimePicker
              format="hh:mm a"
              onChange={onChangeTimer}
              disabledTime={disabledRangeTime}
              disabled={selectDate === null}
            />
          </S.FormItem>
        </Space>
      )}
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </StyledCard>
  );
};

export default SheduleSetting;
