import { Divider, Form, Radio, Select, Tooltip, message, Checkbox } from 'antd';
import React, { memo, useEffect, useState, useRef } from 'react';
import * as T from './CreateTemplateForm.styles';
import Flex from '@components/common/Flex';
import documentImage from '@assets/images/documentImage.svg';
import LinkArrowIcon from '../../../../../components/icons/LinkArrowIcon';
import CallLinkIcon from '../../../../../components/icons/CallLinkIcon';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

function WatsupViewTemplate() {
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    let timer = setInterval(() => {
      let time = moment().format('h:mm a');
      setCurrentTime(time);
    }, 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });

  const footer = useSelector(
    state => state?.whatsappTemplate?.templateField?.footer,
    shallowEqual
  );
  const body = useSelector(
    state => state?.whatsappTemplate?.templateField?.body,
    shallowEqual
  );
  const header = useSelector(
    state => state?.whatsappTemplate?.templateField?.header,
    shallowEqual
  );
  const buttonText1 = useSelector(
    state => state?.whatsappTemplate?.templateField?.buttonText1,
    shallowEqual
  );
  const buttonText2 = useSelector(
    state => state?.whatsappTemplate?.templateField?.buttonText2,
    shallowEqual
  );
  const buttonMarketing = useSelector(
    state => state?.whatsappTemplate?.templateField?.buttonMarketing,
    shallowEqual
  );
  const linkName = useSelector(
    state => state?.whatsappTemplate?.templateField?.linkName,
    shallowEqual
  );
  const phoneName = useSelector(
    state => state?.whatsappTemplate?.templateField?.phoneName,
    shallowEqual
  );
  const radioValue = useSelector(
    state => state?.whatsappTemplate?.headerRadioValue,
    shallowEqual
  );
  const uploadedLocalFile = useSelector(
    state => state?.whatsappTemplate?.uploadedLocalFile,
    shallowEqual
  );
  return (
    <T.ColourTemplateWrapper>
      <div className="parent">
        <div className="textParent">
          {radioValue === 'Image' && uploadedLocalFile && (
            <Flex>
              <img
                src={uploadedLocalFile}
                width={'100%'}
                // height="auto"
                style={{
                  marginTop: '15px',
                  marginBottom: '15px',
                  borderRadius: '10px',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
                alt="previewImage"
              />
            </Flex>
          )}
          {radioValue === 'Video' && uploadedLocalFile && (
            <Flex>
              <div
                className="marginTopVideo"
                style={{ width: '100%', height: '300px', marginBottom: '10px' }}
              >
                <video
                  src={uploadedLocalFile}
                  // width={'100%'}
                  // height="300"
                  style={{
                    borderRadius: '10px',
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                  autoPlay="autoPlay"
                  muted
                  loop="loop"
                />
              </div>
            </Flex>
          )}
          {radioValue === 'Document' && uploadedLocalFile && (
            <Flex
              center
              alignCenter
              style={{
                background: '#F4F4F5',
                width: '100%',
                padding: '30px',
                paddingTop: '10px',
                marginBottom: '10px',
                borderRadius: '10px',
              }}
            >
              <img src={documentImage}></img>
            </Flex>
          )}
          {header && (
            <T.ChatHeaderText style={{ fontWeight: 'bold' }}>
              {header}
            </T.ChatHeaderText>
          )}
          {body && <T.ChatBodyText>{body}</T.ChatBodyText>}
          {buttonMarketing === 'Stop promotions' ? (
            <T.ChatFooterText>
              Not interested? Tap Stop promotions
            </T.ChatFooterText>
          ) : (
            footer && <T.ChatFooterText>{footer}</T.ChatFooterText>
          )}
        </div>
        <T.ChatCurrentTime>{currentTime}</T.ChatCurrentTime>
      </div>
      <Flex wrap>
        {linkName && (
          <T.ChatButtons>
            <Flex alignCenter center>
              <LinkArrowIcon style={{ marginRight: '10px' }} />
              {linkName}
            </Flex>
          </T.ChatButtons>
        )}
        {phoneName && (
          <T.ChatButtons>
            <Flex alignCenter center>
              <CallLinkIcon style={{ marginRight: '10px' }} />
              {phoneName}
            </Flex>
          </T.ChatButtons>
        )}

        {buttonText1 && <T.ChatButtons>{buttonText1}</T.ChatButtons>}
        {buttonText2 && <T.ChatButtons>{buttonText2}</T.ChatButtons>}
        {buttonMarketing && <T.ChatButtons>{buttonMarketing}</T.ChatButtons>}
      </Flex>
    </T.ColourTemplateWrapper>
  );
}

export default WatsupViewTemplate;
