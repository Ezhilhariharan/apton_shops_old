import React from 'react';
import { Select as AntSelect } from 'antd';
import * as S from './Select.styles';
export const { Option } = AntSelect;
export const Select = React.forwardRef(
  ({ className, width, children, ...props }, ref) => (
    <S.Select
      getPopupContainer={triggerNode => triggerNode}
      ref={ref}
      className={className}
      width={width}
      {...props}
    >
      {children}
    </S.Select>
  )
);
