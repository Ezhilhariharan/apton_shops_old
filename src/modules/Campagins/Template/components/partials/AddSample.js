import { Divider, Form, Radio, Select, Tooltip, message, Checkbox } from 'antd';
import React, { memo, useEffect, useState, useRef } from 'react';
import Header from './WatsupTemplateHeader';
import Flex from '@components/common/Flex';
import * as T from './CreateTemplateForm.styles';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  updateHeaderVariable,
  updateBodyVariable,
  uploadTemplateForm,
  log,
} from '../../actions';
import { addVariableBracketText } from '../constants/index';

function AddSample({ form }) {
  const [bodyVariables, setBodyVariable] = useState([]);
  const [localHeaderVariables, setHeaderVariable] = useState([]);
  const [bodyVariableField, setBodyVariableField] = useState([]);
  const [headerVariableField, setHeaderVariableField] = useState({
    fieldName: '',
    fieldValue: '',
  });
  const dispatch = useDispatch();
  const headerVariable = useSelector(
    state => state?.whatsappTemplate?.headerVariable,
    shallowEqual
  );
  const header = useSelector(
    state => state?.whatsappTemplate?.templateField?.header,
    shallowEqual
  );
  const bodyVariable = useSelector(
    state => state?.whatsappTemplate?.bodyVariable,
    shallowEqual
  );
  const linkType = useSelector(
    state => state?.whatsappTemplate?.templateField?.linkType,
    shallowEqual
  );
  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );
  const body = useSelector(
    state => state?.whatsappTemplate?.templateField?.body,
    shallowEqual
  );
  const editTemplate = useSelector(
    state => state?.whatsappTemplate?.editTemplateData,
    shallowEqual
  );
  const discardChanges = useSelector(
    state => state?.whatsappTemplate?.discardChanges,
    shallowEqual
  );

  useEffect(() => {
    if (header) {
      const regex = /{{(.*?)}}/g;
      let text = header.toString().toLowerCase().match(regex);
      if (text === null) {
        dispatch(updateHeaderVariable([]));
      }
    }
    if (header === '') {
      if (localHeaderVariables?.length > 0) {
        eraseBodyValue(localHeaderVariables[0]);
      }
    }
  }, [header]);

  useEffect(() => {
    if (editTemplate?.name) {
      let localHeaderVariable;
      let setArrValue = [];
      editTemplate?.components?.map(editData => {
        if (editData?.format === 'TEXT') {
          const regex = /{{(.*?)}}/g;
          let text =
            editData?.example?.header_text?.length > 0 &&
            editData?.text?.toString().toLowerCase().match(regex);

          if (text && text?.length > 0) {
            localHeaderVariable = text;
            setHeaderVariableField({
              fieldName: text[0],
              fieldValue: editData?.example?.header_text[0],
            });
          }
        }
        if (editData?.type === 'BODY') {
          const regexExp = /{{(.*?)}}/g;
          let result = editData?.text?.toString().toLowerCase().match(regexExp);
          let getArray = [];
          let normalName = [];
          result?.map(arr => {
            if (arr?.slice(0, 8) === '{{custom') {
              getArray.push(arr);
            } else {
              normalName.push(arr);
            }
          });
          let temp = [];

          for (let i = 0; i < getArray?.length; i++) {
            temp.push(`{{custom_variable${i + 1}}}`);
          }
          let receivedData = [...normalName, ...temp];

          const values = editData?.example?.body_text[0];
          const convertedData = receivedData?.map((fieldName, index) => {
            const fieldValues = values[index];
            return { fieldName, fieldValues };
          });

          addVariableBracketText?.map(item => {
            setArrValue.push({ fieldName: item?.title, fieldValue: '' });
          });

          setArrValue?.forEach(obj1 => {
            const correspondingObj2 = convertedData.find(
              obj2 => obj2.fieldName === obj1.fieldName
            );

            if (correspondingObj2 && correspondingObj2?.fieldName) {
              obj1.fieldValue = correspondingObj2?.fieldValues;
            }
          });
        }
      });
      setTimeout(() => {
        setBodyVariableField(setArrValue);
      }, 900);
    }
  }, [editTemplate, discardChanges]);

  useEffect(() => {
    if (bodyVariable?.length > 0) {
      let avoidDuplicate = bodyVariable?.filter(
        (item, index) => bodyVariable?.indexOf(item) === index
      );
      if (headerVariable?.length > 0) {
        let avoidHeaderDuplicate = avoidDuplicate.filter(
          item => item !== headerVariable[0]
        );
        const validArr = filterValidArray(avoidHeaderDuplicate);
        updateErasedHeaderValue(validArr);
        setBodyVariable(validArr);
      } else {
        const validArr = filterValidArray(avoidDuplicate);
        updateErasedHeaderValue(validArr);
        setBodyVariable(validArr);
      }
      dispatch(updateBodyVariable(avoidDuplicate));
    } else {
      setBodyVariable([]);
    }
    if (headerVariable?.length > 0) {
      let variable = addVariableBracketText?.filter(
        item => item?.title === headerVariable[0]
      );
      variable?.length > 0
        ? setHeaderVariable([variable[0]?.title])
        : setHeaderVariable([]);

      bodyVariableField?.map(item => {
        if (item.fieldName === variable[0]?.title && item.fieldValue !== '') {
          form.setFieldsValue({
            headerData: item.fieldValue,
          });
          setHeaderVariableField({
            fieldName: item.fieldName,
            fieldValue: item.fieldValue,
          });
        }
      });
    } else {
      setHeaderVariable([]);
      eraseBodyValue(headerVariableField?.fieldName);
      setHeaderVariableField({
        fieldName: '',
        fieldValue: '',
      });
    }
    updatingVariableValues(bodyVariable, headerVariable);
    // console.log('bodyVariable', bodyVariable);
  }, [bodyVariable, headerVariable]);

  useEffect(() => {
    defineFieldValue();
  }, []);

  const updatingVariableValues = (bodyVar, headerVal) => {
    const filteredBodyArray = bodyVariableField.filter(
      element => !bodyVar.includes(element?.fieldName)
    );

    const filteredHeaderArray = filteredBodyArray.filter(
      element => !headerVal.includes(element?.fieldName)
    );

    let declareVariable = bodyVariableField;
    declareVariable.forEach(obj1 => {
      const correspondingObj2 = filteredHeaderArray.find(
        obj2 => obj2.fieldName === obj1.fieldName
      );

      if (correspondingObj2 && correspondingObj2?.fieldName) {
        obj1.fieldValue = '';
      }
    });

    setBodyVariableField(declareVariable);
  };

  const defineFieldValue = () => {
    let arrValue = [];
    if (bodyVariableField?.length === 0) {
      addVariableBracketText?.map(item => {
        arrValue.push({ fieldName: item?.title, fieldValue: '' });
      });
      setBodyVariableField(arrValue);
    }
  };

  const assignFieldValue = (value, name) => {
    setBodyVariableField(prev => {
      const newState = prev?.map(data => {
        if (data?.fieldName === name) {
          return { ...data, fieldValue: value };
        } else {
          return { ...data };
        }
      });
      return newState;
    });
  };

  const assignHeaderFieldValue = (name, value) => {
    setHeaderVariableField({
      fieldName: name,
      fieldValue: value,
    });
    assignFieldValue(value, name);
  };

  const updateErasedHeaderValue = arr => {
    arr?.map(item => {
      if (item === headerVariableField?.fieldName) {
        const field = 'body_' + `${item.replace(/{{(.*?)}}/, '$1')}`;
        form.setFieldsValue({
          [field]: headerVariableField?.fieldValue,
        });
        assignFieldValue(
          headerVariableField?.fieldValue,
          headerVariableField?.fieldName
        );
      }
    });
  };

  const eraseBodyValue = value => {
    if (value !== '') {
      const matchedVariable = bodyVariable?.includes(value);
      if (!matchedVariable) {
        setBodyVariableField(prev => {
          const newState = prev?.map(data => {
            if (data?.fieldName === value) {
              return { ...data, fieldValue: '' };
            } else {
              return { ...data };
            }
          });
          return newState;
        });
      }
    }
  };

  const filterValidArray = variableArr => {
    let localArr = [];
    variableArr?.map(arr => {
      if (
        // arr?.slice(0, 17) === '{{custom_variable' &&
        // arr?.slice(-2) === '}}'
        arr?.match(/{{(custom_variable\d+)}}/g)
      ) {
        localArr.push(arr);
      } else {
        addVariableBracketText?.filter(item => {
          return item?.title === arr && localArr.push(item?.title);
        });
      }
    });
    // console.log('localArr', localArr);
    return localArr;
  };

  const validateURL = (_, value) => {
    if (
      value &&
      !/^https?:\/\/([a-z0-9.-]+)\.([a-z]{2,})(\/.*)?$/i.test(value)
    ) {
      return Promise.reject('Invalid URL format');
    }
    return Promise.resolve();
  };
  const validateHeader = (_, value) => {
    if (headerVariableField?.fieldName === '{{mobile_number}}') {
      if (value && !/^[6789]\d{9}$/.test(value)) {
        return Promise.reject('Please enter only phone number');
      }
      return Promise.resolve();
    } else if (headerVariableField?.fieldName === '{{email_id}}') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailPattern.test(value)) {
        return Promise.reject('Please enter valid email');
      }
      return Promise.resolve();
    } else {
      return Promise.resolve();
    }
  };
  // console.log('bodyVariables', bodyVariables);
  // console.log('bodyVariable', bodyVariable);
  return (
    <div>
      {((body?.trim() !== '' && bodyVariables?.length > 0) ||
        (header?.trim() !== '' && localHeaderVariables?.length > 0) ||
        linkType === 'Dynamic') && (
        <Header
          title="Add Sample"
          description="Make sure to include let actual customer information & provide only sample content in your example"
        />
      )}

      {header?.trim() !== '' && localHeaderVariables?.length > 0 && (
        <Flex>
          <T.RightInputWrapper style={{ width: '60%' }}>
            <T.InputLabel>Header Variable</T.InputLabel>
            <T.RightContentWrapper>
              {localHeaderVariables[0]}
            </T.RightContentWrapper>
          </T.RightInputWrapper>

          <T.RightInputWrapper>
            <T.InputLabel>Sample Data</T.InputLabel>
            <Form.Item
              name="headerData"
              rules={[
                {
                  required: true,
                  message: 'value must be given',
                },
                {
                  transform: value => value.trim(),
                  message: 'value cannot be whitespace only',
                },
                {
                  validator: validateHeader,
                },
              ]}
            >
              <T.InputTag
                placeholder={`${localHeaderVariables[0]?.replace(
                  /{{(.*?)}}/,
                  '$1'
                )}`}
                name="headerData"
                onChange={e =>
                  assignHeaderFieldValue(
                    localHeaderVariables[0],
                    e.target.value
                  )
                }
                showCount
                maxLength={200}
              />
            </Form.Item>
          </T.RightInputWrapper>
        </Flex>
      )}
      {body?.trim() !== '' && bodyVariables?.length > 0 && (
        <Flex>
          <T.RightInputWrapper style={{ width: '60%' }}>
            <T.InputLabel>Body Variable</T.InputLabel>
            {bodyVariables?.map(i => {
              return (
                <Form.Item>
                  <T.RightContentWrapper>{i}</T.RightContentWrapper>
                </Form.Item>
              );
            })}
          </T.RightInputWrapper>

          <T.RightInputWrapper>
            <T.InputLabel>Sample Data</T.InputLabel>
            {bodyVariables?.map(i => {
              return (
                <Form.Item
                  name={'body_' + `${i.replace(/{{(.*?)}}/, '$1')}`}
                  rules={[
                    {
                      required: true,
                      message: 'Must be given',
                    },
                    i === '{{mobile_number}}' && {
                      pattern: /^[6789]\d{9}$/,
                      message: 'Please enter only phone number',
                    },
                    i === '{{email_id}}' && {
                      pattern: '[a-z0-9]+@[a-z]+.[a-z]{2,3}',
                      message: 'Please enter valid email',
                    },
                    {
                      transform: value => value.trim(),
                      message: 'value cannot be whitespace only',
                    },
                  ]}
                >
                  <T.InputTag
                    placeholder={`${i.replace(/{{(.*?)}}/, '$1')}`}
                    name={'body_' + `${i.replace(/{{(.*?)}}/, '$1')}`}
                    onChange={e => assignFieldValue(e.target.value, i)}
                    showCount
                    maxLength={200}
                  />
                </Form.Item>
              );
            })}
          </T.RightInputWrapper>
        </Flex>
      )}
      {linkType === 'Dynamic' && (
        <Flex>
          <T.RightInputWrapper style={{ width: '60%' }}>
            <T.InputLabel>Button Variable</T.InputLabel>
            <T.RightContentWrapper>{`{{ website_url }}`}</T.RightContentWrapper>
          </T.RightInputWrapper>
          <T.RightInputWrapper>
            <T.InputLabel>Sample Data</T.InputLabel>
            <Form.Item
              name="add_sample_url"
              rules={[
                {
                  required: true,
                  message: 'Must be given',
                },
                {
                  validator: validateURL,
                },
                {
                  transform: value => value.trim(),
                  message: 'value cannot be whitespace only',
                },
              ]}
            >
              <T.InputTag
                placeholder="Ex: https://www.aptonshops.com"
                name="link"
                value={''}
                onChange={e => {
                  dispatch(
                    uploadTemplateForm(
                      Object.assign(templateField, {
                        add_sample_url: e.target.value + '{{website_url}}',
                      })
                    )
                  );
                }}
                // showCount
                // maxLength={200}
              />
            </Form.Item>
          </T.RightInputWrapper>
        </Flex>
      )}
    </div>
  );
}

export default AddSample;
