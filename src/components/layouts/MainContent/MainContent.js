import styled, { css } from 'styled-components';
import { Layout } from 'antd';
import { media } from '../../../theme/styles/constants';
const { Content } = Layout;
export default styled(Content)`
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #F8F8FA;

  @media only screen and ${media.md} {
    padding: 0px 0px;
  }

  @media only screen and ${media.xl} {
    ${props =>
      props?.$isTwoColumnsLayout &&
      css`
        padding: 0;
      `}
  }
`;
