import { Steps as AntdSteps } from 'antd';
import * as S from './Steps.styles';
const { Step: AntdStep } = AntdSteps;
export const Steps = ({ children, ...otherProps }) => {
  return (
    <S.Steps className="steps" {...otherProps}>
      {children}
    </S.Steps>
  );
};
export const Step = props => {
  return <AntdStep {...props} />;
};
