import React from 'react';
import * as S from './MainHeader.styles';
export const MainHeader = ({ isTwoColumnsLayout, children }) => {
  return (
    <S.Header $isTwoColumnsLayoutHeader={isTwoColumnsLayout} style={{
        height: "64px",
        left:"0px",
        top: "0px",
        background: "#FFFFFF",
  }}>
      {children}
    </S.Header>
  );
};
