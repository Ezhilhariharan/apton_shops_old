import React, { memo, useState } from 'react';
import { Handle } from 'reactflow';
import ListNode from './ListNode';
import MessageBody from './MessageNode';
import QuestionNode from './QuestionNode';
import TemplateNode from './TemplateNode';

const CustomNode = ({id, data, isConnectable }) => {
  const actions = data?.data?.components?.filter(i => i.type === 'BUTTONS');
  const showSorceHandle = actions?.length>0 && data?.lable ==='Template'
  return (
    <>
    {data?.lable !=='Template' &&
     <Handle
      type="target"
      position="left"
      style={{ background: 'green', height: 10, width: 10,cursor:'pointer'}}
      isConnectable={isConnectable}
      isValidConnection={(connection) => connection.source === validation}
    />
    }
      {data?.lable === 'Question' && (
        <div style={{ width: 300, height: 'auto' }}>
          <QuestionNode data={data} nodeId={id} />
        </div>
      )}
      {data?.lable === 'Message' && (
        <div>
          <MessageBody data={data} nodeId={id}/>
        </div>
      )}
      {data?.lable === 'List' && <ListNode data={data} nodeId={id} />}
      {data?.lable ==='Template' && <TemplateNode data={data?.data} nodeId={id}/>}
      {/* {(data?.lable ==='Message'  || showSorceHandle===false) &&
       <Handle
       type="source"
       position="right"
       style={{background: 'blue', height: 10, width: 10,cursor:'pointer' }}
       onConnect={params => console.log('handle onConnect', params)}
       isConnectable={isConnectable}
       
     />
      } */}
    </>
  );
};

export default memo(CustomNode);
