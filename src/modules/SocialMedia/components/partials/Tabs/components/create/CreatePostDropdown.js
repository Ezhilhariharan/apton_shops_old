import React, { useState, useEffect, memo, useCallback } from 'react';
import { Row } from 'antd';
import { DropDownRow, SocialIconsName, SocialIcon } from './Pages.style';
import DropdownList from './dropdownList';
import AddAccounts from '@components/icons/AddAccounts';
import { DropdownList as dropDownAccountList } from '../partials/StaticData';
//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  updateDropdownList,
  updateCreateSelectedAccounts,
  updateSocialIcon,
} from '../../../../../extendedAction';

function CreatePostDropdown() {
  const dispatch = useDispatch();
  const accounts = useSelector(
    state => state?.socialMedialExtended?.availableAccounts
  );
  const items = useSelector(state => state?.socialMedialExtended?.dropdownList);
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );

  useEffect(() => {
    let connectedAccounts = [];
    dropDownAccountList?.forEach(parent => {
      accounts?.map(child => {
        if (parent?.title === child?.apiData?.platform_name) {
          parseInt(child?.apiData?.connection_status) === 1 &&
            connectedAccounts.push({
              ...parent,
              apiData: child?.apiData,
              checked: false,
            });
        }
      });
    });

    dispatch(updateDropdownList(connectedAccounts));
  }, [accounts]);

  const onChangeDropDown = useCallback(checkedValues => {
    let arrayVal = [];
    let selectedItem = [];
    items?.forEach(val => {
      if (val?.title === checkedValues?.target?.value) {
        if (val.checked) {
          arrayVal.push({ ...val, checked: false });
          const previousData =
            selectedAccounts[
              selectedAccounts.indexOf(checkedValues?.target?.value) - 1
            ];
          customize && dispatch(updateSocialIcon(previousData));
        } else {
          arrayVal.push({ ...val, checked: true });
        }
      } else arrayVal.push({ ...val });
    });
    arrayVal?.filter(
      data => {
        if (data.checked) {
          selectedItem?.unshift(data.title);
        }
      },
      [items]
    );
    const mergingValue = [...selectedAccounts, checkedValues?.target?.value];
    const avoidDuplicate = mergingValue.filter(
      (item, index) => mergingValue.indexOf(item) === index
    );
    const updatedSelectedCount = [];
    avoidDuplicate?.map(parent =>
      arrayVal?.map(
        child =>
          child.title === parent &&
          child.checked === true &&
          updatedSelectedCount.push(parent)
      )
    );
    dispatch(updateCreateSelectedAccounts(updatedSelectedCount));
    dispatch(updateDropdownList(arrayVal));
  });

  return (
    <div className="dropdown">
      <SocialIcon>
        <AddAccounts />
      </SocialIcon>
      <div className="dropdown-content">
        {items?.map(list => (
          <DropdownList
            key={list?.key}
            list={list}
            onChangeDropDown={onChangeDropDown}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(CreatePostDropdown);
