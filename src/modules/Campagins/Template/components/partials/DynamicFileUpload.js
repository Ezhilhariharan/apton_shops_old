import { Button, Upload, Modal, message } from 'antd';
import UploadBlueIcon from '@components/icons/UploadBlueIcon';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { shallowEqual, useSelector } from 'react-redux';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const UploadButtonStyle = styled(Button)`
  background-color: ${lightColorsTheme.additionalBackground};
  color: ${lightColorsTheme.primary};
  border: 2px solid ${lightColorsTheme.primary};
  display: flex;
  align-items: center;
  width: 169px;
  height: 40px;
  padding: 0;
  justify-content: center;
  .iconStyle {
    margin-right: 10px;
  }
`;
const DynamicFileUpload = ({
  mediaUpload,
  mediaUrl,
  setMediaDetails,
  accountId,
  brandId,
  getFileLocalPath,
  setDisplayImage,
  imageVideoDocument,
  findDefaultImage,
  type,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const fileName = findDefaultImage?.split('')?.lastIndexOf('/');
  const [fileList, setFileList] = useState([]);
  const fileLocalPath = useSelector(
    state => state.whatsappTemplate.localPath,
    shallowEqual
  );
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  useEffect(() => {
    if (findDefaultImage && type === 'DRAFT') {
      setDisplayImage(findDefaultImage);
      // computeMediaDetails([{name: findDefaultImage?.substring(fileName+1)}])
    }
  }, [findDefaultImage, type]);

  const handleChange = ({ fileList: newFileList, file: fileInfo }) => {
    if (fileInfo.status === 'uploading') {
      fileInfo.status = 'done';
    }
    if (fileInfo.status === 'done') {
      setFileList(newFileList);
      updateImageUrl(fileInfo);
      computeMediaDetails(fileList);
    }
  };

  const computeMediaDetails = fileList => {
    const fileLength = `${fileList[0]?.size}`;
    const fileType = fileList[0]?.type;
    const fileName = fileList[0]?.name;
    const allDetails = {
      account_id: accountId,
      brand_id: brandId,
      //file_length: fileLength,
      file_type: fileType,
      file_name: fileName,
      file_path: fileLocalPath?.file_path,
    };
    mediaUpload(allDetails);
  };

  useEffect(() => {
    if (fileList?.length > 0) {
      computeMediaDetails(fileList);
    }
  }, [fileList, fileLocalPath?.file_path]);

  const updateImageUrl = async file => {
    let imageUrl = await getBase64(file.originFileObj);
    if (imageVideoDocument !== 'document') {
      setDisplayImage(imageUrl);
    } else {
      setDisplayImage('documet');
    }
    setMediaDetails(imageUrl);
    const filePath = imageUrl?.split(',')[1];
    const fileName = file?.name;
    getFileLocalPath(filePath, fileName);
  };

  return (
    <>
      <Upload
        beforeUpload={file => {
          if (file?.size > 7000000) {
            message.error('Please upload file lesser than 7mb');
            return false;
          } else {
            return true;
          }
        }}
        accept={
          imageVideoDocument === 'image'
            ? '.jpeg,.jpg,.png'
            : imageVideoDocument === 'video'
            ? '.mp4'
            : '.pdf'
        }
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
        onRemove={() => {
          setFileList([]);
          setDisplayImage();
        }}
        id="mediaUpload"
      >
        <UploadButtonStyle>
          <UploadBlueIcon className="iconStyle" /> Upload Media
        </UploadButtonStyle>
      </Upload>
      {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal> */}
    </>
  );
};

export default DynamicFileUpload;
