import React, { useEffect, useState } from 'react';
import * as S from './MainSider/MainSider.styles';
import { RightOutlined } from '@ant-design/icons';
import { useResponsive } from '../../../hooks/useResponsive';
import logo from '../../../../public/asp.png';
import logoDark from '../../../../public/asp.png';
import { useSelector, shallowEqual } from 'react-redux';

export const SiderLogo = ({
  isSiderCollapsed,
  toggleSider,
  selectedBrandUser,
  authToken,
}) => {
  const { tabletOnly } = useResponsive();
  const [whiteLabel, setWhiteLabel] = useState(selectedBrandUser?.logo_photo);
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const theme = 'light';
  useEffect(() => {
    setWhiteLabel(selectedBrandUser?.logo_photo);
  }, [selectedBrandUser]);
  const img = theme === 'dark' ? logoDark : logo;
  // priceValidation?.white_label ? whiteLabel : img
  return (
    <S.SiderLogoDiv>
      <S.SiderLogoLink
        to={authToken ? '/dashboard' : '/'}
        onClick={() => localStorage.removeItem('childrenMenuSelected')}
      >
        <img src={img} alt="Lightence" width={200} height={43} />
        <S.BrandSpan>Lightence</S.BrandSpan>
      </S.SiderLogoLink>
      {tabletOnly && (
        <S.CollapseButton
          shape="circle"
          size="small"
          $isCollapsed={isSiderCollapsed}
          icon={<RightOutlined rotate={isSiderCollapsed ? 0 : 180} />}
          onClick={toggleSider}
        />
      )}
    </S.SiderLogoDiv>
  );
};
