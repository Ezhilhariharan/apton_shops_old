import { LAYOUT } from '../../../theme/styles/constants';
import { media } from '../../../theme/styles/constants';
import { Layout } from 'antd';
import styled, { css } from 'styled-components';
export const Header = styled(Layout.Header)`
  line-height: 1.5;

  @media only screen and ${media.md} {
    padding: ${LAYOUT.desktop.paddingVertical}
      ${LAYOUT.desktop.paddingHorizontal};
    height: ${LAYOUT.desktop.headerHeight};
  }

  @media only screen and ${media.md} {
    ${props =>
      props?.$isTwoColumnsLayoutHeader &&
      css`
        padding: 0;
      `}
  }
`;
