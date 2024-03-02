import React, { useEffect, useState } from 'react';
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
import { Modal, Button, Spin } from 'antd';
import WarningIcon from '@components/icons/WarningIcon';
import NoListFound from '@components/icons/NoListFound';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@components/icons/FacebookIcon';
import { notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getSocialMediaList } from '../actions';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import Flex from '@components/common/Flex';

const Popup = ({ savePage, getPageList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageList, setPageList] = useState({});
  const [unLock, setUnLock] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
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
      setPageList(data?.data);
      setLoading(false);
    });
  }, []);

  const errorNotification = (placement, value, error) => {
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

  const confirm = async value => {
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
        dispatch(getSocialMediaList());
        successNotification('topRight', value.name, 'Successfully Connected');
      })
      .catch(error => {
        errorNotification('topRight', value.name, data?.response?.data?.error);
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
        <ModalContentBox>Facebook Pages List</ModalContentBox>
        <Modal_body>
          {contextHolder}
          {pageList?.page_list?.length > 0 ? (
            pageList?.page_list?.map((data, index) => (
              <CardListBox key={index}>
                <div
                  className="content"
                  onMouseEnter={() => setUnLock(data?.id)}
                >
                  <div className="icon">
                    <FacebookIcon />
                  </div>
                  <div>
                    <div className="text">{data?.name}</div>
                    <div className="description">{data?.id}</div>
                  </div>
                </div>
                {unLock == data?.id && (
                  <div className="button">
                    {' '}
                    <ConfirmButton onClick={() => confirm(data)}>
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
                    'https://www.facebook.com/pages/creation?ref_type=launch_point',
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
export default Popup;
