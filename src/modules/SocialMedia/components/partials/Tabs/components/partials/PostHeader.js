import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { Tooltip, Row, Typography } from 'antd';
import { ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import moment from "moment";
//Social Icons
import FaceBook from '@assets/images/FBFlag.png';
import Instagram from '@assets/images/Instagram.png';
import FacebookGrp from '@assets/images/FBGroup.png';
import Linkedin from '@assets/images/LinkdinPage.svg';
import twitter from '@assets/images/twitter.png';
import Pinterest from '@assets/images/PinterestLogo.png'

const { Text } = Typography;

const LogoText = styled(Text)`
  width: 85px;
  height: 19px;
  left: 90px;
  top: 43px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #181818;
  padding: 30px 0px 0px 10px;
`;
const Header = styled(Flex)`
    width:100% ;
    .publishedDate{
        color: #4AACEA;
        margin-right: 5px;
        .clockIcon{
            margin-right: 5px; 
        }
    }
    .infoIcon{
        cursor: pointer;
        margin-top: 4px;
    }
`;

function PostHeader({ item, postDate ,tabType}) {
    const text = (date) => {
        return (
            <span>{date}</span>
        );
    }
    return (
        <Header spaceBetween >
            <Row >
                {item?.platform_type === "Facebook" && <img src={FaceBook} width={30} height={30} />}
                {item?.platform_type === "Instagram" && <img src={Instagram} width={30} height={30} />}
                {item?.platform_type === "Facebook Groups" && <img src={FacebookGrp} width={30} height={30} />}
                {item?.platform_type === "Linkedin Pages" && <img src={Linkedin} width={30} height={30} />}
                {item?.platform_type === "Twitter" && <img src={twitter} width={30} height={30} />}
                {item?.platform_type === "Pinterest" && <img src={Pinterest} width={30} height={30} />}
                <div style={{ marginTop: "5px" }}>
                    <LogoText>{item?.response_message?.page_name ? item?.response_message?.page_name:item?.response_message?.group_name ? item?.response_message?.group_name :
                        item?.platform_type === "Facebook" ? "FaceBook" :
                            item?.platform_type === "Instagram" ? "Instagram" :
                                item?.platform_type === "Facebook Groups" ? "Facebook Groups" :
                                    item?.platform_type === "Linkedin Pages" ? "Linkedin Pages" :
                                        item?.platform_type === "Pinterest" ? item?.response_message?.user_name? item?.response_message?.user_name:"Pinterest":
                                            item?.platform_type === "Twitter" ? "Twitter" : ""
                    }</LogoText>
                </div>
            </Row>
            <Row >
                <Text className='publishedDate'>
                    <ClockCircleOutlined className='clockIcon' />
                    {item?.post_date && moment(postDate).format('lll')}
                </Text>
                &nbsp;
                <Tooltip placement="bottom" title={text(tabType === "Scheduled" ?"Scheduled Time" :"Published Time")} >
                    <InfoCircleOutlined className='infoIcon' />
                </Tooltip>
            </Row>
        </Header>
    );
}

export default PostHeader;