import React, { useEffect, useState } from 'react';
import {
  FlexBox,
  StyledSpan,
  InternalFlexBox,
  AddingMedia,
  StyledButton,
  NotificationHeader,
  TextCard,
  Cards,
  Text,
  SocialIcon,
} from './Integration.styles';
import YoutubeIcon from '@components/icons/YoutubeIcon';
import Youtube from '@assets/images/Youtube.png';
import PinterestIcon from '@components/icons/PinterestIcon';
import FacebookIcon from '@components/icons/FacebookIcon';
import InstagramIcon from '@components/icons/InstagramIcon';
import WhatsappIcon from '@components/icons/smallWhatsappIcon';
import SuccessIcon from '@components/icons/SuccessIcon';
import FacebookGroupIcon from '@assets/images/FBGroup.png';
import styled from 'styled-components';
import AddButtonIcon from '@components/icons/AddButtonIcon';
import { useResponsive } from '@hooks/useResponsive';
import FbBusinesss from '@components/icons/FbBusinesss';
import Flex from '@components/common/Flex';
import { notification } from 'antd';
import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  Tooltip,
  Input,
  Space,
  Popover,
  Typography,
  Menu,
  Dropdown
} from 'antd';
import {
  InfoCircleOutlined,
  SyncOutlined,
  CopyOutlined,
  DownOutlined,
} from '@ant-design/icons';
import whatsappcloud from '@assets/images/whatsappcloud.png';
import FacebookGroup from '@assets/images/Facebook Group.svg';
import FacebookPage from '@assets/images/Facebook Page.svg';
import instagramBusiness from '@assets/images/instagram business.svg';
import WhatsApp from '@assets/images/WhatsApp.svg';
import tick from '@assets/images/tick.svg';
import exit from '@assets/images/exit.svg';
import TwitterIcon from '@components/icons/TwitterIcon';
import LinkdinIcon from '@components/icons/LinkdinIcon';
import ViewMore from '../../../components/icons/ViewMore';
import { useSelector, shallowEqual } from 'react-redux';
import Linkedin from '@assets/images/LinkdinPage.svg';
import twitter from '@assets/images/twitter.png';
import pinterest from '@assets/images/pinterest.png';
import YoutubePopover from './YoutubePopover';
import LinkedinPagesPopover from './LinkedinPagesPopover';
import FbBusinessPopover from './FbBusinessPopover';

const Wrapper = styled.div`
  padding: 1rem;
`;
const Innertext = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #4d4d4d;
`;

const Titles = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #4d4d4d;
  margin: 40px 0px 10px 0px;
`;

const SubmitButton = styled(Button)`
  color: white;
  margin: 40px 0px 20px 0px;
`;
const Mod = styled(Modal)`
  border-radius: 10px;
  .ant-modal-header {
    background: none;
    border-bottom: none;
  }
`;
// eslint-disable-next-line no-empty-pattern
const Integration = ({
  //state
  socialMediaList,
  whatsAppAuthStatus,
  CurentUser,
  // action
  getSocialMediaList,
  FB_INST_integration,
  FB_INST_Disconnect,
  getCurrentUserInfo,
  whatsappAuthenticationStepOne,
  connectFBGroups,
  linkedinSignUp,
  twitterSignUp,
  pinterestSignUp,
  youtubeSignUp,
  youtubeChannels,
  youtubeChannelsList,
  youtubeSave,
  linkedinPageSignUp,
  linkedinPagesList,
  linkedinPages,
  linkedinPageSave,
}) => {
  const { mobileOnly } = useResponsive();
  const [viewList, setViewList] = useState([]);
  const [allDetails, setAllDetails] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const [openFacebookTick, setFacebookTick] = useState(true);
  const [openFacebookGroupTick, setFacebookGroupTick] = useState(true);
  const [openInstagramTick, setInstagramTick] = useState(true);
  const [openWatsupTick, setWatsupTick] = useState(true);
  const [linkedinTick, setLinkedinTick] = useState(true);
  const [linkedinPageTick, setLinkedinPageTick] = useState(true);
  const [twitterTick, setTwitterTick] = useState(true);
  const [pinterestTick, setPinterestTick] = useState(true);
  const [youtubeTick, setYoutubeTick] = useState(true);
  const [fbBusinessTick, setFbBusinessTick] = useState(true);
  const[fbBusiness,setFbBusiness]=useState(false)
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkcopied, setLinkCopied] = useState(false);
  const { WP_VERIFY_TOKEN } = process.env;
  const { WP_CALL_BACK_URL } = process.env;
  const { API_BASEURL } = process.env;

  const [path, setPath] = useState('');
  const windowLink = window.location.href;

  useEffect(() => {
    setAllDetails(CurentUser);
    // getCurrentUserInfo();
    mergingData();
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connectionName = params.get('connection_name');
    setPath(connectionName);
    if (connectionName === 'Pinterest') {
      pinterestList(allDetails?.account?.id, brand?.id, 'Pinterest');
    }
    if (connectionName === 'YouTube') {
      youtubeChannelsList(allDetails?.account?.id, brand?.id, 'YouTube');
    }
    if (connectionName === 'Linkedin Pages') {
      linkedinPagesList(allDetails?.account?.id, brand?.id, 'Linkedin Pages');
    }
    mergingData();
  }, [socialMediaList]);

  useEffect(() => {
    getSocialMediaList();
    mergingData();
  }, [brand]);

  const mergingData = () => {
    let merging = [];
    IntegrationData?.map(parent => {
      socialMediaList?.map(child => {
        if (child.platform_name == parent.text) {
          merging.push({ ...parent, apiData: child });
        }
      });
    });
    setViewList(merging);
  };
  useEffect(() => {
    getSocialMediaList();
  }, [whatsAppAuthStatus]);

  const connectFacebook = async value => {
    const param = {
      accountId: `account_id=${allDetails?.account?.id}`,
      brandId: `&brand_id=${brand?.id}`,
      reference_url: `&reference_url=${API_BASEURL}/integration`,
      connection_name: `&connection_name=${value}`,
      redirect_uri: `&redirect_uri=${API_BASEURL}/facebook/page_list`,
    };
    FB_INST_integration(param);
    handleCancel();
  };

  const handleFbBusiness = async value => {
    const param = {
      accountId: `account_id=${allDetails?.account?.id}`,
      brandId: `&brand_id=${brand?.id}`,
      reference_url: `&reference_url=${API_BASEURL}/integration`,
      connection_name: `&connection_name=${value}`,
      redirect_uri: `&redirect_uri=${API_BASEURL}/facebook-ads-auth`,
    };
    FB_INST_integration(param);
    handleCancel();
  };

  const handleInstagram = async value => {
    const param = {
      accountId: `account_id=${allDetails?.account?.id}`,
      brandId: `&brand_id=${brand?.id}`,
      reference_url: `&reference_url=${API_BASEURL}/integration`,
      connection_name: `&connection_name=${value}`,
      redirect_uri: `&redirect_uri=${API_BASEURL}/instagram/page_list`,
    };
    FB_INST_integration(param);
    handleCancel();
  };

  const handlePinterest = async value => {
    const param = {
      accountId: `account_id=${allDetails?.account?.id}`,
      brandId: `&brand_id=${brand?.id}`,
      reference_url: `&reference_url=${API_BASEURL}/integration`,
      connection_name: `&connection_name=${value}`,
      redirect_uri: `&redirect_uri=${API_BASEURL}/pinterest/page_list`,
    };
    pinterestSignUp(param);
    handleCancel();
  };
  const handleLinkedinPages = async value => {
    const param = {
      accountId: `account_id=${allDetails?.account?.id}`,
      brandId: `&brand_id=${brand?.id}`,
      reference_url: `&reference_url=${window.location.href}`,
      connection_name: `&connection_name=${value}`,
      redirect_uri: `&redirect_uri=${API_BASEURL}/linkedin pages/page_list`,
    };
    linkedinPageSignUp(param);
    handleCancel();
  };
  const handleYoutube = async value => {
    const param = {
      accountId: `account_id=${allDetails?.account?.id}`,
      brandId: `&brand_id=${brand?.id}`,
      reference_url: `&reference_url=${API_BASEURL}/integration`,
      connection_name: `&connection_name=${value}`,
      redirect_uri: `&redirect_uri=${API_BASEURL}/youtube/page_list`,
    };
    youtubeSignUp(param);
    handleCancel();
  };
  const FBINST_Disconnect = async value => {
    const param = {
      account_id: allDetails?.account?.id,
      brand_id: brand?.id,
      connection_name: value,
    };
    FB_INST_Disconnect(param).then(data => {
      if (parseInt(data.status) == 200) {
        getSocialMediaList();
        mergingData();
        successNotification('topRight', data.data.msg);
        handleCancel();
      }
    });
  };

  const reDirect = value => {
    if (value.text == 'Facebook Groups') {
      value?.apiData?.configuration?.group_link &&
        window.open(value?.apiData?.configuration?.group_link, '_blank');
    } else {
      value?.apiData?.configuration?.page_link &&
        window.open(value?.apiData?.configuration?.page_link, '_blank');
    }
  };

  const successNotification = (placement, value) => {
    api.info({
      description: (
        <div>
          <NotificationHeader>{`${value}`}</NotificationHeader>
        </div>
      ),
      placement,
      style: {
        width: 400,
        backgroundColor: 'white',
        border: 'none',
      },
      icon: <SuccessIcon />,
      duration: 6,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    setPopoverOpen(false);
  };
  const options = data => {
    return (
      <>
        <div onMouseLeave={() => setPopoverOpen(false)}>
          <Button
            type="text"
            style={{ display: 'block' }}
            href={data?.link}
            target="_blank"
          >
            Viewdemo <InfoCircleOutlined />
          </Button>
          {data?.text === 'WhatsApp' && (
            <>
              <Button type="text" onClick={showModal}>
                Configure <SyncOutlined />
              </Button>
              <Mod
                title={<Text>Connecting WhatsApp Cloud API</Text>}
                footer={false}
                centered={true}
                onCancel={() => {
                  setIsModalOpen(false);
                  setPopoverOpen(false);
                }}
                open={isModalOpen}
              >
                <Innertext>
                  Add the following field in WhatsApp configuration page.
                </Innertext>
                <Form>
                  <Titles>Callback URL</Titles>
                  <Form.Item name="Callback URL">
                    <Flex spaceBetween>
                      <Input
                        defaultValue={WP_CALL_BACK_URL}
                        disabled={true}
                        bordered={false}
                        style={{ borderBottom: '1px solid #D9D9D9' }}
                      />
                      <Tooltip
                        placement="top"
                        title={
                          linkcopied === true ? 'Link Copied' : 'Copy Link'
                        }
                        color={linkcopied === true ? 'green' : 'black'}
                      >
                        <CopyOutlined
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigator.clipboard.writeText(WP_CALL_BACK_URL);
                            setLinkCopied(true);
                          }}
                        />
                      </Tooltip>
                    </Flex>
                  </Form.Item>
                  <Titles>Verify Token</Titles>
                  <Form.Item name="Verify Token">
                    <Flex spaceBetween>
                      <Input
                        defaultValue={WP_VERIFY_TOKEN}
                        bordered={false}
                        disabled={true}
                        style={{ borderBottom: '1px solid #D9D9D9' }}
                      />

                      <Tooltip
                        placement="top"
                        title={copied === true ? 'Token Copied' : 'Copy Token'}
                        color={copied === true ? 'green' : 'black'}
                      >
                        <CopyOutlined
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigator.clipboard.writeText(WP_VERIFY_TOKEN);
                            setCopied(true);
                          }}
                        />
                      </Tooltip>
                    </Flex>
                  </Form.Item>
                  <Flex center>
                    <SubmitButton
                      type="primary"
                      htmlType="submit"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Done
                    </SubmitButton>
                  </Flex>
                </Form>
              </Mod>
            </>
          )}
        </div>
      </>
    );
  };
  return (
    <Wrapper>
      {contextHolder}
      <TextCard>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {viewList?.map((data, index) => {
            return (
              <Col span={8}>
                <Cards>
                  <div className="descriptionBox">
                    <FlexBox>
                      <InternalFlexBox>
                        {data?.text !== 'WhatsApp' ? (
                          data?.text !== 'Facebook Groups' ? (
                            <span>{data.icon}</span>
                          ) : (
                            <span>
                              <img
                                width="35px"
                                height="35px"
                                src={FacebookGroupIcon}
                              />
                            </span>
                          )
                        ) : (
                          <span>
                            <img
                              width="35px"
                              height="35px"
                              src={whatsappcloud}
                            />
                          </span>
                        )}
                        <StyledSpan>{data?.apiData?.platform_name}</StyledSpan>
                      </InternalFlexBox>
                      {data?.link !== null && (
                        <Popover
                          content={() => options(data)}
                          open={popoverOpen}
                          color="white"
                          placement="bottom"
                          style={{ cursor: 'pointer' }}
                        >
                          <Button
                            type="text"
                            onMouseOver={() => setPopoverOpen(true)}
                            style={{ cursor: 'pointer' }}
                          >
                            <ViewMore />
                          </Button>
                        </Popover>
                      )}
                    </FlexBox>
                    <div className="connectTextStyle">{data?.connectText}</div>
                    <AddingMedia style={{width:"100%"}}>
                      <div>
                        {data?.text === 'Facebook' && (
                          <Space size={'small'}>
                            {data?.apiData?.connection_status === 1 && (
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={FacebookPage}
                                    width={'40px'}
                                    height={'40px'}
                                    onClick={() => reDirect(data)}
                                  />
                                  {openFacebookTick ? (
                                    <img
                                      src={tick}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setFacebookTick(false)
                                      }
                                      onMouseLeave={() => setFacebookTick(true)}
                                    />
                                  ) : (
                                    <img
                                      src={exit}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setFacebookTick(false)
                                      }
                                      onMouseLeave={() => setFacebookTick(true)}
                                      onClick={() =>
                                        FBINST_Disconnect(data?.text)
                                      }
                                    />
                                  )}
                                </SocialIcon>
                                <Text onClick={() => reDirect(data)}>
                                  {data?.apiData?.configuration?.page_name}
                                </Text>
                              </StyledButton>
                            )}
                            {data?.apiData?.connection_status === 0 && (
                              <AddButtonIcon
                                onClick={() => connectFacebook(data?.text)}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                          </Space>
                        )}
                        {data?.text === 'Instagram' && (
                          <>
                            {data?.apiData.connection_status === 1 ? (
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={instagramBusiness}
                                    width={'40px'}
                                    height={'40px'}
                                    onClick={() => reDirect(data)}
                                  />
                                  {openInstagramTick ? (
                                    <img
                                      src={tick}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setInstagramTick(false)
                                      }
                                      onMouseLeave={() =>
                                        setInstagramTick(true)
                                      }
                                    />
                                  ) : (
                                    <img
                                      src={exit}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setInstagramTick(false)
                                      }
                                      onMouseLeave={() =>
                                        setInstagramTick(true)
                                      }
                                      onClick={() =>
                                        FBINST_Disconnect(data.text)
                                      }
                                    />
                                  )}
                                </SocialIcon>
                                <Text onClick={() => reDirect(data)}>
                                  {data?.apiData?.configuration?.page_name}
                                </Text>
                              </StyledButton>
                            ) : (
                              <AddButtonIcon
                                onClick={() => handleInstagram(data?.text)}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                          </>
                        )}
                        {data?.text === 'WhatsApp' && (
                          <>
                            {data?.apiData.connection_status === 1 ? (
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={WhatsApp}
                                    width={'40px'}
                                    height={'40px'}
                                  />
                                  {openWatsupTick ? (
                                    <img
                                      src={tick}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() => setWatsupTick(false)}
                                      onMouseLeave={() => setWatsupTick(true)}
                                    />
                                  ) : (
                                    <img
                                      src={exit}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() => setWatsupTick(false)}
                                      onMouseLeave={() => setWatsupTick(true)}
                                      onClick={() =>
                                        FBINST_Disconnect(data?.text)
                                      }
                                    />
                                  )}
                                </SocialIcon>
                                <Text>
                                  {data?.apiData?.configuration?.phone_number}
                                </Text>
                              </StyledButton>
                            ) : (
                              <AddButtonIcon
                                onClick={whatsappAuthenticationStepOne}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                          </>
                        )}
                        {data?.text === 'Facebook Groups' && (
                          <>
                            {data?.apiData.connection_status === 1 ? (
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={FacebookGroup}
                                    width={'40px'}
                                    height={'40px'}
                                    onClick={() => reDirect(data)}
                                  />
                                  {openFacebookGroupTick ? (
                                    <img
                                      src={tick}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setFacebookGroupTick(false)
                                      }
                                      onMouseLeave={() =>
                                        setFacebookGroupTick(true)
                                      }
                                    />
                                  ) : (
                                    <img
                                      src={exit}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setFacebookGroupTick(false)
                                      }
                                      onMouseLeave={() =>
                                        setFacebookGroupTick(true)
                                      }
                                      onClick={() =>
                                        FBINST_Disconnect(data.text)
                                      }
                                    />
                                  )}
                                </SocialIcon>
                                <Text onClick={() => reDirect(data)}>
                                  {data?.apiData?.configuration?.group_name}
                                </Text>
                              </StyledButton>
                            ) : (
                              <AddButtonIcon
                                onClick={() => connectFBGroups()}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                          </>
                        )}
                        {data?.text === 'Linkedin' && (
                          <>
                            {data?.apiData.connection_status === 1 ? (
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={Linkedin}
                                    width={'40px'}
                                    height={'40px'}
                                    onClick={() => reDirect(data)}
                                  />
                                  {linkedinTick ? (
                                    <img
                                      src={tick}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setLinkedinTick(false)
                                      }
                                      onMouseLeave={() => setLinkedinTick(true)}
                                    />
                                  ) : (
                                    <img
                                      src={exit}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setLinkedinTick(false)
                                      }
                                      onMouseLeave={() => setLinkedinTick(true)}
                                      onClick={() =>
                                        FBINST_Disconnect(data.text)
                                      }
                                    />
                                  )}
                                </SocialIcon>
                                <Text onClick={() => reDirect(data)}>
                                  {data?.apiData?.configuration?.first_name}
                                  &nbsp;
                                  {data?.apiData?.configuration?.last_name}
                                </Text>
                              </StyledButton>
                            ) : (
                              <AddButtonIcon
                                onClick={() => linkedinSignUp()}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                          </>
                        )}
                        {data?.text === 'Linkedin Pages' && (
                          <>
                            {data?.apiData?.connection_status === 1 ? (
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={Linkedin}
                                    width={'40px'}
                                    height={'40px'}
                                    onClick={() => reDirect(data)}
                                  />
                                  {linkedinPageTick ? (
                                    <img
                                      src={tick}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setLinkedinPageTick(false)
                                      }
                                      onMouseLeave={() =>
                                        setLinkedinPageTick(true)
                                      }
                                    />
                                  ) : (
                                    <img
                                      src={exit}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() =>
                                        setLinkedinPageTick(false)
                                      }
                                      onMouseLeave={() =>
                                        setLinkedinPageTick(true)
                                      }
                                      onClick={() =>
                                        FBINST_Disconnect(data.text)
                                      }
                                    />
                                  )}
                                </SocialIcon>
                                <Text onClick={() => reDirect(data)}>
                                  {data?.apiData?.configuration?.page_name}
                                </Text>
                              </StyledButton>
                            ) : (
                              <AddButtonIcon
                                onClick={() => handleLinkedinPages(data?.text)}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                          </>
                        )}
                        {data?.text === 'Twitter' && (
                          <>
                            {data?.apiData.connection_status === 1 ? (
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={twitter}
                                    width={'40px'}
                                    height={'40px'}
                                    onClick={() => reDirect(data)}
                                  />
                                  {twitterTick ? (
                                    <img
                                      src={tick}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() => setTwitterTick(false)}
                                      onMouseLeave={() => setTwitterTick(true)}
                                    />
                                  ) : (
                                    <img
                                      src={exit}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() => setTwitterTick(false)}
                                      onMouseLeave={() => setTwitterTick(true)}
                                      onClick={() =>
                                        FBINST_Disconnect(data.text)
                                      }
                                    />
                                  )}
                                </SocialIcon>
                                <Text onClick={() => reDirect(data)}>
                                  {data?.apiData?.configuration?.page_name}
                                </Text>
                              </StyledButton>
                            ) : (
                              <AddButtonIcon
                                onClick={() => twitterSignUp()}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                          </>
                        )}
                        {data?.text === 'Pinterest' && (
                          <>
                            {(data?.apiData.connection_status === 1) ?
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={pinterest}
                                    width={'40px'}
                                    height={'40px'}
                                    onClick={() => reDirect(data)}
                                  />
                                  {
                                    pinterestTick ?
                                      <img
                                        src={tick}
                                        width={'15px'}
                                        height={'15px'}
                                        className="span"
                                        onMouseEnter={() => setPinterestTick(false)}
                                        onMouseLeave={() => setPinterestTick(true)}
                                      />
                                      :
                                      <img
                                        src={exit}
                                        width={'15px'}
                                        height={'15px'}
                                        className="span"
                                        onMouseEnter={() => setPinterestTick(false)}
                                        onMouseLeave={() => setPinterestTick(true)}
                                        onClick={() => FBINST_Disconnect(data.text)}
                                      />
                                  }
                                </SocialIcon>
                                <Text onClick={() => window.open(data?.apiData?.configuration?.profile_link, "_blank")}>{data?.apiData?.configuration?.user_name}</Text>
                              </StyledButton> : <AddButtonIcon
                                onClick={() => handlePinterest(data.text)}
                                style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                              />
                            }
                          </>
                        )}
                        {data?.text === 'YouTube' && (
                          <>
                            {data?.apiData.connection_status === 1 ? (
                              <StyledButton>
                                <SocialIcon>
                                  <img
                                    src={Youtube}
                                    width={'40px'}
                                    height={'40px'}
                                    onClick={() => reDirect(data)}
                                  />
                                  {youtubeTick ? (
                                    <img
                                      src={tick}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() => setYoutubeTick(false)}
                                      onMouseLeave={() => setYoutubeTick(true)}
                                    />
                                  ) : (
                                    <img
                                      src={exit}
                                      width={'15px'}
                                      height={'15px'}
                                      className="span"
                                      onMouseEnter={() => setYoutubeTick(false)}
                                      onMouseLeave={() => setYoutubeTick(true)}
                                      onClick={() =>
                                        FBINST_Disconnect(data.text)
                                      }
                                    />
                                  )}
                                </SocialIcon>
                                <Text
                                  onClick={() =>
                                    window.open(
                                      data?.apiData?.configuration
                                        ?.profile_link,
                                      '_blank'
                                    )
                                  }
                                >
                                  {data?.apiData?.configuration?.user_name}
                                </Text>
                              </StyledButton>
                            ) : (
                              <AddButtonIcon
                                onClick={() => handleYoutube(data?.text)}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                          </>
                        )}
                        {data?.text === 'Facebook Ads' && (
                          <>
                            {(data?.apiData.connection_status === 1) ?
                              <StyledButton>
                                <SocialIcon>
                                 <div onClick={() => reDirect(data)}><FbBusinesss/></div>
                                  {
                                    fbBusinessTick ?
                                      <img
                                        src={tick}
                                        width={'15px'}
                                        height={'15px'}
                                        className="span"
                                        onMouseEnter={() => setFbBusinessTick(false)}
                                        onMouseLeave={() => setFbBusinessTick(true)}
                                      />
                                      :
                                      <img
                                        src={exit}
                                        width={'15px'}
                                        height={'15px'}
                                        className="span"
                                        onMouseEnter={() => setFbBusinessTick(false)}
                                        onMouseLeave={() => setFbBusinessTick(true)}
                                        onClick={() => FBINST_Disconnect(data.text)}
                                      />
                                  }
                                </SocialIcon>
                                <Text>{data?.apiData?.configuration?.ad_account_name}</Text>
                              </StyledButton> : <AddButtonIcon
                                onClick={() => handleFbBusiness(data?.text)}
                                style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                              />
                            }
                          </>
                        )}
                      </div>
                    </AddingMedia>
                  </div>
                </Cards>
              </Col>
            );
          })}
        </Row>
      </TextCard>
      {path === 'Pinterest' && (
        <PinterestPopover
          pinterestSave={pinterestSave}
          details={pinterestBoards}
          CurentUser={CurentUser}
        />
      )}
      {path === 'YouTube' && (
        <YoutubePopover
          details={youtubeChannels}
          youtubeSave={youtubeSave}
          CurentUser={CurentUser}
        />
      )}
      {path === 'Linkedin Pages' && (
        <LinkedinPagesPopover
          details={linkedinPages}
          CurentUser={CurentUser}
          linkedinPageSave={linkedinPageSave}
        />
      )}
    </Wrapper>
  );
};

export default Integration;

const IntegrationData = [
  {
    text: 'Facebook',
    connectText: 'Connect your facebook page ',
    icon: <FacebookIcon />,
    link: null,
  },
  {
    text: 'Facebook Groups',
    connectText: 'Connect your facebook group',
    icon: <FacebookIcon />,
    link: null,
  },
  {
    text: 'Facebook Ads',
    connectText: 'Connect your Facebook Business account',
    icon: <FbBusinesss />,
    link: null,
  },
  {
    text: 'Instagram',
    connectText: 'Connect your instagram business page',
    icon: <InstagramIcon />,
    link: null,
  },
  {
    text: 'WhatsApp',
    connectText: 'Connect your whatsApp business API here',
    icon: <WhatsappIcon />,
    link: 'https://storage.googleapis.com/asp-pprd-images-bucket/ASPVIDEO/whatsappconfig.mp4',
  },
  // {
  //   text: 'Linkedin',
  //   connectText: 'Connect your Linkedin Page',
  //   icon: <LinkdinIcon />,
  //   link: null
  // },
  {
    text: 'Linkedin Pages',
    connectText: 'Connect your Linkedin Page',
    icon: <LinkdinIcon />,
    link: null,
  },
  {
    text: 'Twitter',
    connectText: 'Connect your Twitter account',
    icon: <TwitterIcon />,
    link: null,
  },
  {
    text: 'Pinterest',
    connectText: 'Connect your Pinterest account',
    icon: <PinterestIcon />,
    link: null
  },
  // {
  //   text: 'YouTube',
  //   connectText: 'Connect your YouTube account',
  //   icon: <YoutubeIcon />,
  //   link: null
  // },
];
