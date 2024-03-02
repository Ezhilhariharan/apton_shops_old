import { Card, Typography } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import InfoCard from './partials/InfoCard';
import TopButtons from './partials/TapButtons';
import { CampaginsInfo } from './constants';
import Flex from '@components/common/Flex';
import Filters from './partials/Filters';
import NoCampCard from './partials/NoCampCard';
import styled from 'styled-components';
import WhatsAppCampList from './partials/WhatsAppCampList';
import { EmptyHeader } from '@components/common/EmptyHeader';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateCampSetp1, updateCampStep2 } from '../subcomponet/actions';

const Wrapper = styled.div`
  padding: 1rem;
`;
const Title = styled(Typography.Text)`
  font-weight: 600;
  font-size: 1rem;
  line-height: 22px;
  color: #000000;
  margin: 20px;
`;

const WhatsAppCampagin = ({
  // state
  campOverViewCard,
  socialMediaList,
  whatsCampaginList,
  selectedWhatsAppCampagin,
  // actions
  getSocialMediaList,
  whatsappOverviewCardAPI,
  whatsappCampaignListAPI,
  wpCampaignActivateandDeactivate,
  updateSelectedCampagin,
}) => {
  const [list, setList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [statusTitle, setStatusTitle] = useState('All');
  const [selectedCard, setSelectedCard] = useState();
  const [click, setClick] = useState(true);
  const [selectionType, setSelectionType] = useState([]);
  const dispatch = useDispatch();

  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  useEffect(() => {
    getSocialMediaList();
    whatsappOverviewCardAPI();
    // whatsappCampaignListAPI();
    dispatch(updateCampSetp1({}));
    dispatch(updateCampStep2({}));
  }, []);
  useEffect(() => {
    getSocialMediaList();
    whatsappOverviewCardAPI();
  }, [brand]);
  useEffect(() => {
    if (statusTitle !== 'All') {
      whatsappCampaignListAPI(pageNumber, statusTitle);
    }
  }, [brand, statusTitle]);

  useEffect(() => {
    whatsappCampaignListAPI(pageNumber, statusTitle);
  }, [pageNumber]);

  useEffect(() => {
    setList(whatsCampaginList?.whatsapp_campaigns);
  }, [whatsCampaginList]);
  const whatsAppConnected = socialMediaList.find(
    i => i.platform_name === 'WhatsApp'
  );
  const whatsAppConnectStatus =
    whatsAppConnected?.connection_status === 1 ? false : true;

  const filterList = data => {
    let backendList = whatsCampaginList?.whatsapp_campaigns;
    let compaignList = backendList?.filter(item => item?.list_status === data);
    setList(compaignList);
  };
  const hoverColor = {
    Completed: '5px solid #4AACEA',
    Running: '5px solid #00AC4F',
    Draft: '5px solid #F25511',
    Scheduled: '5px solid #FFDD55',
  };
  const totalCounts =
    (campOverViewCard?.draft ? campOverViewCard?.draft : 0) +
    (campOverViewCard?.scheduled ? campOverViewCard?.scheduled : 0) +
    (campOverViewCard?.active ? campOverViewCard?.active : 0) +
    (campOverViewCard?.completed ? campOverViewCard?.completed : 0);

  const dynamicCounts =
    statusTitle === 'All' && statusTitle === ''
      ? totalCounts
      : statusTitle === 'Completed'
      ? campOverViewCard?.completed || 0
      : statusTitle === 'Running'
      ? campOverViewCard?.active || 0
      : statusTitle === 'Draft'
      ? campOverViewCard?.draft || 0
      : statusTitle === 'Scheduled'
      ? campOverViewCard?.scheduled || 0
      : totalCounts;

  useEffect(() => {
    if (click) {
      setSelectedCard(null);
      setStatusTitle('All');
      setPageNumber(1);
    }
  }, [click]);
  return (
    <Fragment>
      <EmptyHeader>
        <Title>{`You have ${dynamicCounts} total campaigns`}</Title>
      </EmptyHeader>
      <Wrapper>
        <Card style={{ minHeight: '80vh', height: 'auto' }}>
          <Flex spaceBetween>
            {CampaginsInfo?.map((item, id) => {
              return (
                <>
                  <InfoCard
                    hoverColor={hoverColor[item?.title]}
                    key={id}
                    item={item}
                    campOverViewCard={campOverViewCard}
                    filterList={filterList}
                    setSelectedCard={setSelectedCard}
                    active={selectedCard === id ? true : false}
                    keys={id}
                    setClick={setClick}
                    click={click}
                    statusTitle={statusTitle}
                    setStatusTitle={setStatusTitle}
                    setPageNumber={setPageNumber}
                    whatsAppConnectStatus={whatsAppConnectStatus}
                  />
                </>
              );
            })}
          </Flex>
          <div>
            <Filters
              campaginCount={whatsCampaginList?.whatsapp_campaigns?.length}
              whatsAppConnectStatus={whatsAppConnectStatus}
              updateSelectedCampagin={updateSelectedCampagin}
              selectedWhatsAppCampagin={selectedWhatsAppCampagin}
              selectionType={selectionType}
            />
          </div>
          {whatsCampaginList?.whatsapp_campaigns?.length === 0 && (
            <div>
              <NoCampCard
                whatsAppConnectStatus={whatsAppConnectStatus}
                updateSelectedCampagin={updateSelectedCampagin}
                selectedWhatsAppCampagin={selectedWhatsAppCampagin}
              />
            </div>
          )}
          {whatsCampaginList?.whatsapp_campaigns?.length > 0 && (
            <div>
              <WhatsAppCampList
                whatsCampaginList={list}
                wpCampaignActivateandDeactivate={
                  wpCampaignActivateandDeactivate
                }
                updateSelectedCampagin={updateSelectedCampagin}
                totalCounts={dynamicCounts}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                setSelectionType={setSelectionType}
                selectionType={selectionType}
              />
            </div>
          )}
        </Card>
      </Wrapper>
    </Fragment>
  );
};

export default WhatsAppCampagin;
