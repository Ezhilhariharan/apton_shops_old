import request from '@utils/request';
import authSelector from '../Auth/selectors';
import {
  getCurrentUserInfo,
  getBrandInfoAPI,
  updateBrandInfo,
} from '../Auth/actions';
import { notification } from 'antd';
import { pricingValidation } from '../Auth/actions';
import { useNavigate } from 'react-router-dom';

export const UPDATE_SELECTED_TEXT = 'UPDATE_SELECTED_TEXT';
//export const UPDATE_BRAND_INFO = 'UPDATE_BRAND_INFO';
export const SAVE_IMAGE_URL = 'SAVE_IMAGE_URL';
//export const UPDATE_ACCOUNT_INFO = 'UPDATE_ACCOUNT_INFO';
export const UPDATE_COUNTRY = 'UPDATE_COUNTRY';
export const UPDATE_PROVINCE = 'UPDATE_PROVINCE';
export const UPDATE_CITY = 'UPDATE_CITY';
export const ACCOUNT_COUNTRTY = 'ACCOUNT_COUNTRTY';
export const ACCOUNT_PROVINCE = 'ACCOUNT_PROVINCE';
export const ACCOUNT_CITY = 'ACCOUNT_CITY';
export const SELECTED_CURRENT_USER = 'SELECTED_CURRENT_USER';
export const UPDATE_FIELDS = 'UPDATE_FIELDS';
export const PLANS_LIST = 'PLANS_LIST';
export const PLANS_INFO = 'PLANS_INFO';
export const PAY_NOW = 'PAY_NOW';
export const PAYMENT_INFO = 'PAYMENT_INFO';
export const BILLING_HISTORY = 'BILLING_HISTORY';

export const updateAccountCountry = accountCountry => ({
  type: ACCOUNT_COUNTRTY,
  accountCountry,
});

export const updateAccountProvince = accountProvince => ({
  type: ACCOUNT_PROVINCE,
  accountProvince,
});

export const updateAccountCity = accountCity => ({
  type: ACCOUNT_CITY,
  accountCity,
});

export const updateSelectedText = selectedText => ({
  type: UPDATE_SELECTED_TEXT,
  selectedText,
});

export const updateSelectedCurrentUser = selectedUser => ({
  type: SELECTED_CURRENT_USER,
  selectedUser,
});

export const saveImageUrl = imageUrl => ({
  type: SAVE_IMAGE_URL,
  imageUrl,
});

export const updateTextFields = details => ({
  type: UPDATE_FIELDS,
  details,
});

export const saveText = value => async dispatch => {
  if (value) {
    dispatch(updateSelectedText(value));
  }
};

export const saveSelectedCurrentUser = user => async dispatch => {
  if (user) {
    dispatch(updateSelectedCurrentUser(user));
  }
};

// export const updateAccount = accountInfo => ({
//     type: UPDATE_ACCOUNT_INFO,
//     accountInfo,
// });

export const updateCountry = country => ({
  type: UPDATE_COUNTRY,
  country,
});

export const updateProvince = province => ({
  type: UPDATE_PROVINCE,
  province,
});

export const updateCity = city => ({
  type: UPDATE_CITY,
  city,
});

export const updatePlansList = details => ({
  type: PLANS_LIST,
  details,
});
export const updatePlanInfo = details => ({
  type: PLANS_INFO,
  details,
});
export const updatePayOption = details => ({
  type: PAY_NOW,
  details,
});
export const updatePaymentInfo = details => ({
  type: PAYMENT_INFO,
  details,
});
export const updateBillingHistory = details => ({
  type: BILLING_HISTORY,
  details,
});
export const brandUpdate = (value, brand_slug, image) => async dispatch => {
  const website_url = value?.brand_link;
  const brand_name = value?.brand_name;
  const contact_number = value?.brand_phone_number;
  const contact_email = value?.brand_email;
  const city_id = value?.city;
  const country_id = value?.country;
  const province_id = value?.state;
  const postal_code = value?.postal_code;
  const brand_address = value?.brand_location;
  const applyToAll = value?.applyToAllBrand;
  try {
    const response = await request.put(
      `/api/brand/update/${brand_slug}`,
      applyToAll === undefined
        ? {
            name: brand_name && brand_name,
            website_url: website_url && website_url,
            contact_number: contact_number && contact_number,
            contact_email: contact_email && contact_email,
            file_path: image && image,
            file_type: image && 'logo_photo',
            country_id: country_id && parseInt(country_id),
            province_id: province_id && parseInt(province_id),
            city_id: city_id && parseInt(city_id),
            postal_index_code: postal_code && parseInt(postal_code),
            address_line_1: brand_address && brand_address,
          }
        : applyToAll === 0
        ? {
            name: brand_name && brand_name,
            website_url: website_url && website_url,
            contact_number: contact_number && contact_number,
            contact_email: contact_email && contact_email,
            file_path: image && image,
            file_type: image && 'logo_photo',
            country_id: country_id && parseInt(country_id),
            province_id: province_id && parseInt(province_id),
            city_id: city_id && parseInt(city_id),
            postal_index_code: postal_code && parseInt(postal_code),
            address_line_1: brand_address && brand_address,
          }
        : {
            name: brand_name && brand_name,
            website_url: website_url && website_url,
            contact_number: contact_number && contact_number,
            contact_email: contact_email && contact_email,
            file_path: image && image,
            file_type: image && 'logo_photo',
            country_id: country_id && parseInt(country_id),
            province_id: province_id && parseInt(province_id),
            city_id: city_id && parseInt(city_id),
            postal_index_code: postal_code && parseInt(postal_code),
            address_line_1: brand_address && brand_address,
            is_apply_all: applyToAll === false ? 0 : 1,
          }
    );
    if (response.status === 200) {
      dispatch(getCurrentUserInfo());
      dispatch(saveImageUrl(''));
      //dispatch(getBrandInfoAPI(brand_slug));
      notification.success({
        message: '',
        description: 'Brand information saved successfully',
      });
    }
  } catch (error) {
    notification.error({
      description: error?.response?.data?.error,
    });
    console.log('brand update', error);
    notification.error({
      message: '',
      description: error,
    });
  }
};

export const uploadBrandLogo =
  (fileName, filePath) => async (dispatch, getState) => {
    const state = getState();
    const token = authSelector.getAuthToken(state);
    try {
      const response = await request.post(
        `/api/file_upload`,
        {
          file_name: fileName && fileName,
          file_path: filePath && filePath,
        },
        { headers: { Authorization: token } }
      );
      if (response.status === 200) {
        dispatch(saveImageUrl(response.data));
        //dispatch(getCurrentUserInfo())
      }
    } catch (error) {
      console.log('brand logo', error);
    }
  };

export const accountUpdate =
  (value, account_id, locationInfo) => async dispatch => {
    const companyName = value?.companyName;
    const firstName = value?.firstName;
    const lastName = value?.lastName;
    const contactNumber = value?.phoneNumber;
    const newPassword = value?.changePassword;
    const confirmPassword = value?.confirmPassword;
    const city_id = locationInfo?.city;
    const country_id = locationInfo?.country;
    const province_id = locationInfo?.province;
    const postal_code = value?.postal_code;
    const brand_address = value?.location;
    try {
      const response = await request.put(`/api/account/${account_id}`, {
        first_name: firstName && firstName,
        last_name: lastName && lastName,
        name: companyName && companyName,
        contact_number: contactNumber && contactNumber,
        password: newPassword && newPassword,
        confirm_password: confirmPassword && confirmPassword,
        country_id: country_id && parseInt(country_id),
        province_id: province_id && parseInt(province_id),
        city_id: city_id && parseInt(city_id),
        postal_index_id: postal_code && parseInt(postal_code),
        address_line_1: brand_address && brand_address,
      });
      if (response.status === 200) {
        dispatch(getCurrentUserInfo());
        notification.success({
          message: '',
          description: 'Account information saved successfully',
        });
      }
    } catch (error) {
      notification.error({
        description: error?.response?.data?.error,
      });
      console.log('account update', error);
    }
  };

export const getCountries = pageName => async dispatch => {
  try {
    const response = await request.get('/api/countries?limit=100');
    if (response.status === 200) {
      if (pageName === 'brandPage') {
        dispatch(updateCountry(response?.data?.data));
      } else {
        dispatch(updateAccountCountry(response?.data?.data));
      }
    }
  } catch (error) {
    console.log('country api', error);
  }
};

export const getProvince = (countryId, pageName) => async dispatch => {
  dispatch(updateAccountProvince([]));
  try {
    const response = await request.get(`/api/${countryId}/provinces?limit=100`);
    if (response.status === 200) {
      if (pageName === 'brandPage') {
        dispatch(updateProvince(response?.data?.data));
      } else {
        let responseData = response?.data?.data;

        responseData.unshift({ id: 0, name: 'Select state' });
        dispatch(updateAccountProvince(responseData));

        // response?.data?.data?.length > 0 &&
        //   dispatch(getCity(response?.data?.data[0]?.id, pageName));
      }
    }
  } catch (error) {
    console.log('province api', error);
  }
};

export const getCity = (provinceId, pageName) => async dispatch => {
  dispatch(updateAccountCity([]));
  try {
    const response = await request.get(`/api/${provinceId}/cities?limit=2000`);
    if (response.status === 200) {
      if (pageName === 'brandPage') {
        dispatch(updateCity(response.data.data));
      } else {
        let responseData = response?.data?.data;

        responseData.unshift({ id: 0, name: 'Select city' });
        dispatch(updateAccountCity(responseData));
      }
    }
  } catch (error) {
    console.log('city id', error);
  }
};

export const removeBrandLogo = brand_slug => async dispatch => {
  try {
    if (brand_slug) {
      const response = await request.post(
        `/api/brand/remove_photo/${brand_slug}`,
        {
          file_type: 'logo_photo',
        }
      );
      if (response.status === 200) {
        dispatch(getBrandInfoAPI(brand_slug));
      }
    }
  } catch (error) {
    console.log('remove brand logo', error);
  }
};

export const updateBillingDetails =
  (id, obj, location, account, brand) => async dispatch => {
    try {
      const response = await request.put(`/api/billing/${id}`, {
        first_name: obj?.firstName,
        last_name: obj?.lastName,
        business_name: obj?.companyName,
        email: obj?.email,
        contact_number: obj?.phoneNumber,
        postal_index_code: obj?.postal_code,
        country_id: location?.country,
        city_id: location?.city,
        province_id: location?.province,
        address_line_1: obj?.address,
      });
      if (response.status === 200) {
        dispatch(updateTextFields(response?.data?.data));
        dispatch(pricingValidation(account, brand));
        notification.success({
          message: '',
          description: 'Details updated Successfully',
        });
      }
    } catch (error) {
      console.log('billingFields', error);
    }
  };

export const viewPlansDetails = (account, brand, type) => async dispatch => {
  try {
    const response = await request.get(
      `/api/plans/list?account_id=${account}&brand_id=${brand}&frequency_type=${type}`
    );
    if (response.status === 200) {
      dispatch(updatePlansList(response?.data));
    }
  } catch (error) {
    console.log('planList', error);
  }
};

export const viewDetails = (account, brand, id) => async dispatch => {
  try {
    const response = await request.get(
      `/api/plan_info?account_id=${account}&brand_id=${brand}&plan_id=${id}`
    );
    if (response.status === 200) {
      dispatch(updatePlanInfo(response?.data));
    }
  } catch (error) {
    console.log('planInfo', error);
  }
};

export const payOption =
  (account, brand, country_pricing, billing_id) => async dispatch => {
    try {
      const response = await request.get(
        `/api/plan_checkout?account_id=${account}&brand_id=${brand}&country_pricing_id=${country_pricing}&billing_id=${billing_id}`
      );
      if (response.status === 200) {
        window.location.href = response?.data?.checkout_url;
        dispatch(updatePayOption(response.data));
      }
    } catch {
      console.log('pay', error);
    }
  };

export const getPaymentInformation = brand => async dispatch => {
  try {
    const response = await request.get(
      `/api/plan/payment_info?brand_id=${brand}`
    );
    if (response.status === 200) {
      dispatch(updatePaymentInfo(response.data));
    }
  } catch {
    console.log('paymentInfo', error);
  }
};

export const getBillingInfo =
  (account, brand, year, page) => async dispatch => {
    try {
      const response = await request.get(
        `/api/billing/history?account_id=${account}&brand_id=${brand}&year=${year}&page=${page}&limit=10`
      );
      if (response.status === 200) {
        dispatch(updateBillingHistory(response.data));
      }
    } catch {
      console.log('billingInforamtion', error);
    }
  };
