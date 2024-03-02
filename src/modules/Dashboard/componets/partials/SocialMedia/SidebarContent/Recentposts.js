import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Text, More } from '../../WhatsApp/SidebarContent/Sidecard';
import Flex from '@components/common/Flex';
import { Card, Divider, Avatar, Carousel, Button, Spin } from 'antd';
import styled from 'styled-components';
import {
  MoreOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import InstagramLogo from '@components/icons/InstagramLogo';
import FacebookLogo from '@components/icons/FacebookLogo';
import TutorialImage from '@components/icons/TutorialImage';
import FbGroup from '@assets/images/FBGroup.png';
import Pinterest from '@assets/images/pinterest.png';
import { updateButtons } from '../../../../../SocialMedia/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Posts = styled(Card)`
  width: 100%;
  // height: 350px;
  background: #ffffff;
  border: none;
  border-radius: 10px;

  .ant-card-body {
    padding: 20px;
  }
  .more {
    cursor: pointer;
    font-size: 1.25rem;
    color: black;
  }
  .image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translate(0px, 20px);
  }
`;
const ParagraphText = styled.p`
  font-weight: 500;
  font-size: 1rem;
  color: #4d4d4d;
  padding-left: 35px;
  height: 80px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Number of lines to display */
  -webkit-box-orient: vertical;
  line-break: anywhere;
  text-overflow: ellipsis;
`;
const CarouselWrapper = styled(Carousel)`
  width: 140px;
  height: 170px;
  > .ant-carousel,
  .slick-slide {
    border-radius: 10px;
  }
  > .slick-dots li button {
    background: #3897f0;
  }
  > .slick-dots li.slick-active button {
    background: #3897f0;
  }
`;

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? text.slice(0, 55) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? (
          <More type="text">Read More </More>
        ) : (
          <More type="text"> Read Less </More>
        )}
      </span>
    </p>
  );
};

const Recentposts = ({ dashboardPostsList }) => {
  const [list, setList] = useState(dashboardPostsList?.list);
  const campaigns = dashboardPostsList?.list?.map(item => {
    return item;
  });
  const loader = useSelector(
    state => state?.socialMedialIntegration?.loader,
    shallowEqual
  );

  useEffect(() => {
    setList(dashboardPostsList?.list);
  }, [dashboardPostsList?.list]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Posts>
      <Flex spaceBetween>
        <Text>Recent Posts</Text>
        {/* <Text>
          <MoreOutlined className='more' />
        </Text> */}
      </Flex>
      <Divider style={{ marginTop: '10px' }} />

      {list?.length === 0 && (
        <div className="image">
          <TutorialImage />{' '}
          <Text
            style={{ margin: '10px', fontSize: '0.875rem', color: '#4d4d4d' }}
          >
            No Recent Post's found
          </Text>
        </div>
      )}
      <Spin spinning={loader}>
        <Carousel autoplay dots={false} style={{ height: '200px' }}>
          {list?.length > 0 &&
            list !== '' &&
            list?.map(Postsdata => {
              const image = Postsdata?.response_message?.file_url;
              let date = Postsdata?.post_date?.split('T')[0];
              let Time = Postsdata?.post_date?.split('T')[1];
              let merging = new Date(
                date?.split('-')[0],
                date?.split('-')[1] - 1,
                date?.split('-')[2],
                Time?.split(':')[0],
                Time?.split(':')[1]
              );
              return (
                <a
                  href={Postsdata?.response_message?.post_link}
                  target="_blank"
                >
                  <Flex>
                    {Postsdata?.response_message?.file_url &&
                      Postsdata?.response_message?.file_url?.length > 0 && (
                        <CarouselWrapper style={{ cursor: 'pointer' }}>
                          {image?.map(item => {
                            const fileType = item?.split('.').pop();
                            return (
                              <>
                                {fileType === 'mp4' ? (
                                  <video
                                    src={item}
                                    width={140}
                                    height={150}
                                    autoPlay="autoPlay"
                                    muted
                                    loop="loop"
                                    style={{
                                      borderRadius: '20px',
                                      objectFit: 'cover',
                                    }}
                                  />
                                ) : (
                                  fileType !== 'mp4' && (
                                    <img
                                      src={item}
                                      alt="Lightence"
                                      // width={140}
                                      // height={150}
                                      style={{
                                        borderRadius: '20px',
                                        width: '140px',
                                        height: '150px',
                                        objectFit: 'fill',
                                      }}
                                    />
                                  )
                                )}
                              </>
                            );
                          })}
                        </CarouselWrapper>
                      )}

                    <ParagraphText>
                      {Postsdata?.response_message?.message?.length > 0 &&
                        Postsdata?.response_message?.message}
                    </ParagraphText>
                  </Flex>

                  <Flex spaceBetween style={{ width: '322px' }}>
                    <div>
                      {Postsdata?.platform_type === 'Facebook' && (
                        <Avatar.Group>
                          <Avatar icon={<FacebookLogo />} />
                        </Avatar.Group>
                      )}
                      {Postsdata?.platform_type === 'Instagram' && (
                        <Avatar.Group>
                          <Avatar icon={<InstagramLogo />} />
                        </Avatar.Group>
                      )}
                      {Postsdata?.platform_type === 'Facebook Groups' && (
                        <Avatar.Group>
                          <Avatar src={FbGroup} />
                        </Avatar.Group>
                      )}
                      {Postsdata?.platform_type === 'Pinterest' && (
                        <Avatar.Group>
                          <Avatar src={Pinterest} />
                        </Avatar.Group>
                      )}
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#4D4D4D',
                        }}
                      >
                        <ClockCircleOutlined style={{ padding: '5px' }} />
                        {Postsdata?.post_date &&
                          moment(merging).format('MMM DD [at] h:mm A')}{' '}
                      </span>
                    </div>
                  </Flex>
                </a>
              );
            })}
        </Carousel>

        <Flex center>
          <More
            type="link"
            onClick={() => {
              navigate('/socialmedia-automation');
              // dispatch(updateButtons('Published'));

              // window.location.reload();
            }}
            style={{ marginTop: '7px' }}
          >
            See All Posts <ArrowRightOutlined />
          </More>
        </Flex>
      </Spin>
    </Posts>
  );
};

export default Recentposts;
