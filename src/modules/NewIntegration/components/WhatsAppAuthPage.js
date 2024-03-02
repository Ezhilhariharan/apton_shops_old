import React, { Fragment, useEffect, useState } from 'react';
import { EmptyHeader } from '@components/common/EmptyHeader';
import { Spin, Card, Steps, Button } from 'antd';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import BusinessList from './partials/BusinessList';
import BusinessAccounts from './partials/BusinessAccounts';
import WhatsAppNumber from './partials/WhatsAppNumber';
import { useNavigate } from 'react-router-dom';
import WhatsAppConfig from './partials/WhatsAppConfig';

const CardTitile = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #4d4d4d;
`;
const Wrapper = styled.div`
  margin: 5rem;
`;
const CardWrapper = styled(Card)`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.15);
`;

const WhatsAppAuthPage = ({
  // state
  wpAccessToken,
  whatsAppBusinessList,
  whatsAppBusinessAccounts,
  whatsAppBusinessNumber,
  // actions
  updateAccessToken,
  whatsappAuthenticationStepTwo,
  whatsappAuthenticationStepThree,
  whatsappAuthenticationStepFour,
  saveWhatsAppAuth,
}) => {
  const [selectedBusinessList, setBusinessList] = useState([]);
  const [selectedBusinessAccount, setBusinessAccount] = useState([]);
  const [selectedPhoneNumber, setBusinessPhoneNumber] = useState([]);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const windowLink = window.location.href;
    let accessToken = '';
    let state = '';
    const trim = windowLink?.split('#');
    const connectionCanceled = windowLink?.split('&');
    if (connectionCanceled[1] === 'error_code=200') {
      navigate('/integration');
      setLoading(false);
    } else {
      trim[1]?.split('&').map(item => {
        if (item.split('=')[0] == 'access_token') {
          accessToken = item.split('=')[1];
        } else if (item.split('=')[0] == 'state') {
          state = item.split('=')[1];
        }
      });
      updateAccessToken({
        access_token: accessToken,
        wp_state: state,
      });
      if (accessToken) {
        setLoading(false);
        whatsappAuthenticationStepTwo(accessToken);
      }
    }
  }, []);

  useEffect(() => {
    if (steps === 1) {
      whatsappAuthenticationStepThree(selectedBusinessList, setLoading);
    }
    if (steps === 2) {
      whatsappAuthenticationStepFour(selectedBusinessAccount, setLoading);
    }
  }, [steps]);

  const connectWhatsAPP = () => {
    const accountDetails = whatsAppBusinessNumber.find(i => {
      return i.id === selectedPhoneNumber;
    });
    const businessAccount = whatsAppBusinessAccounts.find(i => {
      return i.id === selectedBusinessAccount;
    });
    const data = {
      access_token: wpAccessToken?.access_token,
      business_id: selectedBusinessList,
      business_account_id: businessAccount?.id,
      display_phone_number: accountDetails?.display_phone_number,
      code_verification_status: accountDetails?.code_verification_status,
      quality_rating: accountDetails?.quality_rating,
      verified_name: accountDetails?.verified_name,
      message_template_namespace: businessAccount?.message_template_namespace,
      phone_number_id: accountDetails?.id,
    };
    if (data) {
      saveWhatsAppAuth(data, setLoading);
    }
  };

  const items = [
    {
      title: '',
      description: 'Business List',
    },
    {
      title: '',
      description: 'Business Account',
    },
    {
      title: '',
      description: 'Account Phone Number',
    },
    {
      title: '',
      description: 'Configuration',
    },
  ];

  return (
    <Fragment>
      <EmptyHeader />

      <Wrapper>
        <CardWrapper>
          <Flex center>
            <CardTitile>Connecting WhatsApp Cloud API</CardTitile>
          </Flex>
          <Flex center style={{ margin: '3rem' }}>
            <Steps current={steps} labelPlacement="vertical" items={items} />
          </Flex>
          <div style={{ margin: '3rem' }}>
            <Spin size="large" spinning={loading}>
              {steps === 0 && (
                <BusinessList
                  businessAccount={whatsAppBusinessList}
                  selectedBusinessList={selectedBusinessList}
                  setBusinessList={setBusinessList}
                />
              )}
              {steps === 1 && (
                <BusinessAccounts
                  businessAccount={whatsAppBusinessAccounts}
                  selectedBusinessAccount={selectedBusinessAccount}
                  setBusinessAccount={setBusinessAccount}
                />
              )}
              {steps === 2 && (
                <WhatsAppNumber
                  businessAccount={whatsAppBusinessNumber}
                  selectedBusinessList={selectedPhoneNumber}
                  setBusinessList={setBusinessPhoneNumber}
                />
              )}
              {steps === 3 && <WhatsAppConfig />}
            </Spin>
          </div>
          <Flex spaceBetween style={{ margin: '3rem' }}>
            <Button
              type="default"
              onClick={() => {
                setSteps(steps - 1);
              }}
              disabled={steps === 0 ? true : false}
            >
              Back
            </Button>
            {steps !== 3 && (
              <Button
                type="primary"
                onClick={() => {
                  setSteps(steps + 1);
                }}
                disabled={
                  (steps === 0 && selectedBusinessList?.length === 0) ||
                  (steps === 1 && selectedBusinessAccount.length === 0) ||
                  (steps === 2 && selectedPhoneNumber.length === 0)
                }
              >
                Next
              </Button>
            )}

            {steps === 3 && (
              <Button
                type="primary"
                onClick={connectWhatsAPP}
                disabled={selectedPhoneNumber?.length === 0}
              >
                Done
              </Button>
            )}
          </Flex>
        </CardWrapper>
      </Wrapper>
    </Fragment>
  );
};

export default WhatsAppAuthPage;
