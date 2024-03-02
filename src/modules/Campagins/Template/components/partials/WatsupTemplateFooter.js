import { Divider, Form, Radio, Select, Tooltip, message } from 'antd';
import React, { memo, useEffect, useState, useRef } from 'react';
import Flex from '@components/common/Flex';
import * as T from './CreateTemplateForm.styles';
import Header from './WatsupTemplateHeader';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { uploadTemplateForm } from '../../actions';

function WatsupTemplateFooter() {
  const [footerText, setFooterText] = useState('');
  const dispatch = useDispatch();
  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );
  const footer = useSelector(
    state => state?.whatsappTemplate?.templateField?.footer,
    shallowEqual
  );
  const buttonMarketing = useSelector(
    state => state?.whatsappTemplate?.templateField?.buttonMarketing,
    shallowEqual
  );
  return (
    <div>
      <Header
        title="Footer"
        description="Add a short line of text to the bottom of your message template."
        optional
      />
      <T.TextWrapper>
        {buttonMarketing !== 'Stop promotions' ? (
          <Form.Item
            name="footerText"
            rules={[
              {
                whitespace: true,
                message: 'value cannot be whitespace only',
              },
            ]}
          >
            <T.HeaderTextInput
              placeholder="Enter text"
              value={footer}
              onChange={e => {
                dispatch(
                  uploadTemplateForm(
                    Object.assign(templateField, {
                      footer: e.target.value,
                    })
                  )
                );
              }}
              showCount
              maxLength={60}
              // suffix={`${footer?.length}/60`}
            />
          </Form.Item>
        ) : (
          <T.HeaderTextInput
            placeholder="Enter text"
            value="Not interested? Tap Stop promotions"
            disabled
          />
        )}
      </T.TextWrapper>
      <Divider className="divider" />
    </div>
  );
}

export default WatsupTemplateFooter;
