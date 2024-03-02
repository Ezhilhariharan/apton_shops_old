import createNewTemplate from '@assets/images/createNewTemplate.svg';
import EditTemplateImage from '@assets/images/EditTemplateImage.svg';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../../../theme/styles/light/lightTheme';
import Flex from '@components/common/Flex';
import { Button, Divider, Modal } from 'antd';
import { NewTemplateCard } from './TemplateHeader';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { createTemplatePopup, uploadTemplateForm } from '../../actions';

const TemplateText = styled.div`
  color: ${lightColorsTheme.darkBlack};
  font-weight: 700;
  font-size: 1rem;
`;

const CursorBox = styled.div`
  cursor: pointer;
`;

export const CreateTemplateModal = styled(Modal)`
  width: 75rem !important;
  .ant-modal-content {
    border-radius: 20px;
    box-shadow: none;
  }
  .divider {
    height: 1px;
    background: #f4f4f5;
    width: 100%;
    margin: 10px 0;
  }
  .main {
    width: 100%;
    display: flex;
    flex-direction: row;
    .left {
      width: 70%;
      padding: 5px;
      padding-right: 30px;
      overflow: scroll;
      height: 70vh;
    }
    .right {
      width: 30%;
      overflow: scroll;
      height: 70vh;
    }
    .customButton {
      width: 200px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 10px;
      //   border: 1px solid red;
      border-radius: 5px;
      background-color: ${lightColorsTheme.headerInputBackground} !important;
    }
  }
`;

export const EditTemplateModal = styled(Modal)`
  width: 900px !important;
  .ant-modal-content {
    border-radius: 20px;
    box-shadow: none;
  }
`;

const NewTemplatePopup = ({
  setOpen,
  open,
  setCreateTemplate,
  setEditTemplate,
}) => {
  const dispatch = useDispatch();

  const openPopup = () => {
    // clearing before open
    dispatch(
      uploadTemplateForm(
        Object.assign(
          {},
          {
            header: '',
            body: '',
            footer: '',
            buttonText1: '',
            buttonText2: '',
            buttonMarketing: '',
            linkType: '',
            linkName: '',
            link: '',
            phoneName: '',
            phoneNumber: '',
            phoneCountryCode: '+91',
            website_filed_checkbox: true,
            add_sample_url: '',
            phone_field_checkbox: false,
            addButtonValue: null,
          }
        )
      )
    );
    dispatch(createTemplatePopup(true));
    setOpen(false);
  };
  return (
    <NewTemplateCard open={open} onCancel={() => setOpen(false)} footer={null}>
      <div>
        <TemplateText>Create new template</TemplateText>
        <Divider />
        <Flex center>
          <CursorBox
            onClick={() => {
              // setCreateTemplate(true)
              // dispatch(createTemplatePopup(true));
              // setOpen(false);
              openPopup();
            }}
          >
            <img src={createNewTemplate} width="380px" height="300px"></img>
          </CursorBox>
          {/* <CursorBox
            onClick={() => {
              setEditTemplate(true);
              setOpen(false);
            }}
          >
            <img src={EditTemplateImage} width="380px" height="300px"></img>
          </CursorBox> */}
        </Flex>
      </div>
    </NewTemplateCard>
  );
};

export default NewTemplatePopup;
