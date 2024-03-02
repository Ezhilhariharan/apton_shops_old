import { Button, Checkbox, Dropdown, Table, Modal, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import { MoreOutlined, LoadingOutlined } from '@ant-design/icons';
import PreviewTemplate from './PreviewTemplate';
import CreateTemplateForm from './CreateTemplateForm';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Flex from '../../../../../components/common/Flex';
import { CustomerPagination } from '../../../Customers/components/partials/ContactTable';
import ThreeDotsHorizontalIcon from '../../../../../components/icons/ThreeDotsHorizontalIcon';
import moment from 'moment';
import { Spin } from 'antd';
import { StyledTable } from '../../../Customers/components/partials/ContactTable';
import {
  updateSingleTemplate,
  uploadTemplateForm,
  createTemplatePopup,
  updateHeaderVariable,
  updateEditTemplate,
} from '../../actions';

const ColouredStatus = styled('div')`
  border-radius: 30px;
  height: 34px;
  width: 120px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    props.currentStatus === 'APPROVED'
      ? `
        background-color: rgba(0, 172, 79, 0.1);
        color: ${lightColorsTheme.approvedColor};
        
    `
      : props.currentStatus == 0
      ? `
        background-color: rgba(74, 172, 234, 0.1);
        color: ${lightColorsTheme.primary};
    `
      : props.currentStatus === 'PENDING'
      ? `
        background-color: rgba(242, 85, 17, 0.1);
        color: ${lightColorsTheme.pendingColor};
    `
      : `
        background-color: rgba(218, 0, 26, 0.1);
        color: ${lightColorsTheme.passwordError};
    `};
`;
const DateBox = styled.div`
  color: ${lightColorsTheme.textColorLight};
  font-size: 1rem;
  font-weight: 400;
`;
const EachTab = styled(Button)`
  height: 25px;
  margin-top: 10px;
  border: none !important;
  background-color: transparent !important;
  margin-left: 10px;
`;
const PopupChild = styled.div`
  background-color: ${lightColorsTheme.additionalBackground};
  width: 100px;
  height: auto;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 14px rgba(0, 0, 0, 0.15));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
`;

const hoverColor = {
  DRAFT: '#4AACEA',
  APPROVED: '#00AC4F',
  REJECTED: '#DA001A',
  PENDING: '#F25511',
};
const backgroundColor = {
  DRAFT: 'rgb(200 228 246)',
  APPROVED: 'rgb(195 244 217)',
  REJECTED: '#DA001A1A',
  PENDING: '#F255111A',
};

const TemplateTable = ({
  retrieveTemplate,
  editWhatsappTemplate,
  deleteWhatsappTemplate,
  getSingleTemplateOnEdit,
  createWhatsappTemplate,
  brands,
  mediaUpload,
  mediaUrl,
  removeSingleTemplateOnEdit,
  filterByStatus,
  getListOfDrafts,
  retrieveWhatsappMessageTemplates,
  deleteDraft,
  getFileLocalPath,
  overviewTemplate,
  setPageNumber,
  pageNumber,
  whatsAppConnectStatus,
}) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [openDropDown, setDropdown] = useState(null);

  const templateListLoader = useSelector(
    state => state.whatsappTemplate.loading,
    shallowEqual
  );
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );

  const templateField = useSelector(
    state => state?.whatsappTemplate?.templateField,
    shallowEqual
  );
  const headerVariable = useSelector(
    state => state?.whatsappTemplate?.headerVariable,
    shallowEqual
  );

  const [hoverEdit, setHover] = useState(false);
  const [type, setType] = useState('');
  const [currentTime, setCurrentTime] = useState();
  const [openCreateTemplate, setCreateTemplate] = useState(false);
  const [currentPage, setCurrentPage] = useState(10);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const hanglePagination = page => {
    setCurrentPage(page?.pageSize);
    retrieveWhatsappMessageTemplates(
      brand?.account_id,
      brand?.id,
      null,
      null,
      null,
      currentPage
    );
  };
  const approvedEdit = approved => {
    if (approved) {
      setDropdown(null);
      dispatch(createTemplatePopup(true));
      dispatch(updateEditTemplate(approved));
    }
  };

  const convertingTime = meta_modified_at => {
    let date = meta_modified_at?.split('T')[0];
    let Time = meta_modified_at?.split('T')[1];
    let properDate = new Date(
      date?.split('-')[0],
      date?.split('-')[1] - 1,
      date?.split('-')[2],
      Time?.split(':')[0],
      Time?.split(':')[1]
    );
    return properDate;
  };

  const handlePreview = (approved, draft) => {
    setDropdown(null);
    dispatch(updateSingleTemplate(approved?.components));
    // getSingleTemplateOnEdit(approved?.id, brand?.account_id, brand?.id, draft);
    setOpenPreview(true);
  };
  const pendingDelete = pending => {
    setDropdown(null);
    deleteWhatsappTemplate(pending?.name, brand?.account_id, brand?.id);
  };
  const draftDelete = record => {
    setDropdown(null);
    // deleteDraft(record.id);
    deleteWhatsappTemplate(record?.name, brand?.account_id, brand?.id);
    setPageNumber(1);
  };
  const createFromDraft = (template, draft) => {
    setType('DRAFT');
    setCreateTemplate(true);
    setDropdown(null);
    getSingleTemplateOnEdit(template?.id, brand?.account_id, brand?.id, draft);
  };
  useEffect(() => {
    const time = new Date().getTime();
    setCurrentTime(time);
  }, [hoverEdit]);
  const columns = [
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
      width: '350px',
    },
    {
      title: () => {
        return <div className="category">Category</div>;
      },
      dataIndex: 'category',
      key: 'category',
      width: '200px',
      textTransform: 'capitalize !important',
      render: text => {
        return (
          <Flex center style={{ textTransform: 'capitalize !important' }}>
            {text?.slice(0, 1)?.toUpperCase() + text?.slice(1)?.toLowerCase()}
          </Flex>
        );
      },
    },
    {
      title: 'Language',
      key: 'language',
      dataIndex: 'language',
      width: '250px',
      align: 'center',
      render: text => {
        return <Flex center>{text}</Flex>;
      },
    },

    {
      title: 'Updated at',
      dataIndex: 'meta_modified_at',
      key: 'meta_modified_at',
      align: 'center',
      width: '300px',
      render: (data, obj) => {
        let fullDate = convertingTime(obj?.meta_modified_at);
        const displayedTime =
          fullDate && moment(fullDate).format('MMM DD, YYYY h:mm a');
        return (
          <>
            <DateBox>{displayedTime}</DateBox>
          </>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: '200px',
      render: (status, record, index) => {
        return (
          <Flex center>
            {status === 'REJECTED' ? (
              <Tooltip
                title={record?.rejected_reason}
                color={lightColorsTheme.passwordError}
              >
                <span
                  currentStatus={status}
                  style={{
                    borderRadius: '30px',
                    textTransform: 'capitalize',
                    padding: '7px',
                    fontSize: '14px',
                    width: '90px',
                    height: '34px',
                    backgroundColor: backgroundColor[status],
                    color: hoverColor[status],
                  }}
                >
                  {status?.slice(0, 1)?.toUpperCase() +
                    status?.slice(1)?.toLowerCase()}
                </span>
              </Tooltip>
            ) : status === 'PENDING' ? (
              <span
                style={{
                  borderRadius: '30px',
                  padding: '7px',
                  fontSize: '14px',
                  width: '90px',
                  height: '34px',
                  backgroundColor: backgroundColor[status],
                  color: hoverColor[status],
                }}
              >
                {' '}
                In-review
              </span>
            ) : (
              <span
                currentStatus={status}
                style={{
                  borderRadius: '30px',
                  textTransform: 'capitalize',
                  padding: '7px',
                  fontSize: '14px',
                  width: '90px',
                  height: '34px',
                  backgroundColor: backgroundColor[status],
                  color: hoverColor[status],
                }}
              >
                {status == 0
                  ? 'Draft'
                  : status?.slice(0, 1)?.toUpperCase() +
                    status?.slice(1)?.toLowerCase()}
              </span>
            )}
          </Flex>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',

      render: (status, record, index) => {
        const convertedTime = convertingTime(record?.meta_modified_at);
        let lastUpdatedTime = convertedTime?.getTime();
        let computedDay;
        computedDay =
          (parseInt(currentTime) - parseInt(lastUpdatedTime)) /
          (24 * 60 * 60 * 1000);
        const handleDropdown = (visible, record) => {
          if (!visible) {
            setDropdown(null);
            setHover(false);
          } else {
            setDropdown(record?.id);
            setHover(true);
          }
          computedDay =
            (parseInt(currentTime) - parseInt(lastUpdatedTime)) /
            (24 * 60 * 60 * 1000);
        };
        return (
          <div style={{ cursor: 'pointer' }}>
            <Dropdown
              trigger={['click']}
              open={openDropDown === record?.id}
              onOpenChange={visible => handleDropdown(visible, record)}
              dropdownRender={() => (
                <>
                  <PopupChild>
                    {status === 'APPROVED' && (
                      <div>
                        {parseInt(computedDay) < 1 ? (
                          <Tooltip
                            title="You have already edited template. Edit this template after 24 hours"
                            color="gray"
                          >
                            <EachTab
                              onClick={() => approvedEdit(record)}
                              onMouseEnter={() => setHover(true)}
                              onMouseLeave={() => setHover(false)}
                              disabled={parseInt(computedDay) < 1}
                            >
                              <span key="0">Edit</span>
                            </EachTab>
                          </Tooltip>
                        ) : (
                          <EachTab
                            onClick={() => approvedEdit(record)}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                          >
                            <span key="0">Edit</span>
                          </EachTab>
                        )}
                        <EachTab onClick={() => pendingDelete(record)}>
                          <span key="1">Delete</span>
                        </EachTab>
                        <EachTab onClick={() => handlePreview(record)}>
                          <span key="2">Preview</span>
                        </EachTab>
                      </div>
                    )}
                    {status === 'REJECTED' && (
                      <div>
                        <EachTab onClick={() => approvedEdit(record)}>
                          <span key="0">Edit</span>
                        </EachTab>
                        <EachTab onClick={() => pendingDelete(record)}>
                          <span key="1">Delete</span>
                        </EachTab>
                        <EachTab onClick={() => handlePreview(record)}>
                          <span key="2">Preview</span>
                        </EachTab>
                      </div>
                    )}
                    {status === 'PENDING' && (
                      <div>
                        <EachTab onClick={() => pendingDelete(record)}>
                          <span key="1">Delete</span>
                        </EachTab>
                        <EachTab onClick={() => handlePreview(record)}>
                          <span key="2">Preview</span>
                        </EachTab>
                      </div>
                    )}
                    {status == 'DRAFT' && (
                      <div>
                        <EachTab
                          // onClick={() => createFromDraft(record, 'draft')}
                          onClick={() => approvedEdit(record)}
                        >
                          <span key="0">Edit</span>
                        </EachTab>
                        <EachTab onClick={() => handlePreview(record)}>
                          <span key="1">Preview</span>
                        </EachTab>
                        <EachTab onClick={() => draftDelete(record)}>
                          <span key="1">Delete</span>
                        </EachTab>
                      </div>
                    )}
                  </PopupChild>
                </>
              )}
            >
              <ThreeDotsHorizontalIcon
                style={{ transform: 'rotate(270deg)', marginLeft: '15px' }}
              />
            </Dropdown>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getListOfDrafts(pageNumber, 10);
  }, [pageNumber]);

  const handlePagination = pageNumber => {
    retrieveWhatsappMessageTemplates(
      brand?.account_id,
      brand?.id,
      null,
      null,
      null,
      pageNumber
    );
  };

  useEffect(() => {
    setLoading(true);
    if (retrieveTemplate?.data?.length > 0) {
      setLoading(false);
    }
  }, [retrieveTemplate?.data]);

  const getRowClassName = (record, index) => {
    return index % 2 != 1 ? 'odd-row' : '';
  };
  return (
    <>
      <StyledTable
        className="template"
        columns={columns}
        onChange={hanglePagination}
        rowClassName={getRowClassName}
        dataSource={retrieveTemplate?.list && retrieveTemplate?.list}
        // pagination={
        //   filterByStatus === 'Draft' ? false : { hideOnSinglePage: true }
        // }
        pagination={false}
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: templateListLoader,
        }}
      />
      {/* {filterByStatus === 'Draft' && listOfDraft?.template_count > 10 && ( */}
      <Flex flexEnd>
        <CustomerPagination
          total={retrieveTemplate?.total_count}
          onChange={handlePagination}
        />
      </Flex>
      {/* )} */}
      <PreviewTemplate
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
        removeSingleTemplateOnEdit={removeSingleTemplateOnEdit}
      />
      {/* <CreateTemplateForm
        setCreateTemplate={setCreateTemplate}
        openCreateTemplate={openCreateTemplate}
        type={type}
        createWhatsappTemplate={createWhatsappTemplate}
        brands={brands}
        mediaUpload={mediaUpload}
        mediaUrl={mediaUrl}
        editWhatsappTemplate={editWhatsappTemplate}
        removeSingleTemplateOnEdit={removeSingleTemplateOnEdit}
        getFileLocalPath={getFileLocalPath}
        setPageNumber={setPageNumber}
      /> */}
    </>
  );
};

export default TemplateTable;
