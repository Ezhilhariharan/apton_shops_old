import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { SectionTitle } from './HeaderMessage';
import DeleteIcon from '@components/icons/DeleteIcon';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import Flex from '@components/common/Flex';
import { generateId,hasDuplicateName,hasDuplicateOptionName } from './helper/dataformating';

const Wrapper = styled.div`
  margin-top: 1rem;
  background-color: ${props => props.color || '#FFF'};
  border-radius: ${props => props.radius || '0px'};
  padding: 20px;
`;

const StyledInput = styled(Input)`
  background-color: ${props => props.color || '#F4F4F5'};
  border-radius: 5px;
  border: 1px solid #f4f4f5;
`;

const ClonseBtn = styled.div`
  cursor: pointer;
  background: #fff;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f4f4f5;
  border-radius: 15px;
`;

const ListMessage = ({ FItem, List, setList }) => {
  const handleAddObject = () => {
    const objects = List.dataList.slice();
    const rows = [
      {
        id: generateId(),
        title: 'Option 1',
        value: '',
      },
    ];
    objects.push({
      id: generateId(),
      headerText: `Section ${objects.length + 1} Title`,
      value: '',
      children: rows,
    });
    setList({ dataList: objects });
  };

  const handleDeleteObject = id => {
    const objects = List.dataList.slice();
    const index = objects.findIndex(o => o.id === id);
    objects.splice(index, 1);
    setList({ dataList: objects });
  };
  const handleChildAddObject = groupId => {
    const groups = List.dataList.slice();
    const groupIndex = groups.findIndex(g => g.id === groupId);
    const group = groups[groupIndex];
    group.children.push({
      id: generateId(),
      title: `Option${group.children.length + 1}`,
    });
    setList({ dataList: groups });
  };

  const handleChildDeleteObject = (groupId, objectId) => {
    const groups = List.dataList.slice();
    const groupIndex = groups.findIndex(g => g.id === groupId);
    const group = groups[groupIndex];
    const index = group.children.findIndex(o => o.id === objectId);
    group.children.splice(index, 1);
    setList({ dataList: groups });
  };

  const updateTile = (e, groupId) => {
    const newState = List.dataList.map(obj => {
      if (obj.id === groupId) {
        return { ...obj, value: e.target.value };
      }
      return obj;
    });
    setList({ dataList: newState });
  };

  const updateNestedArray = (e, mainId, childId) => {
    const newChildArray = List.dataList.map(child => {
      if (child.id === mainId) {
        return {
          ...child,
          children: child.children.map(nested => {
            if (nested.id === childId) {
              return { ...nested, value: e.target.value };
            }
            return nested;
          }),
        };
      }
      return child;
    });
    setList({ dataList: newChildArray });
  };

  return (
    <Fragment>
      <SectionTitle>Button text</SectionTitle>
      <FItem
        name={'list_button_text'}
        rules={[
          {
            required: true,
            message: 'Please enter the valid input',
          },
        ]}
      >
        <StyledInput placeholder="Button Text" size="large" 
        minLength={0}
        maxLength={25}
        showCount/>
      </FItem>
      <Flex end>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          ghost
          style={{ marginTop: 10 }}
          size="middle"
          disabled={List?.dataList?.length === 5}
          onClick={handleAddObject}
        >
          Add More
        </Button>
      </Flex>
      {List.dataList?.map((item, idk) => {
        return (
          <Wrapper color="#F4F4F5" radius="10px" key={idk}>
            {List?.dataList?.length > 1 && item.id !== 1 && (
              <Flex end>
                <ClonseBtn
                  onClick={() => {
                    handleDeleteObject(item.id);
                  }}
                >
                  <CloseOutlined twoToneColor={'#eb2f96'} />
                </ClonseBtn>
              </Flex>
            )}
            <SectionTitle>{item?.headerText}</SectionTitle>
            <FItem
              name={`list_title_${idk}`}
              rules={[
                {
                  required: true,
                  message: 'Please enter the valid input',
                },
                {
                  validator: () => {
                    const res = hasDuplicateName(List?.dataList)
                    if (res===true) {
                      return Promise.reject(
                        'Section value already exists'
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <StyledInput
                placeholder="Enter Title"
                color="#FFF"
                size="large"
                style={{ marginTop: 5 }}
                onChange={e => updateTile(e, item?.id)}
                minLength={0}
                maxLength={10}
                showCount
              />
            </FItem>
            {item.children.map((list, ids) => {
              return (
                <Flex key={ids} column style={{ marginTop: 5 }}>
                  <div style={{ marginTop: 5 }}>
                    <SectionTitle>{`Option${ids + 1}`}</SectionTitle>
                  </div>
                  <Flex key={ids} spaceBetween style={{ marginTop: 5 }}>
                    <FItem
                      name={`list_title_${idk}_option_value_${ids}`}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the valid input',
                        },
                        {
                          validator: () => {
                            const res = hasDuplicateOptionName(List?.dataList)
                            if (res===true) {
                              return Promise.reject(
                                'Section value already exists'
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <StyledInput
                        placeholder="List name"
                        size="large"
                        style={{
                          width: item?.children?.length > 1 ? '90%' : '100%',
                        }}
                        color="#FFF"
                        onChange={e => {
                          updateNestedArray(e, item?.id, list?.id);
                        }}
                        minLength={0}
                        maxLength={25}
                        showCount
                      />
                    </FItem>

                    {item?.children?.length > 1 && (
                      <div
                        onClick={() => {
                          handleChildDeleteObject(item?.id, list?.id);
                        }}
                      >
                        <DeleteIcon width={'40'} height={'40'} />
                      </div>
                    )}
                  </Flex>
                  {item?.children?.length - 1 === ids && (
                    <Button
                      icon={<PlusOutlined />}
                      type="primary"
                      ghost
                      style={{ marginTop: 10 }}
                      size="middle"
                      disabled={item?.children?.length === 3}
                      onClick={() => {
                        handleChildAddObject(item?.id);
                      }}
                    >
                      Add More
                    </Button>
                  )}
                </Flex>
              );
            })}
          </Wrapper>
        );
      })}
    </Fragment>
  );
};

export default ListMessage;
