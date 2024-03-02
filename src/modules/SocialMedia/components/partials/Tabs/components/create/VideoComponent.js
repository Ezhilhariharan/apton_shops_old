import React, { memo } from 'react';
import { Spin } from 'antd';
import ExitIcon from '@components/icons/ExitIcon';
import { Video, VideoWrapper } from './Pages.style';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

export const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const VideoComponent = ({ deleteVideo }) => {
  const uploading = useSelector(
    state => state?.socialMedialExtended?.mediaLoader
  );
  const source = useSelector(state => state?.socialMedialExtended?.source);

  return (
    <VideoWrapper>
      {uploading ? (
        <div className="innerWrapper">
          <Spin indicator={antIcon} style={{ marginLeft: '20px' }} />
        </div>
      ) : (
        <Video
          id="uploadVideo"
          src={source}
          autoPlay="autoPlay"
          muted
          loop="loop"
        />
      )}

      {!uploading && (
        <span className="innerSpan" onClick={deleteVideo}>
          <ExitIcon className="iconStyle" />
        </span>
      )}
    </VideoWrapper>
  );
};

export default memo(VideoComponent);
