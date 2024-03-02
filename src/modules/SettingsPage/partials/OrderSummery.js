import React, { useEffect, useState } from 'react';
import Bill from '../../../components/icons/Bill';
import Dollar from '../../../components/icons/Dollar';
import Star from '../../../components/icons/Star';
import { StarFilled, PhoneFilled, DownOutlined } from '@ant-design/icons';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import { Typography, Divider, Select } from 'antd';
import * as B from '../components/index.styles';
import Shield from '../../../components/icons/Shield';
import SuccessPopover from './SuccessPopover';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getPaymentInformation, payOption, viewDetails } from '../actions';
import { Dropdown, Menu, Space } from 'antd';
import enterprise from '../../../assets/images/enterprise.png';

const Message = styled(Typography)`
  font-family: 'Lato';
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #4d4d4d;
`;
const Text = styled(Typography)`
  top: 91px;
  display: flex;
  width: 120px;
  background: ${props =>
    props.plan === 'Starter Plan'
      ? '#4aacea'
      : props.plan === 'Growth Plan'
      ? '#FDD641'
      : '#D75BFE'};
  border-radius: 10px;
  color: white;
  height: 23px;
  text-align: center;
  justify-content: center;
  margin-left: 10px;
`;
export const Box = styled.div`
  margin: auto;
  margin-left: 10px;
`;

const OrderSummery = ({
  setIsModalOpen,
  close,
  paymentDetails,
  plan,
  setPlan,
}) => {
  const dispatch = useDispatch();
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  const currentUser = useSelector(state => state.authSelector.cusrentUser);
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );
  const accountId = currentUser?.account?.id;
  const [paymentPlan, setPaymentPlan] = useState();

  useEffect(() => {
    if (paymentDetails) {
      setPlan(paymentDetails?.plan_name);
    }
  }, [paymentDetails]);
  useEffect(() => {
    if (paymentPlan) {
      dispatch(viewDetails(accountId, brand?.id, paymentPlan?.id));
    }
  }, [setIsModalOpen, paymentPlan]);
  const handleClick = ({ key }) => {
    setPlan(key);
    const selectedItem = list?.find(item => item?.name === key);
    setPaymentPlan(selectedItem);
  };

  const list = useSelector(state => state.settingSelector.plansList);
  const menu = (
    <Menu onClick={handleClick} mode="horizontal">
      {list.length > 0 &&
        list?.map(data => {
          return (
            <Menu.Item key={data?.name}>
              <Flex>
                <Text
                  plan={data?.name}
                  style={{
                    width: '15px',
                    height: '15px',
                    margin: '4px 10px 0px 0px',
                  }}
                >
                  <StarFilled style={{ fontSize: '10px', margin: 'auto' }} />
                </Text>
                <div>{data?.name.replace('Plan', '')}</div>
              </Flex>
            </Menu.Item>
          );
        })}
    </Menu>
  );
  const handlePayment = () => {
    if (paymentDetails?.id) {
      dispatch(
        payOption(
          accountId,
          brand?.id,
          paymentDetails?.id,
          priceValidation?.billing_info?.billing_id
        )
      );
    }
  };

  return (
    <div style={{ display: 'block', marginTop: '10px', height: '530px' }}>
      {plan !== 'Enterprise Plan' ? (
        <>
          <Flex spaceBetween style={{ margin: '40px 0px 40px 0px' }}>
            <Flex>
              <Flex>
                <Star />
                <span style={{ marginLeft: '15px' }}>Plan</span>
              </Flex>
              <Text plan={plan}>
                <StarFilled style={{ marginTop: '5px' }} />
                <span style={{ fontSize: '14px', fontWeight: 700 }}>
                  {plan}
                </span>
              </Text>
            </Flex>
            <Flex>
              <Dropdown
                overlay={menu}
                trigger={['click']}
                onClick={e => e.preventDefault()}
                style={{ margin: '0px' }}
              >
                <Space>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#4aacea',
                      cursor: 'pointer',
                    }}
                  >
                    Change
                  </span>
                  <DownOutlined
                    style={{
                      fontSize: '16px',
                      color: '#4aacea',
                      marginTop: '3px',
                    }}
                  />
                </Space>
              </Dropdown>
            </Flex>
          </Flex>
          <Divider />
          <div style={{ height: '370px' }}>
            <div style={{ height: '250px' }}>
              <Flex spaceBetween style={{ marginBottom: '15px' }}>
                <Flex>
                  <Dollar /> &nbsp;
                  <Flex column>
                    <Box>Subtotal</Box>
                    <Box>(GST Included)</Box>
                  </Flex>
                </Flex>

                <span>
                  {paymentDetails?.country_code}
                  {paymentDetails?.price.toLocaleString('en-US')}
                </span>
              </Flex>
              {/* <Flex spaceBetween>
          <Flex>
            <Dollar /> &nbsp;<Box>GST</Box>
          </Flex>
          <span>₹0.00</span>
        </Flex> */}
            </div>
            <Divider />
            <Flex spaceBetween>
              <Flex>
                <Bill /> &nbsp;<Box>Total Bill:</Box>
              </Flex>
              <span style={{ color: '#00AC4F', fontWeight: '700' }}>
                {paymentDetails?.country_code}
                {paymentDetails?.price.toLocaleString('en-US')}
              </span>
            </Flex>
            <B.UpgardePlanButton
              onClick={handlePayment}
              style={{
                width: '100%',
                marginTop: '30px',
                height: '52px',
                borderRadius: '10px',
              }}
            >
              <Box style={{ justifyContent: 'center', display: 'flex' }}>
                <Shield /> <span style={{ marginLeft: '5px' }}>Pay Now</span>
              </Box>
            </B.UpgardePlanButton>
          </div>
          <Divider />
          <p style={{ fontSize: '14px' }}>
            Payments are AES-256 - bit encrypted. It’s 100% safe with us.
          </p>
        </>
      ) : (
        <>
          <Flex
            center
            alignCenter
            column
            style={{ height: '400px', width: '100%' }}
          >
            <img
              src={enterprise}
              width="263.7px"
              height="219.29px"
              alt="no image"
              style={{ margin: 'auto' }}
            />
            <Message>For More Details, Please</Message>
            <B.UpgardePlanButton
              style={{
                width: '100%',
                marginTop: '30px',
                height: '52px',
                borderRadius: '10px',
              }}
              onClick={() =>
                window.open('https://www.aptonshops.com/pricing.html', '_blank')
              }
            >
              <PhoneFilled style={{ color: 'white' }} />
              Contact Us
            </B.UpgardePlanButton>
          </Flex>
        </>
      )}
    </div>
  );
};

export default OrderSummery;
