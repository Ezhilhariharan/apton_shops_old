import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import Flex from '@components/common/Flex';
import { Linespan } from './Pages.style';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Buttonvalues, Options, disableOption } from '../partials/StaticData';
import {
  postValidation,
  postActionsValidation,
  actionValidating,
} from './CreateHelper';
import Upgrade from '../../../../../../upgrade/components/Upgrade';

const PostAction = ({ openModal, clearDetails, tabs, post, sendReels }) => {
  const [openUpgrade, setOpenUpgrade] = useState(false);

  const feedDiscription = useSelector(
    state => state?.socialMedialExtended?.feedDescription
  );
  const source = useSelector(state => state?.socialMedialExtended?.source);
  const fileList = useSelector(state => state?.socialMedialExtended?.fileList);
  const fileUploadLoader = useSelector(
    state => state?.socialMedialIntegration?.fileUploadLoader,
    shallowEqual
  );
  const uploading = useSelector(
    state => state?.socialMedialExtended?.mediaLoader
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const mediaCategory = useSelector(
    state => state?.socialMedialExtended?.activeMediaCategory
  );
  const selectedBoard = useSelector(
    state => state?.socialMedialExtended?.selectedBoard
  );
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );

  return (
    <Flex spaceBetween>
      <Row>
        {((feedDiscription?.length > 0 && feedDiscription?.trim() != '') ||
          fileList?.length > 0 ||
          source) &&
        postActionsValidation(selectedAccounts, fileList, source) &&
        !fileUploadLoader
          ? Options?.map(data => {
              const showCmmnt = actionValidating(
                selectedAccounts,
                customize,
                activeSocialIcon
              );
              const array = Options;
              const final = array[array.length - 1];
              return showCmmnt && data?.name === 'Chat' ? null : (
                <>
                  <Col
                    span={1}
                    style={{ cursor: 'pointer', margin: '0px 17px 0px 10px' }}
                    onClick={() =>
                      data?.name !== 'Clear'
                        ? openModal(data?.name)
                        : clearDetails()
                    }
                  >
                    <div>{data?.icon}</div>
                  </Col>
                  {data?.name === final?.name ? (
                    <span></span>
                  ) : (
                    <Linespan></Linespan>
                  )}
                </>
              );
            })
          : disableOption?.map(item => {
              const array = disableOption;
              const final = array[array.length - 1];
              return (
                <>
                  <div style={{ margin: '0px 10px 0px 10px' }}>
                    {item?.icon}
                  </div>
                  {item?.name === final?.name ? (
                    <span></span>
                  ) : (
                    <Linespan></Linespan>
                  )}
                </>
              );
            })}
      </Row>
      <div>
        {Buttonvalues?.map(item => {
          let validatedValue = postValidation(
            feedDiscription,
            selectedAccounts,
            fileList,
            selectedBoard,
            mediaCategory,
            source,
            uploading
          );
          return (
            <Button
              type="primary"
              disabled={validatedValue}
              style={{
                color:
                  !validatedValue &&
                  uploading &&
                  (item?.name === 'Publish' &&
                  ((feedDiscription?.length > 0 &&
                    feedDiscription?.trim() != '') ||
                    fileList?.length >= 1 ||
                    source)
                    ? '#4AACEA'
                    : ''),
                marginLeft: '10px',
                borderRadius: '5px',
                fontWeight: '700',
                fontSize: '16px',
                width: '110px',
                height: '35px',
                border:
                  !validatedValue &&
                  uploading &&
                  ((feedDiscription?.length > 0 &&
                    feedDiscription?.trim() != '') ||
                    fileList?.length >= 1)
                    ? '2px solid #4AACEA'
                    : '2px solid #D9D9D9',
                backgroundColor:
                  !validatedValue &&
                  uploading &&
                  (item?.name === 'Publish' &&
                  ((feedDiscription?.length > 0 &&
                    feedDiscription?.trim() != '') ||
                    fileList?.length >= 1 ||
                    source)
                    ? 'white'
                    : ''),
              }}
              onClick={() =>
                priceValidation?.add_social_media
                  ? parseInt(tabs) == 3
                    ? sendReels(item?.name)
                    : post(item?.name)
                  : setOpenUpgrade(true)
              }
              loading={uploading && true}
            >
              {uploading ? '' : item?.name}
            </Button>
          );
        })}
      </div>
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </Flex>
  );
};

export default PostAction;
