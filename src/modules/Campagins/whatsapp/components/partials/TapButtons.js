import React, { useState } from 'react'
import { Button, Space, Card } from 'antd'

const TopButtons = () => {
  const [primary, setPrimary] = useState(0)

  return (
    <Card style={{border:'none'}}>
      <Space wrap size={'middle'}>
        <Button
          type={primary === 0 ? 'primary' : 'default'}
          onClick={() => {
            setPrimary(0)
          }}
        >
          Campaigns
        </Button>
        <Button
          type={primary === 1 ? 'primary' : 'default'}
          onClick={() => {
            setPrimary(1)
          }}
        >
          {' '}
          Templates{' '}
        </Button>
      </Space>
    </Card>
  )
}

export default TopButtons
