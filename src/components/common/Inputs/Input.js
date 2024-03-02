import React from 'react';
import { Input as AntInput } from 'antd';
import * as S from './Input.styles';
export const { TextArea } = AntInput;
export const Input = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <S.Input ref={ref} className={className} {...props}>
      {children}
    </S.Input>
  )
);
