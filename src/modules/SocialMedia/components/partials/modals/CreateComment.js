import React, { useState } from 'react';
import {
  Divider,
  Typography,
  Row,
  Col,
  Input,
  Button,
  Card,
  Popover,
} from 'antd';
import Facebook from '@assets/images/Facebook.png';
import Instagram from '@assets/images/Instagram.png';
import twitter from '@assets/images/twitter.png';
import styled from 'styled-components';
import { InfoCircleOutlined, SmileOutlined } from '@ant-design/icons';
import Linkedin from '@assets/images/LinkdinPage.svg';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import datas from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
  updateDynamicUpload,
  updateComments,
  socialMediaPopupToggle,
  setSelectedDataForPopup,
} from '../../../extendedAction';

const { TextArea } = Input;

const Heading = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #4aacea;
`;
const Text = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
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
`;
const PostButton = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  .infoText {
    color: #999999;
    font-size: 12px;
    margin-top: 7px;
    display: flex;
    margin-right: 20px;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
`;
const Wrapper = styled('div')`
  .ant-divider-horizontal {
    margin: 15px 0px;
  }
  .Cancel {
    color: #999999;
    margin-right: 15px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #999999;
  }
  .Create {
    color: white;
    border-radius: 5px;
    background-color: #4aacea;
  }
  .fotter {
    height: 20px;
  }
  .divider {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 8px;
  }
  .row {
    margin-top: 18px;
    margin-bottom: 10px;
  }
  .flex {
    display: flex;
  }
  .marginRight {
    margin-right: 10px;
  }
  .info {
    margin-top: 3px;
    margin-right: 5px;
  }
`;
const CreateComment = ({ create, setSaveComment }) => {
  const dispatch = useDispatch();
  const selectedAccounts = useSelector(
    state => state?.socialMedialExtended?.createSelectedAccount
  );
  const activeSocialIcon = useSelector(
    state => state?.socialMedialExtended?.socialIcon
  );
  const customize = useSelector(
    state => state?.socialMedialExtended?.customizeStatus
  );
  const addComment = useSelector(state => state?.socialMedialExtended?.Comment);
  const dynamicPayload = useSelector(
    state => state?.socialMedialExtended?.dynamicUpload
  );
  const feedDiscription = useSelector(
    state => state?.socialMedialExtended?.feedDescription
  );

  const [openPicker, setOpenPicker] = useState(false);

  const onChange = e => {
    updateComment(e.target.value);
  };

  const cancel = () => {
    dispatch(socialMediaPopupToggle(false));
    dispatch(
      setSelectedDataForPopup({
        platform_type: '',
        file_url: '',
        message: '',
        type: '',
      })
    );
  };

  const updateComment = value => {
    // setAddComment( e.target.value);
    dispatch(updateComments(value));
    const updateDynamicChanges = [];
    dynamicPayload?.map(data => {
      if (customize)
        if (activeSocialIcon === data?.connection_name) {
          activeSocialIcon == 'Facebook Groups'
            ? updateDynamicChanges.push({ ...data, comment: '' })
            : updateDynamicChanges.push({ ...data, comment: value });
        } else updateDynamicChanges.push({ ...data });
      else updateDynamicChanges.push({ ...data, comment: value });
    });
    dispatch(updateDynamicUpload(updateDynamicChanges));
  };
  const post = async => {
    commentPost(addComment);
    cancel();
  };
  const addPost = () => {
    updateComment(addComment);
    dispatch(socialMediaPopupToggle(false));
    const updateDynamicChanges = [];
    if (customize) {
      dynamicPayload?.map(data => {
        if (activeSocialIcon === data?.connection_name)
          updateDynamicChanges.push({ ...data, savedComment: true });
        else updateDynamicChanges.push({ ...data });
      });
    } else
      dynamicPayload?.map(data =>
        updateDynamicChanges.push({ ...data, savedComment: true })
      );
    dispatch(updateDynamicUpload(updateDynamicChanges));
    setSaveComment(true);
  };

  const deleteData = () => {
    // setComment("")
    updateComment('');
    // setModal(false)
    dispatch(socialMediaPopupToggle(false));
    setSaveComment(false);
    const updateDynamicChanges = [];
    if (customize) {
      dynamicPayload?.map(data => {
        if (activeSocialIcon === data?.connection_name)
          updateDynamicChanges.push({ ...data, savedComment: false });
        else updateDynamicChanges.push({ ...data });
      });
    } else
      dynamicPayload?.map(data =>
        updateDynamicChanges.push({ ...data, savedComment: false })
      );
    dispatch(updateDynamicUpload(updateDynamicChanges));
  };
  const picker = (
    <div className={openPicker ? 'd-block' : 'd-none'}>
      <Picker
        data={datas}
        previewPosition="none"
        onEmojiSelect={e => {
          setOpenPicker(!openPicker);
          updateComment(addComment ? addComment + e.native : e.native);
        }}
      />
    </div>
  );
  return (
    <Wrapper>
      <Heading>Follow-up Comments</Heading>
      <Divider className="divider" />
      <Text>
        Comments will be automatically posted after the amount of time you
        selected Accounts.
      </Text>
      <Row className="row">
        <Col span={20} className="flex">
          {customize ? (
            <>
              {activeSocialIcon == 'Linkedin Pages' && (
                <img
                  src={Linkedin}
                  alt="Lightence"
                  width={30}
                  height={30}
                  className="marginRight"
                />
              )}
              {activeSocialIcon == 'Facebook' && (
                <img
                  src={Facebook}
                  alt="Lightence"
                  width={30}
                  height={30}
                  className="marginRight"
                />
              )}
              {activeSocialIcon == 'Instagram' && (
                <img
                  src={Instagram}
                  alt="Lightence"
                  width={30}
                  height={30}
                  className="marginRight"
                />
              )}
              {activeSocialIcon == 'Twitter' && (
                <img
                  src={twitter}
                  alt="Lightence"
                  width={30}
                  height={30}
                  className="marginRight"
                />
              )}
            </>
          ) : (
            <>
              {selectedAccounts?.map(item => (
                <>
                  {item == 'Linkedin Pages' && (
                    <img
                      src={Linkedin}
                      alt="Lightence"
                      width={30}
                      height={30}
                      className="marginRight"
                    />
                  )}
                  {item == 'Facebook' && (
                    <img
                      src={Facebook}
                      alt="Lightence"
                      width={28}
                      height={28}
                      className="marginRight"
                    />
                  )}
                  {item == 'Instagram' && (
                    <img
                      src={Instagram}
                      alt="Lightence"
                      width={30}
                      height={30}
                      className="marginRight"
                    />
                  )}
                  {item == 'Twitter' && (
                    <img
                      src={twitter}
                      alt="Lightence"
                      width={30}
                      height={30}
                      className="marginRight"
                    />
                  )}
                </>
              ))}
            </>
          )}
        </Col>
        <Col span={4}>
          <div> {addComment?.length} / 2200 </div>
        </Col>
      </Row>
      <TextCard>
        <TextArea
          showCount={false}
          maxLength={2200}
          bordered={false}
          style={{ height: 150 }}
          onChange={onChange}
          value={addComment}
          placeholder="Write Something..."
        />
        <div>
          <Row>
            <Col span={18}>
              <Buttons
                size="small"
                onClick={() => updateComment(addComment + '#')}
              >
                # Hashtags
              </Buttons>
              <Popover content={picker} trigger="click" open={openPicker}>
                <Buttons
                  size="small"
                  style={{ border: 'none' }}
                  onClick={() => setOpenPicker(!openPicker)}
                >
                  <SmileOutlined style={{ fontSize: '20px' }} />
                </Buttons>
              </Popover>
            </Col>
          </Row>
        </div>
      </TextCard>
      <PostButton>
        <div className="infoText">
          <InfoCircleOutlined className="info" /> Facebook group and Pinterest
          comments cannot be added or scheduled.
        </div>
        <div className="row">
          <Button
            type="primary"
            className="Cancel"
            onClick={() =>
              addComment?.length > 0 ? updateComment('') : deleteData()
            }
          >
            {addComment?.length > 0 ? 'Clear' : 'Cancel'}
          </Button>
          <Button
            type="primary"
            className="Create"
            onClick={() => (create ? addPost() : post())}
          >
            Save
          </Button>
        </div>
      </PostButton>
      <div className="fotter"></div>
    </Wrapper>
  );
};

export default CreateComment;
