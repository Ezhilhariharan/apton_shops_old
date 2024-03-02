import { Divider, Form, Radio, Select, Tooltip, message, Checkbox } from 'antd';
import React, { memo, useEffect, useState, useRef, forwardRef } from 'react';
import Header from './WatsupTemplateHeader';
import CallToFunction from './CallToFunction';
import QuickReply from './QuickReply';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { uploadTemplateForm } from '../../actions';

const WatsupTemplateButton = forwardRef(({ form }, ref) => {
  const [value, setValue] = useState('None');
  const dispatch = useDispatch();
  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );

  React.useImperativeHandle(ref, () => ({
    setActiveValue,
  }));

  const setActiveValue = propsVal => {
    let value = propsVal ? propsVal : 'None';

    setValue(value);
    if (value === 'Call_to_action') {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            buttonText1: '',
            buttonText2: '',
            buttonMarketing: '',
            addButtonValue: value,
          })
        )
      );

      form.setFieldsValue({
        buttonText1: '',
        buttonText2: '',
        buttonMarketing: '',
      });
    } else if (value === 'Quick_reply') {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            linkName: '',
            link: '',
            linkType: 'Static',
            phoneName: '',
            phoneNumber: '',
            addButtonValue: value,
            website_filed_checkbox: true,
            phone_field_checkbox: false,
          })
        )
      );
      form.setFieldsValue({
        linkType: 'Static',
        web_button_name: '',
        link: '',
        add_sample_url: '',
        phone_button_name: '',
        phoneNumber: '',
        website_filed_checkbox: true,
        phone_field_checkbox: false,
      });
    } else if (value === 'None') {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            linkName: '',
            link: '',
            linkType: 'Static',
            phoneName: '',
            phoneNumber: '',
            buttonText1: '',
            buttonText2: '',
            buttonMarketing: '',
            addButtonValue: value,
            website_filed_checkbox: true,
            phone_field_checkbox: false,
          })
        )
      );
      form.setFieldsValue({
        linkType: 'Static',
        web_button_name: '',
        link: '',
        add_sample_url: '',
        phone_button_name: '',
        phoneNumber: '',
        buttonText1: '',
        buttonText2: '',
        buttonMarketing: '',
        website_filed_checkbox: true,
        phone_field_checkbox: false,
      });
    }
  };
  return (
    <div>
      <Header
        title="Button"
        description="Create Button that let customers respond to your message or take action"
        optional
      />
      <Form.Item name="addButtonRadio">
        <Radio.Group
          onChange={e => setActiveValue(e.target.value)}
          defaultValue="None"
          value={value}
        >
          <Radio value={'None'}>None</Radio>
          <Radio value={'Call_to_action'}>Call to action</Radio>
          <Radio value={'Quick_reply'}>Quick reply</Radio>
        </Radio.Group>
      </Form.Item>

      {value === 'Call_to_action' && <CallToFunction form={form} />}
      {value === 'Quick_reply' && <QuickReply form={form} />}
      {value === 'None' && null}
      <Divider className="divider" />
    </div>
  );
});

export default WatsupTemplateButton;
