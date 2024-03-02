import { connect } from 'react-redux';
import SocialMedia from '../components/index';
import {
    getFbPublishedList, getFbScheduledList, getFbFailedList,
    fbschedulePost, fbscheduleReel, uploadfile, instschedulePost,
    commentPost, editFacebook, instagramReel, deleteShedulePost, pinterestPost,
    facebookGroupPost, fbInstaAction,commentPostAPI,linkdinPost,twitterPost,
    pinterestBoardList,preSendURl
} from "../actions";
import { getSocialMediaList } from "../../NewIntegration/actions";
import socialMedialIntegration from "../selectors";
import integrationSelector from '../../NewIntegration/selectors';
import { getCurrentUserInfo } from '../../Auth/actions';
import authSelector from '../../Auth/selectors';

//import Authselector from root reducer
const mapStateToProps = state => ({
    fbPublishedList: socialMedialIntegration.getFbPostPublishedList(state),
    fbScheduledList: socialMedialIntegration.getFBPostScheduledList(state),
    fbFailedList: socialMedialIntegration.getFBPostFailedList(state),
    schedulePost: socialMedialIntegration.getFbSchedulePost(state),
    scheduleReel: socialMedialIntegration.getFbScheduleReel(state),
    fileupload: socialMedialIntegration.getFileupload(state),
    getInstFileupload: socialMedialIntegration.getInstFileupload(state),
    socialMediaList: integrationSelector.getBrandSocialMediaList(state),
    CurentUser: authSelector.getCurentUser(state),
});

const mapDispatchToProps = {
    getFbPublishedList,
    getFbScheduledList,
    getFbFailedList,
    fbschedulePost,
    fbscheduleReel,
    getSocialMediaList,
    getCurrentUserInfo,
    instschedulePost,
    commentPost,
    editFacebook,
    instagramReel,
    facebookGroupPost,
    deleteShedulePost,
    fbInstaAction,
    commentPostAPI,
    twitterPost,
    linkdinPost,
    pinterestBoardList,
    pinterestPost,
    preSendURl
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia);
