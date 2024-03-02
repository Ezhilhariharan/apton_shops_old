import React, { useState, useEffect } from 'react';
import { Divider, Row, Col, Image } from 'antd';
import Flex from '@components/common/Flex';
import {
  Heading,
  GlobalWrapper,
  LinkdinAndTwitter,
  PinterestWrapper,
  PinterestButton,
  FeedCard,
  Cardimage,
  TwitterAndLinkdinImage,
  MarginBottom,
  Wrapper,
  BottomSpace,
  MainWrapper,
  CarouselWrapper,
  TwitterLinkdinCarousel,
  HorizontalLine,
  TwitterText,
  Dot,
  TextWeight,
  TextLight,
  RightContent,
  ToggleWrapper,
  AccountsWrapper,
  SocialIcon,
  SocialAccountsFlex,
} from './ViewStyle';

import Facebook from '@assets/images/FBFlag.png';
import Instagram from '@assets/images/Instagram.png';
import FacebookGrp from '@assets/images/FBGroup.png';
import Linkedin from '@assets/images/LinkdinPage.svg';
import Mobile from '@components/icons/Mobile';
import Monitor from '@components/icons/Monitor';
import ActivateMobile from '@components/icons/ActivateMobile';
import ActivateMonitor from '@components/icons/ActivateMonitor';
import FacebookIcon from '@components/icons/FacebookIcon';
import InstagramIcon from '@components/icons/InstagramIcon';
import Linkdin from '@components/icons/Linkdin';
import MenuDots from '@components/icons/MenuDots';
import Like from '@assets/images/Like.svg';
import Reactions from '@assets/images/Reactions.svg';
import Share from '@assets/images/Share.svg';
import Comment from '@assets/images/comment.svg';
import CommentCount from '@assets/images/Comments.svg';
import ShareInst from '@assets/images/ShareInsta.svg';
import save from '@assets/images/save.svg';
import Heart from '@assets/images/Heart.svg';
import Commentinst from '@assets/images/commentinsta.svg';
import TwitterAnalyticIcon from '@assets/images/twitterAnalyticIcon.png';
import Retweet from '@assets/images/retweet.png';
import twitterLike from '@assets/images/twitterLike.png';
import twitterShare from '@assets/images/twitterShare.png';
import twitterComment from '@assets/images/twitterComment.png';
import twitter from '@assets/images/twitter.png';
import Pinterest from '@assets/images/PinterestLogo.png';

import linkdinAppricate from '@assets/images/linkdinAppricate.png';
import Linkdincomment from '@assets/images/Linkdincomment.png';
import linkdinHeart from '@assets/images/linkdinHeart.png';
import linkdinLight from '@assets/images/linkdinLight.png';
import linkdinLike from '@assets/images/linkdinLike.png';
import linkdinlikeIcon from '@assets/images/linkdinlikeIcon.png';
import linkdinLove from '@assets/images/linkdinLove.png';
import linkdinSend from '@assets/images/linkdinSend.png';
import linkdinShare from '@assets/images/linkdinShare.png';
import linkdinThink from '@assets/images/linkdinThink.png';
import linkdinWorld from '@assets/images/linkdinWorld.png';

import chain from '@assets/images/chain.png';
import HorizontalMenu from '@assets/images/Kebab_Horizontal.png';
import verticalMenu from '@assets/images/verticalMenu.png';
import Upload from '@assets/images/Upload.png';

import BlueTick from '@components/icons/BlueTick';

import { useSelector } from 'react-redux';

const View = () => {
  const [toggle, setToggle] = useState(false);
  const [media, setMedia] = useState('Facebook');
  const [type, setType] = useState('action');
  const [postType, setPostType] = useState(null);
  const [details, setDetails] = useState({
    image: [],
    description: '',
    pageName: '',
  });
  const data = useSelector(
    state => state?.socialMedialExtended?.selectedPopupData
  );
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  useEffect(() => {
    if (data) {
      setType('');
      setMedia('');
      setDetails({
        image: [],
        description: '',
      });
      setToggle(true);
      setPropsData(data);
    }
  }, [data]);

  const setPropsData = data => {
    let obj;
    if (data?.platform_type === 'Pinterest') {
      obj = Object.assign(
        {},
        {
          image: data?.file_url,
          description: data?.message,
          pageName: data?.pageName,
          title: data?.title,
          link: data?.link,
        }
      );
    } else {
      obj = Object.assign(
        {},
        {
          image: data?.file_url,
          description: data?.message,
          pageName: data?.pageName,
        }
      );
    }
    setType(data?.type);
    if (data?.file_url?.length == 0) {
      if (customize) {
        if (
          activeSocialIcon === 'Instagram' ||
          activeSocialIcon === 'Pinterest'
        ) {
          setMedia('');
        } else {
          setMedia(data?.platform_type);
        }
      } else {
        if (
          selectedAccounts.length === 2 &&
          selectedAccounts.includes('Pinterest') &&
          selectedAccounts.includes('Instagram')
        )
          setMedia('');
        else if (
          selectedAccounts.length === 1 &&
          (selectedAccounts.includes('Pinterest') ||
            selectedAccounts.includes('Instagram'))
        )
          setMedia('');
        else {
          const filtered = selectedAccounts?.filter(
            item => 'Instagram' != item
          );
          const filteredData = filtered?.filter(item => 'Pinterest' != item);
          setMedia(filteredData[0]);
        }
      }
    } else {
      setMedia(data?.platform_type);
    }
    setDetails(obj);
    setPostType(data?.postType);
  };
  const onWrapperChange = currentSlide => {};

  const fileType = details?.image && details?.image[0]?.split('.').pop();

  return (
    <MainWrapper>
      <Heading>Preview Post</Heading>
      <Divider className="divider" />
      <Row className="row">
        <Flex className="w-100">
          <Col span={18} className="flex">
            {customize ? (
              <>
                {activeSocialIcon === 'Facebook' && (
                  <img
                    src={Facebook}
                    alt="Lightence"
                    width={34}
                    height={34}
                    className="margin"
                    onClick={() => setMedia('Facebook')}
                  />
                )}
                {activeSocialIcon === 'Instagram' &&
                  details?.image?.length > 0 && (
                    <img
                      src={Instagram}
                      alt="Lightence"
                      width={34}
                      height={34}
                      className="margin"
                      onClick={() => setMedia('Instagram')}
                    />
                  )}
                {activeSocialIcon === 'Facebook Groups' && (
                  <img
                    src={FacebookGrp}
                    alt="Lightence"
                    width={34}
                    height={34}
                    className="margin"
                    onClick={() => setMedia('Facebook Groups')}
                  />
                )}
                {activeSocialIcon == 'Linkedin Pages' && (
                  <img
                    src={Linkedin}
                    alt="Lightence"
                    width={34}
                    height={34}
                    className="margin"
                    onClick={() => setMedia('Linkedin Pages')}
                  />
                )}
                {activeSocialIcon === 'Twitter' && (
                  <img
                    src={twitter}
                    alt="Lightence"
                    width={34}
                    height={34}
                    className="margin"
                    onClick={() => setMedia('Twitter')}
                  />
                )}
                {activeSocialIcon == 'Pinterest' &&
                  details?.image?.length > 0 && (
                    <img
                      src={Pinterest}
                      alt="Lightence"
                      width={34}
                      height={34}
                      className="margin"
                      onClick={() => setMedia('Pinterest')}
                    />
                  )}
              </>
            ) : type === 'action' ? (
              <SocialAccountsFlex borderActive={type === 'action'}>
                <AccountsWrapper>
                  {selectedAccounts?.map(item => (
                    <>
                      {item === 'Facebook' && (
                        <div
                          className={
                            media == 'Facebook' ? 'SocialIconActiveBorder' : ''
                          }
                        >
                          <span
                            className={
                              media == 'Facebook' ? 'SocialIconBorder' : ''
                            }
                          >
                            <SocialIcon>
                              <img
                                src={Facebook}
                                alt="Lightence"
                                width={34}
                                height={34}
                                onClick={() => setMedia('Facebook')}
                              />
                            </SocialIcon>
                          </span>
                        </div>
                      )}
                      {item === 'Instagram' && details?.image?.length > 0 && (
                        <div
                          className={
                            media == 'Instagram' ? 'SocialIconActiveBorder' : ''
                          }
                        >
                          <span
                            className={
                              media == 'Instagram' ? 'SocialIconBorder' : ''
                            }
                          >
                            <SocialIcon>
                              <img
                                src={Instagram}
                                alt="Lightence"
                                width={30}
                                height={30}
                                onClick={() => setMedia('Instagram')}
                              />
                            </SocialIcon>
                          </span>
                        </div>
                      )}
                      {item === 'Facebook Groups' && (
                        <div
                          className={
                            media == 'Facebook Groups'
                              ? 'SocialIconActiveBorder'
                              : ''
                          }
                        >
                          <span
                            className={
                              media == 'Facebook Groups'
                                ? 'SocialIconBorder'
                                : ''
                            }
                          >
                            <SocialIcon>
                              <img
                                src={FacebookGrp}
                                alt="Lightence"
                                width={34}
                                height={34}
                                onClick={() => setMedia('Facebook Groups')}
                              />
                            </SocialIcon>
                          </span>
                        </div>
                      )}
                      {item === 'Linkedin Pages' && (
                        <div
                          className={
                            media == 'Linkedin Pages'
                              ? 'SocialIconActiveBorder'
                              : ''
                          }
                        >
                          <span
                            className={
                              media == 'Linkedin Pages'
                                ? 'SocialIconBorder'
                                : ''
                            }
                          >
                            <SocialIcon>
                              <img
                                src={Linkedin}
                                alt="Lightence"
                                width={30}
                                height={30}
                                onClick={() => setMedia('Linkedin Pages')}
                              />
                            </SocialIcon>
                          </span>
                        </div>
                      )}
                      {item === 'Twitter' && (
                        <div
                          className={
                            media == 'Twitter' ? 'SocialIconActiveBorder' : ''
                          }
                        >
                          <span
                            className={
                              media == 'Twitter' ? 'SocialIconBorder' : ''
                            }
                          >
                            <SocialIcon>
                              <img
                                src={twitter}
                                alt="Lightence"
                                width={30}
                                height={30}
                                onClick={() => setMedia('Twitter')}
                              />
                            </SocialIcon>
                          </span>
                        </div>
                      )}
                      {item === 'Pinterest' && details?.image?.length > 0 && (
                        <div
                          className={
                            media == 'Pinterest' ? 'SocialIconActiveBorder' : ''
                          }
                        >
                          <span
                            className={
                              media == 'Pinterest' ? 'SocialIconBorder' : ''
                            }
                          >
                            <SocialIcon>
                              <img
                                src={Pinterest}
                                alt="Lightence"
                                width={30}
                                height={30}
                                onClick={() => setMedia('Pinterest')}
                              />
                            </SocialIcon>
                          </span>
                        </div>
                      )}
                    </>
                  ))}
                </AccountsWrapper>
              </SocialAccountsFlex>
            ) : (
              ''
            )}
          </Col>
          <Col span={6}>
            <Row justify="end">
              <ToggleWrapper>
                {toggle ? (
                  <div className="active" onClick={() => setToggle(true)}>
                    <ActivateMobile />
                  </div>
                ) : (
                  <div className="item" onClick={() => setToggle(true)}>
                    <Mobile />
                  </div>
                )}
                {toggle ? (
                  <div className="item " onClick={() => setToggle(false)}>
                    <Monitor />
                  </div>
                ) : (
                  <div className="active" onClick={() => setToggle(false)}>
                    <ActivateMonitor />
                  </div>
                )}
              </ToggleWrapper>
            </Row>
          </Col>
        </Flex>
      </Row>
      {/* {
        type == "action" ?
          <ToggleButton >
            <div className={active == 1 ? "toggleLeftActive" : "toggleLeft"} onClick={() => setActive(1)}>Story</div>
            <div className={active == 2 ? "toggleRightActive" : "toggleRight"} onClick={() => setActive(2)}>Feed</div>
          </ToggleButton>
          :
          ""} */}
      <GlobalWrapper>
        {(media === 'Facebook' ||
          (media === 'Instagram' && details?.image?.length > 0) ||
          media === 'Facebook Groups') && (
          <FeedCard style={{ width: toggle ? '270px' : '500px' }}>
            <div className="header">
              <div className="profile">
                <div className="profile-img">
                  {media === 'Facebook' && <FacebookIcon />}
                  {media === 'Instagram' && <InstagramIcon />}
                  {media === 'Facebook Groups' && (
                    <img
                      src={FacebookGrp}
                      alt="Lightence"
                      width={34}
                      height={33}
                    />
                  )}
                  {media === 'Linkedin Pages' && <Linkdin />}
                </div>
                <div className="profile-details">
                  <div className="title">
                    {media === 'Facebook' &&
                      (details?.pageName ? details?.pageName : 'Facebook')}
                    {media === 'Instagram' &&
                      (details?.pageName ? details?.pageName : 'Instagram')}
                    {media === 'Facebook Groups' &&
                      (details?.pageName
                        ? details?.pageName
                        : 'Facebook Group')}
                    {media === 'Linkedin Pages' &&
                      (details?.pageName
                        ? details?.pageName
                        : 'Linkedin Pages')}
                  </div>
                </div>
              </div>
              <div className="menu">
                <MenuDots />
              </div>
            </div>
            {media === 'Facebook' || media === 'Facebook Groups' ? (
              <div className="description">
                {details?.description &&
                  details?.description?.split(' ').map(text => {
                    if (text.match(/^#[^ !@#$%^&*(),.?":{}|<>]*$/g)) {
                      return <span className="fblink">{text} </span>;
                    } else {
                      return <>{text} </>;
                    }
                  })}
              </div>
            ) : (
              ''
            )}
            {postType === 'REEL' ? (
              <video
                width={toggle ? '270px' : '475px'}
                height="250"
                className="videoStyle"
                id="videoStyle"
                autoplay="autoplay"
                muted
                loop="loop"
                src={details?.image[details?.image?.length - 1]}
              />
            ) : details?.image &&
              fileType &&
              (fileType === 'jpeg' ||
                fileType === 'jpg' ||
                fileType === 'png') ? (
              <>
                {Array.isArray(details?.image) && details?.image?.length > 1 ? (
                  <CarouselWrapper afterChange={onWrapperChange}>
                    {details?.image?.map((imgSrc, ind) => {
                      return (
                        <div className="border">
                          {/* <Cardimage src={imgSrc} key={ind} preview={false} /> */}
                          <TwitterAndLinkdinImage
                            src={imgSrc}
                            key={ind}
                            style={{
                              width: toggle ? '245px' : '425px',
                              height: toggle ? '180px' : '250px',
                            }}
                            preview={false}
                          />
                        </div>
                      );
                    })}
                  </CarouselWrapper>
                ) : (
                  (details?.image?.length === 1 ||
                    !Array.isArray(details?.image)) && (
                    <div className="center">
                      <Cardimage
                        src={
                          Array.isArray(details?.image)
                            ? details?.image[0]
                            : details?.image
                        }
                        preview={false}
                      />
                    </div>
                  )
                )}
              </>
            ) : (
              fileType === 'mp4' && (
                <video
                  width={toggle ? '270px' : '475px'}
                  height="250"
                  className="videoStyle"
                  id="videoStyle"
                  autoplay="autoplay"
                  muted
                  loop="loop"
                  src={details?.image[details?.image?.length - 1]}
                />
              )
            )}
            {media === 'Facebook' || media === 'Facebook Groups' ? (
              <Wrapper>
                <Image src={Reactions} preview={false} />
                <Image
                  src={CommentCount}
                  preview={false}
                  className="marginTop"
                />
              </Wrapper>
            ) : (
              <Wrapper>
                <div className="instaheart">
                  <Image src={Heart} preview={false} />
                  <Image src={Commentinst} preview={false} />
                  <Image src={ShareInst} preview={false} />
                </div>
                <Image src={save} preview={false} />
              </Wrapper>
            )}
            {media === 'Instagram' ? (
              <div className="description">
                <strong style={{ marginRight: '5px' }}>
                  {details?.pageName ? details?.pageName : 'Instagram'}
                </strong>
                {details?.description &&
                  details?.description?.split(' ').map(text => {
                    if (text.match(/^#[^ !@#$%^&*(),.?":{}|<>]*$/g)) {
                      return <span className="fblink">{text} </span>;
                    } else {
                      return <>{text} </>;
                    }
                  })}
              </div>
            ) : (
              ''
            )}
            {media === 'Linkedin Pages' ? (
              <div className="description">
                <strong>Linkedin </strong>
                {details?.description &&
                  details?.description?.split(' ').map(text => {
                    if (text.match(/^#[^ !@#$%^&*(),.?":{}|<>]*$/g)) {
                      return <span className="fblink">{text} </span>;
                    } else {
                      return <>{text} </>;
                    }
                  })}
              </div>
            ) : (
              ''
            )}
            {media === 'Facebook' || media === 'Facebook Groups' ? (
              <Wrapper>
                <Image src={Like} preview={false} />
                <Image src={Comment} preview={false} />
                <Image src={Share} preview={false} />
              </Wrapper>
            ) : (
              ''
            )}
            <BottomSpace />
          </FeedCard>
        )}
        {media === 'Twitter' && (
          <LinkdinAndTwitter style={{ width: toggle ? '290px' : '500px' }}>
            <div className="header">
              <div className="profile">
                <div className="profile-img">
                  {media == 'Twitter' && (
                    <img src={twitter} alt="Lightence" width={34} height={34} />
                  )}
                </div>
                <div className="profile-details">
                  <div className="title">
                    {media === 'Twitter' &&
                      (details?.pageName ? details?.pageName : 'Twitter')}
                    <span className="blueTick">
                      <BlueTick />
                    </span>
                  </div>
                </div>
              </div>
              <div className="menu">
                <MenuDots />
              </div>
            </div>
            <div className="description">
              {details?.description &&
                details?.description?.split(' ').map(text => {
                  if (text.match(/^#[^ !@#$%^&*(),.?":{}|<>]*$/g)) {
                    return <span className="fblink">{text} </span>;
                  } else {
                    return <>{text} </>;
                  }
                })}
            </div>
            {details?.image && details?.image?.length > 0 ? (
              postType ? (
                postType == 'REEL' ? (
                  <video
                    width={toggle ? '245px' : '425px'}
                    className="twitter"
                    height="250"
                    id="videoStyle"
                    autoplay="autoplay"
                    muted
                    loop="loop"
                    src={details?.image[details?.image?.length - 1]}
                  />
                ) : (
                  <TwitterLinkdinCarousel
                    style={{
                      width: toggle ? '245px' : '425px',
                      height: toggle ? '150px' : '200px',
                    }}
                    minimumHeight={toggle ? '225px' : '290px'}
                    afterChange={onWrapperChange}
                  >
                    {details?.image.map((imgSrc, ind) => {
                      return (
                        <div className="border">
                          <TwitterAndLinkdinImage
                            src={imgSrc}
                            key={ind}
                            style={{
                              width: toggle ? '245px' : '425px',
                              height: toggle ? '180px' : '250px',
                            }}
                            preview={false}
                          />
                        </div>
                      );
                    })}
                  </TwitterLinkdinCarousel>
                )
              ) : details?.image &&
                fileType &&
                (fileType === 'jpeg' ||
                  fileType === 'jpg' ||
                  fileType === 'png') ? (
                <TwitterLinkdinCarousel
                  style={{
                    width: toggle ? '245px' : '425px',
                    height: toggle ? '150px' : '200px',
                  }}
                  minimumHeight={toggle ? '225px' : '290px'}
                  afterChange={onWrapperChange}
                >
                  {details?.image.map((imgSrc, ind) => {
                    return (
                      <div className="border">
                        <TwitterAndLinkdinImage
                          src={imgSrc}
                          key={ind}
                          style={{
                            width: toggle ? '245px' : '425px',
                            height: toggle ? '180px' : '250px',
                          }}
                          preview={false}
                        />
                      </div>
                    );
                  })}
                </TwitterLinkdinCarousel>
              ) : (
                <video
                  width={toggle ? '245px' : '425px'}
                  height="250"
                  className="twitter"
                  id="videoStyle"
                  autoplay="autoplay"
                  muted
                  loop="loop"
                  src={details?.image[details?.image?.length - 1]}
                />
              )
            ) : (
              ''
            )}
            <TwitterText style={{ marginTop: '5px' }}>
              3:45PM - April 1, 2020 - Twitter for Sputnik
            </TwitterText>
            <HorizontalLine />
            <Flex>
              {' '}
              <img src={TwitterAnalyticIcon} width={20} height={20} />
              <TwitterText style={{ marginTop: '6px' }}>
                View Tweet activity
              </TwitterText>
            </Flex>
            <HorizontalLine />
            <Flex spaceBetween>
              <TwitterText>0 Retweets</TwitterText>
              <TwitterText>0 Quote Tweets</TwitterText>
              <TwitterText>0 Likes</TwitterText>
            </Flex>
            <HorizontalLine />
            <Flex spaceBetween>
              <img src={Retweet} width={14} height={14} />
              <img src={twitterLike} width={14} height={14} />
              <img src={twitterShare} width={14} height={14} />
              <img src={twitterComment} width={14} height={14} />
            </Flex>
          </LinkdinAndTwitter>
        )}
        {media === 'Linkedin Pages' && (
          <LinkdinAndTwitter style={{ width: toggle ? '290px' : '500px' }}>
            <div className="header">
              <div className="profile">
                <div className="profile-img">
                  {media === 'Linkedin Pages' && <Linkdin />}
                </div>
                <div className="profile-details">
                  <div className="title">
                    <Flex>
                      {media === 'Linkedin Pages' &&
                        (details?.pageName
                          ? details?.pageName
                          : 'Linkedin Pages')}
                      <img
                        src={linkdinWorld}
                        width={14}
                        height={14}
                        className="linkWorld"
                      />
                    </Flex>
                  </div>
                </div>
              </div>
              <div className="menu">
                <MenuDots />
              </div>
            </div>
            <div className="description">
              {details?.description &&
                details?.description?.split(' ').map(text => {
                  if (text.match(/^#[^ !@#$%^&*(),.?":{}|<>]*$/g)) {
                    return <span className="fblink">{text} </span>;
                  } else {
                    return <>{text} </>;
                  }
                })}
            </div>
            {details?.image?.length > 0 && (
              <>
                {postType !== 'REEL' &&
                fileType &&
                (fileType === 'jpeg' ||
                  fileType === 'jpg' ||
                  fileType === 'png') ? (
                  <TwitterLinkdinCarousel
                    style={{
                      width: toggle ? '245px' : '425px',
                      height: toggle ? '150px' : '200px',
                    }}
                    minimumHeight={toggle ? '225px' : '290px'}
                    afterChange={onWrapperChange}
                  >
                    {details?.image?.map((imgSrc, ind) => {
                      return (
                        <div className="border">
                          <TwitterAndLinkdinImage
                            src={imgSrc}
                            key={ind}
                            style={{
                              width: toggle ? '245px' : '425px',
                              height: toggle ? '180px' : '250px',
                            }}
                            preview={false}
                          />
                        </div>
                      );
                    })}
                  </TwitterLinkdinCarousel>
                ) : (
                  <video
                    width={toggle ? '245px' : '425px'}
                    height="250"
                    className="twitter"
                    id="videoStyle"
                    autoplay="autoplay"
                    muted
                    loop="loop"
                    src={details?.image[details?.image?.length - 1]}
                  />
                )}
              </>
            )}

            <Flex style={{ marginTop: '5px' }} spaceBetween>
              <Flex>
                <img
                  src={linkdinLike}
                  width={14}
                  height={14}
                  style={{ marginRight: '2px' }}
                />
                <img
                  src={linkdinAppricate}
                  width={14}
                  height={14}
                  style={{ marginRight: '2px' }}
                />
                <img
                  src={linkdinLove}
                  width={14}
                  height={14}
                  style={{ marginRight: '2px' }}
                />
                <img
                  src={linkdinHeart}
                  width={14}
                  height={14}
                  style={{ marginRight: '2px' }}
                />
                <img
                  src={linkdinLight}
                  width={14}
                  height={14}
                  style={{ marginRight: '2px' }}
                />
                <img
                  src={linkdinThink}
                  width={14}
                  height={14}
                  style={{ marginRight: '2px' }}
                />
              </Flex>
              <Flex>
                <TwitterText style={{ marginLeft: '60px', fontSize: '13px' }}>
                  0
                </TwitterText>
                <Dot />
                <TwitterText style={{ fontSize: '13px' }}>
                  0 comments
                </TwitterText>
              </Flex>
            </Flex>
            <HorizontalLine style={{ margin: '10px 0' }} />
            <Flex spaceBetween>
              <Flex>
                <img
                  src={linkdinlikeIcon}
                  width={15}
                  height={15}
                  style={{ marginRight: '2px' }}
                />{' '}
                <TwitterText
                  style={{
                    marginRight: '6px',
                    fontSize: '14px',
                    marginTop: '2px',
                  }}
                >
                  Like
                </TwitterText>
              </Flex>
              <Flex>
                <img
                  src={Linkdincomment}
                  width={15}
                  height={15}
                  style={{ marginRight: '2px' }}
                />
                <TwitterText
                  style={{
                    marginRight: '6px',
                    fontSize: '14px',
                    marginTop: '2px',
                  }}
                >
                  Comment
                </TwitterText>
              </Flex>
              <Flex>
                <img
                  src={linkdinShare}
                  width={15}
                  height={15}
                  style={{ marginRight: '2px' }}
                />
                <TwitterText
                  style={{
                    marginRight: '6px',
                    fontSize: '14px',
                    marginTop: '2px',
                  }}
                >
                  Share
                </TwitterText>
              </Flex>
              <Flex>
                <img
                  src={linkdinSend}
                  width={15}
                  height={15}
                  style={{ marginLeft: '2px' }}
                />
                <TwitterText
                  style={{
                    marginRight: '0px',
                    fontSize: '14px',
                    marginTop: '2px',
                  }}
                >
                  Send
                </TwitterText>
              </Flex>
            </Flex>
          </LinkdinAndTwitter>
        )}
        {media === 'Pinterest' && details?.image?.length > 0 && (
          <>
            {toggle ? (
              <LinkdinAndTwitter style={{ width: toggle ? '310px' : '500px' }}>
                {postType !== 'REEL' &&
                fileType &&
                (fileType === 'jpeg' ||
                  fileType === 'jpg' ||
                  fileType === 'png') ? (
                  <TwitterLinkdinCarousel
                    style={{
                      width: toggle ? '260px' : '425px',
                      height: toggle ? '260px' : '200px',
                    }}
                    minimumHeight={'290px'}
                    afterChange={onWrapperChange}
                  >
                    {details?.image?.map((imgSrc, ind) => {
                      return (
                        <>
                          <div className="border">
                            <TwitterAndLinkdinImage
                              src={imgSrc}
                              key={ind}
                              style={{
                                width: toggle ? '260px' : '425px',
                                height: toggle ? '260px' : '250px',
                              }}
                              preview={false}
                            />
                          </div>
                        </>
                      );
                    })}
                  </TwitterLinkdinCarousel>
                ) : (
                  <video
                    width="260"
                    height="260"
                    className="twitter"
                    id="videoStyle"
                    autoplay="autoplay"
                    muted
                    loop="loop"
                    src={details?.image[details?.image?.length - 1]}
                  />
                )}
                <Flex spaceBetween style={{ marginTop: '10px' }}>
                  <Flex>
                    <img
                      src={Pinterest}
                      alt="Lightence"
                      width={32}
                      height={32}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <TextWeight>
                        {details?.pageName ? details?.pageName : 'Pinterest'}
                      </TextWeight>
                      <TextLight> Followers</TextLight>
                    </div>
                  </Flex>
                  <Flex>
                    <PinterestButton>Follow</PinterestButton>
                    <img
                      src={verticalMenu}
                      alt="Lightence"
                      width={6}
                      height={20}
                      className="verticalMenu"
                    />
                  </Flex>
                </Flex>
                <Flex center style={{ marginTop: '20px' }}>
                  <TextWeight>{details?.title}</TextWeight>
                </Flex>
                <Flex center>
                  <TextLight>
                    {details?.description &&
                      details?.description?.split(' ').map(text => {
                        if (text.match(/^#[^ !@#$%^&*(),.?":{}|<>]*$/g)) {
                          return <span className="fblink">{text} </span>;
                        } else {
                          return <>{text} </>;
                        }
                      })}{' '}
                  </TextLight>
                </Flex>
                <Flex center style={{ marginTop: '20px' }}>
                  <img
                    src={Commentinst}
                    alt="Lightence"
                    width={22}
                    height={22}
                  />
                  <img
                    src={chain}
                    alt="Lightence"
                    width={22}
                    height={22}
                    style={{ marginLeft: '15px' }}
                  />
                  <img
                    src={Upload}
                    alt="Lightence"
                    width={22}
                    height={22}
                    style={{ marginLeft: '15px' }}
                  />
                  <img
                    src={HorizontalMenu}
                    alt="Lightence"
                    width={30}
                    height={30}
                    style={{ marginLeft: '15px' }}
                  />
                </Flex>
              </LinkdinAndTwitter>
            ) : (
              <PinterestWrapper>
                <Flex>
                  {postType !== 'REEL' &&
                  fileType &&
                  (fileType === 'jpeg' ||
                    fileType === 'jpg' ||
                    fileType === 'png') ? (
                    <TwitterLinkdinCarousel
                      style={{ width: '275px', height: '340px' }}
                      minimumHeight={'370px'}
                      afterChange={onWrapperChange}
                    >
                      {details?.image?.map((imgSrc, ind) => {
                        return (
                          <>
                            {imgSrc && (
                              <div className="border">
                                <TwitterAndLinkdinImage
                                  src={imgSrc}
                                  key={ind}
                                  style={{
                                    minWidth: '260px',
                                    maxWidth: '290px',
                                    width: '275px',
                                    height: '340px',
                                  }}
                                  preview={false}
                                />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </TwitterLinkdinCarousel>
                  ) : (
                    <video
                      width="260"
                      height="340"
                      className="twitter"
                      id="videoStyle"
                      autoplay="autoplay"
                      muted
                      loop="loop"
                      src={details?.image[details?.image?.length - 1]}
                    />
                  )}
                  <RightContent>
                    <div>
                      <Flex spaceBetween>
                        <Flex>
                          <img
                            src={HorizontalMenu}
                            alt="Lightence"
                            width={30}
                            height={30}
                          />
                          <img
                            src={Upload}
                            alt="Lightence"
                            width={22}
                            height={22}
                            style={{ marginLeft: '15px' }}
                          />
                          <img
                            src={chain}
                            alt="Lightence"
                            width={22}
                            height={22}
                            style={{ marginLeft: '15px' }}
                          />
                        </Flex>
                        <PinterestButton>Follow</PinterestButton>
                      </Flex>
                      <div className="link">{details?.link}</div>
                      <TextWeight
                        style={{ marginTop: '25px', fontSize: '24px' }}
                      >
                        {details?.title}
                      </TextWeight>
                      <TextLight
                        style={{ marginTop: '10px', fontSize: '14px' }}
                      >
                        {details?.description &&
                          details?.description?.split(' ').map(text => {
                            if (text.match(/^#[^ !@#$%^&*(),.?":{}|<>]*$/g)) {
                              return <span className="fblink">{text} </span>;
                            } else {
                              return <>{text} </>;
                            }
                          })}
                      </TextLight>
                    </div>
                    <Flex
                      spaceBetween
                      style={{ width: '100%', marginBottom: '10px' }}
                    >
                      <Flex>
                        <img
                          src={Pinterest}
                          alt="Lightence"
                          width={32}
                          height={32}
                        />
                        <div style={{ marginLeft: '10px' }}>
                          <TextWeight>
                            {details?.pageName
                              ? details?.pageName
                              : 'Pinterest'}
                          </TextWeight>
                          <TextLight>Followers</TextLight>
                        </div>
                      </Flex>
                      <PinterestButton>Save</PinterestButton>
                    </Flex>
                  </RightContent>
                </Flex>
              </PinterestWrapper>
            )}
          </>
        )}
      </GlobalWrapper>
      <MarginBottom />
    </MainWrapper>
  );
};

export default View;
