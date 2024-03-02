import { notification } from 'antd';
import { PlusOutlined, StarFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { postUpdates } from './PostApiValidation';
import { updateDynamicComment } from '../../../../../actions';
import {
  socialMediaPopupToggle,
  updateComments,
  setSelectedDataForPopup,
} from '../../../../../extendedAction';

export const tooltipText = instruction => {
  return (
    <ul style={{ marginTop: '10px' }}>
      {instruction.map(instructionList => (
        <li style={{ display: 'flex', marginTop: '3px' }}>
          <span
            style={{ display: 'flex', alignItems: 'center', height: '20px' }}
          >
            {' '}
            <StarFilled style={{ marginRight: '4px', fontSize: '8px' }} />
          </span>
          {instructionList}
        </li>
      ))}
    </ul>
  );
};

// common Functions
export const onChangingDropDown = (
  checkedValues,
  items,
  setSelectedAccounts,
  setFilteredDropdownList
) => {
  let arrayVal = [];
  let selectedItem = [];
  items?.forEach(val => {
    if (val?.title === checkedValues?.target?.value)
      val.checked
        ? arrayVal.push({ ...val, checked: false })
        : arrayVal.push({ ...val, checked: true });
    else arrayVal.push({ ...val });
  });
  arrayVal?.filter(data => {
    if (data.checked) {
      selectedItem?.push(data.title);
    }
  });

  setSelectedAccounts(selectedItem);
  setFilteredDropdownList(arrayVal);
};

export const settingImport = (
  selectedAccounts,
  setClick,
  setSingleUpload,
  setModalOpen
) => {
  if (selectedAccounts?.length > 0) {
    setClick('import');
    setModalOpen(true);
    setSingleUpload(true);
  } else
    notification.warn({ message: '', description: 'kindly choose the media' });
};

export const CreateDynamicallyObj = (
  discription,
  comments,
  files,
  localFiles,
  selectedAccounts,
  mediaCharacterLimit,
  setCharacterLimit,
  destinationLink,
  selectedBoard,
  setDynamicPayload,
  title,
  mediaCategory,
  customize,
  activeSocialIcon,
  dynamicPayload,
  savedComment,
  savedDelay,
  savedShedule
) => {
  // let mediaPostObj = [];
  // let filePath = [];
  // files &&
  //   files?.forEach(item => {
  //     filePath.push(item);
  //   });
  // if (customize) {
  //   const addedData = selectedAccounts?.filter(
  //     id1 => !dynamicPayload?.some(({ connection_name: id2 }) => id2 === id1)
  //   );
  //   const charLimit = mediaCharacterLimit?.find(
  //     limit => limit?.title === addedData.join()
  //   );
  //   if (addedData?.length > 0) {
  //     if (charLimit?.title === 'Pinterest') {
  //       let newObj = {
  //         message: '',
  //         comment: '',
  //         file_url: [],
  //         file: [],
  //         localFileList: [],
  //         connection_name: charLimit?.title,
  //         characterLimit: charLimit?.characterLimit,
  //         title: title,
  //         destinationLink: '',
  //         selectedBoard: '',
  //         savedComment: false,
  //         savedDelay: savedDelay,
  //         savedShedule: savedShedule,
  //       };
  //       setDynamicPayload(prevState => [...prevState, newObj]);
  //     } else if (
  //       charLimit?.title === 'Instagram' ||
  //       charLimit?.title === 'Facebook'
  //     ) {
  //       let newObj = {
  //         message: '',
  //         comment: '',
  //         file_url: [],
  //         file: [],
  //         localFileList: [],
  //         connection_name: charLimit?.title,
  //         characterLimit: charLimit?.characterLimit,
  //         videoSource: '',
  //         savedComment: false,
  //         savedDelay: savedDelay,
  //         savedShedule: savedShedule,
  //       };
  //       setDynamicPayload(prevState => [...prevState, newObj]);
  //     } else {
  //       let newObj = {
  //         message: '',
  //         comment: '',
  //         file_url: [],
  //         file: [],
  //         localFileList: [],
  //         connection_name: charLimit?.title,
  //         characterLimit: charLimit?.characterLimit,
  //         videoSource: '',
  //         savedComment: false,
  //         savedDelay: savedDelay,
  //         savedShedule: savedShedule,
  //       };
  //       setDynamicPayload(prevState => [...prevState, newObj]);
  //     }
  //   } else {
  //     const addedData = dynamicPayload?.filter(
  //       ({ connection_name: id1 }) =>
  //         !selectedAccounts?.some(id2 => id2 === id1)
  //     );
  //     let connectionName = addedData ? addedData[0]?.connection_name : '';
  //     setDynamicPayload(prevState => {
  //       const newState = prevState?.filter(
  //         data => data?.connection_name != connectionName
  //       );
  //       return newState;
  //     });
  //   }
  //   selectedAccounts?.forEach(item => {
  //     mediaCharacterLimit.map(limit => {
  //       if (limit.title === item) {
  //         parseInt(selectedAccounts?.length) === 1
  //           ? setCharacterLimit(limit.characterLimit)
  //           : setCharacterLimit(279);
  //       }
  //     });
  //   });
  // } else {
  //   selectedAccounts?.forEach(item => {
  //     mediaCharacterLimit.map(limit => {
  //       if (limit.title === item) {
  //         parseInt(selectedAccounts?.length) === 1
  //           ? setCharacterLimit(limit.characterLimit)
  //           : setCharacterLimit(279);
  //         if (limit.title === item && limit.title === 'Pinterest') {
  //           mediaPostObj.push({
  //             message: discription,
  //             comment: comments,
  //             file_url: filePath,
  //             file: [],
  //             localFileList: localFiles ? localFiles : [],
  //             connection_name: item,
  //             characterLimit: limit?.characterLimit,
  //             title: title,
  //             destinationLink: destinationLink,
  //             selectedBoard: selectedBoard,
  //             savedComment: savedComment,
  //             savedDelay: savedDelay,
  //             savedShedule: savedShedule,
  //           });
  //         } else {
  //           if (
  //             (item === 'Instagram' && limit?.title === 'Instagram') ||
  //             (item === 'Facebook' && limit?.title === 'Facebook')
  //           ) {
  //             mediaPostObj.push({
  //               message: discription,
  //               comment: comments,
  //               file_url: filePath,
  //               file: [],
  //               localFileList: localFiles ? localFiles : [],
  //               connection_name: item,
  //               characterLimit: limit?.characterLimit,
  //               mediaCategory: mediaCategory,
  //               videoSource: '',
  //               savedComment: savedComment,
  //               savedDelay: savedDelay,
  //               savedShedule: savedShedule,
  //             });
  //           } else {
  //             mediaPostObj.push({
  //               message: discription,
  //               comment: comments,
  //               file_url: filePath,
  //               file: [],
  //               localFileList: localFiles ? localFiles : [],
  //               connection_name: item,
  //               characterLimit: limit.characterLimit,
  //               videoSource: '',
  //               savedComment: savedComment,
  //               savedDelay: savedDelay,
  //               savedShedule: savedShedule,
  //             });
  //           }
  //         }
  //       }
  //     });
  //   });
  //   setDynamicPayload(mediaPostObj);
  // }
};

//modal
export const showModal = (
  value,
  uplodededFiles,
  // setSelectedData,
  selectedAccounts,
  feedDiscription,
  tabs,
  customize,
  activeSocialIcon,
  // setIsModalVisible,
  dynamicPayload,
  // setAddComment,
  dispatch
  // updateDynamicComment,
) => {
  if (selectedAccounts?.length > 0) {
    if (value === 'Eye') {
      const uniqueIds = [];
      const avoidDuplicate = uplodededFiles?.filter(element => {
        const isDuplicate = uniqueIds?.includes(element?.id);
        if (!isDuplicate) {
          uniqueIds?.push(element?.id);
          return true;
        }
        return false;
      });
      let upload = [];
      avoidDuplicate?.forEach(item => {
        if (item?.image) upload?.push(item?.image);
        if (item?.url) upload?.push(item?.url);
        if (item?.thumbUrl) upload?.push(item?.thumbUrl);
      });
      // setSelectedData({
      //   platform_type: activeSocialIcon
      //     ? activeSocialIcon
      //     : selectedAccounts[0],
      //   file_url: upload,
      //   message: feedDiscription,
      //   type: 'action',
      //   postType: parseInt(tabs) != 3 ? 'POST' : 'REEL',
      // });
      dispatch(
        setSelectedDataForPopup({
          platform_type: activeSocialIcon
            ? activeSocialIcon
            : selectedAccounts[0],
          file_url: upload,
          message: feedDiscription,
          type: 'action',
          postType: parseInt(tabs) != 3 ? 'POST' : 'REEL',
        })
      );
    }

    if (value === 'Timer') {
      if (selectedAccounts?.length >= 2) dispatch(socialMediaPopupToggle(true));
      else {
        dispatch(socialMediaPopupToggle(false));
        // setIsModalVisible(false);
        notification.warn({
          message: '',
          description: 'kindly select atleast two media',
        });
      }
    } else
      selectedAccounts?.length > 0
        ? dispatch(socialMediaPopupToggle(true))
        : dispatch(socialMediaPopupToggle(false));

    if (value === 'Chat') {
      if (customize)
        dynamicPayload?.map(data => {
          if (activeSocialIcon === data?.connection_name)
            // setAddComment(data.comment);
            dispatch(updateComments(data?.comment));
          data.comment
            ? dispatch(updateDynamicComment(data.comment))
            : dispatch(updateDynamicComment(' '));
        });
    }
  } else
    notification.warn({ message: '', description: 'Kindly choose The Media' });
};

export const modalPreview = async (
  file,
  getBase64,
  setPreviewImage,
  setPreviewOpen,
  setPreviewTitle
) => {
  if (!file?.url && !file?.preview) {
    file.preview = await getBase64(file?.originFileObj);
  }
  setPreviewImage(file.url || file.preview);
  setPreviewOpen(true);
  setPreviewTitle(
    file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
  );
};

// validations
export const postActionsValidation = (selectedAccounts, fileList, source) => {
  if (
    parseInt(selectedAccounts?.length) === 2 &&
    selectedAccounts?.includes('Pinterest') &&
    selectedAccounts?.includes('Instagram') &&
    parseInt(fileList?.length) === 0 &&
    !source
  ) {
    return false;
  } else if (
    parseInt(selectedAccounts?.length) === 1 &&
    selectedAccounts?.includes('Pinterest') &&
    parseInt(fileList?.length) === 0 &&
    !source
  ) {
    return false;
  } else if (
    parseInt(selectedAccounts?.length) === 1 &&
    selectedAccounts?.includes('Instagram') &&
    parseInt(fileList?.length) === 0 &&
    !source
  ) {
    return false;
  } else return true;
};

export const postValidation = (
  feedDiscription,
  selectedAccounts,
  fileList,
  selectedBoard,
  mediaCategory,
  source,
  uploading
) => {
  if (mediaCategory === 'Reels') {
    if (source && !uploading) return false;
    else return true;
  } else {
    if (selectedAccounts?.includes('Instagram')) {
      if (fileList?.length > 0 || source) {
        return false;
      } else {
        return true;
      }
    } else if (selectedAccounts?.includes('Pinterest')) {
      if (fileList?.length > 0 || source) {
        return false;
      } else {
        return true;
      }
    } else if (mediaCategory === 'Feed' && (source || fileList?.length > 0)) {
      return false;
    } else if (
      (fileList?.length > 0 || source) &&
      selectedAccounts?.length === 1 &&
      selectedAccounts?.includes('Instagram') &&
      !uploading
    ) {
      return false;
    } else if (
      selectedAccounts?.length === 1 &&
      selectedAccounts?.includes('Pinterest')
    ) {
      if (fileList?.length === 0 && source && selectedBoard) {
        return false;
      } else if (fileList?.length > 0 && !source && selectedBoard) {
        return false;
      } else return true;
    } else if (
      feedDiscription?.length > 0 &&
      feedDiscription?.trim() != '' &&
      !uploading
    ) {
      if (
        selectedAccounts?.length === 2 &&
        selectedAccounts?.includes('Pinterest') &&
        selectedAccounts?.includes('Instagram') &&
        (fileList?.length === 0 || !source)
      ) {
        return true;
      } else if (
        selectedAccounts?.length === 1 &&
        selectedAccounts?.includes('Pinterest')
      ) {
        if (fileList?.length === 0 && source && selectedBoard) {
          return false;
        } else if (fileList?.length > 0 && !source && selectedBoard) {
          return false;
        } else return true;
      } else if (
        selectedAccounts?.length === 1 &&
        selectedAccounts?.includes('Instagram')
      ) {
        if (fileList?.length === 0 && source) return false;
        else if (fileList?.length > 0 && !source) return false;
        else return true;
      } else {
        return false;
      }
    } else if (
      selectedAccounts?.length === 1 &&
      (feedDiscription?.trim() != '' || fileList?.length > 0 || source) &&
      !uploading
    ) {
      if (
        selectedAccounts?.includes('Facebook') ||
        selectedAccounts?.includes('Facebook Groups') ||
        selectedAccounts?.includes('Linkedin Pages') ||
        selectedAccounts?.includes('Twitter')
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (fileList?.length === 0 || !source) return true;
      else {
        if (
          (selectedAccounts?.length === 1 &&
            selectedAccounts?.includes('Pinterest')) ||
          (mediaCategory === 'Pins' &&
            selectedBoard &&
            feedDiscription?.length > 0)
        ) {
          return false;
        }
      }
    }
  }
};

export const actionValidating = (
  selectedAccounts,
  customize,
  activeSocialIcon
) => {
  if (
    (parseInt(selectedAccounts?.length) === 1 &&
      selectedAccounts[0] === 'Facebook Groups') ||
    (customize && activeSocialIcon === 'Facebook Groups')
  )
    return true;
  else if (
    (parseInt(selectedAccounts?.length) === 1 &&
      selectedAccounts[0] === 'Pinterest') ||
    (customize && activeSocialIcon === 'Pinterest')
  )
    return true;
  else if (
    parseInt(selectedAccounts?.length) === 2 &&
    ((selectedAccounts[0] === 'Pinterest' &&
      selectedAccounts[1] === 'Facebook Groups') ||
      (selectedAccounts[0] === 'Facebook Groups' &&
        selectedAccounts[1] === 'Pinterest'))
  )
    return true;
  else return false;
};

export const ValidatingLink = (val, setLinkValidate, setDestinationLink) => {
  setDestinationLink(val);
  var res = val.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) setLinkValidate('Enter Valid Link *');
  else setLinkValidate(null);
};

export const ratio = (w, h) => {
  function mdc(w, h) {
    var resto;
    do {
      resto = w % h;
      w = h;
      h = resto;
    } while (resto != 0);
    return w;
  }
  var mdc = mdc(w, h);
  var width = w / mdc;
  var height = h / mdc;
  return width + ':' + height;
};

//updatingDetails
export const updateDescription = (
  str,
  dynamicPayload,
  activeSocialIcon,
  customize,
  setFeedDiscription,
  addComment,
  uplodededFiles,
  fileList,
  dynamicallyObj,
  setDynamicPayload
) => {
  if (customize) {
    setDynamicPayload(prevState => {
      const newState = prevState?.map(data => {
        if (activeSocialIcon === data?.connection_name)
          return { ...data, message: str };
        else return data;
      });
      return newState;
    });
  } else dynamicallyObj(str, addComment, uplodededFiles, fileList);

  setFeedDiscription(str);
};

export const UpdateTitle = (
  str,
  customize,
  dynamicPayload,
  activeSocialIcon,
  setTitle,
  setDynamicPayload
) => {
  setDynamicPayload(prevState => {
    const newState = prevState?.map(data => {
      if (customize)
        if (activeSocialIcon === data?.connection_name)
          return { ...data, title: str };
        else return data;
      else if (data?.connection_name === 'Pinterest')
        return { ...data, title: str };
      else return data;
    });
    return newState;
  });
  setTitle(str);
};

export const mediaCategoriesFunc = (
  data,
  setMediaCategory,
  setTabType,
  clearDetails,
  customize,
  dynamicPayload,
  setDynamicPayload,
  activeSocialIcon
) => {
  if (data == 'Feed') {
    setMediaCategory(data);
    setTabType(1);
  } else {
    setTabType(3);
    setMediaCategory(data);
  }
  if (customize) {
    setDynamicPayload(prevState => {
      const newState = prevState?.map(item => {
        if (activeSocialIcon === item?.connection_name)
          return { ...item, mediaCategory: data };
        else return item;
      });
      return newState;
    });
  } else setDynamicPayload([...dynamicPayload, { mediaCategory: data }]);
  //clearDetails()
};

//Customization Function
export const customization = (
  customize,
  setIsModalVisible,
  setModalname,
  setCustomize,
  setActiveSocialIcon,
  selectedAccounts,
  dynamicPayload,
  setBeforeCustomize,
  setDeleted
) => {
  setDeleted(true);
  if (customize) {
    setIsModalVisible(true);
    setModalname('Revert');
  } else {
    setCustomize(true);
    setActiveSocialIcon(selectedAccounts[0]);
    let staticData = JSON.parse(JSON.stringify(dynamicPayload[0]));
    setBeforeCustomize(staticData);
  }
};

export const convertBase64 = (
  file,
  setSource,
  setFileList,
  fileList,
  setMediaCategoryList,
  setMediaCategory,
  customize,
  activeSocialIcon,
  setDynamicPayload,
  dynamicPayload,
  selectedAccounts,
  setModalOpen,
  fileUploadLoader,
  setSendData,
  files,
  setUploading
) =>
  new Promise((resolve, reject) => {
    const currentObj = Object.assign(file, {
      lastModifiedSet: Math.floor(Date.now() / 1000),
    });

    const reader = new FileReader();
    let permitted = null;
    if (file) {
      setUploading(true);
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

        // instagram ,facebook post validate
        if (file?.type?.startsWith('image/')) {
          const image = document.createElement('img');
          image.src = _loadedImageUrl;

          setFileList(prev => [
            ...prev,
            {
              thumbUrl: image.src,
              lastModified: currentObj?.lastModifiedSet,
              id: prev?.length + 1,
              name: file?.name,
            },
          ]);
          resolve(_loadedImageUrl);
        } else if (file?.type?.startsWith('video/')) {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.onloadedmetadata = function () {
            if (customize) {
              if (
                activeSocialIcon === 'Twitter' ||
                activeSocialIcon === 'Pinterest'
              ) {
              } else {
                setMediaCategoryList(['Feed', 'Reels']);
                setMediaCategory('Reels');
              }
              setDynamicPayload(prevState => {
                const newState = prevState?.map(data => {
                  if (activeSocialIcon === data?.connection_name)
                    return { ...data, videoSource: video.src };
                  else return data;
                });
                return newState;
              });
            } else {
              // if (
              //   parseInt(selectedAccounts?.length) === 1 &&
              //   (selectedAccounts[0] === 'Twitter' ||
              //     selectedAccounts[0] == 'Pinterest')
              // ) {
              // } else {
              //   setMediaCategoryList(['Feed', 'Reels']);
              //   setMediaCategory('Reels');
              // }
              setDynamicPayload(prevState => {
                const newState = prevState?.map(data => {
                  return { ...data, videoSource: video.src };
                });
                return newState;
              });
            }
            setSource(video.src);
            resolve(_loadedImageUrl);
          };
          video.src = URL.createObjectURL(file);
          if (!fileUploadLoader) {
            setModalOpen(false);
          }
        }
      });
    }
    reader.onerror = error => reject(error);
  });

export const imageHandleChange = (
  event,
  updateImageUrl,
  selectedAccounts,
  setModalOpen
) => {
  let checkingType = file?.type.split('/')?.[0];
  const file = event.target.files[0];
  const name = event.target.files[0]?.name;
  const type = file?.name?.split('.').pop();
  if (type === type?.toUpperCase()) {
    notification.warn({
      message: '',
      description: 'Only supported formats are jpg, jpeg, mp4,png',
    });
    setModalOpen(false);
  } else {
    if (checkingType === 'image') {
      updateImageUrl(file, name);
    } else {
      if (
        parseInt(selectedAccounts?.length) === 1 &&
        selectedAccounts[0] === 'Instagram'
      ) {
        updateImageUrl(file, name);
      } else {
        updateImageUrl(file, name);
      }
    }
  }
};

export const updateFile = async (
  file,
  name,
  getBase64,
  customize,
  dynamicPayload,
  activeSocialIcon,
  getfileUrl,
  previewList,
  setFileList,
  selectedAccounts,
  setFileType,
  setfileRestriction,
  setMediaCategoryList,
  setMediaCategory,
  setPreviewList,
  setDynamicPayload,
  mediaCategory
) => {
  let imageUrl = await getBase64(file);
  let fileObj = {
    name: name,
    status: 'done',
    lastModified: file?.lastModified,
    originFileObj: file,
  };
  let checkingType = file?.type.split('/')?.[0];

  setDynamicPayload(prevState => {
    const newState = prevState?.map(data => {
      if (customize) {
        if (activeSocialIcon === data?.connection_name)
          return checkingType === 'image'
            ? { ...data, localFileList: file }
            : { ...data, localFileList: [] };
        else return data;
      } else
        return checkingType === 'image'
          ? { ...data, localFileList: file }
          : { ...data, localFileList: [] };
    });
    return newState;
  });
  if (checkingType === 'image') {
    if (
      parseInt(selectedAccounts?.length) === 1 &&
      selectedAccounts[0] === 'Instagram'
    ) {
      setFileType('image');
      setfileRestriction('.jpeg,.jpg,.png');
    } else {
      setFileType('image');
      setfileRestriction('.jpeg,.jpg,.png');
      if (customize) {
        if (
          activeSocialIcon === 'Twitter' ||
          activeSocialIcon === 'Pinterest'
        ) {
        } else {
          setMediaCategoryList(['Feed', 'Reels']);
          setMediaCategory('Feed');
        }
      } else {
        if (
          parseInt(selectedAccounts?.length) === 1 &&
          (selectedAccounts[0] === 'Twitter' ||
            selectedAccounts[0] === 'Pinterest')
        ) {
        } else if (
          parseInt(selectedAccounts?.length) === 1 &&
          selectedAccounts[0] === 'Facebook Groups'
        ) {
        } else {
          setMediaCategoryList(['Feed', 'Reel']);
          setMediaCategory('Feed');
        }
      }
    }
  } else {
    if (
      parseInt(selectedAccounts?.length) === 1 &&
      selectedAccounts[0] === 'Instagram'
    ) {
      setFileType('image');
      setfileRestriction('.jpeg,.jpg,.png');
    } else {
      setFileType('video');
    }
  }
  setPreviewList([...previewList, { id: file?.lastModified, image: imageUrl }]);
  getfileUrl(imageUrl, fileObj);
  //setFileList(file);
};

export const videoHandleChange = (
  event,
  updateVideoUrl,
  setFileSize,
  setUploading
) => {
  const file = event.target.files[0];
  const size = event.target.files[0]?.size;
  const name = event.target.files[0]?.name;
  let maxSize = 7340032;
  updateVideoUrl(file, name);
  setUploading(true);
  setFileSize(size);
};

export const updateVideo = async (
  file,
  name,
  getBase64,
  setPreviewList,
  previewList,
  getfileUrl
) => {
  let imageUrl = await getBase64(file);
  setPreviewList([...previewList, { id: file?.lastModified, image: imageUrl }]);
  let fileObj = {
    name: name,
    status: 'done',
    lastModified: file?.lastModified,
    originFileObj: file,
  };
  getfileUrl(imageUrl, fileObj);
};

// removing or deleting
export const removingData = (
  file,
  customize,
  activeSocialIcon,
  dynamicPayload,
  setDynamicPayload,
  setFileList,
  setUplodededFiles,
  setPreviewList,
  fileList,
  uplodededFiles,
  previewList
) => {
  let apiFiltered, localfile;
  if (customize) {
    dynamicPayload?.map(data => {
      if (activeSocialIcon === data?.connection_name) {
        const filtered = data?.localFileList?.filter(
          item => file?.name != item?.name
        );
        setFileList(filtered);
        apiFiltered = data?.file_url?.filter(
          item => file?.lastModified != item?.id
        );
        localfile = data?.localFileList?.filter(
          item => file?.lastModified != item?.lastModified
        );
      }
    });
    setDynamicPayload(prevState => {
      const newState = prevState?.map(data => {
        if (activeSocialIcon === data?.connection_name)
          return { ...data, file_url: apiFiltered, localFileList: localfile };
        else return data;
      });
      return newState;
    });
  } else {
    dynamicPayload?.map(data => {
      apiFiltered = data?.file_url?.filter(
        item => file?.lastModified != item?.id
      );
      localfile = data?.localFileList?.filter(
        item => file?.lastModified != item?.lastModified
      );
    });
    setDynamicPayload(prevState => {
      const newState = prevState?.map(data => {
        return { ...data, file_url: apiFiltered, localFileList: localfile };
      });
      return newState;
    });
    const filtered = fileList?.filter(item => file?.name != item?.name);
    setFileList(filtered);
  }
  const fileFiltered = uplodededFiles?.filter(
    item => file?.lastModified != item?.id
  );
  setUplodededFiles(fileFiltered);
  const imageFiltered = previewList?.filter(
    item => file?.lastModified != item?.id
  );
  setPreviewList(imageFiltered);
};

export const deletedReels = (
  setSource,
  setUplodededFiles,
  customize,
  dynamicPayload,
  activeSocialIcon,
  setDynamicPayload,
  setfileRestriction,
  fileInputRef
) => {
  setSource();
  setUplodededFiles([]);
  setfileRestriction('.jpg,.jpeg,.mp4,.png');
  setDynamicPayload(prevState => {
    const newState = prevState?.map(data => {
      if (customize) {
        if (activeSocialIcon === data?.connection_name)
          return { ...data, file_url: [], localFileList: [], videoSource: '' };
        else return data;
      } else
        return { ...data, file_url: [], localFileList: [], videoSource: '' };
    });
    return newState;
  });
  fileInputRef.current.value = null;
};

// export const deletedVideo = (
//   setUplodededFiles,
//   setFileType,
//   setFileList,
//   deleteReels,
//   setfileRestriction,
//   fileInputRef
// ) => {
//   setUplodededFiles([]);
//   setFileType('image');
//   setFileList([]);
//   deleteReels();
//   setfileRestriction('.jpg,.jpeg,.mp4,.png');
//   fileInputRef.current.value = null;
// };

export const exitingAccounts = (
  item,
  items,
  selectedAccounts,
  setSelectedAccounts,
  setFilteredDropdownList,
  setDynamicPayload
) => {
  let arrayVal = [];
  const filteredAccounts = selectedAccounts?.filter(data => data != item);
  items.forEach(val => {
    if (val?.title === item) {
      arrayVal.push({ ...val, checked: false });
    } else arrayVal.push({ ...val });
  });
  setSelectedAccounts(filteredAccounts);
  setFilteredDropdownList(arrayVal);
};
