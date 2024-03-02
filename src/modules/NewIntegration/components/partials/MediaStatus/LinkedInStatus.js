import React from 'react';
import LinkdinPage from '@assets/images/LinkdinPage.svg';
import { Col, Divider, Row, Switch, Tooltip } from 'antd';
import { MediaStyle } from '../ConnectedAccounts.styles';
import Flex from '../../../../../components/common/Flex';
import UnconnectedCard from '../UnconnectedCard';
import greenDot from '@assets/images/green-dot.png';
import blueDot from '@assets/images/blue-dot.png';
import { useDispatch } from 'react-redux';
import { linkedinPageSignUp } from '../../../actions';

const LinkedInStatus = ({
  connectedAccounts,
  FB_INST_Disconnect,
  displayString,
}) => {
  const { API_BASEURL } = process.env;
  const dispatch = useDispatch();
  const linkedInOnly = connectedAccounts?.filter(
    data => data.platform_name === 'Linkedin Pages'
  );
  const linkedInDisconnect = (media, value) => {
    if (value === false) {
      FB_INST_Disconnect(media);
    }
    if (value === true) {
      const param = {
        reference_url: `&reference_url=${window.location.href}`,
        connection_name: `&connection_name=${media}`,
        redirect_uri: `&redirect_uri=${API_BASEURL}/linkedin pages/page_list`,
      };
      dispatch(linkedinPageSignUp(param));
    }
  };
  return (
    <>
      <Row gutter={[25, 25]} style={{ marginTop: '20px' }}>
        {linkedInOnly?.length > 0 &&
          linkedInOnly?.map(media => (
            <Col key={media.id} span={12}>
              <MediaStyle>
                <Flex alignCenter spaceBetween>
                  <Flex column>
                    <Flex alignCenter>
                      <img src={LinkdinPage} width="40px" height="40px"></img>
                      {media?.configuration.page_name ? (
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
                        <div className="mediaText">Linkedin Page</div>
                      )}
                    </Flex>
                    <div className="connectText">
                      Connect your Linkedin Page
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
                    style={{
                      color: '#4AACEA',
                    }}
                    checked={media.connection_status === 1 ? true : false}
                    onChange={e => linkedInDisconnect(media?.platform_name, e)}
                  ></Switch>
                </Flex>
              </MediaStyle>
            </Col>
          ))}
      </Row>
      {(linkedInOnly?.length === 0 || !linkedInOnly) && <UnconnectedCard />}
    </>
  );
};

export default LinkedInStatus;
