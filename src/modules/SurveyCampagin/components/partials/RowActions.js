import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import {updateSelectedSurvey} from '../../actions'
import { updateMode } from '../../../CreateSurvey/actions';
import { useDispatch } from 'react-redux';

const RowActions = ({ records,updateBotStatus}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = [
    {
      label: 'Edit',
      key: '0',
      disabled:(records?.status ===-1||records?.running===true)
    },
    {
      label: 'Activate',
      key: '1',
      disabled: (records?.status ===1 || records?.status===0)
    },
    {
      label: 'Inactivate',
      key: '2',
      disabled: (records?.status ===0||records?.status===-1)
    },
  ];
  const handleMenuClick = e => {
    if (e.key ==='0') {
      dispatch(updateMode('edit'))
      dispatch(updateSelectedSurvey(records))
      navigate('/create-bot')
    }
    if(e.key ==='2'){
      updateBotStatus({
        bot_id: records?.id,
        status: -1
    })
    }
    if(e.key ==='1'){
      updateBotStatus({
        bot_id: records?.id,
        status: 1
    })
    }
  };
  const handleOpenChange = flag => {
    setOpen(flag);
  };
  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <div onClick={(e) => e.preventDefault()}>
        <MoreOutlined style={{ fontSize: '20px', fontWeight: 700 }} />
      </div>
    </Dropdown>
  );
};
export default RowActions;
