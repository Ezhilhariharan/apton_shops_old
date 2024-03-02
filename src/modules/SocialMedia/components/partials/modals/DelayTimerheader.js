import React, { memo } from 'react';

import Facebook from '@assets/images/FBFlag.png';
import Instagram from '@assets/images/Instagram.png';
import FacebookGrp from '@assets/images/FBGroup.png';
import twitter from '@assets/images/twitter.png';
import Pinterest from '@assets/images/PinterestLogo.png';
import Linkedin from '@assets/images/LinkdinPage.svg';

function DelayTimerheader({ item }) {
  return (
    <>
      {item === 'Linkedin Pages' && (
        <img
          src={Linkedin}
          alt="Lightence"
          width={30}
          height={30}
          className="marginRight"
        />
      )}
      {item === 'Facebook' && (
        <img
          src={Facebook}
          alt="Lightence"
          width={33}
          height={33}
          className="marginRight"
        />
      )}
      {item === 'Instagram' && (
        <img
          src={Instagram}
          alt="Lightence"
          width={30}
          height={30}
          className="marginRight"
        />
      )}
      {item === 'Facebook Groups' && (
        <img
          src={FacebookGrp}
          alt="Lightence"
          width={33}
          height={33}
          className="marginRight"
        />
      )}
      {item === 'Twitter' && (
        <img
          src={twitter}
          alt="Lightence"
          width={30}
          height={30}
          className="marginRight"
        />
      )}
      {item === 'Pinterest' && (
        <img
          src={Pinterest}
          alt="Lightence"
          width={30}
          height={30}
          className="marginRight"
        />
      )}
    </>
  );
}

export default memo(DelayTimerheader);
