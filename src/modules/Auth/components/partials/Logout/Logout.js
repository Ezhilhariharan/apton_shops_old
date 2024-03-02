import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import { UpgardePlanButton } from '../../../../SettingsPage/components/index.styles';
import request from '@utils/request';
import { updateBrandSwitching } from '../../../../../actions';
import {
  updateUserInfo,
  updatePricingValidation,
} from '../../../../Auth/actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { updateButtons } from '../../../../SocialMedia/actions';

const TextStyle = styled('div')`
  font-size: 16px;
  color: ${lightColorsTheme.textColorLight};
  font-weight: 700;
  margin: 26px 0 36px 110px;
`;
const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 480px !important;
    height: 220px !important;
    border-radius: 20px !important;
  }
  .ant-modal-footer {
    border: none;
  }
  .spaceFlex {
    display: flex;
    justify-content: space-between;
  }
`;
const CustomCancelButton = styled(Button)`
  margin-left: 25px;
  width: 168px;
  height: 51px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background-color: ${lightColorsTheme.additionalBackground};
  color: ${lightColorsTheme.grayText};
  &:focus,
  &:hover {
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    background-color: ${lightColorsTheme.additionalBackground};
    color: ${lightColorsTheme.grayText};
  }
`;
const LogoutButton = styled(UpgardePlanButton)`
  width: 171px;
  height: 51px;
  margin-right: 25px;
  border-radius: 10px;
`;
const Logout = ({
  open,
  setOpen,
  setOpenSettings,
  updateOnboardingSteps,
  upDateAuthToken,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      setOpenSettings(false);
    }
  }, [open]);
  const handleLogout = () => {
    const url = '/api/logout';
    const token = localStorage.getItem('authToken');
    const res = request.post(url, { headers: { Authorization: token } });
    res
      .then(data => {
        if (data?.status === 200) {
          localStorage.setItem('brandIndex', 0);
          upDateAuthToken(null);
          dispatch(updateButtons('Create'));
          localStorage.removeItem('authToken');
          localStorage.removeItem('Create');
          updateOnboardingSteps(0);
          navigate('/');
          updateBrandSwitching('');
          updateUserInfo('');
          updatePricingValidation('');
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <StyledModal
        open={open}
        centered
        closeIcon={<CloseOutlined onClick={() => setOpen(false)} />}
        footer={
          <div className="spaceFlex">
            <CustomCancelButton onClick={handleCancel}>
              Cancel
            </CustomCancelButton>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </div>
        }
      >
        <TextStyle>Do you really want to log out?</TextStyle>
      </StyledModal>
    </>
  );
};

export default Logout;
