import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import * as S from './SignUp/Authlayout';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Stepper = ({ currentStep }) => {
  const StepFlow = styled(Steps)`
    width: 80%;
    margin: auto;
    .ant-steps-item-tail {
      top: 15px;
      left: 3px;
      width: 96% !important;
    }

    .ant-steps-item-content {
      margin-top: 30px;
    }

    .ant-steps-item-icon {
      margin-left: 47px;
    }

    .ant-steps-item-finish
      .ant-steps-item-icon
      > .ant-steps-icon
      .ant-steps-icon-dot {
      margin-left: -2px;
      left: 2px;
    }

    .ant-steps-item-wait
      .ant-steps-item-icon
      > .ant-steps-icon
      .ant-steps-icon-dot {
      background: none;
    }

    .ant-steps-item-title {
      font-weight: 700;
      font-size: 18px;
      line-height: 19px;
      color: #181818;
    }
  `;

  const customDot = (dot, { status, index }) => {
    return (
      <S.outerDiv>
        {<S.innerDiv />}
        {dot}
      </S.outerDiv>
    );
  };
  const path = window?.location?.pathname;

  return (
    <StepFlow
      progressDot={customDot}
      current={path === '/signup' ? 0 : currentStep}
      items={[
        {
          title: 'Step 1',
          description: '',
        },
        {
          title: 'Step 2',
          description: '',
        },
        {
          title: 'Step 3',
          description: '',
        },
      ]}
    />
  );
};

export default Stepper;
