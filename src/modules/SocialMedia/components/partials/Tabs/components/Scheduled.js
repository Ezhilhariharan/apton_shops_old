import React, { useEffect, useState, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Card, Row, Col, Button, Modal, Spin } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import PostHeader from './partials/PostHeader';
import PostDescription from './partials/PostDescription';
import PostMedia from './partials/PostMedia';
import CreatePost from './partials/CreatePost';
import { shedulePostAction } from '../components/partials/StaticData';
import {
  getFbScheduledList as getScheduledList,
  editFacebook,
  deleteShedulePost,
} from '../../../../actions';
import { setSelectedDataForPopup } from '../../../../extendedAction';

import Edit from '../../modals/Edit';
import View from '../../modals/View';

const Linespan = styled.span`
  border-left: 1px solid #d9d9d9;
  margin: 0px 20px 0px 20px;
`;
const Card1 = styled(Card)`
  width: 100%;
  margin-bottom: 30px;
  background: #ffffff;
  border: 1px solid #f4f4f5;
  border-radius: 10px;
  #videoStyle {
    border-radius: 10px;
    margin: 10px 0 10px 0;
    cursor: pointer;
  }
  .description {
    padding-top: 30px;
    padding-left: 10px;
  }
  .fotter {
    margin-top: 20px;
  }
  .actionIcon {
    cursor: pointer;
    margin: 0px 6px 0px 6px;
  }
  .cursor {
    cursor: pointer;
  }
`;
const EditButton = styled(Button)`
  background: #ffffff;
  border: 2px solid #4aacea;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  color: #4aacea;
  margin-right: 14px;
  &:hover,
  &:focus {
    background-color: #ffffff;
    border: 2px solid #4aacea;
  }
`;
export const SocialMediaModal = styled(Modal)`
  .ant-modal-content {
    width: 600px;
    border-radius: 20px;
  }
`;

export const SocialMediaEditModal = styled(Modal)`
  width: 800px !important;
  .ant-modal-content {
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

const Scheduled = () => {
  const scrollingRef = useRef();
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalname, setModalname] = useState('');
  const [list, setList] = useState([]);
  const [exitModal, setExitModal] = useState(false);
  const [editModal, sendEditData] = useState({});
  const ScheduledList = useSelector(
    state => state.socialMedialIntegration.FbPostList,
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
  const loader = useSelector(
    state => state?.socialMedialIntegration?.loader,
    shallowEqual
  );
  const selectedData = useSelector(
    state => state?.socialMedialExtended?.selectedPopupData,
    shallowEqual
  );

  const dispatch = useDispatch();

  let convert = [];
  useEffect(() => {
    setList([]);
  }, [selectedAccounts]);

  useEffect(() => {
    const combinedList = [...list, ...ScheduledList];
    const uniqueArray = combinedList?.filter(
      (obj, index, arr) => arr?.findIndex(t => t?.id === obj?.id) === index
    );
    setList(uniqueArray);
  }, [ScheduledList]);

  useEffect(() => {
    if (buttonState == 'Scheduled') dispatch(getScheduledList(platforms, page));
  }, [selectedAccounts, buttonState, platforms]);

  const handleOk = () => setIsModalVisible(false);

  const handleCancel = () => setIsModalVisible(false);

  const sendPost = item => {
    if (item?.response_message?.post_type === 'REEL') {
      if (item?.platform_type === 'Facebook') {
        dispatch(
          editFacebook(
            item?.id,
            selectedAccounts?.join(),
            'Facebook',
            item?.response_message?.message,
            'IMMEDIATELY',
            item?.response_message?.file_url,
            Math.round(Date.parse(new Date()) / 1000),
            item?.response_message?.comment
          )
        );
      }
      if (item?.platform_type === 'Instagram') {
        dispatch(
          editFacebook(
            item?.id,
            selectedAccounts?.join(),
            'Instagram',
            item?.response_message?.message,
            'IMMEDIATELY',
            item?.response_message?.file_url,
            Math.round(Date.parse(new Date()) / 1000),
            item?.response_message?.comment
          )
        );
      }
    } else {
      if (item?.platform_type === 'Facebook') {
        dispatch(
          editFacebook(
            item?.id,
            selectedAccounts?.join(),
            'Facebook',
            item?.response_message?.message,
            'IMMEDIATELY',
            item?.response_message?.file_url,
            Math.round(Date.parse(new Date()) / 1000),
            item?.response_message?.comment
          )
        );
      }
      if (item?.platform_type === 'Instagram') {
        dispatch(
          editFacebook(
            item?.id,
            selectedAccounts?.join(),
            'Instagram',
            item?.response_message?.message,
            'IMMEDIATELY',
            item?.response_message?.file_url,
            Math.round(Date.parse(new Date()) / 1000),
            item?.response_message?.comment
          )
        );
      }
      if (item?.platform_type === 'Facebook Groups') {
        dispatch(
          editFacebook(
            item?.id,
            selectedAccounts?.join(),
            'Facebook Groups',
            item?.response_message?.message,
            'IMMEDIATELY',
            item?.response_message?.file_url,
            Math.round(Date.parse(new Date()) / 1000),
            item?.response_message?.comment
          )
        );
      }
      if (item?.platform_type === 'Linkedin Pages') {
        dispatch(
          editFacebook(
            item?.id,
            selectedAccounts?.join(),
            'Linkedin Pages',
            item?.response_message?.message,
            'IMMEDIATELY',
            item?.response_message?.file_url,
            Math.round(Date.parse(new Date()) / 1000),
            item?.response_message?.comment
          )
        );
      }
      if (item?.platform_type === 'Twitter') {
        dispatch(
          editFacebook(
            item?.id,
            selectedAccounts?.join(),
            'Twitter',
            item?.response_message?.message,
            'IMMEDIATELY',
            item?.response_message?.file_url,
            Math.round(Date.parse(new Date()) / 1000),
            item?.response_message?.comment
          )
        );
      }
      if (item?.platform_type === 'Pinterest') {
        dispatch(
          editFacebook(
            item?.id,
            selectedAccounts?.join(),
            'Pinterest',
            item?.response_message?.message,
            'IMMEDIATELY',
            item?.response_message?.file_url,
            Math.round(Date.parse(new Date()) / 1000),
            item?.response_message?.title,
            item?.response_message?.link,
            item?.response_message?.board_id
          )
        );
      }
    }
  };
  const exitCancel = () => {
    setExitModal(false);
    sendEditData({});
  };
  const setEditModal = item => {
    sendEditData(item);
    setExitModal(true);
  };
  const setModalData = (data, name) => {
    if (name === 'Eye') {
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
    }
    setModalname(name);
    setIsModalVisible(true);
  };
  const deletePost = id =>
    dispatch(deleteShedulePost(id, selectedAccounts?.join(), platforms));

  const handleScroll = () => {
    if (scrollingRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollingRef?.current;

      if (
        (Math.round(scrollTop) + parseInt(clientHeight) >=
          parseInt(scrollHeight) &&
          list?.length >= 5) ||
        (parseInt(scrollTop) + parseInt(clientHeight) >=
          parseInt(scrollHeight) &&
          list?.length >= 5)
      ) {
        let increasedPage = page + 1;
        setPage(increasedPage);
        dispatch(getScheduledList(platforms, increasedPage));
      }
    }
  };

  return (
    <Spin spinning={loader}>
      <Wrapper onScroll={handleScroll} ref={scrollingRef}>
        {list?.length > 0 ? (
          list?.map((item, index) => {
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
              <Card1>
                <Row>
                  <PostHeader
                    item={item}
                    postDate={postDate}
                    tabType="Scheduled"
                  />
                  <Col span={24} className="description">
                    {item?.platform_type == 'Pinterest' && (
                      <Title>{item?.response_message?.title}</Title>
                    )}
                    {item?.platform_type == 'Pinterest' && (
                      <Link>{item?.response_message?.link}</Link>
                    )}
                    <PostDescription item={item} tabType="Scheduled" />
                  </Col>
                  <PostMedia item={item} tabType="Scheduled" />
                  <Col span={24}>
                    <Flex spaceBetween className="fotter">
                      <Row>
                        {shedulePostAction?.map(data => {
                          const array = shedulePostAction;
                          const final = array[array.length - 1];
                          return (
                            <Row key={data?.id}>
                              {
                                <div
                                  className="actionIcon"
                                  onClick={() =>
                                    data?.name != 'Clear'
                                      ? setModalData(item, data?.name)
                                      : deletePost(item?.id)
                                  }
                                >
                                  {data?.icon}
                                </div>
                              }
                              {data?.name === final?.name ? (
                                <span></span>
                              ) : (
                                <Linespan></Linespan>
                              )}
                            </Row>
                          );
                        })}
                      </Row>
                      <Row>
                        <EditButton onClick={() => setEditModal(item)}>
                          Edit
                        </EditButton>
                        <Button type="primary" onClick={() => sendPost(item)}>
                          Publish
                        </Button>
                      </Row>
                    </Flex>
                  </Col>
                </Row>
              </Card1>
            );
          })
        ) : (
          <CreatePost />
        )}
        <SocialMediaModal
          bodyStyle={{ borderRadius: '10px' }}
          mask={false}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          okText={'Save'}
          footer={false}
          centered={true}
        >
          {modalname === 'Eye' && <View data={selectedData} />}
        </SocialMediaModal>
        <SocialMediaEditModal
          bodyStyle={{ borderRadius: '10px' }}
          mask={false}
          visible={exitModal}
          onCancel={exitCancel}
          okText={'Save'}
          footer={false}
          centered={true}
        >
          <Edit
            data={editModal}
            editFacebook={editFacebook}
            cancel={exitCancel}
            selectedAccounts={selectedAccounts}
            list={list}
          />
        </SocialMediaEditModal>
      </Wrapper>
    </Spin>
  );
};

export default Scheduled;
