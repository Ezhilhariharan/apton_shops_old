import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { ProspectInfo } from '../../../whatsapp/components/constants';
import ProspectOverview from './ProspectOverview';
import ProspectsList from './ProspectsList';
import dayjs from 'dayjs';
import Export from '../../../../../components/icons/Export';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const CampTitle = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  font-family: 'Lato';
  font-style: normal;
`;
const ExportButton = styled(Button)`
  font-weight: 700;
  border-radius: 5px;

  &:hover {
    background: #4aacea !important;
    background-color: #4aacea !important;
  }
`;
const Time = styled(Typography)`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #999999;
  margin-top: 10px;
`;

const Status = styled.div`
  width: auto;
  height: 34px;
  background: ${props => props.backgroundColor};
  border-radius: 5px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 5px 15px;
  margin-right: 10px;
`;
const ProspectDetails = ({
  prospectsList,
  campaginDetails,
  overviewStatus,
  downloadCampDetails,
  selectedWhatsAppCampagin,
  page,
  setPage,
}) => {
  const hoverColor = {
    Opened: '5px solid #4AACEA',
    Replied: '5px solid #00AC4F',
    Bounced: '5px solid #F25511',
    Delivered: '5px solid #AD2F24',
  };
  const backgroundColor = {
    Completed: '#4AACEA',
    Running: '#23B33A',
  };
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <>
      <Card style={{ borderRadius: '10px' }}>
        <Row>
          <Col span={24}>
            <Flex spaceBetween>
              <div>
                <CampTitle>{campaginDetails?.campaign?.name}</CampTitle>
                <Time>
                  {dayjs
                    ?.utc(selectedWhatsAppCampagin?.start_date)
                    ?.format('MMM DD, YYYY HH:mmA')}
                </Time>
              </div>
              <div style={{ display: 'flex' }}>
                <Status
                  backgroundColor={
                    backgroundColor[selectedWhatsAppCampagin?.list_status]
                  }
                >
                  {selectedWhatsAppCampagin?.list_status}
                </Status>
                <ExportButton
                  type="primary"
                  disabled={selectedWhatsAppCampagin?.exportbutton === 0}
                  onClick={() => {
                    downloadCampDetails(campaginDetails?.campaign?.id);
                  }}
                >
                  <Export />
                </ExportButton>
              </div>
            </Flex>
          </Col>
        </Row>
        <Divider style={{ width: '100%' }} />
        <Flex spaceAround>
          {ProspectInfo?.map((item, id) => {
            return (
              <ProspectOverview
                key={id}
                item={item}
                overviewStatus={overviewStatus}
                hoverColor={hoverColor[item?.title]}
              />
            );
          })}
        </Flex>
        <ProspectsList
          prospectsList={prospectsList}
          page={page}
          setPage={setPage}
          campaginDetails={campaginDetails}
        />
      </Card>
    </>
  );
};

export default ProspectDetails;
