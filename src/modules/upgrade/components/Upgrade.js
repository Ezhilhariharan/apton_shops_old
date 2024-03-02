import React, { useEffect, useState } from 'react';
import {
  Modal_body,
  CardWrapper,
  ModalWrapper,
  Wrapper,
  ModalTitle,
} from './Upgrade.style';
import { Button, Segmented } from 'antd';
import Flex from '@components/common/Flex';
import Starter from '@components/icons/Starter';
import Enterprice from '@components/icons/Enterprice';
import Growth from '@components/icons/Growth';
import GreenTick from '@components/icons/GreenTick';
import GoldTick from '@components/icons/GoldTick';
import BlueTick from '@components/icons/BlueTick';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Payment from '../../SettingsPage/partials/Payment';
import { viewPlansDetails } from '../../SettingsPage/actions';
const Segment = styled(Segmented)`
  background: white;
  border-radius: 30px;
  width: 238px;
  font-weight:700;
  color: #4aacea;
  &:hover {
    background: #ffffff;
    border-radius: 30px;
  }
  .ant-segmented-item {
    background: #ffffff;
    border-radius: 30px;
  }
  .ant-segmented-item-selected {
    background: #4aacea;
    border-radius: 30px;
    margin: 1px;
    color: white;
  }
`;
const Upgrade = ({
  getCountries,
  getProvince,
  getCity,
  accountCountry,
  accountProvince,
  accountCity,
  billingInfo,
  updateBillingDetails,
  popup,
  close,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  const [cardType, setCardType] = useState('Monthly');
  const [paymentPlan, setPaymentPlan] = useState();

  useEffect(() => {
    setIsModalOpen(popup);
  }, [popup]);

  const closeModal = () => {
    close(false);
    setIsModalOpen(false);
  };
  const currentUser = useSelector(state => state.authSelector.cusrentUser);
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const accountId = currentUser?.account?.id;
  const selectedType = cardType === 'Monthly' ? 'MONTHLY' : 'YEARLY';
  useEffect(() => {
    if (accountId && brand?.id && isModalOpen) {
      dispatch(viewPlansDetails(accountId, brand?.id, selectedType));
    }
  }, [isModalOpen, accountId, brand, cardType]);
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const handleSegment = value => {
    setCardType(value);
  };
  const list = useSelector(state => state.settingSelector.plansList);

  return (
    <ModalWrapper
      open={isModalOpen}
      onCancel={() => closeModal()}
      centered={true}
      footer={null}
      width="auto"
      >
      <Wrapper>
        <ModalTitle>
          Your are Currently on the{' '}
          <span className={priceValidation?.current_plan==="Free Plan"?"orange":
        priceValidation?.current_plan==="Starter Plan"?"green":"blue"}>"{priceValidation?.current_plan}"</span>
        </ModalTitle>
       {priceValidation?.current_plan!=='Growth Plan' &&
       <>
        <Segment
          block
          options={['Monthly', 'Yearly']}
          value={cardType}
          onChange={handleSegment}
        />
        <span className="plan-suggestion">Please select an upgrade plan</span></>}
        <Flex spaceBetween style={{ width: '100%'}}>
          {list.length > 0 &&
            list?.map((item,index) =>
              priceValidation?.current_plan == 'Enterprise Plan' &&
              item?.name == 'Starter Plan' ? null : (
                <CardWrapper style={{margin:priceValidation?.current_plan==="Growth Plan"?"auto":"20px"}}>
                  <div className="icons">
                    {item?.name === 'Starter Plan' ? (
                      <Starter />
                    ) : item?.name === 'Growth Plan' ? (
                      <Growth />
                    ) : (
                      <Enterprice />
                    )}
                  </div>
                  {item?.name==="Enterprise Plan"?
                  <div className='price'>Custom</div>:
                  <div className="price">
                    {item?.country_code}
                    {item?.price.toLocaleString('en-US')}
                  </div>}
                  <div className="category">{item?.name}</div>
                  <div className="benefitsList">
                    {item?.details.map(list => (
                      <div className="benefits">
                        <span className="ticks">
                          {item?.name == 'Starter Plan' ? (
                            <GreenTick />
                          ) : item?.name == 'Growth Plan' ? (
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
                        item?.name == 'Starter Plan'
                          ? '#00BDA5'
                          : item?.name == 'Growth Plan'
                          ? '#0046FF'
                          : '#EF9F39',
                      fontWeight: 700,
                      fontSize: '14px',
                      marginBottom: '10px',
                    }}
                    onClick={() => {
                      close(false);
                      setOpenPopup(true);
                      setPaymentPlan(item);
                      //window.open("https://calendly.com/abinesh-3/30min?month=2023-01", "_blank")
                    }}
                  >
                   {item?.name==='Enterprise Plan'?"Contact Us":"Buy Now"}
                  </Button>
                </CardWrapper>
              )
            )}
        </Flex>
        <span
          onClick={() => {
            window.open('https://www.aptonshops.com/pricing.html', '_blank');
          }}
          className="plan-suggestion"
          style={{ borderBottom: '1px solid black', cursor: 'pointer',marginTop:"20px" }}
        >
          View Plan Details
        </span>
      </Wrapper>
      <Payment
        getCountries={getCountries}
        getProvince={getProvince}
        currentUser={currentUser}
        getCity={getCity}
        accountCountry={accountCountry}
        accountProvince={accountProvince}
        accountCity={accountCity}
        billingInfo={billingInfo}
        updateBillingDetails={updateBillingDetails}
        popup={openPopup}
        close={setOpenPopup}
        cardType={cardType}
        paymentPlanId={paymentPlan?.id}
      />
    </ModalWrapper>
  );
};
export default Upgrade;
