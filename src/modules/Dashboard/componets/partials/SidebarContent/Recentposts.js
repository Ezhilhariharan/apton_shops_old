import React, { useEffect, useState } from 'react';
import { Text, More } from './Sidecard';
import Flex from '@components/common/Flex';
import { Card, Divider, Avatar, Carousel, Button } from 'antd';
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
const Posts = styled(Card)`
  background: #ffffff;
  border-radius: 10px;
  margin-top: 20px;
  .more {
    cursor: pointer;
    font-size: 20px;
    color: black;
  }
  .image {
    width: 200px;
    margin: 30px 20px 20px 70px;
  }
`;
const ParagraphText = styled.p`
  font-weight: 500;
  font-size: 14px;
  padding-left: 20px;
  height: 130px;
  overflow-y: scroll;
`;
const CarouselWrapper = styled(Carousel)`
  width: 140px;
  height: 210px;
  > .slick-dots li button {
    background: #3897f0;
  }
  > .slick-dots li.slick-active button {
    background: #3897f0;
  }
  margin-top: 10px;
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
  const values = campaigns
    ?.filter(name => name?.response_message?.post_type !== 'REEL')
    .map(filteredName => {
      return filteredName;
    });
  useEffect(() => {
    setList(dashboardPostsList?.list);
  }, [dashboardPostsList?.list]);
  return (
    <Posts>
      <Flex spaceBetween>
        <Text>Recent Posts</Text>
        {/* <Text>
          <MoreOutlined className='more' />
        </Text> */}
      </Flex>
      <Divider />
      {list?.length === 0 && (
        <div className="image">
          <TutorialImage />{' '}
          <Text style={{ margin: '10px' }}>No Recent Post's found</Text>
        </div>
      )}
      <Carousel autoplay dots={false} style={{ height: '200px' }}>
        {values?.length > 0 &&
          values !== '' &&
          values?.map(Postsdata => {
            const image = Postsdata?.response_message?.file_url;
            let date = Postsdata?.post_date.split('T')[0];
            let Time = Postsdata?.post_date.split('T')[1];
            let merging = new Date(
              date.split('-')[0],
              date.split('-')[1] - 1,
              date.split('-')[2],
              Time.split(':')[0],
              Time.split(':')[1]
            );
            return (
              <div>
                <Flex>
                  {image !== null && (
                    <CarouselWrapper style={{ cursor: 'pointer' }}>
                      {image?.map(item => (
                        <img
                          src={item}
                          alt="Lightence"
                          width={140}
                          height={190}
                        />
                      ))}
                    </CarouselWrapper>
                  )}
                  <div style={{ display: 'block' }}>
                    {Postsdata?.response_message?.message?.length > 0 && (
                      <ParagraphText>
                        {Postsdata?.response_message?.message?.length > 40 ? (
                          <ReadMore>
                            {Postsdata?.response_message?.message}
                          </ReadMore>
                        ) : (
                          <>{Postsdata?.response_message?.message}</>
                        )}
                      </ParagraphText>
                    )}
                    <Flex spaceBetween>
                      <div>
                        {Postsdata?.platform_type === 'Facebook' && (
                          <Avatar.Group style={{ marginLeft: '20px' }}>
                            <Avatar icon={<FacebookLogo />} />
                          </Avatar.Group>
                        )}
                        {Postsdata?.platform_type === 'Instagram' && (
                          <Avatar.Group style={{ marginLeft: '20px' }}>
                            <Avatar icon={<InstagramLogo />} />
                          </Avatar.Group>
                        )}
                        {Postsdata?.platform_type === 'Facebook Groups' && (
                          <Avatar.Group style={{ marginLeft: '20px' }}>
                            <Avatar src={FbGroup} />
                          </Avatar.Group>
                        )}
                      </div>

                      <span style={{ fontSize: '12px', margin: '10px' }}>
                        <ClockCircleOutlined />
                        {Postsdata?.post_date &&
                          moment(merging).format('lll')}{' '}
                      </span>
                    </Flex>
                  </div>
                </Flex>
              </div>
            );
          })}
      </Carousel>
      {values?.length > 1 && (
        <Flex center>
          <More type="text" href={'/socialmedia-automation'}>
            See All Posts <ArrowRightOutlined />
          </More>
        </Flex>
      )}
    </Posts>
  );
};

export default Recentposts;
