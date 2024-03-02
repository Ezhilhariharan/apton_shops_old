import React from 'react';
import { Button, Card, Typography } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { lightColorsTheme } from '../../../../../../theme/styles/light/lightTheme';
import documentImage from '@assets/images/documentImage.svg';

const StyledBtn = styled(Button)`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  margin: 0px 10px 5px 10px;
  border-radius: 10px;
  height: 40px;
  &:hover {
    background: #ffffff;
  }
  &:focus {
    background: #ffffff;
  }
`;
const StyleBtn = styled(Button)`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  margin: 0px 10px 5px 10px;
  border-radius: 10px;
  height: 40px;
  &:hover {
    background: #ffffff;
    cursor: none;
  }
  &:focus {
    background: #ffffff;
    cursor: none;
  }
`;

const Text = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  color: #4aacea;
  margin: 5px;
`;

const HeaderText = styled(Text)`
  color: ${lightColorsTheme.darkBlack};
`;

const actionsSection = item => {
  return (
    <>
      {item?.length > 0 && (
        <>
          {item.map(i => (
            <>
              {i.buttons.map(btn => {
                return (
                  <Flex center key={btn?.id}>
                    {btn.type === 'PHONE_NUMBER' && (
                      <StyleBtn href={`tel:${btn.phone_number}`}>
                        <Text>{btn.text}</Text>
                      </StyleBtn>
                    )}
                    {btn.type === 'URL' && (
                      <StyleBtn href={btn.url}>
                        <Text>{btn.text}</Text>
                      </StyleBtn>
                    )}
                    {btn.type === 'QUICK_REPLY' && (
                      <StyledBtn>
                        <Text>{btn.text}</Text>
                      </StyledBtn>
                    )}
                  </Flex>
                );
              })}
            </>
          ))}
        </>
      )}
    </>
  );
};

const footerContent = content => {
  return (
    <>
      {content?.length > 0 &&
        content.map(item => (
          <Typography.Paragraph key={item?.id}>
            {item?.text}
          </Typography.Paragraph>
        ))}
    </>
  );
};

const headerDisplay = content => {
  return (
    <>
      {content?.length > 0 &&
        content?.map((header, ind) => {
          return (
            <>
              {header?.format === 'TEXT' && (
                <Typography.Paragraph key={ind}>
                  <HeaderText>{header.text}</HeaderText>
                </Typography.Paragraph>
              )}
              {header?.format === 'VIDEO' && (
                <div>
                  <video
                    src={header?.example?.header_handle[0]}
                    autoPlay
                    muted
                    width="100%"
                    height="auto"
                    loop={true}
                  ></video>
                </div>
              )}
              {header?.format === 'IMAGE' && (
                <div>
                  <img
                    src={header?.example?.header_handle[0]}
                    width="100%"
                    height="100%"
                  ></img>
                </div>
              )}
              {header?.format === 'DOCUMENT' && (
                <Flex center>
                  <img src={documentImage} width="260px" height="160px"></img>
                </Flex>
              )}
            </>
          );
        })}
    </>
  );
};

const temBodyContent = (content, footerItem, headerContent) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      {headerDisplay(headerContent)}
      {content?.length > 0 &&
        content.map(item => (
          <Typography.Paragraph key={item?.id}>
            {item?.text}
          </Typography.Paragraph>
        ))}
      {footerContent(footerItem)}
    </Card>
  );
};

const Template = ({ item, campaginDetails, selectedWhatsAppCampagin }) => {
  const camp = campaginDetails?.campaign_template?.response?.template_body;
  const boadyContent =
    item === undefined && selectedWhatsAppCampagin?.list_status === 'Draft'
      ? camp?.components?.filter(i => i.type === 'BODY')
      : item?.components?.filter(i => i.type === 'BODY');
  const headerContent =
    item === undefined && selectedWhatsAppCampagin?.list_status === 'Draft'
      ? camp?.components?.filter(i => i.type === 'HEADER')
      : item?.components?.filter(i => i.type === 'HEADER');
  const footerItem =
    item === undefined && selectedWhatsAppCampagin?.list_status === 'Draft'
      ? camp?.components?.filter(i => i.type === 'FOOTER')
      : item?.components?.filter(i => i.type === 'FOOTER');
  const actions =
    item === undefined && selectedWhatsAppCampagin?.list_status === 'Draft'
      ? camp?.components?.filter(i => i.type === 'BUTTONS')
      : item?.components?.filter(i => i.type === 'BUTTONS');
  return (
    <div>
      {temBodyContent(boadyContent, footerItem, headerContent)}
      {actionsSection(actions)}
    </div>
  );
};

export default Template;
