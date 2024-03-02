import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Radio, Space, Upload, Button, Divider } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { surveyMediaUpload } from '../../actions';

export const SectionTitle = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  font-size: ${props => props.fontSize || '16px'};
  line-height: 19px;
  color: ${props => props.fontColor || '#4D4D4D'};
`;

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const StyledInput = styled(Input)`
  background-color: #f4f4f5;
  border-radius: 5px;
  border: 1px solid #f4f4f5;
`;

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const HeaderMessage = ({ FItem, title }) => {
  const [value, setValue] = useState(null);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  // const headerMediaValue = useSelector(
  //   state => state.createSurveySelector.headerMedia
  // );
  const onTypeChange = e => {
    setValue(e.target.value);
  };
  const props = {
    name: 'file',
    multiple: false,
    action: '',
  };

  const handleChange = ({ fileList: newFileList, file: fileInfo }) => {
    if (fileInfo.status === 'uploading') {
      fileInfo.status = 'done';
    }
    if (fileInfo.status === 'done') {
      setFileList(newFileList);
      updateImageUrl(fileInfo);
    }
  };

  const updateImageUrl = async file => {
    let imageUrl = await getBase64(file.originFileObj);
    const filePath = imageUrl?.split(',')[1];
    const fileName = file?.name;
    dispatch(surveyMediaUpload({ file_path: filePath, file_name: fileName }));
  };

  return (
    <div>
      {title === 'Message' && <SectionTitle>Media</SectionTitle>}
      {title !== 'Message' && <SectionTitle>Header</SectionTitle>}

      <SectionTitle fontColor="#999999" fontSize="12px">
        {'( Optional )'}
      </SectionTitle>
      {title === 'Message' && (
        <Wrapper>
          <FItem name="heade_type">
            <Radio.Group
              onChange={onTypeChange}
              value={value}
            >
              <Space size={'large'}>
                <Radio value={'image'}>Image</Radio>
                <Radio value={'video'}>Video</Radio>
                <Radio value={'document'}>Document</Radio>
              </Space>
            </Radio.Group>
          </FItem>
        </Wrapper>
      )}
      <Wrapper>
        {title !== 'Message' && (
          <FItem name="hearder_text_value">
            <StyledInput size="large" placeholder="Header text..." />
          </FItem>
        )}
        {title === 'Message' && (
          <FItem
            name="media_url"
            rules={[
              {
                required: value ===null? false:true,
                message: 'Please upload selected media file.',
              },
            ]}
          >
            <Upload
              {...props}
              beforeUpload={file => {
                if (file?.size > 7000000) {
                  message.error('Please upload file lesser than 7mb');
                  return false;
                } else {
                  return true;
                }
              }}
              onChange={handleChange}
              maxCount={1}
              onRemove={() => {
                setFileList([]);
              }}
              accept={
                value === 'image'
                  ? '.jpeg,.jpg,.png'
                  : value === 'video'
                  ? '.mp4'
                  : '.pdf'
              }
              fileList={fileList}
            >
              <Button
                type="primary"
                ghost
                icon={<CloudUploadOutlined />}
                style={{ border: '2px solid' }}
              >
                {' '}
                Upload Media
              </Button>
            </Upload>
          </FItem>
        )}
      </Wrapper>
      <Divider />
    </div>
  );
};

export default HeaderMessage;
