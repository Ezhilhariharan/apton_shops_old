import React from 'react';
import instagramBusiness from '@assets/images/instagram business.svg';
import { Col, Divider, Row, Switch, Tooltip } from 'antd';
import { MediaStyle } from '../ConnectedAccounts.styles';
import Flex from '../../../../../components/common/Flex';
import UnconnectedCard from '../UnconnectedCard';
import greenDot from '@assets/images/green-dot.png';
import blueDot from '@assets/images/blue-dot.png';
import { useDispatch } from 'react-redux';
import { FB_INST_integration } from '../../../actions';

const InstagramStatus = ({
  connectedAccounts,
  FB_INST_Disconnect,
  displayString,
}) => {
  const dispatch = useDispatch();
  const { API_BASEURL } = process.env;
  const instagramOnly = connectedAccounts?.filter(
    data => data.platform_name === 'Instagram'
  );
  const instagramDisconnect = (media, value) => {
    if (value === false) {
      FB_INST_Disconnect(media);
    }
    if (value === true) {
      const parameters = {
        reference_url: `&reference_url=${API_BASEURL}/integration`,
        connection_name: `&connection_name=${media}`,
        redirect_uri: `&redirect_uri=${API_BASEURL}/instagram/page_list`,
      };
      dispatch(FB_INST_integration(parameters));
    }
  };
  return (
    <>
      <Row gutter={[25, 25]} style={{ marginTop: '20px' }}>
        {instagramOnly?.length > 0 &&
          instagramOnly?.map(media => (
            <Col key={media.id} span={12}>
              <MediaStyle>
                <Flex alignCenter>
                  {media?.platform_name === 'Instagram' && (
                    <Flex column>
                      <Flex alignCenter>
                        <img
                          src={instagramBusiness}
                          width="40px"
                          height="40px"
                        ></img>
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
                          <div className="mediaText">Instagram</div>
                        )}
                      </Flex>
                      <div className="connectText">
                        Connect your Instagram business page
                      </div>
                    </Flex>
                  )}
                </Flex>
                <Divider />
                <Flex spaceBetween>
                  {media.connection_status === 1 ? (
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
                    defaultChecked={media.connection_status === 1}
                    onChange={e => instagramDisconnect(media?.platform_name, e)}
                  ></Switch>
                </Flex>
              </MediaStyle>
            </Col>
          ))}
      </Row>
      {(instagramOnly?.length === 0 || !instagramOnly) && <UnconnectedCard />}
    </>
  );
};

export default InstagramStatus;
