import React, { useState } from 'react';
import { Popover } from 'antd';
import CalendarBtn from '@components/icons/CalendarBtn';
import SheduleDate from './SheduleDate';

const Shedule = ({
  setFromDate,
  setToDate,
  setDatePicker,
  fromDate,
  toDate,
}) => {
  const [open, setOpen] = useState(false);
  const hide = value => {
    setOpen(value);
  };
  const handleOpenChange = newOpen => {
    setOpen(newOpen);
  };
  return (
    <div className="demo">
      <Popover
        placement="bottom"
        title={''}
        content={
          <SheduleDate
            hide={hide}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setDatePicker={setDatePicker}
            fromDate={fromDate}
            toDate={toDate}
          />
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            hide(true);
          }}
        >
          <CalendarBtn />
        </div>
      </Popover>
    </div>
  );
};
export default Shedule;
