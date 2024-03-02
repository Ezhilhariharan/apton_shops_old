import {
  Divider,
  Form,
  Radio,
  Select,
  Spin,
  message,
  Button,
  notification,
} from 'antd';
import React, { memo, useEffect, useState, useRef, forwardRef } from 'react';
import * as T from './CreateTemplateForm.styles';
import Header from './WatsupTemplateHeader';
import Flex from '@components/common/Flex';
import templateUpload from '../../../../../assets/images/templateUpload.png';
import { preSendURl, updateHeaderVariable } from '../../actions';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { addVariable, addVariableText } from '../constants/index';
import {
  uploadTemplateForm,
  uploadLocalFile,
  updateRadioValue,
  uploadFile,
} from '../../actions';
import {
  IconSpan,
  ImageWrapper,
} from '../../../../SocialMedia/components/partials/Tabs/components/create/Pages.style';
import { SocialIcon } from '../../../../SocialMedia/components/partials/modals/ViewStyle';
import ExitIcon from '@components/icons/ExitIcon';
import { Cardimage } from '../../../../SocialMedia/components/partials/Tabs/components/partials/PostMedia';
import previewDocument from '@assets/images/previewDocument.png';
import { LoadingOutlined } from '@ant-design/icons';

export const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const WatsupTemplatePopupHeader = forwardRef(({ form }, ref) => {
  const [value, setValue] = useState('None');
  const [fileRestriction, SetFileRestriction] = useState('');
  const [variables, SetVariables] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showPreviewMedia, SetShowPreviewMedia] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );
  const header = useSelector(
    state => state?.whatsappTemplate?.templateField?.header,
    shallowEqual
  );
  const uploadedLocalFile = useSelector(
    state => state?.whatsappTemplate?.uploadedLocalFile,
    shallowEqual
  );
  const uploadedLoader = useSelector(
    state => state?.whatsappTemplate?.uploadingFileLoader,
    shallowEqual
  );
  const headerVariable = useSelector(
    state => state?.whatsappTemplate?.headerVariable,
    shallowEqual
  );

  React.useImperativeHandle(ref, () => ({
    setHeaderType,
  }));

  useEffect(() => {
    if (uploadedLocalFile !== '') {
      SetShowPreviewMedia(true);
    }
  }, [uploadedLocalFile]);

  const setHeaderType = propsVal => {
    let value = propsVal ? propsVal : 'None';

    setValue(value);
    dispatch(updateRadioValue(value));
    setMediaUrl('');
    dispatch(updateHeaderVariable([]));
    form.setFieldsValue({
      headerText: '',
    });
    setInitialState();

    if (value === 'Image') {
      SetFileRestriction('.png,.jpg');
      SetVariables(addVariable);
      setInitialState();
      dispatch(uploadLocalFile(''));
      SetShowPreviewMedia(false);
    } else if (value === 'Document') {
      SetFileRestriction('.pdf');
      SetVariables(addVariable);
      setInitialState();
      dispatch(uploadLocalFile(''));
      SetShowPreviewMedia(false);
    } else if (value === 'Video') {
      SetFileRestriction('.mp4,.3gp');
      SetVariables(addVariable);
      setInitialState();
      dispatch(uploadLocalFile(''));
      SetShowPreviewMedia(false);
    } else if (value === 'Text') {
      SetVariables(addVariableText);
      dispatch(uploadLocalFile(''));
      form.setFieldsValue({
        headerText: '',
      });
    }
  };

  const setInitialState = () => {
    dispatch(
      uploadTemplateForm(
        Object.assign(templateField, {
          header: '',
        })
      )
    );
  };

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const type = e.dataTransfer.files[0]?.type;

      if (value === 'Image') {
        if (type === 'image/jpeg' || type === 'image/png') {
          dragDropchange(e.dataTransfer.files[0]);
        } else {
          setErrorMsg('kindly upload Image');
        }
      } else if (value === 'Document') {
        if (type === 'application/pdf') {
          dragDropchange(e.dataTransfer.files[0]);
        } else {
          setErrorMsg('kindly upload Document');
        }
      } else if (value === 'Video') {
        if (type === 'video/mp4') {
          dragDropchange(e.dataTransfer.files[0]);
        } else {
          setErrorMsg('kindly upload Video');
        }
      }
    }
  };
  const dragDropchange = async file => {
    const mediaUrl = await getBase64(file);
  };

  const handleChange = async event => {
    const file = event.target.files[0];
    const mediaUrl = await getBase64(file);
  };
  const getBase64 = file => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', event => {
        const _loadedImageUrl = event.target.result;
        if (value === 'Image') {
          const image = document.createElement('img');
          image.src = _loadedImageUrl;
          resolve(_loadedImageUrl);
        } else if (value === 'Video') {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.onloadedmetadata = function () {
            resolve(_loadedImageUrl);
          };
          video.src = URL.createObjectURL(file);
        }
        let fileSize = file.size / (1024 * 1024);
        if (value === 'Image') {
          if (fileSize <= 5) {
            dispatch(uploadLocalFile(_loadedImageUrl));
            sendFile(file);
            SetShowPreviewMedia(true);
          } else {
            notification.warn({
              message: '',
              description: 'Maximum file size is 5 mb',
            });
          }
        } else if (value === 'Video') {
          if (fileSize <= 16) {
            dispatch(uploadLocalFile(_loadedImageUrl));
            sendFile(file);
            SetShowPreviewMedia(true);
          } else {
            notification.warn({
              message: '',
              description: 'Maximum file size is 16 mb',
            });
          }
        } else if (value === 'Document') {
          if (fileSize <= 100) {
            dispatch(uploadLocalFile(_loadedImageUrl));
            sendFile(file);
            SetShowPreviewMedia(true);
          } else {
            notification.warn({
              message: '',
              description: 'Maximum file size is 100 mb',
            });
          }
        }
      });

      reader.onerror = error => reject(error);
    });
  };

  const sendFile = fileData => {
    let fileName = fileData?.name?.split('.')[0];
    let fileType = fileData?.name?.split('.').pop();
    const body = {
      file_name: `${fileName?.replace(/\s|\(|\)/g, '')}.${fileType?.replace(
        /\s/g,
        ''
      )}`,
      file_path: fileData,
    };
    dispatch(preSendURl(body, fileType, fileData));
  };

  const setAddVariable = name => {
    if (`{{${name}}}` !== headerVariable[0]) {
      form.setFieldsValue({
        headerData: '',
      });
    }

    if (name !== 'media_url') {
      let addName = `{{${name}}}`;
      const regex = /{{(.*?)}}/g;
      let text = header.toString().toLowerCase().match(regex);
      dispatch(updateHeaderVariable([addName]));
      if (text) {
        dispatch(
          uploadTemplateForm(
            Object.assign(templateField, {
              header: header.replace(/{{.*?}}/, addName),
            })
          )
        );
        form.setFieldsValue({
          headerText: header.replace(/{{.*?}}/, addName),
        });
      } else {
        const cursorPosition = inputRef.current.selectionStart;
        const updatedValue =
          header.slice(0, cursorPosition) +
          addName +
          header.slice(cursorPosition);

        inputRef.current.setSelectionRange(
          cursorPosition + addName.length,
          cursorPosition + addName.length
        );
        dispatch(
          uploadTemplateForm(
            Object.assign(templateField, {
              header: updatedValue,
            })
          )
        );
        form.setFieldsValue({
          headerText: updatedValue,
        });
      }
    } else {
      setMediaUrl('{{media_url}}');
    }
  };

  const onChangeHeaderText = e => {
    const regex = /{{(.*?)}}/g;
    let val = e.target.value?.replace(
      /{{(custom_variable\d+)}}/g,
      '{{custom_variable}}'
    );
    form.setFieldsValue({
      headerText: val,
    });
    dispatch(
      uploadTemplateForm(
        Object.assign(templateField, {
          header: val,
        })
      )
    );

    let text = val?.toString().toLowerCase().match(regex);
    if (text) {
      dispatch(updateHeaderVariable(text));
    } else {
      dispatch(updateHeaderVariable([]));
    }
  };

  const exitMedia = () => {
    SetShowPreviewMedia(false);
    dispatch(uploadLocalFile(''));
    dispatch(uploadFile(''));
  };

  return (
    <>
      <T.TemplateHeaderWrapper>
        <Header
          title="Message Header"
          description="Add a title or choose media you'll use for this header."
          optional
        />
        <Form.Item name="headerTextRadio">
          <Radio.Group
            onChange={e => setHeaderType(e.target.value)}
            defaultValue="None"
            value={value}
          >
            <Radio value={'None'}>None</Radio>
            <Radio value={'Text'}>Text</Radio>
            <Radio value={'Image'}>Image</Radio>
            <Radio value={'Video'}>Video</Radio>
            <Radio value={'Document'}>Document</Radio>
          </Radio.Group>
        </Form.Item>

        {value === 'Text' && (
          <T.HeaderTextWrapper>
            <T.TextWrapper>
              <Form.Item
                name="headerText"
                rules={[
                  {
                    whitespace: true,
                    message: 'value cannot be whitespace only',
                  },
                ]}
              >
                <Flex spaceBetween>
                  <input
                    className="headerDefaultInput"
                    ref={inputRef}
                    onChange={onChangeHeaderText}
                    onKeyDown={onChangeHeaderText}
                    maxlength={60}
                    placeholder="Enter text"
                    value={header}
                  />
                  <T.RemainingText
                    style={{ marginTop: '8px', marginLeft: '2px' }}
                  >{`${header?.length}/60`}</T.RemainingText>
                </Flex>
              </Form.Item>
            </T.TextWrapper>
          </T.HeaderTextWrapper>
        )}
        {(value === 'Image' || value === 'Document' || value === 'Video') && (
          <>
            <T.MediaUploader onDragOver={handleDrag} onDrop={handleDrop}>
              {showPreviewMedia ? (
                <SocialIcon style={{ margin: '0px' }}>
                  {!uploadedLoader && (
                    <IconSpan onClick={() => exitMedia()}>
                      <ExitIcon
                        style={{
                          fontSize: '22px',
                          fontWeight: 600,
                          color: 'black',
                          cursor: 'pointer',
                          marginLeft: '10px',
                          color: '#fff',
                        }}
                      />
                    </IconSpan>
                  )}
                  {uploadedLoader ? (
                    <ImageWrapper>
                      <Spin indicator={antIcon} style={{ margin: 'auto' }} />
                    </ImageWrapper>
                  ) : (
                    <>
                      {value === 'Image' || value === 'Document' ? (
                        <Cardimage
                          preview={false}
                          src={
                            value === 'Document'
                              ? previewDocument
                              : uploadedLocalFile
                          }
                          alt="no img"
                          style={{
                            margin: '9px 10px 0px 0px',
                            zIndex: 0,
                            height: '80px',
                            width: '80px',
                            //objectFit: 'none',
                          }}
                        />
                      ) : (
                        <T.Video
                          id="uploadVideo"
                          src={uploadedLocalFile}
                          autoPlay="autoPlay"
                          muted
                          loop="loop"
                        />
                      )}
                    </>
                  )}
                </SocialIcon>
              ) : (
                <label className="custom-file-upload">
                  <input
                    className="input"
                    type="file"
                    onChange={handleChange}
                    //   ref={fileInputRef}
                    accept={fileRestriction}
                  />
                  <img src={templateUpload} className="uploadIcon" />
                  {mediaUrl === '{{media_url}}'
                    ? 'Upload sample Media'
                    : 'Upload Media'}
                </label>
              )}
              <div className="uploadContent">
                <span className="textThick">Drag & Drop your file here</span>
                <span className="textThin">
                  File types: {value === 'Image' && '.jpg or.png'}
                  {value === 'Video' && '.mp4 ,.3gpp'}
                  {value === 'Document' && '.PDF'}
                </span>
              </div>
            </T.MediaUploader>
            {errorMsg && <T.ParagraphError>{errorMsg}</T.ParagraphError>}
            <T.HeaderTextInput
              style={{ marginBottom: '10px' }}
              placeholder={'Add media Variable'}
              value={mediaUrl}
              onChange={e => setMediaUrl('{{media_url}}')}
              onKeyDown={e =>
                (e.key === 'Backspace' || e.key === 'Delete') && setMediaUrl('')
              }
              maxLength={9}
            />
          </>
        )}

        {value !== 'None' && (
          <div className="dropdown">
            <Button className="button">Add Variable</Button>
            <div className="dropdown-content">
              {variables?.map(varName => (
                <T.VariableName
                  key={varName?.id}
                  onClick={() => setAddVariable(varName?.title)}
                >
                  {varName?.title}
                </T.VariableName>
              ))}
            </div>
          </div>
        )}
      </T.TemplateHeaderWrapper>
      <Divider className="divider" />
    </>
  );
});

export default WatsupTemplatePopupHeader;
