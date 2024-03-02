import { Row, Col } from 'antd';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
  ReactFlowProvider,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import ButtonEdge from '../components/partials/ButtonEdge';
import CustomNode from '../components/partials/CustomNode';
import ButtonGroup from './partials/ButtonGroup';
import StyledDrawer from '@components/common/StyledDrawer';
import SelecetTemplate from '../components/SelectTemplate';
import SelectResponse from '../components//SelectResponse';
import { generateId } from './partials/helper/dataformating';
import { useSelector,useDispatch } from 'react-redux';
import { deleteNodesById } from '../actions';

const nodeTypes = {
  selectorNode: CustomNode,
};

const edgeTypes = {
  buttonedge: ButtonEdge,
};
const sectionTitle = title => {
  switch (title) {
    case 'Template':
      return 'Select templates';
    case 'Message':
      return 'Send a message';
    case 'Question':
      return 'Send a question';
    case 'List':
      return 'Set list message';
    default:
      break;
  }
};
const ReactFlowControll = ({
  updateNodeList,
  nodeList,
  updateSurveyCSV,
  updateEdges,
  disbleButtons,
  surveyBotDetails,
  surveyMode,
  updateBotDrawer,
  openBotDrawer,
  drawerTitle,
  updateDrawerTitile,
}) => {
  const edgeUpdateSuccessful = useRef(true);
  const deleteNodeId = useSelector((state)=>state.createSurveySelector.deleteNodeId)
  const dispatch = useDispatch()
  const [nodes, setNodes] = useNodesState(surveyMode==="edit"?surveyBotDetails?.details:[ {
    id: 'first_node',
    type: 'selectorNode',
    data: { lable: 'Template', data: null },
    position: { x: 50, y: 50 },
  },]);
  const [edges, setEdges] = useEdgesState(surveyMode==="edit"?surveyBotDetails?.position_mapping:[]);
  const [template, updatetemplate] = useState();
  const onClose = () => {
    updateBotDrawer(false);
    updateDrawerTitile('')
  };
  const onConnect = useCallback(
    params =>
      setEdges(eds =>
        addEdge({ ...params, type: 'buttonedge',markerEnd:{
          type:MarkerType.ArrowClosed,
          width: 10,
          height: 10,
        }, 
        style:{
          strokeWidth:3
        },
        animated: true }, eds)
      ),
    []
  );
  useEffect(() => {
    if (template) {
      setNodes(nds =>
        nds.map(node => {
          if (node.id === 'first_node') {
            node.data = { lable: 'Template', data: template };
          }
          updateNodeList(node);
          return node;
        })
      );

      onClose();
    }
  }, [template, updatetemplate]);

  // const updateNodes = (data) => {
  //   if(data){
  //     console.log("details",data)
  //     // setNodes(nds =>
  //     //   nds.map(node => {
  //     //     if (node.id === 'first_node') {
  //     //       node.data = { lable: 'Template', data: template };
  //     //     }
  //     //     updateNodeList(node);
  //     //     return node;
  //     //   })
  //     // );
  //     // onClose();
  //   }
  // }
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges(els => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges(eds => eds.filter(e => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);
  const proOptions = { hideAttribution: true };

  const addNodes = useCallback(
    (body, title) => {
      const obj = {
        id: generateId(),
        type: 'selectorNode',
        data: { lable: title, data: body },
        position: {
          x: Math.random() * window.innerWidth - 50,
          y: Math.random() * window.innerHeight,
        },
        selectable: true,
        connectable: true,
      };
      setNodes(nds => nds.concat(obj));
      onClose();
    },
    [setNodes]
  );
  const onNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    updateNodeList(nodes),
    []
  );
  const onEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    updateEdges(edges),
    []
  );
  useEffect(()=>{
    if(deleteNodeId!==null){
      const res = nodes?.filter(obj => obj?.id !== deleteNodeId)
      setNodes(res)
      updateNodeList(nodes),
      dispatch(deleteNodesById(null))
    }
  },[deleteNodeId])
  return (
    <div style={{ height: '100%' }}>
      <Row>
        <Col span={22}>
          <div style={{ width: '100%', height: '80vh', marginTop: 2 }}>
            <ReactFlowProvider>
            <ReactFlow
              proOptions={proOptions}
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdate={onEdgeUpdate}
              snapToGrid={false}
              edgeTypes={edgeTypes}
            >
              <Background color="#99b3ec" gap={10} />
              <Controls />
            </ReactFlow>
            </ReactFlowProvider>
          </div>
        </Col>
        <Col span={2}>
          <div style={{ padding: 10 }}>
            <ButtonGroup
              setOpen={updateBotDrawer}
              setTitle={updateDrawerTitile}
              disbleButtons={disbleButtons}
            />
          </div>
        </Col>
      </Row>
      {drawerTitle && (
        <StyledDrawer
          open={openBotDrawer}
          onClose={onClose}
          placement={'right'}
          title={sectionTitle(drawerTitle)}
          width={550}
          maskClosable={false}
        >
          {drawerTitle === 'Template' && (
            <SelecetTemplate
              onClose={onClose}
              updatetemplate={updatetemplate}
            />
          )}
          {(drawerTitle === 'Message' ||
            drawerTitle === 'Question' ||
            drawerTitle === 'List') && (
            <SelectResponse
              onClose={onClose}
              title={drawerTitle}
              nodeList={nodeList}
              updateNodeList={updateNodeList}
              addNodes={addNodes}
              updateSurveyCSV={updateSurveyCSV}
              // updateNodes={updateNodes}
            />
          )}
        </StyledDrawer>
      )}
    </div>
  );
};

export default ReactFlowControll;
