import React, { useState, useEffect, useCallback } from 'react';
import { Row } from 'antd';
import PostAction from './PostAction';
import TextareaAndFileupload from './TextareaAndFileupload';
import {
  updateDynamicComment,
  fbscheduleReel,
  fbschedulePost,
  instschedulePost,
  instagramReel,
  facebookGroupPost as facebookGroup,
  twitterPost,
  pinterestBoardList,
  linkdinPost,
  pinterestPost,
  updateFileUploadLoader,
} from '../../../../../actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  StyledCard,
  ActionWrapper,
  MainWrapper,
  SocialMediaModal,
} from './Pages.style';
import { showModal } from './CreateHelper';
import { Reels, sendPost } from './PostApiValidation';
import { mediaCharacterLimit } from '../partials/StaticData';

import Chat from '../../../modals/CreateComment';
import Timer from '../../../modals/DelayTimer';
import Calendar from '../../../modals/SheduleCalender';
import View from '../../../modals/View';
import RevertCustomize from '../../../modals/RevertCustomize';
import UploadFiles from '../../../modals/UploadFiles';
//
import MediaCategory from './MediaCategory';
import Header from './CreateHeader';
import Pinterest from './PinterestTitle';
import {
  updateCreateSelectedAccounts,
  updateSocialIcon,
  updateSelectedPinterestBoard,
  updateCustomization,
  updateMediaCategoryList,
  updateActiveMediaCategory,
  updateSource,
  updateFileList,
  updateDynamicUpload,
  updateSetCharacterLimit,
  updateFeedDescription,
  openImportMedia,
  openFileType,
  updateFileRestriction,
  updateUnsplashFileList,
  updateMultiplePost,
  updateComments,
  updatePinterestTitle,
  socialMediaPopupToggle,
  socialMediaPopupName,
  updatePinterestLink,
  setSelectedDataForPopup,
  updateMinutesHours,
  updateTimeDate,
  updateDropdownList,
} from '../../../../../extendedAction';
import PinterestLinkBoard from './LinkAndBoard';
import MinimizedCard from './MinimizedCard';
import Customization from './Customization';

const Create = ({ postId, TabKey, deleteCreatePost, MinimizePost }) => {
  const [tabs, setTabType] = useState(1);
  const [uplodededFiles, setUplodededFiles] = useState([]);
  const [savedComment, setSaveComment] = useState(false);

  //redux
  const dispatch = useDispatch();
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const selectedBoard = useSelector(
    state => state?.socialMedialExtended?.selectedBoard
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  const mediaCategory = useSelector(
    state => state?.socialMedialExtended?.activeMediaCategory
  );
  const source = useSelector(state => state?.socialMedialExtended?.source);
  const fileList = useSelector(state => state?.socialMedialExtended?.fileList);
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload
  );
  const feedDiscription = useSelector(
    state => state?.socialMedialExtended?.feedDescription
  );
  const unSplashfileList = useSelector(
    state => state?.socialMedialExtended?.unsplashFileList
  );
  const addComment = useSelector(state => state?.socialMedialExtended?.Comment);
  const title = useSelector(
    state => state?.socialMedialExtended?.pinterestTitle
  );
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const presendurl = useSelector(
    state => state?.socialMedialIntegration?.sendUrl,
    shallowEqual
  );
  const CurrentUser = useSelector(state => state.authSelector?.cusrentUser);
  const destinationLink = useSelector(
    state => state?.socialMedialExtended?.pinterestLink?.link
  );
  const multiplePost = useSelector(
    state => state?.socialMedialExtended?.multiplePost,
    shallowEqual
  );
  const isModalVisible = useSelector(
    state => state?.socialMedialExtended?.modalPopupToggle
  );
  const modalname = useSelector(
    state => state?.socialMedialExtended?.modalPopupName,
    shallowEqual
  );
  const boardListOptions = useSelector(
    state => state?.socialMedialExtended?.boardList,
    shallowEqual
  );
  const minute = useSelector(
    state => state?.socialMedialExtended?.setMinutesOrHours?.apiMinute
  );
  const hours = useSelector(
    state => state?.socialMedialExtended?.setMinutesOrHours?.apiHour
  );
  const savedDelay =
    useSelector(
      state => state?.socialMedialExtended?.dynamicUpload[0]?.savedDelay
    ) || false;
  const savedShedule =
    useSelector(
      state => state?.socialMedialExtended?.dynamicUpload[0]?.savedShedule
    ) || true;
  const Time = useSelector(
    state => state?.socialMedialExtended?.setTimeAndDate?.time
  );
  const date = useSelector(
    state => state?.socialMedialExtended?.setTimeAndDate?.apiDate
  );
  const items = useSelector(state => state?.socialMedialExtended?.dropdownList);
  const localVideoSource = useSelector(
    state => state?.socialMedialExtended?.source
  );

  // const unselectAccount = data => {
  //   let filtered = selectedAccounts?.filter(item => item != data);
  //   setSelectedAccounts(filtered);
  // };

  const facebookDispatch = (...props) => dispatch(fbschedulePost(...props));
  const instagramDispatch = (...props) => dispatch(instschedulePost(...props));
  const facebookGrpDispatch = (...props) => dispatch(facebookGroup(...props));
  const PinterestDispatch = (...props) => dispatch(pinterestPost(...props));
  const linkdinDispatch = (...props) => dispatch(linkdinPost(...props));
  const twitterDispatch = (...props) => dispatch(twitterPost(...props));

  const facebookReelDispatch = (...props) => dispatch(fbscheduleReel(...props));
  const instagramReelDispatch = (...props) => dispatch(instagramReel(...props));

  useEffect(() => {
    if (presendurl) {
      setUplodededFiles(prevUploadedFiles => {
        if (Array.isArray(prevUploadedFiles)) {
          return [...prevUploadedFiles, presendurl];
        } else {
          return [presendurl];
        }
      });
      let changeDynamicPayload = [];
      if (Array.isArray(dynamicPayload)) {
        dynamicPayload?.map(data => {
          if (customize) {
            if (activeSocialIcon === data?.connection_name) {
              changeDynamicPayload.push({
                ...data,
                file_url: [...(data?.file_url || []), presendurl],
              });
            } else {
              changeDynamicPayload.push({ ...data });
            }
          } else {
            changeDynamicPayload.push({
              ...data,
              file_url: [...(data?.file_url || []), presendurl],
            });
          }
        });
      } else {
        changeDynamicPayload.push({ ...dynamicPayload });
      }
      dispatch(updateDynamicUpload(changeDynamicPayload));
    }
  }, [presendurl]);

  useEffect(() => {
    if (parseInt(selectedAccounts?.length) === 0) {
      dispatch(updateSetCharacterLimit(''));
      dispatch(updateDynamicUpload([]));
      dispatch(updateFileList([]));
      dispatch(updateFeedDescription(''));
      dispatch(updateSource(''));
      dispatch(updateDynamicUpload([]));
    } else {
      dynamicallyObj(feedDiscription, addComment, uplodededFiles, fileList);
      if (
        parseInt(selectedAccounts?.length) === 1 &&
        selectedAccounts[0] === 'Twitter'
      ) {
        dispatch(updateMediaCategoryList(['Tweet']));
        dispatch(updateActiveMediaCategory('Tweet'));
      } else if (
        parseInt(selectedAccounts?.length) === 1 &&
        selectedAccounts[0] === 'Pinterest'
      ) {
        dispatch(updateMediaCategoryList(['Pins']));
        dispatch(updateActiveMediaCategory('Pins'));
      } else if (
        (parseInt(selectedAccounts?.length) === 1 &&
          selectedAccounts[0] === 'Linkedin Pages') ||
        (parseInt(selectedAccounts?.length) === 1 &&
          selectedAccounts[0] === 'Facebook Groups')
      ) {
        dispatch(updateMediaCategoryList(['Feed']));
        dispatch(updateActiveMediaCategory('Feed'));
      } else if (
        (parseInt(selectedAccounts?.length) === 1 &&
          selectedAccounts[0] === 'Facebook') ||
        (parseInt(selectedAccounts?.length) === 1 &&
          selectedAccounts[0] === 'Instagram' &&
          source)
      ) {
        dispatch(updateMediaCategoryList(['Feed', 'Reels']));
        dispatch(updateActiveMediaCategory('Feed'));
      }
    }
    selectedAccounts?.length < 2 && dispatch(updateCustomization(false));
  }, [selectedAccounts]);

  useEffect(() => {
    if (activeSocialIcon) {
      dynamicPayload?.map(data => {
        const Fileurl = data?.file_url;
        const Extension = Fileurl?.url?.split('.').pop();
        if (activeSocialIcon === data?.connection_name) {
          dispatch(updateFeedDescription(data?.message));
          dispatch(
            updateFileList(Extension !== 'mp4' ? data?.localFileList : '')
          );
          setUplodededFiles(Extension === 'mp4' ? [Fileurl] : data?.file_url);
          dispatch(updateComments(data?.comment));
          if (data?.comment) dispatch(updateDynamicComment(data?.comment));
          else dispatch(updateDynamicComment(' '));
          dispatch(updateSetCharacterLimit(data?.characterLimit));
          dispatch(
            updateSource(
              data?.videoSource
                ? data?.videoSource
                : Extension === 'mp4' && Fileurl?.url
            )
          );
        }
      });
      const find = selectedAccounts?.find(item => activeSocialIcon === item);
      if (find) {
        if (activeSocialIcon === 'Twitter') {
          dispatch(updateMediaCategoryList(['Tweet']));
          dispatch(updateActiveMediaCategory('Tweet'));
        } else if (activeSocialIcon === 'Pinterest') {
          dispatch(updateMediaCategoryList(['Pins']));
          dispatch(updateActiveMediaCategory('Pins'));
        } else if (
          activeSocialIcon === 'Linkedin Pages' ||
          activeSocialIcon === 'Facebook Groups'
        ) {
          dispatch(updateMediaCategoryList(['Feed']));
          dispatch(updateActiveMediaCategory('Feed'));
        } else if (
          activeSocialIcon === 'Facebook' ||
          activeSocialIcon === 'Instagram'
        ) {
          dispatch(updateMediaCategoryList(['Feed', 'Reels']));
          if (activeSocialIcon === 'Facebook') {
            dynamicPayload?.map(data => {
              if (data?.mediaCategory) {
                if (data?.connection_name === 'Facebook') {
                  dispatch(updateActiveMediaCategory('Feed'));
                }
              }
            });
          } else if (activeSocialIcon === 'Instagram') {
            dynamicPayload?.map(data => {
              if (data?.mediaCategory) {
                if (data?.connection_name === 'Instagram') {
                  dispatch(updateActiveMediaCategory(data?.mediaCategory));
                }
              }
            });
          } else dispatch(updateActiveMediaCategory('Feed'));
        }
      } else dispatch(updateMediaCategoryList([]));
    }
  }, [activeSocialIcon]);

  useEffect(() => {
    dispatch(pinterestBoardList());
    setTabType(1);
  }, []);

  useEffect(() => {
    if (customize) {
      if (dynamicPayload?.length <= 0) {
        dynamicallyObj(feedDiscription, addComment, uplodededFiles, fileList);
      }
    }
  }, [customize]);

  useEffect(() => {
    if (tabs === 1) {
      dispatch(updateFileUploadLoader(false));
    } else if (parseInt(tabs) == 3) {
      dispatch(openFileType('video'));
    }
  }, [tabs]);

  // COMMON FUNCTIONS

  const dynamicallyObj = (discription, comments, files, localFiles) => {
    let mediaPostObj = [];
    let filePath = [];
    let postObj = {
      message: '',
      comment: '',
      file_url: [],
      file: [],
      localFileList: [],
    };
    files &&
      files?.forEach(item => {
        filePath.push(item);
      });

    if (customize) {
      const addedData = selectedAccounts?.filter(
        id1 => !dynamicPayload?.some(({ connection_name: id2 }) => id2 === id1)
      );
      const charLimit = mediaCharacterLimit?.find(
        limit => limit?.title === addedData.join()
      );
      if (addedData?.length > 0) {
        if (charLimit?.title === 'Pinterest') {
          let newObj = Object.assign(postObj, {
            connection_name: charLimit?.title,
            characterLimit: charLimit?.characterLimit,
            videoSource: localVideoSource,
            title: title,
            destinationLink: '',
            selectedBoard: '',
            savedComment: false,
            savedDelay: savedDelay,
            savedShedule: savedShedule,
          });
          dispatch(updateDynamicUpload([...dynamicPayload, newObj]));
        } else if (
          charLimit?.title === 'Instagram' ||
          charLimit?.title === 'Facebook'
        ) {
          let newObj = Object.assign(postObj, {
            connection_name: charLimit?.title,
            characterLimit: charLimit?.characterLimit,
            videoSource: localVideoSource,
            savedComment: false,
            savedDelay: savedDelay,
            savedShedule: savedShedule,
          });
          dispatch(updateDynamicUpload([...dynamicPayload, newObj]));
        } else {
          let newObj = Object.assign(postObj, {
            connection_name: charLimit?.title,
            characterLimit: charLimit?.characterLimit,
            videoSource: localVideoSource,
            savedComment: false,
            savedDelay: savedDelay,
            savedShedule: savedShedule,
          });
          dispatch(updateDynamicUpload([...dynamicPayload, newObj]));
        }
      } else {
        const addedData = dynamicPayload?.filter(
          ({ connection_name: id1 }) =>
            !selectedAccounts?.some(id2 => id2 === id1)
        );
        let connectionName = addedData ? addedData[0]?.connection_name : '';

        const newState = dynamicPayload?.filter(
          data => data?.connection_name != connectionName
        );
        dispatch(updateDynamicUpload([...newState]));
      }
    } else {
      selectedAccounts?.forEach(item => {
        mediaCharacterLimit.map(limit => {
          if (limit.title === item) {
            parseInt(selectedAccounts?.length) === 1 &&
              dispatch(updateSetCharacterLimit(limit.characterLimit));
            if (limit.title === item && limit.title === 'Pinterest') {
              mediaPostObj.push({
                message: discription,
                comment: comments,
                file_url: filePath,
                file: [],
                localFileList: localFiles ? localFiles : [],
                connection_name: item,
                characterLimit: limit?.characterLimit,
                videoSource: localVideoSource,
                title: title,
                destinationLink: destinationLink,
                selectedBoard: selectedBoard,
                savedComment: savedComment,
                savedDelay: savedDelay,
                savedShedule: savedShedule,
              });
            } else {
              if (
                (item === 'Instagram' && limit?.title === 'Instagram') ||
                (item === 'Facebook' && limit?.title === 'Facebook')
              ) {
                mediaPostObj.push({
                  message: discription,
                  comment: comments,
                  file_url: filePath,
                  file: [],
                  localFileList: localFiles ? localFiles : [],
                  connection_name: item,
                  characterLimit: limit?.characterLimit,
                  mediaCategory: mediaCategory,
                  videoSource: localVideoSource,
                  savedComment: savedComment,
                  savedDelay: savedDelay,
                  savedShedule: savedShedule,
                });
              } else {
                mediaPostObj.push({
                  message: discription,
                  comment: comments,
                  file_url: filePath,
                  file: [],
                  localFileList: localFiles ? localFiles : [],
                  connection_name: item,
                  characterLimit: limit.characterLimit,
                  videoSource: localVideoSource,
                  savedComment: savedComment,
                  savedDelay: savedDelay,
                  savedShedule: savedShedule,
                });
              }
            }
          }
        });
      });
      dispatch(updateDynamicUpload(mediaPostObj));
    }
  };

  // REMOVING OR DELETING FLOW
  // const exitAccount = item =>
  //   exitingAccounts(
  //     item,
  //     items,
  //     selectedAccounts,
  //     setSelectedAccounts,
  //     // setFilteredDropdownList,
  //     setDynamicPayload
  //   );

  const settingInitialState = () => {
    dispatch(updateDynamicUpload([]));
    dispatch(updateFeedDescription(null));
    setUplodededFiles([]);
    dispatch(updateFileList([]));
    dispatch(updateUnsplashFileList([]));
    dispatch(updateSource(''));
    dispatch(
      updateMinutesHours({
        minute: '',
        apiMinute: '',
        hour: '',
        apiHour: '',
      })
    );
    dispatch(updateComments(null));
    dispatch(openImportMedia(null));
    dispatch(openFileType('image'));
    dispatch(updateFileRestriction('.jpeg,.jpg,.mp4,.png'));
    dispatch(updateSocialIcon(null));
    dispatch(updateCustomization(null));
    dynamicallyObj(null, null, null, null);
    dispatch(updateDynamicComment(null));
    dispatch(updatePinterestTitle(null));
    dispatch(updatePinterestLink(null));
    dispatch(updateSelectedPinterestBoard([]));
    dispatch(updateCreateSelectedAccounts([]));
    dispatch(
      updateTimeDate({
        time: '',
        date: '',
        apiDate: '',
      })
    );
    const arrayVal = [];
    items?.map(data => arrayVal.push({ ...data, checked: false }));
    dispatch(updateDropdownList(arrayVal));
    dispatch(
      setSelectedDataForPopup({
        platform_type: '',
        file_url: '',
        message: '',
        type: '',
      })
    );
  };

  const clearDetails = Data => {
    if (Data) {
      settingInitialState();
    } else {
      if (customize) {
        let changeDynamicPayload = [];
        dynamicPayload?.map(data => {
          if (activeSocialIcon == data.connection_name) {
            changeDynamicPayload.push({
              ...data,
              message: '',
              comment: '',
              file_url: [],
              file: [],
              localFileList: [],
              connection_name: activeSocialIcon,
            });
          } else changeDynamicPayload.push({ ...data });
        });

        dispatch(updateDynamicUpload(changeDynamicPayload));
        dispatch(updateFeedDescription(''));
        dispatch(updateFileList([]));
        dispatch(updateComments(''));
        dispatch(updateDynamicComment(''));
        dispatch(updateSource(''));
        dispatch(
          updateTimeDate({
            time: '',
            date: '',
            apiDate: '',
          })
        );
      } else {
        settingInitialState();
      }
    }
  };

  // MODAL
  const openModal = value => {
    showModal(
      value,
      uplodededFiles,
      selectedAccounts,
      feedDiscription,
      tabs,
      customize,
      activeSocialIcon,
      dynamicPayload,
      dispatch
    );
    dispatch(socialMediaPopupName(value));
  };

  const cancelModal = () => {
    dispatch(socialMediaPopupName(null));
    dispatch(socialMediaPopupToggle(false));

    dispatch(
      setSelectedDataForPopup({
        platform_type: '',
        file_url: '',
        message: '',
        type: '',
      })
    );
  };

  // API CALL
  const post = name =>
    sendPost(
      name,
      selectedAccounts,
      priceValidation,
      dynamicPayload,
      facebookDispatch,
      instagramDispatch,
      facebookGrpDispatch,
      linkdinDispatch,
      twitterDispatch,
      PinterestDispatch,
      // setTime,
      // setDate,
      Time,
      date,
      clearDetails,
      openModal,
      // setModalname,
      minute,
      hours,
      CurrentUser,
      brand,
      selectedBoard,
      boardListOptions,
      destinationLink,
      customize,
      deleteCreatePost,
      postId,
      // multiplePost,
      savedShedule,
      savedDelay,
      fileList,
      unSplashfileList,
      dispatch
    );
  //  dispatch(socialMediaPopupName(value))

  const sendReels = name =>
    Reels(
      name,
      selectedAccounts,
      priceValidation,
      dynamicPayload,
      facebookReelDispatch,
      instagramReelDispatch,
      clearDetails,
      openModal,
      // setModalname,
      minute,
      hours,
      CurrentUser,
      brand,
      postId,
      // multiplePost,
      savedShedule,
      savedDelay,
      Time,
      date,
      dispatch
    );

  const minimizePost = useCallback(id => {
    let updatedPost = [];
    multiplePost?.map(post => {
      if (post?.id === id) {
        if (post.minimize) updatedPost.push({ ...post, minimize: false });
        else updatedPost.push({ ...post, minimize: true });
      }
    });
    dispatch(updateMultiplePost(updatedPost));
  });

  const addMultiplePost = () => {
    var updatedPost = [
      ...multiplePost,
      { id: postId?.id + 1, minimize: false },
    ];
    dispatch(updateMultiplePost(updatedPost));
  };
  return (
    <MainWrapper>
      <Header />
      {postId?.minimize ? (
        <MinimizedCard postId={postId?.id} minimizePost={minimizePost} />
      ) : (
        <StyledCard>
          <Row className="MB">
            <MediaCategory />
            <Customization />
          </Row>
          <Pinterest />
          <TextareaAndFileupload
            tabs={tabs}
            uplodededFiles={uplodededFiles}
            dynamicallyObj={dynamicallyObj}
            setUplodededFiles={setUplodededFiles}
          />
          <PinterestLinkBoard />
          <ActionWrapper>
            <PostAction
              openModal={openModal}
              clearDetails={clearDetails}
              tabs={tabs}
              post={post}
              sendReels={sendReels}
            />
          </ActionWrapper>
        </StyledCard>
      )}
      <SocialMediaModal
        bodyStyle={{ borderRadius: '10px' }}
        mask={false}
        open={isModalVisible}
        maskClosable={false}
        onCancel={cancelModal}
        okText={'Save'}
        footer={false}
        centered={true}
      >
        {modalname === 'Chat' && (
          <Chat create="create" setSaveComment={setSaveComment} />
        )}
        {modalname === 'Timer' && <Timer />}
        {modalname === 'Calendar' && (
          <Calendar
            tabs={tabs}
            post={post}
            sendReels={sendReels}
            cancel={cancelModal}
          />
        )}
        {modalname === 'Eye' && <View />}
        {modalname === 'Revert' && <RevertCustomize />}
        {modalname === 'UploadFiles' && <UploadFiles />}
      </SocialMediaModal>

      {/* {multiplePost[multiplePost.length - 1].id == postId?.id && (
        <Flex center>
          <Tooltip placement="top" title={'Coming soon'}>
            <AddPost
              icon={<FormOutlined />}
              onClick={() => addMultiplePost()}
              disabled={buttonValidation()}
            >
              Add Post
            </AddPost>
          </Tooltip>
        </Flex>
      )} */}
    </MainWrapper>
  );
};
export default Create;
