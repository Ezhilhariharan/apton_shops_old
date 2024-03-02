import React, { useEffect, useState, useRef } from 'react';
import { Divider, Typography, Spin } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import moment from 'moment';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CommentReply from './CommentReply';
import {
  updateFb_Inst_Actions,
  linkdinNestedComment,
  fbInstaAction,
} from '../../../actions';

const MainWrapper = styled('div')`
  width: 100%;
  .divider {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 0px;
  }
  .noComments {
    margin-top: 30px;
    font-size: 16px;
    font-weight: 600;
  }
`;
const Wrapper = styled('div')`
  width: 100%;
  height: 500px;
  overflow-y: scroll;
`;
const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #4d4d4d;
  margin-bottom: 12px;
`;
const Content = styled('div')`
  width: 100%;
  margin: 20px 0;
  font-weight: 600;
  font-size: 16px;
  color: #4d4d4d;
  height: auto;
  .userName {
    color: #4aacea;
    margin-right: 7px;
    white-space: nowrap;
  }
  .image {
    border-radius: 50%;
    margin: 0px 10px;
  }
  .commentWrapper {
    background: rgba(79, 92, 128, 0.05);
    border-radius: 10px;
    padding: 10px;
    min-width: 25%;
    width: auto;
    height: auto;
  }
  .nestedCmmmntReply {
    margin-top: 20px;
    margin-left: 40px;
    // border: 1px solid red;
  }
`;
const Linespan = styled.span`
  border-left: 1px solid #d9d9d9;
  height: 15px;
  margin: 0 10px 0 10px !important;
`;
const CommentAction = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: 30px;
  font-weight: 500;
  font-size: 14px;
  margin-left: 28px;
  margin-top: 5px;
  color: rgba(79, 92, 128, 0.5);
  .blueFont {
    color: #4aacea;
    cursor: pointer;
  }
  .timezone {
    font-weight: 500;
    font-size: 10px;
    margin-left: 5px;
  }
`;
const Comment = styled('div')`
margin-left:40px;
background: rgba(79, 92, 128, 0.05);
border-radius: 10px;
padding:10px;
min-width:45%;
width:auto;
}`;
const Nestedcomment = styled('div')`
margin-left:80px;
background: rgba(79, 92, 128, 0.05);
border-radius: 10px;
padding:10px;
min-width:25%;
width:auto;
}`;

const StyledSpan = styled('span')`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 13px;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 23px !important;
  width: 25px !important;
  min-height: 23px !important;
  min-width: 25px !important;
  border-radius: 50%;
  background: #4aacea;
  color: white;
  margin-right: 5px;
  padding-top: 1px;
`;

const Comments = ({ postId, postType, postData }) => {
  const postAction = useSelector(
    state => state?.socialMedialIntegration?.postActions,
    shallowEqual
  );
  const NestedComment = useSelector(
    state => state?.socialMedialIntegration?.LinkdinNestedComment,
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

  const scrollingRef = useRef();
  const dispatch = useDispatch();
  const [comments, setComment] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [openReplyComment, setOpenReplyComment] = useState(false);
  const [openNestedReplyComment, setOpenNestedReplyComment] = useState(false);
  const [commentData, setCommentData] = useState({});
  const [replyId, setReplyId] = useState('');
  const [nestedReply, setNestedReply] = useState('');
  const [nestedComment, setnestedComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [nestedComments, setNestedComments] = useState([]);
  const [nestedLinkdinCommentReply, setNestedLinkdinCommentReply] = useState(
    {}
  );
  const [nestedLinkdinCommentData, setNestedLinkdinCommentData] = useState({});

  useEffect(() => {
    if (
      postAction?.hasOwnProperty('data') ||
      postAction?.hasOwnProperty('elements')
    ) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    postAction?.data
      ? setComment(postAction?.data)
      : setComment(postAction?.elements);
    setOpenNestedReplyComment(false);
    setOpenReplyComment(false);
    setOpenComment(false);
  }, [postAction]);

  useEffect(() => {
    setLoading(true);
    return () => {
      setLoading(true);
      setNestedReply('');
      setOpenReplyComment(false);
      setOpenNestedReplyComment(false);
      setCommentData({});
      setNestedLinkdinCommentReply({});
      setOpenComment(false);
      setReplyId('');
      setnestedComment('');
    };
  }, []);

  useEffect(() => {
    setNestedComments(NestedComment?.elements);
  }, [NestedComment]);

  const openReplyComments = data => {
    setCommentData(data);
    setOpenReplyComment(true);
    setOpenNestedReplyComment(false);
    setOpenComment(false);
  };
  const openNestedReplyComments = data => {
    setNestedReply(data);
    setOpenNestedReplyComment(true);
    setOpenReplyComment(false);
    setOpenComment(false);
  };
  const openComments = data => {
    setCommentData(data);
    setOpenComment(true);
    setOpenNestedReplyComment(false);
    setOpenReplyComment(false);
  };
  const openLinkdinReplyComments = (data, item) => {
    setNestedLinkdinCommentData(item);
    setNestedLinkdinCommentReply(data);
    setOpenComment(true);
    setOpenNestedReplyComment(false);
    setOpenReplyComment(false);
  };

  const openReplies = data => {
    setReplyId(data);
  };
  const openLinkdinPagesReplies = id => {
    dispatch(linkdinNestedComment(id, postData?.id, setLoading));
  };
  const openNestedReplies = data => {
    setnestedComment(data);
  };
  const handleScroll = () => {
    if (scrollingRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollingRef?.current;
      if (
        Math.round(scrollTop) + parseInt(clientHeight) ===
        parseInt(scrollHeight)
      ) {
        if (postAction?.paging?.next) {
          dispatch(updateFb_Inst_Actions({}));
          if (postAction?.paging?.cursors?.after) {
            fbInstaAction(
              postData?.id,
              'comments',
              postAction?.paging?.cursors?.after
            );
          }
        }
        if (postAction?.paging?.previous) {
          dispatch(updateFb_Inst_Actions({}));
          if (postAction?.paging?.cursors?.before) {
            fbInstaAction(
              postData?.id,
              'comments',
              postAction?.paging?.cursors?.before
            );
          }
        }
      }
    }
  };
  const getCommentTime = (created_time, timestamp) => {
    let date = created_time
      ? created_time?.split('T')[0]
      : timestamp?.split('T')[0];
    let Time = created_time
      ? created_time?.split('T')[1]
      : timestamp?.split('T')[1];
    let merging =
      date &&
      new Date(
        date.split('-')[0],
        date.split('-')[1] - 1,
        date.split('-')[2],
        Time.split(':')[0],
        Time.split(':')[1].slice(0, 2)
      );
    let setHour = Time && new Date(merging.setHours(merging.getHours() + 5));
    let perfectTime =
      setHour && new Date(setHour.setMinutes(setHour.getMinutes() + 30));
    return perfectTime;
  };
  return (
    <MainWrapper>
      <Heading>Comments</Heading>
      <Divider className="divider" />
      <Spin spinning={loading}>
        {postData?.platform_type === 'Linkedin Pages' ? (
          <Wrapper onScroll={handleScroll} ref={scrollingRef}>
            {comments?.length > 0 ? (
              comments?.map(item => {
                let data = item['actor~'];
                const firstLetter = data?.localizedName
                  ? data?.localizedName.split('')
                  : data?.localizedFirstName?.split('');
                return (
                  <div key={item?.id}>
                    <Content>
                      <div className="commentWrapper">
                        <Flex>
                          <StyledSpan>
                            {firstLetter ? firstLetter[0] : 'A'}
                          </StyledSpan>
                          <span className="userName">
                            {data?.localizedName
                              ? data?.localizedName
                              : `${data?.localizedFirstName} ${data?.localizedLastName}`}
                          </span>{' '}
                          {item?.message?.text}
                        </Flex>
                        <CommentAction>
                          {
                            <>
                              <span
                                className="blueFont"
                                onClick={() => openComments(item)}
                              >
                                Reply
                              </span>{' '}
                              <Linespan></Linespan>
                            </>
                          }
                          {item?.commentsSummary?.aggregatedTotalComments >
                            0 && (
                            <>
                              <span
                                className="blueFont"
                                onClick={() =>
                                  openLinkdinPagesReplies(item?.$URN)
                                }
                              >
                                View Replies
                              </span>{' '}
                              <Linespan></Linespan>{' '}
                            </>
                          )}
                          <span className="timezone">
                            {item?.created?.time &&
                              moment(new Date(item?.created?.time)).fromNow()}
                          </span>
                        </CommentAction>
                      </div>
                      {openComment && commentData?.id == item?.id && (
                        <CommentReply
                          selectedAccounts={selectedAccounts}
                          postType={postType}
                          commentData={commentData}
                          postId={postId}
                          postData={postData}
                          margin={'0px'}
                          loader={setLoading}
                          commentOff={setOpenComment}
                          platforms={platforms}
                        />
                      )}
                    </Content>
                    {nestedComments?.map(nestedComment => {
                      if (item?.$URN == nestedComment?.parentComment) {
                        return (
                          <Content key={nestedComment?.id}>
                            <Comment>
                              <Flex>
                                <StyledSpan>
                                  {firstLetter ? firstLetter[0] : 'A'}
                                </StyledSpan>
                                {nestedComment?.message?.text}
                              </Flex>
                              <CommentAction>
                                {
                                  <>
                                    <span
                                      className="blueFont"
                                      onClick={() =>
                                        openLinkdinReplyComments(
                                          nestedComment,
                                          item
                                        )
                                      }
                                    >
                                      Reply
                                    </span>{' '}
                                    <Linespan></Linespan>
                                  </>
                                }
                                {nestedComment?.commentsSummary
                                  ?.aggregatedTotalComments > 0 && (
                                  <>
                                    <span
                                      className="blueFont"
                                      onClick={() =>
                                        openLinkdinPagesReplies(
                                          nestedComment?.$URN
                                        )
                                      }
                                    >
                                      View Replies
                                    </span>{' '}
                                    <Linespan></Linespan>{' '}
                                  </>
                                )}
                                <span className="timezone">
                                  {nestedComment?.created?.time &&
                                    moment(
                                      new Date(nestedComment?.created?.time)
                                    ).fromNow()}
                                </span>
                              </CommentAction>
                            </Comment>
                            <div className="nestedCmmmntReply">
                              {openComment &&
                                nestedLinkdinCommentReply?.id ==
                                  nestedComment?.id && (
                                  <CommentReply
                                    selectedAccounts={selectedAccounts}
                                    postType={postType}
                                    commentData={nestedLinkdinCommentData}
                                    postId={postId}
                                    postData={postData}
                                    margin={'0px'}
                                    loader={setLoading}
                                    commentOff={setOpenComment}
                                    platforms={platforms}
                                    openLinkdinPagesReplies={
                                      openLinkdinPagesReplies
                                    }
                                    nestedLinkdinCommentReply={
                                      nestedLinkdinCommentReply
                                    }
                                  />
                                )}
                            </div>
                          </Content>
                        );
                      }
                    })}
                  </div>
                );
              })
            ) : (
              <Flex center className="noComments">
                No Comments
              </Flex>
            )}
          </Wrapper>
        ) : (
          <Wrapper onScroll={handleScroll} ref={scrollingRef}>
            {comments?.length > 0 ? (
              comments?.map(item => {
                const firstLetter =
                  item?.from?.name?.split('') || item?.username?.split('');
                let commentTime = getCommentTime(
                  item?.created_time,
                  item?.timestamp
                );
                return (
                  <div key={item?.id}>
                    <Content>
                      <div className="commentWrapper">
                        <Flex>
                          <StyledSpan>
                            {firstLetter ? firstLetter[0] : 'A'}
                          </StyledSpan>
                          <span className="userName">
                            {item?.from?.name || item?.username}
                          </span>{' '}
                          {item?.message || item?.text}
                        </Flex>
                        <CommentAction>
                          {postData?.platform_type != 'Facebook Groups' && (
                            <>
                              <span
                                className="blueFont"
                                onClick={() => openComments(item)}
                              >
                                Reply
                              </span>{' '}
                              <Linespan></Linespan>
                            </>
                          )}
                          {item?.comments || item?.replies ? (
                            <>
                              <span
                                className="blueFont"
                                onClick={() => openReplies(item?.id)}
                              >
                                View Replies
                              </span>{' '}
                              <Linespan></Linespan>{' '}
                            </>
                          ) : (
                            ''
                          )}
                          <span className="timezone">
                            {(item?.created_time || item?.timestamp) &&
                              moment(commentTime).fromNow()}
                          </span>
                        </CommentAction>
                      </div>
                      {openComment && commentData?.id === item?.id && (
                        <CommentReply
                          selectedAccounts={selectedAccounts}
                          postType={postType}
                          commentData={commentData}
                          postId={postId}
                          postData={postData}
                          margin={'0px'}
                          loader={setLoading}
                          commentOff={setOpenComment}
                        />
                      )}
                    </Content>
                    {item?.comments ? (
                      <>
                        {item?.id === replyId &&
                          item?.comments?.data?.map(comment => {
                            const firstLetter =
                              comment?.from?.name?.split('') ||
                              comment?.username?.split('');
                            let commentTime = getCommentTime(
                              comment?.created_time,
                              comment?.timestamp
                            );
                            return (
                              <div key={comment?.id}>
                                <Content>
                                  <Comment>
                                    <Flex>
                                      <StyledSpan>
                                        {firstLetter && firstLetter[0]}
                                      </StyledSpan>
                                      {/* <img src={profileImage} alt="Lightence" width={30} height={30} className="image" /> */}
                                      <span className="userName">
                                        {comment?.from?.name ||
                                          comment?.username}
                                      </span>{' '}
                                      {comment?.message || comment?.text}
                                    </Flex>
                                    <CommentAction>
                                      {postData?.platform_type !==
                                        'Facebook Groups' && (
                                        <>
                                          <span
                                            className="blueFont"
                                            onClick={() =>
                                              openReplyComments(comment)
                                            }
                                          >
                                            Reply
                                          </span>{' '}
                                          <Linespan></Linespan>
                                        </>
                                      )}
                                      {comment?.comments ? (
                                        <>
                                          <span
                                            className="blueFont"
                                            onClick={() =>
                                              openNestedReplies(
                                                comment?.created_time
                                              )
                                            }
                                          >
                                            View Replies
                                          </span>{' '}
                                          <Linespan></Linespan>{' '}
                                        </>
                                      ) : (
                                        ''
                                      )}
                                      <span className="timezone">
                                        {' '}
                                        {(comment?.created_time ||
                                          comment?.timestamp) &&
                                          moment(commentTime).fromNow()}
                                      </span>
                                    </CommentAction>
                                  </Comment>
                                  {openReplyComment &&
                                    commentData?.id === comment?.id && (
                                      <CommentReply
                                        selectedAccounts={selectedAccounts}
                                        commentData={commentData}
                                        postId={postId}
                                        postType={postType}
                                        postData={postData}
                                        commentOff={setOpenReplyComment}
                                        loader={setLoading}
                                        margin={'40px'}
                                      />
                                    )}
                                </Content>
                                {comment?.created_time === nestedComment &&
                                  comment?.comments?.data?.map(
                                    nestedComment => {
                                      const firstLetter =
                                        nestedComment?.from?.name?.split('') ||
                                        nestedComment?.username?.split('');
                                      let commentTime = getCommentTime(
                                        nestedComment?.created_time,
                                        nestedComment?.timestamp
                                      );
                                      return (
                                        <Content key={nestedComment?.id}>
                                          <Nestedcomment>
                                            <Flex>
                                              <StyledSpan>
                                                {firstLetter && firstLetter[0]}
                                              </StyledSpan>
                                              <span className="userName">
                                                {nestedComment?.from?.name ||
                                                  nestedComment?.username}
                                              </span>{' '}
                                              {nestedComment?.message ||
                                                nestedComment?.text}
                                            </Flex>
                                            <CommentAction>
                                              {postData?.platform_type !==
                                                'Facebook Groups' && (
                                                <>
                                                  <span
                                                    className="blueFont"
                                                    onClick={() =>
                                                      openNestedReplyComments(
                                                        nestedComment
                                                      )
                                                    }
                                                  >
                                                    Reply
                                                  </span>{' '}
                                                  <Linespan></Linespan>
                                                </>
                                              )}
                                              <span className="timezone">
                                                {' '}
                                                {(nestedComment?.created_time ||
                                                  nestedComment?.timestamp) &&
                                                  moment(commentTime).fromNow()}
                                              </span>
                                            </CommentAction>
                                          </Nestedcomment>
                                          {openNestedReplyComment &&
                                            nestedReply?.created_time ===
                                              nestedComment?.created_time && (
                                              <CommentReply
                                                selectedAccounts={
                                                  selectedAccounts
                                                }
                                                commentData={nestedReply}
                                                postId={postId}
                                                postType={postType}
                                                postData={postData}
                                                commentOff={setOpenReplyComment}
                                                loader={setLoading}
                                                margin={'80px'}
                                              />
                                            )}
                                        </Content>
                                      );
                                    }
                                  )}
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {item?.id === replyId &&
                          item?.replies?.data?.map(comment => {
                            const firstLetter =
                              comment?.from?.name?.split('') ||
                              comment?.username?.split('');
                            let commentTime = getCommentTime(
                              comment?.created_time,
                              comment?.timestamp
                            );
                            return (
                              <Content key={comment?.id}>
                                <Comment>
                                  <Flex>
                                    <StyledSpan>
                                      {firstLetter && firstLetter[0]}
                                    </StyledSpan>
                                    <span className="userName">
                                      {comment?.from?.name || comment?.username}
                                    </span>{' '}
                                    {comment?.message || comment?.text}
                                  </Flex>
                                  <CommentAction>
                                    <span
                                      className="blueFont"
                                      onClick={() => openReplyComments(comment)}
                                    >
                                      Reply
                                    </span>
                                    <Linespan></Linespan>
                                    <span className="timezone">
                                      {' '}
                                      {(comment?.created_time ||
                                        comment?.timestamp) &&
                                        moment(commentTime).fromNow()}
                                    </span>
                                  </CommentAction>
                                </Comment>
                                {openReplyComment &&
                                  commentData?.id === comment?.id && (
                                    <CommentReply
                                      commentData={commentData}
                                      postId={postId}
                                      postType={postType}
                                      postData={postData}
                                      loader={setLoading}
                                      margin={'40px'}
                                      commentOff={setOpenReplyComment}
                                    />
                                  )}
                              </Content>
                            );
                          })}
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <Flex center className="noComments">
                No Comments
              </Flex>
            )}
          </Wrapper>
        )}
      </Spin>
    </MainWrapper>
  );
};

export default Comments;
