import { Divider, Form, Radio, Select, Tooltip, message } from 'antd';
import React, { memo, useEffect, useState, useRef } from 'react';
import Flex from '@components/common/Flex';
import * as T from './CreateTemplateForm.styles';
import Bin from '../../../../../components/icons/Bin';
import DynamicFileUpload from './DynamicFileUpload';
import { shallowEqual, useSelector } from 'react-redux';
import { CreateTemplateModal } from './NewTemplatePopup';
import documentImage from '@assets/images/documentImage.svg';
import LinkArrowIcon from '../../../../../components/icons/LinkArrowIcon';
import CallLinkIcon from '../../../../../components/icons/CallLinkIcon';
import AddVariableModal from './AddVariableModal';
import moment from 'moment';
const CreateTemplateForm = ({
  setCreateTemplate,
  createWhatsappTemplate,
  brands,
  setOpen,
  mediaUpload,
  mediaUrl,
  type,
  editWhatsappTemplate,
  getFileLocalPath,
  openCreateTemplate,
  removeSingleTemplateOnEdit,
  updateMediaUrl,
  updateImageLocalPath,
  setPageNumber,
  setSelelctedCategory,
  setSearch,
  setFilterByStatus,
}) => {
  const [form] = Form.useForm();
  const [openSample, setOpenSample] = useState(false);
  const [sampleValueArray, setSampleArray] = useState([]);
  const singleTemplate = useSelector(
    state => state.whatsappTemplate.singleTemplate,
    shallowEqual
  );
  const [mediaDetails, setMediaDetails] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [selectedMedia, setMedia] = useState('None');
  const [displayImage, setDisplayImage] = useState();
  const [headerText, setHeaderText] = useState('');
  //  test area
  const [variableCount, setVariableCount] = useState(1);
  const textareaRef = useRef(null);

  const [textBody, setTextBody] = useState('');
  const [addVariable, setVariable] = useState([]);
  const [footerText, setFooterText] = useState('');

  const findDefaultImage =
    singleTemplate?.components?.filter(data => data.type === 'HEADER')[0]
      ?.example?.header_handle[0] ||
    (singleTemplate?.meta_data ? singleTemplate?.meta_data[0] : '');
  const fileFinalUrl = useSelector(
    state => state.whatsappTemplate.mediaUrl,
    shallowEqual
  );
  const fileLocalPath = useSelector(
    state => state.whatsappTemplate.localPath,
    shallowEqual
  );

  const [selectButtons, setButtons] = useState('None');
  const [arrayOfButtons, setArrayOfButtons] = useState([0]);
  const [callToAction, setCallToAction] = useState([0, 1]);
  const [selectedAction, setSelectedAction] = useState('Cell Phone');
  const [secondAction, setSecondAction] = useState('Visit Website');
  const [selectCategory, setCategory] = useState('');
  const [selectLanguage, setLanguage] = useState('');
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const radioOptions = [
    { label: 'Image', value: 'image' },
    // { label: "Video", value: "video" },
    { label: 'Document', value: 'document' },
  ];
  const [quickAction, setQuickAction] = useState({
    buttonText0: '',
    buttonText1: '',
    buttonText2: '',
  });
  const [multipleInputSetOne, setSetOne] = useState({
    webButtonText: '',
    phoneButtonText: '',
    phoneNumber: '',
    webUrl: '',
    templateName: '',
    imageVideoDocument: '',
  });
  const [multipleInputSetTwo, setSetTwo] = useState({
    webSecondText: '',
    phoneSecondText: '',
    phoneNumberSecond: '',
  });

  const computeDefaultValues = () => {
    const componentsArray = singleTemplate?.components
      ? singleTemplate?.components
      : singleTemplate?.component_body;
    const fileFormat =
      singleTemplate?.meta_data &&
      singleTemplate?.meta_data[0]?.substring(
        singleTemplate?.meta_data[0]?.lastIndexOf('.') + 1
      );
    const findFormat = componentsArray?.filter(
      data => data.type === 'HEADER'
    )[0]?.format;
    const findCallToActionQuickAction =
      componentsArray?.filter(data => data.type === 'BUTTONS')[0]?.buttons[0]
        ?.type === 'QUICK_REPLY'
        ? 'Quick reply'
        : componentsArray
            ?.filter(data => data.type === 'BUTTONS')[0]
            ?.buttons?.filter(
              d => d.type === 'PHONE_NUMBER' || d.type === 'URL'
            ) && 'Call to action';
    const filterHeader = componentsArray?.filter(
      data => data.type === 'HEADER'
    );
    const findTextMedia =
      filterHeader && filterHeader[0]?.format === 'TEXT'
        ? 'Text'
        : (filterHeader && filterHeader[0]?.format === 'VIDEO') ||
          (filterHeader && filterHeader[0]?.format === 'IMAGE') ||
          (filterHeader && filterHeader[0]?.format === 'DOCUMENT') ||
          fileFormat === ('jpeg' || 'jpg' || 'png') ||
          fileFormat === 'mp4' ||
          fileFormat === 'pdf'
        ? 'Media'
        : 'None';
    const numberOfQuickAction = componentsArray
      ?.filter(data => data.type === 'BUTTONS')[0]
      ?.buttons?.filter(q => q.type === 'QUICK_REPLY')?.length;
    let t = [];
    for (let i = 0; i < numberOfQuickAction; i++) {
      t[i] = i;
      setArrayOfButtons(t);
    }
    form.setFieldsValue({
      templateName:
        type === 'EDIT' || type === 'DRAFT' ? singleTemplate?.name : '',
      templateMessage: componentsArray?.filter(data => data.type === 'BODY')[0]
        ?.text,
      headerText: componentsArray?.filter(
        data => data.type === 'HEADER' && data.format === 'TEXT'
      )[0]?.text
        ? componentsArray?.filter(
            data => data.type === 'HEADER' && data.format === 'TEXT'
          )[0]?.text
        : '',
      footerText: componentsArray?.filter(data => data.type === 'FOOTER')[0]
        ?.text
        ? componentsArray?.filter(data => data.type === 'FOOTER')[0]?.text
        : '',
      category: singleTemplate?.category ? singleTemplate?.category : '',
      language: singleTemplate?.language ? singleTemplate?.language : '',
      selectButtons: findCallToActionQuickAction,
      phoneButtonText: componentsArray
        ?.filter(data => data.type === 'BUTTONS')[0]
        ?.buttons?.filter(d => d.type === 'PHONE_NUMBER')[0]?.text,
      phoneNumber: componentsArray
        ?.filter(data => data.type === 'BUTTONS')[0]
        ?.buttons?.filter(d => d.type === 'PHONE_NUMBER')[0]?.phone_number,
      media: findTextMedia,
      imageVideoDocument:
        findFormat === 'IMAGE' || fileFormat === ('jpeg' || 'jpg' || 'png')
          ? 'image'
          : (findFormat || fileFormat === 'mp4') === 'VIDEO'
          ? 'video'
          : 'document',
    });
    const bodyContent = componentsArray?.filter(data => data.type === 'BODY')[0]
      ?.text;
    setTextBody(bodyContent?.length > 0 ? bodyContent : '');
    setFooterText(
      componentsArray?.filter(data => data.type === 'FOOTER')[0]?.text
        ? componentsArray?.filter(data => data.type === 'FOOTER')[0]?.text
        : ''
    );
    setHeaderText(
      componentsArray?.filter(
        data => data.type === 'HEADER' && data.format === 'TEXT'
      )[0]?.text
        ? componentsArray?.filter(
            data => data.type === 'HEADER' && data.format === 'TEXT'
          )[0]?.text
        : ''
    );
    setMedia(findTextMedia);
    setCategory(singleTemplate?.category ? singleTemplate?.category : '');
    setLanguage(singleTemplate?.language ? singleTemplate?.language : '');
    setButtons(findCallToActionQuickAction);
    setSetOne({
      ...multipleInputSetOne,
      imageVideoDocument:
        findFormat === 'IMAGE' || fileFormat === ('jpeg' || 'jpg' || 'png')
          ? 'image'
          : findFormat === 'VIDEO' || fileFormat === 'mp4'
          ? 'video'
          : 'document',
      templateName:
        type === 'EDIT' || type === 'DRAFT' ? singleTemplate?.name : '',
    });
    findCallToActionQuickAction === 'Call to action' &&
      setSetOne({
        ...multipleInputSetOne,
        imageVideoDocument:
          findFormat === 'IMAGE' || fileFormat === ('jpeg' || 'jpg' || 'png')
            ? 'image'
            : findFormat === 'VIDEO' || fileFormat === 'mp4'
            ? 'video'
            : 'document',
        phoneButtonText: componentsArray
          ?.filter(data => data.type === 'BUTTONS')[0]
          ?.buttons?.filter(d => d.type === 'PHONE_NUMBER')[0]?.text,
        phoneNumber: componentsArray
          ?.filter(data => data.type === 'BUTTONS')[0]
          ?.buttons?.filter(d => d.type === 'PHONE_NUMBER')[0]?.phone_number,
        templateName:
          type === 'EDIT' || type === 'DRAFT' ? singleTemplate?.name : '',
      });
    const buttonsList = componentsArray?.filter(
      data => data.type === 'BUTTONS'
    )[0]?.buttons;
    findCallToActionQuickAction === 'Quick reply' &&
      (buttonsList?.length === 1
        ? setQuickAction({ ...quickAction, buttonText0: buttonsList[0]?.text })
        : buttonsList?.length === 2
        ? setQuickAction({
            ...quickAction,
            buttonText0: buttonsList[0]?.text,
            buttonText1: buttonsList[1]?.text,
          })
        : setQuickAction({
            ...quickAction,
            buttonText0: buttonsList[0]?.text,
            buttonText1: buttonsList[1]?.text,
            buttonText2: buttonsList[2]?.text,
          }));
  };
  useEffect(() => {
    if (selectedMedia === 'Media') {
      computeDefaultVariables();
    }
  }, [textBody, selectedMedia]);
  useEffect(() => {
    let result = textBody?.match(/{{([0-9]+)}}/g);
    let temp = [];
    for (let i = 0; i < result?.length; i++) {
      temp?.push(`{{${i + 1}}}`);
    }
    setVariable(temp);
    setVariableCount(temp?.length + 1);
  }, [textBody]);
  const handleReduce = () => {
    let text = textBody;
    let i = 0;
    text = text.replace(/{{\d+}}/g, function (match) {
      return addVariable[i++] || match;
    });
    setTextBody(text);
    form.setFieldsValue({
      templateMessage: text,
    });
    var tempArray = [];
    for (let i = 0; i < addVariable?.length; i++) {
      tempArray?.push(`{{${i + 1}}}`);
    }
    setVariable(tempArray);
    setVariableCount(tempArray?.length + 1);
  };
  const computeDefaultVariables = () => {
    const findVariables = textBody?.match(/{{([0-9]+)}}/g);
    let tempVariable = [];
    for (let i = 0; i < findVariables?.length; i++) {
      tempVariable.push(`{{${i + 1}}}`);
    }
    setVariable(tempVariable);
    setVariableCount(tempVariable?.length + 1);
    const componentsArray = singleTemplate?.components
      ? singleTemplate?.components
      : singleTemplate?.component_body;
    const defaultVariable = componentsArray?.filter(
      content => content?.type === 'BODY'
    )[0]?.example?.body_text[0];
    if (defaultVariable?.length === tempVariable?.length) {
      setSampleArray(defaultVariable);
    }
  };
  // const handleAddVariable = () => {
  //   const addedVariable = addVariable?.concat(`{{${variableCount}}}`);
  //   setVariableCount(variableCount + 1);
  //   setVariable(addedVariable);
  //   const addedBody = textBody + addedVariable[addedVariable?.length - 1];
  //   setTextBody(addedBody);
  //   if (addedBody?.length > 0) {
  // form.setFieldsValue({
  //   templateMessage: addedBody,
  // });
  //   }
  // };
  const handleAddVariable = () => {
    const addedVariable = addVariable?.concat(`{{${variableCount}}}`);
    const textarea = textareaRef.current;
    if (!textarea) return; // Check if textarea exists
    const { selectionStart, selectionEnd, value } = textarea;
    const variable = `{{${variableCount}}}`;
    const newText =
      textBody.slice(0, selectionStart) +
      variable +
      textBody.slice(selectionEnd);
    const addedBody = textBody + addedVariable[addedVariable?.length - 1];
    setVariableCount(variableCount + 1);
    setVariable(addedVariable);
    setTextBody(newText);
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
  };

  useEffect(() => {
    let timer = setInterval(() => {
      // let hours = new Date().getHours();
      // let minutes = new Date().getMinutes();
      // let ampm = hours >= 12 ? 'pm' : 'am';
      // hours = hours ? hours : 12;
      // minutes = minutes < 10 ? '0' + minutes : minutes;
      let time = moment().format('h:mm a');
      setCurrentTime(time);
    }, 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });

  const resetAllStates = () => {
    setQuickAction({
      buttonText0: '',
      buttonText1: '',
      buttonText2: '',
    });
    setSetOne({
      webButtonText: '',
      phoneButtonText: '',
      phoneNumber: '',
      webUrl: '',
      templateName: '',
    });
    setSetTwo({
      webSecondText: '',
      phoneSecondText: '',
      phoneNumberSecond: '',
    });
    setHeaderText('');
    setTextBody('');
    setFooterText('');
    setArrayOfButtons([0]);
    setCallToAction([0, 1]);
    setCategory('');
    setLanguage('');
    setMedia('None');
    setVariable([]);
    setButtons('None');
    setVariableCount(1);
    setSampleArray([]);
    updateMediaUrl && updateMediaUrl('');
    updateImageLocalPath && updateImageLocalPath('');
    setDisplayImage('');
    form.resetFields();
  };
  useEffect(() => {
    if (singleTemplate) {
      computeDefaultValues();
    } else {
      resetAllStates();
      form.resetFields();
    }
  }, [singleTemplate]);
  const quickArray = Object.values(quickAction);
  const quickButtons =
    quickArray[0] && quickArray[1] && quickArray[2]
      ? [
          { type: 'QUICK_REPLY', text: quickArray[0] },
          { type: 'QUICK_REPLY', text: quickArray[1] },
          { type: 'QUICK_REPLY', text: quickArray[2] },
        ]
      : !quickArray[0] && quickArray[1] && quickArray[2]
      ? [
          { type: 'QUICK_REPLY', text: quickArray[1] },
          { type: 'QUICK_REPLY', text: quickArray[2] },
        ]
      : quickArray[0] && !quickArray[1] && quickArray[2]
      ? [
          { type: 'QUICK_REPLY', text: quickArray[0] },
          { type: 'QUICK_REPLY', text: quickArray[2] },
        ]
      : quickArray[0] && quickArray[1] && !quickArray[2]
      ? [
          { type: 'QUICK_REPLY', text: quickArray[0] },
          { type: 'QUICK_REPLY', text: quickArray[1] },
        ]
      : !quickArray[0] && !quickArray[1] && quickArray[2]
      ? [{ type: 'QUICK_REPLY', text: quickArray[2] }]
      : !quickArray[0] && quickArray[1] && !quickArray[2]
      ? [{ type: 'QUICK_REPLY', text: quickArray[1] }]
      : quickArray[0] && !quickArray[1] && !quickArray[2]
      ? [{ type: 'QUICK_REPLY', text: quickArray[0] }]
      : !quickArray[0] && !quickArray[1] && !quickArray[2]
      ? []
      : null;
  const createTemplate = () => {
    const accountId = brand?.account_id;
    const brandId = brand?.id;
    const callbyQuickAction = (multipleInputSetOne?.phoneButtonText ||
      multipleInputSetTwo?.webSecondText ||
      multipleInputSetOne?.phoneNumber ||
      multipleInputSetOne?.webUrl ||
      quickArray[0] ||
      quickArray[1] ||
      quickArray[2]) && {
      type: 'BUTTONS',
      buttons:
        multipleInputSetOne?.phoneButtonText &&
        multipleInputSetTwo?.webSecondText &&
        multipleInputSetOne?.phoneNumber
          ? [
              {
                type: 'PHONE_NUMBER',
                text:
                  multipleInputSetOne?.phoneButtonText &&
                  multipleInputSetOne?.phoneButtonText,
                phone_number:
                  multipleInputSetOne?.phoneNumber &&
                  multipleInputSetOne?.phoneNumber,
              },
              {
                type: 'URL',
                text:
                  multipleInputSetTwo?.webSecondText &&
                  multipleInputSetTwo?.webSecondText,
                url: multipleInputSetOne?.webUrl && multipleInputSetOne?.webUrl,
              },
            ]
          : multipleInputSetOne?.phoneButtonText &&
            !multipleInputSetTwo?.webSecondText &&
            multipleInputSetOne?.phoneNumber
          ? [
              {
                type: 'PHONE_NUMBER',
                text:
                  multipleInputSetOne?.phoneButtonText &&
                  multipleInputSetOne?.phoneButtonText,
                phone_number:
                  multipleInputSetOne?.phoneNumber &&
                  multipleInputSetOne?.phoneNumber,
              },
            ]
          : !multipleInputSetOne?.phoneButtonText &&
            multipleInputSetTwo?.webSecondText &&
            !multipleInputSetOne?.phoneNumber
          ? [
              {
                type: 'URL',
                text:
                  multipleInputSetTwo?.webSecondText &&
                  multipleInputSetTwo?.webSecondText,
                url: multipleInputSetOne?.webUrl && multipleInputSetOne?.webUrl,
              },
            ]
          : quickButtons,
    };
    const headerComputation =
      selectedMedia === 'Text'
        ? {
            type: 'HEADER',
            format: 'TEXT',
            text: headerText && headerText,
          }
        : (fileFinalUrl || findDefaultImage) &&
          selectedMedia === 'Media' &&
          multipleInputSetOne?.imageVideoDocument === 'image'
        ? {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                fileFinalUrl ||
                  (type === 'EDIT' && findDefaultImage) ||
                  (singleTemplate?.meta_data &&
                    (singleTemplate?.meta_data[1] ||
                      singleTemplate?.meta_data[0])),
              ],
            },
          }
        : fileFinalUrl ||
          (findDefaultImage &&
            selectedMedia === 'Media' &&
            multipleInputSetOne?.imageVideoDocument === 'video')
        ? {
            type: 'HEADER',
            format: 'VIDEO',
            example: {
              header_handle: [
                fileFinalUrl ||
                  (type === 'EDIT' && findDefaultImage) ||
                  (singleTemplate?.meta_data &&
                    (singleTemplate?.meta_data[1] ||
                      singleTemplate?.meta_data[0])),
              ],
            },
          }
        : fileFinalUrl ||
          (findDefaultImage &&
            selectedMedia === 'Media' &&
            multipleInputSetOne?.imageVideoDocument === 'document')
        ? {
            type: 'HEADER',
            format: 'DOCUMENT',
            example: {
              header_handle: [
                fileFinalUrl ||
                  (type === 'EDIT' && findDefaultImage) ||
                  (singleTemplate?.meta_data &&
                    (singleTemplate?.meta_data[1] ||
                      singleTemplate?.meta_data[0])),
              ],
            },
          }
        : '';

    const templateDetails = {
      account_id: accountId,
      brand_id: brandId,
      template_id:
        type === 'EDIT' && singleTemplate?.id && parseInt(singleTemplate?.id),
      template: {
        name:
          multipleInputSetOne?.templateName &&
          nameFormat(multipleInputSetOne?.templateName),
        language: selectLanguage,
        category: selectCategory,
        components:
          headerComputation && footerText && callbyQuickAction
            ? [
                headerComputation,
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
                callbyQuickAction,
              ]
            : headerComputation && !footerText && callbyQuickAction
            ? [
                headerComputation,
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                callbyQuickAction,
              ]
            : !headerComputation && footerText && callbyQuickAction
            ? [
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
                callbyQuickAction,
              ]
            : !headerComputation && !footerText && !callbyQuickAction
            ? [
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
              ]
            : !headerComputation && !footerText && callbyQuickAction
            ? [
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                callbyQuickAction,
              ]
            : headerComputation && footerText && !callbyQuickAction
            ? [
                headerComputation,
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
              ]
            : headerComputation && !footerText && !callbyQuickAction
            ? [
                headerComputation,
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
              ]
            : [
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
              ],
      },
    };
    const createFromDraft = {
      account_id: accountId,
      brand_id: brandId,
      template_id:
        type === 'EDIT' && singleTemplate?.id && parseInt(singleTemplate?.id),
      temp_id: singleTemplate?.id ? parseInt(singleTemplate?.id) : null,
      template: {
        name:
          multipleInputSetOne?.templateName &&
          nameFormat(multipleInputSetOne?.templateName),
        language: selectLanguage,
        category: selectCategory,
        components:
          headerComputation && footerText && callbyQuickAction
            ? [
                headerComputation,
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
                callbyQuickAction,
              ]
            : headerComputation && !footerText && callbyQuickAction
            ? [
                headerComputation,
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                callbyQuickAction,
              ]
            : !headerComputation && footerText && callbyQuickAction
            ? [
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
                callbyQuickAction,
              ]
            : !headerComputation && !footerText && !callbyQuickAction
            ? [
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
              ]
            : !headerComputation && !footerText && callbyQuickAction
            ? [
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                callbyQuickAction,
              ]
            : headerComputation && footerText && !callbyQuickAction
            ? [
                headerComputation,
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
              ]
            : headerComputation && !footerText && !callbyQuickAction
            ? [
                headerComputation,
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
              ]
            : [
                sampleValueArray?.length > 0 && selectedMedia === 'Media'
                  ? {
                      type: 'BODY',
                      text: textBody && textBody,
                      example: {
                        body_text: [sampleValueArray],
                      },
                    }
                  : {
                      type: 'BODY',
                      text: textBody && textBody,
                    },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
              ],
      },
    };
    if (type === 'EDIT') {
      editWhatsappTemplate(
        templateDetails,
        setCreateTemplate,
        setOpen,
        form,
        setSelelctedCategory,
        setSearch,
        setFilterByStatus
      );
    } else if (type === 'DRAFT') {
      createWhatsappTemplate(
        createFromDraft,
        setCreateTemplate,
        setOpen,
        form,
        '',
        type,
        setPageNumber
      );
    } else {
      createWhatsappTemplate(
        templateDetails,
        setCreateTemplate,
        setOpen,
        form,
        '',
        '',
        '',
        setSelelctedCategory,
        setSearch,
        setFilterByStatus
      );
    }
    resetAllStates();
  };
  const saveAsDraft = () => {
    const accountId = brand?.account_id;
    const brandId = brand?.id;
    const draftCallQuickAction = (multipleInputSetOne?.phoneButtonText ||
      multipleInputSetTwo?.webSecondText ||
      multipleInputSetOne?.phoneNumber ||
      multipleInputSetOne?.webUrl ||
      quickArray[0] ||
      quickArray[1] ||
      quickArray[2]) && {
      type: 'BUTTONS',
      buttons:
        multipleInputSetOne?.phoneButtonText ||
        multipleInputSetTwo?.webSecondText ||
        multipleInputSetOne?.phoneNumber
          ? [
              multipleInputSetOne?.phoneButtonText && {
                type: 'PHONE_NUMBER',
                text:
                  multipleInputSetOne?.phoneButtonText &&
                  multipleInputSetOne?.phoneButtonText,
                phone_number:
                  multipleInputSetOne?.phoneNumber &&
                  multipleInputSetOne?.phoneNumber,
              },
              multipleInputSetTwo?.webSecondText && {
                type: 'URL',
                text:
                  multipleInputSetTwo?.webSecondText &&
                  multipleInputSetTwo?.webSecondText,
                url: multipleInputSetOne?.webUrl && multipleInputSetOne?.webUrl,
              },
            ]
          : quickButtons,
    };
    const draftHeaderComputation =
      selectedMedia === 'Text'
        ? {
            type: 'HEADER',
            format: 'TEXT',
            text: headerText && headerText,
          }
        : selectedMedia === 'Media' &&
          multipleInputSetOne?.imageVideoDocument === 'image'
        ? {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [fileFinalUrl],
            },
          }
        : selectedMedia === 'Media' &&
          multipleInputSetOne?.imageVideoDocument === 'video'
        ? {
            type: 'HEADER',
            format: 'VIDEO',
            example: {
              header_handle: [fileFinalUrl],
            },
          }
        : selectedMedia === 'Media' &&
          multipleInputSetOne?.imageVideoDocument === 'document'
        ? {
            type: 'HEADER',
            format: 'DOCUMENT',
            example: {
              header_handle: [fileFinalUrl],
            },
          }
        : '';
    const templateDetails = {
      account_id: accountId,
      brand_id: brandId,
      template_id: singleTemplate?.id && parseInt(singleTemplate?.id),
      save_as_draft: true,
      temp_id: singleTemplate?.id && parseInt(singleTemplate?.id),
      meta_data: (fileLocalPath || findDefaultImage) && [
        fileLocalPath?.path_url || findDefaultImage,
        fileFinalUrl,
      ],
      template: {
        name:
          multipleInputSetOne?.templateName &&
          nameFormat(multipleInputSetOne?.templateName),
        language: selectLanguage,
        category: selectCategory,
        components:
          draftHeaderComputation && footerText
            ? [
                draftHeaderComputation,
                {
                  type: 'BODY',
                  text: textBody && textBody,
                },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
                draftCallQuickAction,
              ]
            : draftHeaderComputation && !footerText
            ? [
                draftHeaderComputation,
                {
                  type: 'BODY',
                  text: textBody && textBody,
                },
                draftCallQuickAction,
              ]
            : [
                {
                  type: 'BODY',
                  text: textBody && textBody,
                },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
                draftCallQuickAction,
              ],
      },
    };
    const saveFromAproveRejected = {
      account_id: accountId,
      brand_id: brandId,
      template_id: singleTemplate?.id && parseInt(singleTemplate?.id),
      save_as_draft: true,
      meta_data: (fileLocalPath || findDefaultImage) && [
        fileLocalPath?.path_url || findDefaultImage,
        fileFinalUrl,
      ],
      template: {
        name:
          multipleInputSetOne?.templateName &&
          nameFormat(multipleInputSetOne?.templateName),
        language: selectLanguage,
        category: selectCategory,
        components:
          draftHeaderComputation && footerText
            ? [
                draftHeaderComputation,
                {
                  type: 'BODY',
                  text: textBody && textBody,
                },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
                draftCallQuickAction,
              ]
            : draftHeaderComputation && !footerText
            ? [
                draftHeaderComputation,
                {
                  type: 'BODY',
                  text: textBody && textBody,
                },
                draftCallQuickAction,
              ]
            : [
                {
                  type: 'BODY',
                  text: textBody && textBody,
                },
                footerText && {
                  type: 'FOOTER',
                  text: footerText && footerText,
                },
                draftCallQuickAction,
              ],
      },
    };
    if (type === 'EDIT' || type === 'USETEMPLATE') {
      createWhatsappTemplate(
        saveFromAproveRejected,
        setCreateTemplate,
        setOpen,
        form,
        'draft',
        type,
        setPageNumber
      );
    } else {
      createWhatsappTemplate(
        templateDetails,
        setCreateTemplate,
        setOpen,
        form,
        'draft',
        type,
        setPageNumber
      );
    }
    resetAllStates();
  };
  const handleSelectMedia = val => {
    setMedia(val);
  };
  const addButtons = () => {
    const addedButton = arrayOfButtons?.concat(
      arrayOfButtons?.length > 0
        ? arrayOfButtons[arrayOfButtons?.length - 1] + 1
        : 0
    );
    setArrayOfButtons(addedButton);
  };
  const deleteButton = value => {
    const remaining = arrayOfButtons?.filter(data => data !== value);
    setArrayOfButtons(remaining);
    const newQucikAction = { ...quickAction };
    delete newQucikAction[`buttonText${value}`];
    setQuickAction(newQucikAction);
  };
  // const addCallToaction = value => {
  //     if (callToAction?.length < 3) {
  //         const callButton = callToAction?.concat(
  //             callToAction?.length > 0 ? (callToAction[callToAction?.length - 1] + 1) : 0
  //         )
  //         setCallToAction(callButton);
  //         setSecondAction("Visit Website");
  //     }
  // }
  // const deleteAction = val => {
  //     const remaining = callToAction?.filter(data => data !== val);
  //     setCallToAction(remaining)
  //     setSecondAction("");
  // }
  const handleMultiInputSetOne = e => {
    setSetOne({ ...multipleInputSetOne, [e.target.name]: e.target.value });
  };
  const handleMultiInputSetTwo = e => {
    setSetTwo({ ...multipleInputSetTwo, [e.target.name]: e.target.value });
  };
  const handleQuickMultiAction = e => {
    setQuickAction({ ...quickAction, [e.target.name]: e.target.value });
  };
  //  name format changes
  const nameFormat = value => value.toLowerCase().replace(/\s+/g, '_');
  return (
    <CreateTemplateModal
      open={openCreateTemplate}
      onCancel={() => {
        setCreateTemplate(false);
        resetAllStates();
        removeSingleTemplateOnEdit();
      }}
      footer={null}
      centered
    >
      <T.ScrollWrapper>
        <T.MainHeaderText>Create template message</T.MainHeaderText>
        <Divider />
        <Flex style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
          <div style={{ width: '55rem' }}>
            <Form onFinish={createTemplate} form={form} autoComplete="off">
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
                        max: 512,
                        message: 'Template name max char limit 512',
                      },
                    ]}
                  >
                    <T.InputTag
                      placeholder="Template name"
                      name="templateName"
                      value={multipleInputSetOne?.templateName}
                      onChange={handleMultiInputSetOne}
                      readOnly={type === 'EDIT'}
                      maxLength={512}
                    />
                  </Form.Item>
                </T.RightInputWrapper>
                <T.RightInputWrapper>
                  <T.InputLabel>Category</T.InputLabel>
                  <Form.Item
                    name="category"
                    rules={[
                      { required: true, message: 'Category must be selected' },
                    ]}
                  >
                    <T.SelectTag
                      placeholder="Category..."
                      name="category"
                      value={selectCategory}
                      onChange={val => setCategory(val)}
                      disabled={type === 'EDIT'}
                    >
                      <Select.Option key="0" value="Marketing">
                        Marketing
                      </Select.Option>
                      <Select.Option key="1" value="Utility">
                        Utility
                      </Select.Option>
                    </T.SelectTag>
                    {/* <T.InputTag
                                            name="category"
                                            defaultValue={selectCategory}
                                            readOnly
                                        /> */}
                  </Form.Item>
                </T.RightInputWrapper>
                <div>
                  <T.InputLabel>Language</T.InputLabel>
                  <Form.Item
                    name="language"
                    rules={[
                      { required: true, message: 'Language must be selected' },
                    ]}
                  >
                    <T.SelectTag
                      placeholder="Language..."
                      name="language"
                      onChange={val => setLanguage(val)}
                      value={selectLanguage}
                      disabled={type === 'EDIT'}
                    >
                      <Select.Option key="0" value="en">
                        English
                      </Select.Option>
                    </T.SelectTag>
                  </Form.Item>
                </div>
              </T.MarginFlex>
              <Divider />
              <div>
                <T.HeaderText>
                  <span>Header </span>
                  <span className="optionalText">( Optional )</span>
                </T.HeaderText>
                <T.AddText>
                  Add a title or choose media you'll use for this header.
                </T.AddText>
                <Flex alignCenter>
                  <Form.Item name="media">
                    <T.MediaTypeSelect
                      onChange={handleSelectMedia}
                      value={selectedMedia}
                      name="media"
                      placeholder="Select media"
                    >
                      <Select.Option key="0" value="Text">
                        Text
                      </Select.Option>
                      <Select.Option key="1" value="Media">
                        Media
                      </Select.Option>
                    </T.MediaTypeSelect>
                  </Form.Item>
                  {selectedMedia === 'Media' && (
                    <T.MediaRadioWrapper>
                      <span
                        className="radioText"
                        style={{ marginLeft: '15px' }}
                      >
                        <Radio.Group
                          name="imageVideoDocument"
                          value={multipleInputSetOne?.imageVideoDocument}
                          options={radioOptions}
                          onChange={handleMultiInputSetOne}
                        />
                      </span>
                    </T.MediaRadioWrapper>
                  )}
                </Flex>
                {selectedMedia === 'Media' &&
                  multipleInputSetOne?.imageVideoDocument && (
                    <Flex alignCenter>
                      <DynamicFileUpload
                        mediaUpload={mediaUpload}
                        mediaUrl={mediaUrl}
                        setMediaDetails={setMediaDetails}
                        accountId={brand?.account_id}
                        brandId={brand?.id}
                        getFileLocalPath={getFileLocalPath}
                        setDisplayImage={setDisplayImage}
                        imageVideoDocument={
                          multipleInputSetOne?.imageVideoDocument
                        }
                        findDefaultImage={findDefaultImage}
                        type={type}
                      />
                      {displayImage && (
                        <Flex style={{ marginLeft: '20px' }}>
                          {displayImage &&
                            multipleInputSetOne?.imageVideoDocument ===
                              'image' && (
                              <img
                                src={displayImage}
                                width="120px"
                                height="120px"
                                alt="headerImage"
                              />
                            )}
                          {displayImage &&
                            multipleInputSetOne?.imageVideoDocument ===
                              'video' && (
                              <video
                                src={displayImage}
                                width="150px"
                                height="150px"
                                autoPlay="autoPlay"
                                muted
                                loop="loop"
                              />
                            )}
                        </Flex>
                      )}
                    </Flex>
                  )}
                {(selectedMedia === 'Text' || headerText?.text) && (
                  <T.TextWrapper>
                    <Form.Item name="headerText">
                      <T.HeaderTextInput
                        placeholder="Enter text"
                        value={headerText}
                        onChange={e => {
                          setHeaderText(e.target.value);
                        }}
                        maxlength={60}
                        suffix={`${headerText?.length}/60`}
                      />
                    </Form.Item>
                  </T.TextWrapper>
                )}
              </div>
              <Divider />
              <T.BodyWrapper>
                <T.HeaderText>Body</T.HeaderText>
                <T.AddText>
                  Variables in double curly brackets without a space.
                </T.AddText>
                <Flex alignCenter>
                  <T.AddVariable
                    onClick={() => {
                      handleAddVariable();
                    }}
                    disabled={variableCount === 6}
                  >
                    Add Variable
                  </T.AddVariable>
                </Flex>
                <T.TextWrapper className="marginTop">
                  <Flex flexEnd>
                    <T.RemainingText style={{ marginRight: '30px' }}>
                      {textBody?.length}/1024
                    </T.RemainingText>
                  </Flex>
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
                      // { pattern: /{{[0-9]+}}/, message: "Please give only numbers inside variables" }
                    ]}
                  >
                    <textarea
                      className="textAreaStyles"
                      placeholder="Template message..."
                      value={textBody}
                      ref={textareaRef}
                      id="textBody"
                      name="templateMessage"
                      onChange={e => {
                        setTextBody(e.target.value);
                      }}
                      maxlength={1024}
                      onBlur={() => handleReduce()}
                    />
                  </Form.Item>
                </T.TextWrapper>
                {addVariable?.length > 0 && selectedMedia === 'Media' && (
                  <T.AddSampleButton onClick={() => setOpenSample(true)}>
                    Add sample variable
                  </T.AddSampleButton>
                )}
              </T.BodyWrapper>
              <Divider />
              <div>
                <T.HeaderText>
                  <span>Footer </span>
                  <span className="optionalText">( Optional )</span>
                </T.HeaderText>
                <T.TextWrapper>
                  <Form.Item name="footerText">
                    <T.HeaderTextInput
                      placeholder="Enter text"
                      value={footerText}
                      onChange={e => {
                        setFooterText(e.target.value);
                      }}
                      maxLength={60}
                      suffix={`${footerText?.length}/60`}
                    />
                  </Form.Item>
                </T.TextWrapper>
              </div>
              <Divider />
              <T.BottomWrapper>
                <T.HeaderText>
                  <span>Buttons </span>
                  <span className="optionalText">( Optional )</span>
                </T.HeaderText>
                <Flex spaceBetween className="selectAction">
                  <Form.Item name="selectButtons" style={{ margin: 0 }}>
                    <T.MediaTypeSelect
                      placeholder="None"
                      onChange={val => setButtons(val)}
                      value={selectButtons}
                      style={{ margin: 0 }}
                    >
                      <Select.Option key="0" value="Call to action">
                        Call to action
                      </Select.Option>
                      <Select.Option key="1" value="Quick reply">
                        Quick reply
                      </Select.Option>
                    </T.MediaTypeSelect>
                  </Form.Item>
                  {selectButtons === 'Quick reply' && (
                    <T.AddButton
                      onClick={addButtons}
                      disabled={arrayOfButtons?.length === 3}
                    >
                      Add Button
                    </T.AddButton>
                  )}
                  {/* {selectButtons === "Call to action" &&
                                        <T.AddButton
                                            onClick={addCallToaction}
                                            disabled={callToAction?.length === 2}
                                        >
                                            Add Button
                                        </T.AddButton>} */}
                </Flex>
                {selectButtons === 'Quick reply' && (
                  <div>
                    <Flex style={{ marginBottom: '20px' }}>
                      {arrayOfButtons?.length > 0 &&
                        arrayOfButtons?.map((buttons, ind) => {
                          return (
                            <div key={buttons}>
                              <Flex>
                                <Form.Item>
                                  <T.ButtonInputTextTag
                                    placeholder="Button text"
                                    maxlength={20}
                                    suffix={`${
                                      quickAction[`buttonText${buttons}`]
                                        ?.length
                                        ? quickAction[`buttonText${buttons}`]
                                            ?.length
                                        : 0
                                    }/20`}
                                    name={`buttonText${buttons}`}
                                    value={quickAction[`buttonText${buttons}`]}
                                    onChange={handleQuickMultiAction}
                                  />
                                </Form.Item>
                                <T.DeleteButton
                                  onClick={() => {
                                    deleteButton(buttons);
                                  }}
                                >
                                  <Bin />
                                </T.DeleteButton>
                              </Flex>
                            </div>
                          );
                        })}
                    </Flex>
                  </div>
                )}
                {selectButtons === 'Call to action' && (
                  <div>
                    {callToAction?.map((data, ind) => {
                      return (
                        <div key={data}>
                          {ind === 0 && (
                            <Flex style={{ marginTop: '37px' }}>
                              <Form.Item
                                name="selectedAction"
                                style={{ marginBottom: '37px' }}
                              >
                                <T.CallToActionSelect
                                  defaultValue="Cell Phone"
                                  value={selectedAction}
                                  onChange={val => setSelectedAction(val)}
                                >
                                  <T.CallToActionSelect.Option
                                    key="0"
                                    value="Cell Phone"
                                  >
                                    Cell Phone
                                  </T.CallToActionSelect.Option>
                                  <T.CallToActionSelect.Option
                                    key="1"
                                    value="Visit Website"
                                    disabled={secondAction === 'Visit Website'}
                                  >
                                    Visit Website
                                  </T.CallToActionSelect.Option>
                                </T.CallToActionSelect>
                              </Form.Item>
                              {selectedAction === 'Visit Website' && (
                                <div>
                                  <Form.Item name="webButtonText">
                                    <T.ActionInput
                                      name="webButtonText"
                                      placeholder="Button text"
                                      suffix={`${multipleInputSetOne?.webButtonText?.length}/20`}
                                      value={multipleInputSetOne?.webButtonText}
                                      onChange={handleMultiInputSetOne}
                                      maxLength={20}
                                    />
                                  </Form.Item>
                                  <Flex>
                                    <T.ActionInput
                                      value="Website URL"
                                      readOnly
                                      noMargin={true}
                                    />
                                    <Form.Item
                                      name="webUrl"
                                      rules={[
                                        {
                                          pattern:
                                            /^(http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(\/.*)?$/,
                                          message:
                                            'Please enter webiste format',
                                        },
                                      ]}
                                    >
                                      <T.ActionInput
                                        placeholder="https://www.aptonshops.com"
                                        suffix={`${multipleInputSetOne?.webUrl?.length}/2000`}
                                        style={{ width: '100%' }}
                                        name="webUrl"
                                        value={multipleInputSetOne?.webUrl}
                                        onChange={handleMultiInputSetOne}
                                        maxLength={2000}
                                      />
                                    </Form.Item>
                                  </Flex>
                                </div>
                              )}
                              {selectedAction === 'Cell Phone' && (
                                <Flex>
                                  <Form.Item name="phoneButtonText">
                                    <T.ActionInput
                                      suffix={`${multipleInputSetOne?.phoneButtonText?.length}/20`}
                                      placeholder="Button text"
                                      name="phoneButtonText"
                                      value={
                                        multipleInputSetOne?.phoneButtonText
                                      }
                                      onChange={handleMultiInputSetOne}
                                      maxLength={20}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name="phoneNumber"
                                    rules={[
                                      {
                                        pattern: /^\+[1-9]{1}[0-9]{3,14}$/,
                                        message:
                                          'Please enter only phone number with country code',
                                      },
                                    ]}
                                  >
                                    <T.ActionInput
                                      suffix={`${multipleInputSetOne?.phoneNumber?.length}/20`}
                                      placeholder="Phone number with country code"
                                      name="phoneNumber"
                                      value={multipleInputSetOne?.phoneNumber}
                                      onChange={handleMultiInputSetOne}
                                      maxLength={20}
                                    />
                                  </Form.Item>
                                </Flex>
                              )}
                            </Flex>
                          )}
                          <Flex>
                            {ind === 1 && (
                              <Flex>
                                <Form.Item name="secondAction">
                                  <T.CallToActionSelect
                                    defaultValue="Visit Website"
                                    value={secondAction}
                                    onChange={val => setSecondAction(val)}
                                  >
                                    <T.CallToActionSelect.Option
                                      key="0"
                                      value="Cell Phone"
                                      disabled={selectedAction === 'Cell Phone'}
                                    >
                                      Cell Phone
                                    </T.CallToActionSelect.Option>
                                    <T.CallToActionSelect.Option
                                      key="1"
                                      value="Visit Website"
                                    >
                                      Visit Website
                                    </T.CallToActionSelect.Option>
                                  </T.CallToActionSelect>
                                </Form.Item>
                                {secondAction === 'Visit Website' && (
                                  <Flex>
                                    <Form.Item name="webSecondText">
                                      <T.ActionInput
                                        suffix={`${multipleInputSetTwo?.webSecondText?.length}/20`}
                                        placeholder="Button text"
                                        name="webSecondText"
                                        value={
                                          multipleInputSetTwo?.webSecondText
                                        }
                                        onChange={handleMultiInputSetTwo}
                                        maxLength={20}
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      name="webUrl"
                                      rules={[
                                        {
                                          pattern:
                                            /^(http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(\/.*)?$/,
                                          message:
                                            'Please enter webiste format',
                                        },
                                      ]}
                                    >
                                      <T.ActionInput
                                        placeholder="https://www.aptonshops.com"
                                        suffix={`${multipleInputSetOne?.webUrl?.length}/2000`}
                                        name="webUrl"
                                        value={multipleInputSetOne?.webUrl}
                                        onChange={handleMultiInputSetOne}
                                        maxLength={2000}
                                      />
                                    </Form.Item>
                                  </Flex>
                                )}
                                {secondAction === 'Cell Phone' && (
                                  <Flex>
                                    <Form.Item name="phoneSecondText">
                                      <T.ActionInput
                                        suffix={`${multipleInputSetTwo?.phoneSecondText?.length}/20`}
                                        placeholder="Button text"
                                        name="phoneSecondText"
                                        onChange={handleMultiInputSetTwo}
                                        value={
                                          multipleInputSetTwo?.phoneSecondText
                                        }
                                        maxLength={20}
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      name="phoneNumberSecond"
                                      rules={[
                                        {
                                          pattern: /^\+[1-9]{1}[0-9]{3,14}$/,
                                          message:
                                            'Please enter only phone number with country code',
                                        },
                                      ]}
                                    >
                                      <T.ActionInput
                                        suffix={`${multipleInputSetTwo?.phoneNumberSecond?.length}/20`}
                                        placeholder="Phone number with country code"
                                        name="phoneNumberSecond"
                                        onChange={handleMultiInputSetTwo}
                                        value={
                                          multipleInputSetTwo?.phoneNumberSecond
                                        }
                                        maxLength={20}
                                      />
                                    </Form.Item>
                                  </Flex>
                                )}
                                {/* <T.DeleteButton onClick={() => deleteAction(data)}>
                                                            <Bin />
                                                        </T.DeleteButton> */}
                              </Flex>
                            )}
                          </Flex>
                        </div>
                      );
                    })}
                  </div>
                )}
                <Flex
                  flexEnd
                  style={{ marginTop: '1rem', paddingBottom: '1rem' }}
                >
                  <T.AddVariable onClick={() => saveAsDraft()}>
                    Save as draft
                  </T.AddVariable>
                  {!(selectedMedia === 'Media'
                    ? sampleValueArray?.length === addVariable?.length
                    : true) ? (
                    <Tooltip
                      placement="topLeft"
                      title="Please provide variable name at add sample media"
                    >
                      <T.SubmitButton
                        htmlType="submit"
                        disabled={
                          !textBody ||
                          !(selectedMedia === 'Media'
                            ? sampleValueArray?.length === addVariable?.length
                            : true)
                        }
                      >
                        Save & submit
                      </T.SubmitButton>
                    </Tooltip>
                  ) : (
                    <T.SubmitButton
                      htmlType="submit"
                      disabled={
                        !textBody ||
                        !(selectedMedia === 'Media'
                          ? sampleValueArray?.length === addVariable?.length
                          : true)
                      }
                    >
                      Save & submit
                    </T.SubmitButton>
                  )}
                </Flex>
              </T.BottomWrapper>
            </Form>
          </div>
          <T.ColourTemplateWrapper>
            <div className="parent">
              <div className="textParent">
                <T.ChatHeaderText>{headerText}</T.ChatHeaderText>
                {(displayImage || findDefaultImage) && (
                  <Flex>
                    {(displayImage ||
                      (type !== 'USETEMPLATE' && findDefaultImage)) &&
                      multipleInputSetOne?.imageVideoDocument === 'image' && (
                        <img
                          src={displayImage || findDefaultImage}
                          width={'280px'}
                          height={'200px'}
                          alt="previewImage"
                        />
                      )}
                    {(displayImage ||
                      (type !== 'USETEMPLATE' && findDefaultImage)) &&
                      multipleInputSetOne?.imageVideoDocument === 'video' && (
                        <div className="marginTopVideo">
                          <video
                            src={displayImage || findDefaultImage}
                            width={'100%'}
                            //height={"132px"}
                            autoPlay="autoPlay"
                            muted
                            loop="loop"
                          />
                        </div>
                      )}
                    {multipleInputSetOne?.imageVideoDocument === 'document' &&
                      (displayImage ||
                        (type !== 'USETEMPLATE' && findDefaultImage)) && (
                        <Flex
                          center
                          alignCenter
                          style={{
                            background: '#F4F4F5',
                            width: '100%',
                            padding: '30px',
                          }}
                        >
                          <img src={documentImage}></img>
                        </Flex>
                      )}
                  </Flex>
                )}
                <T.ChatBodyText>{textBody}</T.ChatBodyText>
                <T.ChatFooterText>{footerText}</T.ChatFooterText>
              </div>
              <T.ChatCurrentTime>{currentTime}</T.ChatCurrentTime>
            </div>
            <Flex wrap style={{ margin: '10px' }}>
              {multipleInputSetOne?.webButtonText && (
                <T.ChatButtons>
                  <a
                    href={multipleInputSetOne?.webUrl}
                    target="_blank"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <Flex alignCenter center>
                      <LinkArrowIcon style={{ marginRight: '10px' }} />
                      {multipleInputSetOne?.webButtonText}
                    </Flex>
                  </a>
                </T.ChatButtons>
              )}
              {multipleInputSetOne?.phoneButtonText && (
                <T.ChatButtons>
                  <a
                    href={`tel:${multipleInputSetOne?.phoneNumber}`}
                    target="_blank"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <Flex alignCenter center>
                      <CallLinkIcon style={{ marginRight: '10px' }} />
                      {multipleInputSetOne?.phoneButtonText}
                    </Flex>
                  </a>
                </T.ChatButtons>
              )}
              {/* {multipleInputSetOne?.phoneNumber && <T.ChatButtons>
                                {multipleInputSetOne?.phoneNumber}
                            </T.ChatButtons>} */}
              {multipleInputSetTwo?.webSecondText && (
                <T.ChatButtons>
                  <a
                    href={multipleInputSetOne?.webUrl}
                    target="_blank"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <Flex alignCenter center>
                      <LinkArrowIcon style={{ marginRight: '10px' }} />
                      {multipleInputSetTwo?.webSecondText}
                    </Flex>
                  </a>
                </T.ChatButtons>
              )}
              {multipleInputSetTwo?.phoneSecondText && (
                <T.ChatButtons>
                  <a
                    href={`tel:${multipleInputSetTwo?.phoneNumberSecond}`}
                    target="_blank"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <Flex alignCenter center>
                      <CallLinkIcon style={{ marginRight: '10px' }} />
                      {multipleInputSetTwo?.phoneSecondText}
                    </Flex>
                  </a>
                </T.ChatButtons>
              )}
              {/* {multipleInputSetTwo?.phoneNumberSecond && <T.ChatButtons>
                                {multipleInputSetTwo?.phoneNumberSecond}
                            </T.ChatButtons>} */}
              {/* {multipleInputSetOne?.webUrl && <T.ChatButtons>
                                <a href={multipleInputSetOne?.webUrl}>{multipleInputSetOne?.webUrl}</a>
                            </T.ChatButtons>} */}
              {quickArray[0] && <T.ChatButtons>{quickArray[0]}</T.ChatButtons>}
              {quickArray[1] && <T.ChatButtons>{quickArray[1]}</T.ChatButtons>}
              {quickArray[2] && <T.ChatButtons>{quickArray[2]}</T.ChatButtons>}
            </Flex>
          </T.ColourTemplateWrapper>
        </Flex>
      </T.ScrollWrapper>
      <AddVariableModal
        addVariable={addVariable}
        openSample={openSample}
        setOpenSample={setOpenSample}
        setSampleArray={setSampleArray}
        sampleValueArray={sampleValueArray}
        type={type}
      />
    </CreateTemplateModal>
  );
};

export default memo(CreateTemplateForm);
