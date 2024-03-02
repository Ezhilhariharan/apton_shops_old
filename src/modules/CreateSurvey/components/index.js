import React, { Fragment, useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import surveyBackground from '@public/surveybg.png';
import Headers from './partials/Headers';
import ReactFlowControll from './ReactFlowControll';
import dayjs from 'dayjs';

export const BackgroundWrapper = styled.div`
  width: 100%;
  height: 90vh;
  background: url(${surveyBackground});
  background-size: cover;
  background-color: #eef4fa;
`;

const Wrapper = styled.div`
  margin-top: 5;
`;



const CreateSurvey = ({
  updateNodeList,
  nodeList,
  nodeEdges,
  updateEdges,
  surveyTempaltes,
  surveyCSVFile,
  exisitingSurveyCSVFile,
  surveyInfo,
  surveyMode,
  surveyBotDetails,
  whatsAppSurveyList,
  openBotDrawer,
  drawerTitle,
  // API
  fetchSurveyTemplates,
  uploadSurveyCSV,
  fetchExistingSurveyCSVFiles,
  initializeSurvey,
  updateSurveyCSV,
  fetchSuerveyBotDetailes,
  createBot,
  updateBotDrawer,
  updateDrawerTitile,
  deleteNodeId,
  updateBot
}) => {
  const startDate = dayjs().startOf('date').format('YYYY-MM-DDTHH:mm');
  const endDate = dayjs().endOf('date').format('YYYY-MM-DDTHH:mm');
  const [fromDate, setFromDate] = useState(startDate);
  const [toDate, setToDate] = useState(endDate);
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [surveyName, setSurveyName] = useState( surveyMode==="edit"?surveyBotDetails?.name:`Chat_bot_${whatsAppSurveyList?.survey_bots?.length+1}`);

  useEffect(() => {
    if(surveyMode==='edit'){
      fetchSuerveyBotDetailes()
    }
    fetchSurveyTemplates();
    // fetchExistingSurveyCSVFiles();
  }, []);
  return (
    <Fragment>
      <Headers
        setFromDate={setFromDate}
        setToDate={setToDate}
        fromDate={fromDate}
        toDate={toDate}
        fromTime={fromTime}
        setFromTime={setFromTime}
        toTime={toTime}
        setToTime={setToTime}
        setSurveyName={setSurveyName}
        surveyName={surveyName}
        createBot={createBot}
        surveyMode={surveyMode}
        disbleButtons={nodeList &&nodeList[0]?.data?.data===null?true:false}
        updateBot={updateBot}
        surveyBotDetails={surveyBotDetails}
      />
      <Wrapper>
        <ReactFlowControll
         updateSurveyCSV={updateSurveyCSV}
         updateNodeList={updateNodeList}
         nodeList={nodeList}
         updateEdges={updateEdges}
         disbleButtons={nodeList &&nodeList[0]?.data?.data===null?true:false}
         surveyMode={surveyMode}
         surveyBotDetails={surveyBotDetails}
         updateBotDrawer={updateBotDrawer}
         openBotDrawer={openBotDrawer}
         drawerTitle={drawerTitle}
         updateDrawerTitile={updateDrawerTitile}
         deleteNodeId={deleteNodeId}
        />
      </Wrapper>
    </Fragment>
  );
};
export default CreateSurvey;
