import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import TutorialImage from '@components/icons/TutorialImage';
const Wrapper = styled(Card)`
  width: 98%;
  margin: 20px 0;
  display: block;
  background: #ffffff;
  border: none;
  border-radius: 10px;
  .ant-card-body {
    padding: 20px;
  }
  .header {
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 22px;
    color: #4d4d4d;
  }
`;
const Box = styled.div`
  background-color: #e2f4ff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  .text {
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 22px;
    color: #181818;
    padding: 20px 20px;
  }
  .paragraph {
    font-weight: 400;
    font-size: 1.063rem;
    margin: -20px 20px;
    width: 341px;
    height: 72px;
  }
`;
const Tutotial = () => {
  return (
    <Wrapper>
      <p className="header">Tutorial</p>
      <Box>
        <div style={{ display: 'block' }}>
          <p className="text">Hi! Welcome back.</p>
          <p className="paragraph">
            We are glad you are here. Inspire the best work in people,
            enabling them to achieve their goals.
          </p>
        </div>
        <Flex style={{ padding: '20px' }}>
          <TutorialImage />
        </Flex>
      </Box>
    </Wrapper>
  );
};

export default Tutotial;
