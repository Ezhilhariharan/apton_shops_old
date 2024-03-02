import React, { useEffect, useState } from 'react';
import Flex from '@components/common/Flex';
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Modal,
  Radio,
  Select,
  Space,
} from 'antd';
import styled from 'styled-components';
import SearchInputIcon from '../../../../../components/icons/SearchInputIcon';
import { typeData, categoryData } from './FilterData';
import { DownOutlined, CaretDownOutlined } from '@ant-design/icons';
import NewTemplatePopup from './NewTemplatePopup';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import CreateTemplateForm from './CreateTemplateForm';
import CreateTemplate from './CreateTemplate';
import EditTemplateCard from './EditTemplateCard';
import SubMenu from 'antd/lib/menu/SubMenu';
import Upgrade from '../../../../upgrade/components/Upgrade';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import SmallDownIcon from '../../../../../components/icons/SmallDownIcon';
import ThreeDotsHorizontalIcon from '../../../../../components/icons/ThreeDotsHorizontalIcon';

const items = [
  {
    key: '2',
    label: 'Category',
  },
  {
    key: '3',
    label: 'Marketing',
  },
  {
    key: '4',
    label: 'Transactional',
  },
];

const TemplateWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 19px;
  .selectCategory {
    width: 140px;
    height: 40px;
  }
  .displayAll {
    margin-right: 20px;
    background-color: transparent;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    // width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
    font-weight: 700;
    font-size: 1rem;
    line-height: 20px;
    color: #4d4d4d;
  }
  .ant-select-arrow {
    top: 55%;
  }
`;
const StyledInput = styled(Input)`
  width: 340px;
  height: 40px;
  border-radius: 5px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15));
  border: none !important;
`;

const NewTemplateButton = styled(Button)`
  color: ${lightColorsTheme.additionalBackground};
  background-color: ${lightColorsTheme.primary};
  width: 123px;
  font-weight: 700;
  font-size: 1rem;
  height: 40px;
  padding: 0;
  margin-left: 30px;
  border: none;
  &:hover {
    color: ${lightColorsTheme.additionalBackground};
    background-color: ${lightColorsTheme.primary};
  }
  &:focus {
    color: ${lightColorsTheme.additionalBackground};
    background-color: ${lightColorsTheme.primary};
  }
`;

export const NewTemplateCard = styled(Modal)`
  width: 850px !important;
  .ant-modal-content {
    border-radius: 20px;
    box-shadow: none;
  }
`;

const TemplateHeader = ({
  retrieveTemplate,
  createWhatsappTemplate,
  brands,
  mediaUpload,
  mediaUrl,
  getSingleTemplateOnEdit,
  singleTemplate,
  editWhatsappTemplate,
  getFileLocalPath,
  removeSingleTemplateOnEdit,
  filterByStatus,
  retrieveWhatsappMessageTemplates,
  setFilterByStatus,
  getListOfDrafts,
  whatsAppConnectStatus,
  updateMediaUrl,
  updateImageLocalPath,
  setPageNumber,
  pageNumber,
  selectedCategory,
  setSelelctedCategory,
  search,
  setSearch,
}) => {
  const [open, setOpen] = useState(false);
  const [openCreateTemplate, setCreateTemplate] = useState(false);
  const [openEditTemplate, setEditTemplate] = useState(false);
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const filterCategory = val => {
    setSelelctedCategory(val);
  };
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  useEffect(() => {
    retrieveWhatsappMessageTemplates(
      brand?.account_id,
      brand?.id,
      filterByStatus,
      selectedCategory,
      search
    );
  }, [selectedCategory, filterByStatus, search, pageNumber]);
  useEffect(() => {
    if (selectedCategory || search) {
      setPageNumber(1);
    }
  }, [selectedCategory, search]);
  return (
    <TemplateWrapper>
      <Flex spaceBetween>
        <div>
          <StyledInput
            prefix={<SearchInputIcon style={{ marginRight: '12px' }} />}
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div>
          {/* <Button onClick={() => setFilterByStatus("All")} className="displayAll">All status</Button> */}
          <Select
            className="selectCategory"
            value={selectedCategory}
            onChange={filterCategory}
            suffixIcon={
              <span style={{ marginBottom: '5px' }}>
                <SmallDownIcon style={{ width: '10px', height: '10px' }} />
              </span>
            }
          >
            <Option key="0" value="ALL">
              All Category
            </Option>
            <Option key="1" value="MARKETING">
              Marketing
            </Option>
            {/* <Option key='2' value='TRANSACTIONAL'>Transactional</Option> */}
            <Option key="3" value="UTILITY">
              Utility
            </Option>
          </Select>
          <NewTemplateButton
            onClick={() =>
              priceValidation?.add_template
                ? setOpen(true)
                : setOpenUpgrade(true)
            }
            disabled={whatsAppConnectStatus}
          >
            New Template
          </NewTemplateButton>
        </div>
      </Flex>
      <NewTemplatePopup
        setOpen={setOpen}
        open={open}
        setCreateTemplate={setCreateTemplate}
        setEditTemplate={setEditTemplate}
      />
      {/* <CreateTemplateForm
        setCreateTemplate={setCreateTemplate}
        createWhatsappTemplate={createWhatsappTemplate}
        brands={brands}
        setOpen={setOpen}
        mediaUpload={mediaUpload}
        mediaUrl={mediaUrl}
        getFileLocalPath={getFileLocalPath}
        openCreateTemplate={openCreateTemplate}
        removeSingleTemplateOnEdit={removeSingleTemplateOnEdit}
        updateMediaUrl={updateMediaUrl}
        updateImageLocalPath={updateImageLocalPath}
        setFilterByStatus={setFilterByStatus}
        setSelelctedCategory={setSelelctedCategory}
        setSearch={setSearch}
      /> */}
      <CreateTemplate />
      <EditTemplateCard
        retrieveTemplate={retrieveTemplate}
        getSingleTemplateOnEdit={getSingleTemplateOnEdit}
        accountId={brand?.account_id}
        brandId={brand?.id}
        singleTemplate={singleTemplate}
        createWhatsappTemplate={createWhatsappTemplate}
        brands={brands}
        setOpen={setOpen}
        openEditTemplate={openEditTemplate}
        setEditTemplate={setEditTemplate}
        mediaUpload={mediaUpload}
        mediaUrl={mediaUrl}
        editWhatsappTemplate={editWhatsappTemplate}
        getFileLocalPath={getFileLocalPath}
        removeSingleTemplateOnEdit={removeSingleTemplateOnEdit}
        setFilterByStatus={setFilterByStatus}
        setSelelctedCategory={setSelelctedCategory}
        setSearch={setSearch}
      />
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </TemplateWrapper>
  );
};

export default TemplateHeader;
