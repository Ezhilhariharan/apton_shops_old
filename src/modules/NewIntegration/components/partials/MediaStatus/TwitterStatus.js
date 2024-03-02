import React from 'react';
import twitterIcon from '@assets/images/twitter.png';
import { Col, Divider, Row, Switch, Tooltip } from 'antd';
import { MediaStyle } from '../ConnectedAccounts.styles';
import Flex from '../../../../../components/common/Flex';
import UnconnectedCard from '../UnconnectedCard';
import ThreeDotsHorizontalIcon from '../../../../../components/icons/ThreeDotsHorizontalIcon';
import greenDot from '@assets/images/green-dot.png';
import { useDispatch } from 'react-redux';
import { twitterSignUp } from '../../../actions';
import blueDot from '@assets/images/blue-dot.png';

const TwitterStatus = ({
  connectedAccounts,
  FB_INST_Disconnect,
  displayString,
}) => {
  const dispatch = useDispatch();
  const twitterOnly = connectedAccounts?.filter(
    data => data.platform_name === 'Twitter'
  );
  const twitterDisconnect = (media, value) => {
    if (value === false) {
      FB_INST_Disconnect(media);
    }
    if (value === true) {
      dispatch(twitterSignUp());
    }
  };
  return (
    <>
      <Row gutter={[25, 25]} style={{ marginTop: '20px' }}>
        {twitterOnly?.length > 0 &&
          twitterOnly?.map(media => (
            <Col key={media.id} span={12}>
              <MediaStyle>
                <Flex alignCenter spaceBetween>
                  <Flex column>
                    <Flex alignCenter>
                      <img src={twitterIcon} width="40px" height="40px"></img>
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
                          </a>{' '}
                        </Tooltip>
                      ) : (
                        <div className="mediaText">Twitter</div>
                      )}
                    </Flex>
                    <div className="connectText">
                      Connect your Twitter account
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
                    onChange={e => twitterDisconnect(media?.platform_name, e)}
                  ></Switch>
                </Flex>
              </MediaStyle>
            </Col>
          ))}
      </Row>
      {(twitterOnly?.length === 0 || !twitterOnly) && <UnconnectedCard />}
    </>
  );
};

export default TwitterStatus;
