import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography, Card, message } from 'antd';
import Flex from '@components/common/Flex';
import {
  Modal_body,
  ModalContentBox,
  ErrorContent,NoListText,
} from './Integration.styles';
import NoListFound from '@components/icons/NoListFound';
import FbAdds from '../../../components/icons/FbAdds';
import styled from 'styled-components';
import {
  whatsappAuthenticationStepTwo,
  fetchFbAccountsList,
  AdSaveOption,
} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Text = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: ${props => (props?.cont ? '400' : '700')};
  font-size: ${props => (props?.cont ? '14px' : '16px')};
  color: ${props => (props?.cont ? '#4D4D4D' : '#181818')};
  margin: ${props => props?.cont && '10px 0px 30px 0px'};
`;

const BodyCard = styled(Card)`
  .ant-card-body {
    padding: 10px;
  }
  height: 50px;
  background: #ffffff;
  border: 1px solid #f4f4f5;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const SelectButton = styled(Button)`
width: 73px;
height: 26px;
font-weight: 700;
font-size: ${props => (props?.buttonType ? '16px' : '12px')};
background:#FFFFFF;
border:${props => (props?.buttonType ? 'none' : '1px solid #4AACEA')};
color:${props => (props?.buttonType ? '#999999' : '#4AACEA')};
border-radius: 5px;
&:hover{
  background:#FFFFFF;
  color:${props => (props?.buttonType ? '#999999' : '#4AACEA')};
}
&.btn-active {
background:${props => props?.buttonType && 'FFFFFF'};
color:${props => props?.buttonType && '#999999'};
}
}
`;

const FbBusinessPopover = ({ fbAccountsList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountClick, setAccountClick] = useState(false);
  const [next, setNext] = useState(false);
  const [businessId, setBusinessId] = useState({});
  const [account, setAccount] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [back, setBack] = useState(false);
  const [accessToken, setToken] = useState();
  const [state, setState] = useState();
  const [bsList, setBusinessList] = useState([]);

  const navigate = useNavigate();
  const businessList = useSelector(
    state => state.integrationSelector.fbBusinessList
  );
  useEffect(() => {
    let datahandle = [];
    businessList?.length > 0 &&
      businessList?.map(data => {
        datahandle.push({ ...data, isActive: false });
      });
    setBusinessList(datahandle);
  }, [businessList]);

  const dispatch = useDispatch();
  useEffect(() => {
    setIsModalOpen(true);
    setNext(false);
    const windowLink = window.location.href;
    let accessToken =null;
    let tokenState = null;
    const trim = windowLink?.split('#');
    trim[1]?.split('&').map(item => {
      if (item.split('=')[0] == 'access_token') {
        accessToken = item.split('=')[1];
      } else if (item.split('=')[0] == 'state') {
        tokenState = item.split('=')[1];
      }
    });
    setToken(accessToken);
    setState(tokenState);
    dispatch(whatsappAuthenticationStepTwo(accessToken));
  }, []);

  const submitDetails = () => {
    if (account === undefined) {
      setIsModalOpen(true);
      messageApi.open({
        type: 'error',
        content: 'Please selected Ad Account',
      });
    } else {
      const params = {
        access_token: accessToken,
        business_id: businessId?.id,
        ad_account_id: account?.account_id,
        ad_account_name: account?.name,
        business_account_name: businessId?.name,
      };
      dispatch(AdSaveOption(params, state, navigate));
      setIsModalOpen(false);
    }
  };
  const activeState=bsList?.filter(data=>data?.id===businessId?.id)
 
  const footerContent = (
    <div>
      {!next ? (
        <div>
          <SelectButton
            buttonType="cancel"
            className="btn-active"
            style={{ margin: '0px 10px 0px 0px' }}
            onClick={() => {
              setIsModalOpen(false);
              navigate('/integration');
            }}
          >
            Cancel
          </SelectButton>

          <Button
            type="primary"
            style={{ fontWeight: '700' }}
            onClick={() => {
              if (Object.keys(businessId).length===0 || !activeState[0]?.isActive) {
                setNext(false);
                messageApi.open({
                  type: 'error',
                  content: 'Please selected Business Account',
                });
              } else {
                setNext(true);
                dispatch(fetchFbAccountsList(accessToken, businessId?.id));
              }
            }}
          >
            Next
          </Button>
          {contextHolder}
        </div>
      ) : (
        <div>
          <SelectButton
            buttonType="cancel"
            className="btn-active"
            style={{ marginRight: '10px' }}
            onClick={() => {
              setBack(true);
              setNext(false);
            }}
          >
            Back
          </SelectButton>
          <Button
            type="primary"
            style={{ fontWeight: '700' }}
            onClick={() => submitDetails()}
          >
            Done
          </Button>
          {contextHolder}
        </div>
      )}
    </div>
  );

  const handleButtonClick = val => {
    setBusinessId(val)
    setBusinessList(prevState => {
      const newState = prevState.map(data => {
        if (data?.id === val?.id) {
          if (data.isActive) {
            return { ...data, isActive: false };
          } else {
            return { ...data, isActive: true };
          }
        } else {
          return data;
        }
      });
      return newState;
    }); 
  };
  const handleAccount = data => {
    setAccountClick(!accountClick);
    setAccount(data);
  };

  return (
    <Modal
      open={isModalOpen}
      centered={true}
      footer={businessList?.length>0 &&footerContent}
      onCancel={() => {
        setIsModalOpen(false);
        navigate("/integration")
      }}
    >
      <ModalContentBox>
        <Flex>
          <FbAdds />
          <Text style={{ margin: '5px 0px 0px 3px' }}>Facebook Ads</Text>
        </Flex>
        <Text cont={'subContent'}>{`Select the ${
          next ? 'Add' : 'Business'
        } account you would like to connect with this brand. `}</Text>
      </ModalContentBox>
      <Modal_body>
        {businessList?.length>0?
        <>
        {next ? (
          <>
            {fbAccountsList?.owned_ad_accounts?.data?.length > 0 &&
              fbAccountsList?.owned_ad_accounts?.data?.map(val => {
                return (
                  <BodyCard key={val?.id}>
                    <Flex spaceBetween>
                      <Typography>{val?.name}</Typography>
                      <SelectButton
                        type= 'primary'
                        active={accountClick}
                        onClick={() => handleAccount(val)}
                      >
                        Select
                      </SelectButton>
                    </Flex>
                  </BodyCard>
                );
              })}
          </>
        ) : (
          <>
            {bsList?.length > 0 &&
              bsList?.map(data => {
                return (
                  <BodyCard key={data?.id}>
                    <Flex spaceBetween>
                      <Text>{data?.name}</Text>
                      <SelectButton
                        style={{
                          background: data?.isActive && '#4AACEA',
                          color:data?.isActive && '#FFFFFF'
                        }}
                        onClick={() => {
                          handleButtonClick(data);
                        }}
                      >
                        Select
                      </SelectButton>
                    </Flex>
                  </BodyCard>
                );
              })}
          </>
        )}
        </>:
        <ErrorContent>
        <NoListFound />
        <NoListText style={{ margin: "15px 0" }}>No List Found</NoListText>
        <Button
            type="primary"
            style={{
                borderRadius: '5px',
                fontWeight: 600,
                width: " 129px",
                height: "60px !important",
                margin: "15px 0",
                fontWeight: 700,
                fontSize: "16px",
            }}
            onClick={() => window.open("https://www.facebook.com/", "_blank")}
        >
            Create
        </Button>
        <Button
            type="primary"
            style={{
                background: "#FFFFFF",
                borderRadius: '5px',
                fontWeight: 600,
                width: " 98px",
                height: "32px !important",
                margin: "15px 0 ",
                border: "none",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#999999",
            }}
            onClick={() => navigate('/integration')}
        >
            <ArrowLeftOutlined /> Back
        </Button>
    </ErrorContent>}
      </Modal_body>
    </Modal>
  );
};

export default FbBusinessPopover;
