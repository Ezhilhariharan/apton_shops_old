import {
  Divider,
  Form,
  Radio,
  Select,
  Tooltip,
  message,
  Button,
  Modal,
  Spin,
} from 'antd';
import React, { memo, useEffect, useState, useRef } from 'react';
import { CreateTemplateModal } from './NewTemplatePopup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { createTemplatePopup } from '../../actions';
import TemplateHeader from './TemplatePopupHeader';
import WatsupTemplateHeader from './WatsupTemplatePopupHeader';
import WatsupTemplateBody from './WatsupTemplateBody';
import WatsupTemplateFooter from './WatsupTemplateFooter';
import WatsupTemplateButton from './WatsupTemplateButton';
import AddSample from './AddSample';
import WatsupViewTemplate from './WatsupViewTemplate';
import Flex from '@components/common/Flex';
import * as T from './CreateTemplateForm.styles';
import styled from 'styled-components';
import {
  uploadLocalFile,
  uploadTemplateForm,
  uploadFile,
  createWhatsappTemplate,
  updateHeaderVariable,
  updateEditTemplate,
  discardEditChanges,
  updateTemplateCategory,
} from '../../actions';
import { LoadingOutlined } from '@ant-design/icons';

const TextStyle = styled('div')`
  font-weight: 700;
  font-size: 17px;
  line-height: 19px;
  color: #4d4d4d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const Wrapper = styled('div')`
  .ant-divider-horizontal {
    margin: 15px 0px;
  }
  .Cancel {
    color: #999999;
    margin-right: 15px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #999999;
  }
  .Create {
    color: white;
    border-radius: 5px;
    background-color: #4aacea;
  }
  .fotter {
    height: 20px;
  }
`;
const PostButton = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  .infoText {
    color: #999999;
    font-size: 12px;
    margin-top: 7px;
    display: flex;
    margin-right: 20px;
  }
`;

export const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
export const antIconWhite = (
  <LoadingOutlined style={{ fontSize: 20, color: 'white' }} spin />
);

function CreateTemplate() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const TemplateHeaderRef = useRef(null);
  const TemplateButtonRef = useRef(null);
  const [saveDraft, setSaveDraft] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateTemplate = useSelector(
    state => state.whatsappTemplate.createTemplatePopup,
    shallowEqual
  );
  const header = useSelector(
    state => state?.whatsappTemplate?.templateField?.header,
    shallowEqual
  );
  const bodyText = useSelector(
    state => state?.whatsappTemplate?.templateField?.body,
    shallowEqual
  );
  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );
  const radioValue = useSelector(
    state => state?.whatsappTemplate?.headerRadioValue,
    shallowEqual
  );
  const uploadedFile = useSelector(
    state => state?.whatsappTemplate?.uploadedFile,
    shallowEqual
  );
  const headerVariable = useSelector(
    state => state?.whatsappTemplate?.headerVariable,
    shallowEqual
  );
  const bodyVariable = useSelector(
    state => state?.whatsappTemplate?.bodyVariable,
    shallowEqual
  );
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const linkType = useSelector(
    state => state?.whatsappTemplate?.templateField?.linkType,
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
  const loading = useSelector(
    state => state?.whatsappTemplate?.loading,
    shallowEqual
  );

  useEffect(() => {
    updateEditData();
  }, [editTemplate]);

  const updateEditData = () => {
    if (editTemplate?.name) {
      form.setFieldsValue({
        templateName: editTemplate?.name,
        language: editTemplate?.language,
        category: editTemplate?.category,
      });
      dispatch(
        updateTemplateCategory(
          editTemplate?.category === 'UTILITY' ? 'UTILITY' : ''
        )
      );
      let localHeaderVariable;
      editTemplate?.components?.map(editData => {
        if (editData?.type === 'HEADER') {
          form.setFieldsValue({
            headerTextRadio:
              editData?.format === 'DOCUMENT'
                ? 'Document'
                : editData?.format === 'IMAGE'
                ? 'Image'
                : editData?.format === 'VIDEO'
                ? 'Video'
                : editData?.format === 'TEXT'
                ? 'Text'
                : 'None',
            // addButtonRadio: 'None',
          });
          if (
            TemplateHeaderRef.current &&
            TemplateHeaderRef.current.setHeaderType
          ) {
            editData?.format === 'DOCUMENT'
              ? TemplateHeaderRef.current.setHeaderType('Document')
              : editData?.format === 'IMAGE'
              ? TemplateHeaderRef.current.setHeaderType('Image')
              : editData?.format === 'VIDEO'
              ? TemplateHeaderRef.current.setHeaderType('Video')
              : editData?.format === 'TEXT'
              ? TemplateHeaderRef.current.setHeaderType('Text')
              : TemplateHeaderRef.current.setHeaderType('None');
          }

          if (editData?.format === 'TEXT') {
            const regex = /{{(.*?)}}/g;
            let text =
              editData?.example?.header_text?.length > 0 &&
              editData?.text?.toString().toLowerCase().match(regex);

            if (text && text?.length > 0) {
              dispatch(updateHeaderVariable(text));
              localHeaderVariable = text;

              form.setFieldsValue({
                headerData: editData?.example?.header_text,
              });
            }

            dispatch(
              uploadTemplateForm(
                Object.assign(templateField, {
                  header: editData?.text,
                })
              )
            );
            form.setFieldsValue({
              headerText: editData?.text,
            });
          } else {
            editData?.example?.header_handle?.length > 0 &&
              dispatch(uploadLocalFile(editData?.example?.header_handle[0]));
            editData?.example?.header_handle?.length > 0 &&
              dispatch(uploadFile(editData?.example?.header_handle[0]));
          }
        } else if (editData?.type === 'BODY') {
          dispatch(
            uploadTemplateForm(
              Object.assign(templateField, {
                body: editData?.text,
              })
            )
          );
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

          let avoidDuplicate = receivedData?.filter(
            (item, index) => receivedData?.indexOf(item) === index
          );

          const convertedData = avoidDuplicate?.map((fieldName, index) => {
            const fieldValues = values[index];
            return { fieldName, fieldValues };
          });

          convertedData?.map(data => {
            if (
              (localHeaderVariable?.length > 0 &&
                data?.fieldName !== localHeaderVariable[0]) ||
              localHeaderVariable === undefined
            ) {
              let trimmedData = data?.fieldName?.replace(/{{(.*?)}}/, '$1');
              let field = `body_${trimmedData}`;
              form.setFieldsValue({
                [field]: data?.fieldValues,
              });
            }
          });

          form.setFieldsValue({
            templateMessage: editData?.text,
          });
        } else if (editData?.type === 'FOOTER') {
          dispatch(
            uploadTemplateForm(
              Object.assign(templateField, {
                footer: editData?.text,
              })
            )
          );
          form.setFieldsValue({
            footerText: editData?.text,
          });
        } else if (editData?.type === 'BUTTONS') {
          let buttons_item =
            editData?.buttons?.length > 0 ? editData?.buttons[0] : 'None';
          form.setFieldsValue({
            addButtonRadio:
              buttons_item?.type === 'QUICK_REPLY'
                ? 'Quick_reply'
                : 'Call_to_action',
          });
          if (
            TemplateButtonRef.current &&
            TemplateButtonRef.current.setActiveValue
          ) {
            if (buttons_item?.type === 'QUICK_REPLY') {
              TemplateButtonRef.current.setActiveValue('Quick_reply');
            } else {
              TemplateButtonRef.current.setActiveValue('Call_to_action');
            }
          }
          if (buttons_item?.type === 'QUICK_REPLY') {
            if (editData?.buttons?.length === 1) {
              dispatch(
                uploadTemplateForm(
                  Object.assign(
                    templateField,
                    editData?.buttons[0]?.text && {
                      buttonText1: editData?.buttons[0]?.text,
                    }
                  )
                )
              );
              form.setFieldsValue({
                buttonText1: editData?.buttons[0]?.text
                  ? editData?.buttons[0]?.text
                  : '',
              });
            } else if (editData?.buttons?.length === 2) {
              dispatch(
                uploadTemplateForm(
                  Object.assign(
                    templateField,
                    editData?.buttons[0]?.text && {
                      buttonText1: editData?.buttons[0]?.text,
                    },
                    editData?.buttons[1]?.text && {
                      buttonText2: editData?.buttons[1]?.text,
                    }
                  )
                )
              );
              form.setFieldsValue({
                buttonText1: editData?.buttons[0]?.text
                  ? editData?.buttons[0]?.text
                  : '',
                buttonText2: editData?.buttons[1]?.text
                  ? editData?.buttons[1]?.text
                  : '',
              });
            } else if (editData?.buttons?.length === 3) {
              dispatch(
                uploadTemplateForm(
                  Object.assign(
                    templateField,
                    editData?.buttons[0]?.text && {
                      buttonText1: editData?.buttons[0]?.text,
                    },
                    editData?.buttons[1]?.text && {
                      buttonText2: editData?.buttons[1]?.text,
                    },
                    editData?.buttons[2]?.text && {
                      buttonMarketing: editData?.buttons[2]?.text,
                    }
                  )
                )
              );
              form.setFieldsValue({
                buttonText1: editData?.buttons[0]?.text
                  ? editData?.buttons[0]?.text
                  : '',
                buttonText2: editData?.buttons[1]?.text
                  ? editData?.buttons[1]?.text
                  : '',
                buttonMarketing: editData?.buttons[2]?.text
                  ? editData?.buttons[2]?.text
                  : '',
              });
            }
          } else {
            if (editData?.buttons?.length === 2) {
              dispatch(
                uploadTemplateForm(
                  Object.assign(templateField, {
                    website_filed_checkbox: true,
                    phone_field_checkbox: true,
                  })
                )
              );
              form.setFieldsValue({
                website_filed_checkbox: true,
                phone_field_checkbox: true,
              });
            } else {
              let buttonType = editData?.buttons[0]?.type;
              if (buttonType === 'URL') {
                dispatch(
                  uploadTemplateForm(
                    Object.assign(templateField, {
                      website_filed_checkbox: true,
                      phone_field_checkbox: false,
                    })
                  )
                );
                form.setFieldsValue({
                  website_filed_checkbox: true,
                  phone_field_checkbox: false,
                });
              } else {
                dispatch(
                  uploadTemplateForm(
                    Object.assign(templateField, {
                      phone_field_checkbox: true,
                      website_filed_checkbox: false,
                    })
                  )
                );
                form.setFieldsValue({
                  phone_field_checkbox: true,
                  website_filed_checkbox: false,
                });
              }
            }
            editData?.buttons?.map(item => {
              if (item?.type === 'URL') {
                dispatch(
                  uploadTemplateForm(
                    Object.assign(
                      templateField,
                      {
                        linkName: item?.text,
                        link: item?.url,
                        website_filed_checkbox: true,
                      },
                      item?.example?.length > 0 && {
                        add_sample_url: item?.example[0],
                      },
                      item?.example?.length > 0
                        ? { linkType: 'Dynamic' }
                        : {
                            linkType: 'Static',
                          }
                    )
                  )
                );
                form.setFieldsValue({
                  linkType: item?.example?.length > 0 ? 'Dynamic' : 'Static',
                  web_button_name: item?.text,
                  link: item?.url,
                  add_sample_url:
                    item?.example?.length > 0 ? item?.example[0] : '',
                  website_filed_checkbox: true,
                });
              } else if (item?.type === 'PHONE_NUMBER') {
                let number = item?.phone_number?.slice(0, 3);
                let trimmedNumber;
                if (number === '+91') {
                  trimmedNumber = item?.phone_number?.slice(3);
                } else {
                  trimmedNumber = item?.phone_number?.slice(2);
                }
                dispatch(
                  uploadTemplateForm(
                    Object.assign(templateField, {
                      phoneName: item?.text,
                      phoneNumber: trimmedNumber,
                      phoneCountryCode: number === '+91' ? '+91' : '+1',
                      phone_field_checkbox: true,
                    })
                  )
                );
                form.setFieldsValue({
                  phone_button_name: item?.text,
                  phoneNumber: trimmedNumber,
                  phone_field_checkbox: true,
                });
              }
            });
          }

          // });
        }
      });
    }
  };

  const onFinish = values => {
    let getBodyVariableValues = [];
    let getFormVariableValues = [];

    bodyVariable?.map(parent => {
      Object.entries(values)?.map(([key, value]) => {
        if (key?.slice(0, 5) === 'body_') {
          if (parent === `{{${key?.slice(5)}}}`) {
            getFormVariableValues.push({ key: parent, val: value });
          }
        }
      });
    });
    if (headerVariable?.length > 0) {
      bodyVariable?.map(parent => {
        if (parent === headerVariable[0]) {
          getBodyVariableValues.push(values?.headerData);
        } else {
          getFormVariableValues?.map(child => {
            if (parent === child?.key) {
              getBodyVariableValues.push(child?.val);
            }
          });
        }
      });
    } else {
      getFormVariableValues?.map(child => {
        getBodyVariableValues.push(child?.val);
      });
    }

    let addObj = [];
    let addCallToAction = [];
    let addQuickReply = [];

    templateField?.buttonText1 &&
      addQuickReply.push({
        type: 'QUICK_REPLY',
        text: templateField?.buttonText1,
      }),
      templateField?.buttonText2 &&
        addQuickReply.push({
          type: 'QUICK_REPLY',
          text: templateField?.buttonText2,
        }),
      templateField?.buttonMarketing &&
        addQuickReply.push({
          type: 'QUICK_REPLY',
          text: templateField?.buttonMarketing,
        });
    templateField?.phone_field_checkbox &&
      templateField?.phoneName &&
      templateField?.phoneCountryCode &&
      templateField?.phoneNumber &&
      addCallToAction.push({
        type: 'PHONE_NUMBER',
        text: templateField?.phoneName,
        phone_number:
          templateField?.phoneCountryCode + templateField?.phoneNumber,
      });

    const dynamicButton = Object.assign(
      {},
      templateField?.add_sample_url && {
        example: templateField?.add_sample_url,
      }
    );
    templateField?.website_filed_checkbox &&
      templateField?.link &&
      templateField?.linkName &&
      dynamicButton.hasOwnProperty('example') &&
      addCallToAction.push({
        type: 'URL',
        text: templateField?.linkName,
        url: templateField?.link,
        example: [templateField?.add_sample_url],
      }),
      templateField?.website_filed_checkbox &&
        templateField?.link &&
        templateField?.linkName &&
        dynamicButton.hasOwnProperty('example') === false &&
        addCallToAction.push({
          type: 'URL',
          text: templateField?.linkName,
          url: templateField?.link,
        }),
      radioValue === 'Text' &&
        headerVariable?.length > 0 &&
        addObj.push({
          type: 'HEADER',
          format: 'TEXT',
          text: header,
          example: {
            header_text: [values?.headerData],
          },
        });
    radioValue === 'Text' &&
      headerVariable?.length === 0 &&
      addObj.push({
        type: 'HEADER',
        format: 'TEXT',
        text: header,
      });
    radioValue === 'Image' &&
      uploadedFile &&
      addObj.push({
        type: 'HEADER',
        format: 'IMAGE',
        example: {
          header_handle: [uploadedFile],
        },
      });
    radioValue === 'Video' &&
      uploadedFile &&
      addObj.push({
        type: 'HEADER',
        format: 'VIDEO',
        example: {
          header_handle: [uploadedFile],
        },
      });
    radioValue === 'Document' &&
      uploadedFile &&
      addObj.push({
        type: 'HEADER',
        format: 'DOCUMENT',
        example: {
          header_handle: [uploadedFile],
        },
      });
    const dynamicBodyVariable = Object.assign(
      {},
      getBodyVariableValues?.length > 0 && {
        example: {
          body_text: [[getBodyVariableValues.join()]],
        },
      }
    );
    bodyText &&
      dynamicBodyVariable.hasOwnProperty('example') === true &&
      addObj.push({
        type: 'BODY',
        text: bodyText,
        example: {
          body_text: [getBodyVariableValues],
        },
      });
    bodyText &&
      dynamicBodyVariable.hasOwnProperty('example') === false &&
      addObj.push({
        type: 'BODY',
        text: bodyText,
      });
    values?.footerText &&
      addObj.push({
        type: 'FOOTER',
        text: values?.footerText,
      });
    templateField?.addButtonValue === 'Quick_reply' &&
      addObj.push({
        type: 'BUTTONS',
        buttons: addQuickReply,
      });
    templateField?.addButtonValue === 'Call_to_action' &&
      addObj.push({
        type: 'BUTTONS',
        buttons: addCallToAction,
      });

    const body = {
      account_id: brand?.account_id,
      brand_id: brand?.id,
      template_name: values?.templateName,
      save_as_draft: saveDraft,
      language: values?.language,
      category: values?.category,
      components: addObj,
    };
    const originalBody = Object.assign(
      body,
      editTemplate?.name && { template_id: editTemplate?.id }
    );
    // console.log(originalBody);
    dispatch(createWhatsappTemplate(originalBody, onCanceled));
  };

  const resetAllStates = () => {
    form.resetFields();
    dispatch(uploadLocalFile(''));
    dispatch(uploadFile(''));
    dispatch(
      uploadTemplateForm(
        Object.assign(
          {},
          {
            header: '',
            body: '',
            footer: '',
            buttonText1: '',
            buttonText2: '',
            buttonMarketing: '',
            linkType: '',
            linkName: '',
            link: '',
            phoneName: '',
            phoneNumber: '',
            phoneCountryCode: '+91',
            website_filed_checkbox: true,
            add_sample_url: '',
            phone_field_checkbox: false,
            addButtonValue: null,
          }
        )
      )
    );
    form.setFieldsValue({
      headerTextRadio: 'None',
      addButtonRadio: 'None',
    });

    if (TemplateHeaderRef.current && TemplateHeaderRef.current.setHeaderType) {
      TemplateHeaderRef.current.setHeaderType();
    }
    if (TemplateButtonRef.current && TemplateButtonRef.current.setActiveValue) {
      TemplateButtonRef.current.setActiveValue();
    }
  };
  const onCanceled = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(createTemplatePopup(false));
    }, 100);
    dispatch(updateEditTemplate({}));
    resetAllStates();
  };
  const onPopupCancel = () => {
    if (editTemplate?.name) {
      setIsModalOpen(true);
    } else {
      onCanceled();
    }
  };
  return (
    <CreateTemplateModal
      open={openCreateTemplate}
      onCancel={() => {
        // setCreateTemplate(false);
        onPopupCancel();
        // removeSingleTemplateOnEdit();
      }}
      footer={null}
      centered
    >
      <T.Heading>
        {editTemplate?.name
          ? 'Edit Template Message'
          : 'Create Template Message'}
      </T.Heading>
      <Divider />
      <Form
        onFinish={onFinish}
        form={form}
        className={{ width: '100%' }}
        autoComplete="off"
      >
        <TemplateHeader form={form} />
        <Divider className="divider" />
        <div className="main">
          <div className="left">
            <WatsupTemplateHeader form={form} ref={TemplateHeaderRef} />
            <WatsupTemplateBody form={form} />
            <WatsupTemplateFooter />
            <WatsupTemplateButton ref={TemplateButtonRef} form={form} />
            {(headerVariable?.length > 0 ||
              bodyVariable?.length > 0 ||
              linkType === 'Dynamic') && <AddSample form={form} />}
            <Flex flexEnd style={{ marginTop: '1rem', paddingBottom: '1rem' }}>
              {editTemplate?.status !== 'APPROVED' && (
                <T.AddVariable
                  onClick={() => setSaveDraft(true)}
                  htmlType="submit"
                >
                  {loading ? (
                    <Spin indicator={antIcon} style={{ margin: 'auto' }} />
                  ) : (
                    'Save as draft'
                  )}
                </T.AddVariable>
              )}

              <T.SubmitButton
                htmlType="submit"
                onClick={() => {
                  setSaveDraft(false);
                }}
              >
                {loading ? (
                  <Spin indicator={antIconWhite} style={{ margin: 'auto' }} />
                ) : editTemplate?.status === 'APPROVED' ? (
                  'Update & Submit'
                ) : (
                  'Save & Submit'
                )}
              </T.SubmitButton>
            </Flex>
          </div>
          <div className="right">
            <WatsupViewTemplate />
          </div>
        </div>
      </Form>
      <Modal
        open={isModalOpen}
        onCancel={e => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
        footer={null}
        centered
      >
        <Wrapper>
          <TextStyle>Do you want to discard your changes?</TextStyle>
          <PostButton>
            <Button
              type="primary"
              className="Cancel"
              onClick={() => {
                setIsModalOpen(false);
                dispatch(discardEditChanges(!discardChanges));
                updateEditData();
              }}
            >
              Discard
            </Button>
            <Button type="primary" onClick={() => onCanceled()}>
              Close
            </Button>
          </PostButton>
          <div className="fotter"></div>
        </Wrapper>
      </Modal>
    </CreateTemplateModal>
  );
}

export default CreateTemplate;
