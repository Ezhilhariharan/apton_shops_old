// import { signOutStart } from 'modules/Auth/actions'
import { upDateAuthToken } from '../modules/Auth/actions';
import { updateButtons } from '../modules/SocialMedia/actions';
import request from '@utils/request';
import { notification } from 'antd';
import { store } from '../redux/store';

const initApiServices = () => {
  try {
    request.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        notification.destroy();
        if (
          error.response.data.error === 'Token not logged in' ||
          error.response.data.error === 'No active session found' ||
          error.response.data.error === 'Token expired'
        ) {
          notification.warning({
            message: 'Invalid Token. Please login Again!',
          });
          localStorage.removeItem('authToken');
          store.dispatch(upDateAuthToken(null));
          localStorage.removeItem('buttons');
          // store.dispatch(signOutStart())
          return new Promise(() => {});
        } else return Promise.reject(error);
      }
    );
  } catch (e) {
    console.error('Error occurred while logout : in InitApiService', e);
  }
};

export default initApiServices;
