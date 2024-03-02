import { Divider, Form, Radio, Select, Tooltip, message, Checkbox } from 'antd';
import React, { memo, useEffect, useState, useRef } from 'react';
import Flex from '@components/common/Flex';
import * as T from './CreateTemplateForm.styles';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { uploadTemplateForm } from '../../actions';
import Header from './WatsupTemplateHeader';

function CallToFunction({ form }) {
  // const [websiteFiled, setWesite] = useState(true);
  // const [phoneFiled, setPhone] = useState(false);

  const dispatch = useDispatch();
  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );
  const linkName = useSelector(
    state => state?.whatsappTemplate?.templateField?.linkName,
    shallowEqual
  );
  const link = useSelector(
    state => state?.whatsappTemplate?.templateField?.link,
    shallowEqual
  );
  const linkType = useSelector(
    state => state?.whatsappTemplate?.templateField?.linkType,
    shallowEqual
  );
  const phoneName = useSelector(
    state => state?.whatsappTemplate?.templateField?.phoneName,
    shallowEqual
  );
  const phoneNumber = useSelector(
    state => state?.whatsappTemplate?.templateField?.phoneNumber,
    shallowEqual
  );
  const phoneCountryCode = useSelector(
    state => state?.whatsappTemplate?.templateField?.phoneCountryCode,
    shallowEqual
  );
  const websiteFiled = useSelector(
    state => state?.whatsappTemplate?.templateField?.website_filed_checkbox,
    shallowEqual
  );
  const phoneFiled = useSelector(
    state => state?.whatsappTemplate?.templateField?.phone_field_checkbox,
    shallowEqual
  );

  const validateURL = (_, value) => {
    if (
      value &&
      !/^https?:\/\/([a-z0-9.-]+)\.([a-z]{2,})(\/.*)?$/i.test(value)
    ) {
      return Promise.reject('Invalid URL format');
    }
    return Promise.resolve();
  };

  useEffect(() => {
    if (websiteFiled === false && phoneFiled === false) {
      // setWesite(true);
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            website_filed_checkbox: true,
          })
        )
      );
    }
    // dispatch(
    //   uploadTemplateForm(
    //     Object.assign(templateField, {
    //       website_filed_checkbox: websiteFiled,
    //       phone_field_checkbox: phoneFiled,
    //     })
    //   )
    // );
    if (!websiteFiled) {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            linkType: 'Static',
            linkName: '',
            link: '',
            add_sample_url: '',
          })
        )
      );
      form.setFieldsValue({
        linkType: 'Static',
        web_button_name: '',
        link: '',
        add_sample_url: '',
      });
    } else if (!phoneFiled) {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            phoneName: '',
            phoneNumber: '',
          })
        )
      );
      form.setFieldsValue({ phone_button_name: '', phoneNumber: '' });
    }
  }, [websiteFiled, phoneFiled]);

  useEffect(() => {
    if (linkType === 'Static') {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            add_sample_url: '',
          })
        )
      );
      form.setFieldsValue({ add_sample_url: '' });
    }
  }, [linkType]);

  const mobileValidateURL = (_, value) => {
    if (
      value &&
      phoneCountryCode === '+1' &&
      !/^\(\d{3}\)\s?\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$/i.test(value)
    ) {
      return Promise.reject('Please enter US phone number');
    } else if (value && phoneCountryCode === '+91' && !/^\d{10}/i.test(value)) {
      return Promise.reject('Please enter india phone number');
    } else {
      return Promise.resolve();
    }
  };

  return (
    <>
      <T.ButtonRow>
        <Form.Item name={'website_filed_checkbox'}>
          <Checkbox
            onChange={() => {
              dispatch(
                uploadTemplateForm(
                  Object.assign(templateField, {
                    website_filed_checkbox: !websiteFiled,
                  })
                )
              );
            }}
            value={websiteFiled}
            className="checkBox"
            checked={websiteFiled}
          />
        </Form.Item>

        <T.RightInputWrapper
          style={{ width: '30%', marginLeft: '10px', marginRight: '0px' }}
        >
          <Form.Item
            name="linkType"
            rules={[
              {
                required: websiteFiled ? true : false,
                message: 'Must be selected',
              },
            ]}
          >
            <T.SelectTag
              placeholder="Category..."
              name="linkType"
              value={linkType}
              disabled={websiteFiled === false ? true : false}
              onChange={val => {
                dispatch(
                  uploadTemplateForm(
                    Object.assign(templateField, {
                      linkType: val,
                    })
                  )
                );
                if (val === 'Dynamic') {
                  form.resetFields(['add_sample_url']);
                }
              }}
              //   disabled={type === 'EDIT'}
            >
              <Select.Option key="0" value="Static">
                Static
              </Select.Option>
              <Select.Option key="1" value="Dynamic">
                Dynamic
              </Select.Option>
            </T.SelectTag>
          </Form.Item>
        </T.RightInputWrapper>
        <Form.Item
          name={'web_button_name'}
          rules={[
            {
              required: websiteFiled ? true : false,
              message: 'Must be given',
            },
            {
              whitespace: true,
              message: 'value cannot be whitespace only',
            },
          ]}
        >
          <T.QuickReplyInput
            placeholder="Ex:Visit Us"
            value={linkName}
            disabled={websiteFiled === false ? true : false}
            onChange={e => {
              dispatch(
                uploadTemplateForm(
                  Object.assign(templateField, {
                    linkName: e.target.value,
                  })
                )
              );
            }}
            maxLength={25}
            showCount
            // suffix={`${linkName?.length}/25`}
          />
        </Form.Item>

        <T.RightInputWrapper style={{ width: '60%', marginRight: '0px' }}>
          <Form.Item
            name="link"
            rules={[
              {
                required: websiteFiled ? true : false,
                message: 'Must be given',
              },
              {
                validator: validateURL,
              },
            ]}
          >
            <T.InputTag
              placeholder="Ex: https://www.aptonshops.com"
              name="link"
              value={link}
              disabled={websiteFiled === false ? true : false}
              onChange={e => {
                dispatch(
                  uploadTemplateForm(
                    Object.assign(templateField, {
                      link: e.target.value,
                    })
                  )
                );
              }}
              //   readOnly={type === 'EDIT'}
              maxLength={2000}
              showCount
              // suffix={`${link?.length}/2000`}
            />
          </Form.Item>
        </T.RightInputWrapper>
      </T.ButtonRow>

      <T.ButtonRow>
        <Form.Item name={'phone_field_checkbox'}>
          <Checkbox
            onChange={() => {
              dispatch(
                uploadTemplateForm(
                  Object.assign(templateField, {
                    phone_field_checkbox: !phoneFiled,
                  })
                )
              );
            }}
            value={phoneFiled}
            className="checkBox"
            checked={phoneFiled}
          />
        </Form.Item>

        <T.QuickReplyInput
          placeholder="Phone Number"
          disabled
          style={{ width: '29%', marginLeft: '10px', marginRight: '0px' }}
        />
        <Form.Item
          name={'phone_button_name'}
          rules={[
            {
              required: phoneFiled ? true : false,
              message: 'Must be given',
            },
            {
              whitespace: true,
              message: 'value cannot be whitespace only',
            },
          ]}
        >
          <T.QuickReplyInput
            placeholder="Ex:Call Us"
            value={phoneName}
            disabled={phoneFiled === false ? true : false}
            onChange={e => {
              dispatch(
                uploadTemplateForm(
                  Object.assign(templateField, {
                    phoneName: e.target.value,
                  })
                )
              );
            }}
            maxLength={25}
            showCount
            // suffix={`${phoneName?.length}/25`}
          />
        </Form.Item>
        <Flex style={{ width: '60%', marginRight: '0px' }} spaceBetween>
          <T.CountryCode
            placeholder="+91"
            name="phoneCountryCode"
            value={phoneCountryCode}
            disabled={phoneFiled === false ? true : false}
            maxLength={3}
            onChange={e => {
              dispatch(
                uploadTemplateForm(
                  Object.assign(templateField, {
                    phoneCountryCode: e.target.value,
                  })
                )
              );
            }}
          />
          <T.RightInputWrapper
            style={{ width: '80%', marginRight: '0px', marginLeft: '10px ' }}
          >
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: phoneFiled ? true : false,
                  message: 'Must be given',
                },
                {
                  validator: mobileValidateURL,
                },
              ]}
            >
              <T.InputTag
                // suffix={`${phoneNumber?.length}/20`}
                placeholder="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                disabled={phoneFiled === false ? true : false}
                onChange={e => {
                  dispatch(
                    uploadTemplateForm(
                      Object.assign(templateField, {
                        phoneNumber: e.target.value,
                      })
                    )
                  );
                }}
                showCount
                maxLength={20}
              />
            </Form.Item>
          </T.RightInputWrapper>
        </Flex>
      </T.ButtonRow>
    </>
  );
}

export default CallToFunction;
