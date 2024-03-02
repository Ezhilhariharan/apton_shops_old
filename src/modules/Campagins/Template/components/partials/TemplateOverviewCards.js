import React from 'react';
import { TemplatesInfo } from '../constants';
import StatusCards from './StatusCards';
import Flex from '@components/common/Flex';

const TemplateOverviewCards = ({
  overviewTemplate,
  setFilterByStatus,
  filterByStatus,
  click,
  setClick,
}) => {
  const hoverColor = {
    Draft: '5px solid #4AACEA',
    Approved: '5px solid #00AC4F',
    Pending: '5px solid #F25511',
    Rejected: '5px solid #DA001A',
  };
  return (
    <Flex spaceBetween>
      {TemplatesInfo?.map((templateIcon, ind) => (
        <StatusCards
          hoverColor={hoverColor[templateIcon?.title]}
          key={ind}
          item={templateIcon}
          click={click}
          filterByStatus={filterByStatus}
          setClick={setClick}
          overviewTemplate={overviewTemplate}
          setFilterByStatus={setFilterByStatus}
          active={filterByStatus === templateIcon?.title}
        />
      ))}
    </Flex>
  );
};

export default TemplateOverviewCards;
