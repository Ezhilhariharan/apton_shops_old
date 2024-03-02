import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import CSVUploader from './CSVUploader';
import Flex from '@components/common/Flex';
import ExistingCSVList from './ExistingCSVList';

const Wrapper = styled.div`
  margin: 3rem;
`;

const TabSection = ({
  uploadWhatsAppCSV,
  uploadExistingWhatsAppCSV,
  existingCSVList,
  whatsApp_CSV_Url,
  updateWhatsAppCSV,
  setCsvFiles,
  setFilePathError,
  campaginDetails,
  setCamapaign,
  selectedWhatsAppCampagin,
  fetchCampaginDetails,
  setStatus,
  setEXistingFile,
  setTab,
  sheduleSteeings,
  tab,
  setNewFileName,
  setSelectedRowKeys,
  selectedRowKeys,
  setProspectsCount,
}) => {
  const [csvfile, setCsvFile] = useState('');
  const [existingCsvfile, setexistingCsvfile] = useState('');
  const [filename, setFileName] = useState('');
  useEffect(() => {
    if (csvfile && filename) {
      // uploadWhatsAppCSV({ file_path: csvfile, file_name: filename });
    }
    if (existingCsvfile) {
      uploadExistingWhatsAppCSV({ file_path: existingCsvfile });
      setEXistingFile(existingCsvfile);
    }
    setNewFileName(filename);
  }, [csvfile, existingCsvfile]);

  useEffect(() => {
    setTab('1');
  }, []);

  const tabChanging = key => {
    setTab(key);
  };
  return (
    <Tabs
      defaultActiveKey={tab}
      centered
      onTabClick={() => {
        updateWhatsAppCSV(null);
      }}
      onChange={tabChanging}
    >
      <Tabs.TabPane tab="CSV Upload" key="1">
        <Wrapper>
          <Flex center>
            <CSVUploader
              setCsvFile={setCsvFile}
              setFileName={setFileName}
              whatsApp_CSV_Url={whatsApp_CSV_Url}
              uploadWhatsAppCSV={uploadWhatsAppCSV}
              setCsvFiles={setCsvFiles}
              setFilePathError={setFilePathError}
              campaginDetails={campaginDetails}
              fetchCampaginDetails={fetchCampaginDetails}
              setCamapaign={setCamapaign}
              selectedWhatsAppCampagin={selectedWhatsAppCampagin}
              setStatus={setStatus}
              sheduleSteeings={sheduleSteeings}
              setProspectsCount={setProspectsCount}
            />
          </Flex>
        </Wrapper>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Existing List" key="2">
        <ExistingCSVList
          existingCSVList={existingCSVList}
          uploadExistingWhatsAppCSV={uploadExistingWhatsAppCSV}
          updateWhatsAppCSV={updateWhatsAppCSV}
          whatsApp_CSV_Url={whatsApp_CSV_Url}
          setCsvFiles={setCsvFiles}
          setCsvFile={setexistingCsvfile}
          setFilePathError={setFilePathError}
          setSelectedRowKeys={setSelectedRowKeys}
          selectedRowKeys={selectedRowKeys}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};
export default TabSection;
