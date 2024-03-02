import React, { useEffect, useState } from 'react';
import { Divider, Typography, Spin, Col } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { useSelector, shallowEqual } from 'react-redux';
import InstHeart from '@components/icons/InstHeart';
import InstComment from '@components/icons/InstComment';
import InstSave from '@components/icons/InstSave';
import InstShare from '@components/icons/InstShare';
import InsightsFbLike from '@components/icons/InsightsFbLike';

import Engagementrate from '@assets/images/Engagementrate.png';
import Followers from '@assets/images/Followers.png';
import Postreach from '@assets/images/Postreach.png';
import Profilevisits from '@assets/images/Profilevisits.png';
import Postimpressions from '@assets/images/Postimpressions.png';
import Impression from '@assets/images/impression.png';

import InsightsFbAngry from '@assets/images/insightsFbAngry.png';
import InsightsFbCare from '@assets/images/insightsFbCare.png';
import InsightsFbHaha from '@assets/images/insightsFbHaha.png';
import InsightsFbLikeInteraction from '@assets/images/insightsFbLike.png';
import InsightsFbLove from '@assets/images/insightsFbLove.png';
import InsightsFbSad from '@assets/images/insightsFbSad.png';
import InsightsFbWow from '@assets/images/insightsFbWow.png';
import InsightsLike from '@assets/images/InsightsLike.png';

const MainWrapper = styled('div')`
  width: 100%;
  .divider {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 15px 0px;
  }
  .dividerWithoutMargin {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 0px;
  }
  .iteractions {
    font-size: 18px;
    font-weight: 700;
  }
`;
const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #4d4d4d;
`;
const Body = styled('span')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled('span')`
  width: 80%;
  .postReaction {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .img {
      margin-top: 15px;
    }
  }
`;
const Box = styled('span')`
  width: 160px;
  height: 158px;
  margin-bottom: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Count = styled('span')`
  font-weight: 600;
  font-size: 46px;
  line-height: 56px;
  color: #181818;
`;
const BoxName = styled('span')`
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #4d4d4d;
`;
const FotterBox = styled('div')`
  width: 100%;
  height: 80px;
  background: #ffffff;
  border: 1px solid #f4f4f5;
  box-shadow: 0px 0px 14px rgba(79, 92, 128, 0.15);
  border-radius: 10px;
  padding: 16px;
  .TotalCount {
    font-weight: 600;
    font-size: 32px;
    color: #181818;
  }
  .fotterImg {
    margin-top: 4px;
  }
`;
const Text = styled('div')`
font-weight: 400;
font-size: 16px;
line-height: 16px;
color: #4D4D4D;
margin-top:16px;
}
`;
const InSights = ({ postData }) => {
  const postAction = useSelector(state => state, shallowEqual);
  const [postReaction, setPostReaction] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [postImpressions, setPostImpressions] = useState({});
  const [facebookReaction, setFacebookReaction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let filterPostImpressions =
      postAction?.socialMedialIntegration?.postActions?.data?.filter(
        item => 'impressions' == item?.name
      );
    filterPostImpressions && setPostImpressions(filterPostImpressions[0]);
    mergingData();
    if (
      postAction?.socialMedialIntegration?.postActions?.hasOwnProperty(
        'data'
      ) &&
      postAction?.socialMedialIntegration?.postActions?.data?.length > 0
    ) {
      setLoading(false);
    } else setLoading(true);
  }, [postAction]);

  useEffect(() => {
    setLoading(true);
    return () => {
      setLoading(true);
    };
  }, []);

  const mergingData = () => {
    let merging = [];
    let mergingPostDeatils = [];
    let mergingFbReaction = [];
    if (postData?.platform_type === 'Facebook') {
      ReactionBox?.map(data => {
        if (data?.boxType === 'likes') {
          merging.push({
            ...data,
            count: postData?.likes ? postData?.likes : 0,
          });
        } else if (data?.boxType === 'comments') {
          merging.push({
            ...data,
            count: postData?.comments ? postData?.comments : 0,
          });
        } else if (data?.boxType === 'shares') {
          merging.push({
            ...data,
            count: postData?.shares?.count ? postData?.shares?.count : 0,
          });
        }
      });

      if (postData?.response_message?.post_type === 'REEL') {
        FacebookReel?.map(parent => {
          postAction?.socialMedialIntegration?.postActions?.data?.map(child => {
            if (parent.name == child.name) {
              if (child.name === 'post_video_social_actions') {
                let adding =
                  (child?.values[0]?.value?.COMMENT || 0) +
                  (child?.values[0]?.value?.SHARE || 0);
                mergingPostDeatils.push({ ...parent, count: adding });
              } else if (child.name === 'post_video_likes_by_reaction_type') {
                mergingPostDeatils.push({
                  ...parent,
                  count: child?.values[0]?.value?.REACTION_LIKE || 0,
                });
              } else {
                mergingPostDeatils.push({
                  ...parent,
                  count: child?.values[0]?.value,
                });
              }
            }
          });
        });
      } else {
        FbBox?.map(parent => {
          postAction?.socialMedialIntegration?.postActions?.data?.map(child => {
            if (parent.name === child.name) {
              mergingPostDeatils.push({ ...parent, apiData: child });
            }
          });
        });
      }

      postAction?.socialMedialIntegration?.postActions?.data?.map(parent => {
        if (parent?.name === 'post_reactions_by_type_total')
          Interactions?.map(data => {
            if (data?.name === 'like') {
              mergingFbReaction.push({
                ...data,
                count: parent?.values[0]?.value?.like
                  ? parent?.values[0]?.value?.like
                  : 0,
              });
            } else if (data?.name === 'love') {
              mergingFbReaction.push({
                ...data,
                count: parent?.values[0]?.value?.love
                  ? parent?.values[0]?.value?.love
                  : 0,
              });
            } else if (data?.name === 'haha') {
              mergingFbReaction.push({
                ...data,
                count: parent?.values[0]?.value?.haha
                  ? parent?.values[0]?.value?.haha
                  : 0,
              });
            } else if (data?.name === 'wow') {
              mergingFbReaction.push({
                ...data,
                count: parent?.values[0]?.value?.wow
                  ? parent?.values[0]?.value?.wow
                  : 0,
              });
            } else if (data?.name === 'anger') {
              mergingFbReaction.push({
                ...data,
                count: parent?.values[0]?.value?.anger
                  ? parent?.values[0]?.value?.anger
                  : 0,
              });
            } else if (data?.name === 'sorry') {
              mergingFbReaction.push({
                ...data,
                count: parent?.values[0]?.value?.sorry
                  ? parent?.values[0]?.value?.sorry
                  : 0,
              });
            }
          });
      });

      setFacebookReaction(mergingFbReaction);
    } else if (postData?.platform_type === 'Instagram') {
      ReactionBox?.map(parent => {
        postAction?.socialMedialIntegration?.postActions?.data?.map(child => {
          if (parent.boxType === child.name) {
            merging.push({ ...parent, apiData: child });
          }
        });
      });

      if (postData?.response_message?.post_type === 'REEL') {
        InstagramReels?.map(parent => {
          postAction?.socialMedialIntegration?.postActions?.data?.map(child => {
            if (parent.name === child.name) {
              mergingPostDeatils.push({ ...parent, apiData: child });
            }
          });
        });
      } else {
        InstagramPost?.map(parent => {
          postAction?.socialMedialIntegration?.postActions?.data?.map(child => {
            if (parent.name == child.name) {
              mergingPostDeatils.push({ ...parent, apiData: child });
            }
          });
        });
      }
    }
    setPostReaction(merging);
    setPostDetails(mergingPostDeatils);
  };
  const reactionCount = item => {
    if (postData?.platform_type === 'Facebook') {
      if (item?.boxType === 'likes') {
        return <>{item?.fbIcon}</>;
      } else {
        return <>{item?.icon}</>;
      }
    } else if (postData?.platform_type === 'Instagram') {
      return <>{item?.icon}</>;
    }
  };
  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };
  return (
    <MainWrapper>
      <Heading>
        {postData?.response_message?.post_type === 'POST'
          ? 'Post Insights'
          : 'Reels Insights'}
      </Heading>
      <Divider
        className="divider"
        style={{
          height: '1px ',
          background: '#F4F4F5',
          width: '100%',
          margin: '15px 0px',
        }}
      />
      <Spin spinning={loading}>
        <Body>
          <Wrapper>
            <Flex spaceBetween>
              {postData?.platform_type === 'Facebook'
                ? postReaction?.map(item => (
                    <div className="postReaction" key={item?.id}>
                      <div>{reactionCount(item)}</div>
                      {item?.count}
                    </div>
                  ))
                : postReaction?.map(item => (
                    <div className="postReaction" key={item?.id}>
                      <div>{item?.icon}</div>
                      {item?.apiData?.values[0]?.value}
                    </div>
                  ))}
            </Flex>
            <Divider className="divider" />
            {postData?.platform_type === 'Facebook' &&
            postData?.response_message?.post_type === 'REEL' ? (
              <>
                <Flex spaceBetween>
                  {postDetails?.slice(0, 2).map(item => {
                    let count = formatCash(item?.count);
                    return (
                      <Box
                        key={item?.id}
                        style={{ background: item?.backgroundColor }}
                      >
                        <img src={item?.icon} width={40} height={40} />
                        <Count>{count}</Count>
                        <BoxName>{item?.boxType}</BoxName>
                      </Box>
                    );
                  })}
                </Flex>
                <Flex spaceBetween>
                  {postDetails?.slice(2).map(item => {
                    let count = formatCash(item?.count);
                    return (
                      <Box
                        key={item?.id}
                        style={{ background: item?.backgroundColor }}
                      >
                        <img src={item?.icon} width={40} height={40} />
                        <Count>{count}</Count>
                        <BoxName>{item?.boxType}</BoxName>
                      </Box>
                    );
                  })}
                </Flex>
              </>
            ) : (
              <>
                <Flex spaceBetween>
                  {postDetails?.slice(0, 2).map(item => {
                    let count = formatCash(item?.apiData?.values[0]?.value);
                    return (
                      <Box
                        key={item?.id}
                        style={{ background: item?.backgroundColor }}
                      >
                        <img src={item?.icon} width={40} height={40} />
                        <Count>{count}</Count>
                        <BoxName>{item?.boxType}</BoxName>
                      </Box>
                    );
                  })}
                </Flex>
                <Flex spaceBetween>
                  {postDetails?.slice(2).map(item => {
                    let count = formatCash(item?.apiData?.values[0]?.value);
                    return (
                      <Box
                        key={item?.id}
                        style={{ background: item?.backgroundColor }}
                      >
                        <img src={item?.icon} width={40} height={40} />
                        <Count>{count}</Count>
                        <BoxName>{item?.boxType}</BoxName>
                      </Box>
                    );
                  })}
                </Flex>
              </>
            )}
            {postData?.platform_type === 'Facebook' ? (
              postData?.response_message?.post_type === 'REEL' ? (
                <FotterBox>
                  <Flex>
                    <Col span={4}>
                      <img
                        src={Postimpressions}
                        width={40}
                        height={40}
                        className="fotterImg"
                      />
                    </Col>
                    <Col span={12}>
                      <Text>Post impressions</Text>
                    </Col>
                    <Col span={8}>
                      <div className="TotalCount">
                        {postAction?.socialMedialIntegration?.postActions?.data?.map(
                          item =>
                            item?.name == 'post_impressions_unique'
                              ? item?.values[0]?.value
                              : ''
                        )}
                      </div>
                    </Col>
                  </Flex>
                </FotterBox>
              ) : (
                <>
                  <Divider className="dividerWithoutMargin" />
                  <Flex center>
                    {' '}
                    <Text className="iteractions">Interactions</Text>
                  </Flex>
                  <Flex spaceBetween>
                    {facebookReaction?.map(item => (
                      <div className="postReaction" key={item?.id}>
                        <img
                          src={item?.icon}
                          width={23}
                          height={23}
                          className="img"
                        />
                        {item?.count}
                      </div>
                    ))}
                  </Flex>
                </>
              )
            ) : (
              postImpressions?.values && (
                <FotterBox>
                  <Flex>
                    <Col span={4}>
                      <img
                        src={Postimpressions}
                        width={40}
                        height={40}
                        className="fotterImg"
                      />
                    </Col>
                    <Col span={12}>
                      <Text>Post impressions</Text>
                    </Col>
                    <Col span={8}>
                      <div className="TotalCount">
                        {postImpressions?.values &&
                          postImpressions?.values[0]?.value}
                      </div>
                    </Col>
                  </Flex>
                </FotterBox>
              )
            )}
          </Wrapper>
        </Body>
      </Spin>
    </MainWrapper>
  );
};

const FbBox = [
  {
    id: 1,
    boxType: 'Post reach',
    icon: Engagementrate,
    backgroundColor: '#C9DFFC',
    name: 'post_impressions_unique',
  },
  {
    id: 2,
    boxType: 'Engagement rate',
    icon: Followers,
    backgroundColor: '#FEEDDA',
    name: 'post_engaged_users',
  },
  {
    id: 3,
    boxType: 'Clicks',
    icon: InsightsLike,
    backgroundColor: '#DDFCEA',
    name: 'post_clicks',
  },
  {
    id: 4,
    boxType: 'Impressions',
    icon: Impression,
    backgroundColor: '#96E4FA',
    name: 'post_impressions',
  },
];

const FacebookReel = [
  {
    id: 1,
    boxType: 'View',
    icon: Postreach,
    backgroundColor: '#C9DFFC',
    name: 'blue_reels_play_count',
  },
  {
    id: 2,
    boxType: 'Engagement rate',
    icon: Engagementrate,
    backgroundColor: '#FEEDDA',
    name: 'post_video_social_actions',
  },
  {
    id: 3,
    boxType: 'Clicks',
    icon: InsightsLike,
    backgroundColor: '#DDFCEA',
    name: 'post_video_likes_by_reaction_type',
  },
  {
    id: 4,
    boxType: 'Avg. watch time',
    icon: Followers,
    backgroundColor: '#96E4FA',
    name: 'post_video_avg_time_watched',
  },
];
const InstagramReels = [
  {
    id: 1,
    boxType: 'View',
    icon: Postreach,
    backgroundColor: '#C9DFFC',
    name: 'video_views',
  },
  {
    id: 2,
    boxType: 'Engagement rate',
    icon: Engagementrate,
    backgroundColor: '#FEEDDA',
    name: 'engagement',
  },
  {
    id: 3,
    boxType: 'Profile visits',
    icon: Profilevisits,
    backgroundColor: '#DDFCEA',
    name: 'profile_visits',
  },
  {
    id: 4,
    boxType: 'Followers',
    icon: Followers,
    backgroundColor: '#F9E0E2',
    name: 'follows',
  },
];

const InstagramPost = [
  {
    id: 1,
    boxType: 'Post reach',
    icon: Postreach,
    backgroundColor: '#C9DFFC',
    name: 'reach',
  },
  {
    id: 2,
    boxType: 'Engagement rate',
    icon: Engagementrate,
    backgroundColor: '#FEEDDA',
    name: 'engagement',
  },
  {
    id: 3,
    boxType: 'Profile visits',
    icon: Profilevisits,
    backgroundColor: '#DDFCEA',
    name: 'profile_visits',
  },
  {
    id: 4,
    boxType: 'Followers',
    icon: Followers,
    backgroundColor: '#F9E0E2',
    name: 'follows',
  },
];

const ReactionBox = [
  {
    id: 1,
    boxType: 'likes',
    icon: <InstHeart />,
    fbIcon: <InsightsFbLike />,
  },
  {
    id: 2,
    boxType: 'comments',
    icon: <InstComment />,
  },
  {
    id: 3,
    boxType: 'shares',
    icon: <InstShare />,
  },
  {
    id: 4,
    boxType: 'saved',
    icon: <InstSave />,
  },
];

const Interactions = [
  {
    id: 1,
    name: 'like',
    icon: InsightsFbLikeInteraction,
  },
  {
    id: 2,
    name: 'wow',
    icon: InsightsFbWow,
  },
  {
    id: 3,
    name: 'haha',
    icon: InsightsFbHaha,
  },
  {
    id: 4,
    name: 'anger',
    icon: InsightsFbAngry,
  },
  {
    id: 5,
    name: 'love',
    icon: InsightsFbLove,
  },
  {
    id: 6,
    name: 'care',
    icon: InsightsFbCare,
  },
  {
    id: 7,
    name: 'sorry',
    icon: InsightsFbSad,
  },
];
export default InSights;
