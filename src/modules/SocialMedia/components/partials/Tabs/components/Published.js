import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Card, Row, Col, Modal, Spin } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import {
  updateFb_Inst_Actions,
  setActivePost,
  getFbPublishedList as getPublishedList,
  deleteShedulePost,
  fbInstaAction,
} from '../../../../actions';
import PostHeader from './partials/PostHeader';
import PostDescription from './partials/PostDescription';
import PostMedia from './partials/PostMedia';
import CreatePost from './partials/CreatePost';
import {
  leftSideActions,
  rightSideActions,
} from '../components/partials/StaticData';
import { setSelectedDataForPopup } from '../../../../extendedAction';

import View from '../../modals/View';
import InSights from '../../modals/InSights';
import Likes from '../../modals/Likes';
import Comments from '../../modals/Comments';

import Flex from '@components/common/Flex';

const Cards = styled(Card)`
  width: 100%;
  background: #ffffff;
  border: 1px solid #f4f4f5;
  border-radius: 10px;
  margin-bottom: 20px;
  #videoStyle {
    border-radius: 10px;
    margin: 10px 0 10px 0;
    cursor: pointer;
  }
  .actionsCount {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #4d4d4d;
    .icons {
      height: 10px;
    }
  }
  .description {
    padding-top: 25px;
    padding-left: 10px;
  }
  .fotter {
    margin-top: 15px;
  }
  .likesIcon {
    margin: 0px 10px 0px 10px;
    height: 30px;
  }
  .rightAction {
    margin: 0px 10px 0px 10px;
  }
  .cursor {
    cursor: pointer;
  }
`;
const Linespan = styled.span`
  border-left: 1px solid #d9d9d9;
  margin: 0px 10px 0px 10px;
  height: 30px;
`;

const Leftlinespan = styled.span`
  border-left: 1px solid #d9d9d9;
  margin: 0px 10px 0px 10px;
  height: 30px;
  margin-top: 5px;
`;

export const SocialMediaModal = styled(Modal)`
  .ant-modal-content {
    width: 600px;
    border-radius: 20px;
  }
`;
const Wrapper = styled.div`
  height: 72vh;
  overflow-y: scroll;
  width: 100%;
`;

export const Title = styled.div`
  width: 100%;
  height: auto;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 133.33%;
  color: #050505;
`;
export const Link = styled.div`
  width: 100%;
  height: auto;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 6px;
  line-height: 133.33%;
  color: #4aacea;
`;

const Published = () => {
  const scrollingRef = useRef();
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [list, setList] = useState([]);
  const [commentData, setCommentModal] = useState('');
  const [modalName, setModalName] = useState([]);
  const [postId, setPostId] = useState('');
  const [postData, setPostData] = useState('');
  const dispatch = useDispatch();

  const publishedList = useSelector(
    state => state?.socialMedialIntegration?.FbPublishedList,
    shallowEqual
  );
  const loader = useSelector(
    state => state?.socialMedialIntegration?.loader,
    shallowEqual
  );
  const SocialMediaCount = useSelector(
    state => state?.socialMedialIntegration?.SocialMediaCount,
    shallowEqual
  );
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.selectedAccounts,
    shallowEqual
  );
  const platforms = useSelector(
    state => state?.socialMedialExtended?.availablePlatforms,
    shallowEqual
  );
  const buttonState = useSelector(
    state => state.socialMedialIntegration.buttons
  );
  const selectedData = useSelector(
    state => state?.socialMedialExtended?.selectedPopupData,
    shallowEqual
  );

  useEffect(() => {
    setList([]);
  }, [selectedAccounts]);

  useEffect(() => {
    const combinedList = [...list, ...publishedList];
    const uniqueArray = combinedList?.filter(
      (obj, index, arr) => arr?.findIndex(t => t?.id === obj?.id) === index
    );
    setList(uniqueArray);
  }, [publishedList]);

  let convert = [];
  useEffect(() => {
    if (buttonState == 'Published') {
      dispatch(getPublishedList(platforms, page));

      if (SocialMediaCount?.publish_count > 0)
        dispatch(setActivePost('PUBLISHED'));
    }
  }, [selectedAccounts, buttonState, platforms]);

  const setModalData = data => {
    dispatch(
      setSelectedDataForPopup({
        platform_type: data?.platform_type,
        file_url: data?.response_message?.file_url,
        message:
          data?.response_message?.message ||
          data?.response_message?.description,
        title: data?.response_message?.title,
        link: data?.response_message?.link,
        type: 'view',
        postType: data?.response_message?.post_type,
        pageName: data?.response_message?.page_name
          ? data?.response_message?.page_name
          : data?.response_message?.group_name,
      })
    );
    setModalName('view');
    setIsModalVisible(true);
  };

  const settingModal = (data, postDetails) => {
    dispatch(updateFb_Inst_Actions({}));
    setPostId(postDetails?.id);
    if (postDetails?.platform_type !== 'Instagram') {
      dispatch(fbInstaAction(postDetails?.id, data));
      setModalName(data);
      setPostData(postDetails);
      convert = selectedAccounts?.join();

      if (selectedAccounts?.length != 0) dispatch(getPublishedList(platforms));
      else dispatch(getPublishedList(platforms));

      setIsModalVisible(true);
    } else {
      if (data !== 'likes') {
        dispatch(fbInstaAction(postDetails?.id, data));
        setModalName(data);
        setPostData(postDetails);
        convert = selectedAccounts?.join();
        const filteredData = Object.fromEntries(
          Object.entries(platforms).filter(([key, value]) => {
            const platformName = value.platform_name;
            return convert?.includes(platformName);
          })
        );
        if (selectedAccounts?.length != 0)
          dispatch(getPublishedList(platforms));
        else dispatch(getPublishedList(platforms));

        setIsModalVisible(true);
      } else {
        setPostData(postDetails);
      }
    }
  };

  // const settingModal = useCallback((data, postDetails) => {
  //     dispatch(updateFb_Inst_Actions({}));
  //   setPostId(postDetails?.id);
  //   if (postDetails?.platform_type !== 'Instagram') {
  //     fbInstaAction(postDetails?.id, data);
  //     setModalName(data);
  //     setPostData(postDetails);
  //     convert = selectedAccounts?.join();
  //     if (selectedAccounts?.length != 0) dispatch(getPublishedList(convert));
  //     else dispatch(getPublishedList(platforms));
  //     setIsModalVisible(true);
  //   } else {
  //     if (data !== 'likes') {
  //       fbInstaAction(postDetails?.id, data);
  //       setModalName(data);
  //       setPostData(postDetails);
  //       convert = selectedAccounts?.join();
  //       const filteredData = Object.fromEntries(
  //         Object.entries(platforms).filter(([key, value]) => {
  //           const platformName = value.platform_name;
  //           return convert?.includes(platformName);
  //         })
  //       );
  //       if (selectedAccounts?.length != 0)
  //         dispatch(getPublishedList(filteredData));
  //       else dispatch(getPublishedList(platforms));

  //       setIsModalVisible(true);
  //     } else {
  //       setPostData(postDetails);
  //     }
  //   }
  // },[selectedAccounts,platforms])

  const closeModal = () => {
    dispatch(
      setSelectedDataForPopup({
        platform_type: '',
        file_url: [],
        message: '',
        type: '',
        postType: '',
      })
    );
    setIsModalVisible(false);
    setCommentModal([]);
    setModalName('');
    setPostId('');
  };

  const reDirect = (data, value) => {
    if (value == 'post') {
      data?.post_link && window.open(data?.post_link, '_blank');
    } else {
      data?.group_link && window.open(data?.group_link, '_blank');
      data?.page_link && window.open(data?.page_link, '_blank');
    }
  };

  const handleScroll = () => {
    if (scrollingRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollingRef?.current;
      if (
        Math.round(scrollTop) + parseInt(clientHeight) >=
          parseInt(scrollHeight) &&
        list?.length >= 5
      ) {
        let increasedPage = page + 1;
        setPage(increasedPage);
        dispatch(getPublishedList(platforms, increasedPage));
      }
    }
  };

  const deletePost = id =>
    dispatch(
      deleteShedulePost(id, selectedAccounts?.join(), platforms, 'Published')
    );

  const likesIcon = (item, actions) => {
    if (item?.platform_type == 'Instagram' && actions?.name == 'likes')
      return <>{actions?.instaIcon}</>;
    else if (
      item?.platform_type == 'Linkedin Pages' &&
      actions?.name == 'likes'
    )
      return <>{actions?.linkdinIcon}</>;
    else return <> {actions?.icon}</>;
  };

  const verticalLineValidation = (item, actions) => {
    if (item?.platform_type === 'Facebook Groups' && actions?.name === 'Clear')
      return false;
    else if (
      item?.platform_type === 'Linkedin Pages' &&
      actions?.name === 'Clear'
    )
      return false;
    else if (item?.platform_type === 'Twitter' && actions?.name === 'Clear')
      return false;
    else return true;
  };
  return (
    <Spin spinning={loader}>
      <Wrapper onScroll={handleScroll} ref={scrollingRef}>
        {list?.length > 0 ? (
          list?.map(item => {
            let date = item?.post_date?.split('T')[0];
            let Time = item?.post_date?.split('T')[1];
            let postDate = new Date(
              date?.split('-')[0],
              date?.split('-')[1] - 1,
              date?.split('-')[2],
              Time?.split(':')[0],
              Time?.split(':')[1]
            );
            return (
              <Cards key={item?.id}>
                <Row>
                  <PostHeader
                    item={item}
                    postDate={postDate}
                    tabType="Published"
                  />
                  <Col span={24} className="description">
                    {item?.platform_type === 'Pinterest' && (
                      <Title>{item?.response_message?.title}</Title>
                    )}
                    {item?.platform_type === 'Pinterest' && (
                      <Link>{item?.response_message?.link}</Link>
                    )}
                    <PostDescription item={item} tabType="Published" />
                  </Col>
                  <PostMedia item={item} tabType="Published" />
                  <Col span={24}>
                    <Flex spaceBetween className="fotter">
                      <Row>
                        {item?.platform_type === 'Pinterest' ||
                        item?.platform_type === 'Twitter'
                          ? ''
                          : leftSideActions.map(actions => {
                              const array = leftSideActions;
                              const final = array[array.length - 1];
                              return (
                                // <LikesComment key={actions?.id} item={item} final={final} settingModal={settingModal}  />
                                <Row key={actions?.id}>
                                  <div>
                                    <div
                                      className="likesIcon cursor"
                                      onClick={() =>
                                        settingModal(actions?.name, item)
                                      }
                                    >
                                      {likesIcon(item, actions)}{' '}
                                    </div>
                                    <div className="actionsCount ">
                                      {actions?.name == 'likes'
                                        ? item?.likes || 0
                                        : actions?.name == 'comments'
                                        ? item?.comments || 0
                                        : ''}{' '}
                                      {actions?.name == 'likes'
                                        ? 'likes'
                                        : actions?.name == 'comments'
                                        ? 'comments'
                                        : ''}
                                    </div>
                                  </div>
                                  {actions?.name === final?.name ? (
                                    <span></span>
                                  ) : (
                                    <Leftlinespan></Leftlinespan>
                                  )}
                                </Row>
                              );
                            })}
                      </Row>
                      <Row>
                        {rightSideActions.map(actions => {
                          const array = rightSideActions;
                          const final = array[array.length - 1];
                          if (
                            ((item?.platform_type === 'Linkedin Pages' ||
                              item?.platform_type == 'Pinterest' ||
                              item?.platform_type === 'Twitter' ||
                              item?.platform_type === 'Facebook Groups') &&
                              actions?.name === 'insights') ||
                            ((item?.platform_type === 'Instagram' ||
                              item?.platform_type === 'Facebook') &&
                              item?.response_message?.post_type !== 'POST' &&
                              actions?.name === 'insights')
                          ) {
                            return null;
                          } else {
                            let showVerticalLine = verticalLineValidation(
                              item,
                              actions
                            );
                            return (
                              <React.Fragment key={actions?.id}>
                                <div
                                  className="rightAction cursor"
                                  onClick={() =>
                                    actions?.name === 'preview'
                                      ? setModalData(item)
                                      : actions?.name === 'Clear'
                                      ? deletePost(item?.id)
                                      : settingModal(actions?.name, item)
                                  }
                                >
                                  {(item?.platform_type === 'Linkedin Pages' ||
                                    item?.platform_type == 'Pinterest' ||
                                    item?.platform_type === 'Twitter' ||
                                    item?.platform_type ===
                                      'Facebook Groups') &&
                                  actions?.name === 'insights'
                                    ? null
                                    : (item?.platform_type === 'Instagram' ||
                                        item?.platform_type === 'Facebook') &&
                                      item?.response_message?.post_type !==
                                        'POST' &&
                                      actions?.name === 'insights'
                                    ? null
                                    : actions?.icon}
                                </div>
                                {actions?.name === final?.name ? (
                                  <span></span>
                                ) : (
                                  showVerticalLine && <Linespan></Linespan>
                                )}
                              </React.Fragment>
                            );
                          }
                        })}
                      </Row>
                    </Flex>
                  </Col>
                </Row>
              </Cards>
            );
          })
        ) : (
          <CreatePost />
        )}
        <SocialMediaModal
          bodyStyle={{ borderRadius: '10px' }}
          mask={false}
          open={isModalVisible}
          onCancel={closeModal}
          okText={'Save'}
          footer={false}
          maskClosable={false}
          centered={true}
        >
          {modalName === 'view' && <View data={selectedData} />}
          {modalName === 'likes' && <Likes postData={postData} />}
          {modalName === 'comments' && (
            <Comments
              postData={postData}
              postId={postId}
              postType={modalName}
            />
          )}
          {modalName === 'insights' && <InSights postData={postData} />}
        </SocialMediaModal>
      </Wrapper>
    </Spin>
  );
};

export default Published;
