import React from 'react';
import styled from 'styled-components';
import { Handle } from 'reactflow';

const ListButtonWrapper = styled.div`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 5px 25px;
  margin-top: 5px;
  width: 100%;
  min-height: 40px;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: rgb(102, 102, 102);
  flex-direction: column;
  word-break: break-word;
  background-color: rgb(245, 246, 250);
`;

const SourceHandler = ({data}) => {
  return (
    <ListButtonWrapper>
      <div>{data?.title}</div>
      <div>
        <Handle
          type="source"
          position="right"
          style={{
            background: 'green', height: 10, width: 10,cursor:'pointer'
          }}
          id={data?.title}
        />
      </div>
    </ListButtonWrapper>
  );
};

export default SourceHandler;
