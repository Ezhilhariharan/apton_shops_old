import React, { useState, useEffect } from 'react';
import {
  Divider,
  Typography,
  Row,
  Col,
  Select,
  Button,
  Switch,
  TimePicker,
} from 'antd';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import Header from './DelayTimerheader';

///redux
import {
  updateMinutesHours,
  socialMediaPopupToggle,
  updateDynamicUpload,
  setSelectedDataForPopup,
} from '../../../extendedAction';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #4aacea;
`;
const Text = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  margin-bottom: 31px;
`;
const TextCol = styled(Col)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 31px;
`;
const Wrapper = styled('div')`
  .textlength {
    width: 100%;
    text-align: right;
    color: #999999;
    font-weight: 700;
    font-size: 13px;
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .ant-divider-horizontal {
    margin: 15px 0px;
  }
  .fotter {
    height: 20px;
  }
  .divider {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 8px;
  }
  .marginRight {
    margin-right: 10px;
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
  .row {
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .text {
    color: #4aacea;
    margin-top: 5px;
  }
  .marginTop {
    margin-top: 8px;
  }
`;

const DelayTimer = () => {
  // cancel;
  const dispatch = useDispatch();
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const minute = useSelector(
    state => state?.socialMedialExtended?.setMinutesOrHours?.minute
  );
  const hour = useSelector(
    state => state?.socialMedialExtended?.setMinutesOrHours?.hour
  );
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload
  );

  const [type, setType] = useState('Minute');
  const [showbox, setShowBox] = useState(true);

  const onChange = checked => {
    if (checked) {
      const time = {
        minute: '',
        apiMinute: '',
        hour: '',
        apiHour: '',
      };
      dispatch(updateMinutesHours(time));
      setShowBox(true);
    } else {
      setShowBox(false);
    }
  };

  const cancel = () => {
    dispatch(socialMediaPopupToggle(false));
    dispatch(
      setSelectedDataForPopup({
        platform_type: '',
        file_url: '',
        message: '',
        type: '',
      })
    );
  };

  const handleSelector = value => setType(value);

  const onMinuteChange = value => {
    if (showbox) {
      const time = {
        minute: value,
        apiMinute: value?._d?.getMinutes(),
        hour: '',
        apiHour: '',
      };
      dispatch(updateMinutesHours(time));
    }
  };

  const onHourChange = value => {
    if (showbox) {
      const time = {
        minute: '',
        apiMinute: '',
        hour: value,
        apiHour: value?._d?.getHours(),
      };
      dispatch(updateMinutesHours(time));
    }
  };
  useEffect(() => {
    if (hour != '' || minute != '') {
      setShowBox(true);
    }
  }, []);
  const deleteData = () => {
    const time = {
      minute: '',
      apiMinute: '',
      hour: '',
      apiHour: '',
    };
    dispatch(updateMinutesHours(time));
    cancel();
    setShowBox(false);
    const updatingDynamicUpload = [];
    dynamicPayload?.map(data => {
      updatingDynamicUpload.push({ ...data, savedDelay: false });
    });
    dispatch(updateDynamicUpload(updatingDynamicUpload));
  };
  const getDisabledMinutes = selectedHour => {
    let minutes = [];
    for (let i = 0; i < 5; i++) {
      minutes.push(i);
    }
    return minutes;
  };
  const disabledRangeTime = () => {
    return {
      disabledMinutes: selectedHour => getDisabledMinutes(selectedHour),
    };
  };
  const SaveData = () => {
    const updatingDynamicUpload = [];
    dynamicPayload?.map(data => {
      updatingDynamicUpload.push({ ...data, savedDelay: true });
    });
    dispatch(updateDynamicUpload(updatingDynamicUpload));
    dispatch(socialMediaPopupToggle(false));
  };
  return (
    <Wrapper>
      <Heading>Delay</Heading>
      <Divider className="divider" />
      <Row className="row">
        {selectedAccounts?.map(item => (
          <Header item={item} />
        ))}
      </Row>
      <Text>
        Add a delay between posts when posting to multiple accounts at once
      </Text>
      <Row justify="start">
        <Col span={3}>
          <Switch checked={showbox} onChange={onChange} />
        </Col>
        <TextCol span={10} className="text">
          Add a delay between posts{' '}
        </TextCol>
      </Row>
      {showbox ? (
        <Row>
          <TextCol span={13} className="marginTop">
            Delay between posts{' '}
          </TextCol>
          <TextCol span={4}>
            {type == 'Minute' ? (
              <TimePicker
                suffixIcon={
                  <div>
                    {' '}
                    <DownOutlined />{' '}
                  </div>
                }
                value={minute}
                format="mm"
                disabledTime={disabledRangeTime}
                onChange={onMinuteChange}
                showNow={false}
              />
            ) : (
              <TimePicker
                suffixIcon={
                  <div>
                    {' '}
                    <DownOutlined />{' '}
                  </div>
                }
                format="h"
                value={hour}
                onChange={onHourChange}
                showNow={false}
              />
            )}
          </TextCol>
          <TextCol offset={2} span={4}>
            <Select
              defaultValue="Minute"
              style={{ width: 100 }}
              onChange={handleSelector}
              options={[
                {
                  value: 'Minute',
                  label: 'Minute',
                },
                {
                  value: 'Hour',
                  label: 'Hour',
                },
              ]}
            />
          </TextCol>
        </Row>
      ) : null}
      <div className="textlength">
        <Button type="primary" className="Cancel" onClick={() => deleteData()}>
          Cancel
        </Button>
        <Button type="primary" className="Create" onClick={() => SaveData()}>
          Save
        </Button>
      </div>
    </Wrapper>
  );
};

export default DelayTimer;
