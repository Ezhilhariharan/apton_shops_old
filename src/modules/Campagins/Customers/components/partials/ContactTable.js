import { Col, Dropdown, Pagination, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import Flex from '../../../../../components/common/Flex';
import ThreeDotsHorizontalIcon from '../../../../../components/icons/ThreeDotsHorizontalIcon';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import ActionModal from './ActionModal';
import AddCustomerDrawer from './AddCustomerDrawer';
import AddNewContact from './AddNewContact';
import PreviewModal from './PreviewModal';
import BlueTagIcon from '@components/icons/BlueTagIcon';
import { setOfColors } from './SetOfColors';

export const NameStyle = styled.div`
  color: ${lightColorsTheme.textColorLight};
  font-size: 0.875rem;
  font-weight: 700;
  ${props =>
    props.tag === 'tag' &&
    `
    display: flex;
    align-items: center;
    `};
  .blueBox {
    background: rgba(55, 113, 200, 0.1);
    border-radius: 20px;
    color: #3771c8;
    padding: 0 10px 0 10px;
    font-weight: 500;
    font-size: 1rem;
    height: 28px;
    display: flex;
    align-items: center;
  }
`;
export const NameAbbreavation = styled(Flex)`
  ${props => `background-color: ${props.randomColor}`};
  border-radius: 50px;
  padding: 6px;
  font-weight: 700;
  font-size: 0.875rem;
  margin-right: 10px;
  min-width: 35px;
  min-height: 35px;
`;
export const StyledTable = styled(Table)`
  .category {
    text-align: center;
  }
  .ant-table thead th {
    height: 20px;
    color: #181818;
    font-weight: 700;
    font-size: 1rem;
    border: none;
    padding: 20px 20px;
    background: #f4f4f5;
    border-bottom: 1px solid #f4f4f5;
    border-top: 1px solid #f4f4f5;
    &:hover {
      bakcground-color: transparent;

    }
    :before {
      display: none;
    }
    &:nth-child(1) {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
    }
    &:nth-last-child(1) {
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
    }
    &:nth-child(2) {
      padding: 0 20px !important;
    }
  }

  .ant-table thead tr > th:nth-child(2) {
    padding: 0px !important;
  }

  .maxWidthTags {
    max-width: 150px;
    padding: 5px;
    width: auto;
  }
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: transparent !important;
  }
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: transparent !important;
  }
  .ant-table-cell {
    padding: 20px;
    justify-content: center;
    font-weight: 400;
    font-size: 1rem;
    line-height: 20px;
    color: #4d4d4d;
    div {
      align-items: center;
    }
  }

    }
    :before {
      display: none;
    }
    &:nth-child(1) {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
    }
    &:nth-last-child(1) {
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
    }
    &:nth-child(2) {
      padding: 0 20px !important;
    }
  }

  .ant-table thead tr > th:nth-child(2) {
    padding: 0px !important;
  }

  .maxWidthTags {
    max-width: 150px;
    padding: 5px;
    width: auto;
  }
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: transparent !important;
  }
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: transparent !important;
  }
  .ant-table-cell {
    padding: 20px 10px ;
    justify-content: center;
    font-weight: 400;
    font-size: 1rem;
    line-height: 20px;
    color: #4d4d4d;
      // color: red;
    div {
      align-items: center;
    }
  }

  // .ant-table-tbody > tr > td > div {
  //   display: flex !important;
  //   // justify-content: center !important;
  //   // align-item: center !important;
  // }
  .ant-table-tbody > tr > td > div > div {
    height: 0px !important;
  }
  .ant-table-tbody > tr > td > div > p {
    margin: 0 !important;
  }
  .ant-checkbox-inner {
    border: 2px solid #181818;
    border-radius: 3px;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    border: 1px solid #4aacea;
    border-radius: 3px;
  }
  .ant-table-tbody > tr:hover > td {
    background-color: transparent;
  }
  //   .odd-row {
  //     background-color: #f8f8f8;
  //   }
`;
export const CustomerPagination = styled(Pagination)`
  margin-top: 15px;
  .ant-pagination-options-size-changer.ant-select {
    display: none;
  }
`;
export const TableWrapper = styled.div`
  padding-bottom: 30px;
`;

const ContactTable = ({
  deleteContact,
  singleContactDetails,
  updateEditedContact,
  removeContactDetailsCancelSubmit,
  contactList,
  selectedBrand,
  pageNumber,
  setPageNumber,
  selectedKeys,
  setSelectedKeys,
  limit,
}) => {
  const contacts = useSelector(
    state => state.customerReducer.contacts,
    shallowEqual
  );
  const [openAction, SetOpenAction] = useState(false);
  const [openEditContact, setEditContact] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      className: 'headerStyle',
      width: '200px',
      render: (first_name, record, index) => {
        let randomColor = setOfColors[index];
        return (
          <>
            <Flex alignCenter>
              <NameAbbreavation center alignCenter randomColor={randomColor}>
                {record?.last_name
                  ? first_name[0]?.toUpperCase() +
                    record?.last_name[0]?.toUpperCase()
                  : first_name[0]?.toUpperCase()}
              </NameAbbreavation>
              <NameStyle>{first_name ? first_name : '-'}</NameStyle>
            </Flex>
          </>
        );
      },
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      className: 'headerStyle',
      width: '300px',
      align: 'center',
      render: (last_name, record, index) => {
        return (
          <Flex center>
            <NameStyle>{record?.last_name ? record?.last_name : '-'}</NameStyle>
          </Flex>
        );
      },
    },
    {
      title: 'Mobile Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      className: 'headerStyle',
      width: '250px',
      render: phone_number => {
        return <NameStyle>{phone_number ? phone_number : '-'}</NameStyle>;
      },
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
      className: 'headerStyle',
      align: 'center',
      render: email => {
        return <NameStyle>{email ? email : '-'}</NameStyle>;
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      className: 'headerStyle',
      align: 'center',
      width: '250px',
      render: location => {
        return (
          <Flex center>
            <NameStyle>{location ? location : '-'}</NameStyle>
          </Flex>
        );
      },
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      className: 'maxWidthTags',
      align: 'center',
      width: '250px',
      render: tags => {
        return (
          <Flex center>
            <NameStyle tag="tag">
              <Row gutter={[10, 8]}>
                {tags?.length > 0 && Array.isArray(tags)
                  ? tags?.map((tag, ind) => {
                      return (
                        <Col key={ind}>
                          <Flex centerVertically className="blueBox">
                            <BlueTagIcon style={{ marginRight: '5px' }} />
                            {tag}
                          </Flex>
                        </Col>
                      );
                    })
                  : '-'}
              </Row>
            </NameStyle>
          </Flex>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      className: 'headerStyle',
      render: (actions, record, index) => {
        const handleOpen = (visible, record) => {
          if (!visible) {
            SetOpenAction(null);
          } else {
            SetOpenAction(record?.id);
          }
        };
        return (
          <>
            <Dropdown
              trigger={['click']}
              onClick={() => SetOpenAction(true)}
              onOpenChange={visible => handleOpen(visible, record)}
              open={openAction === record?.id}
              dropdownRender={() => (
                <ActionModal
                  openAction={openAction}
                  deleteContact={deleteContact}
                  singleContactDetails={singleContactDetails}
                  setEditContact={setEditContact}
                  contactId={record?.id}
                  SetOpenAction={SetOpenAction}
                  setOpenPreview={setOpenPreview}
                  pageNumber={pageNumber}
                  contacts={contacts}
                  limit={limit}
                  setPageNumber={setPageNumber}
                />
              )}
            >
              <div style={{ cursor: 'pointer' }}>
                <ThreeDotsHorizontalIcon
                  style={{ transform: 'rotate(270deg)' }}
                />
              </div>
            </Dropdown>
          </>
        );
      },
    },
  ];
  const handlePagination = page => {
    setPageNumber(page);
  };
  useEffect(() => {
    setPageNumber(1);
  }, [selectedBrand?.id]);
  const onSelectChange = newSelectedRowKeys => {
    setSelectedKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedKeys,
    onChange: onSelectChange,
  };
  const getRowClassName = (record, index) => {
    return index % 2 != 1 ? 'odd-row' : '';
  };
  return (
    <>
      <TableWrapper>
        {contacts !== '' && (
          <StyledTable
            rowKey="id"
            rowClassName={getRowClassName}
            rowSelection={rowSelection}
            dataSource={contacts?.brand_customers}
            columns={columns}
            pagination={false}
          />
        )}
        {contacts?.customer_count > 10 && (
          <Flex end>
            <CustomerPagination
              total={contacts?.customer_count}
              current={pageNumber}
              onChange={handlePagination}
            />
          </Flex>
        )}
      </TableWrapper>
      <AddCustomerDrawer
        open={openEditContact}
        setOpen={setEditContact}
        placement="right"
        updateEditedContact={updateEditedContact}
        pageNumber={pageNumber}
        type="EDIT"
        removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
      />
      <PreviewModal
        openPreview={openPreview}
        // openPreview={openPreview}

        // openPreview={openPreview}
        // openPreview={openPreview}

        setOpenPreview={setOpenPreview}
        removeContactDetailsCancelSubmit={removeContactDetailsCancelSubmit}
      />
    </>
  );
};

export default ContactTable;
