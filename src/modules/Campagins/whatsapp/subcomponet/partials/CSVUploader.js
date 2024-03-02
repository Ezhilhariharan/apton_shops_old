import React, { useState, useEffect, useCallback } from 'react';
import { Upload } from 'antd';
import { UploadIcon } from '@components/icons/UploadIcon';
import * as S from '../components/campsections/CampStyles';
import { preSendURl } from '../actions';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';

const { Dragger } = Upload;
const Styles = {
  width: '400px',
  height: '150px',
  background: '#FFFFFF',
  border: '2px dashed #D9D9D9',
  borderRadius: '10px',
};

const CSVUploader = ({
  setCsvFile,
  setFileName,
  campaginDetails,
  fetchCampaginDetails,
  setCsvFiles,
  setFilePathError,
  selectedWhatsAppCampagin,
  setStatus,
  sheduleSteeings,
  setProspectsCount,
}) => {
  const details = useSelector(
    state => state.createWhatsAppSelector.whatsApp_CSV_Url,
    shallowEqual
  );
  const dispatch = useDispatch();

  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      // reader.readAsDataURL(file);
      reader.onload = event => {
        const bstr = event.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        let excelData = convertToJson(data);
        let mobNumber = [];
        excelData?.map(item => {
          item?.mobile_number !== '' && mobNumber.push(item?.mobile_number);
        });
        let avoidDuplicate = mobNumber?.filter(
          (item, index) => mobNumber?.indexOf(item) === index
        );
        avoidDuplicate?.length > 0 && avoidDuplicate[0] !== ''
          ? setProspectsCount(avoidDuplicate?.length)
          : setProspectsCount(0);
        resolve(reader.result);
      };
      reader.readAsBinaryString(file);

      reader.onerror = error => reject(error);
      sendFile(file);
    });

  const convertToJson = csv => {
    var lines = csv.split('\n');

    var result = [];

    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return result;
  };

  const onChange = async (info, setCsvFile, setFileName, setCsvFiles) => {
    if (info.file.status === 'uploading' || info.file.status === 'error') {
      info.file.status = 'done';
    }
    if (info.file.status === 'done') {
      let fileUrl = await getBase64(info.file.originFileObj);
      setCsvFile(fileUrl);
      setCsvFiles(fileUrl);
      setFileName(info?.file?.name);
    }
  };
  const onDrop = e => {
    // console.log('Dropped files', e.dataTransfer.files);
  };

  // new file Uploader
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

  const [fileurlnames, setFileurlNames] = useState();
  const [fileurlname, setFileurlName] = useState();
  useEffect(() => {
    if (selectedWhatsAppCampagin?.id) {
      fetchCampaginDetails(selectedWhatsAppCampagin?.id);
    }
  }, []);
  useEffect(() => {
    if (details !== undefined && details !== '' && details !== null) {
      const fields = details?.url?.split('/');
      setFileurlNames(fields?.at(-1));
      setCsvFiles(details);
    }
    if (
      campaginDetails !== undefined &&
      campaginDetails !== '' &&
      campaginDetails !== null
    ) {
      const fields = campaginDetails?.path_url?.split('/');
      setFileurlName(fields?.at(-1));
      setCsvFiles(campaginDetails?.path_url);
    }
  }, [campaginDetails, details]);
  const props = {
    name: 'file',
    multiple: 'false',
    action: '',
    accept: '.xlsx',
    defaultFileList: [
      {
        uid: '1',
        name: details?.url === undefined ? `${fileurlname}` : `${fileurlnames}`,
        status: 'done',
        url:
          details?.url === undefined
            ? `${campaginDetails?.path_url}`
            : `${details?.url}`,
      },
    ],
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: 'Downlod',
    },
  };
  const defaultProps = {
    name: 'file',
    multiple: 'false',
    action: '',
    accept: '.xlsx',
  };
  const handleRemove = info => {
    setStatus(info);
    if (info?.status === 'done' || selectedWhatsAppCampagin === ' ') {
      setCsvFiles(' ');
    }
  };
  return (
    <S.FormItem name="file_path">
      {campaginDetails !== undefined &&
        campaginDetails !== '' &&
        campaginDetails !== null &&
        fileurlname !== undefined &&
        selectedWhatsAppCampagin !== ' ' && (
          <Dragger
            {...props}
            style={Styles}
            onChange={info => {
              onChange(info, setCsvFile, setFileName, setCsvFiles);
              setFilePathError(false);
            }}
            onDrop={onDrop}
            maxCount={1}
            onRemove={e => handleRemove(e)}
            accept=".xlsx"
          >
            <p className="ant-upload-text">Upload files</p>
            <p className="ant-upload-hint">
              Drag and drop or click to add xlsx file
            </p>
            <p className="ant-upload-drag-icon">
              <UploadIcon />
            </p>
          </Dragger>
        )}
      {selectedWhatsAppCampagin === ' ' && (
        <Dragger
          {...defaultProps}
          style={Styles}
          onChange={info => {
            onChange(info, setCsvFile, setFileName, setCsvFiles);
            if (info?.name !== undefined) {
              setFilePathError(true);
            } else {
              setFilePathError(false);
            }
          }}
          onDrop={onDrop}
          maxCount={1}
          onRemove={e => handleRemove(e)}
          accept=".xlsx"
        >
          <p className="ant-upload-text">Upload files</p>
          <p className="ant-upload-hint">
            Drag and drop or click to add xlsx file
          </p>
          <p className="ant-upload-drag-icon">
            <UploadIcon />
          </p>
        </Dragger>
      )}
      {sheduleSteeings?.fileName && (
        <div style={{ marginTop: '10px' }}>{sheduleSteeings?.fileName}</div>
      )}
    </S.FormItem>
  );
};
export default CSVUploader;
