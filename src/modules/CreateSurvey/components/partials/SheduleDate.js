import React, { Fragment, useState } from 'react';
import { Button, DatePicker, Space, Form } from 'antd';
import Flex from '@components/common/Flex';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate = current => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};


const SheduleDate = ({
  hide,
  setFromDate,
  setToDate,
  setDatePicker,
}) => {
  const onFinish = value => {
    if (value) {
      hide(false);
      setDatePicker(false);
    }
  };
  const onChange = (dateString, type) => {
    if (type === 'fromDate') {
      setFromDate(dayjs(dateString).format('YYYY-MM-DDTHH:mm'));
    } else {
      setToDate(dayjs(dateString).format('YYYY-MM-DDTHH:mm'));
    }
  };
  return (
    <Flex column>
      <Form onFinish={onFinish}>
        <Space style={{ padding: 10 }}>
          <Form.Item
            name={'fromDate'}
            rules={[
              {
                required: true,
                message: 'Select the start date.',
              },
            ]}
          >
            <DatePicker
              id="fromDate"
              format="YYYY-MM-DD hh:mm a"
              disabledDate={disabledDate}
              showTime={{
                format: 'hh:mm a',
              }}
              onChange={dateString => onChange(dateString, 'fromDate')}
            />
          </Form.Item>
          <div>To</div>
          <Form.Item
            name={'toDate'}
            rules={[
              {
                required: true,
                message: 'Select the end date.',
              },
            ]}
          >
            <DatePicker
              id="toDate"
              format="YYYY-MM-DD hh:mm a"
              disabledDate={disabledDate}
              showTime={{
                format: 'hh:mm a',
              }}
              onChange={dateString => onChange(dateString, 'toDate')}
            />
          </Form.Item>
        </Space>
        <Flex center style={{ padding: 10 }}>
          <Button
            type="primary"
            style={{ width: '130px', height: '32px' }}
            htmlType={'submit'}
          >
            Schedule
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};
export default SheduleDate;
