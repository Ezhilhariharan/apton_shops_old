import { connect } from 'react-redux';
import CreateSurvey from '../components';
import createSurveySelector from '../selectors';
import surveyCampaginSelector from '@modules/SurveyCampagin/selectors.js';
import {
  updateNodeList,
  updateEdges,
  fetchSurveyTemplates,
  uploadSurveyCSV,
  fetchExistingSurveyCSVFiles,
  initializeSurvey,
  updateSurveyCSV,
  updateMode,
  fetchSuerveyBotDetailes,
  surveyMediaUpload,
  saveResponseTemplates,
  createBot,
  updateBotDrawer,
  updateDrawerTitile,
  deleteNodesById,
  updateBot
} from '../actions';

const mapStateToProps = state => ({
  whatsAppSurveyList: surveyCampaginSelector.getWhatsAppSurvyCampaginList(state),
  nodeList: createSurveySelector.getNodeList(state),
  nodeEdges: createSurveySelector.getNodeEdges(state),
  surveyTempaltes: createSurveySelector.getSurveyTemplates(state),
  surveyCSVFile: createSurveySelector.getSurveyCSVfile(state),
  exisitingSurveyCSVFile: createSurveySelector.getExistingCSVList(state),
  surveyInfo: createSurveySelector.getSurveyInfo(state),
  surveyBotDetails: createSurveySelector.getSurveyBotDetails(state),
  surveyMode: createSurveySelector.getSurveyMode(state),
  headerMedia: createSurveySelector.getHeaderMedia(state),
  openBotDrawer:createSurveySelector.getopenBotDrawer(state),
  drawerTitle: createSurveySelector.getDrawerTitle(state),
  deleteNodeId:createSurveySelector.getDeleteNodeId(state)
});

const mapDispatchToProps = {
  updateNodeList,
  updateEdges,
  fetchSurveyTemplates,
  uploadSurveyCSV,
  fetchExistingSurveyCSVFiles,
  initializeSurvey,
  updateSurveyCSV,
  updateMode,
  fetchSuerveyBotDetailes,
  surveyMediaUpload,
  saveResponseTemplates,
  createBot,
  updateBotDrawer,
  updateDrawerTitile,
  deleteNodesById,
  updateBot
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);
