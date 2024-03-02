import { Form, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import * as T from './CreateTemplateForm.styles';
import add from '../../../../../assets/images/addIcon.png';
import minus from '../../../../../assets/images/minusIcon.png';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { uploadTemplateForm } from '../../actions';

function QuickReply({ form }) {
  const [activeIndex, setActiveIndex] = useState([
    { index: 1, dropDown: 'Custom', value: '' },
  ]);
  const [marketingIn, setMarketingIn] = useState(false);

  const dispatch = useDispatch();

  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );
  const buttonText1 = useSelector(
    state => state?.whatsappTemplate?.templateField?.buttonText1,
    shallowEqual
  );
  const buttonText2 = useSelector(
    state => state?.whatsappTemplate?.templateField?.buttonText2,
    shallowEqual
  );
  const buttonMarketing = useSelector(
    state => state?.whatsappTemplate?.templateField?.buttonMarketing,
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
  const templateCategory = useSelector(
    state => state?.whatsappTemplate?.templateCategory,
    shallowEqual
  );

  const moveObjectToEnd = (array, object) => {
    const index = array.findIndex(item => item?.dropDown === object?.dropDown);
    if (index > -1) {
      array.splice(index, 1);
      array.push(object);
    }
    return array;
  };

  useEffect(() => {
    const data = activeIndex?.filter(
      item => item?.dropDown == 'Marketing opt-out'
    );
    if (data?.length > 0) {
      setMarketingIn(true);
    } else {
      setMarketingIn(false);
    }
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex([{ index: 1, dropDown: 'Custom', value: '' }]);
  }, [templateCategory]);

  useEffect(() => {
    setActiveIndex([{ index: 1, dropDown: 'Custom', value: '' }]);
    return () => {
      setActiveIndex([{ index: 1, dropDown: 'Custom', value: '' }]);
    };
  }, []);

  useEffect(() => {
    if (editTemplate?.name) {
      let filteredData = editTemplate?.components?.filter(
        item => item?.type === 'BUTTONS'
      );
      if (filteredData?.length > 0) {
        let buttons_item =
          filteredData[0]?.buttons?.length > 0
            ? filteredData[0]?.buttons[0]
            : 'None';
        let reStructureData = [];
        if (buttons_item?.type === 'QUICK_REPLY') {
          filteredData[0]?.buttons?.map((list, ind) => {
            if (list?.text === 'Stop promotions') {
              reStructureData.push({
                index: ind + 1,
                dropDown: 'Marketing opt-out',
                value: '',
              });
            } else {
              reStructureData.push({
                dropDown: 'Custom',
                index: ind + 1,
                value: list?.text,
              });
            }
          });
        } else {
          reStructureData = [{ index: 1, dropDown: 'Custom', value: '' }];
        }
        setActiveIndex(reStructureData);
      }
    }
  }, [editTemplate, discardChanges]);

  const settingDropdown = (val, id) => {
    let capturedState;
    setActiveIndex(prev => {
      const newState = prev?.map(list => {
        if (list?.index === id) {
          return { ...list, dropDown: val, value: '' };
        } else {
          return { ...list, dropDown: 'Custom' };
        }
      });
      if (val === 'Marketing opt-out') {
        let obj = { index: id, dropDown: 'Marketing opt-out' };
        let filteredData = moveObjectToEnd(newState, obj);
        const linedArray = filteredData?.map((list, ind) => {
          return { ...list, index: ind + 1 };
        });
        capturedState = linedArray;
        return linedArray;
      } else {
        capturedState = newState;
        return newState;
      }
    });

    arrangingState(capturedState);
    if (val === 'Marketing opt-out') {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            buttonMarketing: 'Stop promotions',
            // footer: '',
          })
        )
      );
      form.setFieldsValue({
        buttonMarketing: 'Stop promotions',
        // footerText: '',
      });
    } else {
      setInitialStateBtn3();
    }
  };

  const arrangingState = stateValue => {
    stateValue?.map(item => {
      if (item?.index === 1) {
        dispatch(
          uploadTemplateForm(
            Object.assign(templateField, {
              buttonText1: item?.value,
            })
          )
        );
        form.setFieldsValue({
          buttonText1: item?.value,
        });
      } else if (item?.index === 2) {
        dispatch(
          uploadTemplateForm(
            Object.assign(templateField, {
              buttonText2: item?.value,
            })
          )
        );
        form.setFieldsValue({
          buttonText2: item?.value,
        });
      }
    });
  };

  const setInitialStateBtn1 = () => {
    dispatch(
      uploadTemplateForm(
        Object.assign(templateField, {
          buttonText1: '',
        })
      )
    );
    form.setFieldsValue({
      buttonText1: '',
    });
  };
  const setInitialStateBtn2 = () => {
    dispatch(
      uploadTemplateForm(
        Object.assign(templateField, {
          buttonText2: '',
        })
      )
    );
    form.setFieldsValue({
      buttonText2: '',
    });
  };
  const setInitialStateBtn3 = () => {
    dispatch(
      uploadTemplateForm(
        Object.assign(templateField, {
          buttonMarketing: '',
        })
      )
    );
    form.setFieldsValue({
      buttonMarketing: '',
    });
  };

  const addList = () => {
    if (activeIndex?.length < 3) {
      let arr = [];
      if (activeIndex?.length === 1) {
        arr.push(...activeIndex, { index: 2, dropDown: 'Custom', value: '' });
      } else if (activeIndex?.length === 2) {
        arr.push(...activeIndex, { index: 3, dropDown: 'Custom', value: '' });
      }
      let capturedState;
      const data = arr?.filter(item => item?.dropDown == 'Marketing opt-out');

      if (data?.length > 0) {
        let filteredData = moveObjectToEnd(arr, data[0]);
        const linedArray = filteredData?.map((list, ind) => {
          return { ...list, index: ind + 1 };
        });
        capturedState = linedArray;
        setActiveIndex(linedArray);
      } else {
        const linedArray = arr?.map((list, ind) => {
          return { ...list, index: ind + 1 };
        });
        capturedState = linedArray;
        setActiveIndex(linedArray);
      }
      arrangingState(capturedState);
      capturedState?.map(item => {
        if (item?.index === 3) {
          if (item?.dropDown === 'Marketing opt-out') {
            dispatch(
              uploadTemplateForm(
                Object.assign(templateField, {
                  buttonMarketing: 'Stop promotions',
                })
              )
            );
            form.setFieldsValue({
              buttonMarketing: 'Stop promotions',
            });
          } else {
            dispatch(
              uploadTemplateForm(
                Object.assign(templateField, {
                  buttonMarketing: item?.value,
                })
              )
            );
            form.setFieldsValue({
              buttonMarketing: item?.value,
            });
          }
        }
      });
    }
  };
  const subtractList = Value => {
    activeIndex?.length > 1 &&
      setActiveIndex(prev => {
        const filteredValues = prev?.filter(item => item.index !== Value.index);
        // const newState = filteredValues?.map((list, ind) => {
        //   return { ...list, index: ind + 1 };
        // });
        return filteredValues;
      });
    if (Value.index === 1) {
      setInitialStateBtn1();
    } else if (Value.index === 2) {
      setInitialStateBtn2();
    } else if (Value.index === 3) {
      setInitialStateBtn3();
    }
    if (Value.dropDown === 'Marketing opt-out') {
      setInitialStateBtn3();
    }
  };

  const inputValue = (val, currentIndex) => {
    setActiveIndex(prev => {
      const filteredValues = prev?.map(item => {
        if (currentIndex === item.index) {
          return { ...item, value: val };
        } else {
          return { ...item };
        }
      });
      return filteredValues;
    });
    if (currentIndex === 1) {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            buttonText1: val,
          })
        )
      );
    } else if (currentIndex === 2) {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            buttonText2: val,
          })
        )
      );
    } else if (currentIndex === 3) {
      dispatch(
        uploadTemplateForm(
          Object.assign(templateField, {
            buttonMarketing: val,
          })
        )
      );
    }
  };

  const validateFieldText1 = (_, value) => {
    if (activeIndex?.length === 3) {
      if (value === buttonText2 && value === buttonMarketing) {
        return Promise.reject('values should not be the same');
      } else if (value === buttonText2) {
        return Promise.reject('values should not be the same');
      } else if (buttonMarketing === value) {
        return Promise.reject('values should not be the same');
      }
      return Promise.resolve();
    } else if (activeIndex?.length === 2) {
      if (value === buttonText2) {
        return Promise.reject('values should not be the same');
      }
      if (value === buttonMarketing) {
        return Promise.reject('values should not be the same');
      }
      return Promise.resolve();
    }
  };
  const validateFieldText2 = (_, value) => {
    if (activeIndex?.length === 3) {
      if (value === buttonText1 && value === buttonMarketing) {
        return Promise.reject('values should not be the same');
      } else if (value === buttonText1) {
        return Promise.reject('values should not be the same');
      } else if (buttonMarketing === value) {
        return Promise.reject('values should not be the same');
      }
      return Promise.resolve();
    } else if (activeIndex?.length === 2) {
      if (value === buttonText1) {
        return Promise.reject('values should not be the same');
      }
      if (value === buttonMarketing) {
        return Promise.reject('values should not be the same');
      }
      return Promise.resolve();
    }
  };
  const validateFieldText3 = (_, value) => {
    if (activeIndex?.length === 3) {
      if (value === buttonText2 && value === buttonText1) {
        return Promise.reject('values should not be the same');
      } else if (value === buttonText2) {
        return Promise.reject('values should not be the same');
      } else if (buttonText1 === value) {
        return Promise.reject('values should not be the same');
      }
      return Promise.resolve();
    } else if (activeIndex?.length === 2) {
      if (value === buttonText2) {
        return Promise.reject('values should not be the same');
      }
      if (value === buttonText1) {
        return Promise.reject('values should not be the same');
      }
      return Promise.resolve();
    }
  };

  return (
    <>
      {activeIndex?.map((item, ind) => (
        <span key={item?.index}>
          <T.ButtonRow>
            {templateCategory === 'UTILITY' ||
            (editTemplate?.status === 'APPROVED' &&
              buttonMarketing !== 'Stop promotions') ? (
              <div className="customButton">Custom</div>
            ) : (
              <T.QuickReplySelectTag
                placeholder="Marketing Opt-out"
                name="Marketing_opt-out"
                value={item?.dropDown}
                onChange={val => settingDropdown(val, item?.index)}
                //   disabled={type === 'EDIT'}
              >
                <Select.Option key="0" value="Custom">
                  Custom
                </Select.Option>
                <Select.Option
                  key="1"
                  value="Marketing opt-out"
                  disabled={
                    item?.dropDown === 'Marketing opt-out'
                      ? false
                      : marketingIn
                      ? true
                      : false
                  }
                >
                  Marketing opt-out
                </Select.Option>
              </T.QuickReplySelectTag>
            )}

            {item?.dropDown === 'Custom' ? (
              <>
                {item?.index === 1 && (
                  <Form.Item
                    name="buttonText1"
                    rules={[
                      {
                        required: true,
                        message: 'value must be given',
                      },
                      {
                        whitespace: true,
                        message: 'value cannot be whitespace only',
                      },
                      { validator: validateFieldText1 },
                    ]}
                  >
                    <T.QuickReplyInput
                      placeholder="Button Text 1"
                      value={buttonText1}
                      onChange={e => inputValue(e.target.value, item?.index)}
                      maxLength={25}
                      showCount
                    />
                  </Form.Item>
                )}
                {item?.index === 2 && (
                  <Form.Item
                    name="buttonText2"
                    rules={[
                      {
                        required: true,
                        message: 'value must be given',
                      },
                      {
                        whitespace: true,
                        message: 'value cannot be whitespace only',
                      },
                      { validator: validateFieldText2 },
                    ]}
                  >
                    <T.QuickReplyInput
                      placeholder="Button Text 2"
                      value={buttonText2}
                      onChange={e => inputValue(e.target.value, item?.index)}
                      maxLength={25}
                      showCount
                    />
                  </Form.Item>
                )}
                {item?.index === 3 && (
                  <Form.Item
                    name="buttonMarketing"
                    rules={[
                      {
                        required: true,
                        message: 'value must be given',
                      },
                      {
                        whitespace: true,
                        message: 'value cannot be whitespace only',
                      },
                      { validator: validateFieldText3 },
                    ]}
                  >
                    <T.QuickReplyInput
                      placeholder={`Button Text ${activeIndex?.length}`}
                      value={buttonMarketing}
                      onChange={e => inputValue(e.target.value, item?.index)}
                      maxLength={25}
                      showCount
                    />
                  </Form.Item>
                )}
              </>
            ) : templateCategory === 'UTILITY' ||
              (editTemplate?.status === 'APPROVED' &&
                buttonMarketing !== 'Stop promotions') ? (
              <Form.Item
                name="buttonMarketing"
                rules={[
                  {
                    required: true,
                    message: 'value must be given',
                  },
                  {
                    whitespace: true,
                    message: 'value cannot be whitespace only',
                  },
                  { validator: validateFieldText3 },
                ]}
              >
                <T.QuickReplyInput
                  placeholder={`Button Text ${activeIndex?.length}`}
                  value={buttonMarketing}
                  onChange={e => inputValue(e.target.value, item?.index)}
                  maxLength={25}
                  showCount
                />
              </Form.Item>
            ) : (
              <Form.Item>
                <T.QuickReplyInput
                  className="Stop_promotions"
                  value="Stop promotions"
                  disabled
                />
              </Form.Item>
            )}

            {activeIndex?.length > 1 && (
              <img
                src={minus}
                className="buttonIcon"
                alt="minus"
                onClick={() => subtractList(item)}
              />
            )}
            {activeIndex?.length < 3 && (
              <img
                src={add}
                className="buttonIcon"
                alt="add"
                onClick={() => addList()}
              />
            )}
          </T.ButtonRow>
        </span>
      ))}
    </>
  );
}

export default QuickReply;
