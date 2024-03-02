import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Table, Modal, Button,Space } from 'antd';
import { useSelector } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import Template from '../../Campagins/whatsapp/subcomponet/components/campsections/Template';
import Flex from '@components/common/Flex';
import {fetchSurveyTemplates } from '../actions';
import { useDispatch } from 'react-redux';
const { Search } = Input;

const Wrapper = styled.div`
  margin: 20px;
`;
const StyledModal = styled(Modal)`
.ant-modal-header {
    padding: 16px 24px;
    color: #242E39;
    background: #FFF; 
    border-bottom: 0px solid #f0f0f0;
    border-radius: 4px 4px 0 0;
}
`

const SelecetTemplate = ({onClose,updatetemplate}) => {
  const dispatch = useDispatch()
  const [templateSearch,setSearch] = useState()
  const selector = useSelector(
    state => state.createSurveySelector.surveyTempaltes
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seletedTemp,setTemp] =  useState()

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      updatetemplate(selectedRows[0])
    },
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      align: 'end',
      key: 'actions',
      render: (item) => (
        <div style={{ cursor: 'pointer' }} onClick={()=>{handleModalOpen(item)}}>
          <EyeOutlined style={{ fontSize: 20 }} />
        </div>
      ),
    },
  ];
  const handleModalOpen = (item) => {
    setTemp(item)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSearch = e => {
    setSearch(e.target.value)
  };

  useEffect(()=>{
    dispatch(fetchSurveyTemplates(templateSearch))
  },[templateSearch])

  return (
    <Fragment>
      <Wrapper>
        <Search size="large" onChange={onSearch} placeholder="Search by name"/>
      </Wrapper>
      <Wrapper>
        <Table
          size="large"
          showHeader={false}
          dataSource={selector?.template_response||[]}
          columns={columns}
          style={{ cursor: 'pointer' }}
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          rowKey="id"
        />
      </Wrapper>
      <StyledModal title="Preview" open={isModalOpen} footer={true} onCancel={handleCancel}>
        {seletedTemp &&
         <Template item={seletedTemp} />
        }
      </StyledModal>
      <Flex end style={{padding:20}}>
        <Space size={"middle"}>
            <Button onClick={onClose}>Close</Button>
            <Button type="primary">Save</Button>
        </Space>
      </Flex>
    </Fragment>
  );
};

export default SelecetTemplate;
