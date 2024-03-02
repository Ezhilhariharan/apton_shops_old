import React from 'react';
import { Button, Card, Typography, Row, Col } from 'antd';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { LeftSquareOutlined, RightSquareOutlined } from '@ant-design/icons';

const Box = styled.div`
  .title {
    font-weight: 700;
    font-size: 1.125rem;
    padding: 20px;
    color: #181818;
  }
  .icon {
    margin-right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  .heading {
    font-weight: 700;
    font-size: 1.125rem;
    color: #181818;
  }
  .description {
    width: 100%;
    font-weight: 500;
    font-size: 0.875rem;
    color: #4d4d4d;
    margin: 15px 0px;
    //width:220px;
  }
`;
const Cards = styled(Card)`
  width: 93%;
  height: auto;
  .ant-card-body {
    padding: 20px;
  }
  border-radius: 10px !important;
`;
const VideoButton = styled(Button)`
  margin: 15px 0px;
  background: linear-gradient(94.99deg, #bdbdbd 0.82%, #d9d9d9 100%);
  border-radius: 5px;
  color: white;
  &:hover {
    background: linear-gradient(94.99deg, #bdbdbd 0.82%, #d9d9d9 100%);
    border-radius: 5px;
    color: white;
    border: none;
  }
  &.btn-active {
    background: linear-gradient(94.99deg, #bdbdbd 0.82%, #d9d9d9 100%);
    border-radius: 5px;
    color: white;
    border: none;
  }
`;
const RecomendedVideos = () => {
  return (
    <Box>
      <Flex spaceBetween>
        <span className="title">Recommended for you</span>
        {/* <div>
          <LeftSquareOutlined className="icon" />
          <RightSquareOutlined className="icon" />
        </div> */}
      </Flex>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {videoContent?.map(content => {
          return (
            <Col span={8}>
              {/* <Card style={{ borderRadius: '10px' }}>
                <Flex>
                  <video
                    width="300"
                    height="160"
                    src={content?.src}
                    autoPlay='autoPlay'
                    loop
                    muted
                    style={{ padding: '10px' }}
                  />
                </Flex>
                <span className="heading">{content?.title}</span>
                <p className="description">{content?.description}</p>
                <Flex center>
                  <VideoButton className="btn-active">Know More</VideoButton>
                </Flex>
              </Card> */}
              <Cards style={{ border: 'none' }}>
                <video
                  width="100%"
                  src={content?.src}
                  autoPlay="autoPlay"
                  loop
                  muted
                  style={{ borderRadius: '10px' }}
                />
                <p className="description"></p>
                <span className="heading">{content?.title}</span>
                <p className="description">{content?.description}</p>
                <Flex center>
                  <VideoButton className="btn-active">Know More</VideoButton>
                </Flex>
              </Cards>
            </Col>
          );
        })}
      </Row>
    </Box>
  );
};

const videoContent = [
  {
    id: 1,
    title: 'Integrating WhatsApp Business...',
    description:
      'A step by Step simple guide for connecting your WhatsApp cloud API to AptonShops for seamless broadcasting messages, triggers, chatbots and surveys.',
    src: 'https://storage.googleapis.com/asp-pprd-images-bucket/ASPVIDEO/whatsappconfig.mp4',
  },
  {
    id: 2,
    title: 'Integrating WhatsApp Business...',
    description:
      'A step by Step simple guide for connecting your WhatsApp cloud API to AptonShops for seamless broadcasting messages, triggers, chatbots and surveys.',
    src: 'https://storage.googleapis.com/asp-pprd-images-bucket/ASPVIDEO/whatsappconfig.mp4',
  },
  {
    id: 3,
    title: 'Integrating WhatsApp Business...',
    description:
      'A step by Step simple guide for connecting your WhatsApp cloud API to AptonShops for seamless broadcasting messages, triggers, chatbots and surveys.',
    src: 'https://storage.googleapis.com/asp-pprd-images-bucket/ASPVIDEO/whatsappconfig.mp4',
  },
];
export default RecomendedVideos;
