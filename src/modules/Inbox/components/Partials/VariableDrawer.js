import React, { useEffect, useState } from 'react';
import { Drawer, Row, Col, Form, Input, Image, Button, Typography } from 'antd';
import styled from 'styled-components';
import {
  TextButton,
  Text,
} from '../../../Campagins/whatsAppChat/components/partials/ChatCSS';
import { CloseOutlined } from '@ant-design/icons';
import Flex from '@components/common/Flex';
import templateUpload from '../../../../../src/assets/images/templateUpload.png';
import * as T from '../../../../modules/Campagins/Template/components/partials/CreateTemplateForm.styles';
import previewDocument from '../../../../assets/images/previewDocument.png';
import ExitIcon from '../../../../components/icons/ExitIcon';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { preSendURl } from '../../actions';
import { sendTemplatewpMessage } from '../../../Campagins/whatsAppChat/actions';
// import WatsupViewTemplate from '../../../Campagins/Template/components/partials/WatsupViewTemplate';
// import { Cardimage } from '../../../SocialMedia/components/partials/modals/ViewStyle';

const Draw = styled(Drawer)`
  width: 90%;
  height: 490px;
  border-radius: 10px;
  background: transparent;
  margin: 150px 0px 0px 20px;

  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  .ant-drawer-content {
    border-radius: 20px;
    width: auto;
    height: auto;
    border: none;
  }
  .ant-row {
    gap: 80px;
  }
`;

export const MediaUploader = styled.div`
  display: flex;
  input[type='file'] {
    display: none;
  }
  width: 23.875rem;
  height: 100px;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(249, 249, 249, 1);
  border: 1px dashed rgba(228, 232, 239, 1);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: #4d4d4d;
  padding: 20px;
  // gap: 35px;
  margin: 15px 0;

  .custom-file-upload {
    border: none;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: auto;
    height: 40px;
    padding: 10px;
    border-radius: 6px;
    margin: 0 20px 0 0;
    color: black;
    font-weight: 500;
    font-size: 14px;
  }
  .uploadIcon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .uploadContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .textThick {
      font-weight: 600;
      font-size: 14px;
      color: black;
    }
    .textThin {
      font-weight: 500;
      font-size: 12px;
      color: grey;
    }
  }
`;

export const Cardimage = styled(Image)`
  width: 225px !important;
  // height: 290px;
  // margin-bottom: 10px;
  // margin-top: 10px;
  // object-fit: contain;
  // border-radius: 10px;
`;

export const IconSpan = styled.span`
  position: absolute;
  right: -2px;
  bottom: 55px;
  z-index: 1;
`;

export const SocialIcon = styled('div')`
  margin: 8px 13px 0 13px;
  position: relative;
  cursor: pointer;
  .span {
    position: absolute;
    background: transparent;
    bottom: 14px;
    left: 19px;
    cursor: pointer;
  }
`;
const BackgroundWrapper = styled.div`
  width: auto;
  height: auto;
  margin: 0px 10px 0px 0px;

  // overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  margin-top: 20px;
  background: #fff6eb;
  border-radius: 0px 10px 10px 10px;
`;
const Wrapper = styled.div`
  width: 250px;
  background: #ffffff;
  margin: 10px;
  white-space: pre-line;
  padding: 8px 13px 8px 13px;
  border-radius: 0px 10px 10px 10px;

  .ant-row {
    gap: 50px;
  }
`;

const TextField = styled(Input)`
  background: #f4f4f5;
  border-radius: 5px;
  height: 40px;
  padding: 20px;
`;
const Texting = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  color: #999999;
  padding: 0px 0px 5px 0px;
`;

const VariableDrawer = ({
  selecteContact,
  setOpen,
  open,
  setOpenDr,
  selectedtemp,
  sendwpMessage,
  fetchChatHistory,
}) => {
  const uploadedFile = useSelector(
    state => state?.inboxSelector?.uploadedFile,
    shallowEqual
  );
  const HeaderContent = selectedtemp?.components?.filter(
    i => i.type === 'HEADER'
  );
  const ImageContnet = selectedtemp?.components?.filter(
    i => i.format === 'IMAGE'
  );
  const imageSrc = ImageContnet?.map(
    i => i.format === 'IMAGE' && i.example.header_handle[0]
  );
  const BodyContent = selectedtemp?.components?.filter(i => i.type === 'BODY');

  const VideoContnet = selectedtemp?.components?.filter(
    i => i.format === 'VIDEO'
  );
  const videoSrc = VideoContnet?.map(
    i => i.format === 'VIDEO' && i.example.header_handle[0]
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [bodyContent, setBodyContent] = useState(BodyContent[0]?.text);
  const [headerContent, setHeaderContent] = useState(HeaderContent[0]?.text);
  const [showUploadedMedia, setShowUploadedMedia] = useState(true);
  const [showPreviewMedia, SetShowPreviewMedia] = useState(false);
  const [headerMediaFormat, SetHeaderMediaFormat] = useState(null);
  const [formatError, SetFormatError] = useState(null);

  const [imageSrc1, setImageSrc1] = useState('');
  const [videoSrc1, setVideoSrc1] = useState('');
  const [documentSrc1, setDocumentSrc1] = useState('');
  const [dynamicData, setDynamicData] = useState([]);
  const [mediaFormat, setMediaFormat] = useState('');

  useEffect(() => {
    if (uploadedFile || uploadedFile !== '') {
      setDynamicData(prev => {
        const newState = prev.map(item => {
          if (Object.keys(item)[0] === 'media_url') {
            const dynamicObject = {};
            dynamicObject['media_url'] = uploadedFile;
            return dynamicObject;
          } else {
            return { ...item };
          }
        });
        return newState;
      });
    }
  }, [uploadedFile]);

  useEffect(() => {
    setImageSrc1(imageSrc[0]);
    setVideoSrc1(videoSrc[0]);
    let arr = [];
    selectedtemp?.message_body?.custom_variables?.map(custom => {
      arr.push(custom);
    });
    let trimArr = [];
    arr?.map(fields => {
      if (Object.keys(fields)[0] !== 'media_url') {
        const dynamicObject = {};
        dynamicObject[Object.keys(fields)] = '';
        trimArr.push(dynamicObject);
      } else {
        trimArr.push(fields);
      }
    });
    setDynamicData(trimArr);

    const media =
      HeaderContent &&
      HeaderContent.some(
        data =>
          data.format === 'IMAGE' ||
          data.format === 'VIDEO' ||
          data.format === 'DOCUMENT'
      );
    HeaderContent?.length > 0 && SetHeaderMediaFormat(HeaderContent[0]?.format);

    if (HeaderContent[0]?.format === 'IMAGE') {
      setMediaFormat('.jpg,.jpeg,.png');
    } else if (HeaderContent[0]?.format === 'VIDEO') {
      setMediaFormat('.mp4,.3gp');
    } else if (HeaderContent[0]?.format === 'DOCUMENT') {
      setMediaFormat('.PDF');
    }

    if (media) {
      SetShowPreviewMedia(true);
    } else {
      SetShowPreviewMedia(false);
    }
  }, [selectedtemp?.components]);

  const handleRemoveImage = () => {
    setImageSrc1('');
    setVideoSrc1('');
    setDocumentSrc1('');
    setShowUploadedMedia(false);
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    settingUpMedia(file);
  };
  const settingUpMedia = file => {
    SetFormatError('');
    const reader = new FileReader();

    reader.onloadend = () => {
      let localFileFormat = file?.type?.split('/')[0];
      if (headerMediaFormat?.toLowerCase() === localFileFormat) {
        const mediaType = headerMediaFormat?.toLowerCase();

        switch (mediaType) {
          case 'image':
            setImageSrc1(reader.result);
            setDocumentSrc1(null);
            setVideoSrc1(null);
            setMediaFormat('.jpg,.jpeg,.png');
            break;
          case 'video':
            setVideoSrc1(reader.result);
            setImageSrc1(null);
            setDocumentSrc1(null);
            setMediaFormat('.mp4,.3gp');
            break;
          case 'document':
            setDocumentSrc1(reader.result);
            setVideoSrc1(null);
            setImageSrc1(null);
            setMediaFormat('.PDF');
            break;
        }
        sendFile(file);
        setShowUploadedMedia(true);
      } else {
        SetFormatError('File format should be some');
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      settingUpMedia(e.dataTransfer.files[0]);
    }
  };

  const handleHeaderInputChange = (e, fieldName) => {
    // const updatedData = HeaderContent.map(data =>
    //   data.text === fieldName ? { ...data, text: e.target.value } : data
    // );
    let itemToUpdate = [];

    let responseBodyContent =
      HeaderContent?.length > 0 ? HeaderContent[0]?.text : '';

    const exitsLines = responseBodyContent
      ?.replace(/\n/g, ' nextLine ')
      ?.split(' ');

    dynamicData?.map(item => {
      if (`{{${Object.keys(item)[0]}}}` === fieldName) {
        const dynamicObject = {};
        dynamicObject[Object.keys(item)[0]] = e.target.value;
        exitsLines?.splice(
          exitsLines?.indexOf(`{{${Object.keys(item)[0]}}}`),
          1,
          e.target.value
        );
        return itemToUpdate.push(dynamicObject);
      } else {
        return itemToUpdate.push(item);
      }
    });
    let reversedLine = exitsLines?.join(' ')?.replace(/ nextLine /g, '\n');

    setHeaderContent(reversedLine);
    setDynamicData(itemToUpdate);
  };

  const handleInputChange = (e, fieldName) => {
    let itemToUpdate = [];

    let responseBodyContent =
      BodyContent?.length > 0 ? BodyContent[0]?.text : '';

    const exitsLines = responseBodyContent
      ?.replace(/\n/g, ' nextLine ')
      ?.split(' ');
    dynamicData?.map(item => {
      if (Object.keys(item)[0] !== 'media_url') {
        if (`{{${Object.keys(item)[0]}}}` === fieldName) {
          const dynamicObject = {};
          dynamicObject[Object.keys(item)[0]] = e.target.value;
          exitsLines?.splice(
            exitsLines?.indexOf(`{{${Object.keys(item)[0]}}}`),
            1,
            e.target.value
          );
          return itemToUpdate.push(dynamicObject);
        } else {
          if (Object.values(item)[0] !== '') {
            exitsLines?.splice(
              exitsLines?.indexOf(`{{${Object.keys(item)[0]}}}`),
              1,
              Object.values(item)
            );
          }
          return itemToUpdate.push(item);
        }
      } else {
        return itemToUpdate.push(item);
      }
    });
    let reversedLine = exitsLines?.join(' ')?.replace(/ nextLine /g, '\n');
    setBodyContent(reversedLine);
    setDynamicData(itemToUpdate);
  };

  const regex = /{{(.*?)}}/g;
  let output =
    BodyContent.length > 0 &&
    BodyContent[0]?.text?.toString().toLowerCase().match(regex);

  let headerVariable =
    HeaderContent.length > 0 &&
    HeaderContent[0]?.text?.toString().toLowerCase().match(regex);

  const backButton = () => {
    setOpenDr(false);
    setOpen(true);
  };

  const onFinish = values => {
    dispatch(
      sendTemplatewpMessage(
        selecteContact?.to,
        selecteContact?.from,
        selectedtemp?.id,
        dynamicData
      )
    );
    fetchChatHistory(selecteContact?.to, selecteContact?.from);
    setOpenDr(false);
  };
  return (
    <Draw
      title={
        selectedtemp?.name.charAt(0).toLowerCase() + selectedtemp?.name.slice(1)
      }
      placement="bottom"
      closable={false}
      open={open}
      mask={false}
      getContainer={false}
      extra={
        <TextButton onClick={() => setOpenDr(false)}>
          <CloseOutlined />
        </TextButton>
      }
    >
      <Form style={{ marginLeft: '30px' }} onFinish={onFinish}>
        <Row>
          <Col>
            {HeaderContent?.length !== 0 && (
              <Col>
                {HeaderContent?.some(data => data.format === 'TEXT') && (
                  <Text
                    style={{ margin: '10px 0px 20px 0px', color: '#4d4d4d' }}
                  >
                    Header Variable
                  </Text>
                )}
                {HeaderContent?.map(data => {
                  let final = data?.text?.replace(',', ' ');
                  return (
                    <>
                      <Flex>
                        {(data?.format === 'VIDEO' ||
                          data?.format === 'IMAGE' ||
                          data?.format === 'DOCUMENT') && (
                          <>
                            <MediaUploader
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                            >
                              {imageSrc1 || videoSrc1 || documentSrc1 ? (
                                <>
                                  <div style={{ position: 'relative' }}>
                                    {imageSrc1 && (
                                      <img
                                        src={imageSrc1}
                                        alt="Uploaded Image"
                                        className="uploadedImage"
                                        style={{
                                          height: '70px',
                                          width: '75px',
                                          objectFit: 'cover',
                                          borderRadius: '10px',
                                        }}
                                      />
                                    )}
                                    {videoSrc1 && (
                                      <video
                                        src={videoSrc1}
                                        alt="Uploaded Video"
                                        className="uploadedImage"
                                        style={{
                                          height: '70px',
                                          width: '70px',
                                          objectFit: 'cover',
                                          borderRadius: '10px',
                                          paddingTop: '5px',
                                        }}
                                      />
                                    )}
                                    {documentSrc1 && (
                                      <document
                                        src={documentSrc1}
                                        alt="Uploaded Document"
                                        className="uploadedImage"
                                        style={{
                                          height: '70px',
                                          width: '70px',
                                          objectFit: 'cover',
                                          borderRadius: '10px',
                                        }}
                                      />
                                    )}
                                    <IconSpan onClick={handleRemoveImage}>
                                      <ExitIcon />
                                    </IconSpan>
                                  </div>
                                </>
                              ) : (
                                <label className="custom-file-upload">
                                  <input
                                    className="input"
                                    type="file"
                                    onChange={handleImageChange}
                                    accept={mediaFormat}
                                  />
                                  <img
                                    src={templateUpload}
                                    className="uploadIcon"
                                    alt="Upload Icon"
                                  />
                                  Upload File
                                </label>
                              )}

                              <div className="uploadContent">
                                <span className="textThick">
                                  Drag & Drop your file here
                                </span>
                                <span className="textThin">
                                  File types:{' '}
                                  {headerMediaFormat?.toLowerCase() ===
                                    'image' && '.jpg or.png'}
                                  {headerMediaFormat?.toLowerCase() ===
                                    'video' && '.mp4 ,.3gpp'}
                                  {headerMediaFormat?.toLowerCase() ===
                                    'document' && '.PDF'}
                                </span>
                              </div>
                            </MediaUploader>
                          </>
                        )}
                      </Flex>
                      {formatError && (
                        <T.ParagraphError>{formatError}</T.ParagraphError>
                      )}

                      {!['VIDEO', 'IMAGE', 'DOCUMENT'].includes(
                        data?.format
                      ) && (
                        <div key={data.text}>
                          <Texting>
                            {headerVariable?.length > 0 && headerVariable[0]}
                          </Texting>
                          <Form.Item
                            style={{
                              marginBottom: '20px',
                              width: '21.875rem',
                              gap: '100px',
                            }}
                            name={final}
                            rules={[
                              {
                                required: true,
                                message: 'Field is required',
                              },
                              {
                                pattern: /^.{1,60}$/,
                                message:
                                  'Field should not exceed 60 characters',
                              },
                            ]}
                          >
                            <TextField
                              placeholder={`Enter variable sample data`}
                              value={headerContent}
                              onChange={e =>
                                handleHeaderInputChange(
                                  e,
                                  headerVariable?.length > 0 &&
                                    headerVariable[0]
                                )
                              }
                            />
                          </Form.Item>
                        </div>
                      )}
                    </>
                  );
                })}
              </Col>
            )}
            {output?.length !== 0 && (
              <Col>
                <Text style={{ margin: '10px 0px 20px 0px', color: '#4d4d4d' }}>
                  {output?.length > 0 ? 'Body Variable' : ''}
                </Text>
                {output?.map(data => {
                  // let Final = data.replace(',', ' ');
                  return (
                    <>
                      <div key={data}>
                        <Texting>{data}</Texting>
                        <Form.Item
                          style={{ marginBottom: '20px', width: '90%' }}
                          name={data}
                          rules={[
                            {
                              required: true,
                              message: 'Field is required',
                            },
                            {
                              pattern: /^.{1,25}$/,
                              message: 'Field should not  exceed 25 characters',
                            },
                          ]}
                        >
                          <TextField
                            placeholder={`Enter variable sample data`}
                            value={data?.value}
                            onChange={e => handleInputChange(e, data)}
                          />
                        </Form.Item>
                      </div>
                    </>
                  );
                })}
              </Col>
            )}
          </Col>
          <Col>
            <Flex>
              <BackgroundWrapper>
                <Wrapper>
                  {imageSrc1 && (
                    <Cardimage
                      preview={false}
                      src={imageSrc1}
                      alt="Newly Uploaded Image"
                      style={{
                        margin: '9px 10px 0px 0px',
                        zIndex: 0,
                        height: '160px',
                        // objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                  )}

                  {videoSrc1 && (
                    <T.Video
                      preview={false}
                      id="uploadVideo"
                      src={videoSrc1}
                      autoPlay="autoPlay"
                      muted
                      loop="loop"
                      style={{
                        margin: '9px 10px 0px 0px',
                        zIndex: 0,
                        height: '170px',
                        width: '225px',
                        objectFit: 'cover',
                      }}
                    />
                  )}

                  {documentSrc1 && (
                    <iframe
                      src={documentSrc1}
                      title="Uploaded Document"
                      width="225px"
                      height="170px"
                    />
                  )}

                  {/* <div>{HeaderContent[0]?.text}</div>
                  {BodyContent[0]?.text}
                  <div style={{ margin: '10px 0' }}>
                    {FooterContent[0]?.text}
                  </div> */}
                  <div>{headerContent}</div>
                  <div>{bodyContent}</div>
                </Wrapper>
              </BackgroundWrapper>
            </Flex>
            <Flex end style={{ margin: '10px 10px 0px 0px' }}>
              <TextButton onClick={backButton}>Back</TextButton>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginBottom: '20px' }}
              >
                Send
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Draw>
  );
};

export default VariableDrawer;
