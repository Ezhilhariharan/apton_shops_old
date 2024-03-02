import React, { memo } from 'react';
import Flex from '@components/common/Flex';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { tooltipText } from './CreateHelper';
import { instruction } from '../partials/StaticData';
import { DescriptionWrapper } from './Pages.style';

const CharacterLimit = () => {
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const feedDiscription = useSelector(
    state => state?.socialMedialExtended?.feedDescription
  );
  const characterLimit = useSelector(
    state => state?.socialMedialExtended?.characterLimit
  );

  const text = () => tooltipText(instruction);

  return (
    <Flex end>
      <DescriptionWrapper>
        {selectedAccounts?.length > 0 && (
          <p className="description">
            {feedDiscription?.length} /{characterLimit}
          </p>
        )}
        <Tooltip placement="bottomRight" title={text('Published Time')}>
          <InfoCircleOutlined className="icon" />
        </Tooltip>{' '}
      </DescriptionWrapper>
    </Flex>
  );
};

export default memo(CharacterLimit);
