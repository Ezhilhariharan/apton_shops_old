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
import LinkdinIcon from '@components/icons/LinkdinIcon';
import NoListFound from '@components/icons/NoListFound';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../components/YoutubePopover';
import Flex from '@components/common/Flex';

const LinkedinPagesPopover = ({ CurentUser, details, linkedinPageSave }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unLock, setUnLock] = useState(null);
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
      connection_name: 'Linkedin Pages',
      reference_url:
        APP_MODE === 'Prod'
          ? 'https://app.aptonshops.com/integration'
          : 'https://app.preprod.aptonshops.com/integration',
      page_id: data?.id,
      page_name: data?.localizedName,
      vanity_name: data?.vanityName,
    };
    linkedinPageSave(params, navigate);
    setIsModalOpen(false);
  };
  const status = useSelector(state => state.integrationSelector.loadPageStatus);
  return (
    <Modal
      open={isModalOpen}
      centered={true}
      footer={null}
      onCancel={() => {
        setIsModalOpen(false);
        navigate('/integration');
      }}
    >
      <ModalContentBox>Linkedin Pages</ModalContentBox>
      <Modal_body>
        {details?.length > 0 ? (
          details?.map((data, index) => (
            <CardListBox key={index}>
              <div className="content" onMouseEnter={() => setUnLock(data?.id)}>
                <div className="icon">
                  <LinkdinIcon />
                </div>
                <div>
                  <div className="text" style={{ marginTop: '10px' }}>
                    {data?.localizedName}
                  </div>
                </div>
              </div>
              {unLock == data?.id && (
                <div className="button">
                  {' '}
                  <ConfirmButton onClick={() => submitDetails(data)}>
                    Confirm
                  </ConfirmButton>
                </div>
              )}
            </CardListBox>
          ))
        ) : status ? (
          <Flex center>
            <LoadingOutlined style={{ fontSize: 100 }} spin />
          </Flex>
        ) : (
          <ErrorContent>
            <NoListFound />
            <NoListText style={{ margin: '15px 0' }}>No List Found</NoListText>
            <Buttons
              type="primary"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/company/setup/new/',
                  '_blank'
                )
              }
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

export default LinkedinPagesPopover;
