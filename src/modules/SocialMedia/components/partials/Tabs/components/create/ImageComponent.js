import React, { memo } from 'react';
import { Spin } from 'antd';
import ExitIcon from '@components/icons/ExitIcon';
import { useSelector } from 'react-redux';
import { antIcon } from './VideoComponent';
import { Cardimage } from '../partials/PostMedia';
import { IconSpan, ImageWrapper } from './Pages.style';
import { SocialIcon } from '../../../modals/ViewStyle';

const ImageComponent = ({ handleFileDel }) => {
  const fileList = useSelector(state => state?.socialMedialExtended?.fileList);
  const uploading = useSelector(
    state => state?.socialMedialExtended?.mediaLoader
  );
  return (
    fileList?.length > 0 &&
    fileList?.map((item, index) => {
      return (
        <SocialIcon style={{ margin: '0px' }}>
          {!uploading && (
            <IconSpan onClick={() => handleFileDel(item, index)}>
              <ExitIcon
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'black',
                  cursor: 'pointer',
                  marginLeft: '10px',
                  color: '#fff',
                }}
              />
            </IconSpan>
          )}
          {uploading ? (
            <ImageWrapper>
              <Spin indicator={antIcon} style={{ margin: 'auto' }} />
            </ImageWrapper>
          ) : (
            <Cardimage
              preview={false}
              src={item?.thumbUrl ? item?.thumbUrl : item?.url}
              alt="no img"
              style={{
                margin: '9px 10px 0px 0px',
                zIndex: 0,
                //objectFit: 'none',
              }}
            />
          )}
        </SocialIcon>
      );
    })
  );
};

export default memo(ImageComponent);
