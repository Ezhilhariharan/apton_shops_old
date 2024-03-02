import React, { useEffect, useState, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Typography, Row, Col, Card, Spin } from 'antd';
import styled from 'styled-components';
import {
  setActivePost,
  getFbFailedList as getFailedList,
  deleteShedulePost,
} from '../../../../actions';
import { ParagraphError } from '../components/create/Pages.style';
import Bin from '@components/icons/Bin';

import PostHeader from './partials/PostHeader';
import PostDescription from './partials/PostDescription';
import PostMedia from './partials/PostMedia';
import CreatePost from './partials/CreatePost';

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
  .description {
    padding-top: 30px;
    padding-left: 10px;
  }
  .fotter {
    padding-top: 20px;
  }
  .error {
    padding-top: 5px;
  }
  .cursor {
    cursor: pointer;
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
  font-weight: 600;
  font-size: 14px;
  line-height: 133.33%;
  color: #050505;
`;
export const Link = styled.div`
  width: 100%;
  height: auto;
  font-weight: 600;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 6px;
  line-height: 133.33%;
  color: #4aacea;
`;

const Failed = () => {
  const dispatch = useDispatch();
  const failedList = useSelector(
    state => state.socialMedialIntegration.FbFailedList,
    shallowEqual
  );
  const SocialMediaCount = useSelector(
    state => state.socialMedialIntegration.SocialMediaCount,
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
  const scrollingRef = useRef();
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);

  useEffect(() => {
    const combinedList = [...list, ...failedList];
    const uniqueArray = combinedList?.filter(
      (obj, index, arr) => arr?.findIndex(t => t?.id === obj?.id) === index
    );
    setList(uniqueArray);
  }, [failedList]);

  let convert = [];
  useEffect(() => {
    setList([]);
  }, [selectedAccounts]);

  useEffect(() => {
    if (buttonState == 'Failed') dispatch(getFailedList(platforms, page));
    if (SocialMediaCount?.failed_count > 0) dispatch(setActivePost('FAILED'));
  }, [selectedAccounts, buttonState, platforms]);

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
        dispatch(getFailedList(platforms, increasedPage));
      }
    }
  };

  const deletePost = id =>
    dispatch(deleteShedulePost(id, platforms, platforms, 'Failed'));
  const loader = useSelector(
    state => state?.socialMedialIntegration?.loader,
    shallowEqual
  );
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
                    tabType="Failed"
                  />
                  <Col span={24} className="description">
                    {item?.platform_type == 'Pinterest' && (
                      <Title>{item?.response_message?.title}</Title>
                    )}
                    {item?.platform_type == 'Pinterest' && (
                      <Link>{item?.response_message?.link}</Link>
                    )}
                    <PostDescription item={item} tabType="Failed" />
                  </Col>
                  <PostMedia item={item} tabType="Failed" />
                </Row>
                <Row className="fotter">
                  <Col span={22}>
                    {item?.response_message?.error?.length > 0 ? (
                      <>
                        {item?.response_message?.error?.map(data => (
                          <Row className="error">
                            <ParagraphError> {data} </ParagraphError>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <Row className="error">
                        <ParagraphError>
                          Application request limit reached
                        </ParagraphError>
                      </Row>
                    )}
                  </Col>
                  <Col span={2}>
                    <div
                      onClick={() => deletePost(item?.id)}
                      className="cursor"
                    >
                      {' '}
                      <Bin />{' '}
                    </div>
                  </Col>
                </Row>
              </Cards>
            );
          })
        ) : (
          <CreatePost />
        )}
      </Wrapper>
    </Spin>
  );
};

export default Failed;
