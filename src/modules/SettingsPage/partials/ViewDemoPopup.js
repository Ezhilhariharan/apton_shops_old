import React, { useState, useEffect } from 'react';
import {
  Modal_body,
  CardWrapper,
  ModalWrapper,
  Wrapper,
  ModalTitle,
} from '../../upgrade/components/Upgrade.style';
import { Button, Segmented } from 'antd';
import Flex from '@components/common/Flex';
import Starter from '@components/icons/Starter';
import Enterprice from '@components/icons/Enterprice';
import Growth from '@components/icons/Growth';
import FreePlan from '@components/icons/FreePlan';
import GreenTick from '@components/icons/GreenTick';
import GoldTick from '@components/icons/GoldTick';
import BlueTick from '@components/icons/BlueTick';
import TrialClockIcon from '@components/icons/TrialClockIcon';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const ViewDemoPopup = ({
  popup,
  close
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(() => {
    setIsModalOpen(popup);
  }, [popup]);

  const closeModal = () => {
    close(false);
    setIsModalOpen(false);
  };
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
const handlePopop=()=>{
    window.open(
      'https://www.aptonshops.com/pricing.html',
      '_blank'
    )
    close(false)
}
  return (
    <ModalWrapper
      open={isModalOpen}
      onCancel={() => closeModal()}
      centered={true}
      footer={null}
    >
      <Wrapper>
        <ModalTitle>
          Your are Currently on the{' '}
          <span className={priceValidation?.current_plan==="Free Plan"?"orange":
        priceValidation?.current_plan==="Starter Plan"?"green":"blue"}>"{priceValidation?.current_plan}"</span>
        </ModalTitle>
        <Flex spaceAround style={{ width: '100% ' }}>
          <CardWrapper style={{width:"300px"}}>
            <div className="icons">
              {priceValidation?.plan_details?.plan_name === 'Free Plan' ? (
                <FreePlan />
              ) : priceValidation?.plan_details?.plan_name == 'Starter Plan' ? (
                <Starter />
              ) : priceValidation?.plan_details?.plan_name == 'Growth Plan' ? (
                <Growth />
              ) : (
                <Enterprice />
              )}
            </div>
            {priceValidation?.plan_details?.plan_name !== 'Free Plan' && (
              <div className="price">
                {priceValidation?.plan_details?.country_code}
                {priceValidation?.plan_details?.price.toLocaleString('en-US')}
              </div>
            )}
            <div className="category">
              {priceValidation?.plan_details?.current_plan}
            </div>
            <div className="benefitsList" style={{ minHeight: '260px' }}>
              {priceValidation?.plan_details?.details?.map(list => (
                <div className="benefits">
                  <span className="ticks">
                    {priceValidation?.plan_details?.plan_name ==
                      'Starter Plan' ||
                    priceValidation?.plan_details?.plan_name == 'Free Plan' ? (
                      <GreenTick />
                    ) : priceValidation?.plan_details?.plan_name ==
                      'Growth Plan' ? (
                      <BlueTick />
                    ) : (
                      <GoldTick />
                    )}
                  </span>
                  <span className="content">{list}</span>
                </div>
              ))}
            </div>
            <Button
              type="primary"
              style={{
                color: 'white',
                border: '0px',
                borderRadius: '5px',
                backgroundColor:
                  priceValidation?.plan_details?.plan_name == 'Starter Plan' ||
                  priceValidation?.plan_details?.plan_name == 'Free Plan'
                    ? '#00BDA5'
                    : priceValidation?.plan_details?.plan_name == 'Growth Plan'
                    ? '#0046FF'
                    : '#EF9F39',
                fontWeight: 700,
                fontSize: '14px',
                marginBottom: '10px',
              }}
              onClick={handlePopop}
            >
              {priceValidation?.plan_details?.plan_name ==='Enterprise Plan'?"Contact Us":"View More plans"}
            </Button>
          </CardWrapper>
        </Flex>
      </Wrapper>
    </ModalWrapper>
  );
};

export default ViewDemoPopup;
