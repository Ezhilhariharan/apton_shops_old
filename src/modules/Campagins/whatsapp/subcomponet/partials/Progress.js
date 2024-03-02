import React from 'react';
import { Card, Steps } from 'antd';
import styled from 'styled-components';
const description = '';

const StyledSteps = styled(Steps)`
  .ant-steps-vertical.ant-steps-small
    > .ant-steps-item-container
    > .ant-steps-item-tail {
    display: none;
  }
`;
const StepsName = styled.span`
  font-weight: 700;
  font-size: 1rem;
  line-height: 19px;
  color: ${props => props.value};
`;

const StyledCard = styled(Card)`
  width: 240px;
  height: 170px;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;
const Progress = ({ step }) => (
  <StyledCard>
    <StyledSteps
      direction="vertical"
      size="small"
      current={step}
      items={[
        {
          title: (
            <StepsName value={step === 1 ? '#999999' : '#4AACEA'}>
              Campaign Details
            </StepsName>
          ),
          description,
        },
        {
          title: (
            <StepsName value={step === 2 ? '#4AACEA' : '#999999'}>
              Campaign Message
            </StepsName>
          ),
          description,
        },
        {
          title: (
            <StepsName
              value={step === 3 ? '#4AACEA' : '#999999'}
            >{`Confirm & Send`}</StepsName>
          ),
          description,
        },
      ]}
    />
  </StyledCard>
);
export default Progress;
