import React from 'react';
import { Drawer } from 'antd';

const StyledDrawer = ({
  children,
  title,
  size,
  open,
  onClose,
  placement,
  extra,
  width,
  height,
  maskClosable
}) => {
  return (
    <>
      <Drawer
        title={title}
        placement={placement}
        size={size}
        onClose={onClose}
        open={open}
        extra={extra}
        width={width}
        height={height}
        maskClosable={maskClosable}
      >
        {children}
      </Drawer>
    </>
  );
};
export default StyledDrawer;
