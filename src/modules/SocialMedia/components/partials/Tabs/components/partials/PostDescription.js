import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
const { Text } = Typography;

const Paragraph = styled(Text)`
  width: 100%;
  height: 100%;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 133.33%;
  color: #050505;
  .fblink {
    color: #216fdb;
  }
  .instlink {
    color: #00376b;
  }
  ${props =>
    props?.cursor &&
    `
  cursor:pointer;
`}
`;

function PostDescription({ item, tabType }) {
  const reDirect = (data, value) => {
    if (tabType === 'Published') {
      if (value == 'post') {
        data?.post_link && window.open(data?.post_link, '_blank');
      } else {
        data?.group_link && window.open(data?.group_link, '_blank');
        data?.page_link && window.open(data?.page_link, '_blank');
      }
    }
  };
  return (
    <Paragraph
      cursor={tabType === 'Published'}
      onClick={() => reDirect(item?.response_message, 'post')}
    >
      {item?.response_message?.message?.split(' ')?.map(text => {
        if (text.match(/#(.+?)(?=[\s.,:,]|$)/g))
          return <span className="fblink">{text} </span>;
        else return <>{text} </>;
      })}
    </Paragraph>
  );
}

export default PostDescription;
