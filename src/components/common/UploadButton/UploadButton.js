import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Alert, message } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { Gallery } from '../../icons/Gallery';

const Uploader = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    background: transparent;
    border: none;
    border: 2px dashed #d9d9d9;
    border-radius: 10px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: none !important;
  }
  .ant-upload-list-picture .ant-upload-list-item,
  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0px;
  }
`;
const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const UploadButton = ({
  action,
  setImageUrl,
  defaultImage,
  singleFileUploader,
  fileUrl,
  brandCoverPhotoUpload,
  removeBrandLogo,
  brandSlug,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState(
    defaultImage ? [{ uid: 1, url: defaultImage }] : []
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

  const handleChange = ({ fileList: newFileList, file: fileInfo }) => {
    if (fileInfo.status === 'uploading') {
      fileInfo.status = 'done';
    }
    if (fileInfo.status === 'done') {
      setFileList(newFileList);
      updateImageUrl(fileInfo);
    }
    if (fileInfo.status === 'removed') {
      console.log(fileInfo.status);
      singleFileUploader && removeBrandLogo(brandSlug);
      //brandCoverPhotoUpload(null, fileInfo);
    }
  };

  const updateFileUpload = () => {
    if (fileList?.length > 0) {
      const timeStamp = `_${fileList[0]?.lastModifiedDate?.getTime()}`;
      const fileName = fileList?.length > 0 && fileList[0]?.name?.split('');
      const t = fileName?.lastIndexOf('.');
      fileName?.splice(t, 0, timeStamp);
      const timeStampFileName = fileName?.join('');
      const filePath = imageUpload?.split(',')[1];
      uploadBrandLogo(timeStampFileName, filePath);
    }
  };

  const updateImageUrl = async file => {
    let imageUrl = await getBase64(file.originFileObj);
    setImageUrl(imageUrl);
    singleFileUploader && singleFileUploader(imageUrl, file);
    fileUrl && fileUrl(imageUrl);
    brandCoverPhotoUpload && brandCoverPhotoUpload(imageUrl, file);
  };
  useEffect(() => {
    setFileList(defaultImage ? [{ uid: 1, url: defaultImage }] : []);
  }, [defaultImage]);

  const uploadButton = (
    <div>
      <Gallery />
      <Flex
        style={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '10px',
          color: '#999999',
        }}
      >
        UPLOAD BRAND PICTURE
      </Flex>
    </div>
  );
  const handleBeforeUpload = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const { width, height } = img;

          const maxWidth = 228;
          const maxHeight = 43;

          if (width > maxWidth || height > maxHeight) {
            message.error(
              `Please upload an image with dimensions not exceeding ${maxWidth}px width and ${maxHeight}px height.`
            );
            reject();
          } else {
            resolve(file);
          }
        };
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <Uploader
        action={action}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
        onRemove={() => {
          setFileList([]);
        }}
        objectFit="fill"
        // beforeUpload={handleBeforeUpload}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Uploader>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
            //height: '400px',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadButton;
