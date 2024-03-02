import { Modal, Row, Col, Card, Table, Radio, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import Flex from '@components/common/Flex';
import {
  StarOutlined,
  EditOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import * as B from '../components/index.styles';
import styled from 'styled-components';
import Visa from '../../../components/icons/Visa';
import mastercard from '../../../assets/images/mastercard.png';
import EditPopover from './EditPopover';
import OrderSummery from './OrderSummery';
import { EditButton } from './BillingPage';
import { viewDetails } from '../actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import discount from '../../../assets/images/discount.png';
import { Title } from './SuccessPopover';
import { fields } from './BillingPage';
const Box = styled.fieldset`
  width: 280px;
  height: 160px;
  margin-right: 30px;
  box-shadow: ${props =>
    props.type === props.box && '0px 0px 14px rgba(0, 0, 0, 0.15)'};
  background: ${props => (props.type === props.box ? '#FFFFF' : '#EEEEEE')};
  border-radius: 10px;
  border: ${props => props.type === props.box && '2px solid #4AACEA'};
  .amount {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: #000000;
  }
  .finalCont {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #4d4d4d;
  }
`;
const CardBox = styled(Card)`
  width: 280px;
  height: 160px;
  margin-right: 30px;
  box-shadow: ${props =>
    props.type === 'payment' && '0px 0px 14px rgba(0, 0, 0, 0.15)'};
  background: ${props => (props.type === 'payment' ? '#FFFFF' : '#EEEEEE')};
  border-radius: 10px;
`;
const Styleddiv = styled.div`
  justify-content: start;
  text-align: start;
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  margin-left: ${props => props.type && '10px'};
  font-weight: ${props => props.type && '600'};
  color: ${props => props.type && '#181818'};
`;

export const Cols = styled(Col)`
  :nth-child(even) {
    margin: auto;
  }
  :nth-child(odd) {
    border-right: 1px solid #d9d9d9;
  }
`;
export const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    overflow: hidden;
  }
  .ant-modal-body {
    height: auto;
    background: #f7f7f7;
    background-size: cover;
    position: relative;
  }
  .title {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #4d4d4d;
    margin: 10px 0px 10px 0px;
  }
  .plan {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    color: #4d4d4d;
    margin-bottom: 20px;
  }
  .answerings {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #181818;
    margin-left: 10px;
  }
  .legend {
    text-align: center;
    width: 121px;
    height: 20px;
    font-weight: 700;
    font-size: 12px;
    color: white;
    background: #4aacea;
    border-radius: 10px;
  }
`;

const Payment = ({
  popup,
  close,
  paymentPlanId,
  cardType,
  getCountries,
  getProvince,
  getCity,
  accountCountry,
  accountProvince,
  accountCity,
  billingInfo,
  updateBillingDetails,
}) => {
  const type = cardType === 'Monthly' ? 'MONTHLY' : 'YEARLY';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [box, setBox] = useState();
  const [plan, setPlan] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const details = useSelector(state => state.settingSelector.planInfo);
  const [planFee, setPlanFee] = useState();
  const [planFee1, setPlanFee1] = useState();
  const [paymentDetails, setPaymentDetails] = useState();

  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const fields = [
    {
      id: 1,
      name: priceValidation?.billing_info?.business_name,
      title: 'Business Name',
    },
    {
      id: 2,
      name: priceValidation?.billing_info?.address_line_1,
      title: 'Company Address',
    },
    {
      id: 3,
      name: priceValidation?.billing_info?.email,
      title: 'Email',
    },
    {
      id: 4,
      name: priceValidation?.billing_info?.contact_number,
      title: 'Phone_Number',
    },
    {
      id: 5,
      name: priceValidation?.billing_info?.postal_index_code,
      title: 'Zip Code',
    },
  ];

  useEffect(() => {
    setIsModalOpen(popup);
  }, [popup]);

  const closeModal = () => {
    close(false);
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authSelector.cusrentUser);
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );

  const accountId = currentUser?.account?.id;
  useEffect(() => {
    if (accountId && brand?.id && isModalOpen) {
      dispatch(viewDetails(accountId, brand?.id, paymentPlanId));
    }
  }, [isModalOpen, accountId, brand, paymentPlanId]);

  useEffect(() => {
    const Yearly =
      details?.length > 0 &&
      details?.filter(person => person?.frequency_type === 'YEARLY');
    const Monthly =
      details?.length > 0 &&
      details?.filter(person => person?.frequency_type === 'MONTHLY');
    setPlanFee(Monthly[0]);
    setPlanFee1(Yearly[0]);
    paymentdetails();
  }, [details, box, paymentdetails]);
  const paymentdetails = () => {
    let info = [];
    const datas = box === undefined ? type : box;
    details?.length > 0 &&
      details?.map(data => {
        if (data?.frequency_type === datas) {
          info.push({ ...data });
        }
      });
    setPaymentDetails(info[0]);
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      onCancel={() => closeModal()}
      centered={true}
      footer={null}
      style={{ minWidth: '68vw' }}
    >
      <Row>
        <Col span={14}>
          {plan !== 'Enterprise Plan' ? (
            <div>
              <img
                src={discount}
                alt="discount"
                width="80px"
                height="40px"
                style={{ position: 'relative', left:`${window.innerWidth}`>1600?"170px":"143px", top: '40px' }}
              />
              <Flex>
                <Box
                  type="YEARLY"
                  box={box === undefined ? type : box}
                  onClick={() => setBox('YEARLY')}
                >
                  <legend className="legend">Recomended</legend>
                  <div
                    style={{ justifyContent: 'center', textAlign: 'center' }}
                  >
                    <p className="plan">Yearly Plan</p>
                    <p className="amount">
                      {planFee1?.country_code}
                      {Math.round(planFee1?.price / 12).toLocaleString('en-US')}
                    </p>
                    <p className="finalCont">
                      {planFee1?.country_code}
                      {planFee1?.price.toLocaleString('en-US')} / billed yearly
                    </p>
                  </div>
                </Box>
                <Box
                  type="MONTHLY"
                  box={box === undefined ? type : box}
                  onClick={() => setBox('MONTHLY')}
                >
                  <div
                    style={{
                      justifyContent: 'center',
                      textAlign: 'center',
                      marginTop: '20px',
                    }}
                  >
                    <p className="plan">Monthly Plan</p>
                    <p className="amount">
                      {planFee?.country_code}
                      {planFee?.price.toLocaleString('en-US')}
                    </p>
                    <p className="finalCont">
                      {planFee?.country_code}
                      {Math.round(planFee?.price * 12).toLocaleString(
                        'en-US'
                      )}{' '}
                      / billed yearly
                    </p>
                  </div>
                </Box>
              </Flex>
              <div className="title">
                --- &nbsp;&nbsp;Your subscription will auto renew{' '}
                {box === 'YEARLY' ? 'every year' : 'every month'}. You can
                unsubscribe anytime.&nbsp;&nbsp; ---
              </div>
              <div style={{ width: '95%' }}>
                <div className="plan">Billing Information</div>
                <Card style={{ width: '100%', borderRadius: '10px' }}>
                  <Flex spaceBetween>
                    <span className="plan">
                      {priceValidation?.billing_info?.business_name}
                    </span>

                    <EditButton
                      onClick={() => {
                        setOpenPopup(true);
                      }}
                      style={{ margin: '0px' }}
                      className="btn-active"
                    >
                      <EditOutlined />
                      Edit
                    </EditButton>
                  </Flex>

                  <Row style={{ marginTop: '10px' }}>
                    {fields?.map((data, index) => {
                      return (
                        <Cols span={index % 2 == 0 ? 12 : 10}>
                          <div style={{ marginBottom: '20px' }}>
                            <Flex>
                              <Styleddiv>{data?.title}:</Styleddiv>
                              <Styleddiv type="reply">{data?.name}</Styleddiv>
                            </Flex>
                          </div>
                        </Cols>
                      );
                    })}
                  </Row>
                </Card>

                <EditPopover
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
                />
              </div>
            </div>
          ) : (
            <CardBox
              type="payment"
              style={{ marginTop: '40px', height: '620px', width: '600px' }}
            >
              <Row>
                <Col span={12}>
                  <div className="plan" style={{ color: '#EF9F39' }}>
                    Enterprise Plan
                  </div>
                  <Flex spaceBetween style={{ marginBottom: '10px' }}>
                    <Title>Broadcast Limit:</Title>
                    <Title reply="text" payment="true">
                      Unlimited
                    </Title>
                  </Flex>
                  <Flex spaceBetween style={{ marginBottom: '10px' }}>
                    <Title>Active Contacts:</Title>
                    <Title reply="text" payment="true">
                      Unlimited
                    </Title>
                  </Flex>
                  <Flex spaceBetween style={{ marginBottom: '10px' }}>
                    <Title>Posts:</Title>
                    <Title reply="text" payment="true">
                      Unlimited
                    </Title>
                  </Flex>
                  <Flex spaceBetween style={{ marginBottom: '10px' }}>
                    <Title>Storage Limit:</Title>
                    <Title reply="text" payment="true">
                      Unlimited
                    </Title>
                  </Flex>
                  <Flex>
                    <Title>Dedicated Account Manager:</Title>
                    <Title
                      reply="text"
                      payment="true"
                      style={{ textIndent: '40px' }}
                    >
                      Yes
                    </Title>
                  </Flex>
                </Col>
                <Col span={24}>
                  <Flex column center alignCenter style={{ height: '250px' }}>
                    <Title
                      reply="text"
                      payment="true"
                      style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        marginBottom: '0px',
                      }}
                    >
                      A dedicated sales representative will contact you to know
                      your
                    </Title>
                    <Title
                      reply="text"
                      payment="true"
                      style={{ textAlign: 'center', fontWeight: '700' }}
                    >
                      requirements and take you forward to the next steps.
                    </Title>
                  </Flex>
                </Col>
              </Row>
            </CardBox>
          )}
        </Col>
        <Col span={10}>
          <CardBox
            type="payment"
            style={{
              width: 'auto',
              height: plan === 'Enterprise Plan' ? '620px' : 'auto',
              marginTop: '40px',
            }}
          >
            {plan !== 'Enterprise Plan' && (
              <div className="plan" style={{ margin: '20px 0px 20px 0px' }}>
                Order Summery
              </div>
            )}
            <OrderSummery
              plan={plan}
              setPlan={setPlan}
              setIsModalOpen={setIsModalOpen}
              close={close}
              paymentDetails={paymentDetails}
            />
          </CardBox>
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default Payment;
