import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Radio, Typography, Badge, notification, Checkbox,Tooltip } from 'antd';
import Success from '@components/icons/Success';
import { FailedImage } from '@components/icons/FailedImage';
import { useNavigate } from 'react-router-dom';
import PinterestIcon from '@components/icons/PinterestIcon';
import { displayString } from './CreateSideBar';
import { useDispatch } from 'react-redux';
import { saveActiveButton } from "../../../../modules/NewIntegration/actions";


const StyledCard = styled(Card)`
  margin: 0px auto 25px auto;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
    height: 60px;
       width:95%;
  overflow:hidden;
    .ant-card-body {
    padding:0px;
  }
`;
const Socialtext = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px; 
  color: #181818;
  margin-left: 5px;
  width:100%; 
  `;
const Status = styled(Typography)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  // background-color: green;
`;
const Body = styled("div")`
width: 100%;
height: 60px;
align-items: center;
justify-content: center;
.left{
  width:12%;
  height:100%;
   display:flex;
  align-items: center;
  justify-content: center;
};
.middle{
  display:flex;
  width:55%;
    height:100%;
  align-items: center;
  cursor: pointer;
  };
.right{
  width:33%;
  height:100%;
  display:flex;
  padding:0px;
  align-items: center;
  justify-content: center;
 };
`;
const SideBar = ({ buttonstate, tabletOnly, item }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const reDirect = (data, value) => {
    data?.group_link && (window.open(data?.group_link, "_blank"))
    data?.page_link && (window.open(data?.page_link, "_blank"))
    data?.profile_link && (window.open(data?.profile_link, "_blank"))
  }
  const connectAccount = (name) => {
    let setName;
    if (name === "Linkedin Pages") setName = "LinkedIn"
    else if (name === "Facebook Groups" || name === "Facebook") setName = "Facebook"
    else setName = name

    dispatch(saveActiveButton(setName))
    navigate("/integration")
  }
  const usePageName=item?.apiData?.configuration?.page_name ? item?.apiData?.configuration?.page_name
  : item?.apiData?.configuration?.group_name ? item?.apiData?.configuration?.group_name
    : item?.apiData?.configuration?.user_name ? item?.apiData?.configuration?.user_name
      : item?.apiData?.platform_name
  const linkedinPage = item?.apiData?.configuration?.first_name ? `${item?.apiData?.configuration?.first_name} ${item?.apiData?.configuration?.last_name}` : item?.apiData?.platform_name

  return (
      <StyledCard
        style={{
          border: value === item?.id ? '1px solid #4aacea' : '',
        }}
        key={item?.id}
      >
        <Body
          style={{
            display: tabletOnly ? 'flex' : 'flex',
          }}
        >
          <div className='left'>
            <Checkbox checked={item?.checked} value={item?.title} disabled={parseInt(item?.apiData?.connection_status) == 0 ? true : false} ></Checkbox>
          </div>
          <div className='middle' onClick={() => reDirect(item?.apiData?.configuration)}>
            <div >
              {item?.title == "Linkedin Pages" ?
                <img src={require(`../../../../assets/images/${item?.icon}.svg`)} width={31} height={31} />
                :
                <img src={require(`../../../../assets/images/${item?.icon}.png`)} width={31} height={31} />
              }
            </div>
            {
              item?.title == "Linkedin" ?
              <Tooltip placement='top'  title={linkedinPage?.length>15 && linkedinPage} >
              <Socialtext>{displayString(linkedinPage)}</Socialtext>
              </Tooltip>
                  :
                  <Tooltip placement='top'  title={usePageName?.length>15 &&usePageName} >
                      <Socialtext>{displayString(usePageName)}</Socialtext>
                  </Tooltip>
            }
          </div>
          <div className='right'>
            {parseInt(item?.apiData?.connection_status) == 0 && (
              <Status
                style={{
                  color: '#4aacea',
                  cursor: "pointer"
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
  );
};

export default SideBar;
