import React,{memo} from 'react'
import { Row, } from 'antd';
import styled from 'styled-components';

const Leftlinespan = styled.span`
  border-left: 1px solid #d9d9d9;
  margin: 0px 10px 0px 10px;
  height: 30px;
  margin-top: 5px;
`;

function PublishLikesComment({ actions, settingModal,  item, final }) {
      const likesIcon = (item, actions) => {
    if (item?.platform_type == 'Instagram' && actions?.name == 'likes')
      return <>{actions?.instaIcon}</>;
    else if (
      item?.platform_type == 'Linkedin Pages' &&
      actions?.name == 'likes'
    )
      return <>{actions?.linkdinIcon}</>;
    else return <> {actions?.icon}</>;
  };
  return (
 <Row key={actions?.id}>
                                  <div>
                                    <div
                                      className="likesIcon cursor"
                                      onClick={() =>
                                        settingModal(actions?.name, item)
                                      }
                                    >
                                      {likesIcon(item, actions)}
                                    </div>
                                    <div className="actionsCount ">
                                      {actions?.name == 'likes'
                                        ? item?.likes || 0
                                        : actions?.name == 'comments'
                                        ? item?.comments || 0
                                        : ''}{' '}
                                      {actions?.name == 'likes'
                                        ? 'likes'
                                        : actions?.name == 'comments'
                                        ? 'comments'
                                        : ''}
                                    </div>
                                  </div>
                                  {actions?.name === final?.name ? (
                                    <span></span>
                                  ) : (
                                    <Leftlinespan></Leftlinespan>
                                  )}
                                </Row>
  )
}

export default memo(PublishLikesComment)