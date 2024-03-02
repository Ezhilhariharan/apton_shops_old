import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
const { TextArea } = Input;
import { commentLinkdinPost, commentPostAPI } from '../../../actions';

const MainWrapper = styled('div')`
  width: auto;
  min-width: 60%;
  border: 1px solid #f4f4f5;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  margin-top: 20px;
  margin-left: 40px;
  .userName {
    color: #4aacea;
    margin-right: 7px;
    cursor: pointer;
  }
  .replyComments {
    height: 50px;
    margin-right: 3px;
    width: 80%;
  }
`;
const StyledSpan = styled('span')`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  align-items: center;
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  justify-content: center;
  height: 23px !important;
  width: 25px !important;
  border-radius: 50%;
  background: #4aacea;
  color: white;
  margin-right: 5px;
  padding-top: 1px;
`;

const CommentReply = ({
  // platforms,
  commentData,
  // commentPostAPI,
  postId,
  postType,
  postData,
  commentOff,
  loader,
  selectedAccounts,
  margin,
  nestedLinkdinCommentReply,
  openLinkdinPagesReplies,
}) => {
  const [replyComment, setReplyComment] = useState('');
  const [linkdinUserName, setLinkdinUserName] = useState('');

  const platforms = useSelector(
    state => state?.socialMedialExtended?.availablePlatforms,
    shallowEqual
  );

  const dispatch = useDispatch();
  const onChange = e => {
    setReplyComment(e.target.value);
  };
  useEffect(() => {
    if (postData?.platform_type == 'Instagram') {
      setReplyComment(
        `@${
          commentData?.from?.name
            ? commentData?.from?.name
            : commentData?.username
        }`
      );
    } else if (postData?.platform_type === 'Linkedin Pages') {
      setLinkdinUserName(commentData['actor~']);
    }
  }, [commentData, postData]);
  const post = () => {
    const body = {
      social_media_post_detail_id: postId,
      post_comment_id: commentData?.id,
      message: replyComment,
    };
    dispatch(
      commentPostAPI(body, postId, postType, selectedAccounts, platforms)
    );
    commentOff(false);
    loader(true);
  };
  const linkdinPost = () => {
    const body = {
      media_id: postData?.id,
      parent_comment_id: commentData?.$URN,
      comment: replyComment,
    };
    dispatch(
      commentLinkdinPost(body, postId, postType, selectedAccounts, platforms)
    );
    setTimeout(() => {
      openLinkdinPagesReplies(nestedLinkdinCommentReply?.$URN);
    }, 5000);
    commentOff(false);
    loader(true);
  };
  return (
    <MainWrapper style={{ marginLeft: margin }}>
      {postData?.platform_type === 'Linkedin Pages' ? (
        <>
          <StyledSpan>
            {linkdinUserName?.localizedName
              ? linkdinUserName?.localizedName?.split('')[0]
              : linkdinUserName?.localizedFirstName?.split('')[0]}
          </StyledSpan>
          <TextArea
            showCount={false}
            maxLength={2200}
            bordered={false}
            classNme="replyComments"
            onChange={onChange}
            value={replyComment}
            placeholder="Type Here..."
          />
          <span className="userName" onClick={() => linkdinPost()}>
            Post
          </span>
        </>
      ) : (
        <>
          <StyledSpan>
            {commentData?.from?.name
              ? commentData?.from?.name[0]
              : commentData?.username[0]}
          </StyledSpan>
          <TextArea
            showCount={false}
            maxLength={2200}
            bordered={false}
            classNme="replyComments"
            onChange={onChange}
            value={replyComment}
            placeholder="Type Here..."
          />
          <span className="userName" onClick={() => post()}>
            Post
          </span>
        </>
      )}
    </MainWrapper>
  );
};

export default CommentReply;
