import React from 'react';
import { Upload } from 'antd';
import { UploadIcon } from '@components/icons/UploadIcon';
import * as S from '@modules/Campagins/whatsapp/subcomponet/components/campsections/CampStyles';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: false,
  action: '',
  accept: '.xlsx,.xls,.csv',
};
const Styles = {
  width: '400px',
  height: '150px',
  background: '#FFFFFF',
  border: '2px dashed #D9D9D9',
  borderRadius: '10px',
};
const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const onChange = async (info, setCsvFile, setFileName) => {
  if (info.file.status === 'uploading') {
    info.file.status = 'done';
  }
  if (info.file.status === 'done') {
    let fileUrl = await getBase64(info.file.originFileObj);
    setCsvFile(fileUrl);
    setFileName(info?.file?.name);
  }
};

const onDrop = e => {
  // console.log('Dropped files', e.dataTransfer.files)
};

const ProspectUpLoadr = ({ setCsvFile, setFileName }) => (
  <S.FormItem name="file_path">
    <Dragger
      {...props}
      style={Styles}
      onChange={info => {
        onChange(info, setCsvFile, setFileName);
      }}
      onDrop={onDrop}
      maxCount={1}
    >
      <p className="ant-upload-text">Upload files</p>
      <p
        className="ant-upload-hint"
        style={{ color: '#4AACEA', fontWeight: 600, fontSize: '12px' }}
      >
        Drag and drop or click to add csv file
      </p>
      <p className="ant-upload-drag-icon">
        <UploadIcon />
      </p>
    </Dragger>
  </S.FormItem>
);
export default ProspectUpLoadr;
