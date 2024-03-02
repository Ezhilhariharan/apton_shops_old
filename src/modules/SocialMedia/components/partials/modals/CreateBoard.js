import React, { useState } from 'react';
import { Typography, Row, Input, Form, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import Pinterest from '@assets/images/PinterestLogo.png';
import Flex from '@components/common/Flex';
import { useDispatch } from 'react-redux';
import { pinterestCreateBoard } from '../../../actions';
import {
  socialMediaPopupToggle,
  setSelectedDataForPopup,
} from '../../../extendedAction';
const { TextArea } = Input;

const Wrapper = styled('div')`
  .ant-divider-horizontal {
    margin: 15px 0px;
  }
  .marginBottom {
    margin-bottom: 30px;
  }
  .marginRight {
    margin-right: 15px;
  }
  .marginTop {
    margin-top: 8px;
  }
  .marginLeft {
    margin-left: 8px;
  }
  .boardContent {
    font-size: 12px;
    color: #999999;
  }
  .Cancel {
    color: #999999;
    margin-right: 15px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #999999;
  }
  .Create {
    color: white;
    border-radius: 5px;
    background-color: #4aacea;
  }
  .fotter {
    height: 20px;
  }
`;
const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #4d4d4d;
  margin-bottom: 12px;
`;
const InputLabel = styled.div`
  font-weight: 600;
  color: black;
  font-size: 16px;
  margin-bottom: 0.5rem;
  .mandatorySymbol {
    color: red;
    font-weight: 700;
  }
`;
const GrayInputTag = styled(Input)`
  background-color: white !important;
  border: 1px solid #d9d9d9;
  height: 50px;
  border-radius: 5px;
  font-size: 16px;
  input {
    background-color: white !important;
  }
`;
const GrayTextareaTag = styled(TextArea)`
  background-color: white !important;
  border: 1px solid #d9d9d9;
  height: 50px;
  border-radius: 5px;
  font-size: 16px;
  input {
    background-color: white !important;
  }
`;

const LessMarginFormItem = styled(Form.Item)`
  margin-bottom: 15px;
`;

const CreateBoard = ({ cancel }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();
  const createContact = val => {
    let privacy = checked ? 'PROTECTED' : 'PUBLIC';
    dispatch(
      pinterestCreateBoard(val?.Name, val?.Description, privacy, cancel, form)
    );
  };
  const onChange = e => {
    if (e.target.checked) setChecked(true);
    else setChecked(false);
  };

  return (
    <Wrapper>
      <Row className="marginBottom">
        <img
          src={Pinterest}
          alt="Lightence"
          width={30}
          height={30}
          className="marginRight"
        />
        <Heading>Create New Board</Heading>
      </Row>
      <Form onFinish={createContact} form={form}>
        <div>
          <InputLabel>Name </InputLabel>
          <LessMarginFormItem
            name="Name"
            rules={[{ required: true, message: 'Required Board name' }]}
          >
            <GrayInputTag placeholder="Board name like “ Products ”"></GrayInputTag>
          </LessMarginFormItem>
        </div>
        <div className="marginTop">
          <InputLabel>Description (Optional)</InputLabel>
          <LessMarginFormItem name="Description">
            <GrayTextareaTag placeholder="What's your board about?"></GrayTextareaTag>
          </LessMarginFormItem>
        </div>
        <Row className="marginTop">
          <Checkbox onChange={onChange}></Checkbox>
          <div className="marginLeft">
            <InputLabel>Keep this board secret</InputLabel>
            <div className="boardContent">
              So only you and collaborators can see it.
            </div>
          </div>
        </Row>
        <Flex flexEnd>
          <Button type="primary" className="Cancel" onClick={() => cancel()}>
            Cancel
          </Button>
          <Button type="primary" className="Create" htmlType="submit">
            Create
          </Button>
        </Flex>
      </Form>
      <div className="fotter"></div>
    </Wrapper>
  );
};

export default CreateBoard;
