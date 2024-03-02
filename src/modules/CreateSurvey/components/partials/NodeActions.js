import { MoreOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React from 'react';
import { updateDrawerTitile, updateBotDrawer,updateMode,deleteNodesById } from '../../actions';
import { useDispatch } from 'react-redux';

const NodeActions = ({ title,nodeId }) => {
const dispatch = useDispatch()
  const items = [
    // {
    //   key: '1',
    //   label: 'Edit',
    //   icon: <EditTwoTone />,
    // },
    // {
    //   type: 'divider',
    // },
    {
      key: '2',
      label: 'Delete',
      icon: <DeleteTwoTone />,
    },
  ];
  const openDrawer = () => {
    dispatch(updateDrawerTitile(title));
    dispatch(updateBotDrawer(true));
  };

  const handleMenuClick = e => {
    if (e.key === '1') {
      dispatch(updateMode('edit'))
      openDrawer()
    }
    if(e.key==='2'){
      dispatch(deleteNodesById(nodeId))
      // dispatch(deleteNodesById())
    }
  };
  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      placement="topLeft"
    >
      <div onClick={e => e.preventDefault()}>
        <MoreOutlined
          style={{ color: 'white', fontSize: '16px', fontWeight: 900 }}
        />
      </div>
    </Dropdown>
  );
};
export default NodeActions;
