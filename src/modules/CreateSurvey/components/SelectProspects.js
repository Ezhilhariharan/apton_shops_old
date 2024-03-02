import React, { Fragment, useEffect, useState } from 'react';
import { Button, Space, Tabs } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import ProspectUpLoadr from './partials/ProspectUploader';
import ExistingProspectList from './partials/ExistingProspectList';

const Wrapper = styled.div`
  margin: 3rem;
`;

const SelectProspects = ({
  onClose,
  exisitingSurveyCSVFile,
  uploadSurveyCSV,
  fromDate,
  toDate,
  surveyName,
  initializeSurvey,
  updateSurveyCSV,
}) => {
  const [csvfile, setCsvFile] = useState(null);
  const [filename, setFileName] = useState(null);

  useEffect(() => {
    if (csvfile !== null && filename !== null) {
      uploadSurveyCSV({ file_path: csvfile, file_name: filename });
    }
  }, [filename, csvfile]);

  const createSurvey = () => {
    if (fromDate && toDate && surveyName) {
      initializeSurvey(fromDate, toDate, surveyName);
    }
  };
  return (
    <Fragment>
      <Tabs defaultActiveKey="1" centered onChange={()=>{setCsvFile(null),setFileName(null)}}>
        <Tabs.TabPane tab="CSV Upload" key="1">
          <Wrapper>
            <Flex center>
              <ProspectUpLoadr
                setCsvFile={setCsvFile}
                setFileName={setFileName}
              />
            </Flex>
          </Wrapper>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Existing List" key="2">
          <ExistingProspectList
            existingCSVList={exisitingSurveyCSVFile}
            updateSurveyCSV={updateSurveyCSV}
            setCsvFile={setCsvFile}
            setFileName={setFileName}
          />
        </Tabs.TabPane>
      </Tabs>
      <Flex end style={{ padding: 20 }}>
        <Space size={'middle'}>
          <Button onClick={onClose}>Close</Button>
          <Button
            type="primary"
            onClick={createSurvey}
            disabled={filename === null}
          >
            Save
          </Button>
        </Space>
      </Flex>
    </Fragment>
  );
};
export default SelectProspects;
