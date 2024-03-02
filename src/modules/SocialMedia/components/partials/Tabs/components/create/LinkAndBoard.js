import React, { useEffect, useState } from 'react';
import Flex from '@components/common/Flex';
import styled from 'styled-components';
import {
  TitleInput,
  Customize,
  PinterestWrapper,
  SelectInput,
  SocialMediaModal,
} from './Pages.style';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  updatePinterestLink,
  updateBoardList,
  updateSelectedPinterestBoard,
} from '../../../../../extendedAction';
import CreateBoard from '../../../modals/CreateBoard';

function LinkAndBoard() {
  const dispatch = useDispatch();
  const [modalPopup, setModalPopup] = useState(false);
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  const boardList = useSelector(
    state => state?.socialMedialIntegration?.PinterestBoardList,
    shallowEqual
  );
  const boardListOptions = useSelector(
    state => state?.socialMedialExtended?.boardList,
    shallowEqual
  );
  const errorLink = useSelector(
    state => state?.socialMedialIntegration?.pinterestLink?.error,
    shallowEqual
  );
  const link = useSelector(
    state => state?.socialMedialExtended?.pinterestLink?.link
  );

  useEffect(() => {
    const List =
      boardList?.items?.length > 0
        ? boardList?.items?.map(data => ({ value: data.id, label: data.name }))
        : [];
    let LocalData = [];
    List?.forEach(data => {
      LocalData?.push(data);
    });
    dispatch(updateSelectedPinterestBoard(boardListOptions[0]?.value));
    dispatch(updateBoardList(LocalData));
  }, [boardList]);

  useEffect(
    () => dispatch(updateSelectedPinterestBoard(boardListOptions[0]?.value)),
    [boardListOptions]
  );

  const ValidationLink = val => {
    var res = val.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    let pinterestLink = {
      link: '',
      error: '',
    };
    if (res == null) {
      pinterestLink = {
        link: val,
        error: 'Enter Valid Link *',
      };
    } else {
      pinterestLink = {
        link: val,
        error: null,
      };
    }
    dispatch(updatePinterestLink(pinterestLink));
  };

  const addBoard = () => setModalPopup(true);
  const closeModal = () => setModalPopup(false);

  return (
    <>
      {((selectedAccounts?.length == 1 && selectedAccounts[0] == 'Pinterest') ||
        (customize && activeSocialIcon == 'Pinterest')) && (
        <>
          <PinterestWrapper>
            <TitleInput
              maxLength={100}
              value={link}
              link={true}
              onChange={e => ValidationLink(e.target.value)}
              placeholder="Add destination link . . ."
            />
          </PinterestWrapper>

          {errorLink && <Error>{errorLink}</Error>}
          <Flex spaceBetween style={{ width: '100%' }}>
            <SelectInput
              defaultValue={boardListOptions[0]?.label}
              placeholder={
                boardListOptions?.length === 0
                  ? 'Please Add Board'
                  : 'Select Board'
              }
              onChange={val => dispatch(updateSelectedPinterestBoard(val))}
              options={boardListOptions}
            />
            <Customize addBoard={true} onClick={() => addBoard()}>
              Add Board
            </Customize>
          </Flex>
        </>
      )}
      <SocialMediaModal
        bodyStyle={{ borderRadius: '10px' }}
        mask={false}
        open={modalPopup}
        maskClosable={false}
        onCancel={closeModal}
        okText={'Save'}
        footer={false}
        centered={true}
      >
        <CreateBoard cancel={closeModal} />
      </SocialMediaModal>
    </>
  );
}

export default LinkAndBoard;
