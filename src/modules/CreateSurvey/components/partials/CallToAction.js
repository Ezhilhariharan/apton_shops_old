import React, { useState } from 'react';
import { Select, Button, Input, Space } from 'antd';
import styled from 'styled-components';
import DeleteIcon from '@components/icons/DeleteIcon';
const StyledInput = styled(Input)`
  background-color: #f4f4f5;
  border-radius: 5px;
  border: 1px solid #f4f4f5;
`;

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const CallToAction = ({ FItem }) => {
  const [btnTypeOne, setBtnTypeOne] = useState('1');
  const [btnTypeTwo, setBtnTypeTwo] = useState('2');
  const [countryCode, setCountryCode] = useState();
  const [webType, setWebType] = useState();
  const [buttonList, setButtonList] = useState([
    {
      id: 1,
      name: 'PhoneNumber',
    },
  ]);

  const countryCodeList = [
    {
      value: '+91',
      label: 'IND',
    },
    {
      value: '+1',
      label: 'USA',
    },
  ];

  const webSiteType = [
    {
      value: 'static',
      label: 'Static',
    },
    {
      value: 'dynamic',
      label: 'Dynamic',
    },
  ];

  const onChangeBtnOne = value => {
    setBtnTypeOne(value);
  };
  const onChangeBtnTwo = value => {
    setBtnTypeTwo(value);
  };
  const onChangeCountry = value => {
    setCountryCode(value);
  };

 

  const handleAddObject = () => {
    const objects = buttonList.slice();
    const newId = Math.max(...objects.map(o => o.id)) + 1;
    const newName = objects.map(o => o.name === 'PhoneNumber');
    const objName = newName[0] === true ? 'WebSite' : 'PhoneNumber';
    objects.push({ id: newId, name: objName });
    setButtonList(objects);
  };

  const handleDeleteObject = id => {
    const objects = buttonList.slice();
    const index = objects.findIndex(o => o.id === id);
    objects.splice(index, 1);
    setButtonList(objects);
  };
  return (
    <>
      {buttonList?.map((item, id) => {
        return (
          <>
            {item?.name === 'PhoneNumber' && (
              <Space size={'middle'} key={id} style={{ margin: 5 }}>
                <FItem
                  name="btn1_type"
                  label="Action type."
                  rules={[
                    {
                      required: true,
                      message: 'Select value.',
                    },
                  ]}
                >
                  <Select
                    style={{ width: 150, background: '#F4F4F5' }}
                    size="large"
                    onChange={onChangeBtnOne}
                    options={[
                      {
                        value: '1',
                        label: 'Call Phone Number',
                        disabled: buttonList?.length > 1 && btnTypeTwo === '1',
                      },
                      {
                        value: '2',
                        label: 'Visit Website',
                        disabled: buttonList?.length > 1 && btnTypeTwo === '2',
                      },
                    ]}
                  />
                </FItem>
                <FItem
                  name="btn1_value"
                  label="Button text"
                  rules={[
                    {
                      required: true,
                      message: 'Enter valid input.',
                    },
                  ]}
                >
                  <StyledInput
                    minLength={0}
                    maxLength={25}
                    showCount
                    size="large"
                  />
                </FItem>

                {btnTypeOne === '1' && (
                  <FItem
                    name="country_code"
                    label="Country code."
                    rules={[
                      {
                        required: true,
                        message: 'Select value.',
                      },
                    ]}
                  >
                    <Select
                      style={{ width: 80, background: '#F4F4F5' }}
                      size="large"
                      onChange={onChangeCountry}
                      options={countryCodeList}
                    />
                  </FItem>
                )}
                <FItem
                  name={btnTypeOne === '1' ? 'phone_number' : 'website_link'}
                  label={btnTypeOne === '1' ? 'Phone number' : 'Website link'}
                  rules={[
                    {
                      required: true,
                      message: 'Enter valid input.',
                    },
                  ]}
                >
                  <StyledInput
                    minLength={0}
                    maxLength={btnTypeOne === '1' ? 20 : 2000}
                    showCount
                    size="large"
                  />
                </FItem>

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
            )}
            {item?.name === 'WebSite' && (
              <Space size={'middle'} key={id} style={{ margin: 5 }}>
                <FItem
                  name="btn2_type"
                  label="Action type."
                  rules={[
                    {
                      required: true,
                      message: 'Select value.',
                    },
                  ]}
                >
                  <Select
                    style={{ width: 150, background: '#F4F4F5' }}
                    size="large"
                    onChange={onChangeBtnTwo}
                    options={[
                      {
                        value: '1',
                        label: 'Call Phone Number',
                        disabled: buttonList?.length > 1 && btnTypeOne === '1',
                      },
                      {
                        value: '2',
                        label: 'Visit Website',
                        disabled: buttonList?.length > 1 && btnTypeOne === '2',
                      },
                    ]}
                  />
                </FItem>
                <FItem
                  name="btn2_value"
                  label="Button text"
                  rules={[
                    {
                      required: true,
                      message: 'Enter valid input.',
                    },
                  ]}
                >
                  <StyledInput
                    minLength={0}
                    maxLength={25}
                    showCount
                    size="large"
                  />
                </FItem>
                {btnTypeTwo === '1' && (
                  <FItem
                    name="country_code"
                    label="Country code."
                    rules={[
                      {
                        required: true,
                        message: 'Select value.',
                      },
                    ]}
                  >
                    <Select
                      style={{ width: 80, background: '#F4F4F5' }}
                      defaultValue={'+91'}
                      size="large"
                      onChange={onChangeCountry}
                      options={countryCodeList}
                    />
                  </FItem>
                )}
                <FItem
                  name={btnTypeTwo === '1' ? 'phone_number2' : 'website_link2'}
                  label={btnTypeTwo === '1' ? 'Phone number' : 'Website link'}
                  rules={[
                    {
                      required: true,
                      message: 'Enter valid input.',
                    },
                  ]}
                >
                  <StyledInput
                    minLength={0}
                    maxLength={btnTypeTwo === '1' ? 20 : 2000}
                    showCount
                    size="large"
                  />
                </FItem>
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
            )}
          </>
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
          disabled={buttonList.length == 2}
        >
          Add Button
        </Button>
      </Wrapper>
    </>
  );
};

export default CallToAction;
