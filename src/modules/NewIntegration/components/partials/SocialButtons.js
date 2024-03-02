import { Button, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { socialMedia } from '../data/socialMedia';
import { saveActiveButton } from '../../actions';
import TwitterIcon from '../../../../components/icons/TwitterIcon';
import { twitterActive } from '../../actions';

const ButtonWrapper = styled.div`
  margin-right: 12.5%;
`;
const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  background-color: #ffffff !important;
  border-radius: 10px;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  ${props =>
    props.isactive &&
    `
        border-bottom: 3px solid #4AACEA;
        box-shadow: 0px 5px 10px rgba(79, 92, 128, 0.15);
    `}
  .textFont {
    color: #4d4d4d;
    font-weight: 700;
    font-size: 18px;
  }
  .iconMargin {
    margin-right: 3.125%;
    margin-left: 5%;
  }
`;
const Wrapper = styled.div`
  .dividerMargin {
    margin-top: 18px;
    margin-bottom: 18px;
  }
`;

const SocialButtons = () => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState([]);
  const activeButton = useSelector(
    state => state.integrationSelector.active,
    shallowEqual
  );
  const handleActive = active => {
    dispatch(saveActiveButton(active.title));
    localStorage.setItem('activeButton', active.title);
  };
  const brand = useSelector(
    state => state?.parentReducer?.switchedBrand,
    shallowEqual
  );

  const linkedinStatus = useSelector(
    state => state?.authSelector?.pricingValidationObj
  );
  const status = useSelector(state => state?.integrationSelector?.activeStatus);

  // useEffect(() => {
  //   dispatch(twitterActive(true));
  // }, [linkedinStatus]);
  // useEffect(() => {
  //   dispatch(twitterActive(false));
  //   if (linkedinStatus?.twitter_post && status) {
  //     socialMedia?.push({
  //       id: 6,
  //       icon: TwitterIcon,
  //       title: 'Twitter',
  //     });
  //   }
  // }, [status]);

  useEffect(() => {
    mergingData();
  }, [socialMedia, brand]);

  const mergingData = () => {
    let merging = [];
    socialMedia?.map(data => {
      data?.title === 'Twitter'
        ? merging?.push({
            ...data,
            activeStatus: linkedinStatus?.twitter_post,
          })
        : merging.push({ ...data });
    });
    setAccounts(merging);
  };

  const updatedArray = [];
  let twitterData = null;

  accounts?.forEach(item => {
    if (item?.title === 'Twitter') {
      if (item?.activeStatus) {
        twitterData = item;
      }
    } else {
      updatedArray?.push(item);
    }
  });

  if (twitterData !== null) {
    updatedArray?.push(twitterData);
  }

  return (
    <>
      <Wrapper>
        <Divider className="dividerMargin" />
        {updatedArray?.map(data => {
          let Icon = data.icon;
          return (
            <ButtonWrapper key={data.id}>
              <StyledButton
                onClick={() => handleActive(data)}
                isactive={activeButton === data.title}
              >
                <span className="iconMargin">
                  <Icon />
                </span>
                <span className="textFont">{data?.title}</span>
              </StyledButton>
              <Divider className="dividerMargin" />
            </ButtonWrapper>
          );
        })}
      </Wrapper>
    </>
  );
};

export default SocialButtons;
