import React from 'react';
import pinterest from '@assets/images/pinterest.png';
import { Col, Divider, Row, Switch, Tooltip } from 'antd';
import { MediaStyle } from '../ConnectedAccounts.styles';
import Flex from '../../../../../components/common/Flex';
import UnconnectedCard from '../UnconnectedCard';
import greenDot from '@assets/images/green-dot.png';
import { useDispatch } from 'react-redux';
import blueDot from '@assets/images/blue-dot.png';
import { pinterestSignUp } from '../../../actions';

const PinterestStatus = ({
  connectedAccounts,
  FB_INST_Disconnect,
  displayString,
}) => {
  const dispatch = useDispatch();
  const { API_BASEURL } = process.env;
  const pinterestOnly = connectedAccounts?.filter(
    data => data.platform_name === 'Pinterest'
  );
  const pinterestDisconnect = (media, value) => {
    if (value === false) {
      FB_INST_Disconnect(media);
    }
    if (value === true) {
      const param = {
        reference_url: `&reference_url=${API_BASEURL}/integration`,
        connection_name: `&connection_name=${media}`,
        redirect_uri: `&redirect_uri=${API_BASEURL}/pinterest/page_list`,
      };
      dispatch(pinterestSignUp(param));
    }
  };
  return (
    <>
      <Row gutter={[25, 25]} style={{ marginTop: '20px' }}>
        {pinterestOnly?.length > 0 &&
          pinterestOnly?.map(media => (
            <Col key={media.id} span={12}>
              <MediaStyle>
                <Flex alignCenter spaceBetween>
                  <Flex column>
                    <Flex alignCenter>
                      <img src={pinterest} width="40px" height="40px"></img>
                      {media.configuration.user_name ? (
                        <Tooltip
                          placement="top"
                          title={
                            media.configuration.user_name?.length > 15 &&
                            media.configuration.user_name
                          }
                        >
                          <a
                            href={media.configuration.profile_link}
                            target="_blank"
                            className="mediaText"
                          >
                            {displayString(media.configuration.user_name)}
                          </a>{' '}
                        </Tooltip>
                      ) : (
                        <div className="mediaText">Pinterest</div>
                      )}
                    </Flex>
                    <div className="connectText">
                      Connect your Pinterest account
                    </div>
                  </Flex>
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
                    onChange={e => pinterestDisconnect(media?.platform_name, e)}
                  ></Switch>
                </Flex>
              </MediaStyle>
            </Col>
          ))}
      </Row>
      {(pinterestOnly?.length === 0 || !pinterestOnly) && <UnconnectedCard />}
    </>
  );
};

export default PinterestStatus;
