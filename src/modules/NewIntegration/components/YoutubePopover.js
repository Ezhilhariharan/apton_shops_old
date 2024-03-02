import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import {
  Modal_body,
  ModalContentBox,
  CardListBox,
  ConfirmButton,
  ErrorContent,
  NoListText,
} from './Integration.styles';
import { useSelector, shallowEqual } from 'react-redux';
import YoutubeIcon from '../../../components/icons/YoutubeIcon';
import NoListFound from '@components/icons/NoListFound';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Buttons = styled(Button)`
font-weight: 700;
font-size: 16px;
border-radius:5px;
color:${props => (props.text ? '#999999' : '#4AACEA')};
&:hover {
 color: ${props => (props.text ? '#999999' : '#4AACEA')};
 background:${props => (props.text ? '#FFFFFF' : 'none')};
}
background:${props => (props.text ? '#FFFFFF' : 'none')};
border:${props => props.text && 'none'};
width:${props => (props.text ? '98px' : '129px')}
height:${props => (props.text ? '32px !important' : '60px !important')};
margin:15px 0;
`;

const YoutubePopover = ({ details, youtubeSave, CurentUser }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const { APP_MODE } = process.env;
  const submitDetails = data => {
    const params = {
      account_id: CurentUser?.account?.id,
      brand_id: brand?.id,
      connection_name: 'YouTube',
      channel_id: data?.id,
      title: data?.snippet?.title,
      description: data?.snippet?.description,
      custom_url: data?.snippet?.custom_url,
      reference_url:
        APP_MODE === 'Prod'
          ? 'https://app.aptonshops.com/integration'
          : 'https://app.preprod.aptonshops.com/integration',
    };
    youtubeSave(params, navigate);
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      centered={true}
      footer={null}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <ModalContentBox>YouTube Channels list</ModalContentBox>
      <Modal_body>
        {details?.length > 0 ? (
          details?.map((data, index) => (
            <CardListBox key={index}>
              <div className="content">
                <div className="icon">
                  <YoutubeIcon />
                </div>
                <div>
                  <div className="text">{data?.snippet?.title}</div>
                </div>
              </div>
              <div className="button">
                {' '}
                <ConfirmButton onClick={() => submitDetails(data)}>
                  Confirm
                </ConfirmButton>
              </div>
            </CardListBox>
          ))
        ) : (
          <ErrorContent>
            <NoListFound />
            <NoListText style={{ margin: '15px 0' }}>No List Found</NoListText>
            <Buttons
              type="primary"
              onClick={() => window.open('https://www.youtube.com/', '_blank')}
            >
              Create
            </Buttons>
            <Buttons
            text="back"
              type="primary"
              onClick={() => {
                navigate('/integration'), setIsModalOpen(false);
              }}
            >
              <ArrowLeftOutlined /> Back
            </Buttons>
          </ErrorContent>
        )}
      </Modal_body>
    </Modal>
  );
};

export default YoutubePopover;
