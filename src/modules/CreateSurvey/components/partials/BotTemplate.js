import React from 'react';
import { Button, Card, Typography } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { lightColorsTheme } from '@theme/styles/light/lightTheme';
import documentImage from '@assets/images/documentImage.svg';
import SourceHandler from './SourceHandler';

const Text = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #4aacea;
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
                    <SourceHandler data={{id:btn.text,title:btn.text}}/>
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
            <div key={ind}>
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
            </div>
          );
        })}
    </>
  );
};

const temBodyContent = (content, footerItem, headerContent) => {
  return (
    <Card>
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

const BotTemplate = ({ item }) => {
  const boadyContent = item?.components?.filter(i => i.type === 'BODY');
  const headerContent = item?.components?.filter(i => i.type === 'HEADER');
  const footerItem = item?.components?.filter(i => i.type === 'FOOTER');
  const actions = item?.components?.filter(i => i.type === 'BUTTONS');
  return (
    <div>
      {temBodyContent(boadyContent, footerItem, headerContent)}
      {actionsSection(actions)}
    </div>
  );
};
export default BotTemplate;
