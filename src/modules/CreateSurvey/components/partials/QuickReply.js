import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import styled from 'styled-components';
import DeleteIcon from '@components/icons/DeleteIcon';
import { generateId, hasDuplicateName } from './helper/dataformating';
const StyledInput = styled(Input)`
  background-color: #f4f4f5;
  border-radius: 5px;
  border: 1px solid #f4f4f5;
`;

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const QuickReply = ({ FItem,buttonList, setButtonList }) => {
  const handleAddObject = () => {
    const objects = buttonList.slice();
    objects.push({ id: generateId() , name: `Replay${buttonList.length}`,value:'' });
    setButtonList(objects);
  };

  const handleDeleteObject = id => {
    const objects = buttonList.slice();
    const index = objects.findIndex(o => o.id === id);
    objects.splice(index, 1);
    setButtonList(objects);
  };

  const updateValue = (e, groupId) => {
    const newState = buttonList.map(obj => {
      if (obj.id === groupId) {
        return { ...obj, value: e.target.value };
      }
      return obj;
    });
    setButtonList(newState);
  };

  return (
    <>
      {buttonList?.map((item, id) => {
        return (
          <div key={id}>
            <FItem
              name={`quick_replay_value_${id}`}
              rules={[
                {
                  required: true,
                  message: 'Enter valid input.',
                },
                {
                  validator: () => {
                    const res = hasDuplicateName(buttonList)
                    if (res===true) {
                      return Promise.reject(
                        'Input value already exists'
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Space size={'large'} key={id} style={{ marginTop: 5 }}>
                <StyledInput
                  placeholder={'Button Text'}
                  minLength={0}
                  maxLength={25}
                  showCount
                  size="large"
                  style={{ width: '25rem' }}
                  onChange={e => {
                    updateValue(e, item?.id);
                  }}
                />
                {buttonList.length > 1 && (
                  <div
                    onClick={() => {
                      handleDeleteObject(item?.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <DeleteIcon width={'40'} height={40} />
                  </div>
                )}
              </Space>
            </FItem>
          </div>
        );
      })}
      <Wrapper>
        <Button
          type="primary"
          ghost
          style={{
            border: '2px solid',
            width: 176,
            height: 42,
            background: '#c5e0f1',
          }}
          onClick={handleAddObject}
          disabled={buttonList.length == 3}
        >
          Add Button
        </Button>
      </Wrapper>
    </>
  );
};

export default QuickReply;
