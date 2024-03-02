import React,{ memo } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Loading = ()=> {
  return (
    <div
   style={{
  height: '600px',
     width: '100%',
                        margin: 'auto',
                        display: 'grid',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ display: 'block' }}>
                        <Spin indicator={antIcon} />
                        Loading....
                      </div>
                    </div>
  )
}

export default memo(Loading) 