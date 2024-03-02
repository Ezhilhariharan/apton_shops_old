import React, { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import PlanExpired from '../../icons/PlanExpired';
import ExpiredLogo from '../../../../src/assets/images/expiredLogo.png';
import ExpiredTop from '../../../../src/assets/images/expiredTop.png';
import ExpiredFooter from '../../../../src/assets/images/expiredFooter.png';
// import ExpiredTop from '../../icons/ExpiredTop';
import ExpiredDown from '../../icons/ExpiredDown';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBrandSwitching } from '../../../actions';
import {
  updateUserInfo,
  updatePricingValidation,
  updateOnboardingSteps,
  upDateAuthToken,
} from '../.../../../../modules/Auth/actions';
import { updateButtons } from '../../../modules/SocialMedia/actions';
import request from '@utils/request';

const ModalWrapper = styled(Modal)`
  .ant-modal,
  .ant-modal-content {
    height: 90vh;
    width: 90vw;
    margin: 0;
    top: 0;
    padding: 0;
    margin-left: 40px;
    border-radius: 12px !important;
  }
  .ant-modal-body {
    height: calc(100vh - 110px);
    padding: 0;
    border-radius: 12px;
  }
`;
const Wrapper = styled(Card)`
  width: 100% !important;
  height: 100% !important;
  display: block;
  background: #ffffff;
  overflow: hidden;
  .ant-card-body {
    padding: 0px;
  }
  .expiredTop {
    width: 100%;
    height: 135px;
    object-fit: fill;
  }
  .expiredFooter {
    width: 100%;
    height: 100px;
    object-fit: fill;
  }
  .text {
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 16px;
    color: #4d4d4d;
  }
  .logo {
    margin: 0 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      margin: -20px 0 0;
      width: 300px;
      height: 75px;
      // width: 100% !important;
    }
  }
  .paragraph {
    width: 540px;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #181818;
    margin: 15px 0;
  }
`;

const PlanEXpired = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const url = '/api/logout';
    const token = localStorage.getItem('authToken');
    const res = request.post(url, { headers: { Authorization: token } });
    res
      .then(data => {
        if (data?.status === 200) {
          localStorage.setItem('brandIndex', 0);
          dispatch(upDateAuthToken(null));
          dispatch(updateButtons('Create'));
          localStorage.removeItem('authToken');
          localStorage.removeItem('Create');
          dispatch(updateOnboardingSteps(0));
          navigate('/');
          dispatch(updateBrandSwitching(''));
          dispatch(updateUserInfo(''));
          dispatch(updatePricingValidation(''));
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <ModalWrapper
      centered
      open={open}
      width={'95%'}
      footer={null}
      closable={false}
      keyboard={false}
    >
      <Flex
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto',
          alignItems: 'center',
        }}
      >
        <Wrapper>
          <img src={ExpiredTop} className="expiredTop" alt="topDesign" />
          <div className="logo">
            <img src={ExpiredLogo} alt="expiredLogo" />
            <p className="text">Omnichannel Growth Plarform</p>

            <PlanExpired style={{ marginTop: '20px !important' }} />

            <p className="paragraph">
              Your plan has been expired.Subscribe to any of our premium plan to
              continue enjoy our product
            </p>
            <Flex center style={{ margin: '10px 0 -20px' }}>
              <Button
                type="primary"
                style={{
                  width: '170px',
                  height: '40px',
                  placeItems: 'center',
                  fontSize: '17px',
                  fontWeight: '600',
                  marginRight: '50px',
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  window.open(
                    'https://www.aptonshops.com/pricing.html',
                    '_blank'
                  )
                }
                style={{
                  width: '170px',
                  height: '40px',
                  placeItems: 'center',
                  fontSize: '17px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Upgrade Now
              </Button>
            </Flex>
          </div>
          <img src={ExpiredFooter} className="expiredFooter" alt="topDesign" />
        </Wrapper>
      </Flex>
    </ModalWrapper>
  );
};

export default PlanEXpired;
