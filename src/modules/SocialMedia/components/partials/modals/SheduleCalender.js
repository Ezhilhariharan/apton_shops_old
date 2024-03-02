import React, { useState, useEffect } from 'react';
import { TimePicker, Divider, Typography, DatePicker, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import Flex from '@components/common/Flex';
import dayjs from 'dayjs';
import Upgrade from '../../../../upgrade/components/Upgrade';
///redux
import {
  socialMediaPopupToggle,
  updateDynamicUpload,
  updateTimeDate,
} from '../../../extendedAction';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const Text = styled(Typography)`
  color: #4aacea;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`;
const StyledFlex = styled(Flex)`
  margin-top: 30px;
`;
const Wrapper = styled('div')`
  .textlength {
    width: 100%;
    text-align: right;
    color: #999999;
    font-weight: 700;
    font-size: 13px;
    margin-bottom: 10px;
    margin-top: 40px;
  }
  .ant-divider-horizontal {
    margin: 15px 0px;
  }
  .divider {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 8px;
  }
  .Cancel {
    color: #999999;
    margin-right: 15px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #999999;
  }
  .Create {
    color: white;
    border-radius: 5px;
    background-color: #4aacea;
  }
  .DatePicker {
    width: 200px;
    height: 50px;
    background: #ffffff;
    border: 1px solid #f4f4f5;
    border-radius: 10px;
  }
  .TimePicker {
    width: 200px;
    height: 50px;
    background: #ffffff;
    border: 1px solid #f4f4f5;
    border-radius: 10px;
    margin-left: 20px;
  }
`;

const SheduleCalender = ({ cancel, tabs, post, sendReels }) => {
  const dispatch = useDispatch();

  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload
  );
  const selectedDate = useSelector(
    state => state?.socialMedialExtended?.setTimeAndDate?.date
  );
  const selectedDateApi = useSelector(
    state => state?.socialMedialExtended?.setTimeAndDate?.apiDate
  );
  const timedata = useSelector(
    state => state?.socialMedialExtended?.setTimeAndDate?.time
  );

  const [openUpgrade, setOpenUpgrade] = useState(false);

  const onDateChange = (date, dateString) => {
    dispatch(
      updateTimeDate({
        time: timedata,
        date: date,
        apiDate: dateString,
      })
    );
  };

  const onChange = (time, timeString) => {
    dispatch(
      updateTimeDate({
        time: time,
        date: selectedDate,
        apiDate: selectedDateApi,
      })
    );
  };

  useEffect(() => {
    dispatch(
      updateTimeDate({
        time: timedata,
        date: selectedDate,
        apiDate: selectedDateApi,
      })
    );
  }, []);

  const disabledDate = customDate => {
    let current = moment().format('YYYY-MM-DD');
    if (customDate < moment(current, 'YYYY-MM-DD')) {
      return customDate && customDate < moment(current, 'YYYY-MM-DD');
    } else {
      return customDate && customDate > moment().add(75, 'days');
    }
  };
  const deleteData = () => {
    dispatch(
      updateTimeDate({
        time: '',
        date: '',
        apiDate: '',
      })
    );
    cancel();
    const updatingDynamicUpload = [];
    dynamicPayload?.map(data => {
      updatingDynamicUpload.push({ ...data, savedShedule: false });
    });
    dispatch(updateDynamicUpload(updatingDynamicUpload));
  };

  const getDisabledMinutes = selectedHour => {
    let minutes = [];
    if (selectedDate < dayjs().endOf('day')) {
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

  const getDisabledHours = () => {
    let hours = [];
    if (selectedDate < dayjs().endOf('day')) {
      for (let i = 0; i < moment().hour(); i++) {
        hours.push(i);
      }
      return hours;
    } else {
      return hours;
    }
  };

  const disabledRangeTime = () => {
    return {
      disabledHours: () => getDisabledHours(),
      disabledMinutes: selectedHour => getDisabledMinutes(selectedHour),
    };
  };

  const SaveData = () => {
    if (timedata != '' && selectedDate != '') {
      const updatingDynamicUpload = [];
      dynamicPayload?.map(data => {
        updatingDynamicUpload.push({ ...data, savedShedule: true });
      });
      dispatch(updateDynamicUpload(updatingDynamicUpload));
      dispatch(socialMediaPopupToggle(false));
      priceValidation?.add_social_media
        ? parseInt(tabs) == 3
          ? sendReels('Schedule')
          : post('Schedule')
        : setOpenUpgrade(true);
    }
  };

  return (
    <Wrapper>
      <Text primary>Time</Text>
      <Divider className="divider" />
      <StyledFlex center>
        <DatePicker
          onChange={onDateChange}
          className="DatePicker"
          value={selectedDate}
          disabledDate={disabledDate}
          placement={'bottomLeft'}
        />

        <TimePicker
          suffixIcon={
            <div>
              {' '}
              <DownOutlined />{' '}
            </div>
          }
          format="hh:mm A"
          onChange={onChange}
          defaultValue={timedata !== '' ? timedata : null}
          value={timedata !== '' ? timedata : null}
          disabledTime={disabledRangeTime}
          showNow={false}
          className="TimePicker"
        />
      </StyledFlex>
      <div className="textlength">
        <Button type="primary" className="Cancel" onClick={deleteData}>
          Cancel
        </Button>
        <Button type="primary" className="Create" onClick={SaveData}>
          Save
        </Button>
      </div>
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </Wrapper>
  );
};

export default SheduleCalender;
