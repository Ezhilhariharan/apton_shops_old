import React, { useState } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import * as S from '../components/campsections/CampStyles';

const StyledTable = styled(Table)`
  .ant-table-thead .ant-table-cell {
    background-color: #ffffff;
  }
`;

const ExistingCSVList = ({
  existingCSVList,
  updateWhatsAppCSV,
  setCsvFiles,
  setFilePathError,
  setCsvFile,
  setSelectedRowKeys,
  selectedRowKeys,
}) => {
  const data = existingCSVList.map((v, id) => ({ ...v, key: id }));
  // useEffect(() => {
  //   sheduleSteeings?.tab === '2' &&
  //     form.setFieldsValue({
  //       file_path: sheduleSteeings?.file_path,
  //     });
  // }, []);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
    {
      title: 'File Name',
      dataIndex: 'file_name',
      key: 'file_name',
    },
    {
      title: 'Prospects',
      dataIndex: 'prospects_count',
      key: 'prospects_count',
    },
  ];
  const rowSelection = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(_selectedRowKeys);
      updateWhatsAppCSV(selectedRows[0]);
      setCsvFiles(selectedRows);
      setFilePathError(false);
      setCsvFile(selectedRows[0]);
    },
  };
  return (
    <S.FormItem name="file_path">
      <StyledTable
        size="small"
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: 'radio',
          selectedRowKeys,
          ...rowSelection,
        }}
      />
    </S.FormItem>
  );
};
export default ExistingCSVList;
