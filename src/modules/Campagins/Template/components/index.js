import React, { useEffect, useState } from 'react';
import { EmptyHeader } from '@components/common/EmptyHeader';
import styled from 'styled-components';
import { Card, Input } from 'antd';
import Flex from '@components/common/Flex';
import CompaignInfo from './partials/CompaignInfo';
import TemplateHeader from './partials/TemplateHeader';
import TemplateTable from './partials/TemplateTable';
import TemplateOverviewCards from './partials/TemplateOverviewCards';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const Wrapper = styled.div`
  padding: 1rem;
`;

const WhatsappTemplate = ({
  overviewTemplate,
  getOverviewCardTemplate,
  currentUserInfo,
  retrieveWhatsappMessageTemplates,
  retrieveTemplate,
  createWhatsappTemplate,
  mediaUpload,
  mediaUrl,
  editWhatsappTemplate,
  getSingleTemplateOnEdit,
  singleTemplate,
  deleteWhatsappTemplate,
  getFileLocalPath,
  removeSingleTemplateOnEdit,
  getListOfDrafts,
  deleteDraft,
  socialMediaList,
  getSocialMediaList,
  updateMediaUrl,
  updateImageLocalPath,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCategory, setSelelctedCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const brands = currentUserInfo?.brands;
  const [filterByStatus, setFilterByStatus] = useState('Approved');
  const [click, setClick] = useState(true);
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const accountId = brand?.account_id;
  const brandId = brand?.id;
  const whatsAppConnected = socialMediaList.find(
    i => i.platform_name === 'WhatsApp'
  );
  const whatsAppConnectStatus =
    whatsAppConnected?.connection_status === 1 ? false : true;

  // useEffect(() => {
  //   getOverviewCardTemplate();
  //   retrieveWhatsappMessageTemplates(accountId, brandId);
  //   getSocialMediaList();
  // }, []);
  useEffect(() => {
    getOverviewCardTemplate();
    retrieveWhatsappMessageTemplates(accountId, brandId);
    getSocialMediaList();
  }, [brand]);
  useEffect(() => {
    setFilterByStatus(null);
  }, [click]);

  return (
    <>
      <EmptyHeader />
      <Wrapper>
        <Card>
          <TemplateOverviewCards
            overviewTemplate={overviewTemplate}
            getListOfDrafts={getListOfDrafts}
            setFilterByStatus={setFilterByStatus}
            filterByStatus={filterByStatus}
            click={click}
            setClick={setClick}
          />
          <TemplateHeader
            retrieveTemplate={retrieveTemplate}
            createWhatsappTemplate={createWhatsappTemplate}
            brands={brands}
            mediaUpload={mediaUpload}
            mediaUrl={mediaUrl}
            getSingleTemplateOnEdit={getSingleTemplateOnEdit}
            singleTemplate={singleTemplate}
            editWhatsappTemplate={editWhatsappTemplate}
            getFileLocalPath={getFileLocalPath}
            removeSingleTemplateOnEdit={removeSingleTemplateOnEdit}
            filterByStatus={filterByStatus}
            retrieveWhatsappMessageTemplates={retrieveWhatsappMessageTemplates}
            setFilterByStatus={setFilterByStatus}
            getListOfDrafts={getListOfDrafts}
            whatsAppConnectStatus={whatsAppConnectStatus}
            updateMediaUrl={updateMediaUrl}
            updateImageLocalPath={updateImageLocalPath}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            selectedCategory={selectedCategory}
            setSelelctedCategory={setSelelctedCategory}
            search={search}
            setSearch={setSearch}
          />
          <TemplateTable
            retrieveTemplate={retrieveTemplate}
            editWhatsappTemplate={editWhatsappTemplate}
            deleteWhatsappTemplate={deleteWhatsappTemplate}
            getSingleTemplateOnEdit={getSingleTemplateOnEdit}
            brands={brands}
            createWhatsappTemplate={createWhatsappTemplate}
            mediaUpload={mediaUpload}
            mediaUrl={mediaUrl}
            removeSingleTemplateOnEdit={removeSingleTemplateOnEdit}
            filterByStatus={filterByStatus}
            getListOfDrafts={getListOfDrafts}
            retrieveWhatsappMessageTemplates={retrieveWhatsappMessageTemplates}
            deleteDraft={deleteDraft}
            getFileLocalPath={getFileLocalPath}
            overviewTemplate={overviewTemplate}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            setSelelctedCategory={setSelelctedCategory}
            setSearch={setSearch}
            setFilterByStatus={setFilterByStatus}
            whatsAppConnectStatus={whatsAppConnectStatus}
          />
        </Card>
      </Wrapper>
    </>
  );
};

export default WhatsappTemplate;
