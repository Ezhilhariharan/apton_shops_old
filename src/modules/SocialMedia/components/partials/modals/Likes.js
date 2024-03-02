import React, { useEffect, useState } from 'react';
import { Divider, Typography, Row, Spin, Radio, Tabs, Switch, Card, Image } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Flex from '@components/common/Flex';
import FbLike from '@components/icons/FbLike';
import FbLove from '@components/icons/FbLove';
import FbAngry from '@components/icons/FbAngry';
import FbWow from '@components/icons/FbWow';
import FbHaha from '@components/icons/FbHaha';
import FbSad from '@components/icons/FbSad';

import linkdinAppricate from '@assets/images/linkdinAppricate.png';
import linkdinFun from '@assets/images/linkdinFun.png';
import linkdinHeart from '@assets/images/linkdinHeart.png';
import linkdinLight from '@assets/images/linkdinLight.png';
import linkdinLike from '@assets/images/linkdinLike.png';

import FbCare from '@assets/images/insightsFbCare.png';

const MainWrapper = styled("div")`
.divider{
  height: 1px ;
  background: #F4F4F5;
  width: 100%;
  margin: 15px 0px;
}
.fotter{
  height:20px;
}
`;
const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color:#4D4D4D;
`;
const Content = styled("div")`
display:flex;
margin:15px 0;
font-weight: 600;
font-size: 16px;
color: #4D4D4D;
.userName{
  color: #4AACEA;
  margin-Right:10px;
  margin-Left:10px;
  margin-top:5px;
};
.Text{  
  margin-top:5px;
};
.image{
  border-radius:50%;
  margin-right:10px;
  margin-left:10px;
  margin-bottom:10px;
}
.likeProfile{
  position: relative;
 .reactions{
  position: absolute;
  background: transparent;
  bottom: -1px;
  left: 26px;
 };
}
`;
const Wrapper = styled("div")`
width:100%;
height:500px;
overflow:scroll;
`;
const Likes = ({ postData }) => {
  const postAction = useSelector((state) => state?.socialMedialIntegration?.postActions, shallowEqual)
  const [Likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (postData?.platform_type == "Linkedin Pages") {
      if (postAction?.hasOwnProperty("reactionSummaries")) {
        setLikes(postAction?.reactionSummaries)
        setLoading(false)
      }
    } else {
      if (postAction?.hasOwnProperty("data")) {
        setLoading(false)
        setLikes(postAction)
      }
    }
  }, [postAction])
  return (
    <MainWrapper>
      <Heading>Liked by</Heading>
      <Divider className="divider" />
      <Spin spinning={loading}>
        <Wrapper>
          {
            postData?.platform_type === "Linkedin Pages" ?
              <>
                {Likes?.APPRECIATION &&
                  <Content>
                    <img src={linkdinAppricate} alt="Lightence" width={30} height={30} className="image" />
                    <span className="Text">{Likes?.APPRECIATION?.count} people </span>
                    <span className='userName'>{" "}Appreciated</span>
                    <span className="Text">in your post</span> </Content>}
                {Likes?.LIKE &&
                  <Content>
                    <img src={linkdinLike} alt="Lightence" width={30} height={30} className="image" />
                    <span className="Text">{Likes?.LIKE?.count} people </span>
                    <span className='userName'>{" "}Liked</span>
                    <span className="Text">in your post</span> </Content>}
                {Likes?.EMPATHY &&
                  <Content>
                    <img src={linkdinHeart} alt="Lightence" width={30} height={30} className="image" />
                    <span className="Text">{Likes?.EMPATHY?.count} people </span>
                    <span className='userName'>{" "}Loved</span>
                    <span className="Text">in your post</span> </Content>}
                {Likes?.INTEREST &&
                  <Content>
                    <img src={linkdinLight} alt="Lightence" width={30} height={30} className="image" />
                    <span className="Text">{Likes?.INTEREST?.count} people </span>
                    <span className='userName'>{" "}Interested</span>
                    <span className="Text">in your post</span> </Content>}
                {Likes?.ENTERTAINMENT &&
                  <Content>
                    <img src={linkdinFun} alt="Lightence" width={30} height={30} className="image" />
                    <span className="Text">{Likes?.ENTERTAINMENT?.count} people </span>
                    <span className='userName'>{" "}Funny</span>
                    <span className="Text">in your post</span> </Content>}
              </>
              :
              Likes?.data?.length > 0 ?
                Likes?.data?.map(item => (
                  <Content>
                    <span className="likeProfile">
                      <img src={item?.pic_small} alt="Lightence" width={30} height={30} className="image" />
                      <span className="reactions">
                        {item?.type === "LOVE" && <FbLove />}
                        {item?.type === "HAHA" && <FbHaha />}
                        {item?.type === "LIKE" && <FbLike />}
                        {item?.type === "WOW" && <FbWow />}
                        {item?.type === "SAD" && <FbSad />}
                        {item?.type === "ANGRY" && <FbAngry />}
                        {item?.type === "CARE" && <img src={FbCare} alt="Lightence" width={18} height={18} />}
                      </span>
                    </span>
                    <span className='userName'>{item?.name}</span>
                    <span className="Text">{item?.type === "LIKE" ? "liked" : "reacted"} your post</span></Content>
                ))
                :
                <Flex center className="fotter">No Likes</Flex>
          }
        </Wrapper>
      </Spin>
    </MainWrapper>
  )
}

export default Likes;