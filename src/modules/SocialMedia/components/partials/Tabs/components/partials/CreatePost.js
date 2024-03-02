import React, { useState, useEffect } from 'react';
import { Image, Typography, Button, Col } from 'antd';
import Failedimage from '@assets/images/failedimage.png';
import { FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { updateButtons } from '../../../../../actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const { Text } = Typography;

const Content = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: #4D4D4D;
top: 284px;
`;
const Lastbutton = styled(Button)`
  background: #ffffff;
  border: 2px solid #4aacea;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  color:#4AACEA;
  margin: 20px 20px 0px 50px;
  &:hover,
    &:focus
    {
        background-color: #ffffff!important;
        border: 2px solid #4aacea;

    }
`;
const Wrapper = styled("div")`
height:70vh;
width:100%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
`;

function CreatePost() {
      const dispatch = useDispatch();
     const navigateButton = data => dispatch(updateButtons(data));
    return (
        <Wrapper >
            <Flex center> <Image preview={false} src={Failedimage} /></Flex>
            <Flex center><Content>There is nothing to see here.</Content></Flex>
            <Flex center>
                <Lastbutton hover={false} onClick={() => navigateButton("Create")} >
                    <FormOutlined />
                    Create Post
                </Lastbutton>
            </Flex>
        </Wrapper>
    );
}

export default CreatePost;