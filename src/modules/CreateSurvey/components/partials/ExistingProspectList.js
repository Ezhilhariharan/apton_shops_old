import React from 'react'
import { Table} from 'antd'
import styled from 'styled-components'
import * as S from '@modules/Campagins/whatsapp/subcomponet/components/campsections/CampStyles'

const StyledTable = styled(Table)`
 backgroud:red;
  .ant-table-thead .ant-table-cell {
    background-color: #ffffff;
  }
`

const ExistingProspectList = ({
  existingCSVList,
  updateSurveyCSV,
  setCsvFile,
  setFileName
}) => {
  const data = existingCSVList.map((v,id) => ({...v, key: id}))
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
  ]
  const rowSelection = {
    onChange: (_selectedRowKeys, selectedRows) => {
      updateSurveyCSV(selectedRows[0])
      setCsvFile( selectedRows)
      setFileName(selectedRows[0].file_name)
    },
  }
  return (
    <div style={{padding:20}}>
        <S.FormItem
      name="file_path"
    >
      <StyledTable
        size="small"
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }
        }
      />
    </S.FormItem>

    </div>
  
  )
}
export default ExistingProspectList
