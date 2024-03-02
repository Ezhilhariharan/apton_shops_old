import styled from 'styled-components';
import { Menu as AntMenu } from 'antd';
import { FONT_SIZE } from '../../../../theme/styles/constants';
import { lightColorsTheme } from '../../../../theme/styles/light/lightTheme';
export const Menu = styled(AntMenu)`
  background: transparent;
  border-right: 0;

  .ant-menu-item {
    display: flex;
    align-items: center;
    margin: 25px 0px;
  }

  .childrenPadding {
    margin-left: 11px;
  }

  a {
    width: 100%;
    display: block;
    color: #181818 !important;
    font-size: 1rem;
    line-height: 21px;
    font-weight: 700 !important;
  }


  

  .ant-menu-item-selected {
    ${props =>
      props.settingsPathName === '/settings' &&
      `
    background-color:transparent !important;
  `}
  }
  .ant-menu-item,
  .ant-menu-submenu {
    font-size: 1rem;
    font-weight: 700;
    line-height: 21px;
    margin: 20px 0;
}



  .ant-menu-item-icon {
    width: 1.25rem;
  }

  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow,
  span[role='img'],
  a,
  .ant-menu-item,
  .ant-menu-submenu {
    color: #181818;
    fill: #181818;
    border-radius: 10px;
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    a,
    .ant-menu-item-icon,
    .ant-menu-title-content {
      color: #181818;
      // fill: #181818;
    }
  }

  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      //color: #ffffff;
      .ant-menu-submenu-expand-icon,
      .ant-menu-submenu-arrow,
      span[role='img'] {
        color: #181818;
        // fill: #181818;
      }
    }
  }

  .ant-menu-item-selected {
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    .ant-menu-item-icon,
    a {
      color:  #fff !important;
    }
      path {
        stroke: #fff !important;
        // fill: #fff !important;
      }
    }
  }
  


  .ant-menu-sub.ant-menu-inline {
    border-radius: 10px;
  }

  .ant-menu-item-active,
  .ant-menu-submenu-active .ant-menu-submenu-title {
    background-color: #4aacea;
    border-radius: 10px;
  }

  .ant-menu-sub.ant-menu-inline {
    background-color: transparent;
  }

  .ant-menu-item:hover {
    background-color: ${lightColorsTheme.headerInputBackground};
  }

  .ant-menu-item-selected:hover {
    background-color: ${lightColorsTheme.primary};
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected:hover {
    background-color: ${lightColorsTheme.primary};
  }

  .ant-menu-item-selected:nth-child(3) path {
    fill:${lightColorsTheme.primary} !important;
  }

  //  .ant-menu-submenu-open.ant-menu-submenu-inline .ant-menu-submenu-title{
  //   background:${lightColorsTheme.primary} !important;
  //   border-radius:10px;


  //    .ant-menu-title-content{
  //      color:white !important;
  //     }
  //   }
  //   .ant-menu-submenu-open.ant-menu-submenu-inline  .ant-menu-submenu-title .ant-menu-item-icon path{
  //     fill:white !important;
  //   }
  //   .ant-menu-submenu-open.ant-menu-submenu-inline > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
  //     color:white !important;
  //   }

  .childMenu {
    .ant-menu-item-active,
    .ant-menu-submenu-active .ant-menu-submenu-title {
      background-color: transparent;
    }
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: red;
      color: #4d4d4d;
    }
    .ant-menu-item-selected {
      .ant-menu-submenu-expand-icon,
      .ant-menu-submenu-arrow,
      span[role='img'],
      .ant-menu-item-icon,
      a {
        color: #181818;
        // fill: ${lightColorsTheme.additionalBackground};
      }
    }

    .ant-menu-item:hover,
    .ant-menu-submenu-title:hover {
      .ant-menu-submenu-expand-icon,
      .ant-menu-submenu-arrow,
      span[role='img'],
      a,
      .ant-menu-item-icon,
      .ant-menu-title-content {
        color: #181818;
        fill: ${lightColorsTheme.additionalBackground};
      }
    }

    .ant-menu-submenu-title:hover {
      background-color: ${lightColorsTheme.headerInputBackground};
    }



    .ant-menu-item:hover {
      background-color: ${lightColorsTheme.headerInputBackground};
    }


    // .ant-menu>div>li.ant-menu-item-active.gteCPM{
    //   background: ${lightColorsTheme.primary} !important;

    //   span,a{
    //     color: white !important;
    //   }
    // }

    // .ant-menu>div:nth-child(1)>li.ant-menu-item-active.gteCPM{
    //  svg,path{
    //        fill: transparent !important; 
    //     stroke: #fff !important;
    //   }
    // }

    //  .ant-menu>div:nth-child(2)>li.ant-menu-item-active.gteCPM{
    //  svg,path{
    //        fill: #fff !important; 
    //        stroke: #fff !important; 
    //   }
    // }
    
  }

  .ant-menu-submenu-selected .ant-menu-submenu-title {
    background-color: ${lightColorsTheme.primary};
    ${props =>
      props.settingsPathName === '/settings' &&
      `
      background-color:transparent !important;
    `}
    color: ${lightColorsTheme.additionalBackground};
    border-radius: 10px;
    .ant-menu-item-selected {
      .ant-menu-submenu-expand-icon,
      .ant-menu-submenu-arrow,
      span[role='img'],
      .ant-menu-item-icon,
      a {
        color: ${lightColorsTheme.additionalBackground} !important;
        fill: ${lightColorsTheme.additionalBackground} !important;
      }
    }
  }
`;
