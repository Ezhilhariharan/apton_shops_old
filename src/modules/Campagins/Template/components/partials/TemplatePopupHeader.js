import React, { useState } from 'react';
import { Divider, Form, Radio, Select, Tooltip, message } from 'antd';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import * as T from './CreateTemplateForm.styles';
import {
  templateNameSearch,
  updateTemplateCategory,
  uploadTemplateForm,
} from '../../actions';

function TemplatePopupHeader({ form }) {
  const [nameValue, setValue] = useState('');

  const dispatch = useDispatch();

  const templateNameSearchList = useSelector(
    state => state.whatsappTemplate.templateNameSearch,
    shallowEqual
  );
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const editTemplate = useSelector(
    state => state?.whatsappTemplate?.editTemplateData,
    shallowEqual
  );
  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );

  const setTemplateValue = value => {
    let val = value?.toLowerCase().replace(/\s+/g, '_');
    setValue(val);
    form.setFieldsValue({
      templateName: val,
    });
    // setTimeout(() => {
    //   dispatch(templateNameSearch(brand?.account_id, brand?.id, val));
    // }, 2000);
  };

  const validateName = (_, value) => {
    // setTimeout(() => {
    dispatch(templateNameSearch(brand?.account_id, brand?.id, value));
    // }, 2000);
    if (editTemplate?.name) {
      return Promise.resolve();
    } else {
      if (templateNameSearchList?.list?.length !== 0) {
        return Promise.reject('Name Already Exits');
      }
      return Promise.resolve();
    }
  };
  const category = val => {
    dispatch(
      uploadTemplateForm(
        Object.assign(templateField, {
          buttonMarketing: '',
          buttonText2: '',
          buttonText1: '',
        })
      )
    );
    form.setFieldsValue({
      buttonMarketing: '',
      buttonText2: '',
      buttonText1: '',
    });

    dispatch(updateTemplateCategory(val));
  };
  return (
    <T.MarginFlex>
      <T.RightInputWrapper>
        <T.InputLabel>Template name</T.InputLabel>
        <Form.Item
          name="templateName"
          rules={[
            {
              required: true,
              message: 'Template name must be given',
            },
            {
              pattern: new RegExp(/^[a-z_0-9]*$/),
              message: 'Only underscores and lowercase letters are allowed.',
            },
            {
              validator: validateName,
            },
          ]}
        >
          <T.InputTag
            placeholder="Template name"
            name="templateName"
            value={nameValue}
            onChange={e => setTemplateValue(e.target.value)}
            readOnly={
              editTemplate?.status === 'APPROVED' ||
              editTemplate?.status === 'REJECTED' ||
              editTemplate?.status === 'PENDING'
                ? true
                : false
            }
            maxLength={512}
            showCount
            // suffix={`${nameValue?.length}/512`}
          />
        </Form.Item>
      </T.RightInputWrapper>
      <T.RightInputWrapper>
        <T.InputLabel>Category</T.InputLabel>
        <Form.Item
          name="category"
          rules={[{ required: true, message: 'Category must be selected' }]}
        >
          <T.SelectTag
            placeholder="Category..."
            name="category"
            value={'name'}
            onChange={val => category(val)}
            disabled={
              editTemplate?.status === 'APPROVED' ||
              editTemplate?.status === 'REJECTED' ||
              editTemplate?.status === 'PENDING'
                ? true
                : false
            }
          >
            <Select.Option key="0" value="MARKETING">
              Marketing
            </Select.Option>
            <Select.Option key="1" value="UTILITY">
              Utility
            </Select.Option>
          </T.SelectTag>
        </Form.Item>
      </T.RightInputWrapper>
      <T.RightInputWrapper>
        <T.InputLabel>Language</T.InputLabel>
        <Form.Item
          name="language"
          rules={[{ required: true, message: 'Language must be selected' }]}
        >
          <T.SelectTag
            placeholder="Language..."
            name="language"
            value={'name'}
            disabled={
              editTemplate?.status === 'APPROVED' ||
              editTemplate?.status === 'REJECTED'
                ? true
                : false
            }
          >
            <Select.Option key="0" value="en">
              English
            </Select.Option>
            <Select.Option key="0" value="en_US">
              English US
            </Select.Option>
          </T.SelectTag>
        </Form.Item>
      </T.RightInputWrapper>
    </T.MarginFlex>
  );
}

export default TemplatePopupHeader;
