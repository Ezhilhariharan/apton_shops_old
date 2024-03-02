import { Button, Col, Row, Switch, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import Flex from '../../../../../components/common/Flex';
import { MediaStyle } from '../ConnectedAccounts.styles';
import FBFlag from '@assets/images/FBFlag.png';
import greenDot from '@assets/images/green-dot.png';
import blueDot from '@assets/images/blue-dot.png';
import FBGroup from '@assets/images/FBGroup.png';
import UnconnectedCard from '../UnconnectedCard';
//import { FB_INST_Disconnect } from "../../../actions";
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import FbBusinesss from '@components/icons/FbBusinesss';
import { FB_INST_integration, connectFBGroups } from '../../../actions';

const FacebookStatus = ({
  socialMediaList,
  FB_INST_Disconnect,
  displayString,
}) => {
  const dispatch = useDispatch();
  const { API_BASEURL } = process.env;
  const facebookOnly = socialMediaList?.filter(
    data =>
      data.platform_name === 'Facebook' ||
      data.platform_name === 'Facebook Groups' ||
      data.platform_name === 'Facebook Ads'
  );

  const handleFacebook = (media, value) => {
    if (value === false) {
      FB_INST_Disconnect(media);
    }
    if (value === true && media === 'Facebook') {
      const parameters = {
        reference_url: `&reference_url=${API_BASEURL}/integration`,
        connection_name: `&connection_name=${media}`,
        redirect_uri: `&redirect_uri=${API_BASEURL}/facebook/page_list`,
      };
      dispatch(FB_INST_integration(parameters));
    } else if (value === true && media === 'Facebook Groups') {
      dispatch(connectFBGroups());
    } else if (value === true && media === 'Facebook Ads') {
      const param = {
        reference_url: `&reference_url=${API_BASEURL}/integration`,
        connection_name: `&connection_name=${media}`,
        redirect_uri: `&redirect_uri=${API_BASEURL}/facebook-ads-auth`,
      };
      dispatch(FB_INST_integration(param));
    }
  };
  return (
    <>
      <Row gutter={[30, 30]} style={{ marginTop: '20px' }}>
        {facebookOnly?.length > 0 &&
          facebookOnly?.map(media => (
            <Col key={media.id} span={12}>
              {media?.platform_name !== 'Facebook Ads' && (
                <MediaStyle>
                  <Flex alignCenter>
                    {media?.platform_name === 'Facebook' && (
                      <Flex column>
                        <Flex alignCenter>
                          <img src={FBFlag} width="40px" height="40px"></img>
                          {media.configuration.page_name ? (
                            <Tooltip
                              placement="top"
                              title={
                                media.configuration.page_name?.length > 15 &&
                                media.configuration.page_name
                              }
                            >
                              <a
                                href={media.configuration.page_link}
                                target="_blank"
                                className="mediaText"
                              >
                                {displayString(media.configuration.page_name)}
                              </a>
                            </Tooltip>
                          ) : (
                            <div className="mediaText">Facebook</div>
                          )}
                        </Flex>
                        <div className="connectText">
                          Connect your Facebook page
                        </div>
                      </Flex>
                    )}
                    {media?.platform_name === 'Facebook Groups' && (
                      <Flex column>
                        <Flex alignCenter>
                          <img src={FBGroup} width="40px" height="40px"></img>
                          {media.configuration.group_name ? (
                            <Tooltip
                              placement="top"
                              title={
                                media.configuration.group_name?.length > 15 &&
                                media.configuration.group_name
                              }
                            >
                              <a
                                href={media.configuration.group_link}
                                target="_blank"
                                className="mediaText"
                              >
                                {displayString(media.configuration.group_name)}
                              </a>
                            </Tooltip>
                          ) : (
                            <div className="mediaText">Facebook Groups</div>
                          )}
                        </Flex>
                        <div className="connectText">
                          Connect your Facebook group
                        </div>
                      </Flex>
                    )}
                    {/* {media?.platform_name === "Facebook Ads" &&
                                <Flex column>
                                    <Flex alignCenter>
                                        <FbBusinesss />
                                        {media.configuration.ad_account_name ?
                                           <Tooltip placement='top' title={media.configuration.group_name?.length>15 && media.configuration.ad_account_name}>
                                            <a href={media.configuration.group_link} target="_blank" className="mediaText">{displayString(media.configuration.ad_account_name)}</a>
                                            </Tooltip> :
                                            <div className="mediaText">Facebook Ads</div>
                                        }
                                    </Flex>
                                    <div className="connectText">Connect your Facebook Business account</div>
                                </Flex>
                            } */}
                  </Flex>
                  <Divider />
                  <Flex spaceBetween>
                    {media?.connection_status === 1 ? (
                      <Flex alignCenter>
                        <img src={greenDot}></img>
                        <div className="greenText">Connected</div>
                      </Flex>
                    ) : (
                      <Flex alignCenter>
                        <img src={blueDot}></img>
                        <div className="blueText">Connect</div>
                      </Flex>
                    )}
                    <Switch
                      style={{ color: '#4AACEA' }}
                      name={media?.platform_name}
                      defaultChecked={media?.connection_status === 1}
                      onChange={e => handleFacebook(media?.platform_name, e)}
                    />
                  </Flex>
                </MediaStyle>
              )}
            </Col>
          ))}
      </Row>
      {(facebookOnly?.length === 0 || !facebookOnly) && <UnconnectedCard />}
    </>
  );
};

export default FacebookStatus;
