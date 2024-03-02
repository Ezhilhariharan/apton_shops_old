import { Button, Col, Divider, Row, Typography, Modal } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import CreateCapModal from './CreateCapModal';
import { deleteCampaign } from '../../actions';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

const Title = styled(Typography.Text)`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 22px;
  color: #000000;
`;

const Wrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;
export const AllStatusButton = styled(Button)`
  margin-right: 30px;
`;

const TextStyle = styled('div')`
  font-weight: 700;
  font-size: 17px;
  line-height: 19px;
  color: #4d4d4d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const WrapperModal = styled('div')`
  .ant-divider-horizontal {
    margin: 15px 0px;
  }
  .Cancel {
    color: #999999;
    margin-right: 15px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #999999;
  }
  .Create {
    color: white;
    border-radius: 5px;
    background-color: #4aacea;
  }
  .fotter {
    height: 20px;
  }
`;
const PostButton = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  .infoText {
    color: #999999;
    font-size: 12px;
    margin-top: 7px;
    display: flex;
    margin-right: 20px;
  }
`;

const Filters = ({
  selectedWhatsAppCampagin,
  updateSelectedCampagin,
  campaginCount,
  whatsAppConnectStatus,
  selectionType,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Wrapper>
      <Row>
        <Col span={24}>
          <Flex end>
            {campaginCount > 0 &&
              (selectionType?.length === 0 ? (
                <CreateCapModal
                  whatsAppConnectStatus={whatsAppConnectStatus}
                  selectedWhatsAppCampagin={selectedWhatsAppCampagin}
                  updateSelectedCampagin={updateSelectedCampagin}
                />
              ) : (
                <Button
                  type="primary"
                  ghost
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'white',
                    backgroundColor: '#4aacea',
                    height: '40px',
                  }}
                >
                  Delete Campaign
                </Button>
              ))}
          </Flex>
        </Col>
      </Row>
      {/* <Divider /> */}
      <Modal
        open={isModalOpen}
        onCancel={e => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
        footer={null}
        centered
      >
        <WrapperModal>
          <TextStyle>
            Deleting the campaign leads to erasing all of its data. Would you
            like to delete it?
          </TextStyle>
          <PostButton>
            <Button
              type="primary"
              className="Cancel"
              onClick={() => {
                dispatch(deleteCampaign(selectionType)), setIsModalOpen(false);
              }}
            >
              yes
            </Button>
            <Button type="primary" onClick={() => setIsModalOpen(false)}>
              no
            </Button>
          </PostButton>
          <div className="fotter"></div>
        </WrapperModal>
      </Modal>
    </Wrapper>
  );
};

export default Filters;
