import { notification } from 'antd';
import {
  socialMediaPopupName,
  updateTimeDate,
} from '../../../../../extendedAction';

export const sendPost = (
  name,
  selectedAccounts,
  priceValidation,
  dynamicPayload,
  fbschedulePost,
  instschedulePost,
  facebookGroup,
  linkdinPost,
  twitterPost,
  pinterestPost,
  // setTime,
  // setDate,
  Time,
  date,
  clearDetails,
  openModal,
  // setModalname,
  minute,
  hours,
  CurentUser,
  brand,
  selectedBoard,
  boardListOptions,
  destinationLink,
  customize,
  deleteCreatePost,
  postId,
  // multiplePost,
  savedShedule,
  savedDelay,
  fileList,
  unSplashfileList,
  dispatch
) => {
  const url = unSplashfileList?.map(data => data?.thumbUrl);

  if (selectedAccounts?.length > 0) {
    let limitationCount;
    if (priceValidation?.overall_social_media_limit != 'UNLIMITED') {
      let planLimit =
        parseInt(priceValidation?.overall_social_media_limit) -
        parseInt(priceValidation?.current_social_media_limit);
      if (selectedAccounts?.length <= planLimit)
        limitationCount = selectedAccounts.length;
      else {
        limitationCount = planLimit;
        notification.warn({
          message: '',
          description: (
            <p>
              <b>Your Plan Limit is Exceeded</b>{' '}
              {selectedAccounts?.slice(planLimit).join()} Posts will not be
              Posted
            </p>
          ),
        });
      }
    } else limitationCount = selectedAccounts?.length;

    dynamicPayload?.map(payload => {
      const uniqueIds = [];
      const avoidDuplicate = payload?.file_url?.filter(element => {
        const isDuplicate = uniqueIds?.includes(element?.id);
        if (!isDuplicate) {
          uniqueIds?.push(element?.id);
          return true;
        }
        return false;
      });
      const list = [];
      avoidDuplicate?.map(urls => list.push(urls?.url));
      payload.file = list;
    });
    if (name == 'Publish') {
      const mergingDelayTime = [];
      let addMinute = minute;
      let addHour = hours;
      let sheduleTime = Math.round(Date.parse(new Date()) / 1000);
      for (let index = 0; index < selectedAccounts.length; index++) {
        let settingDate = new Date(
          new Date().setMinutes(new Date().getMinutes())
        );
        let firstPost = new Date(
          settingDate.setSeconds(settingDate.getSeconds() + 10)
        );
        let setminute =
          minute &&
          new Date(new Date().setMinutes(new Date().getMinutes() + addMinute));
        let sethours =
          hours &&
          new Date(new Date().setHours(new Date().getHours() + addHour));
        if (index === 0)
          mergingDelayTime.push({
            platformType: selectedAccounts[index],
            time: new Date(firstPost.setSeconds(new Date().getSeconds() + 10)),
          });
        else {
          if (setminute && setminute != 'Invalid Date')
            mergingDelayTime.push({
              platformType: selectedAccounts[index],
              time: setminute,
            });
          if (sethours && sethours != 'Invalid Date')
            mergingDelayTime.push({
              platformType: selectedAccounts[index],
              time: sethours,
            });
          addHour += hours;
          addMinute += minute;
        }
      }
      dynamicPayload?.map(payload => {
        if (minute === '' && hours === '') {
        } else {
          mergingDelayTime?.map(delayTime => {
            if (delayTime?.platformType == payload?.connection_name)
              payload.time = Math.round(Date.parse(delayTime?.time) / 1000);
          });
        }
      });
      dynamicPayload?.slice(0, limitationCount)?.map(item => {
        if (
          item?.connection_name === 'Facebook' &&
          (item?.message !== '' || item?.file?.length > 0)
        ) {
          fbschedulePost(
            CurentUser?.account?.id,
            brand?.id,
            'IMMEDIATELY',
            item?.message,
            item?.comment,
            item?.connection_name,
            item?.file,
            item?.time,
            sheduleTime,
            item?.savedComment,
            savedDelay
          );
        }
        if (
          item?.connection_name === 'Instagram' &&
          (item?.message !== '' || item?.file?.length > 0)
        ) {
          if (item?.file) {
            instschedulePost(
              CurentUser?.account?.id,
              brand?.id,
              'IMMEDIATELY',
              item?.message,
              item?.comment,
              item?.connection_name,
              item?.file?.slice(0, 10),
              item?.time,
              sheduleTime,
              item?.savedComment,
              savedDelay
            );
          } else
            notification.warn({
              message: '',
              description: 'Kindly upload the post for Instagram',
            });
        }
        if (
          item?.connection_name === 'Facebook Groups' &&
          (item?.message !== '' || item?.file?.length > 0)
        ) {
          facebookGroup(
            CurentUser?.account?.id,
            brand?.id,
            'IMMEDIATELY',
            item?.message,
            '',
            item?.connection_name,
            item?.file,
            item?.time,
            sheduleTime,
            item?.savedComment,
            savedDelay
          );
        }
        if (
          item?.connection_name === 'Linkedin Pages' &&
          (item?.message !== '' || item?.file?.length > 0)
        ) {
          linkdinPost(
            CurentUser?.account?.id,
            brand?.id,
            'IMMEDIATELY',
            item?.message,
            item?.comment,
            item?.connection_name,
            item?.file?.slice(0, 9),
            item?.time,
            sheduleTime,
            item?.savedComment,
            savedDelay
          );
        }
        if (
          item?.connection_name === 'Twitter' &&
          (item?.message !== '' || item?.file?.length > 0)
        ) {
          twitterPost(
            CurentUser?.account?.id,
            brand?.id,
            'IMMEDIATELY',
            item?.message,
            item?.comment,
            item?.connection_name,
            item?.file?.slice(0, 4),
            item?.time,
            sheduleTime,
            item?.savedComment,
            savedDelay
          );
        }
        if (item?.connection_name === 'Pinterest' && item?.file) {
          let board;
          if (selectedBoard?.length > 0) {
            board = selectedBoard;
          } else board = boardListOptions[0]?.value;
          if (item?.file) {
            if (board?.length > 0) {
              pinterestPost(
                CurentUser?.account?.id,
                brand?.id,
                'IMMEDIATELY',
                item?.message,
                item?.connection_name,
                item?.file?.slice(0, 5),
                item?.time,
                sheduleTime,
                savedDelay,
                item?.title,
                board,
                destinationLink
              );
            } else {
              notification.warn({
                message: '',
                description: 'Kindly update BoardId',
              });
            }
          } else
            notification.warn({
              message: '',
              description: 'Kindly upload the post for Pinterest',
            });
        }
        dispatch(
          updateTimeDate({
            time: '',
            date: '',
            apiDate: '',
          })
        );
      });
      clearDetails('submit');
      // multiplePost?.length > 1 && deleteCreatePost(postId?.id);
    } else if (name == 'Schedule' && savedShedule) {
      if (Time != '' && date != '') {
        let shedulehours = ('0' + Time?._d?.getHours()).slice(-2);
        let sheduleminutes = ('0' + Time?._d?.getMinutes()).slice(-2);
        let merging = new Date(
          date?.split('-')[0],
          date?.split('-')[1] - 1,
          date?.split('-')[2],
          shedulehours,
          sheduleminutes
        );

        const mergingDelayTime = [];
        let addMinute = minute;
        let addHour = hours;
        for (let index = 0; index < selectedAccounts.length; index++) {
          let settingDate =
            merging &&
            new Date(
              new Date(merging).setMinutes(new Date(merging).getMinutes())
            );
          let firstPost =
            settingDate &&
            new Date(settingDate.setSeconds(settingDate.getSeconds() + 10));
          let setminute =
            minute &&
            new Date(
              new Date(merging).setMinutes(
                new Date(merging).getMinutes() + addMinute
              )
            );
          let sethours =
            hours &&
            new Date(
              new Date(merging).setHours(new Date(merging).getHours() + addHour)
            );
          if (index === 0)
            mergingDelayTime.push({
              platformType: selectedAccounts[index],
              time: new Date(
                firstPost.setSeconds(new Date().getSeconds() + 10)
              ),
            });
          else {
            if (setminute && setminute !== 'Invalid Date')
              mergingDelayTime.push({
                platformType: selectedAccounts[index],
                time: setminute,
              });
            if (sethours && sethours !== 'Invalid Date')
              mergingDelayTime.push({
                platformType: selectedAccounts[index],
                time: sethours,
              });
            addHour += hours;
            addMinute += minute;
          }
        }

        dynamicPayload?.map(payload => {
          if (minute === '' && hours === '') {
          } else {
            mergingDelayTime?.map(delayTime => {
              if (delayTime?.platformType === payload?.connection_name)
                payload.time = Math.round(Date.parse(delayTime?.time) / 1000);
            });
          }
        });
        let sheduleTime = Math.round(Date.parse(new Date(merging)) / 1000);

        dynamicPayload?.slice(0, limitationCount).map(item => {
          if (
            item?.connection_name === 'Facebook' &&
            (item?.message !== '' || item?.file?.length > 0)
          ) {
            fbschedulePost(
              CurentUser?.account?.id,
              brand?.id,
              'SCHEDULE_LATER',
              item?.message,
              item?.comment,
              item?.connection_name,
              item?.file,
              item?.time,
              sheduleTime,
              item?.savedComment,
              savedDelay
            );
          }
          if (
            item?.connection_name === 'Instagram' &&
            (item?.message !== '' || item?.file?.length > 0)
          )
            if (item?.file) {
              instschedulePost(
                CurentUser?.account?.id,
                brand?.id,
                'SCHEDULE_LATER',
                item?.message,
                item?.comment,
                item?.connection_name,
                item?.file?.slice(0, 10),
                item?.time,
                sheduleTime,
                item?.savedComment,
                savedDelay
              );
            } else
              notification.warn({
                message: '',
                description: 'Kindly upload the post for Instagram',
              });

          if (
            item?.connection_name === 'Facebook Groups' &&
            (item?.message !== '' || item?.file?.length > 0)
          ) {
            facebookGroup(
              CurentUser?.account?.id,
              brand?.id,
              'SCHEDULE_LATER',
              item?.message,
              '',
              item?.connection_name,
              item?.file,
              item?.time,
              sheduleTime,
              item?.savedComment,
              savedDelay,
              minute,
              hours
            );
          }
          if (
            item?.connection_name === 'Linkedin Pages' &&
            (item?.message !== '' || item?.file?.length > 0)
          ) {
            linkdinPost(
              CurentUser?.account?.id,
              brand?.id,
              'SCHEDULE_LATER',
              item?.message,
              item?.comment,
              item?.connection_name,
              item?.file?.slice(0, 9),
              item?.time,
              sheduleTime,
              item?.savedComment,
              savedDelay
            );
          }
          if (
            item?.connection_name === 'Twitter' &&
            (item?.message !== '' || item?.file?.length > 0)
          ) {
            twitterPost(
              CurentUser?.account?.id,
              brand?.id,
              'SCHEDULE_LATER',
              item?.message,
              item?.comment,
              item?.connection_name,
              item?.file?.slice(0, 4),
              item?.time,
              sheduleTime,
              item?.savedComment,
              savedDelay
            );
          }
          if (item?.connection_name === 'Pinterest' && item?.file) {
            let board;
            if (selectedBoard?.length > 0) {
              board = selectedBoard;
            } else board = boardListOptions[0]?.value;
            if (item?.file) {
              if (board?.length > 0) {
                pinterestPost(
                  CurentUser?.account?.id,
                  brand?.id,
                  'SCHEDULE_LATER',
                  item?.message,
                  item?.connection_name,
                  item?.file?.slice(0, 5),
                  item?.time,
                  sheduleTime,
                  savedDelay,
                  item?.title,
                  board,
                  destinationLink
                );
              } else {
                notification.warn({
                  message: '',
                  description: 'Kindly update BoardId',
                });
              }
            } else
              notification.warn({
                message: '',
                description: 'Kindly upload the post for Pinterest',
              });
          }
        });
        clearDetails('submit');
        // multiplePost?.length > 1 && deleteCreatePost(postId?.id);
      } else {
        openModal();
        dispatch(socialMediaPopupName('Calendar'));
      }
    }
  } else
    notification.warn({ message: '', description: 'Select atleast one media' });
};

export const Reels = (
  name,
  selectedAccounts,
  priceValidation,
  dynamicPayload,
  fbscheduleReel,
  instagramReel,
  clearDetails,
  openModal,
  // setModalname,
  minute,
  hours,
  CurentUser,
  brand,
  postId,
  // multiplePost,
  savedShedule,
  savedDelay,
  Time,
  date,
  dispatch
) => {
  if (selectedAccounts?.length > 0) {
    let limitationCount;
    if (priceValidation?.overall_social_media_limit != 'UNLIMITED') {
      let planLimit =
        parseInt(priceValidation?.overall_social_media_limit) -
        parseInt(priceValidation?.current_social_media_limit);
      if (selectedAccounts?.length <= planLimit)
        limitationCount = selectedAccounts?.length;
      else {
        limitationCount = planLimit;
        notification.warn({
          message: '',
          description: (
            <p>
              <b>Your Plan Limit is Exceeded</b>{' '}
              {selectedAccounts?.slice(planLimit).join()} Posts will not be
              Posted
            </p>
          ),
        });
      }
    } else limitationCount = selectedAccounts?.length;

    if (name === 'Publish') {
      const mergingDelayTime = [];
      let addMinute = minute;
      let addHour = hours;
      let sheduleTime = Math.round(Date.parse(new Date()) / 1000);
      for (let index = 0; index < selectedAccounts?.length; index++) {
        // let firstPost = new Date(
        //   new Date().setMinutes(new Date().getMinutes() + 1)
        // );
        let settingDate = new Date(
          new Date().setMinutes(new Date().getMinutes())
        );
        let firstPost = new Date(
          settingDate.setSeconds(settingDate.getSeconds() + 10)
        );
        let setminute =
          minute &&
          new Date(new Date().setMinutes(new Date().getMinutes() + addMinute));
        let sethours =
          hours &&
          new Date(new Date().setHours(new Date().getHours() + addHour));
        if (index === 0)
          mergingDelayTime.push({
            platformType: selectedAccounts[index],
            time: new Date(firstPost.setSeconds(new Date().getSeconds() + 10)),
          });
        else {
          if (setminute && setminute != 'Invalid Date')
            mergingDelayTime.push({
              platformType: selectedAccounts[index],
              time: setminute,
            });
          if (sethours && sethours != 'Invalid Date')
            mergingDelayTime.push({
              platformType: selectedAccounts[index],
              time: sethours,
            });
          addHour += hours;
          addMinute += minute;
        }
      }

      dynamicPayload?.map(payload => {
        const uniqueIds = [];
        const avoidDuplicate = payload?.file_url?.filter(element => {
          const isDuplicate = uniqueIds?.includes(element?.id);
          if (!isDuplicate) {
            uniqueIds?.push(element?.id);
            return true;
          }
          return false;
        });
        let upload = [];
        avoidDuplicate?.forEach(item => {
          if (item?.path_url) upload?.push(item?.path_url);
        });
        payload.file = upload;
        if (minute === '' && hours === '') {
        } else {
          mergingDelayTime?.map(delayTime => {
            if (delayTime?.platformType === payload?.connection_name)
              payload.time = Math.round(Date.parse(delayTime?.time) / 1000);
          });
        }
      });

      dynamicPayload?.slice(0, limitationCount).map(item => {
        const uniqueIds = [];
        const urls = [];
        const avoidDuplicate =
          item?.file_url !== undefined &&
          item?.file_url?.filter(element => {
            const isDuplicate = uniqueIds?.includes(element?.id);
            if (!isDuplicate) {
              uniqueIds?.push(element?.id);
              urls?.push(element?.url);
              return true;
            }
          });
        const filteredArray = [urls[urls.length - 1]];
        if (
          item?.connection_name === 'Facebook' &&
          (item?.message || filteredArray)
        ) {
          if (filteredArray) {
            fbscheduleReel(
              CurentUser?.account?.id,
              brand?.id,
              'IMMEDIATELY',
              item?.message,
              item?.comment,
              item?.connection_name,
              filteredArray,
              item?.time,
              sheduleTime,
              item?.savedComment,
              savedDelay
            );
            clearDetails('submit');
          } else
            notification.warn({
              message: '',
              description: 'Kindly upload the reels for Facebook',
            });
        }
        if (
          item?.connection_name === 'Instagram' &&
          (item?.message || filteredArray)
        ) {
          if (filteredArray) {
            instagramReel(
              CurentUser?.account?.id,
              brand?.id,
              'IMMEDIATELY',
              item?.message,
              item?.comment,
              item?.connection_name,
              filteredArray,
              item?.time,
              sheduleTime,
              item?.savedComment,
              savedDelay
            );
            clearDetails('submit');
          } else
            notification.warn({
              message: '',
              description: 'Kindly upload the reels for Instagram',
            });
        }
      });
      // multiplePost?.length > 1 && deleteCreatePost(postId?.id);
    } else if (name === 'Schedule' && savedShedule) {
      if (Time != '' && date != '') {
        // let limitationCount;
        // if (priceValidation?.overall_social_media_limit != 'UNLIMITED') {
        //   let planLimit =
        //     parseInt(priceValidation?.overall_social_media_limit) -
        //     parseInt(priceValidation?.current_social_media_limit);
        //   if (selectedAccounts?.length <= planLimit)
        //     limitationCount = selectedAccounts?.length;
        //   else {
        //     limitationCount = planLimit;
        //     notification.warn({
        //       message: '',
        //       description: (
        //         <p>
        //           <b>Your Plan Limit is Exceeded</b>{' '}
        //           {selectedAccounts?.slice(planLimit).join()} Posts will not be
        //           Posted
        //         </p>
        //       ),
        //     });
        //   }
        // } else limitationCount = selectedAccounts?.length;

        let shedulehours = ('0' + Time?._d?.getHours()).slice(-2);
        let sheduleminutes = ('0' + Time?._d?.getMinutes()).slice(-2);
        let merging = new Date(
          date?.split('-')[0],
          date?.split('-')[1] - 1,
          date?.split('-')[2],
          shedulehours,
          sheduleminutes
        );
        const mergingDelayTime = [];
        let addMinute = minute;
        let addHour = hours;
        for (let index = 0; index < selectedAccounts?.length; index++) {
          let settingDate =
            merging &&
            new Date(
              new Date(merging).setMinutes(new Date(merging).getMinutes())
            );
          let firstPost =
            settingDate &&
            new Date(settingDate.setSeconds(settingDate.getSeconds() + 10));

          let setminute =
            minute &&
            new Date(
              new Date(merging).setMinutes(
                new Date(merging).getMinutes() + addMinute
              )
            );
          let sethours =
            hours &&
            new Date(
              new Date(merging).setHours(new Date(merging).getHours() + addHour)
            );
          if (index === 0)
            mergingDelayTime.push({
              platformType: selectedAccounts[index],
              time: new Date(
                firstPost.setSeconds(new Date().getSeconds() + 10)
              ),
            });
          else {
            if (setminute && setminute !== 'Invalid Date')
              mergingDelayTime.push({
                platformType: selectedAccounts[index],
                time: setminute,
              });
            if (sethours && sethours !== 'Invalid Date')
              mergingDelayTime.push({
                platformType: selectedAccounts[index],
                time: sethours,
              });
            addHour += hours;
            addMinute += minute;
          }
        }

        dynamicPayload?.map(payload => {
          const uniqueIds = [];
          const avoidDuplicate = payload?.file_url?.filter(element => {
            const isDuplicate = uniqueIds.includes(element?.id);
            if (!isDuplicate) {
              uniqueIds.push(element?.id);
              return true;
            }
            return false;
          });
          let upload = [];
          avoidDuplicate?.forEach(item => {
            if (item?.path_url) upload.push(item?.path_url);
          });
          payload.file = upload;

          if (minute === '' && hours === '') {
          } else {
            mergingDelayTime?.map(delayTime => {
              if (delayTime?.platformType === payload?.connection_name)
                payload.time = Math.round(Date.parse(delayTime?.time) / 1000);
            });
          }
        });
        let sheduleTime = Math.round(Date.parse(new Date(merging)) / 1000);

        dynamicPayload?.slice(0, limitationCount).map(item => {
          const uniqueIds = [];
          const urls = [];
          const avoidDuplicate =
            item?.file_url !== undefined &&
            item?.file_url?.filter(element => {
              const isDuplicate = uniqueIds?.includes(element?.id);
              if (!isDuplicate) {
                uniqueIds?.push(element?.id);
                urls?.push(element?.url);
                return true;
              }
            });
          const filteredArray = [urls[urls.length - 1]];
          if (
            item?.connection_name === 'Facebook' &&
            (item?.message || filteredArray)
          ) {
            if (filteredArray) {
              fbscheduleReel(
                CurentUser?.account?.id,
                brand?.id,
                'SCHEDULE_LATER',
                item?.message,
                item?.comment,
                item?.connection_name,
                filteredArray,
                item?.time,
                sheduleTime,
                item?.savedComment,
                savedDelay
              );
              clearDetails('submit');
            } else
              notification.warn({
                message: '',
                description: 'kindly upload the Reels for Facebook',
              });
          }
          if (
            item?.connection_name === 'Instagram' &&
            (item?.message || filteredArray)
          ) {
            if (filteredArray) {
              instagramReel(
                CurentUser?.account?.id,
                brand?.id,
                'SCHEDULE_LATER',
                item?.message,
                item?.comment,
                item?.connection_name,
                filteredArray,
                item?.time,
                sheduleTime,
                item?.savedComment,
                savedDelay
              );
              clearDetails('submit');
            } else
              notification.warn({
                message: '',
                description: 'kindly upload the Reels for instagram',
              });
          }
        });
      } else {
        openModal('Calendar');
        dispatch(socialMediaPopupName('Calendar'));
      }
      // multiplePost?.length > 1 && deleteCreatePost(postId?.id);
    }
  } else
    notification.warn({ message: '', description: 'kindly choose the media' });
};
