import React, { useEffect, useState, useRef } from 'react';
import {
  Typography,
  Row,
  Col,
  Input,
  Button,
  Card,
  DatePicker,
  TimePicker,
  Popover,
  Spin,
} from 'antd';
import Facebook from '@assets/images/Facebook.png';
import Instagram from '@assets/images/Instagram.png';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import CalendarIcon from '@components/icons/CalendarIcon';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ChatIcon from '@components/icons/ChatIcon';
import FacebookGrp from '@assets/images/FBGroup.png';
import moment from 'moment';
import dayjs from 'dayjs';
import twitter from '@assets/images/twitter.png';
import Linkedin from '@assets/images/LinkdinPage.svg';
import Pinterest from '@assets/images/PinterestLogo.png';
import {
  TitleInput,
  SelectInput,
  Error,
} from '../Tabs/components/create/Pages.style';
import Flex from '@components/common/Flex';
import datas from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { preSendURl } from '../../../actions';
import { Uploader } from '../Tabs/components/create/Pages.style';
import EditUploader from './EditUploader';
import ExitIcon from '@components/icons/ExitIcon';
import { Cardimage } from '../../partials/Tabs/components/partials/PostMedia';
import {
  SocialMediaModal,
  PinterestWrapper,
} from '../Tabs/components/create/Pages.style';
import { SocialIcon } from './ViewStyle';
import { Video } from '../Tabs/components/create/Pages.style';
import { antIcon } from '../Tabs/components/create/TextareaAndFileupload';

const { TextArea } = Input;
const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #4aacea;
`;
const Buttons = styled(Button)`
  background: white;
  color: #999999;
  border: 1px solid #999999;
  font-weight: 700;
  font-size: 14px;
  &:hover,
  &:focus,
  &:active {
    background: white;
    color: #999999;
    border: 1px solid #999999;
  }
`;
const TextCard = styled(Card)`
  width: 100%;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 10px;
  height: auto;
  .ant-card-body {
    padding: 10px;
  }
  .textlength {
    width: 100%;
    text-align: right;
    color: #999999;
    font-weight: 700;
    font-size: 13px;
  }
`;
const PostButton = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const EditWrapper = styled('div')`
  width: 100%;
  .margintop {
    margin-top: 10px;
  }
  .row {
    margin-top: 18px;
    margin-bottom: 20px;
  }
  .plus {
    font-size: 40px;
    color: Lightgrey;
  }
  .icon {
    margin-top: 5px;
    cursor: pointer;
  }
  .fotter {
    height: 20px;
  }
  .update {
    justify-content: right;
    align-items: right;
    color: white;
    margin-top: 10px;
    border: 1px solid #4aacea;
    margin-right: 10px;
    background: #4aacea;
  }
  .calender {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    width: 100%;
    .DatePicker {
      width: 200px;
      height: 50px;
      background: #ffffff;
      border: 1px solid #f4f4f5;
      border-radius: 10px;
    }
    .TimePicker {
      width: 200px;
      height: 50px;
      background: #ffffff;
      border: 1px solid #f4f4f5;
      border-radius: 10px;
      margin-left: 20px;
    }
  }
`;
const Linespan = styled.span`
  border-left: 1px solid #d9d9d9;
  margin: 0px 10px 0px 10px;
`;
const VideoFlex = styled('div')`
  display: flex;
  .videoAction {
  }
  .VideoInput_video {
    border-radius: 20px;
    border: 1px solid #d9d9d9;
    margin: 20px 5px 0 0;
  }
  .custom-file-upload {
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100px;
    height: 100px;
    border-radius: 6px;
    margin: 20px 20px 0 0;
  }
  input[type='file'] {
    display: none;
  }
`;

const Edit = ({ data, editFacebook, cancel, selectedAccounts, list }) => {
  const [feedDiscription, setFeedDiscription] = useState('');
  const [comment, setComment] = useState('');
  const [editData, setData] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [box, setOpenBox] = useState('');
  const [Time, setTime] = useState();
  const [date, setDate] = useState('');
  const [uplodededFiles, setUplodededFiles] = useState([]);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [source, setSource] = useState();
  const [fileSize, setFileSize] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [characterLimit, setCharacterLimit] = useState(280);
  const [title, setTitle] = useState('');
  const [destinationLink, setDestinationLink] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [boardListOptions, setBoardListOptions] = useState([]);
  const [fileType, setFileType] = useState('image');
  const [fileRestriction, setfileRestriction] = useState(
    '.jpeg,.jpg,.mp4,.png'
  );
  const [linkValidate, setLinkValidate] = useState(null);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleFileList, setScheduleFileList] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState();
  const [update, setUpdate] = useState(true);
  const [tabs, setTabType] = useState(1);
  const [sendData, setSendData] = useState();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  //redux
  const fileUploadLoader = useSelector(
    state => state.socialMedialIntegration?.fileUploadLoader,
    shallowEqual
  );
  const selector = useSelector(
    state => state?.socialMedialIntegration?.sendUrl,
    shallowEqual
  );
  const boardList = useSelector(
    state => state?.socialMedialIntegration?.PinterestBoardList,
    shallowEqual
  );
  const platforms = useSelector(
    state => state?.socialMedialExtended?.availablePlatforms,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (parent === 'schedule') {
      setFileList(prevState => {
        const newState = prevState?.map(data => {
          return { ...data, thumbUrl: data?.url };
        });
        return newState;
      });
    }
  }, [parent]);

  useEffect(() => {
    if (selector) {
      setUplodededFiles([...uplodededFiles, selector]);
      if (!uploading && selector) {
        setModalOpen(false);
      }
    }
  }, [selector]);

  useEffect(() => {
    if (source) {
      setTabType(3);
      setFileType('video');
    }
  }, [source]);

  useEffect(() => {
    const List =
      boardList?.items?.length > 0
        ? boardList?.items?.map(data => ({ value: data.id, label: data.name }))
        : [];
    let LocalData = [];
    List?.forEach(data => {
      LocalData.push(data);
    });
    setBoardListOptions(LocalData);
  }, [boardList]);

  useEffect(() => {
    if (update) {
      setFileList(prev => {
        const data = prev?.map((datas, ind) => {
          return { ...datas, id: ind + 1 };
        });
        return data;
      });
    }
  }, [update]);

  useEffect(() => {
    if (data?.platform_type === 'Pinterest') {
      setData(data);
      setFeedDiscription(data?.response_message?.message);
      setTitle(data?.response_message?.title);
      setDestinationLink(data?.response_message?.link);
    } else {
      setData(data);
      setFeedDiscription(data?.response_message?.message);
      setComment(data?.response_message?.comment);
    }
    let list = [];
    if (data?.response_message?.file_url) {
      data?.response_message?.file_url.map((item, ind) => {
        let getFileType = item?.split('.')?.pop();
        if (getFileType != 'mp4') {
          list?.push({
            id: ind + 1,
            uid: ind,
            name: 'image.png',
            status: 'done',
            url: item,
          });
          setFileList(list);
          setFileType('image');
          setfileRestriction('.jpeg,.jpg,.png');
        } else {
          if (!deleteStatus) {
            setFileType('video');
            setSource(data?.response_message?.file_url);
            setfileRestriction('.mp4');
          }
        }
      });
    }
    mediaCharacterLimit?.map(activeLimit => {
      if (data?.platform_type === activeLimit?.title) {
        setCharacterLimit(activeLimit?.characterLimit);
      }
    });
  }, [data]);

  const post = name => {
    const uniqueIds = [];
    const avoidDuplicate = uplodededFiles.filter(element => {
      const isDuplicate = uniqueIds?.includes(element?.id);
      if (!isDuplicate) {
        uniqueIds?.push(element?.id);
        return true;
      }
      return false;
    });
    let facebookFile = '';
    let instagramFiles = [];

    if (fileList?.length === 0 && !source) {
      instagramFiles = [];
    } else {
      if (fileList?.length !== 0) {
        fileList?.map(parent => {
          avoidDuplicate?.map(child => {
            parent?.lastModified === child?.id &&
              instagramFiles.push(child?.url);
          });
          parent?.url && instagramFiles.push(parent?.url);
        });
      } else if (source) {
        if (avoidDuplicate?.length === 0) {
          instagramFiles = data?.response_message?.file_url;
        } else {
          instagramFiles = [avoidDuplicate[avoidDuplicate?.length - 1]?.url];
        }
      } else {
        instagramFiles = [];
      }
    }
    if (Time !== '' && date !== '') {
      let shedulehours = ('0' + Time?._d?.getHours()).slice(-2);
      let sheduleminutes = ('0' + Time?._d?.getMinutes()).slice(-2);
      let merging = new Date(
        date?.split('-')[0],
        date?.split('-')[1] - 1,
        date?.split('-')[2],
        shedulehours,
        sheduleminutes
      );
      let platformType;
      let platformFiles;

      if (editData?.platform_type === 'Facebook') {
        platformType = 'Facebook';
        platformFiles = instagramFiles;
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Instagram') {
        platformType = 'Instagram';
        platformFiles = instagramFiles?.slice(0, 10);
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Facebook Groups') {
        platformType = 'Facebook Groups';
        platformFiles = instagramFiles;
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Linkedin Pages') {
        platformType = 'Linkedin Pages';
        platformFiles = instagramFiles?.slice(0, 9);
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Twitter') {
        platformType = 'Twitter';
        platformFiles = instagramFiles?.slice(0, 4);
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Pinterest') {
        platformType = 'Pinterest';
        platformFiles = instagramFiles?.slice(0, 5);
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            title,
            destinationLink,
            selectedBoard ? selectedBoard : editData?.response_message?.board_id
          )
        );
      }

      cancel();
    } else {
      let date = editData?.post_date.split('T')[0];
      let Time = editData?.post_date.split('T')[1];
      let merging = new Date(
        date?.split('-')[0],
        date?.split('-')[1] - 1,
        date?.split('-')[2],
        Time?.split(':')[0],
        Time?.split(':')[1]
      );
      let platformType;
      let platformFiles;

      if (editData?.platform_type === 'Facebook') {
        platformType = 'Facebook';
        platformFiles = instagramFiles;
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Instagram') {
        platformType = 'Instagram';
        platformFiles = instagramFiles?.slice(0, 10);
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Facebook Groups') {
        platformType = 'Facebook Groups';
        platformFiles = instagramFiles;
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Linkedin Pages') {
        platformType = 'Linkedin Pages';
        platformFiles = instagramFiles?.slice(0, 9);
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Twitter') {
        platformType = 'Twitter';
        platformFiles = instagramFiles?.slice(0, 4);
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            comment
          )
        );
      }
      if (editData?.platform_type === 'Pinterest') {
        platformType = 'Pinterest';
        platformFiles = instagramFiles?.slice(0, 5);
        dispatch(
          editFacebook(
            editData?.id,
            selectedAccounts?.join(),
            platformType,
            feedDiscription,
            'SCHEDULE_LATER',
            platformFiles,
            Math.round(Date.parse(merging) / 1000),
            title,
            destinationLink,
            selectedBoard ? selectedBoard : editData?.response_message?.board_id
          )
        );
      }
      cancel();
    }
    setTime('');
    setDate('');
  };
  // multiple upload
  const getBase64 = file => {
    new Promise((resolve, reject) => {
      let permitted = null;
      const currentObj =
        file &&
        Object.assign(file, {
          lastModifiedSet: Math.floor(Date.now() / 1000),
        });
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        const fileName = file?.name;
        if (fileList?.length > 0) {
          for (let i = 0; i < fileList.length; i++) {
            const item = fileList[i];

            if (item?.name === fileName) {
              permitted = false;
              setSendData();
              setModalOpen(false);
              setUploading(false);
              break;
            } else {
              setSendData(currentObj);

              permitted = true;
            }
          }
        } else {
          setSendData(currentObj);
          permitted = true;
        }
      }

      if (permitted) {
        reader.addEventListener('load', event => {
          const _loadedImageUrl = event.target.result;
          if (file?.type?.startsWith('image/')) {
            const image = document.createElement('img');
            image.src = _loadedImageUrl;
            setFileList(prev => [
              ...prev,
              {
                thumbUrl: image.src,
                lastModified: currentObj?.lastModifiedSet,
                id: prev?.length + 1,
              },
            ]);
            resolve(_loadedImageUrl);
          } else if (file?.type?.startsWith('video/')) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            resolve(_loadedImageUrl);
            video.src = URL.createObjectURL(file);
            if (!fileUploadLoader) {
              setModalOpen(false);
            }
          }
        });
      }
      reader.onerror = error => reject(error);
    });
  };

  const multipleModalCancel = () => setPreviewOpen(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = event => {
    const file = event.target.files[0];
    const name = event.target.files[0]?.name;
    let checkingType = file?.type.split('/')?.[0];
    const type = file?.name?.split('.').pop();
    if (type === type?.toUpperCase()) {
      notification.warn({
        message: '',
        description: 'Only supported formats are jpg, jpeg,.png, mp4',
      });
      setModalOpen(false);
    } else {
      if (checkingType == 'image') {
        setFileType('image');
        setfileRestriction('.jpeg,.jpg,.png');
      } else {
        setFileType('video');
      }
      updateImageUrl(file, name);
    }
  };

  const removeData = file => {
    const filtered = fileList?.filter(item => file?.uid != item?.uid);
    setFileList(filtered);
    const apiFiltered = uplodededFiles.filter(
      item => file?.lastModified != item?.id
    );
    setUplodededFiles(apiFiltered);
    if (filtered?.length == 0) {
      setfileRestriction('.jpeg,.jpg,.png');
    }
  };

  const updateImageUrl = async (file, name) => {
    let fileObj = {
      name: name,
      status: 'done',
      lastModified: file?.lastModified,
      originFileObj: file,
    };
    let imageUrl = await getBase64(file);
    getfileUrl(imageUrl, fileObj);
  };

  const getfileUrl = async (obj, file) => {
    // setSendData(file);
    if (file) {
      let view = await getBase64(obj);
      setPreviewImage(view);
    }
  };

  const handleVideoChange = event => {
    const file = event.target.files[0];
    const size = event.target.files[0].size;
    const name = event.target.files[0].name;
    const url = URL.createObjectURL(file);
    updateVideoUrl(file, name);
    setFileType('video');
    setFileSize(size);
    setSource(url);
  };
  const updateVideoUrl = async (file, name) => {
    let imageUrl = await getBase64(file);
    let fileObj = {
      name: name,
      status: 'done',
      lastModified: file?.lastModified,
      originFileObj: file,
    };
    getfileUrl(imageUrl, fileObj);
  };

  const onTimeChange = (time, timeString) => {
    setTime(time);
  };

  const onDateChange = (date, dateString) => {
    setDate(dateString);
    setSelectedDate(date);
  };

  const clearData = () => {
    setFileList([]);
    setFeedDiscription('');
  };

  const onCommentChange = e => {
    setComment(e.target.value);
  };

  const onChange = e => {
    setFeedDiscription(e.target.value);
  };

  const sendReels = name => {
    const uniqueIds = [];
    const avoidDuplicate = uplodededFiles?.filter(element => {
      const isDuplicate = uniqueIds?.includes(element?.id);
      if (!isDuplicate) {
        uniqueIds?.push(element?.id);
        return true;
      }
      return false;
    });

    const upload = [];

    if (uplodededFiles?.length > 0) {
      const derivedFileUrl = uplodededFiles?.map(obj => obj?.url);
      upload?.push(...derivedFileUrl);
    } else upload?.push(...data?.response_message?.file_url);

    if (Time != '' && date != '') {
      let merging = new Date(
        date?.split('-')[0],
        date?.split('-')[1] - 1,
        date?.split('-')[2],
        Time?.split(':')[0],
        Time?.split(':')[1].slice(0, 2)
      );
      if (editData?.platform_type === 'Facebook') {
        editFacebook(
          editData?.id,
          selectedAccounts?.join(),
          'Facebook',
          feedDiscription,
          'SCHEDULE_LATER',
          upload,
          Math.round(Date.parse(merging) / 1000),
          comment
        );
      }
      if (editData?.platform_type === 'Instagram') {
        editFacebook(
          editData?.id,
          selectedAccounts?.join(),
          'Instagram',
          feedDiscription,
          'SCHEDULE_LATER',
          upload,
          Math.round(Date.parse(merging) / 1000),
          comment
        );
      }
      cancel();
    } else {
      let date = editData?.post_date.split('T')[0];
      let Time = editData?.post_date.split('T')[1];
      let merging = new Date(
        date.split('-')[0],
        date.split('-')[1] - 1,
        date.split('-')[2],
        Time.split(':')[0],
        Time.split(':')[1].slice(0, 2)
      );
      if (editData?.platform_type === 'Facebook') {
        editFacebook(
          editData?.id,
          selectedAccounts?.join(),
          'Facebook',
          feedDiscription,
          'SCHEDULE_LATER',
          upload,
          Math.round(Date.parse(merging) / 1000),
          comment
        );
      }
      if (editData?.platform_type === 'Instagram') {
        editFacebook(
          editData?.id,
          selectedAccounts?.join(),
          'Instagram',
          feedDiscription,
          'SCHEDULE_LATER',
          upload,
          Math.round(Date.parse(merging) / 1000),
          comment
        );
      }
      cancel();
    }
    setHour('');
    setMinute('');
  };

  const disabledDate = customDate => {
    let current = moment().format('YYYY-MM-DD');
    if (customDate < moment(current, 'YYYY-MM-DD')) {
      return customDate && customDate < moment(current, 'YYYY-MM-DD');
    } else return customDate && customDate > moment().add(75, 'days');
  };

  const getDisabledMinutes = selectedHour => {
    let minutes = [];
    if (selectedDate < dayjs().endOf('day')) {
      if (selectedHour <= moment().hour()) {
        for (let i = 0; i < moment().minute() + 2; i++) {
          minutes.push(i);
        }
        return minutes;
      }
    } else return minutes;
  };

  const getDisabledHours = () => {
    let hours = [];
    if (selectedDate < dayjs().endOf('day')) {
      for (let i = 0; i < moment().hour(); i++) {
        hours.push(i);
      }
      return hours;
    } else return hours;
  };

  const disabledRangeTime = () => {
    return {
      disabledHours: () => getDisabledHours(),
      disabledMinutes: selectedHour => getDisabledMinutes(selectedHour),
    };
  };

  const ValidationLink = val => {
    setDestinationLink(val);
    var res = val.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) setLinkValidate('Enter Valid Link *');
    else setLinkValidate(null);
  };
  const picker = (
    <div>
      <Picker
        data={datas}
        previewPosition="none"
        onEmojiSelect={e => {
          setCurrentEmoji(e.native);
          feedDiscription === undefined || feedDiscription === ''
            ? setFeedDiscription(e.native)
            : setFeedDiscription(prevInput => prevInput + e.native);
        }}
      />
    </div>
  );
  const Chatpicker = (
    <div>
      <Picker
        data={datas}
        previewPosition="none"
        onEmojiSelect={e => {
          setCurrentEmoji(e.native);
          comment === undefined || comment === ''
            ? setComment(e.native)
            : setComment(prevInput => prevInput + e.native);
        }}
      />
    </div>
  );

  const deletedReels = file => {
    setDeleteStatus(file);
    setSource();
    setFileType('image');
    setUplodededFiles([]);
    // fileInputRef.current.value = null;
  };

  const uploadButton = (
    <div>
      {fileUploadLoader ? (
        <Spin indicator={antIcon} style={{ margin: '10px 0px 0px 15px' }} />
      ) : (
        <PlusOutlined
          onClick={() => {
            setModalOpen(true);
            if (source) {
              setUplodededFiles([]);
            }
          }}
          style={{
            fontSize: '18px',
            cursor: deleteStatus && 'pointer',
            padding: '10px',
            border: '1px solid #D9D9D9',
            borderRadius: '50%',
            color: '#D9D9D9',
          }}
        />
      )}
    </div>
  );
  useEffect(() => {
    if (sendData) {
      let fileName = sendData?.name?.split('.')[0];
      let fileType = sendData?.name?.split('.').pop();
      const now = new Date();
      const time = now.getTime();
      const body = {
        file_name: `${fileName?.replace(
          /\s|\(|\)/g,
          ''
        )}_${time}.${fileType?.replace(/\s/g, '')}`,
        file_path: sendData?.originFileObj,
      };
      dispatch(preSendURl(body, fileType, sendData, setUploading));
    }
  }, [sendData]);

  const handleFileDel = data => {
    const updatedItems = fileList?.filter(item => item.id !== data?.id);
    setFileList(updatedItems);
    // fileInputRef.current.value = null;
  };

  return (
    <EditWrapper>
      <Heading>Edit</Heading>
      <Row className="row">
        <Col span={20} style={{ display: 'flex', paddingLeft: '20px' }}>
          {editData?.platform_type === 'Facebook' && (
            <img src={Facebook} width={30} height={30} />
          )}
          {editData?.platform_type === 'Instagram' && (
            <img src={Instagram} width={30} height={30} />
          )}
          {editData?.platform_type === 'Facebook Groups' && (
            <img src={FacebookGrp} width={30} height={30} />
          )}
          {editData?.platform_type === 'Twitter' && (
            <img src={twitter} width={30} height={30} />
          )}
          {editData?.platform_type === 'Linkedin Pages' && (
            <img src={Linkedin} width={30} height={30} />
          )}
          {editData?.platform_type === 'Pinterest' && (
            <img src={Pinterest} width={30} height={30} />
          )}
          <div style={{ marginTop: '5px' }}>
            <div style={{ marginLeft: '10px' }}>
              {editData?.response_message?.page_name
                ? editData?.response_message?.page_name
                : editData?.platform_type === 'Facebook'
                ? 'FaceBook'
                : editData?.platform_type === 'Instagram'
                ? 'Instagram'
                : editData?.platform_type === 'Facebook Groups'
                ? 'Facebook Groups'
                : editData?.platform_type === 'Twitter'
                ? 'Twitter'
                : editData?.platform_type === 'Pinterest'
                ? 'Pinterest'
                : editData?.platform_type === 'Linkedin Pages'
                ? 'Linkedin Pages'
                : ''}
            </div>
          </div>
        </Col>
      </Row>
      <Col span={24}>
        {editData?.platform_type === 'Pinterest' && (
          <PinterestWrapper>
            <TitleInput
              maxLength={100}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Add Title..."
            />
          </PinterestWrapper>
        )}
        <TextCard>
          <Input.Group>
            <Row>
              <Col span={22}>
                <TextArea
                  showCount={false}
                  maxLength={characterLimit}
                  bordered={false}
                  style={{ minHeight: 150, resize: 'none' }}
                  onChange={onChange}
                  value={feedDiscription}
                />
              </Col>
              <Col span={2}>
                <div style={{ color: '#999999' }}>
                  {' '}
                  {feedDiscription?.trim().length || 0} / {characterLimit}{' '}
                </div>
              </Col>
            </Row>
          </Input.Group>

          <Flex spaceBetween>
            <Buttons
              size="small"
              onClick={() => setFeedDiscription(prevInput => prevInput + '#')}
            >
              # Hashtags
            </Buttons>

            <Popover content={picker} trigger="click">
              <Buttons size="small" style={{ border: 'none' }}>
                <SmileOutlined style={{ fontSize: '20px' }} />
              </Buttons>
            </Popover>
          </Flex>

          <Flex style={{ width: '100%', overflowY: 'scroll' }}>
            {fileType === 'video' && source ? (
              <VideoFlex style={{ position: 'relative', zIndex: 1 }}>
                {uploading ? (
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      textAlign: 'center',
                      margin: 'auto',
                    }}
                  >
                    <Spin
                      indicator={antIcon}
                      style={{ margin: '10px 0px 0px 20px' }}
                    />
                  </div>
                ) : (
                  <Video
                    id="uploadVideo"
                    src={source}
                    autoPlay="autoPlay"
                    muted
                    loop="loop"
                  />
                )}
                {!uploading && (
                  <span
                    style={{
                      position: 'absolute',
                      right: '4%',
                      top: '3%',
                      zIndex: 999,
                      cursor: 'pointer',
                    }}
                    onClick={() => deletedReels(source)}
                  >
                    <ExitIcon
                      style={{
                        fontSize: '22px',
                        fontWeight: 600,
                        color: 'black',
                        cursor: 'pointer',
                        marginLeft: '10px',
                        color: '#fff',
                      }}
                    />
                  </span>
                )}
                <SocialMediaModal
                  open={previewOpen}
                  footer={null}
                  onCancel={multipleModalCancel}
                >
                  <video
                    alt="example"
                    style={{
                      width: '100%',
                      height: '500px',
                    }}
                    src={source}
                    autoPlay="autoPlay"
                    muted
                    loop="loop"
                  />
                </SocialMediaModal>
              </VideoFlex>
            ) : (
              <Flex>
                {!uploading && (
                  <>
                    {fileList?.map(item => {
                      return (
                        <SocialIcon style={{ margin: '0px' }}>
                          {!fileUploadLoader && (
                            <span
                              style={{
                                position: 'absolute',
                                right: '5px',
                                top: '3px',
                                zIndex: 1,
                              }}
                              onClick={() => handleFileDel(item)}
                            >
                              <ExitIcon
                                style={{
                                  fontSize: '22px',
                                  fontWeight: 600,
                                  color: 'black',
                                  cursor: 'pointer',
                                  marginLeft: '10px',
                                  color: '#fff',
                                }}
                              />
                            </span>
                          )}

                          <Cardimage
                            preview={false}
                            src={item?.thumbUrl ? item?.thumbUrl : item?.url}
                            alt="no img"
                            style={{ margin: '9px 10px 0px 0px', zIndex: -1 }}
                          />
                        </SocialIcon>
                      );
                    })}
                  </>
                )}
              </Flex>
            )}
            <Uploader>{uploadButton}</Uploader>
          </Flex>
        </TextCard>
        {editData?.platform_type === 'Pinterest' && (
          <>
            <PinterestWrapper>
              <TitleInput
                maxLength={100}
                value={destinationLink}
                className="marginTop"
                onChange={e => ValidationLink(e.target.value)}
                placeholder="Add destination link . . ."
              />
            </PinterestWrapper>

            {linkValidate && <Error>{linkValidate}</Error>}
            <SelectInput
              placeholder="Select Board"
              defaultValue={editData?.response_message?.board_id}
              onChange={val => setSelectedBoard(val)}
              options={boardListOptions}
            />
          </>
        )}
      </Col>
      <PostButton>
        <Flex>
          {data?.platform_type === 'Facebook Groups' ||
          data?.platform_type === 'Pinterest' ? null : (
            <div className="icon" onClick={() => setOpenBox('chat')}>
              <ChatIcon />
            </div>
          )}
          {data?.platform_type === 'Facebook Groups' ||
          data?.platform_type === 'Pinterest' ? null : (
            <Linespan></Linespan>
          )}
          <div className="icon" onClick={() => setOpenBox('calender')}>
            <CalendarIcon />
          </div>
        </Flex>
        <Flex>
          <Button
            className="update"
            disabled={uploading}
            onClick={() => {
              editData?.response_message?.post_type === 'REEL'
                ? sendReels('Publish')
                : post('Publish');
              setUpdate(!update);
            }}
          >
            {uploading ? 'Loading..' : 'Update'}
          </Button>
        </Flex>
      </PostButton>
      {box === 'calender' && (
        <div className="calender">
          <DatePicker
            onChange={onDateChange}
            disabledDate={disabledDate}
            className="DatePicker"
            placement={'bottomLeft'}
          />
          <TimePicker
            suffixIcon={
              <div>
                {' '}
                <DownOutlined />{' '}
              </div>
            }
            format="hh:mm a"
            disabledTime={disabledRangeTime}
            onChange={onTimeChange}
            className="TimePicker"
          />
        </div>
      )}
      {box === 'chat' && (
        <>
          <div className="fotter"></div>
          <TextCard>
            <div className="textlength"> {comment?.trim().length} / 2200 </div>
            <TextArea
              showCount={false}
              maxLength={2200}
              bordered={false}
              style={{ height: 80 }}
              onChange={onCommentChange}
              value={comment}
              placeholder="Write Something..."
            />
            <Row>
              {' '}
              <Col span={18}>
                <Buttons
                  size="small"
                  onClick={() => setComment(prevInput => prevInput + '#')}
                >
                  # Hastags
                </Buttons>
                <Popover content={Chatpicker} trigger="click">
                  <Buttons size="small" style={{ border: 'none' }}>
                    <SmileOutlined style={{ fontSize: '20px' }} />
                  </Buttons>
                </Popover>
              </Col>{' '}
            </Row>
          </TextCard>
        </>
      )}
      <div className="fotter"></div>
      <EditUploader
        setModalOpen={setModalOpen}
        editData={editData}
        setScheduleFileList={setScheduleFileList}
        scheduleFileList={scheduleFileList}
        handleChange={handleChange}
        handlePreview={handlePreview}
        removeData={removeData}
        handleVideoChange={handleVideoChange}
        fileRestriction={fileRestriction}
        modalOpen={modalOpen}
        tabs={tabs}
        fileList={fileList}
        uploading={uploading}
        fileInputRef={fileInputRef}
      />
    </EditWrapper>
  );
};
const mediaCharacterLimit = [
  {
    characterLimit: 63000,
    title: 'Facebook',
  },
  {
    characterLimit: 63000,
    title: 'Facebook Groups',
  },
  {
    characterLimit: 2200,
    title: 'Instagram',
  },
  {
    characterLimit: 3000,
    title: 'Linkedin',
  },
  {
    characterLimit: 280,
    title: 'Twitter',
  },
];
export default Edit;
