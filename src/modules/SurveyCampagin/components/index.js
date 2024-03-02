import React, { Fragment, useEffect, useState } from 'react';
import { EmptyHeader } from '@components/common/EmptyHeader';
import styled from 'styled-components';
import InfoCard from '../../Campagins/whatsapp/components/partials/InfoCard';
import { BotInfo } from '../../Campagins/whatsapp/components/constants';
import Flex from '@components/common/Flex';
import { Card } from 'antd';
import SurveyList from './partials/SurveyList';
import FilterSection from './partials/FilterSection';
import BotInfoCard from './partials/BotInfoCard';
import { useSelector } from 'react-redux';
import { Button, Tooltip ,Typography} from 'antd';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 1rem;
`;
const Text =styled(Typography)`
font-weight:700;
font-size:18px;
text-align:center;
margin-bottom:10px;`
const SurveyCampagin = ({
  whatsAppSurveyList,
  fetchWhatsAppSurveyList,
  updateBotStatus,
  fetchBotOverViews,
  botsOverview,
}) => {
  const hoverColor = {
    Draft: '4px solid #4AACEA',
    Active: '4px solid #00AC4F',
    Inactive: '4px solid #F25511',
  };
  useEffect(() => {
    fetchWhatsAppSurveyList();
    fetchBotOverViews();
  }, []);
  const navigate=useNavigate()
  const mediaList = useSelector(
    state => state.integrationSelector.socialMediaList
  );
  const whatsAppConnected = mediaList?.find(
    i => i.platform_name === 'WhatsApp'
  );
  const whatsAppConnectStatus =
    whatsAppConnected?.connection_status === 1 ? false : true;
  const [list, setList] = useState([]);
  const [selectedCard, setSelectedCard] = useState();
  const [statusTitle, setStatusTitle] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    if (statusTitle === null) {
      setList(whatsAppSurveyList?.survey_bots);
    }
  }, [whatsAppSurveyList, statusTitle]);

  const filterList = data => {
    let backendList = whatsAppSurveyList?.survey_bots;
    let botsList = backendList.filter(item => item?.status === data);
    setList(botsList);
  };
  const totalCounts =
    (botsOverview?.draft ? botsOverview?.draft : 0) +
    (botsOverview?.active ? botsOverview?.active : 0) +
    (botsOverview?.inactive ? botsOverview?.inactive : 0);
  return (
    <Fragment>
      <EmptyHeader />
      <Wrapper>
        <Card style={{ height: 'auto', borderRadius: 10 }}>
          <Flex spaceBetween>
            {BotInfo.map((item, id) => {
              return (
                <BotInfoCard
                  item={item}
                  keys={id}
                  hoverColor={hoverColor[item?.title]}
                  filterList={filterList}
                  campOverViewCard={botsOverview}
                  active={selectedCard?.id === id ? true : false}
                  setSelectedCard={setSelectedCard}
                  setStatusTitle={setStatusTitle}
                  setPageNumber={setPageNumber}
                />
              );
            })}
          </Flex>
          <div>
            <FilterSection
              campaginCount={list?.length}
              setStatusTitle={setStatusTitle}
              setSelectedCard={setSelectedCard}
              setPageNumber={setPageNumber}
              whatsAppConnectStatus={whatsAppConnectStatus}
            />
          </div>
          {list?.length > 0 ? (
            <div style={{ marginTop: '1rem' }}>
              <SurveyList
                whatsAppSurveyList={list}
                updateBotStatus={updateBotStatus}
                totalCounts={totalCounts}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
              />
            </div>
          ) : (
            <div
              style={{
                marginTop: '1rem',
                height: '300px',
                width:"100%",
                margin: 'auto',
                alignItems: 'center',
                justifyContent:"center",
                display: 'grid',
              }}
            >
              <div>
              <Text>No Bots Found </Text>
                <Button
                  type="primary"
                  onClick={() => navigate('/create-bot')}
                  disabled={whatsAppConnectStatus ? true : false}
                >
                  {' '}
                  Create Bot
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Wrapper>
    </Fragment>
  );
};

export default SurveyCampagin;
