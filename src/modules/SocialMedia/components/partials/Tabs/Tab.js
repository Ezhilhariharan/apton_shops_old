import React, { useState, useEffect } from 'react';
import { Card, Divider } from 'antd';
import Create from '../Tabs/components/create/Create';
import Scheduled from '../Tabs/components/Scheduled';
import Published from '../Tabs/components/Published';
import Failed from '../Tabs/components/Failed';
import styled from 'styled-components';
import Bin from '@components/icons/Bin';
import Minimize from '@components/icons/Minimize';
import { platformNames } from '../../index/StaticData';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updatePlatforms, updateMultiplePost } from '../../../extendedAction';

const MainCard = styled(Card)`
  width: auto;
  height: 100%;
  min-height: 600px;
  background: #ffffff;
  border-radius: 10px;
  .ant-card-body {
    padding: 15px;
  }
  ::-webkit-scrollbar: {
    display: 'none';
  }
  ::-ms-overflow-style: none;
  scrollbarwidth: none;
`;
const PostAction = styled('div')`
  width: 30px;
  min-width: 30px;
  height: 140px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 0 auto 10px;
  padding: 5px;
  cursor: pointer;
`;
const Wrapper = styled.div`
  height: 75vh;
  // margin:10px ;
  // border:1px solid green;
  overflow-y: auto;
  width: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  // "::-webkit-scrollbar":{
  // display:"none"
  // };
  // "::-ms-overflow-style":"none";
  // scrollbarWidth:"none";
  :-webkit-scrollbar: {
    display: 'none';
  }
  -ms-overflow-style: none;
  scrollbarwidth: none;
`;

const Cursor = styled.span`
  cursor: pointer;
`;
const PostIdBox = styled.div`
  width: 20px;
  height: 20px;
  font-weight: 500;
  font-size: 12px;
  color: #999999;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 2px solid #999999;
  border-radius: 3px;
`;
const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Tab = ({ CurentUser }) => {
  const dispatch = useDispatch();
  const buttonState = useSelector(
    state => state.socialMedialIntegration.buttons
  );
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const socialMediaList = useSelector(
    state => state?.integrationSelector?.socialMediaList,
    shallowEqual
  );
  const multiplePost = useSelector(
    state => state?.socialMedialExtended?.multiplePost,
    shallowEqual
  );

  // const [multiplePost, setMultiplePost] = useState([
  //   { id: 1, minimize: false },
  // ]);

  // useEffect(() => { console.log("multiplePost",multiplePost)},[multiplePost])

  useEffect(() => {
    if (socialMediaList && brand) {
      const updatedPlatforms = {};
      platformNames?.forEach(platformName => {
        const foundPlatform = socialMediaList?.find(data => {
          const names = data?.platform_name?.split(' ').join('');
          return names === platformName;
        });
        if (foundPlatform) {
          updatedPlatforms[platformName] = foundPlatform;
        }
      });
      dispatch(updatePlatforms(updatedPlatforms));
    }
  }, [socialMediaList, brand]);

  const deleteCreatePost = id => {
    const Filtered = multiplePost?.filter(item => item?.id != id);
    // setMultiplePost(Filtered);
    dispatch(updateMultiplePost(Filtered));
  };
  const minimizePost = id => {
    let updatedPost = [];
    multiplePost?.map(post => {
      if (post?.id === id) {
        if (post.minimize) updatedPost.push({ ...post, minimize: false });
        else updatedPost.push({ ...post, minimize: true });
      }
    });
    dispatch(updateMultiplePost(updatedPost));
  };
  return (
    <MainCard>
      <Wrapper style={{ display: buttonState === 'Create' ? 'block' : 'none' }}>
        {multiplePost?.map((postId, index) => (
          <PostWrapper key={postId?.id}>
            <Create
              // setMultiplePost={setMultiplePost}
              // multiplePost={multiplePost}
              postId={postId}
              // deleteCreatePost={deleteCreatePost}
              // MinimizePost={MinimizePost}
            />
            {multiplePost.length > 1 && (
              <PostAction>
                <Cursor onClick={() => minimizePost(postId?.id)}>
                  <Minimize />
                </Cursor>
                <Divider
                  plain
                  style={{
                    height: '1px ',
                    background: '#D9D9D9',
                    width: '100%',
                    margin: '10px 0',
                  }}
                />
                <Cursor onClick={() => deleteCreatePost(postId?.id)}>
                  <Bin />
                </Cursor>
                <Divider
                  plain
                  style={{
                    height: '1px ',
                    background: '#D9D9D9',
                    width: '100%',
                    margin: '10px 0',
                  }}
                />
                <PostIdBox>{index + 1}</PostIdBox>
              </PostAction>
            )}
          </PostWrapper>
        ))}
      </Wrapper>
      <div style={{ display: buttonState === 'Scheduled' ? 'block' : 'none' }}>
        <Scheduled />
      </div>
      <div style={{ display: buttonState === 'Published' ? 'block' : 'none' }}>
        <Published />
      </div>
      <div style={{ display: buttonState === 'Failed' ? 'block' : 'none' }}>
        <Failed />
      </div>
    </MainCard>
  );
};
export default Tab;
