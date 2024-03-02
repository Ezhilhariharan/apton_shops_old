import React from 'react';
import Flex from '@components/common/Flex';
import { Space, Card, Button } from 'antd';
import TemplateIcon from '@components/icons/TemplateIcon';
import PhoneIcon from '@components/icons/PhoneIcon'
import MessageIcon from '@components/icons/MessageIcon'
import QuestionIcon from '@components/icons/QuestionIcon';
import ListIcon from '@components/icons/ListIcon';
import styled from 'styled-components';

const Text = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 17px;
  color: #4d4d4d;
  padding:2px;
`;

 const StyledBttton = styled(Button)`
 height: 76px;
 width: 80px;
 border-color: #fff;
 background: #fff;
 &:hover {
    background-color:  #fff !important;
  }
 `
const ButtonGroup = ({setOpen,setTitle,disbleButtons}) => {
    const openDrawer = (title) => {
        setTitle(title)
        setOpen(true)
    }
  return (
    <Space
      direction="vertical"
      size="middle"
    >       
      <StyledBttton onClick={()=>{openDrawer('Template')}}>
        <Flex column alignCenter>
          <TemplateIcon/>
          <Text>Template</Text>
        </Flex>
      </StyledBttton>
      <StyledBttton onClick={()=>{openDrawer('Message')}} disabled={disbleButtons}>
        <Flex column alignCenter>
          <MessageIcon/>
          <Text>Message</Text>
        </Flex>
      </StyledBttton>
      <StyledBttton onClick={()=>{openDrawer('Question')}} disabled={disbleButtons}>
        <Flex column alignCenter spaceBetween>
          <QuestionIcon/>
          <Text>Question</Text>
        </Flex>
      </StyledBttton>
      <StyledBttton onClick={()=>{openDrawer('List')}} disabled={disbleButtons}>
        <Flex column alignCenter spaceBetween>
          <ListIcon/>
          <Text>List</Text>
        </Flex>
      </StyledBttton>
    </Space>
  );
};

export default ButtonGroup;
