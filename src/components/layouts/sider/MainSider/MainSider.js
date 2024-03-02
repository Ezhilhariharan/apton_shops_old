import React, { useMemo, useState } from 'react';
import Overlay from '../../../common/Overlay';
import { useResponsive } from '../../../../hooks/useResponsive';
import * as S from './MainSider.styles';
import { SiderLogo } from '../SiderLogo';
import SiderMenu from '../SiderMenu/SiderMenu';
import SettingsIcon from '../../../icons/SettingsIcon';
import LogoutIcon from '../../../icons/LogoutIcon';
import { FlexBox } from '../../../../modules/Integration/component/Integration.styles';
import { useNavigate } from 'react-router-dom';
import Logout from '../../../../modules/Auth/components/partials/Logout/Logout';
import { Space, Popover, Avatar, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { getRandomColor } from '../../../../modules/Inbox/components/Partials/SideChat';
import styled from 'styled-components';
import Flex from '@components/common/Flex';

const Pop = styled(Popover)`
  .ant-popover {
    display: none !important;
  }
`;
const MainSider = ({
  isCollapsed,
  setCollapsed,
  selectedBrandUser,
  updateOnboardingSteps,
  upDateAuthToken,
  authToken,
  ...props
}) => {
  const { isDesktop, mobileOnly, tabletOnly } = useResponsive();
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const isCollapsible = useMemo(
    () => mobileOnly && tabletOnly,
    [mobileOnly, tabletOnly]
  );
  const navigate = useNavigate();
  const settingsPathName = window?.location?.pathname;
  const toggleSider = () => setCollapsed(!isCollapsed);
  const userInfo = useSelector(state => state.authSelector.cusrentUser);
  const name =
    userInfo?.first_name?.charAt(0).toUpperCase() ||
    userInfo?.last_name?.charAt(0).toUpperCase();

  return (
    <>
      <S.Sider
        trigger={null}
        collapsed={!isDesktop && isCollapsed}
        collapsedWidth={tabletOnly ? 80 : 0}
        collapsible={isCollapsible}
        width={260}
        {...props}
        style={{
          background: '#FFFF',
          boxShadow: '-10px 0px 10px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <SiderLogo
          isSiderCollapsed={isCollapsed}
          toggleSider={toggleSider}
          selectedBrandUser={selectedBrandUser}
          authToken={authToken}
        />
        <S.SiderContent>
          <SiderMenu setCollapsed={setCollapsed} />
        </S.SiderContent>
        {tabletOnly ? (
          <S.LogoutWrapper mobile={mobileOnly} tablet={tabletOnly}>
            <Space size="middle" style={{ marginLeft: '10px' }}>
              <div className="accountButton">
                {openSettings && (
                  <S.Popcont>
                    <Flex className="avatar">
                      <Avatar
                        size={'medium'}
                        style={{
                          backgroundColor: getRandomColor(name),
                          marginRight: '5px',
                        }}
                      >
                        <p style={{ textAlign: 'center' }}> {name}</p>
                      </Avatar>
                      <div className="active"></div>
                      <span className="name">
                        {userInfo?.first_name
                          ? userInfo?.first_name
                          : userInfo?.last_name}
                      </span>
                    </Flex>
                    <Divider
                      style={{
                        margin: '5px 0px',
                        padding: '0px',
                        border: '1px solid #D9D9D9',
                      }}
                    />
                    <S.SetPath name="/" settingsPathName={settingsPathName}>
                      <span
                        onClick={() => setOpen(true)}
                        style={{ cursor: 'pointer' }}
                      >
                        Log out
                      </span>
                    </S.SetPath>
                    <S.SetPath
                      name="/settings"
                      settingsPathName={settingsPathName}
                    >
                      <span
                        onClick={() => {
                          navigate('/settings');
                          setOpenSettings(false);
                        }}
                        style={{ cursor: 'pointer' }}
                        settingsPathName={settingsPathName}
                      >
                        My Settings
                      </span>
                    </S.SetPath>
                  </S.Popcont>
                )}
                <SettingsIcon
                  onClick={() => setOpenSettings(!openSettings)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </Space>
          </S.LogoutWrapper>
        ) : (
          <S.LogoutWrapper mobile={mobileOnly} tablet={tabletOnly}>
            <Space size="middle" style={{ marginLeft: '20px' }}>
              <div className="marginLeftForLogout">
                <S.LogoutButton
                  className="marginBottomButton"
                  onClick={() => setOpen(true)}
                >
                  <LogoutIcon />
                </S.LogoutButton>
              </div>
              <div className="accountButton">
                <S.SettingsButton
                  onClick={() => navigate('/settings')}
                  className="marginBottomButton"
                  settingsPathName={settingsPathName}
                >
                  <SettingsIcon />
                </S.SettingsButton>
              </div>
            </Space>
          </S.LogoutWrapper>
        )}
      </S.Sider>
      {mobileOnly && <Overlay onClick={toggleSider} show={!isCollapsed} />}
      <Logout
        open={open}
        setOpen={setOpen}
        setOpenSettings={setOpenSettings}
        updateOnboardingSteps={updateOnboardingSteps}
        upDateAuthToken={upDateAuthToken}
      />
    </>
  );
};
export default MainSider;
