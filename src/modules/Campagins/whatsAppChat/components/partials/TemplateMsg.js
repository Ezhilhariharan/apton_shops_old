import React from 'react';
import { Button, Card, Typography } from 'antd';
import styled from 'styled-components';
import Flex from '@components/common/Flex';
import { WhiteText } from './ChatCSS';

const StyledBtn = styled(Button)`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  color: #4d4d4d;

  margin: 10px;
  //border-radius: 0px 10px 10px 10px;
  height: 40px;
`;
const StyleBtn = styled.a`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  padding: 3px;
  margin: 10px;
  //border-radius: 0px 10px 10px 10px;
  height: 40px;
`;

const Text = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
`;

const sentText = styled.div`
  max-width: auto;
  height: auto;
  background: #ffffff;
  overflow: hidden;
  white-space: pre-line;
  overflow-wrap: break-word;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0 10px 10px 10px;
  margin: 10px 270px 0px 20px;
  padding: 10px;
`;

// const actionsSection = item => {
//   return (

//   );
// };

// const footerContent = content => {
//   return <></>;
// };

// const headerContent = (content, videoContent) => {
//   return <></>;
// };

const temBodyContent = (header, content, footerItem, videoContent) => {
  return (
    <div style={{ margin: 5 }}>
      <div style={{ marginBottom: 5 }}>
        {headerContent(header, videoContent)}
      </div>

      <div>{footerContent(footerItem)}</div>
    </div>
  );
};

const TemplateMsg = ({ item }) => {
  let bodyContent,
    header,
    videoContent,
    imageContent,
    documentContent,
    footerItem,
    actions,
    imageSrc,
    src,
    documentSrc,
    obj;
  if (Array.isArray(item)) {
    bodyContent = item?.filter(i => i.type === 'BODY');
    header = item?.filter(i => i.type === 'HEADER');
    videoContent = item?.filter(i => i.format === 'VIDEO');
    src = videoContent?.map(
      i => i.format === 'VIDEO' && i.example.header_handle[0]
    );
    imageContent = item?.filter(i => i.format === 'IMAGE');
    imageSrc = imageContent?.map(
      i => i.format === 'IMAGE' && i.example.header_handle[0]
    );
    documentSrc = documentContent?.map(
      i => i.format === 'DOCUMENT' && i.example.header_handle[0]
    );
    documentContent = item?.filter(i => i.format === 'DOCUMENT');
    footerItem = item?.filter(i => i.type === 'FOOTER');
    actions = item?.filter(i => i.type === 'BUTTONS');
  } else {
    obj = item;
    if (obj?.type === 'text') {
    }
  }
  return (
    <div>
      {/* {temBodyContent(
        header,
        boadyContent,
        footerItem,
        videoContent,
        imageContent,
        documentContent
      )}
      {actionsSection(actions)} */}

      {/* header content */}
      <div>
        {header?.length > 0 &&
          header.map((item, ind) => {
            return (
              <>
                <Typography.Paragraph key={ind}>
                  <Text>{item.text}</Text>
                </Typography.Paragraph>

                {item?.format === 'TEXT' && (
                  <Typography.Paragraph key={ind}>
                    <Text>{item.text}</Text>
                  </Typography.Paragraph>
                )}

                {item?.format === 'VIDEO' && (
                  <div>
                    <video
                      src={src[0]}
                      width={'400px'}
                      height={'250px'}
                      controls
                      style={{ objectFit: 'cover', borderRadius: '10px' }}
                    />
                  </div>
                )}

                {item?.format === 'IMAGE' && (
                  <div>
                    <img
                      src={imageSrc[0]}
                      width={'400px'}
                      height={'250px'}
                      style={{ borderRadius: '10px', objectFit: 'fill' }}
                    />
                  </div>
                )}
                {item?.format === 'DOCUMENT' && (
                  <Flex center>
                    <document
                      src={documentSrc}
                      width="400px"
                      height="250px"
                      style={{ borderRadius: '10px' }}
                    />
                  </Flex>
                )}
              </>
            );
          })}
      </div>

      <sentText>
        {item?.type === 'text' && <span>{item?.text?.body}</span>}
      </sentText>

      {/* body content */}
      <div>
        {bodyContent?.length > 0 &&
          bodyContent?.map(item => (
            <Typography.Paragraph key={item?.id}>
              {item?.text}
            </Typography.Paragraph>
          ))}
      </div>

      {/* footer content */}
      <div>
        {footerItem?.length > 0 &&
          footerItem?.map(item => (
            <Typography.Paragraph key={item?.id}>
              {item?.text}
            </Typography.Paragraph>
          ))}
      </div>
      {/* ACTIONS */}

      <div>
        {actions?.length > 0 &&
          actions[0]?.buttons?.map(item => {
            return (
              <Flex center key={item?.id}>
                {item?.type === 'QUICK_REPLY' && (
                  <StyleBtn style={{ color: '#4d4d4d !important' }}>
                    <Button type="link">
                      <p style={{ color: '#4d4d4d' }}>{item?.text}</p>
                    </Button>
                  </StyleBtn>
                )}
                {item?.type === 'URL' && (
                  <StyleBtn href={item?.url}>
                    <Button type="link">
                      <p style={{ color: '#4d4d4d' }}>{item?.text}</p>
                    </Button>
                  </StyleBtn>
                )}
                {item?.type === 'PHONE_NUMBER' && (
                  <StyleBtn href={`tel:${item.phone_number}`}>
                    <Button type="link">
                      <p style={{ color: '#4d4d4d' }}>{item?.text}</p>
                    </Button>
                  </StyleBtn>
                )}
              </Flex>
            );
          })}
      </div>
    </div>
  );
};

export default TemplateMsg;
