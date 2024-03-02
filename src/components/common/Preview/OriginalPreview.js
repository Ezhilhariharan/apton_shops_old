import React, { memo, useState, useEffect } from 'react';
import { lightColorsTheme } from '../../../theme/styles/light/lightTheme';
import styled from 'styled-components';
import documentImage from '@assets/images/documentImage.svg';
import * as E from '../../../modules/Campagins/Template/components/partials/CreateTemplateForm.styles';
import Flex from '../Flex';
// import LinkArrowIcon from '../../../../../components/icons/LinkArrowIcon';
import CallLinkIcon from '../../icons/CallLinkIcon';
import LinkArrowIcon from '../../icons/CallLinkIcon';

const ChatBackground = styled('div')`
  width: 280px;
  height: auto;
  max-height: 400px;
  overflow: hidden;
  overflow-y: auto;

  background-color: ${lightColorsTheme.templateBackground};
  margin-top: 38px;
  border-radius: 10px;
  padding: 10px;

  .head-wrapper {
    width: 260px;
    height: auto;
    // background: ${lightColorsTheme.additionalBackground};
    background: #ffffff;
    padding: 15px;
    border-radius: 10px;
    // text-align: justify;
  }

  .ant-modal-mask {
    background-color: none !important;
  }
`;

const OriginalPreview = ({ item }) => {
  const headerText = preview => {
    if (preview?.example?.header_text[0]) {
      return (
        preview?.text?.replace('{{1}}', '') + preview?.example?.header_text[0]
      );
    } else {
      return preview?.text;
    }
  };
  return (
    <>
      <ChatBackground>
        <div className="head-wrapper">
          {item &&
            item?.map((preview, prevInd) => {
              return (
                <div key={prevInd}>
                  {preview?.type === 'HEADER' && (
                    <E.ChatHeaderText>
                      {preview?.text && headerText(preview)}
                      {preview?.format === 'IMAGE' && (
                        <img
                          src={preview?.example?.header_handle[0]}
                          width={'230px'}
                          height={'130px'}
                          style={{
                            borderRadius: '10px',
                            // objectFit: 'cover',
                          }}
                        />
                      )}
                      {preview?.format === 'VIDEO' && (
                        <video
                          src={preview?.example?.header_handle[0]}
                          autoPlay
                          // width={'230'}
                          // height={'130px'}
                          muted
                          style={{
                            borderRadius: '10px',
                            width: '230px',
                            height: '130px',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      {preview?.format === 'DOCUMENT' && (
                        <Flex
                          // center
                          // alignCenter

                          style={{
                            background: '#F4F4F5',
                            width: '100%',
                            height: '130px',
                            borderRadius: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={documentImage}
                            width="67.4px"
                            height="81.1px"
                          ></img>
                        </Flex>
                      )}
                    </E.ChatHeaderText>
                  )}
                  {preview?.type === 'BODY' && (
                    <E.ChatBodyText>{preview.text}</E.ChatBodyText>
                  )}
                  {preview?.type === 'FOOTER' && (
                    <E.ChatFooterText>{preview.text}</E.ChatFooterText>
                  )}
                  {prevInd === item?.components?.length - 1 && (
                    <E.ChatCurrentTime>{currentTime}</E.ChatCurrentTime>
                  )}
                </div>
              );
            })}
        </div>
        <div className="foot-wrapper">
          {item &&
            item?.map((preview, prevInd) => {
              return (
                <div key={prevInd}>
                  {preview?.type === 'BUTTONS' && (
                    <div>
                      {preview?.buttons?.length > 0 &&
                        preview?.buttons?.map((button, ind) => (
                          <div key={ind}>
                            {button.type === 'URL' ? (
                              <a href={button.url} target="_blank">
                                <E.ChatButtons
                                  style={{
                                    backgroundColor:
                                      lightColorsTheme.additionalBackground,
                                  }}
                                >
                                  <LinkArrowIcon
                                    style={{ marginRight: '10px' }}
                                  />
                                  {button.text}
                                </E.ChatButtons>
                              </a>
                            ) : (
                              <E.ChatButtons>
                                {button.type === 'PHONE_NUMBER' ? (
                                  <a
                                    href={`tel:${button.phone_number}`}
                                    style={{ verticalAlign: 'middle' }}
                                  >
                                    <Flex alignCenter center>
                                      <CallLinkIcon
                                        style={{ marginRight: '10px' }}
                                      />
                                      {button.text}
                                    </Flex>
                                  </a>
                                ) : (
                                  button.text
                                )}
                              </E.ChatButtons>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </ChatBackground>
    </>
  );
};

export default OriginalPreview;
