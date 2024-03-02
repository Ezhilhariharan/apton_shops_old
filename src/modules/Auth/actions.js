import request from '@utils/request';
import initializeApp from '@utils/initializeApp';
import { notification } from 'antd';
import authSelector from '../Auth/selectors';
import parentSelector from '../../selectors';
import { updateBrandCoverPhoto } from '../../actions';
import styled from 'styled-components';
import { updateButtons } from '../SocialMedia/actions';

// constants
export const UPDATE_ONBOARDING_STEPS = 'UPSATE_ONBOARDING_STEPS';
export const UPDATE_AUTH_TOKEN = 'UPDATE_AUTH_TOKEN';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const ONBOARTING_STEP1 = 'ONBOARTING_STEP1';
export const ONBOARTING_STEP2 = 'ONBOARTING_STEP2';
export const UPDATE_SIGNUP_STATUS = 'UPDATE_SIGNUP_STATUS';
export const BRAND_CATEGORY_LIST = 'BRAND_CATEGORY_LIST';
export const COUNTRY_LIST = 'COUNTRY_LIST';
export const UPDATE_LOGIN_STATUS = ' UPDATE_LOGIN_STATUS';
export const UPDATE_BRAND_INFO = 'UPDATE_BRAND_INFO';
export const SELECT_BRAND = 'SELECT_BRAND';
export const UPDATE_PRICING_VALIDATION = 'UPDATE_PRICING_VALIDATION';
export const RESET_EMAIL = 'RESET_EMAIL';
// funtions

export const updatePricingValidation = value => ({
  type: UPDATE_PRICING_VALIDATION,
  value,
});

export const getResetEmailInfo = value => ({
  type: RESET_EMAIL,
  value,
});

export const setOnboardingStep = value => ({
  type: UPDATE_ONBOARDING_STEPS,
  value,
});

export const setUpdateAuthToken = token => ({
  type: UPDATE_AUTH_TOKEN,
  token,
});

export const updateUserInfo = userInfo => ({
  type: UPDATE_USER_INFO,
  userInfo,
});

export const updateOnboardingSteps = value => async dispatch => {
  if (value || value === 0) {
    dispatch(setOnboardingStep(value));
  }
};

export const updateStepOneValues = value => ({
  type: ONBOARTING_STEP1,
  value,
});

export const updatedStepTwoValues = value => ({
  type: ONBOARTING_STEP2,
  value,
});

export const updateSignUpStatus = value => ({
  type: UPDATE_SIGNUP_STATUS,
  value,
});

export const updateCategoryList = list => ({
  type: BRAND_CATEGORY_LIST,
  list,
});

export const updateCountryList = countryList => ({
  type: COUNTRY_LIST,
  countryList,
});

export const updateBrandInfo = brandInfo => ({
  type: UPDATE_BRAND_INFO,
  brandInfo,
});

export const updateSelectedBrand = brand => ({
  type: SELECT_BRAND,
  brand,
});

//  Actions
export const signUpAttempt = (values, navigate) => async dispatch => {
  try {
    let response = await request.post(`/api/user/signup`, {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
      password_confirmation: values.password_confirmation,
      contact_number: values.contact_number,
    });
    if (
      response?.data.status === 2 &&
      response?.data.msg === 'User created successfully'
    ) {
      notification.success({
        message: '',
        description: 'Account Created Successfully',
      });
      dispatch(upDateAuthToken(response?.data?.token));
      initializeApp(response?.data?.token);
      localStorage.setItem('authToken', response?.data?.token);
      dispatch(updateSignUpStatus(response?.data));
      dispatch(getCurrentUserInfo());
      dispatch(updateOnboardingSteps(1));
      navigate('/onboarding');
    }
  } catch (error) {
    if (error?.response?.data?.error) {
      notification.error({
        description: error?.response?.data?.error,
      });
    }
    console.log('error', error);
  }
};

// update Auth Token
export const upDateAuthToken = token => async dispatch => {
  dispatch(setUpdateAuthToken(token));
};

// user signup via username and password
export const signInAttempt = (values, navigate) => async dispatch => {
  try {
    const response = await request.post(`/api/user/login`, values);
    if (response.status === 200) {
      dispatch(upDateAuthToken(response?.data?.auth_token));
      initializeApp(response?.data?.auth_token);
      dispatch(updateButtons('create'));
      dispatch(getCurrentUserInfo());
      // dispatch(pricingValidation());
      if (response.data.status === 2) {
        dispatch(updateOnboardingSteps(1));
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  } catch (error) {
    if (error?.response?.data?.error) {
      notification.error({
        description: error?.response?.data?.error,
      });
    }
    console.log('signin', error);
  }
};
export const pricingValidation =
  (account_id, brand_id) => async (dispatch, getState) => {
    try {
      let response = await request.get(
        `/api/plan_details?brand_id=${brand_id}&account_id=${account_id}`
      );
      if (response.status === 200) {
        dispatch(updatePricingValidation(response.data));
      }
    } catch (error) {
      dispatch(updatePricingValidation(error.response.data));
      console.log('pricingValidation', error);
    }
  };
//  brand create steps
export const onboardingInitiate =
  (onboardingStepOneValues, value, navigate, setOpen) =>
  async (dispatch, getState) => {
    const state = getState();
    const token = authSelector.getAuthToken(state);
    try {
      let response = await request.post(
        `/api/onboarding_initiate`,
        {
          brand_name: onboardingStepOneValues?.brand_name,
          brand_type_name: value?.other_category || value?.brand_id,
          country_id: value?.location_id,
          logo_photo: onboardingStepOneValues?.logo_photo,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (response.data.status === 10) {
        notification.success({
          message: '',
          description: 'Your are onboarded successFully!',
        });
        dispatch(updateOnboardingSteps(0));
        dispatch(getCurrentUserInfo());
        navigate('/dashboard');
        setOpen && setOpen(false);
        dispatch(updateBrandCoverPhoto(''));
      }
    } catch (error) {
      if (error?.response?.data?.error) {
        notification.error({
          description: error?.response?.data?.error,
        });
      }
      console.log('onboarding', error);
    }
  };

// get all country details
export const fetchCountryList = () => async dispatch => {
  try {
    let response = await request.get(`/api/brand/countries`);
    if (response.status === 200) {
      dispatch(updateCountryList(response.data));
    }
  } catch (error) {
    console.log('fetching country list', error);
  }
};

// get categories
export const fetchBrandCategoryList = () => async dispatch => {
  try {
    let response = await request.get(`/api/brand/brand_types?limit=1000`);
    if (response.status === 200) {
      dispatch(updateCategoryList(response.data));
    }
  } catch (error) {
    console.log('fetching catagory list', error);
  }
};

//  forgotpassword request
export const requestForgotPassword = (value, form, navigate) => async () => {
  try {
    let response = await request.post(`/api/user/forgot_password`, value);
    if (response.status === 200) {
      navigate('/reset-password');
      notification.success({
        message: (
          <div style={{ fontSize: '15px', textAlign: 'center' }}>
            {`Check your email, we sent a password reset link to ${value.email}`}{' '}
          </div>
        ),
      });
      form.resetFields();
    }
    if (response.status === 422) {
      notification.error({
        message: response.data.msg,
      });
    }
  } catch (error) {
    if (error?.response?.data?.error) {
      notification.error({
        description: error?.response?.data?.error,
      });
    }
    console.log('forgot password request', error);
  }
};

// curent user info
export const getCurrentUserInfo = () => async dispatch => {
  try {
    let response = await request.get(`/api/current_user_info`);
    if (response.data) {
      dispatch(updateUserInfo(response?.data));
      dispatch(
        pricingValidation(
          response?.data?.account?.id,
          response?.data?.brands[0]?.id
        )
      );
    }
  } catch (error) {
    if (error?.response?.data?.error) {
      notification.error({
        description: error?.response?.data?.error,
      });
    }
    console.log('getCurrentUserInfo', error);
  }
};

// brand info

export const getBrandInfoAPI = brand_slug => async dispatch => {
  try {
    if (brand_slug) {
      let response = await request.get(`/api/brand/${brand_slug}/brand_json`);
      if (response.data) {
        dispatch(updateBrandInfo(response?.data?.data));
      }
    }
  } catch (error) {
    console.log('getCurrentUserInfo', error);
  }
};

export const changePassword =
  (values, token, form, navigate) => async dispatch => {
    try {
      if (token) {
        const passwordChange = await request.post(`api/user/change_password`, {
          reset_password_token: token,
          password: values?.password,
          password_confirmation: values?.confirm_password,
        });
        if (passwordChange?.status === 200) {
          form.resetFields();
          navigate('/login');
          notification.success({
            description: 'Password has been changed successfully',
          });
        }
      }
    } catch (error) {
      console.log('change passowrd', error);
    }
  };
