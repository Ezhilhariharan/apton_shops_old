import React, { useEffect, useState, useMemo } from 'react';
import {
  ModalContentBox,
  CardListBox,
  Modal_body,
  ErrorContent,
  NoListText,
  ConfirmButton,
  Notification,
  NotificationHeader,
} from './Integration.styles';
import { Modal } from 'antd';
import WarningIcon from '@components/icons/WarningIcon';
import InstagramIcon from '@components/icons/InstagramIcon';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, notification, Space, Text } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import NoListFound from '@components/icons/NoListFound';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import Flex from '@components/common/Flex';

const InstagramPopOver = ({ savePage, getPageList }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageList, setPageList] = useState([]);
  const [unLock, setUnLock] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
    setLoading(true);
    const windowLink = window.location.href;
    let accessToken = '';
    let state = '';
    const trim = windowLink?.split('#');
    trim[1]?.split('&').map(item => {
      if (item.split('=')[0] == 'access_token') {
        accessToken = item.split('=')[1];
        console.log(item.split('=')[1]);
      } else if (item.split('=')[0] == 'state') {
        state = item.split('=')[1];
      }
    });

    getPageList(accessToken, state, setLoading).then(data => {
      setLoading(false);
      setPageList(data?.data);
    });
  }, []);

  const openNotification = (placement, value, error) => {
    api.info({
      description: (
        <div>
          <NotificationHeader>{`${value}`}</NotificationHeader>
          <Notification>{`${error}`}</Notification>
        </div>
      ),
      placement,
      style: {
        width: 400,
        backgroundColor: 'white',
        border: 'none',
      },
      icon: <WarningIcon />,
      duration: 6,
    });
  };

  const successNotification = (placement, value, error) => {
    api.info({
      description: (
        <div>
          <NotificationHeader>{`${value}`}</NotificationHeader>
          <Notification>{`${error}`}</Notification>
        </div>
      ),
      placement,
      style: {
        width: 400,
        backgroundColor: 'white',
        border: 'none',
      },
      duration: 6,
    });
  };

  const goBack = async value => {
    const body = {
      account_id: pageList?.account_id,
      brand_id: pageList?.brand_id,
      page_id: value.id,
      connection_name: pageList?.connection_name,
      page_name: value.name,
      reference_url: pageList?.reference_url,
    };
    savePage(body)
      .then(data => {
        window.location.href = data?.data?.url;
        successNotification('topRight', value.name, 'Successfully Connected');
      })
      .catch(data => {
        openNotification('topRight', value.name, data?.response?.data?.error);
      });
  };
  return (
    <Modal
      open={isModalOpen}
      centered={true}
      closeIcon={<CloseOutlined onClick={() => navigate('/integration')} />}
      footer={null}
    >
      <div>
        <ModalContentBox>Instagram List</ModalContentBox>
        <Modal_body>
          {contextHolder}
          {pageList?.page_list?.length > 0 ? (
            pageList?.page_list?.map((data, index) => (
              <CardListBox key={index}>
                <div className="content" onClick={() => setUnLock(data?.id)}>
                  <div className="icon">
                    <InstagramIcon />
                  </div>
                  <div>
                    <div className="text">{data?.name}</div>
                    <div className="description">{data?.id}</div>
                  </div>
                </div>
                {unLock == data?.id && (
                  <div className="button">
                    {' '}
                    <ConfirmButton onClick={() => goBack(data)}>
                      Confirm
                    </ConfirmButton>
                  </div>
                )}
              </CardListBox>
            ))
          ) : isLoading ? (
            <Flex center>
              <LoadingOutlined style={{ fontSize: 100 }} spin />
            </Flex>
          ) : (
            <ErrorContent>
              <NoListFound />
              <NoListText style={{ margin: '15px 0' }}>
                No List Found
              </NoListText>
              <Button
                type="primary"
                style={{
                  borderRadius: '5px',
                  fontWeight: 600,
                  width: ' 129px',
                  height: '60px !important',
                  margin: '15px 0',
                  fontWeight: 700,
                  fontSize: '16px',
                }}
                onClick={() =>
                  window.open(
                    'https://www.instagram.com/accounts/login/',
                    '_blank'
                  )
                }
              >
                Create
              </Button>
              <Button
                type="primary"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '5px',
                  fontWeight: 600,
                  width: ' 98px',
                  height: '32px !important',
                  margin: '15px 0 ',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: '#999999',
                }}
                onClick={() => navigate('/integration')}
              >
                <ArrowLeftOutlined /> Back
              </Button>
            </ErrorContent>
          )}
        </Modal_body>
      </div>
    </Modal>
  );
};
export default InstagramPopOver;
