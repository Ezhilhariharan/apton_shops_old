import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Badge, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { saveActiveButton } from '../../../NewIntegration/actions';
import { useDispatch } from 'react-redux';
import Flex from '@components/common/Flex';

const StyledCard = styled('div')`
  margin: 10px auto 10px auto;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 95%;
  overflow: hidden;
  .ant-card-body {
    padding: 0px;
  }
`;
const Socialtext = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #181818;
  margin-left: 5px;
  width: 100%;
`;
const Status = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  // background-color: green;
`;
const Body = styled('div')`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  .left {
    //   border:1px solid red;
    display: flex;
    width: 60%;
    height: 100%;
    align-items: center;
    cursor: pointer;
    margin: 0 0 0 10px;
  }
  .right {
    width: 40%;
    height: 100%;
    display: flex;
    padding: 0px;
    align-items: center;
    justify-content: center;
  }
`;
const Wrapper = styled('div')`
  width: 100%;
  overflow: hidden;
`;
const Divider = styled('div')`
  width: 80%;
  height: 1px;
  background-color: rgba(79, 92, 128, 0.15);
`;

export const displayString = str => {
  if (str?.length > 15) {
    return str?.slice(0, 15) + '...';
  } else {
    return str;
  }
};
const CreateSideBar = ({ buttonstate, tabletOnly, item }) => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reDirect = (data, value) => {
    data?.group_link && window.open(data?.group_link, '_blank');
    data?.page_link && window.open(data?.page_link, '_blank');
    data?.profile_link && window.open(data?.profile_link, '_blank');
  };
  const connectAccount = name => {
    let setName;
    if (name === 'Linkedin Pages') setName = 'LinkedIn';
    else if (name === 'Facebook Groups' || name === 'Facebook')
      setName = 'Facebook';
    else setName = name;

    dispatch(saveActiveButton(setName));
    navigate('/integration');
  };
  const name = item?.apiData?.configuration?.page_name
    ? item?.apiData?.configuration?.page_name
    : item?.apiData?.configuration?.group_name
    ? item?.apiData?.configuration?.group_name
    : item?.apiData?.configuration?.user_name
    ? item?.apiData?.configuration?.user_name
    : item?.apiData?.platform_name;
  const displayString = str => {
    if (str?.length > 15) {
      return str?.slice(0, 15) + '...';
    } else {
      return str;
    }
  };

  const usePageName = item?.apiData?.configuration?.page_name
    ? item?.apiData?.configuration?.page_name
    : item?.apiData?.configuration?.group_name
    ? item?.apiData?.configuration?.group_name
    : item?.apiData?.configuration?.user_name
    ? item?.apiData?.configuration?.user_name
    : item?.apiData?.platform_name;
  const linkedinPage = item?.apiData?.configuration?.first_name
    ? `${item?.apiData?.configuration?.first_name} ${item?.apiData?.configuration?.last_name}`
    : item?.apiData?.platform_name;
  return (
    <Wrapper key={item?.id}>
      <StyledCard
        style={{
          border: value === item?.id ? '1px solid #4aacea' : '',
        }}
      >
        <Body
          style={{
            display: tabletOnly ? 'flex' : 'flex',
          }}
        >
          <div
            className="left"
            onClick={() => reDirect(item?.apiData?.configuration)}
          >
            <div>
              {item?.title == 'Linkedin Pages' ? (
                <img
                  src={require(`../../../../assets/images/${item?.icon}.svg`)}
                  width={31}
                  height={31}
                />
              ) : (
                <img
                  src={require(`../../../../assets/images/${item?.icon}.png`)}
                  width={31}
                  height={31}
                />
              )}
            </div>
            {item?.title == 'Linkedin' ? (
              <Tooltip
                placement="top"
                title={linkedinPage?.length > 15 && linkedinPage}
              >
                <Socialtext>{displayString(linkedinPage)}</Socialtext>
              </Tooltip>
            ) : (
              <Tooltip
                placement="top"
                title={usePageName?.length > 15 && usePageName}
              >
                <Socialtext>{displayString(usePageName)}</Socialtext>
              </Tooltip>
            )}
          </div>
          <div className="right">
            {parseInt(item?.apiData?.connection_status) == 0 && (
              <Status
                style={{
                  color: '#4aacea',
                  cursor: 'pointer',
                }}
                onClick={() => connectAccount(item?.title)}
              >
                {item?.status}
              </Status>
            )}
            {parseInt(item?.apiData?.connection_status) == 1 && (
              <Status
                style={{
                  color: 'green',
                }}
              >
                <Badge status="success" />
                &nbsp;{item?.Connectstatus}
              </Status>
            )}
          </div>
        </Body>
      </StyledCard>
      <Flex center>
        <Divider />
      </Flex>
    </Wrapper>
  );
};

export default CreateSideBar;
