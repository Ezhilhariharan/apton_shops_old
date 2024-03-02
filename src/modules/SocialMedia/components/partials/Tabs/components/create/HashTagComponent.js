import React, { memo, useCallback } from 'react';
import Flex from '@components/common/Flex';
import { useSelector } from 'react-redux';
import { Popover } from 'antd';
import { Buttons, HastagWrapper } from './Pages.style';
import { SmileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import datas from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const HashTagComponent = ({ handleDescription }) => {
  const dispatch = useDispatch();
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const feedDiscription = useSelector(
    state => state?.socialMedialExtended?.feedDescription
  );
  const picker = (
    <Picker
      data={datas}
      previewPosition="none"
      onEmojiSelect={e =>
        handleDescription(feedDiscription + e.native)
      }
    />
  );

  return (
    <HastagWrapper spaceBetween>
      <Flex>
        <Buttons
          size="small"
          disabled={selectedAccounts?.length === 0 && true}
          onClick={() =>
            feedDiscription?.length > 0 &&
            selectedAccounts?.length > 0 &&
            handleDescription(feedDiscription ? feedDiscription + '#' : '#')
          }
        >
          # Hashtags
        </Buttons>
      </Flex>
      <Popover content={selectedAccounts?.length > 0 && picker} trigger="click">
        <Buttons
          size="small"
          style={{ border: 'none' }}
          disabled={selectedAccounts?.length === 0 && true}
        >
          <SmileOutlined className="icon" />
        </Buttons>
      </Popover>
    </HastagWrapper>
  );
};

export default memo(HashTagComponent);
