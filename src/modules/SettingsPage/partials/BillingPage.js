import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as B from '../components/index.styles';
import { DatePicker, Divider, Row, Col, Card, Button, Typography } from 'antd';
import trialImage from '@public/trialImage.svg';
import Starter from '@public/Starter.svg';
import Enterprise from '@public/Enterprise.svg';
import Growth from '@public/Growth.svg';
import styled from 'styled-components';
import Upgrade from '../../upgrade/components/Upgrade';
import Flex from '@components/common/Flex';
import { InfoCircleOutlined, EditOutlined,DownOutlined } from '@ant-design/icons';
import Payment from '@components/icons/Payment';
import BillingDelete from '@components/icons/BillingDelete';
import Checked from '@components/icons/Checked';
import Visa from '@components/icons/Visa';
import BillingHistory from './BillingHistory';
import ArrowUp from '@components/icons/ArrowUp';
import BillingCalendar from '@components/icons/BillingCalendar';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ViewDemoPopup from './ViewDemoPopup';
import AddcardPopover from './AddcardPopover';
import BillingHistoryImage from '../../../assets/images/BillingHistoryImage.png';
import EditPopover from './EditPopover';
import SuccessPopover from './SuccessPopover';
import { getBillingInfo, getPaymentInformation } from '../actions';
import FailurePopover from './FailurePopover';
import Arrow from '../../../components/icons/Arrow';

const Text = styled.p`
  width: 58px;
  height: 25px;
  left: 130px;
  top: 6px;
  background: #ef9f39;
  border-radius: 5px;
  color: white;
  padding: 0px 0px 0px 5px;
  margin: 5px;
`;
export const Title = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: ${props => (props.font ? '18px' : '14px')};
  line-height: 22px;
  color: #181818;
  margin-left: ${props => (props.font ? '0px' : '10px')};
  margin-bottom: 20px;
`;
export const EditButton = styled(Button)`
  background: #ffffff;
  border: 2px solid #4aacea;
  color: #4aacea;
  font-size: 13px;
  font-weight: 600;
  height: 32px;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background: #ffffff;
    border: 2px solid #4aacea;
    color: #4aacea;
  }
  &.btn-active {
    background: #ffffff;
    border: 2px solid #4aacea;
    color: #4aacea;
  }
`;
const Cols = styled(Col)`
  :nth-child(even) {
    margin: auto;
  }
  :nth-child(odd) {
    border-right: 1px solid #d9d9d9;
  }
`;
const Typo=styled(Typography)`
  text-align:center;
  width: 100%;
  border-radius:10px;
  padding:10px 0px 10px;
  color: #999999;
  font-weight:700;
  font-size:16px;
  border:1px solid #D9D9D9;
}}`
const BillingPage = ({
  updateBillingDetails,
  billingInfo,
  getCountries,
  getProvince,
  getCity,
  accountCountry,
  accountProvince,
  accountCity,
}) => {
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [openViewDemo, setOpenViewDemo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  const [edit, setEdit] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const currentYear = moment().format('YYYY');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(1);
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const history = useSelector(state => state.settingSelector.historyDetails);
  const [data, setData] = useState('');
  const currentUser = useSelector(state => state.authSelector.cusrentUser);
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const accountId = currentUser?.account?.id;
  const dispatch = useDispatch();
  const date1 = new Date();
  const date2 = new Date(priceValidation?.expiry_date);
  const diffInMs = date2?.getTime() - date1?.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  const fields = [
    {
      id: 1,
      name: priceValidation?.billing_info?.business_name,
      title: 'Business Name',
    },
    {
      id:2,
      name: priceValidation?.billing_info?.address_line_1,
      title:"Company Address"

    },
    {
      id: 3,
      name: priceValidation?.billing_info?.email,
      title: 'Email Address',
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
  const PaymentMessage = useSelector(
    state => state.settingSelector.paymentInformation
  );
  useEffect(() => {
    if ((accountId, brand, priceValidation?.current_plan)) {
      dispatch(getBillingInfo(accountId, brand?.id, selectedYear, page));
    }
  }, [priceValidation?.current_plan]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('payment');
    setPaymentStatus(status);
    if (paymentStatus === 'success') {
      dispatch(getPaymentInformation(brand?.id));
      setSuccess(true);
    }
    if (paymentStatus === 'failed') {
      setFailed(true);
    }
  }, [paymentStatus]);
  useEffect(() => {
    if (history?.length > 0) {
      setData(history);
    }
  }, [history]);

  const disabledFutureYears = date => {
    const currentYear = new Date().getFullYear();
    return date.year() > currentYear;
  };
  return (
    <>
      <B.BillingBox>
        <div className="subscriptWrapper">
          <div className="subscriptionText">Current Plan</div>
          <div className="upgradeText">
            Upgrade or downgrade your plan based on usage.
          </div>
        </div>
        <Divider className="reverseMargin" />
      </B.BillingBox>
      <Row>
        <Col span={12}>
          <B.SubscriptionWrapper>
            <B.TrialBox>
              <Flex spaceBetween style={{ width: '100%' }}>
                <div style={{ display: 'flex' }}>
                  <img
                    src={
                      priceValidation?.current_plan === 'Free Plan'
                        ? trialImage
                        : priceValidation?.current_plan === 'Enterprise Plan'
                        ? Enterprise
                        : priceValidation?.current_plan === 'Starter Plan'
                        ? Starter
                        : Growth
                    }
                    width="30.4px"
                    height="30.4px"
                  ></img>
                  <span className="trialText">
                    {priceValidation?.current_plan==="Free Plan"?"Trail Plan":priceValidation?.current_plan}
                  </span>
                  {priceValidation?.current_plan !== 'Free Plan' && (
                    <Text>Annual</Text>
                  )}
                </div>
                {priceValidation?.current_plan === 'Free Plan' ? (
                  <div className="MonthText">Free</div>
                ) : (
                  <div style={{ display: 'flex' }}>
                    <div className="MonthText">{priceValidation?.plan_details?.country_code}{priceValidation?.plan_details?.price}</div>
                    <span style={{ marginTop: '7px' }}>/m</span>
                  </div>
                )}
              </Flex>
            </B.TrialBox>
            <div>
              <div className="BillText">Billing Period</div>
              <Flex>
                <span className="MonthText">
                  {priceValidation?.current_plan === 'Free Plan'
                    ? '14 days'
                    : 'Monthly'}
                </span>
                {priceValidation?.current_plan === 'Free Plan' ? (
                  <span className="contText" style={{ color: 'red' }}>
                    {diffInDays===0?"(Expired Today)":`(Expired in ${diffInDays} days)`}
                  </span>
                ) : (
                  <span className="contText">(Renews {moment(priceValidation?.expiry_date).format('MMM DD, YYYY')})</span>
                )}
              </Flex>
            </div>
            <Divider className="reverseMargin" />
            {priceValidation?.current_plan !== 'Enterprise Plan' ? (
              <Flex spaceBetween>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenViewDemo(true)}
                >
                  Plan Details <InfoCircleOutlined />
                </span>

                <Flex spaceBetween>
                  <B.CancelPlanButton disabled style={{ marginRight: '20px' }}>
                    Cancel
                  </B.CancelPlanButton>
                  <div>
                    <B.UpgardePlanButton
                      onClick={() => setOpenUpgrade(true)}
                      style={{ padding: '0px 5px 0px 5px' }}
                    >
                      <Flex>
                        Upgrade <ArrowUp />
                      </Flex>
                    </B.UpgardePlanButton>
                  </div>
                </Flex>
              </Flex>
            ) : (
              <Flex center>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenViewDemo(true)}
                >
                  Plan Details <InfoCircleOutlined />
                </span>
              </Flex>
            )}
            <ViewDemoPopup popup={openViewDemo} close={setOpenViewDemo} />
          </B.SubscriptionWrapper>
        </Col>
        <Col span={12}>
          <B.SubscriptionWrapper style={{ minHeight: '265px' }}>
            <B.TrialBox>
              <Flex spaceBetween style={{ width: '100%', marginBottom: '5px' }}>
                <div style={{ display: 'flex' }}>
                  <Payment />
                  <span className="trialText">Payment Method</span>
                </div>
                {/* {priceValidation?.current_plan !== 'Free Plan' &&
                  deleteCard === false && (
                    <div
                      onClick={() => setDeleteCard(true)}
                      style={{ cursor: 'pointer' }}
                    >
                      <BillingDelete />{' '}
                    </div>
                  )} */}
              </Flex>
            </B.TrialBox>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '160px',
                flexDirection: 'column',
              }}
            >
              <Typo>
                No cards Added
              </Typo>
            </div>
            {/* {priceValidation?.current_plan !== 'Free Plan' &&
            deleteCard === false ? (
              <>
                <Card style={{ marginBottom: '5px', maxHeight: '85px' }}>
                  <Visa /> &nbsp;
                  <span className="cardNum"> **** **** **** 9876</span>
                </Card>
                <Divider />
                <Flex spaceBetween>
                  <span>
                    <Checked />
                    &nbsp;Monthly auto renews &nbsp;
                    <InfoCircleOutlined />
                  </span>
                  <B.UpgardePlanButton onClick={() => setAddCard(true)} style={{padding:"0px 5px 0px 5px"}}>
                    <EditOutlined twoToneColor="white" />
                    Edit
                  </B.UpgardePlanButton>
                </Flex>
              </>
            ) : (
              <Flex center alignCenter column style={{ minHeight: '170px' }}>
                <B.UpgardePlanButton
                  onClick={() => setAddCard(true)}
                  style={{
                    width: '100%',
                    marginTop: '30px',
                    height: '52px',
                    borderRadius: '10px',
                  }}
                >
                  AddCard
                </B.UpgardePlanButton>
              </Flex>
            )} */}
          </B.SubscriptionWrapper>
          <AddcardPopover popup={addCard} close={setAddCard} />
        </Col>
        <Divider style={{ border: '1px solid #D9D9D9' }} />
        <Col span={24}>
          <B.TrialBox>
            <Flex spaceBetween>
              <span
                className="trialText"
                style={{ marginLeft: '20px', fontSize: '18px' }}
              >
                {' '}
                Billing Information
              </span>

              <div>
                <EditButton
                 style={{margin:"0px 20px 10px 0px"}}
                  className="btn-active"
                  onClick={() => setEdit(true)}
                >
                  <EditOutlined />
                  Edit
                </EditButton>
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
                  popup={edit}
                  close={setEdit}
                />
              </div>
            </Flex>
          </B.TrialBox>
          <B.SubscriptionWrapper style={{ marginTop: '20px' }}>
            <Title font="title">
              {priceValidation?.billing_info?.business_name}
            </Title>
            <Row>
              {fields?.map(data => {
                return (
                  <Cols span={10}>
                    <span style={{ display: 'flex', marginBottom: '20px' }}>
                      <span style={{fontSize:"14px",fontWeight:"400"}}>{data?.title}</span>:<Title>{data?.name}</Title>
                    </span>
                  </Cols>
                );
              })}
            </Row>
          </B.SubscriptionWrapper>
        </Col>
        <Divider style={{ border: '1px solid #D9D9D9' }} />
        <Col span={24}>
          <B.TrialBox>
            <Flex spaceBetween>
              <span
                className="trialText"
                style={{ marginLeft: '20px', fontSize: '18px' }}
              >
                {' '}
                Billing History
              </span>

              <div
                style={{
                  marginRight: '20px',
                  display: 'flex',
                  width:"140px",
                  boxShadow: '0px 0px 14px rgba(79, 92, 128, 0.15)',
                  borderRadius: '5px',
                }}
              >
                <div className="icon">
                  <BillingCalendar />
                </div>
                <DatePicker
                  suffixIcon={<Arrow/>}
                  bordered={false}
                  picker="year"
                  defaultValue={moment(`${currentYear}`, 'YYYY')}
                  onChange={(date, dateString) => {
                    setSelectedYear(dateString);
                  }}
                  disabledDate={disabledFutureYears}
                />{' '}
              </div>
            </Flex>
          </B.TrialBox>
        </Col>

        {history?.invoices?.length === 0 ? (
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              width: '100%',
            }}
          >
            <img src={BillingHistoryImage} alt="no img" />
          </div>
        ) : (
          <Col span={23} style={{ margin: '0px 10px 0px 20px' }}>
            <BillingHistory history={history} setPage={setPage} />
          </Col>
        )}
      </Row>
      {paymentStatus && (
        <SuccessPopover
          PaymentMessage={PaymentMessage}
          popup={success}
          close={setSuccess}
          closePop={close}
        />
      )}
      {paymentStatus === 'failed' && (
        <FailurePopover popup={failed} close={setFailed} />
      )}
       <Upgrade
              getCountries={getCountries}
              getProvince={getProvince}
              currentUser={currentUser}
              getCity={getCity}
              accountCountry={accountCountry}
              accountProvince={accountProvince}
              accountCity={accountCity}
              billingInfo={billingInfo}
              updateBillingDetails={updateBillingDetails}
              popup={openUpgrade}
              close={setOpenUpgrade}
            />
    </>
  );
};

export default BillingPage;
