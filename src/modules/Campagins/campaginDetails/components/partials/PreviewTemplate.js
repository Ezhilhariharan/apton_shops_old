import React from 'react';
import { Button, Card, Typography } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';

const StyledBtn = styled(Button)`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  margin: 3px 0px 0px 0px;
  border-radius: 0px 10px 10px 10px;
  height: 40px;
`;
const StyleBtn = styled.a`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  margin: 3px 0px 0px 0px;
  border-radius: 0px 10px 10px 10px;
  height: 40px;
`;

const Text = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  padding: 5px;
  color: #000000;
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
                        <Button type="link">{btn.text}</Button>
                      </StyleBtn>
                    )}
                    {btn.type === 'URL' && (
                      <StyleBtn href={btn.url}>
                        <Button type="link">{btn.text}</Button>
                      </StyleBtn>
                    )}
                    {btn.type === 'QUICK_REPLY' && (
                      <StyledBtn type="primary">
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

const headerContent = content => {
  return (
    <>
      {/* {content?.length > 0 &&
        content.map(item => <Text key={item?.id}>{item?.text}</Text>)} */}
    </>
  );
};

const temBodyContent = (header, content, footerItem) => {
  return (
    <Card style={{ borderRadius: '10px' }}>
      <div style={{ marginBottom: 5 }}>{headerContent(header)}</div>
      <div>
        {content?.length > 0 &&
          content.map(item => (
            <Typography.Paragraph key={item?.id}>
              {item?.text}
            </Typography.Paragraph>
          ))}
      </div>
      <div>{footerContent(footerItem)}</div>
    </Card>
  );
};

const PreviewTemplate = ({ item }) => {
  const boadyContent = item?.response?.template_body?.components?.filter(
    i => i.type === 'BODY'
  );
  const header = item?.response?.template_body?.components?.filter(
    i => i.type === 'HEADER'
  );
  const footerItem = item?.response?.template_body?.components?.filter(
    i => i.type === 'FOOTER'
  );
  const actions = item?.response?.template_body?.components?.filter(
    i => i.type === 'BUTTONS'
  );
  return (
    <div>
      {temBodyContent(header, boadyContent, footerItem)}
      {actionsSection(actions)}
    </div>
  );
};

export default PreviewTemplate;
