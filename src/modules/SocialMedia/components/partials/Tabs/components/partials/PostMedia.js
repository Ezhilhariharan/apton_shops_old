import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'antd';
import styled from 'styled-components';
import { Video } from '../create/Pages.style';
import ErrorVideo from '@assets/images/errorVideo.png';
import ErrorReel from '@assets/images/errorReel.png';
import ErrorImage from '@assets/images/errorImage.png';
import ReactPlayer from 'react-player';

const Wrapper = styled(Col)`
  padding-top: 20px;
  .media {
    margin-top: 10px;
    .videoBorder {
      border: 1px solid #d9d9d9;
      margin-left: 10px;
    }
  }
  .videoWrapper {
    object-fit: cover;
    border-radius: 10px;
    margin: 10px 20px 0px 0px;
    // border: 1px solid red;
  }
  .playerWrapper {
    z-index: 0;
    position: relative !important;
  }
  // .parentContainer {
  //   width: 100px;
  //   height: 100px;
  // }
`;
export const Cardimage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-top: 9px;
  margin-left: 10px;
  cursor: pointer;
`;
function PostMedia({ item, tabType }) {
  const reDirect = (data, value) => {
    if (tabType === 'Published') {
      data?.post_link && window.open(data?.post_link, '_blank');
      data?.group_link && window.open(data?.group_link, '_blank');
      data?.page_link && window.open(data?.page_link, '_blank');
    }
  };
  return (
    <Wrapper span={24}>
      {item?.response_message?.post_type === 'REEL' &&
      item?.response_message?.file_url ? (
        item?.response_message?.file_url?.map(data => {
          return (
            // <Video
            //   id="uploadVideo"
            //   autoPlay="autoPlay"
            //   muted
            //   loop="loop"
            //   src={data}
            //   onError={e => {
            //     e.target.src = ErrorReel;
            //   }}
            //   playsInline
            //   onClick={() => reDirect(item?.response_message, 'post')}
            // />
            <div
              className="playerWrapper"
              onClick={() => reDirect(item?.response_message, 'post')}
            >
              <ReactPlayer
                url={data && data}
                loop={true}
                playing={true}
                muted={true}
                className="videoWrapper"
                height="130px"
                width="130px"
              />
            </div>
          );
        })
      ) : (
        <Row className="media">
          {item?.response_message?.file_url?.map(data => {
            let getFileType = data?.split('.')?.pop();
            if (getFileType != 'mp4') {
              return (
                <Cardimage
                  src={data && data}
                  preview={false}
                  onClick={() => reDirect(item?.response_message, 'post')}
                  onError={e => {
                    e.target.src = ErrorImage;
                  }}
                />
              );
            } else if (item?.platform_type !== 'Instagram') {
              return (
                // <Video
                //   id="uploadVideo"
                //   autoPlay
                //   muted
                //   key={data}
                //   src={data && data}
                //   loop
                //   onError={e => {
                //     e.target.src = ErrorReel;
                //   }}
                //   playsInline
                //   onClick={() => reDirect(item?.response_message, 'post')}
                // ></Video>
                // <div className="parentContainer">
                <div
                  className="playerWrapper"
                  onClick={() => reDirect(item?.response_message, 'post')}
                >
                  <ReactPlayer
                    url={data && data}
                    loop={true}
                    playing={true}
                    muted={true}
                    className="videoWrapper"
                    height="130px"
                    width="130px"
                  />
                </div>
                // </div>
              );
            } else {
              return (
                // <Video
                //   id="uploadVideo"
                //   autoPlay
                //   muted
                //   key={data}
                //   src={data && data}
                //   loop
                //   onError={e => {
                //     e.target.src = ErrorReel;
                //   }}
                //   playsInline
                //   onClick={() => reDirect(item?.response_message, 'post')}
                // ></Video>
                <div
                  className="playerWrapper"
                  onClick={() => reDirect(item?.response_message, 'post')}
                >
                  <ReactPlayer
                    url={data && data}
                    loop={true}
                    playing={true}
                    muted={true}
                    className="videoWrapper"
                    height="130px"
                    width="130px"
                  />
                </div>
              );
            }
          })}
        </Row>
      )}
    </Wrapper>
  );
}

export default PostMedia;
