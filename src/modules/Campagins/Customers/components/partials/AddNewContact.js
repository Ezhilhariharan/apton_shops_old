import React, { useEffect, useState } from 'react';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { Button, Drawer, Dropdown } from 'antd';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import ChevronBlueIcon from '../../../../../components/icons/ChevronBlueIcon';
import AddCustomerDrawer from './AddCustomerDrawer';
import BulkUploadCustomerDrawer from './BulkUploadCustomerDrawer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateExportContact } from '../../actions';

const AddNewCustomerButton = styled(Dropdown)`
  width: 140px;
  height: 44px;
  z-index: 999;
  border: 2px solid ${lightColorsTheme.primary};
  background-color: ${lightColorsTheme.additionalBackground};
  color: ${lightColorsTheme.primary};
  cursor: pointer;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  .marginText {
    margin-right: 10px;
  }
`;
const ExportButton = styled(Button)`
  width: 89px;
  height: 44px;
  background-color: ${lightColorsTheme.primary} !important;
  border-radius: 5px;
  color: ${lightColorsTheme.additionalBackground} !important;
  font-weight: 700;
  font-size: 16px;
  margin-right: 20px;
`;
const CustomizedMenu = styled.div`
  cursor: pointer;
`;
const HeaderWrapper = styled.div`
  background-color: ${lightColorsTheme.additionalBackground};
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .margin {
    margin-left: 20px;
    font-weight: 700;
    font-size: 16px;
    color: ${lightColorsTheme.textColorLight};
  }
`;
const DeleteButton = styled(Button)`
  background-color: ${lightColorsTheme.additionalBackground} !important;
  width: 80px;
  color: ${lightColorsTheme.black} !important;
  font-weight: 550;
  border: 2px solid ${lightColorsTheme.grayText} !important;
  margin-right: 20px;
  padding: 0;
  height: 44px;
  font-size: 16px;
`;

const AddNewContact = ({
  createWhatsappContact,
  removeContactDetailsCancelSubmit,
  exportFileMethod,
  bulkUploadMethod,
  newOldFilter,
  searchTag,
  fromDate,
  toDate,
  contacts,
  deleteContact,
  selectedKeys,
  setSelectedKeys,
  pageNumber,
  setPageNumber,
  limit,
}) => {
  const [openAddCustomerDrawer, setOpenDrawer] = useState(false);
  const [openBulkDrawer, setOpenBulkDrawer] = useState(false);
  const dispatch = useDispatch();
  const items = [
    {
      label: (
        <CustomizedMenu onClick={() => setOpenDrawer(true)}>
          Single Contact
        </CustomizedMenu>
      ),
      key: '0',
    },
    {
      label: (
        <CustomizedMenu onClick={() => setOpenBulkDrawer(true)}>
          Bulk Upload
        </CustomizedMenu>
      ),
      key: '1',
    },
  ];
  const exportData = useSelector(
    state => state.customerReducer.contactFile,
    shallowEqual
  );
  const exportFile = () => {
    exportFileMethod(newOldFilter, searchTag, fromDate, toDate);
  };
  useEffect(() => {
    if (typeof exportData === 'string' && exportData) {
      window?.open(exportData);
      dispatch(updateExportContact({}));
    }
  }, [exportData]);
  const handleDelete = () => {
    deleteContact(
      selectedKeys,
      Math.ceil(contacts?.customer_count / limit) === pageNumber
        ? 1
        : pageNumber,
      setSelectedKeys,
      Math.ceil(contacts?.customer_count / limit) === pageNumber &&
        setPageNumber
    );
  };

  return (
    <>
      <HeaderWrapper>
        <div className="margin">
          {contacts?.customer_count !== 0 && contacts?.customer_count && (
            <div className="totalText">{`Your have ${contacts?.customer_count} total contacts`}</div>
          )}
        </div>
        <Flex end>
          {selectedKeys?.length > 0 ? (
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          ) : (
            <AddNewCustomerButton menu={{ items }} trigger={['click']}>
              <Flex>
                <div className="marginText">Add New</div>
                <ChevronBlueIcon />
              </Flex>
            </AddNewCustomerButton>
          )}
          <ExportButton onClick={exportFile}>Export</ExportButton>
        </Flex>
      </HeaderWrapper>
      <AddCustomerDrawer
        open={openAddCustomerDrawer}
        placement="right"
        setOpen={setOpenDrawer}
        createWhatsappContact={createWhatsappContact}
        type="CREATE"
        removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      <BulkUploadCustomerDrawer
        open={openBulkDrawer}
        placement="right"
        setOpen={setOpenBulkDrawer}
        bulkUploadMethod={bulkUploadMethod}
      />
    </>
  );
};

export default AddNewContact;
