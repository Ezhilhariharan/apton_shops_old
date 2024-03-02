import React, { memo, useState, useEffect } from 'react';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import styled from 'styled-components';
import { Divider, Modal } from 'antd';
import Flex from '../../../../../components/common/Flex';
import { shallowEqual, useSelector } from 'react-redux';
import moment from 'moment';
import OriginalPreview from '../../../../../components/common/Preview/OriginalPreview';

const PreviewModal = styled(Modal)`
  width: 28.75rem !important;
  height: auto !important;
  .header {
    color: ${lightColorsTheme.darkBlack};
    background-color: ${lightColorsTheme.additionalBackground};
    font-weight: 700;
    font-size: 1.375rem;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-content {
    border-radius: 10px;
    box-shadow: none;
  }
  .header {
    padding: 15px 20px 5px 20px;
  }
  .ant-modal-close-x {
    line-height: 0;
    padding: 25px 0;
  }
`;

const PreviewTemplate = ({
  openPreview,
  setOpenPreview,
  removeSingleTemplateOnEdit,
}) => {
  const [currentTime, setCurrentTime] = useState();
  useEffect(() => {
    setInterval(() => {
      // let hours = new Date().getHours();
      // let minutes = new Date().getMinutes();
      // let ampm = hours >= 12 ? 'pm' : 'am';
      // hours = hours ? hours : 12;
      // minutes = minutes < 10 ? '0' + minutes : minutes;
      let time = moment().format('h:mm a');
      setCurrentTime(time);
    }, 1000);
  }, [currentTime]);
  const singleTemplate = useSelector(
    state => state.whatsappTemplate.singleTemplate,
    shallowEqual
  );

  const headerText = preview => {
    if (preview?.example?.header_text[0]) {
      return (
        preview?.text?.replace('{{1}}', '') + preview?.example?.header_text[0]
      );
    } else {
      return preview?.text;
    }
  };
  return (
    <>
      <PreviewModal
        open={openPreview}
        onCancel={() => {
          setOpenPreview(false);
          removeSingleTemplateOnEdit();
        }}
        footer={null}
        bodyStyle={{
          height: 'auto',
          paddingBottom: '60px',
          minHeight: 'auto',
        }}
        centered
      >
        <div className="header">PREVIEW</div>
        <Divider style={{ margin: '0' }} />
        <Flex center>
          <OriginalPreview item={singleTemplate} />
        </Flex>
      </PreviewModal>
    </>
  );
};

export default memo(PreviewTemplate);
