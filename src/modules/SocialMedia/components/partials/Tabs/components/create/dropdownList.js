import { DropDownRow, SocialIconsName } from './Pages.style';
import { Row } from 'antd';
import FBFlag from '@assets/images/FBFlag.png';
import FBGroup from '@assets/images/FBGroup.png';
import Instagram from '@assets/images/Instagram.png';
import LinkdinPage from '@assets/images/LinkdinPage.svg';
import twitter from '@assets/images/twitter.png';
import pinterest from '@assets/images/pinterest.png';
import React, { useState, useEffect,memo } from 'react';

const dropdownList = ({ list, onChangeDropDown }) => {
  return (
   <Row key={list?.key}>
   <DropDownRow
              value={list?.title}
              checked={list?.checked}
              onChange={onChangeDropDown}
            >
              <div className="row">
                {list?.title === 'Facebook' && (
                  <img
                    src={FBFlag}
                    style={{ marginLeft: '10px' }}
                    width={35}
                    height={35}
                  />
                )}
                {list?.title === 'Instagram' && (
                  <img
                    src={Instagram}
                    style={{ marginLeft: '10px' }}
                    width={35}
                    height={35}
                  />
                )}
                {list?.title === 'Facebook Groups' && (
                  <img
                    src={FBGroup}
                    style={{ marginLeft: '10px' }}
                    width={35}
                    height={35}
                  />
                )}
                {list?.title === 'Linkedin Pages' && (
                  <img
                    src={LinkdinPage}
                    style={{ marginLeft: '10px' }}
                    width={35}
                    height={35}
                  />
                )}
                {list?.title === 'Twitter' && (
                  <img
                    src={twitter}
                    style={{ marginLeft: '10px' }}
                    width={35}
                    height={35}
                  />
                )}
                {list?.title === 'Pinterest' && (
                  <img
                    src={pinterest}
                    style={{ marginLeft: '10px' }}
                    width={35}
                    height={35}
                  />
                )}

                <SocialIconsName ellipsis={{ rows: 1 }}>
                  {list?.apiData?.configuration?.page_name
                    ? list?.apiData?.configuration?.page_name
                    : list?.apiData?.configuration?.group_name
                    ? list?.apiData?.configuration?.group_name
                    : list?.apiData?.configuration?.user_name
                    ? list?.apiData?.configuration?.user_name
                    : list?.apiData?.platform_name}
                </SocialIconsName>
              </div>
    </DropDownRow>
    </Row>
  )
}

export default memo(dropdownList)