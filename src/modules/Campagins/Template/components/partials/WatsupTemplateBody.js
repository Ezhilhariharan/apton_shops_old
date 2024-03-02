import { Divider, Form, Radio, Select, Tooltip, message, Button } from 'antd';
import React, { memo, useEffect, useState, useRef } from 'react';
import Flex from '@components/common/Flex';
import * as T from './CreateTemplateForm.styles';
import Header from './WatsupTemplateHeader';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { addVariableText } from '../constants/index';
import { updateBodyVariable, uploadTemplateForm } from '../../actions';
import { InfoCircleOutlined } from '@ant-design/icons';

function WatsupTemplateBody({ form }) {
  const [textBodyVariable, setTextBodyVariable] = useState(0);
  const [addVariable, setVariable] = useState([]);
  const [variableCount, setVariableCount] = useState(1);
  const [bodyError, setBodyError] = useState(false);
  const textareaRef = useRef(null);

  const dispatch = useDispatch();
  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );
  const body = useSelector(
    state => state?.whatsappTemplate?.templateField?.body,
    shallowEqual
  );
  const bodyVariable = useSelector(
    state => state?.whatsappTemplate?.bodyVariable,
    shallowEqual
  );
  const setAddVariable = name => {
    if (name === 'custom_variable') {
      const addedVariable = addVariable?.concat(
        `{{custom_variable${variableCount}}}`
      );

      let checkingVariable = bodyVariable?.includes(
        `{{custom_variable${variableCount}}}`
      );
      if (!checkingVariable) {
        form.resetFields([`body_custom_variable${variableCount}`]);
      }

      const textarea = textareaRef.current;
      if (!textarea) return; // Check if textarea exists
      if (textarea) {
        const { selectionStart, selectionEnd, value } = textarea;

        const regexExp = /{{(.*?)}}/g;
        let getArray = [];
        let arrValue = body?.match(regexExp);

        arrValue?.map(arr => {
          if (arr?.slice(0, 17) === '{{custom_variable') {
            getArray.push(arr);
          }
        });

        const variable = `{{custom_variable${variableCount}}}`;
        const newText =
          body.slice(0, selectionStart) + variable + body.slice(selectionEnd);

        const addedBody = body + addedVariable[addedVariable?.length - 1];
        setVariableCount(variableCount + 1);
        setVariable(addedVariable);
        // setTextBody(newText);
        dispatch(
          uploadTemplateForm(
            Object.assign(templateField, {
              body: newText,
            })
          )
        );
        if (addedBody?.length > 0) {
          form.setFieldsValue({
            templateMessage: newText,
          });
        }
        textarea.value = newText;
        textarea.setSelectionRange(
          selectionStart + variable.length,
          selectionStart + variable.length
        );
        textarea.focus();
      }
    } else {
      let checkingVariable = bodyVariable?.includes(`{{${name}}}`);
      if (!checkingVariable) {
        form.resetFields([`body_${name}`]);
      }

      let addName = `{{${name}}}`;
      const textarea = textareaRef.current;
      if (!textarea) return; // Check if textarea exists
      if (textarea) {
        const { selectionStart, selectionEnd, value } = textarea;

        const newText =
          body.slice(0, selectionStart) + addName + body.slice(selectionEnd);
        textarea.value = newText;
        textarea.setSelectionRange(
          selectionStart + addName.length,
          selectionStart + addName.length
        );
        textarea.focus();

        dispatch(
          uploadTemplateForm(
            Object.assign(templateField, {
              body: newText,
            })
          )
        );
        form.setFieldsValue({
          templateMessage: newText,
        });
      }
    }
  };

  const handleReduce = () => {
    let text = body;
    let i = 0;

    var pattern = /{{(\bcustom_variable)(\d+)}}/g;

    var updatedString = body.replace(pattern, function (match, word, number) {
      var incrementedNumber = parseInt(number) + 1;
      return `{{${word + incrementedNumber}}}`;
    });

    const regexExp = /{{(.*?)}}/g;
    let result = body?.toString().toLowerCase().match(regexExp);
    // let bodyText = text.split(' ');
    var bodyText = body
      .replace(/([a-z])([A-Z])/g, ' ')
      .replace(/([A-Z])([A-Z][a-z])/g, ' ');

    result?.map(arr => {
      if (arr?.slice(0, 17) === '{{custom_variable') {
        for (let i = 0; i < bodyText?.length; i++) {
          if (bodyText[i]?.slice(0, 8) === '{{custom') {
            bodyText[i] = `custom_variable${i + 1}`;
          }
        }
      }
    });

    var tempArray = [];
    for (let i = 0; i < addVariable?.length; i++) {
      tempArray?.push(`{{${i + 1}}}`);
    }

    // setVariable(tempArray);
    // setVariableCount(tempArray?.length + 1);
  };

  useEffect(() => {
    const regex = /{{(.*?)}}/g;
    let text = body?.toString().toLowerCase().match(regex);
    setTextBodyVariable(text?.join()?.length ? text?.join()?.length : 0);

    let result = body?.toString().toLowerCase().match(regex);
    let withoutCustomVar = result?.filter(
      item => item !== '{{custom_variable}}'
    );

    let getArray = [];
    let normalName = [];

    withoutCustomVar?.map(arr => {
      if (arr?.match(/{{(custom_variable\d+)}}/g)) {
        getArray.push(arr);
      } else {
        normalName.push(arr);
      }
    });
    let temp = [];

    for (let i = 0; i < getArray?.length; i++) {
      temp.push(`{{custom_variable${i + 1}}}`);
    }
    // console.log('getArray', getArray);

    dispatch(updateBodyVariable([...normalName, ...temp]));
    setVariable(temp);
    setVariableCount(temp?.length + 1);

    var pattern = /}}{{/g;
    var updatedStr = body?.toString().toLowerCase().match(pattern);
    if (updatedStr) {
      setBodyError(true);
    } else if (
      body === '{{first_name}}' ||
      body === '{{last_name}}' ||
      body === '{{shop_name}}' ||
      body === '{{email_id}}' ||
      body === '{{mobile_number}}' ||
      body === '{{custom_variable1}}'
    ) {
      setBodyError(true);
    } else {
      setBodyError(false);
    }
  }, [body]);

  useEffect(() => {
    onChangeBody();
  }, [variableCount]);

  const onChangeBody = val => {
    // console.log('click');

    const textarea = textareaRef.current;

    // console.log('text-1', val);

    // console.log('text-2', val?.replace('{{custom_variable}}', ''));
    let text = val?.replace(/{{custom_variable}}/g, '');
    // let text = val;

    if (text) {
      var pattern = /{{(custom_variable\d+)}}/g;
      var count = 1;
      var updatedStr = text?.replace(pattern, function (match, variable) {
        return '{{custom_variable' + count++ + '}}';
      });

      // console.log('updatedStr', updatedStr);

      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            body: updatedStr,
          })
        )
      );
      form.setFieldsValue({
        templateMessage: updatedStr,
      });
    } else {
      var pattern = /{{(custom_variable\d+)}}/g;
      var count = 1;
      var updatedStr = body?.replace(pattern, function (match, variable) {
        return '{{custom_variable' + count++ + '}}';
      });

      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            body: updatedStr,
          })
        )
      );
      form.setFieldsValue({
        templateMessage: updatedStr,
      });
    }
    textarea.focus();
  };

  return (
    <>
      <T.HeaderTextWrapper>
        <Header title="Body" />
        <Flex spaceBetween>
          <T.BodyAddText>Enter the text for your message.</T.BodyAddText>
          <T.RemainingText style={{ marginBottom: '0px' }}>
            {body?.length}/{1024 + parseInt(textBodyVariable)}
          </T.RemainingText>
        </Flex>
        <T.BodyWrapper>
          <T.TextWrapper>
            <Form.Item
              name="templateMessage"
              rules={[
                { required: true, message: 'Body content is compulsory' },
                {
                  pattern: /[^{{]+/,
                  message: 'Variables are not allowed at start',
                },
                {
                  pattern: /[^}}]$/,
                  message: 'Variables are not allowed at end',
                },
                {
                  max: 1024,
                  message: 'limit is 60',
                },
                {
                  whitespace: true,
                  message: 'Body cannot be whitespace only',
                },
              ]}
            >
              <textarea
                className="textAreaStyles"
                placeholder="Template Message..."
                value={body}
                id="textBody"
                ref={textareaRef}
                name="templateMessage"
                onChange={e => {
                  dispatch(
                    uploadTemplateForm(
                      Object.assign(templateField, {
                        body: e.target.value,
                      })
                    )
                  );
                }}
                onKeyDown={e => onChangeBody(e.target.value)}
                // onKeyup={e => onChangeBody(e.target.value)}
                maxLength={1024 + textBodyVariable}
                onBlur={() => handleReduce()}
              />
            </Form.Item>
          </T.TextWrapper>
        </T.BodyWrapper>
        {bodyError && (
          <T.AddText>
            <InfoCircleOutlined className="info" /> Your template contains too
            many variable parameters relative to the message length. You need to
            decrease the number of variable parameters or increase the message
            length.
          </T.AddText>
        )}

        <div className="dropdown">
          <Button className="button">Add Variable</Button>
          <div className="dropdown-content">
            {addVariableText?.map(varName => (
              <T.VariableName
                key={varName?.id}
                onClick={() => setAddVariable(varName?.title)}
              >
                {varName?.title}
              </T.VariableName>
            ))}
          </div>
        </div>
      </T.HeaderTextWrapper>
      <Divider className="divider" />
    </>
  );
}

export default WatsupTemplateBody;
