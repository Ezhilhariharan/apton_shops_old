import React, { useState } from 'react';
import HeaderMessage from './partials/HeaderMessage';
import Flex from '@components/common/Flex';
import { Button, Space, Form } from 'antd';
import styled from 'styled-components';
import BodyMessage from './partials/BodyMessage';
import FooterMessage from './partials/FooterMessage';
import ButtonsMessage from './partials/ButtonsMessage';
import ListMessage from './partials/ListMessage';
import { saveResponseTemplates } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  quickReplayDataFormating,
  messageDataFormating,
  listDataFormating,
  callToActionFormat,
} from './partials/helper/dataformating';
const Wrapper = styled.div`
  padding: 1rem;
`;
import { generateId } from './partials/helper/dataformating';
const SelectResponse = ({ onClose, title,addNodes,updateSurveyCSV,updateNodes}) => {
  const FItem = Form.Item;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const mediaFile = useSelector(
    state => state.createSurveySelector.headerMedia
  );
  const [buttonList, setButtonList] = useState([
    {
      id: generateId(),
      name: 'Replay 1',
      value: '',
    },
  ]);

  const [List, setList] = useState({
    dataList: [
      {
        id: generateId(),
        headerText: 'Section 1 Title',
        value: '',
        children: [{ id: generateId(), title: 'Option 1', value: '' }],
      },
    ],
  });

  const onFinish = value => {
    let body = '';
    if (value.Buttons_type === 'Quick reply') {
      body = quickReplayDataFormating(value, buttonList);
      addNodes(body, title);
      dispatch(saveResponseTemplates(body,title))
    }
    if (title === 'Message') {
      const heraderType = value?.heade_type ===undefined ? 'text' :value?.heade_type
      body = messageDataFormating(heraderType,mediaFile,value);
      addNodes(body, title);
      updateSurveyCSV(null)
      //  dispatch(saveResponseTemplates(body,title))
    }
    if (title === 'List') {
      const heraderType = value?.heade_type ===undefined ? 'text' :value?.heade_type
      body = listDataFormating(heraderType,value, List?.dataList,mediaFile);
      addNodes(body, title);
      //  dispatch(saveResponseTemplates(body,title))
    }
    //  if(value.Buttons_type==="Call to action"){
    //     body = callToActionFormat(value)
    //     dispatch(saveResponseTemplates(body,title))
    //  }
    clearForm()
  };
  const clearForm = () => {
    setList({ dataList: [
      {
        id: generateId(),
        headerText: 'List Title',
        value: '',
        children: [{ id: generateId(), title: 'List1', value: '' }],
      },
    ]})
    setButtonList([
      {
        id: generateId(),
        name: 'Replay1',
        value: '',
      },
    ])
    form.resetFields();
    onClose();
  };

  return (
    <Wrapper>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <HeaderMessage FItem={FItem} title={title} />
        <BodyMessage FItem={FItem} />
        {(title === 'Question' || title === 'List') && (
          <FooterMessage FItem={FItem} />
        )}
        {title === 'Question' && (
          <ButtonsMessage
            FItem={FItem}
            buttonList={buttonList}
            setButtonList={setButtonList}
          />
        )}
        {title === 'List' && (
          <ListMessage FItem={FItem} List={List} setList={setList} />
        )}
        <Flex end style={{ padding: 20 }}>
          <Space size={'middle'}>
            <Button onClick={clearForm}>Close</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Flex>
      </Form>
    </Wrapper>
  );
};

export default SelectResponse;
